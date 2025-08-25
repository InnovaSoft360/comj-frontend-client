import { useState } from 'react';
import { FiHome, FiUsers, FiFileText, FiSettings, FiLogOut, FiMenu, FiChevronDown, FiChevronUp, FiArrowUp } from 'react-icons/fi';
import styles from './style.module.css';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [openSubmenus, setOpenSubmenus] = useState<{[key: string]: boolean}>({
    usuarios: false,
    candidaturas: false,
    imoveis: false
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Dados para o gráfico de candlestick (velas)
  const candleData = [
    { open: 150, close: 180, high: 190, low: 140 },
    { open: 180, close: 170, high: 190, low: 160 },
    { open: 170, close: 190, high: 200, low: 165 },
    { open: 190, close: 220, high: 230, low: 185 },
    { open: 220, close: 210, high: 230, low: 200 },
    { open: 210, close: 230, high: 240, low: 205 },
    { open: 230, close: 250, high: 260, low: 225 },
  ];

  const maxValue = Math.max(...candleData.map(c => c.high));
  const minValue = Math.min(...candleData.map(c => c.low));

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <nav className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.logo}>
          {!sidebarCollapsed && <h2>Admin Panel</h2>}
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <FiMenu />
          </button>
        </div>
        
        <ul className={styles.menu}>
          <li 
            className={`${styles.menuItem} ${activeMenu === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            <span className={styles.menuIcon}><FiHome /></span>
            {!sidebarCollapsed && <span className={styles.menuText}>Dashboard</span>}
          </li>
          
          {/* Usuários Submenu */}
          <li className={styles.menuItemWithSubmenu}>
            <div 
              className={`${styles.menuHeader} ${openSubmenus.usuarios ? styles.open : ''}`}
              onClick={() => toggleSubmenu('usuarios')}
            >
              <span className={styles.menuIcon}><FiUsers /></span>
              {!sidebarCollapsed && (
                <>
                  <span className={styles.menuText}>Usuários</span>
                  <span className={styles.arrow}>
                    {openSubmenus.usuarios ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </>
              )}
            </div>
            {!sidebarCollapsed && openSubmenus.usuarios && (
              <ul className={styles.submenu}>
                <li className={styles.submenuItem}>Listar Usuários</li>
                <li className={styles.submenuItem}>Criar Usuário</li>
                <li className={styles.submenuItem}>Permissões</li>
              </ul>
            )}
          </li>
          
          {/* Candidaturas Submenu */}
          <li className={styles.menuItemWithSubmenu}>
            <div 
              className={`${styles.menuHeader} ${openSubmenus.candidaturas ? styles.open : ''}`}
              onClick={() => toggleSubmenu('candidaturas')}
            >
              <span className={styles.menuIcon}><FiFileText /></span>
              {!sidebarCollapsed && (
                <>
                  <span className={styles.menuText}>Candidaturas</span>
                  <span className={styles.arrow}>
                    {openSubmenus.candidaturas ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </>
              )}
            </div>
            {!sidebarCollapsed && openSubmenus.candidaturas && (
              <ul className={styles.submenu}>
                <li className={styles.submenuItem}>Todas Candidaturas</li>
                <li className={styles.submenuItem}>Pendentes</li>
                <li className={styles.submenuItem}>Aprovadas</li>
                <li className={styles.submenuItem}>Arquivadas</li>
              </ul>
            )}
          </li>
          
          {/* Imóveis Submenu */}
          <li className={styles.menuItemWithSubmenu}>
            <div 
              className={`${styles.menuHeader} ${openSubmenus.imoveis ? styles.open : ''}`}
              onClick={() => toggleSubmenu('imoveis')}
            >
              <span className={styles.menuIcon}><FiHome /></span>
              {!sidebarCollapsed && (
                <>
                  <span className={styles.menuText}>Imóveis</span>
                  <span className={styles.arrow}>
                    {openSubmenus.imoveis ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </>
              )}
            </div>
            {!sidebarCollapsed && openSubmenus.imoveis && (
              <ul className={styles.submenu}>
                <li className={styles.submenuItem}>Listar Imóveis</li>
                <li className={styles.submenuItem}>Adicionar Imóvel</li>
                <li className={styles.submenuItem}>Categorias</li>
                <li className={styles.submenuItem}>Status</li>
              </ul>
            )}
          </li>
          
          <li className={styles.menuItem}>
            <span className={styles.menuIcon}><FiSettings /></span>
            {!sidebarCollapsed && <span className={styles.menuText}>Configurações</span>}
          </li>
          
          <li className={styles.menuItem}>
            <span className={styles.menuIcon}><FiLogOut /></span>
            {!sidebarCollapsed && <span className={styles.menuText}>Sair</span>}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Pesquisar..." />
          </div>
          <div className={styles.userProfile}>
            <span>Admin</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        <div className={styles.content}>
          <h1>Visão Geral do Dashboard</h1>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{background: 'var(--color-orange-001)'}}>
                <FiUsers />
              </div>
              <div className={styles.statInfo}>
                <h3>Total de Usuários</h3>
                <p className={styles.statNumber}>1,245</p>
                <span className={styles.statTrend}><FiArrowUp /> 12% desde o mês passado</span>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{background: 'var(--color-green-001)'}}>
                <FiFileText />
              </div>
              <div className={styles.statInfo}>
                <h3>Total de Candidaturas</h3>
                <p className={styles.statNumber}>568</p>
                <span className={styles.statTrend}><FiArrowUp /> 5% desde o mês passado</span>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{background: 'var(--color-orange-003)'}}>
                <FiHome />
              </div>
              <div className={styles.statInfo}>
                <h3>Total de Imóveis</h3>
                <p className={styles.statNumber}>892</p>
                <span className={styles.statTrend}><FiArrowUp /> 8% desde o mês passado</span>
              </div>
            </div>
          </div>

          <div className={styles.chartSection}>
            <h2>Desempenho Mensal</h2>
            <div className={styles.candleStickChart}>
              <div className={styles.chartContainer}>
                {candleData.map((candle, index) => {
                  const isPositive = candle.close >= candle.open;
                  const bodyHeight = 180 * Math.abs(candle.close - candle.open) / (maxValue - minValue);
                  const bodyOffset = 180 * (Math.max(candle.open, candle.close) - minValue) / (maxValue - minValue);
                  const wickOffset = 180 * (candle.high - minValue) / (maxValue - minValue);
                  
                  return (
                    <div key={index} className={styles.candleGroup}>
                      <div 
                        className={styles.candleWick} 
                        style={{ height: `${wickOffset}px` }}
                      />
                      <div 
                        className={`${styles.candleBody} ${isPositive ? styles.positive : styles.negative}`}
                        style={{ 
                          height: `${bodyHeight}px`, 
                          transform: `translateY(${bodyOffset}px)` 
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={styles.chartAxis}>
                {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'].map((month, idx) => (
                  <span key={idx}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}