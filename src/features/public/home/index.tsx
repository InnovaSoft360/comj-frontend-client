import "./style.css";
import heroBg from "../../../assets/section/1 Image 2025-08-16 at 10.55.38.png";
import Map from "../../../components/ui/map/Map";
import { FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

export default function Home() {
  return (
    <section>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="style-Main">
        <div className="hero-section-content">
          <div className="hero-section-info">
            <h2>Condomínio <span>Osvaldo MJ</span></h2>
            <p>
              Residências T3 modernas e seguras para militares e suas famílias, localizadas na Província do Icolo e Bengo, Bairro Zango-4.
            </p>
          </div>
          </div>
        </div>
      </section>

      <div className="style-Main">
        <section className="localizacao">
          <div className="localizacao-inf">
            <h3>
              Localização <span>Estratégica</span>
            </h3>

            <div className="localizacao-inf-div">
              <h4>
                <FaMapMarkerAlt className="icon" /> Endereço Completo
              </h4>
              <p>Província do Icolo e Bengo</p>
              <p>Bairro Zango-4</p>
              <p>Imediações da SiAC</p>
            </div>

            <div className="localizacao-inf-div">
              <h4>
                <FaBuilding className="icon" /> Proximidades
              </h4>
              <p>
                Próximo a escolas, hospitais, centros comerciais e transporte
                público. Acesso fácil às principais vias de Luanda.
              </p>
            </div>
          </div>

          <div className="localizacao-map">
            <Map />
          </div>
        </section>
      </div>
    </section>
  );
}
