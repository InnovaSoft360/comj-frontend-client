import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import {
  FaUserShield,
  FaFileAlt,
  FaBell,
  FaTasks
} from "react-icons/fa";

// Subpáginas
import Candidatura from "./candidatura";
import Notificacoes from "./notificacoes";
import Status from "./status";
import Perfil from "./perfil";

export default function Militar() {
  return (
    <section className="style-Main">
      <div className="militar-layout">
      {/* Sidebar */}
      <aside className="militar-sidebar">
        <h2>Área do Militar</h2>
        <nav>
          <NavLink
            to="/militar/candidatura"
            className={({ isActive }) => (isActive ? "link-active" : "")}
          >
            <FaFileAlt /> Candidatar
          </NavLink>

          <NavLink
            to="/militar/notificacoes"
            className={({ isActive }) => (isActive ? "link-active" : "")}
          >
            <FaBell /> Notificações
          </NavLink>

          <NavLink
            to="/militar/status"
            className={({ isActive }) => (isActive ? "link-active" : "")}
          >
            <FaTasks /> Status
          </NavLink>

          <NavLink
            to="/militar/perfil"
            className={({ isActive }) => (isActive ? "link-active" : "")}
          >
            <FaUserShield /> Perfil
          </NavLink>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="militar-main">
        <Routes>
          <Route path="/" element={<Navigate to="candidatura" replace />} />
          <Route path="candidatura" element={<Candidatura />} />
          <Route path="notificacoes" element={<Notificacoes />} />
          <Route path="status" element={<Status />} />
          <Route path="perfil" element={<Perfil />} />
        </Routes>
      </main>
    </div>
    </section>
  );
}
