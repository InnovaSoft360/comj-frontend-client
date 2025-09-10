import { useState, useEffect } from 'react';
import { 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiSearch
} from 'react-icons/fi';
import { 
  BsArrowUpShort, 
  BsFillLightningChargeFill
} from 'react-icons/bs';
import api from '@/app/api';
import styles from "./style.module.css";

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

interface StatusCount {
  pendente: number;
  aprovado: number;
  reprovado: number;
  emAnalise: number;
  total: number;
}

export default function VisaoGeralCandidatura() {
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [statusCount, setStatusCount] = useState<StatusCount>({
    pendente: 0,
    aprovado: 0,
    reprovado: 0,
    emAnalise: 0,
    total: 0
  });
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        setCarregando(true);
        const response = await api.get<ApiResponse>('/v1/Candidaturas/GetAll');
        const dados = response.data.data;
        
        setCandidaturas(dados);
        
        // Calcular contagem por status
        const counts = {
          pendente: dados.filter(c => c.status === 0).length,
          aprovado: dados.filter(c => c.status === 1).length,
          reprovado: dados.filter(c => c.status === 2).length,
          emAnalise: dados.filter(c => c.status === 3).length,
          total: dados.length
        };
        
        setStatusCount(counts);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao buscar candidaturas:', error);
        setCarregando(false);
      }
    };

    fetchCandidaturas();
  }, []);

  // Obter as 5 candidaturas mais recentes
  const candidaturasRecentes = [...candidaturas]
    .sort((a, b) => new Date(b.dataCandidatura).getTime() - new Date(a.dataCandidatura).getTime())
    .slice(0, 5)
    .filter(candidatura => 
      candidatura.militarID.toString().includes(pesquisa) ||
      candidatura.id.toString().includes(pesquisa)
    );

  // Função para formatar data
  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  // Função para obter ícone do status
  const getStatusIcon = (status: number) => {
    switch (status) {
      case 0: return <FiClock />;
      case 1: return <FiCheckCircle />;
      case 2: return <FiXCircle />;
      case 3: return <FiSearch />;
      default: return <FiClock />;
    }
  };

  return (
    <div className={styles.visaoGeralSection}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>
          Visão Geral de Candidaturas
        </h1>
        <div className={styles.badge}>
          <BsFillLightningChargeFill />
          Dados em Tempo Real
        </div>
      </div>
      
      {/* Cards de Status */}
      <div className={styles.cardsContainer}>
        {/* Card Pendente */}
        <div className={`${styles.card} ${styles.cardPendente}`}>
          <div className={styles.cardBackground}></div>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <FiClock />
            </div>
            <div className={styles.cardInfo}>
              <h3>Pendentes</h3>
              {carregando ? (
                <div className={styles.skeleton}></div>
              ) : (
                <p className={styles.valor}>{statusCount.pendente}</p>
              )}
            </div>
            <div className={styles.cardStats}>
              <BsArrowUpShort />
              <span>+{Math.round((statusCount.pendente / statusCount.total) * 100)}%</span>
            </div>
          </div>
          <div className={styles.cardWave}></div>
        </div>

        {/* Card Aprovado */}
        <div className={`${styles.card} ${styles.cardAprovado}`}>
          <div className={styles.cardBackground}></div>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <FiCheckCircle />
            </div>
            <div className={styles.cardInfo}>
              <h3>Aprovados</h3>
              {carregando ? (
                <div className={styles.skeleton}></div>
              ) : (
                <p className={styles.valor}>{statusCount.aprovado}</p>
              )}
            </div>
            <div className={styles.cardStats}>
              <BsArrowUpShort />
              <span>+{Math.round((statusCount.aprovado / statusCount.total) * 100)}%</span>
            </div>
          </div>
          <div className={styles.cardWave}></div>
        </div>

        {/* Card Reprovado */}
        <div className={`${styles.card} ${styles.cardReprovado}`}>
          <div className={styles.cardBackground}></div>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <FiXCircle />
            </div>
            <div className={styles.cardInfo}>
              <h3>Reprovados</h3>
              {carregando ? (
                <div className={styles.skeleton}></div>
              ) : (
                <p className={styles.valor}>{statusCount.reprovado}</p>
              )}
            </div>
            <div className={styles.cardStats}>
              <BsArrowUpShort />
              <span>+{Math.round((statusCount.reprovado / statusCount.total) * 100)}%</span>
            </div>
          </div>
          <div className={styles.cardWave}></div>
        </div>

        {/* Card Em Análise */}
        <div className={`${styles.card} ${styles.cardEmAnalise}`}>
          <div className={styles.cardBackground}></div>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <FiSearch />
            </div>
            <div className={styles.cardInfo}>
              <h3>Em Análise</h3>
              {carregando ? (
                <div className={styles.skeleton}></div>
              ) : (
                <p className={styles.valor}>{statusCount.emAnalise}</p>
              )}
            </div>
            <div className={styles.cardStats}>
              <BsArrowUpShort />
              <span>+{Math.round((statusCount.emAnalise / statusCount.total) * 100)}%</span>
            </div>
          </div>
          <div className={styles.cardWave}></div>
        </div>
      </div>

      {/* Tabela de Candidaturas Recentes */}
      <div className={styles.tabelaSection}>
        <div className={styles.tabelaHeader}>
          <h2 className={styles.tabelaTitulo}>
            Candidaturas Recentes
            <span className={styles.tabelaSubtitle}>Últimas 5 candidaturas</span>
          </h2>
          
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Pesquisar por ID ou Militar..." 
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.tabelaContainer}>
          {carregando ? (
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}></div>
              <p>Carregando candidaturas...</p>
            </div>
          ) : candidaturasRecentes.length === 0 ? (
            <div className={styles.emptyState}>
              <FiSearch size={48} />
              <h3>Nenhuma candidatura encontrada</h3>
              <p>{pesquisa ? 'Tente ajustar os termos da pesquisa' : 'Não há candidaturas para exibir'}</p>
            </div>
          ) : (
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Militar ID</th>
                  <th>Status</th>
                  <th>Data da Candidatura</th>
                  <th>Dias Restantes</th>
                </tr>
              </thead>
              <tbody>
                {candidaturasRecentes.map((candidatura) => (
                  <tr key={candidatura.id}>
                    <td className={styles.idCell}>#{candidatura.id}</td>
                    <td className={styles.militarCell}>MIL-{candidatura.militarID}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(candidatura.status)}`}>
                        {getStatusIcon(candidatura.status)}
                        {getStatusText(candidatura.status)}
                      </span>
                    </td>
                    <td className={styles.dataCell}>{formatarData(candidatura.dataCandidatura)}</td>
                    <td className={styles.diasCell}>
                      <span className={candidatura.diasRestantes <= 3 ? styles.diasCriticos : ''}>
                        {candidatura.diasRestantes} dias
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className={styles.tabelaFooter}>
          <span>Total de {candidaturasRecentes.length} candidaturas recentes</span>
          <button className={styles.btnVerTodas}>
            Ver todas as candidaturas →
          </button>
        </div>
      </div>
    </div>
  );
}