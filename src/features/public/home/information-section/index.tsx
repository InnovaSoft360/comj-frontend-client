import { FaHome, FaShieldAlt, FaUsers } from "react-icons/fa";
import "./style.css";

export default function InformationSection() {
  return (
    <section className="information-section">
      <div className="style-Main">
        <div className="information-context-section">
          <h1>Residências T3 <span>Premium</span></h1>
          <p>
            Todas as residências são do tipo T3, projetadas para oferecer máximo conforto, segurança e funcionalidade para sua família
          </p>
        </div>
        <div className="info-container">

          {/* Estrutura T3 Completa */}
          <div className="info-card estrutura">
            <div className="info-card-context">
              <div className="icon-container">
                <FaHome size={32} />
              </div>
              <h3>Estrutura T3 Completa</h3>
            </div>
            <ul>
              <li>3 Quartos espaçosos</li>
              <li>2 Casas de banho</li>
              <li>Sala de estar e jantar</li>
              <li>Cozinha equipada</li>
              <li>Área de serviço</li>
              <li>Varanda privativa</li>
            </ul>
          </div>

          {/* Segurança Total 24h */}
          <div className="info-card seguranca">
            <div className="info-card-context">
              <div className="icon-container">
                <FaShieldAlt size={32} />
              </div>
              <h3>Segurança Total 24h</h3>
            </div>
            <ul>
              <li>Portaria com controle de acesso</li>
              <li>Vigilância 24 horas</li>
              <li>Circuito fechado de TV</li>
              <li>Iluminação perimetral</li>
              <li>Controle de visitantes</li>
              <li>Ambiente seguro para famílias</li>
            </ul>
          </div>

          {/* Comodidades Exclusivas */}
          <div className="info-card comodidades">
            <div className="info-card-context">
              <div className="icon-container">
                <FaUsers size={32} />
              </div>
              <h3>Comodidades Exclusivas</h3>
            </div>
            <ul>
              <li>Piscina comunitária</li>
              <li>Academia equipada</li>
              <li>Playground infantil</li>
              <li>Jardins paisagísticos</li>
              <li>Estacionamento privativo</li>
              <li>Área de convivência</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
