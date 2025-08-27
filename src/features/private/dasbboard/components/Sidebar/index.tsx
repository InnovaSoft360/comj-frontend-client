import { useState } from 'react';
import { FiHome, FiUsers, FiFileText, FiSettings, FiLogOut, FiMenu, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
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
        <li 
          className={`${styles.menuItem} ${activeContent === 'visao-geral' ? styles.active : ''}`}
          onClick={() => navigateToContent('visao-geral')}
        >
          <span className={styles.menuIcon}><FiHome /></span>
          {!sidebarCollapsed && <span className={styles.menuText}>Dashboard</span>}
          {sidebarCollapsed && <span className={styles.tooltip}>Dashboard</span>}
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
            {sidebarCollapsed && <span className={styles.tooltip}>Usuários</span>}
          </div>
          {!sidebarCollapsed && openSubmenus.usuarios && (
            <ul className={styles.submenu}>
              <li 
                className={styles.submenuItem} 
                onClick={() => navigateToContent('listar-usuarios')}
              >
                Tabela de Usuários
              </li>
              <li 
                className={styles.submenuItem}
                onClick={() => navigateToContent('criar-usuario')}
              >
                Criar Usuário
              </li>
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
            {sidebarCollapsed && <span className={styles.tooltip}>Candidaturas</span>}
          </div>
          {!sidebarCollapsed && openSubmenus.candidaturas && (
            <ul className={styles.submenu}>
              <li 
                className={styles.submenuItem}
                onClick={() => navigateToContent('todas-candidaturas')}
              >
                Visão Geral
              </li>
              <li 
                className={styles.submenuItem}
                onClick={() => navigateToContent('aprovadas')}
              >
                Tabela
              </li>
              <li 
                className={styles.submenuItem}
                onClick={() => navigateToContent('arquivadas')}
              >
                Avaliação
              </li>
            </ul>
          )}
        </li>
        
        <li className={styles.menuItem}>
          <span className={styles.menuIcon}><FiSettings /></span>
          {!sidebarCollapsed && <span className={styles.menuText}>Configurações</span>}
          {sidebarCollapsed && <span className={styles.tooltip}>Configurações</span>}
        </li>
        
        {/* Botão Sair com funcionalidade de logout */}
        <li className={styles.menuItem} onClick={handleLogout}>
          <span className={styles.menuIcon}><FiLogOut /></span>
          {!sidebarCollapsed && <span className={styles.menuText}>Sair</span>}
          {sidebarCollapsed && <span className={styles.tooltip}>Sair</span>}
        </li>
      </ul>
    </nav>
  );
}