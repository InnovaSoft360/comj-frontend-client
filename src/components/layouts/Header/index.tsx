import { Link } from "react-router-dom";
import "./styles.css";
import logo from "../../../assets/logo/logo.png";
import { useState } from "react";

// Ícones
import {
  HiOutlineHome as IconHome,
  HiOutlineInformationCircle as IconInfo,
  HiOutlinePhotograph as IconGallery,
} from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="style-Main">
        <nav className="navBar">
          <div className="navBarLogo">
            <Link to="/" className="navLink" onClick={closeMenu}>
              <img src={logo} alt="logo" width={90} className="logo" />
            </Link>
          </div>

          {/* aqui já corrigi */}
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
                <IconGallery /> Galerias
              </Link>
            </li>
            <div className="navBtn">
              <button>
                <Link to="/login" onClick={closeMenu}>
                  Entrar
                </Link>
              </button>
            </div>
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
