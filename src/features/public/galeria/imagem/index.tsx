import { useState } from 'react';
import styles from './style.module.css';
import { galleryImages } from './images';

const IMAGES_PER_PAGE = 6;

export default function GaleriaImagem() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calcular o índice das imagens para a página atual
  const indexOfLastImage = currentPage * IMAGES_PER_PAGE;
  const indexOfFirstImage = indexOfLastImage - IMAGES_PER_PAGE;
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);
  
  // Calcular o total de páginas
  const totalPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);
  
  // Funções para navegação
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Criar espaços vazios se necessário para manter o layout
  const emptyItems = Array(IMAGES_PER_PAGE - currentImages.length).fill(null);

  return (
    <section className={styles.galeriaImagemSection}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nossa Galeria</h2>
          <p className={styles.subtitle}>Conheça nossos imóveis e espaços</p>
        </div>
        
        <div className={styles.galleryGrid}>
          {currentImages.map((item) => (
            <div key={item.id} className={styles.galleryItem}>
              <div className={styles.imageContainer}>
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
          
          {/* Espaços vazios para manter o layout quando não houver 6 imagens */}
          {emptyItems.map((_, index) => (
            <div key={`empty-${index}`} className={styles.emptySpace}></div>
          ))}
        </div>
        
        <div className={styles.pagination}>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            ← Anterior
          </button>
          
          <span className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Próxima →
          </button>
        </div>
      </div>
    </section>
  );
}