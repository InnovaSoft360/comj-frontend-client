import { useState, useEffect } from 'react';
import { FiEye, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from "./style.module.css";
import api from '@/app/api';
import ModalDetalhesCandidatura from '@/features/private/dasbboard/components/ContentArea/candidatura/modalDetalhes';

interface Militar {
  id: number;
  nip: string;
  nome?: string;
  sobreNome?: string;
  email?: string;
}

interface Candidatura {
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

interface ApiResponse {
  code: number;
  message: string | null;
  data: Candidatura[];
}

export default function GestaoCandidatura() {
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [candidaturasFiltradas, setCandidaturasFiltradas] = useState<Candidatura[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(5);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<number | 'todos'>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [candidaturaSelecionada, setCandidaturaSelecionada] = useState<number | null>(null);

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

  // Função para mudar status da candidatura
  const handleStatusChange = async (candidaturaId: number, novoStatus: number) => {
    try {
      // Implementar lógica para atualizar o status da candidatura
      console.log('Mudando status da candidatura:', candidaturaId, 'para:', novoStatus);
      
      // Exemplo de chamada à API:
      // const response = await api.put(`/v1/Candidaturas/${candidaturaId}/status`, { status: novoStatus });
      
      // Atualizar a lista localmente (simulação)
      setCandidaturas(prevCandidaturas => 
        prevCandidaturas.map(candidatura => 
          candidatura.id === candidaturaId 
            ? { ...candidatura, status: novoStatus } 
            : candidatura
        )
      );
      
      alert(`Status da candidatura ${candidaturaId} atualizado para: ${getStatusText(novoStatus)}`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status da candidatura');
    }
  };

  const handleDetalhes = (id: number) => {
    setCandidaturaSelecionada(id);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCandidaturaSelecionada(null);
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
              <th>Militar (NIP)</th>
              <th>Data Candidatura</th>
              <th>Status</th>
              <th>Dias Restantes</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidaturasPaginaAtual.length > 0 ? (
              candidaturasPaginaAtual.map(candidatura => (
                <tr key={candidatura.id}>
                  <td>{candidatura.id}</td>
                  <td>
                    <div className={styles.infoMilitar}>
                      <div className={styles.nipMilitar}>
                        NIP: {candidatura.militar.nip}
                      </div>
                      {candidatura.militar.nome && candidatura.militar.sobreNome && (
                        <div className={styles.nomeMilitar}>
                          {candidatura.militar.nome} {candidatura.militar.sobreNome}
                        </div>
                      )}
                      {candidatura.militar.email && (
                        <div className={styles.emailMilitar}>
                          {candidatura.militar.email}
                        </div>
                      )}
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
                    </div>
                  </td>
                </tr>
              ))
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

      {/* Modal de detalhes */}
      <ModalDetalhesCandidatura
        candidaturaId={candidaturaSelecionada}
        isOpen={modalAberto}
        onClose={fecharModal}
        onStatusChange={handleStatusChange as unknown as () => void}
      />
    </div>
  );
}