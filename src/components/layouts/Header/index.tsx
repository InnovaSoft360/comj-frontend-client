//#region IMPORTS
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiChevronDown as IconChevronDown } from "react-icons/hi";
import api from "../../../core/api"
import logo from "../../../assets/logo/logo.png";
import "./styles.css";
//#endregion

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLUListElement>(null);

  //#region Efeitos e Handlers
  useEffect(() => {
    // Verificar autenticação ao carregar o componente
    checkAuthentication();
    
    // Verificar tamanho da tela
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Fechar menu ao redimensionar para desktop
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fechar dropdown ao clicar fora
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
    // Fechar dropdowns ao abrir/fechar menu mobile
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
      // No mobile, alternar entre abrir/fechar
      if (activeDropdown === dropdownName) {
        setActiveDropdown(null);
      } else {
        setActiveDropdown(dropdownName);
      }
    } else {
      // No desktop, apenas definir como ativo (mouseover vai cuidar do resto)
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
      alert("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao fazer logout.");
    }
  };
  //#endregion

  //#region Renderização condicional
  if (isCheckingAuth) {
    return (
      <header>
        <div className="style-Main">
          <nav className="navBar">
            <div className="navBarLogo">
              <Link to="/" className="navLink">
                <img src={logo} alt="logo" width={90} className="logo" />
              </Link>
            </div>
            <div>Carregando...</div>
          </nav>
        </div>
      </header>
    );
  }
  //#endregion

  //#region  RENDERIZAÇÃO PRINCIPAL
  return (
    <header>
      <div className="style-Main">
        <nav className="navBar">
          <div className="navBarLogo">
            <Link to="/" className="navLink" onClick={closeMenu}>
              <img src={logo} alt="logo" width={90} className="logo" />
            </Link>
          </div>

          <ul 
            className={`navMenu ${menuOpen ? "active" : ""}`} 
            ref={dropdownRef}
          >
            <li>
              <Link to="/" className="navLink" onClick={closeMenu}>
                Início
              </Link>
            </li>
            <li>
              <Link to="/etapas" className="navLink" onClick={closeMenu}>
                Etapas
              </Link>
            </li>

            {/* Menu Galeria com Dropdown - SEMPRE visível */}
            <li 
              className={`navItemWithDropdown ${activeDropdown === 'galeria' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('galeria')}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="navLink dropdownTrigger"
                onClick={() => toggleDropdown('galeria')}
              >
                <span className="divicon">Galeria <IconChevronDown className={`dropdown-arrow ${activeDropdown === 'galeria' ? 'active' : ''}`} /></span>
              </div>
              <ul className={`dropdownMenu ${activeDropdown === 'galeria' ? 'active' : ''}`}>
                <li>
                  <Link to="/galeria/imagem" onClick={closeMenu}>Imagens</Link>
                </li>
                <li>
                  <Link to="/galeria/video" onClick={closeMenu}>Videos</Link>
                </li>
              </ul>
            </li>

            {/* Menu Candidatura com Dropdown - APENAS quando logado */}
            {isAuthenticated && (
              <li 
                className={`navItemWithDropdown ${activeDropdown === 'candidatura' ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('candidatura')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="navLink dropdownTrigger"
                  onClick={() => toggleDropdown('candidatura')}
                >
                  <span className="divicon">Candidatura <IconChevronDown className={`dropdown-arrow ${activeDropdown === 'candidatura' ? 'active' : ''}`} /></span>
                </div>
                <ul className={`dropdownMenu ${activeDropdown === 'candidatura' ? 'active' : ''}`}>
                  <li>
                    <Link to="/candidaturas/formulario" onClick={closeMenu}>Formulário</Link>
                  </li>
                  <li>
                    <Link to="/candidatura/estado" onClick={closeMenu}>Estado</Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Menu Perfil com Dropdown - APENAS quando logado */}
            {isAuthenticated && (
              <li 
                className={`navItemWithDropdown ${activeDropdown === 'perfil' ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('perfil')}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="navLink dropdownTrigger"
                  onClick={() => toggleDropdown('perfil')}
                >
                  <span className="divicon">Perfil <IconChevronDown className={`dropdown-arrow ${activeDropdown === 'perfil' ? 'active' : ''}`} /></span>
                </div>
                <ul className={`dropdownMenu ${activeDropdown === 'perfil' ? 'active' : ''}`}>
                  <li>
                    <Link to="/perfil/dados" onClick={closeMenu}>Meus Dados</Link>
                  </li>
                  <li>
                    <Link to="/perfil/editar" onClick={closeMenu}>Editar Perfil</Link>
                  </li>
                  <li>
                    <Link to="/perfil/senha" onClick={closeMenu}>Alterar Senha</Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Botão Entrar/Sair */}
            <li className="navBtn">
              {isAuthenticated ? (
                // Botão Sair quando logado
                <button onClick={handleLogout} className="logout-btn">
                  Sair
                </button>
              ) : (
                // Botão Entrar quando deslogado
                <button>
                  <Link to="/login" onClick={closeMenu}>
                    Entrar
                  </Link>
                </button>
              )}
            </li>
          </ul>
          
          <div
            className={`menuToggle ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </div>
    </header>
  );
  //#endregion
}