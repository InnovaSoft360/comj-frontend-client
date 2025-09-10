import { useState } from 'react';
import { 
  FiHome,
  FiLogOut, 
  FiMenu, 
  FiChevronDown, 
  FiChevronUp, 
  FiX,
  FiBarChart2,
  FiUserCheck,
  FiClipboard,
  FiTrendingUp
} from 'react-icons/fi';
import styles from './style.module.css';

interface SidebarProps {
  activeContent: string;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  navigateToContent: (content: string) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  handleLogout: () => void;
}

export default function Sidebar({
  activeContent,
  sidebarCollapsed,
  mobileMenuOpen,
  navigateToContent,
  toggleSidebar,
  toggleMobileMenu,
  handleLogout
}: SidebarProps) {
  const [openSubmenus, setOpenSubmenus] = useState<{[key: string]: boolean}>({
    dashboard: false, // Abrir por padrão
    usuarios: false,
    candidaturas: false,
    imoveis: false
  });

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <nav className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
      <div className={styles.logo}>
        {!sidebarCollapsed && <h2>Admin Panel</h2>}
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <button className={styles.mobileCloseButton} onClick={toggleMobileMenu}>
          <FiX />
        </button>
      </div>
      
      <ul className={styles.menu}>
        {/* Dashboard Submenu */}
        <li className={styles.menuItemWithSubmenu}>
          <div 
            className={`${styles.menuHeader} ${openSubmenus.dashboard ? styles.open : ''} ${activeContent.includes('visao') ? styles.activeParent : ''}`}
            onClick={() => toggleSubmenu('dashboard')}
          >
            <span className={styles.menuIcon}><FiHome /></span>
            {!sidebarCollapsed && (
              <>
                <span className={styles.menuText}>Dashboard</span>
                <span className={styles.arrow}>
                  {openSubmenus.dashboard ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </>
            )}
            {sidebarCollapsed && <span className={styles.tooltip}>Dashboard</span>}
          </div>
          {(!sidebarCollapsed || mobileMenuOpen) && openSubmenus.dashboard && (
            <ul className={styles.submenu}>
              <li 
                className={`${styles.submenuItem} ${activeContent === 'visao-geral' ? styles.active : ''}`}
                onClick={() => navigateToContent('visao-geral')}>
                <FiBarChart2 className={styles.submenuIcon} />
                <span>Visão Geral</span>
              </li>
              <li 
                className={`${styles.submenuItem} ${activeContent === 'visao-geral-candidaturas' ? styles.active : ''}`}
                onClick={() => navigateToContent('visao-geral-candidaturas')}
              >
                <FiTrendingUp className={styles.submenuIcon} />
                <span>Visão Candidaturas</span>
              </li>
            </ul>
          )}
        </li>

        
        {/* Usuários */}
        <li 
          className={`${styles.menuItem} ${activeContent === 'gestao-usuario' ? styles.active : ''}`} 
          onClick={() => navigateToContent('gestao-usuario')}
        >
          <span className={styles.menuIcon}><FiUserCheck /></span>
          {!sidebarCollapsed && <span className={styles.menuText}>Gestão Usuário</span>}
          {sidebarCollapsed && <span className={styles.tooltip}>Gestão Usuário</span>}
        </li>
        
        {/* Candidaturas */}
        <li 
          className={`${styles.menuItem} ${activeContent === 'gestao-candidatura' ? styles.active : ''}`} 
          onClick={() => navigateToContent('gestao-candidatura')}
        >
          <span className={styles.menuIcon}><FiClipboard /></span>
          {!sidebarCollapsed && <span className={styles.menuText}>Gestão Candidatura</span>}
          {sidebarCollapsed && <span className={styles.tooltip}>Gestão Candidatura</span>}
        </li>
        
        {/* Botão Sair com funcionalidade de logout */}
        <li className={`${styles.menuItem} ${styles.logoutItem}`} onClick={handleLogout}>
          <span className={styles.menuIcon}><FiLogOut /></span>
          {!sidebarCollapsed && <span className={styles.menuText}>Sair</span>}
          {sidebarCollapsed && <span className={styles.tooltip}>Sair</span>}
        </li>
      </ul>
      
      {/* Badge de versão ou status */}
      {!sidebarCollapsed && (
        <div className={styles.footer}>
          <div className={styles.status}>
            <div className={styles.statusIndicator}></div>
            <span>Sistema Online</span>
          </div>
          <div className={styles.version}>v1.0.0</div>
        </div>
      )}
    </nav>
  );
}