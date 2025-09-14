import { useState, useEffect } from 'react';
import { FiX, FiDownload, FiExternalLink, FiChevronLeft, FiChevronRight, FiCheck, FiXCircle, FiArchive } from 'react-icons/fi';
import styles from './style.module.css';
import api from '@/app/api'; 

interface Militar {
  id: number;
  nip: string;
  nome?: string;
  sobreNome?: string;
  email?: string;
}

interface CandidaturaDetalhes {
  id: number;
  militarID: number;
  militar: Militar;
  status: number;
  docBIUrl: string;
  docDeclRemuneracaoUrl: string;
  docDeclCompBancariaUrl: string;
  docUltmRecBncarioUrl: string;
  isDeleted: boolean;
  dataCandidatura: string;
  diasRestantes: number;
}

interface UserData {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  foto: string;
  role: number;
  dataRegistro: string;
  militarInfo: null;
  administradorInfo: {
    id: number;
    cargo: number;
  };
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface ModalDetalhesCandidaturaProps {
  candidaturaId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: () => void;
}

// Componente Modal para Comentário de Rejeição
function ModalComentarioRejeicao({ 
  isOpen, 
  onClose, 
  onConfirm 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: (comentario: string) => void; 
}) {
  const [comentario, setComentario] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comentario.trim()) {
      onConfirm(comentario);
      setComentario('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlayComentario} onClick={onClose}>
      <div className={styles.modalComentario} onClick={(e) => e.stopPropagation()}>
        <div className={styles.headerComentario}>
          <h3>Comentário de Rejeição</h3>
          <button className={styles.btnFecharComentario} onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.formComentario}>
          <div className={styles.formGroupComentario}>
            <label htmlFor="comentario" className={styles.labelComentario}>
              Digite o motivo da rejeição:
            </label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className={styles.textareaComentario}
              placeholder="Explique o motivo da rejeição da candidatura..."
              rows={4}
              required
            />
          </div>
          
          <div className={styles.botoesComentario}>
            <button 
              type="button" 
              className={styles.btnCancelarComentario}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.btnConfirmarComentario}
              disabled={!comentario.trim()}
            >
              Confirmar Rejeição
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ModalDetalhesCandidatura({ 
  candidaturaId, 
  isOpen, 
  onClose,
  onStatusChange 
}: ModalDetalhesCandidaturaProps) {
  const [candidatura, setCandidatura] = useState<CandidaturaDetalhes | null>(null);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pdfAtivoIndex, setPdfAtivoIndex] = useState<number>(0);
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);
  const [nomesDocumentos, setNomesDocumentos] = useState<string[]>([]);
  const [modalComentarioAberto, setModalComentarioAberto] = useState(false);

  useEffect(() => {
    if (isOpen && candidaturaId) {
      fetchAdminId();
      fetchDetalhesCandidatura();
    } else {
      setCandidatura(null);
      setPdfAtivoIndex(0);
      setPdfUrls([]);
      setNomesDocumentos([]);
      setErro(null);
    }
  }, [isOpen, candidaturaId]);

  // Buscar o ID do administrador logado
  const fetchAdminId = async () => {
    try {
      const response = await api.get<ApiResponse<UserData>>('/v1/Usuarios/GetCurrentUser');
      if (response.data.code === 200 && response.data.data.administradorInfo) {
        setAdminId(response.data.data.administradorInfo.id);
      }
    } catch (error) {
      console.error('Erro ao buscar ID do administrador:', error);
    }
  };

  const corrigirUrl = (url: string): string => {
    if (!url) return '';
    return url.replace('https://localhost:5027', 'http://localhost:5027');
  };

  const fetchDetalhesCandidatura = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      const response = await api.get(`/v1/Candidaturas/GetById?Id=${candidaturaId}`);
      
      if (response.data.code === 200) {
        setCandidatura(response.data.data);
        
        const urls: string[] = [];
        const nomes: string[] = [];
        
        if (response.data.data.docBIUrl) {
          urls.push(corrigirUrl(response.data.data.docBIUrl));
          nomes.push('Documento de Identificação');
        }
        
        if (response.data.data.docDeclRemuneracaoUrl) {
          urls.push(corrigirUrl(response.data.data.docDeclRemuneracaoUrl));
          nomes.push('Declaração de Remuneração');
        }
        
        if (response.data.data.docDeclCompBancariaUrl) {
          urls.push(corrigirUrl(response.data.data.docDeclCompBancariaUrl));
          nomes.push('Comprovante Bancário');
        }
        
        if (response.data.data.docUltmRecBncarioUrl) {
          urls.push(corrigirUrl(response.data.data.docUltmRecBncarioUrl));
          nomes.push('Último Recibo Bancário');
        }
        
        setPdfUrls(urls);
        setNomesDocumentos(nomes);
        
        if (urls.length > 0) {
          setPdfAtivoIndex(0);
        }
      } else {
        setErro(response.data.message || 'Erro ao carregar detalhes da candidatura');
      }
      
      setCarregando(false);
    } catch (error: any) {
      setErro('Erro ao carregar detalhes da candidatura');
      setCarregando(false);
      console.error('Erro:', error);
      
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return 'Pendente';
      case 1: return 'Aprovado';
      case 2: return 'Reprovado';
      case 3: return 'Em Análise';
      default: return 'Desconhecido';
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR');
  };

  const avancarDocumento = () => {
    if (pdfAtivoIndex < pdfUrls.length - 1) {
      setPdfAtivoIndex(pdfAtivoIndex + 1);
    }
  };

  const voltarDocumento = () => {
    if (pdfAtivoIndex > 0) {
      setPdfAtivoIndex(pdfAtivoIndex - 1);
    }
  };

  const handleDownload = async (url: string, nomeArquivo: string) => {
    try {
      const response = await api.get(url, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      window.open(url, '_blank');
    }
  };

  // Função para gerar mensagem automática de aprovação
  const gerarMensagemAprovacao = (): string => {
    return "Parabéns! Sua candidatura foi aprovada com sucesso. Sua documentação está completa e atende a todos os requisitos necessários para o processo.";
  };

  // Função para aprovar a candidatura
  const handleAprovar = async () => {
    if (!candidatura || !adminId) return;
    
    try {
      setProcessando(true);
      const mensagem = gerarMensagemAprovacao();
      
      const response = await api.patch(`/v1/Candidaturas/Approve`, {
        candidaturaId: candidatura.id,
        adminId: adminId,
        comentario: mensagem
      });
      
      if (response.data.code === 200) {
        setCandidatura({ ...candidatura, status: 1 });
        onStatusChange();
        alert("Candidatura aprovada com sucesso!");
      } else {
        setErro(response.data.message || 'Erro ao aprovar candidatura');
      }
    } catch (error: any) {
      setErro('Erro ao aprovar candidatura');
      console.error('Erro:', error);
    } finally {
      setProcessando(false);
    }
  };

  // Função para rejeitar a candidatura com comentário
  const handleRejeitarComComentario = async (comentario: string) => {
    if (!candidatura || !adminId) return;
    
    try {
      setProcessando(true);
      
      const response = await api.patch(`/v1/Candidaturas/Reject`, {
        candidaturaId: candidatura.id,
        adminId: adminId,
        comentario: comentario
      });
      
      if (response.data.code === 200) {
        setCandidatura({ ...candidatura, status: 2 });
        onStatusChange();
        alert("Candidatura rejeitada com sucesso!");
      } else {
        setErro(response.data.message || 'Erro ao rejeitar candidatura');
      }
    } catch (error: any) {
      setErro('Erro ao rejeitar candidatura');
      console.error('Erro:', error);
    } finally {
      setProcessando(false);
      setModalComentarioAberto(false);
    }
  };

  const handleArquivar = async () => {
    if (!candidatura) return;
    
    try {
      setProcessando(true);
      const response = await api.put(`/v1/Candidaturas/Archive`, {
        id: candidatura.id
      });
      
      if (response.data.code === 200) {
        onClose();
        onStatusChange();
      } else {
        setErro(response.data.message || 'Erro ao arquivar candidatura');
      }
    } catch (error: any) {
      setErro('Erro ao arquivar candidatura');
      console.error('Erro:', error);
    } finally {
      setProcessando(false);
    }
  };

  // Abrir modal de comentário para rejeição
  const handleAbrirModalRejeicao = () => {
    setModalComentarioAberto(true);
  };

  // Fechar modal de comentário
  const handleFecharModalRejeicao = () => {
    setModalComentarioAberto(false);
  };

  // Função para determinar quais botões mostrar baseado no status
  const getBotoesVisiveis = () => {
    if (!candidatura) return { mostrarAprovar: false, mostrarNegar: false, mostrarArquivar: false };

    const status = candidatura.status;
    
    // Status 0 (Pendente) ou 3 (Em Análise): mostrar Aprovar e Negar
    if (status === 0 || status === 3) {
      return { mostrarAprovar: true, mostrarNegar: true, mostrarArquivar: false };
    }
    
    // Status 2 (Reprovado): mostrar apenas Arquivar
    if (status === 2) {
      return { mostrarAprovar: false, mostrarNegar: false, mostrarArquivar: true };
    }
    
    // Status 1 (Aprovado): não mostrar nenhum botão
    if (status === 1) {
      return { mostrarAprovar: false, mostrarNegar: false, mostrarArquivar: false };
    }
    
    // Default: não mostrar nenhum botão
    return { mostrarAprovar: false, mostrarNegar: false, mostrarArquivar: false };
  };

  if (!isOpen) return null;

  const { mostrarAprovar, mostrarNegar, mostrarArquivar } = getBotoesVisiveis();

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2>Detalhes da Candidatura #{candidaturaId}</h2>
            <button className={styles.btnFechar} onClick={onClose}>
              <FiX />
            </button>
          </div>

          <div className={styles.conteudo}>
            {carregando && <div className={styles.carregando}>Carregando...</div>}
            
            {erro && <div className={styles.erro}>{erro}</div>}
            
            {candidatura && !carregando && (
              <>
                {/* Botões de ação - condicionais baseados no status */}
                {(mostrarAprovar || mostrarNegar || mostrarArquivar) && (
                  <div className={styles.acoesRapidas}>
                    {mostrarAprovar && (
                      <button 
                        className={`${styles.btnAcao} ${styles.btnAprovar}`}
                        onClick={handleAprovar}
                        disabled={processando || !adminId}
                        title={!adminId ? "Aguardando carregamento do ID do administrador" : "Aprovar candidatura"}
                      >
                        <FiCheck /> Aprovar
                      </button>
                    )}
                    
                    {mostrarNegar && (
                      <button 
                        className={`${styles.btnAcao} ${styles.btnNegar}`}
                        onClick={handleAbrirModalRejeicao}
                        disabled={processando}
                        title="Rejeitar candidatura"
                      >
                        <FiXCircle /> Rejeitar
                      </button>
                    )}
                    
                    {mostrarArquivar && (
                      <button 
                        className={`${styles.btnAcao} ${styles.btnArquivar}`}
                        onClick={handleArquivar}
                        disabled={processando}
                        title="Arquivar candidatura"
                      >
                        <FiArchive /> Arquivar
                      </button>
                    )}
                  </div>
                )}

                <div className={styles.detalhes}>
                  <div className={styles.infoGeral}>
                    <h3>Informações Gerais</h3>
                    <div className={styles.gridInfo}>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>ID:</span>
                        <span className={styles.valor}>{candidatura.id}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Militar ID:</span>
                        <span className={styles.valor}>{candidatura.militarID}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Militar:</span>
                        <span className={styles.valor}>
                          NIP: {candidatura.militar.nip}
                          {candidatura.militar.nome && ` - ${candidatura.militar.nome} ${candidatura.militar.sobreNome || ''}`}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Status:</span>
                        <span className={`${styles.valor} ${styles[`status${candidatura.status}`]}`}>
                          {getStatusText(candidatura.status)}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Data da Candidatura:</span>
                        <span className={styles.valor}>{formatarData(candidatura.dataCandidatura)}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Dias Restantes:</span>
                        <span className={styles.valor}>
                          {candidatura.diasRestantes > 0 ? (
                            <span className={styles.diasPositivos}>{candidatura.diasRestantes} dias</span>
                          ) : (
                            <span className={styles.diasNegativos}>Expirado</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.documentos}>
                    <h3>Documentos ({pdfUrls.length})</h3>
                    
                    <div className={styles.listaDocumentos}>
                      {pdfUrls.map((url, index) => (
                        <button 
                          key={index}
                          className={`${styles.docItem} ${pdfAtivoIndex === index ? styles.ativo : ''}`}
                          onClick={() => setPdfAtivoIndex(index)}
                        >
                          <span>{nomesDocumentos[index]}</span>
                          <FiDownload 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(url, `${nomesDocumentos[index].toLowerCase().replace(/\s+/g, '_')}.pdf`);
                            }}
                            title="Download"
                          />
                        </button>
                      ))}
                    </div>

                    <div className={styles.visualizadorPdf}>
                      {pdfUrls.length > 0 ? (
                        <>
                          <div className={styles.pdfHeader}>
                            <div className={styles.pdfNavigation}>
                              <button 
                                onClick={voltarDocumento} 
                                disabled={pdfAtivoIndex === 0}
                                className={styles.navButton}
                                title="Documento anterior"
                              >
                                <FiChevronLeft />
                              </button>
                              
                              <span className={styles.pdfTitle}>
                                {pdfAtivoIndex + 1} de {pdfUrls.length}: {nomesDocumentos[pdfAtivoIndex]}
                              </span>
                              
                              <button 
                                onClick={avancarDocumento} 
                                disabled={pdfAtivoIndex === pdfUrls.length - 1}
                                className={styles.navButton}
                                title="Próximo documento"
                              >
                                <FiChevronRight />
                              </button>
                            </div>
                            
                            <a 
                              href={pdfUrls[pdfAtivoIndex]} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={styles.btnAbrirExterno}
                            >
                              <FiExternalLink /> Abrir em nova janela
                            </a>
                          </div>
                          <iframe 
                            src={pdfUrls[pdfAtivoIndex]}
                            className={styles.pdfFrame}
                            title={`Visualizador de PDF - ${nomesDocumentos[pdfAtivoIndex]}`}
                          />
                        </>
                      ) : (
                        <div className={styles.semDocumentos}>
                          <FiX size={32} />
                          <span>Nenhum documento disponível</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Comentário para Rejeição */}
      <ModalComentarioRejeicao
        isOpen={modalComentarioAberto}
        onClose={handleFecharModalRejeicao}
        onConfirm={handleRejeitarComComentario}
      />
    </>
  );
}