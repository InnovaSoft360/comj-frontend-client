import { useState, useEffect } from 'react';
import { FiUsers, FiHome, FiFileText } from 'react-icons/fi';
import { 
  BsArrowUpShort, 
  BsFillLightningChargeFill,
  BsGraphUp
} from 'react-icons/bs';
import styles from "./style.module.css";
import api from '@/app/api';

export default function VisaoGeral() {
  const [dados, setDados] = useState({
    totalUsuarios: 0,
    totalCandidaturas: 0,
    totalImoveis: 0
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/v1/Dashboard/GetAll');
        setDados({
          totalUsuarios: response.data.totalUsuarios,
          totalCandidaturas: response.data.totalCandidaturas,
          totalImoveis: response.data.totalImoveis
        });
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setCarregando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.visaoGeralSection}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>
          <BsGraphUp className={styles.tituloIcon} />
          Visão Geral
        </h1>
        <div className={styles.badge}>
          <BsFillLightningChargeFill />
          Dados em Tempo Real
        </div>
      </div>
      
      <div className={styles.cardsContainer}>
        {/* Card Usuários */}
        <div className={`${styles.card} ${styles.cardUsuarios}`}>
          <div className={styles.cardBackground}></div>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <FiUsers />
            </div>
            <div className={styles.cardInfo}>
              <h3>Total de Usuários</h3>
              {carregando ? (
                <div className={styles.skeleton}></div>
              ) : (
                <p className={styles.valor}>{dados.totalUsuarios}</p>
              )}
            </div>
            <div className={styles.cardStats}>
              <BsArrowUpShort />
              <span>+12%</span>
            </div>
          </div>
          <div className={styles.cardWave}></div>
        </div>

        {/* Card Candidaturas */}
        <div className={`${styles.card} ${styles.cardCandidaturas}`}>
          <div className={styles.cardBackground}></div>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <FiFileText />
            </div>
            <div className={styles.cardInfo}>
              <h3>Total de Candidaturas</h3>
              {carregando ? (
                <div className={styles.skeleton}></div>
              ) : (
                <p className={styles.valor}>{dados.totalCandidaturas}</p>
              )}
            </div>
            <div className={styles.cardStats}>
              <BsArrowUpShort />
              <span>+8%</span>
            </div>
          </div>
          <div className={styles.cardWave}></div>
        </div>

        {/* Card Imóveis */}
        <div className={`${styles.card} ${styles.cardImoveis}`}>
          <div className={styles.cardBackground}></div>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
              <FiHome />
            </div>
            <div className={styles.cardInfo}>
              <h3>Total de Imóveis</h3>
              {carregando ? (
                <div className={styles.skeleton}></div>
              ) : (
                <p className={styles.valor}>{dados.totalImoveis}</p>
              )}
            </div>
            <div className={styles.cardStats}>
              <BsArrowUpShort />
              <span>+5%</span>
            </div>
          </div>
          <div className={styles.cardWave}></div>
        </div>
      </div>

      {/* Gráfico de Velas Moderno */}
      <div className={styles.graficoSection}>
        <h2 className={styles.graficoTitulo}>
          Análise Comparativa
          <span className={styles.graficoSubtitle}>Métricas em tempo real</span>
        </h2>
        
        <div className={styles.graficoContainer}>
          <div className={styles.graficoBars}>
            {/* Barra Usuários */}
            <div className={styles.barContainer}>
              <div className={styles.barLabel}>{dados.totalUsuarios}</div>
              <div 
                className={`${styles.bar} ${styles.barUsuarios}`}
                style={{ height: `${(dados.totalUsuarios / 10) * 100}%` }}
              >
                <div className={styles.barFill}></div>
                <div className={styles.barGlow}></div>
              </div>
              <div className={styles.barName}>Usuários</div>
            </div>
            
            {/* Barra Candidaturas */}
            <div className={styles.barContainer}>
              <div className={styles.barLabel}>{dados.totalCandidaturas}</div>
              <div 
                className={`${styles.bar} ${styles.barCandidaturas}`}
                style={{ height: `${(dados.totalCandidaturas / 10) * 100}%` }}
              >
                <div className={styles.barFill}></div>
                <div className={styles.barGlow}></div>
              </div>
              <div className={styles.barName}>Candidaturas</div>
            </div>
            
            {/* Barra Imóveis */}
            <div className={styles.barContainer}>
              <div className={styles.barLabel}>{dados.totalImoveis}</div>
              <div 
                className={`${styles.bar} ${styles.barImoveis}`}
                style={{ height: `${(dados.totalImoveis / 10) * 100}%` }}
              >
                <div className={styles.barFill}></div>
                <div className={styles.barGlow}></div>
              </div>
              <div className={styles.barName}>Imóveis</div>
            </div>
          </div>
          
          <div className={styles.graficoGrid}>
            {[100, 75, 50, 25, 0].map((value) => (
              <div key={value} className={styles.gridLine}>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}