import { FaUser, FaFileAlt, FaHome, FaSignOutAlt } from "react-icons/fa";
import "./style.css";
import logo from "../../../assets/logo/logo.png";

interface SideBarProps {
  onSelect: (item: string) => void;
}

export default function SideBar({ onSelect }: SideBarProps) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo"><img src={logo} /></h2>
      <ul className="sidebar-menu">
        <li onClick={() => onSelect("Dashboard")}>
          <FaHome className="icon" /> Dashboard
        </li>
        <li onClick={() => onSelect("GestaoUsuario")}>
          <FaUser className="icon" /> Gestão de Usuário
        </li>
        <li onClick={() => onSelect("GestaoCandidatura")}>
          <FaFileAlt className="icon" /> Gestão de Candidatura
        </li>
        <li onClick={() => onSelect("GestaoImovel")}>
          <FaHome className="icon" /> Gestão de Imóvel
        </li>
      </ul>
      <button className="sidebar-logout">
        <FaSignOutAlt className="icon" /> Logout
      </button>
    </div>
  );
}
