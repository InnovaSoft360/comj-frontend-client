import { Link } from "react-router-dom";
import heroBg from "../../../../assets/section/img.png";
import "./style.css";
export default function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="style-Main">
        <div className="hero-section-content">
          <div className="hero-section-info">
            <h2>
              Condomínio <span>Osvaldo MJ</span>
            </h2>
            <p>
              Residências T3 modernas e seguras para militares e suas famílias,
              localizadas na Província do Icolo e Bengo, <br />Bairro Zango-4.
            </p>
            <div className="nav-inf">
                <button className="btn-nav-inf candidatar">
                    <Link to="/">Candidatar-se</Link>
                </button>
                <button className="btn-nav-inf precesso">
                    <Link to="/">Precesso</Link>
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
