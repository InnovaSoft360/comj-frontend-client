import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { motion, type Variants } from "framer-motion";
import { FaArrowUp, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  // Animação para os cards do footer - com tipo explicitamente definido
  const cardVariants: Variants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={styles.shapeFill}></path>
        </svg>
      </div>
      
      <section className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <motion.div 
            className={styles.footerTop}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className={styles.footerCard} variants={cardVariants}>
              <div className={styles.footerLogo}>
                <h3>Condomínio Osvaldo MJ</h3>
                <div className={styles.logoUnderline}></div>
              </div>
              <p>
                Residências exclusivas para militares e suas famílias,
                oferecendo segurança, conforto e qualidade de vida excepcional
                em um ambiente moderno e bem localizado.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Facebook" className={styles.socialLink}>
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="Instagram" className={styles.socialLink}>
                  <FaInstagram />
                </a>
                <a href="#" aria-label="Twitter" className={styles.socialLink}>
                  <FaTwitter />
                </a>
                <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                  <FaLinkedinIn />
                </a>
              </div>
            </motion.div>

            <motion.div className={styles.footerCard} variants={cardVariants}>
              <h3>Navegação rápida</h3>
              <div className={styles.underline}></div>
              <ul>
                <li>
                  <Link to="/" className={styles.navLink}>
                    <span className={styles.linkIcon}>→</span> Início
                  </Link>
                </li>
                <li>
                  <Link to="/" className={styles.navLink}>
                    <span className={styles.linkIcon}>→</span> Informações
                  </Link>
                </li>
                <li>
                  <Link to="/" className={styles.navLink}>
                    <span className={styles.linkIcon}>→</span> Galerias
                  </Link>
                </li>
                <li>
                  <Link to="/" className={styles.navLink}>
                    <span className={styles.linkIcon}>→</span> Contato
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div className={styles.footerCard} variants={cardVariants}>
              <h3>Contato</h3>
              <div className={styles.underline}></div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <p>Bairro Zango-4, Icolo e Bengo</p>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <p>+244 900 000 000</p>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <p>condominio.osvaldo.mj@gmail.com</p>
              </div>
            </motion.div>
          </motion.div>

          <div className={styles.footerBottom}>
            <p>
              © {anoAtual} Condomínio Osvaldo MJ. Todos os direitos reservados.
            </p>
            <div className={styles.footerLinks}>
              <Link to="/dashboard">Política de Privacidade</Link>
            </div>
          </div>
        </div>
      </section>

      <motion.button
        className={styles.btnTop}
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