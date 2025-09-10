import { Link } from "react-router-dom";
import heroBg from "@/assets/section/img2.png";
import styles from "./style.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection} style={{ backgroundImage: `url(${heroBg})` }}>
      <div className={styles.styleMain}>
        <div className={styles.heroSectionContent}>
          <div className={styles.heroSectionInfo}>
            <h2>
              Condomínio <span>Osvaldo MJ</span>
            </h2>
            <p>
              Residências T3 modernas e seguras para militares e suas famílias,
              localizadas na Província do Icolo e Bengo, <br />Bairro Zango-4.
            </p>
            <div className={styles.navInf}>
                <button className={`${styles.btnNavInf} ${styles.candidatar}`}>
                    <Link to="/">Candidatar-se</Link>
                </button>
                <button className={`${styles.btnNavInf} ${styles.precesso}`}>
                    <Link to="/">Precesso</Link>
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}