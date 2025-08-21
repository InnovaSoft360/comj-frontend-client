import SideBar from "../../../components/layouts/SideBar";
import DashboardCards from "./DashboardCards";
import "./style.css";
import { useState } from "react";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardCards />;
      case "GestaoUsuario":
        return <h2>Gestão de Usuário</h2>;
      case "GestaoCandidatura":
        return <h2>Gestão de Candidatura</h2>;
      case "GestaoImovel":
        return <h2>Gestão de Imóvel</h2>;
      default:
        return <DashboardCards />;
    }
  };

  return (
    <div className="app-container">
      <SideBar onSelect={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
