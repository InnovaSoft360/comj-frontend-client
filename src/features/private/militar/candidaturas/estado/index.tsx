import { useState, useEffect, useRef } from 'react';
import styles from "./style.module.css";
import api from "../../../../../app/api";

// Interfaces TypeScript
interface Avaliacao {
  id: number;
  comentario: string;
  admId: number;
  dataAvaliacao: string;
  nomeAdmin: string;
}

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
  avaliacoes: Avaliacao[];
}

interface UserData {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  foto: string;
  role: number;
  dataRegistro: string;
  militarInfo: {
    nip: string;
    telefone: string;
  } | null;
  administradorInfo: any | null;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export default function Estado() {
  const [candidatura, setCandidatura] = useState<Candidatura | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Primeiro obtém o usuário logado
        const userResponse = await api.get<ApiResponse<UserData>>('/v1/Usuarios/GetCurrentUser');
        const userId = userResponse.data.data.id;
        
        // Depois busca a candidatura com base no ID do militar
        const candidaturaResponse = await api.get<ApiResponse<Candidatura>>(
          `/v1/Candidaturas/GetByMilitarId?Id=${userId}`
        );
        
        setCandidatura(candidaturaResponse.data.data);
      } catch (err) {
        setError('Erro ao carregar dados da candidatura');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Efeito para animação quando o card é carregado
  useEffect(() => {
    if (cardRef.current && candidatura) {
      cardRef.current.classList.add(styles.cardVisible);
    }
  }, [candidatura]);

  if (loading) {
    return (
      <section className={styles.estadoSection}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando informações da candidatura...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.estadoSection}>
        <div className={styles.errorCard}>
          <h3>Erro</h3>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!candidatura) {
    return (
      <section className={styles.estadoSection}>
        <div className={styles.noCandidatura}>
          <h3>Nenhuma candidatura encontrada</h3>
          <p>Você ainda não submeteu nenhuma candidatura.</p>
        </div>
      </section>
    );
  }

  // Determinar a classe CSS baseada no status
  const getStatusClass = () => {
    switch (candidatura.status) {
      case 0: return styles.statusPendente;
      case 1: return styles.statusAprovado;
      case 2: return styles.statusReprovado;
      case 3: return styles.statusEmAnalise;
      default: return styles.statusPendente;
    }
  };

  // Obter texto do status
  const getStatusText = () => {
    switch (candidatura.status) {
      case 0: return "Pendente";
      case 1: return "Aprovado";
      case 2: return "Reprovado";
      case 3: return "Em Análise";
      default: return "Desconhecido";
    }
  };

  // Obter mensagem personalizada baseada no status
  const getCustomMessage = () => {
    switch (candidatura.status) {
      case 0:
        return "Sua candidatura foi recebida e aguarda processamento inicial.";
      case 1:
        return "Parabéns! Sua candidatura foi aprovada com sucesso.";
      case 2:
        return "Sua candidatura não foi aprovada. Veja os comentários abaixo.";
      case 3:
        return "Sua candidatura está em processo de análise pela nossa equipe.";
      default:
        return "Status desconhecido.";
    }
  };

  // Obter o comentário mais recente (se houver)
  const getLatestComment = () => {
    if (candidatura.avaliacoes && candidatura.avaliacoes.length > 0) {
      // Ordena por data (mais recente primeiro) e pega o primeiro
      const sortedAvaliacoes = [...candidatura.avaliacoes].sort(
        (a, b) => new Date(b.dataAvaliacao).getTime() - new Date(a.dataAvaliacao).getTime()
      );
      return sortedAvaliacoes[0].comentario;
    }
    return null;
  };

  const latestComment = getLatestComment();

  return (
    <section className={styles.estadoSection}>
      <div ref={cardRef} className={`${styles.card} ${getStatusClass()}`}>
        <div className={styles.cardHeader}>
          <h2>Estado da Candidatura</h2>
          <div className={styles.statusBadge}>
            {getStatusText()}
          </div>
        </div>
        
        <div className={styles.cardBody}>
          <div className={styles.statusMessage}>
            <p>{getCustomMessage()}</p>
          </div>
          
          {(candidatura.status === 0 || candidatura.status === 3) && (
            <div className={styles.diasRestantes}>
              <h3>Dias Restantes para Análise</h3>
              <div className={styles.diasCount}>
                {candidatura.diasRestantes}
              </div>
              <p>Por favor, aguarde durante 15 dias úteis para a conclusão da avaliação.</p>
            </div>
          )}
          
          {(candidatura.status === 1 || candidatura.status === 2) && latestComment && (
            <div className={styles.comentarioSection}>
              <h3>Comentário da Avaliação</h3>
              <div className={styles.comentarioBox}>
                <p>{latestComment}</p>
              </div>
            </div>
          )}
          
          <div className={styles.dataCandidatura}>
            <p>
              <strong>Data de Submissão:</strong>{' '}
              {new Date(candidatura.dataCandidatura).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <div className={styles.waveEffect}></div>
        </div>
      </div>
    </section>
  );
}