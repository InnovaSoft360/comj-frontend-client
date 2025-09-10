// Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiChevronDown as IconChevronDown } from "react-icons/hi";
import api from "../../../app/api";
import logo from "../../../assets/logo/logo.png";
import styles from "./style.module.css";
import { useAlert } from "../../../components/ui/customAlert"; 

export default function Header() {
  const { showAlert, AlertContainer } = useAlert();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLUListElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = () => {
    closeMenu();
    scrollToTop();
  };

  // Efeitos e Handlers
  useEffect(() => {
    checkAuthentication();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkAuthentication = async (): Promise<void> => {
    try {
      setIsCheckingAuth(true);
      const response = await api.get("/v1/Auth/CheckAuth");
      setIsAuthenticated(response.data.authenticated);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setActiveDropdown(null);
    }
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName: string): void => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const handleMouseEnter = (dropdownName: string): void => {
    if (!isMobile) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleMouseLeave = (): void => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await api.post("/v1/Auth/Logout");
      setIsAuthenticated(false);
      closeMenu();
      navigate("/");
      showAlert("Logout realizado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      showAlert("Erro ao fazer logout.", "error");
    }
  };

  if (isCheckingAuth) {
    return (
      <header className={styles.header}>
        <div className={styles.main}>
          <AlertContainer />
          <nav className={styles.navBar}>
            <div className={styles.logoContainer}>
              <Link to="/" className={styles.navLink}>
                <img src={logo} alt="logo" width={90} className={styles.logo} />
              </Link>
            </div>
            <div className={styles.loading}>Carregando...</div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.main}>
        <nav className={styles.navBar}>
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.navLink} onClick={handleLinkClick}>
              <img src={logo} alt="logo" width={90} className={styles.logo} />
            </Link>
          </div>

          <ul 
            className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`} 
            ref={dropdownRef}
          >
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink} onClick={handleLinkClick}>
                Início
              </Link>
            </li>
            
            <li className={styles.navItem}>
              <Link to="/etapas" className={styles.navLink} onClick={handleLinkClick}>
                Etapas
              </Link>
            </li>

            {/* Menu Galeria */}
            <li 
              className={`${styles.navItemWithDropdown} ${activeDropdown === 'galeria' ? styles.active : ''}`}
              onMouseEnter={() => handleMouseEnter('galeria')}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className={styles.dropdownTrigger}
                onClick={() => toggleDropdown('galeria')}
              >
                <span className={styles.dropdownTitle}>
                  Galeria <IconChevronDown className={`${styles.dropdownArrow} ${activeDropdown === 'galeria' ? styles.active : ''}`} />
                </span>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'galeria' ? styles.active : ''}`}>
                <li>
                  <Link to="/galeria/imagem" onClick={handleLinkClick}>Imagens</Link>
                </li>
                <li>
                  <Link to="/galeria/video" onClick={handleLinkClick}>Videos</Link>
                </li>
              </ul>
            </li>

            {/* Menu Candidatura */}
            {isAuthenticated && (
              <li 
                className={`${styles.navItemWithDropdown} ${activeDropdown === 'candidatura' ? styles.active : ''}`}
                onMouseEnter={() => handleMouseEnter('candidatura')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className={styles.dropdownTrigger}
                  onClick={() => toggleDropdown('candidatura')}
                >
                  <span className={styles.dropdownTitle}>
                    Candidatura <IconChevronDown className={`${styles.dropdownArrow} ${activeDropdown === 'candidatura' ? styles.active : ''}`} />
                  </span>
                </div>
                <ul className={`${styles.dropdownMenu} ${activeDropdown === 'candidatura' ? styles.active : ''}`}>
                  <li>
                    <Link to="/candidaturas/formulario" onClick={handleLinkClick}>Formulário</Link>
                  </li>
                  <li>
                    <Link to="/candidatura/estado" onClick={handleLinkClick}>Estado</Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Menu Perfil */}
            {isAuthenticated && (
              <li 
                className={`${styles.navItemWithDropdown} ${activeDropdown === 'perfil' ? styles.active : ''}`}
                onMouseEnter={() => handleMouseEnter('perfil')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className={styles.dropdownTrigger}
                  onClick={() => toggleDropdown('perfil')}
                >
                  <span className={styles.dropdownTitle}>
                    Perfil <IconChevronDown className={`${styles.dropdownArrow} ${activeDropdown === 'perfil' ? styles.active : ''}`} />
                  </span>
                </div>
                <ul className={`${styles.dropdownMenu} ${activeDropdown === 'perfil' ? styles.active : ''}`}>
                  <li>
                    <Link to="/perfil/dados" onClick={handleLinkClick}>Meus Dados</Link>
                  </li>
                  <li>
                    <Link to="/perfil/editar" onClick={handleLinkClick}>Editar Perfil</Link>
                  </li>
                  <li>
                    <Link to="/perfil/senha" onClick={handleLinkClick}>Alterar Senha</Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Botão Entrar/Sair */}
            <li className={styles.navButton}>
              {isAuthenticated ? (
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Sair
                </button>
              ) : (
                <button className={styles.loginButton}>
                  <Link to="/login" onClick={closeMenu}>
                    Entrar
                  </Link>
                </button>
              )}
            </li>
          </ul>
          
          <div
            className={`${styles.menuToggle} ${menuOpen ? styles.active : ""}`}
            onClick={toggleMenu}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </nav>
      </div>
    </header>
  );
}