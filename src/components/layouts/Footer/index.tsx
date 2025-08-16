import { Link } from "react-router-dom";
import "./style.css";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

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
                Residências exclusivas para militares e suas famílias,
                oferecendo segurança, conforto e qualidade de vida excepcional
                em um ambiente moderno e bem localizado.
              </p>
            </div>
            <div className="footer-card">
              <h3>Navegação rápida</h3>
              <ul>
                <li>
                  <Link to="/" className="navLink">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/" className="navLink">
                    Informações
                  </Link>
                </li>
                <li>
                  <Link to="/" className="navLink">
                    Galerias
                  </Link>
                </li>
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
            <p>
              © {anoAtual} Condomínio Osvaldo MJ. Todos os direitos reservados.
            </p>
          </div>
        </section>
      </section>
      <motion.button
        className="btnTop"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
}
