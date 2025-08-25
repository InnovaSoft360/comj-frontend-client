import { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';
import { galleryVideos } from './videos';

const VIDEOS_PER_PAGE = 6;

export default function GaleriaVideo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeVideo, setActiveVideo] = useState<{src: string, title: string} | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Calcular o índice dos vídeos para a página atual
  const indexOfLastVideo = currentPage * VIDEOS_PER_PAGE;
  const indexOfFirstVideo = indexOfLastVideo - VIDEOS_PER_PAGE;
  const currentVideos = galleryVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  
  // Calcular o total de páginas
  const totalPages = Math.ceil(galleryVideos.length / VIDEOS_PER_PAGE);
  
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
  
  // Funções para controle de vídeo
  const openVideo = (video: {src: string, title: string}) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };
  
  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideo(null);
    setIsPlaying(false);
  };
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  // Fechar o modal ao pressionar ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideo();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);
  
  // Criar espaços vazios se necessário para manter o layout
  const emptyItems = Array(VIDEOS_PER_PAGE - currentVideos.length).fill(null);

  return (
    <section className={styles.galeriaSection}>
      <div className={styles.mainGaleria}>
        <div className={styles.header}>
          <h2 className={styles.title}>Galeria de Vídeos</h2>
          <p className={styles.subtitle}>Conheça nosso empreendimento através dos nossos vídeos</p>
        </div>
        
        <div className={styles.galleryGrid}>
          {currentVideos.map((video) => (
            <div key={video.id} className={styles.galleryItem}>
              <div className={styles.videoContainer}>
                <video
                  className={styles.videoPlayer}
                  src={video.src}
                  muted
                  loop
                  playsInline
                />
                <div className={styles.videoControls}>
                  <button 
                    className={styles.playButton}
                    onClick={() => openVideo(video)}
                  ></button>
                  <button 
                    className={styles.fullscreenButton}
                    onClick={() => openVideo(video)}
                  ></button>
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{video.title}</h3>
                <p className={styles.itemDescription}>{video.description}</p>
              </div>
            </div>
          ))}
          
          {/* Espaços vazios para manter o layout quando não houver 6 vídeos */}
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
        
        {/* Modal de vídeo */}
        <div 
          className={`${styles.videoModal} ${activeVideo ? styles.active : ''}`}
          onClick={closeVideo} // Fecha ao clicar fora do vídeo
        >
          {activeVideo && (
            <div 
              className={styles.videoModalContent}
              onClick={(e) => e.stopPropagation()} // Impede que o clique propague para o modal
            >
              <button 
                className={styles.closeButton} 
                onClick={closeVideo}
                aria-label="Fechar vídeo"
              >
                ×
              </button>
              
              <video
                ref={videoRef}
                className={styles.modalVideoPlayer}
                src={activeVideo.src}
                autoPlay={isPlaying}
                controls={false}
              />
              
              <div className={styles.modalControls}>
                <button 
                  className={styles.modalPlayPause} 
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                
                <button 
                  className={styles.modalFullscreen} 
                  onClick={toggleFullscreen}
                  aria-label="Tela cheia"
                >
                  <span>⛶</span> Tela Cheia
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}