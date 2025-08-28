import { useState, useEffect } from 'react';
import { FiEye, FiArchive, FiCheckCircle, FiXCircle, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from "./style.module.css";
import api from '@/app/api';

interface Candidatura {
  id: number;
  militarID: number;
  status: number;
  docBIUrl: string;
  docDeclRemuneracaoUrl: string;
  docDeclCompBancariaUrl: string;
  docUltmRecBncarioUrl: string;
  isDeleted: boolean;
  dataCandidatura: string;
  diasRestantes: number;
}

interface ApiResponse {
  code: number;
  message: string | null;
  data: Candidatura[];
}

interface MilitarInfo {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  // Adicione outros campos necessários do militar
}

export default function GestaoCandidatura() {
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [candidaturasFiltradas, setCandidaturasFiltradas] = useState<Candidatura[]>([]);
  const [militaresInfo, setMilitaresInfo] = useState<Record<number, MilitarInfo>>({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(5);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<number | 'todos'>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        // Chamada para buscar candidaturas
        const response = await api.get<ApiResponse>('/v1/Candidaturas/GetAll');
        
        if (response.data.code === 200) {
          const candidaturasData = response.data.data;
          setCandidaturas(candidaturasData);
          setCandidaturasFiltradas(candidaturasData);
          
          // Buscar informações dos militares
          await fetchMilitaresInfo(candidaturasData);
        } else {
          setErro(response.data.message || 'Erro ao carregar candidaturas');
        }
        
        setCarregando(false);
      } catch (error: any) {
        setErro('Erro ao carregar candidaturas');
        setCarregando(false);
        console.error('Erro ao buscar candidaturas:', error);
      }
    };

    const fetchMilitaresInfo = async (candidaturasData: Candidatura[]) => {
      try {
        const militarIds = [...new Set(candidaturasData.map(c => c.militarID))];
        const militaresMap: Record<number, MilitarInfo> = {};
        
        // Buscar informações de cada militar
        for (const militarId of militarIds) {
          try {
            const response = await api.get<MilitarInfo>(`/v1/Militares/${militarId}`);
            militaresMap[militarId] = response.data;
          } catch (error) {
            console.error(`Erro ao buscar militar ${militarId}:`, error);
            // Usar dados padrão em caso de erro
            militaresMap[militarId] = {
              id: militarId,
              nome: 'Nome',
              sobreNome: 'Não encontrado',
              email: 'email@nao.encontrado'
            };
          }
        }
        
        setMilitaresInfo(militaresMap);
      } catch (error) {
        console.error('Erro ao buscar informações dos militares:', error);
      }
    };

    fetchCandidaturas();
  }, []);

  // Aplicar filtro quando o filtroStatus mudar
  useEffect(() => {
    if (filtroStatus === 'todos') {
      setCandidaturasFiltradas(candidaturas);
    } else {
      const filtradas = candidaturas.filter(candidatura => candidatura.status === filtroStatus);
      setCandidaturasFiltradas(filtradas);
    }
    setPaginaAtual(1); // Resetar para a primeira página ao aplicar filtro
  }, [filtroStatus, candidaturas]);

  // Calcular totais de páginas
  const totalPaginas = Math.ceil(candidaturasFiltradas.length / itensPorPagina);
  
  // Obter candidaturas da página atual
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const candidaturasPaginaAtual = candidaturasFiltradas.slice(indicePrimeiroItem, indiceUltimoItem);

  // Mudar página
  const avancarPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const voltarPagina = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Função para verificar se pode avaliar (status Pendente ou EmAnálise)
  const podeAvaliar = (status: number) => {
    return status === 0 || status === 3; // Pendente (0) ou EmAnálise (3)
  };

  // Funções de ação
  const handleAvaliar = async (id: number, status: number) => {
    try {
      console.log('Avaliar candidatura:', id, 'Status:', status);
      // Implementar lógica de avaliação
      // await api.patch(`/v1/Candidaturas/${id}/status`, { status });
      // Atualizar a lista após avaliação
      setCandidaturas(candidaturas.map(c => 
        c.id === id ? { ...c, status } : c
      ));
    } catch (error) {
      console.error('Erro ao avaliar candidatura:', error);
    }
  };

  const handleArquivar = async (id: number) => {
    try {
      console.log('Arquivar candidatura:', id);
      // Implementar lógica de arquivamento
      // await api.patch(`/v1/Candidaturas/${id}/arquivar`);
      // Atualizar a lista após arquivamento
      setCandidaturas(candidaturas.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao arquivar candidatura:', error);
    }
  };

  const handleDetalhes = (id: number) => {
    console.log('Detalhes da candidatura:', id);
    // Implementar visualização de detalhes
  };

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Função para obter texto do status
  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return 'Pendente';
      case 1: return 'Aprovado';
      case 2: return 'Reprovado';
      case 3: return 'Em Análise';
      default: return 'Desconhecido';
    }
  };

  // Função para obter classe CSS do status
  const getStatusClass = (status: number) => {
    switch (status) {
      case 0: return styles.statusPendente;
      case 1: return styles.statusAprovado;
      case 2: return styles.statusReprovado;
      case 3: return styles.statusEmAnalise;
      default: return styles.statusDesconhecido;
    }
  };

  if (carregando) {
    return <div className={styles.carregando}>Carregando candidaturas...</div>;
  }

  if (erro) {
    return <div className={styles.erro}>{erro}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Gestão de Candidaturas</h1>
        
        <button 
          className={styles.btnFiltro}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          title="Filtrar por status"
        >
          <FiFilter /> Filtrar
        </button>
      </div>

      {mostrarFiltros && (
        <div className={styles.filtros}>
          <label>
            <input
              type="radio"
              name="filtroStatus"
              value="todos"
              checked={filtroStatus === 'todos'}
              onChange={() => setFiltroStatus('todos')}
            />
            Todos
          </label>
          <label>
            <input
              type="radio"
              name="filtroStatus"
              value="0"
              checked={filtroStatus === 0}
              onChange={() => setFiltroStatus(0)}
            />
            Pendentes
          </label>
          <label>
            <input
              type="radio"
              name="filtroStatus"
              value="1"
              checked={filtroStatus === 1}
              onChange={() => setFiltroStatus(1)}
            />
            Aprovados
          </label>
          <label>
            <input
              type="radio"
              name="filtroStatus"
              value="2"
              checked={filtroStatus === 2}
              onChange={() => setFiltroStatus(2)}
            />
            Reprovados
          </label>
          <label>
            <input
              type="radio"
              name="filtroStatus"
              value="3"
              checked={filtroStatus === 3}
              onChange={() => setFiltroStatus(3)}
            />
            Em Análise
          </label>
        </div>
      )}

      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Militar</th>
              <th>Data Candidatura</th>
              <th>Status</th>
              <th>Dias Restantes</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidaturasPaginaAtual.length > 0 ? (
              candidaturasPaginaAtual.map(candidatura => {
                const militar = militaresInfo[candidatura.militarID] || {
                  nome: 'Carregando...',
                  sobreNome: '',
                  email: ''
                };
                
                return (
                  <tr key={candidatura.id}>
                    <td>{candidatura.id}</td>
                    <td>
                      <div className={styles.infoMilitar}>
                        <div className={styles.nomeMilitar}>
                          {militar.nome} {militar.sobreNome}
                        </div>
                        <div className={styles.emailMilitar}>
                          {militar.email}
                        </div>
                      </div>
                    </td>
                    <td>{formatarData(candidatura.dataCandidatura)}</td>
                    <td>
                      <span className={`${styles.status} ${getStatusClass(candidatura.status)}`}>
                        {getStatusText(candidatura.status)}
                      </span>
                    </td>
                    <td>{candidatura.diasRestantes}</td>
                    <td>
                      <div className={styles.acoes}>
                        <button 
                          className={styles.btnDetalhes}
                          onClick={() => handleDetalhes(candidatura.id)}
                          title="Detalhes"
                        >
                          <FiEye />
                        </button>
                        
                        {/* Mostrar ações de avaliação apenas para status Pendente ou EmAnálise */}
                        {podeAvaliar(candidatura.status) && (
                          <>
                            <button 
                              className={styles.btnAprovar}
                              onClick={() => handleAvaliar(candidatura.id, 1)}
                              title="Aprovar"
                            >
                              <FiCheckCircle />
                            </button>
                            <button 
                              className={styles.btnReprovar}
                              onClick={() => handleAvaliar(candidatura.id, 2)}
                              title="Reprovar"
                            >
                              <FiXCircle />
                            </button>
                          </>
                        )}
                        
                        <button 
                          className={styles.btnArquivar}
                          onClick={() => handleArquivar(candidatura.id)}
                          title="Arquivar"
                        >
                          <FiArchive />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className={styles.semDados}>
                  Nenhuma candidatura encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className={styles.paginacao}>
        <div className={styles.infoPaginacao}>
          Mostrando {candidaturasPaginaAtual.length} de {candidaturasFiltradas.length} candidaturas
          {filtroStatus !== 'todos' && ` (filtradas)`}
        </div>
        
        <div className={styles.controlesPaginacao}>
          <button 
            onClick={voltarPagina} 
            disabled={paginaAtual === 1}
            className={styles.btnPagina}
            title="Página anterior"
          >
            <FiChevronLeft />
          </button>
          
          <span className={styles.indicePagina}>
            Página {paginaAtual} de {totalPaginas}
          </span>
          
          <button 
            onClick={avancarPagina} 
            disabled={paginaAtual === totalPaginas || totalPaginas === 0}
            className={styles.btnPagina}
            title="Próxima página"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}