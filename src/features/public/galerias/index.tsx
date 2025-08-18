import React, { useState, useEffect } from 'react';
import './style.css';

interface GalleryItem {
  id: number;
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  category: string;
  type: 'image' | 'video';
}

const galleryItems: GalleryItem[] = [
  // Existing Images
  {
    id: 1,
    src: '/src/assets/section/1 Image 2025-08-16 at 10.55.38.png',
    title: 'Casa Modelo',
    description: 'Espaço completo para sua família desfrutar momentos especiais',
    category: 'lazer',
    type: 'image'
  },
  {
    id: 2,
    src: '/src/assets/section/2 Image 2025-08-15 at 07.41.43.png',
    title: 'Vista Superior',
    description: 'Vista superior do condominio, com residencias por acabar',
    category: 'lazer',
    type: 'image'
  },
  {
    id: 3,
    src: '/src/assets/section/3 Image 2025-08-15 at 07.42.07.png',
    title: 'Fachada Principal',
    description: 'Entrada imponente e acolhedora do condomínio',
    category: 'Fachada',
    type: 'image'
  },
  {
    id: 4,
    src: '/src/assets/section/7 Image 2025-08-16 at 10.50.28.png',
    title: 'Área Externa',
    description: 'Áreas verdes bem cuidadas para momentos de tranquilidade',
    category: 'areas-verdes',
    type: 'image'
  },
  {
    id: 5,
    src: '/src/assets/section/Entrada.jpeg',
    title: 'Vista Frontal',
    description: 'Vista Frontal da Casa Modelo',
    category: 'Vista',
    type: 'image'
  },
  {
    id: 6,
    src: '/src/assets/logo/logo.png',
    title: 'Logo do Condomínio',
    description: 'Identidade visual moderna e sofisticada',
    category: 'identidade',
    type: 'image'
  },
  // New Residence Images
  {
    id: 7,
    src: '/src/assets/section/Garagem.jpeg',
    title: 'Garagem',
    description: 'Ambiente espaçoso e arejado com vista panorâmica',
    category: 'Garagem',
    type: 'image'
  },
  {
    id: 8,
    src: '/src/assets/section/Acesso.jpeg', 
    title: 'Vista Lateral',
    description: 'Vista lateral, com entrada para parte interna',
    category: 'residence',
    type: 'image'
  },
  {
    id: 9,
    src: '/src/assets/gallery/residences/apt-kitchen.jpg',
    title: 'Cozinha Gourmet',
    description: 'Cozinha completa com ilha central e área de serviço',
    category: 'residence',
    type: 'image'
  },
  {
    id: 10,
    src: '/src/assets/gallery/residences/apt-bathroom.jpg',
    title: 'Banheiro',
    description: 'Banheiro moderno com acabamento em porcelanato',
    category: 'residence',
    type: 'image'
  },
  // New Videos
  {
    id: 11,
    src: '/src/assets/section/videogeral.mp4',
    thumbnail: '/src/assets/gallery/thumbnails/tour-condominio.jpg',
    title: 'Tour do Condomínio',
    description: 'Conheça todas as áreas do nosso condomínio',
    category: 'tour',
    type: 'video'
  },
  {
    id: 12,
    src: '/src/assets/gallery/videos/piscina-drone.mp4',
    thumbnail: '/src/assets/gallery/thumbnails/piscina-drone.jpg',
    title: 'Piscina Aérea',
    description: 'Vista aérea da piscina e áreas de lazer',
    category: 'lazer',
    type: 'video'
  },
  {
    id: 13,
    src: '/src/assets/gallery/videos/academia-tour.mp4',
    thumbnail: '/src/assets/gallery/thumbnails/academia-tour.jpg',
    title: 'Tour da Academia',
    description: 'Conheça nossa academia completa e moderna',
    category: 'lazer',
    type: 'video'
  }
];

export default function Galeria() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'residence'>('all');
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  useEffect(() => {
    const filtered = galleryItems.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'image') return item.type === 'image';
      if (filter === 'video') return item.type === 'video';
      if (filter === 'residence') return item.category === 'residence';
      return true;
    });
    setFilteredItems(filtered);
  }, [filter]);

  const openModal = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const navigateItem = (direction: 'prev' | 'next') => {
    let newIndex = currentIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedItem) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      navigateItem('prev');
    } else if (e.key === 'ArrowRight') {
      navigateItem('next');
    }
  };

  return (
    <div className="galeria-container">
      <div className="galeria-header">
        <h1>Galeria Completa</h1>
        <p>Conheça nosso condomínio através de imagens e vídeos</p>
      </div>

      <div className="filter-container">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos
        </button>
        <button 
          className={`filter-btn ${filter === 'image' ? 'active' : ''}`}
          onClick={() => setFilter('image')}
        >
          Imagens
        </button>
        <button 
          className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
          onClick={() => setFilter('video')}
        >
          Vídeos
        </button>
        <button 
          className={`filter-btn ${filter === 'residence' ? 'active' : ''}`}
          onClick={() => setFilter('residence')}
        >
          Residências
        </button>
      </div>

      <div className="galeria-grid">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className="galeria-item"
            onClick={() => openModal(item, index)}
          >
            {item.type === 'image' ? (
              <img 
                src={item.src} 
                alt={item.title}
                loading="lazy"
              />
            ) : (
              <div className="video-item">
                <img 
                  src={item.thumbnail || item.src} 
                  alt={item.title}
                  loading="lazy"
                />
                <div className="play-overlay">
                  <div className="play-button">▶</div>
                </div>
              </div>
            )}
            <div className="galeria-item-info">
              <h3 className="galeria-item-title">{item.title}</h3>
              <p className="galeria-item-description">{item.description}</p>
              <span className={`item-type ${item.type}`}>{item.type === 'image' ? 'Imagem' : 'Vídeo'}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div 
          className="modal-overlay active"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {selectedItem.type === 'image' ? (
              <img 
                src={selectedItem.src} 
                alt={selectedItem.title}
              />
            ) : (
              <video 
                src={selectedItem.src} 
                controls 
                autoPlay
                className="modal-video"
              />
            )}
            
            <button 
              className="modal-nav modal-prev" 
              onClick={() => navigateItem('prev')}
            >
              ‹
            </button>
            
            <button 
              className="modal-nav modal-next" 
              onClick={() => navigateItem('next')}
            >
              ›
            </button>
            
            <div className="modal-info">
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
