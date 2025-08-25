import { useState, useEffect, useRef, type JSX } from 'react';
import styles from './style.module.css';

// Definir tipos para os ícones
type IconComponent = () => JSX.Element;

interface ProximityItem {
  icon: IconComponent;
  text: string;
}

export default function LocalizacaoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Data for proximity items - agora passamos os componentes diretamente
  const proximityItems: ProximityItem[] = [
    { icon: EscolaIcon, text: "Escolas" },
    { icon: HospitalIcon, text: "Hospitais" },
    { icon: ShoppingIcon, text: "Centros Comerciais" },
    { icon: OnibusIcon, text: "Transporte Público" }
  ];

  return (
    <section 
      className={styles.localizacaoSection} 
      id="localizacao"
      ref={sectionRef}
    >
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Localização <span>Estratégica</span></h2>
        
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.109194791949!2d13.3985436!3d-9.087145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a5205d78b5aeda1%3A0x1b42d18386b283dd!2sProjeto%20habitacional%20Osvaldo%20MJ!5e0!3m2!1spt-PT!2sao!4v1723801234567!5m2!1spt-PT!2sao"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa do Condomínio Osvaldo MJ"
              ></iframe>
            </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.infoSection}>
              <h3 className={styles.infoTitle}>
                <MapMarkerIcon /> Endereço Completo
              </h3>
              <div className={styles.address}>
                <p>Província do Icolo e Bengo</p>
                <p>Bairro Zango-4</p>
                <p>Imediações da SiAC</p>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3 className={styles.infoTitle}>
                <BuildingIcon /> Proximidades
              </h3>
              <p className={styles.description}>
                Próximo a escolas, hospitais, centros comerciais e transporte
                público. Acesso fácil às principais vias de Luanda.
              </p>
              
              <div className={styles.proximityGrid}>
                {proximityItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className={styles.proximityItem}>
                      <span className={styles.proximityIcon}>
                        <IconComponent />
                      </span>
                      <span className={styles.proximityText}>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SVG Icons - mantenha estas funções como estão
function MapMarkerIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 384 512" width="20" height="20">
      <path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 448 512" width="20" height="20">
      <path fill="currentColor" d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c极速赛车开奖直播历史记录 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 极速赛车开奖直播历史记录 5.373-12 12-12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-极速赛车开奖直播历史记录v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 极速赛车开奖直播历史记录v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"/>
    </svg>
  );
}

function EscolaIcon() {
  return (
    <svg className={styles.proximityIcon} viewBox="0 0 640 512" width="18" height="18">
      <path fill="currentColor" d="M0 224v272c0 8.84 7.16 16 16 极速赛车开奖直播历史记录h80c8.84 0 16-7.16 16-16V224c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16zm544 176h-80v-96h80v96zm-224 96h80V224h-80v272zm240 0h80V224h-80v272zm-240 0h80V224h-80v272zm-32 0V224h-80v272h80zm-96 0V224H96v272h80zM128 96H256V0H128v96zm347.98 155.95L448 202.67V144c0-8.84-7.16-16-16-16H368c-8.84 0-16 7.16-16 16v40.67l-27.98-49.38c-4.13-7.27-13.57-10.41-21.7-7.44-7.27 4.13-10.41 13.57-7.44 21.7l48 84.62c2.73 4.82 7.83 7.83 13.28 7.83 1.79 0 3.6-.35 5.33-1.08 7.27-4.13 10.41-13.57 7.44-21.7l-13.31-23.49V272h64v28.93l-13.31 23.49c-2.97 8.13.17 17.57 7.44 21.7 7.29 4.14 16.73 1 21.71-7.43l48-84.62c2.97-8.14-.17-17.58-7.44-21.71-8.15-2.97-17.58.17-21.71 7.44z"/>
    </svg>
  );
}

function HospitalIcon() {
  return (
    <svg className={styles.proximityIcon} viewBox="0 0 448 512" width="18" height="18">
      <path fill="currentColor" d="M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm0 128h40c6.627 0 12-5.373 12-12v-40c极速赛车开奖直播历史记录-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm160 0h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12z"/>
    </svg>
  );
}

function ShoppingIcon() {
  return (
    <svg className={styles.proximityIcon} viewBox="0 0 576 512" width="18" height="18">
      <path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/>
    </svg>
  );
}

function OnibusIcon() {
  return (
    <svg className={styles.proximityIcon} viewBox="0 0 512 512" width="18" height="18">
      <path fill="currentColor" d="M488 128h-8V80c0-44.8-99.2-80-224-80S32 35.2 32 80v48h-8c-13.25 0-24 10.74-24 24v80c0 13.25 10.75 24 24 24h8v160c0 17.67 14.33 32 32 32v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h192v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h6.4c16 0 25.6-12.8 25.6-25.6V256h8c13.25 0 24-10.75 24-24v-80c0-13.26-10.75-24-24-24zM112 400c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm16-112c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h256c17.67 0 32 14.33 32 32v128c0 17.67-14.33 32-32 32H128zm272 112c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/>
    </svg>
  );
}