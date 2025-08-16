import { Link } from "react-router-dom";
import "./style.css";

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer>
      <section className="style-Main">
        <section className="footer-container">
          <div className="footer-top">
            <div className="footer-card">
              <h3>Condomínio Osvaldo MJ</h3>
              <p>
                Residências exclusivas para militares e suas famílias, oferecendo segurança, conforto e qualidade de vida excepcional em um ambiente moderno e bem localizado.
              </p>
            </div>
            <div className="footer-card">
              <h3>Navegação rápida</h3>
              <ul>
                <li><Link to="/" className="navLink">Início</Link></li>
                <li><Link to="/" className="navLink">Informações</Link></li>
                <li><Link to="/" className="navLink">Galerias</Link></li>
              </ul>
            </div>
            <div className="footer-card">
              <h3>Contato</h3>
              <p>Bairro Zango-4, Icolo e Bengo</p>
              <p>+244 900 000 000</p>
              <p>info@condominio-osvaldo.ao</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {anoAtual} Condomínio Osvaldo MJ. Todos os direitos reservados.</p>
          </div>
        </section>
      </section>
    </footer>
  );
}
