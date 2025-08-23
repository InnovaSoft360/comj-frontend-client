import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import logo from "../../../assets/logo/logo.png";
import { useState, useEffect } from "react";
import api from "../../../core/api"

// Ícones
import {
  HiOutlineHome as IconHome,
  HiOutlineInformationCircle as IconInfo,
} from "react-icons/hi";
import { MdPhotoLibrary as IconGallery } from "react-icons/md";
import { GiRank3 as IconMilitary } from "react-icons/gi";
import { FaSignOutAlt as IconLogout } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
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

  return (
    <header>
      <div className="style-Main">
        <nav className="navBar">
          <div className="navBarLogo">
            <Link to="/" className="navLink" onClick={closeMenu}>
              <img src={logo} alt="logo" width={90} className="logo" />
            </Link>
          </div>

          <ul className={`navMenu ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" className="navLink" onClick={closeMenu}>
                <IconHome /> Início
              </Link>
            </li>
            <li>
              <Link to="/informacao" className="navLink" onClick={closeMenu}>
                <IconInfo /> Informações
              </Link>
            </li>
            <li>
              <Link to="/galeria" className="navLink" onClick={closeMenu}>
                <IconGallery /> Galeria
              </Link>
            </li>

            <li>
              <Link to="/galeria" className="navLink" onClick={closeMenu}>
                <IconGallery /> Candidatar
              </Link>
            </li>

            <li>
              <Link to="/galeria" className="navLink" onClick={closeMenu}>
                <IconGallery /> Perfil
              </Link>
            </li>
            
            {/* Link Militar - APENAS quando logado */}
            {isAuthenticated && (
              <li>
                <Link to="/militar" className="navLink" onClick={closeMenu}>
                  <IconMilitary /> Militar
                </Link>
              </li>
            )}

            {/* Botão Entrar/Sair */}
            <li className="navBtn">
              {isAuthenticated ? (
                // Botão Sair quando logado
                <button onClick={handleLogout} className="logout-btn">
                  <IconLogout /> Sair
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
}