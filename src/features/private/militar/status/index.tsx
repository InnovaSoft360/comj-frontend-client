import { FaClock } from "react-icons/fa";
import "./style.css";

export default function Status() {
  return (
    <div className="status-wrapper">
      <div className="status status-pendente">
        <FaClock className="icon" />
        <div className="status-content">
          <span className="status-title">Pendente</span>
          <span className="status-desc">
            Sua candidatura foi recebida! Aguarde até <strong>15 dias</strong> para análise e aprovação.
          </span>
        </div>
      </div>
    </div>
  );
}
