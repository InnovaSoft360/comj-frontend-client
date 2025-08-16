import Map from "../../../../components/ui/map";
import { FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import "./style.css";
export default function LocalizatioSection() {
  return (
    <section className="localizacao-section">
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
