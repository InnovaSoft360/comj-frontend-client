import "./style.css";
import { FaPhone, FaClock, FaBullseye, FaSmile } from "react-icons/fa";

export default function DashboardCards() {
  const cards = [
    { id: 1, icon: <FaPhone />, title: "Chamadas Recebidas", value: "32.94K" },
    { id: 2, icon: <FaClock />, title: "Duração Total", value: "824K Min" },
    { id: 3, icon: <FaBullseye />, title: "Duração Média", value: "25 Min" },
    { id: 4, icon: <FaSmile />, title: "Satisfação (CSAT)", value: "5.5" },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card) => (
        <div key={card.id} className="dashboard-card">
          <div className="card-icon">{card.icon}</div>
          <div className="card-info">
            <span className="card-title">{card.title}</span>
            <span className="card-value">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
