import { useState } from "react";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./style.css";

type StatusType = "Pendente" | "Aprovado" | "Negado";

export default function Status() {
  // Estado inicial: Pendente
  const [status, setStatus] = useState<StatusType>("Pendente");

  const renderStatus = () => {
    switch (status) {
      case "Pendente":
        return (
          <div className="status status-pendente">
            <FaClock className="icon" /> Pendente
          </div>
        );
      case "Aprovado":
        return (
          <div className="status status-aprovado">
            <FaCheckCircle className="icon" /> Aprovado
          </div>
        );
      case "Negado":
        return (
          <div className="status status-negado">
            <FaTimesCircle className="icon" /> Negado
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="status-wrapper">
      {renderStatus()}

      {/* 🔹 Botões de teste - só para simular mudança de status */}
      <div className="status-buttons">
        <button onClick={() => setStatus("Pendente")}>Pendente</button>
        <button onClick={() => setStatus("Aprovado")}>Aprovado</button>
        <button onClick={() => setStatus("Negado")}>Negado</button>
      </div>
    </div>
  );
}
