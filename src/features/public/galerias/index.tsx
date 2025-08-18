import React, { useState, useEffect } from 'react';
import img1 from "../../../assets/section/img.png";
import img2 from "../../../assets/section/img2.png";
import img3 from "../../../assets/section/img3.png";
import img4 from "../../../assets/section/img4.png";
import img5 from "../../../assets/section/img5.jpeg";
import img7 from "../../../assets/section/img7.jpeg";
import img8 from "../../../assets/section/img8.jpeg";
import video from "../../../assets/section/videogeral.mp4";

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
  { id: 1, src: img1, title: 'Casa Modelo', description: 'Espaço completo para sua família desfrutar momentos especiais', category: 'lazer', type: 'image' },
  { id: 2, src: img2, title: 'Vista Superior', description: 'Vista superior do condomínio, com residências por acabar', category: 'lazer', type: 'image' },
  { id: 3, src: img3, title: 'Fachada Principal', description: 'Entrada imponente e acolhedora do condomínio', category: 'Fachada', type: 'image' },
  { id: 4, src: img4, title: 'Área Externa', description: 'Áreas verdes bem cuidadas para momentos de tranquilidade', category: 'areas-verdes', type: 'image' },
  { id: 5, src: img5, title: 'Vista Frontal', description: 'Vista Frontal da Casa Modelo', category: 'Vista', type: 'image' },
  { id: 7, src: img7, title: 'Cozinha Gourmet', description: 'Cozinha completa com ilha central e área de serviço', category: 'residence', type: 'image' },
  { id: 8, src: img8, title: 'Banheiro', description: 'Banheiro moderno com acabamento em porcelanato', category: 'residence', type: 'image' },
  { id: 9, src: video, title: 'Tour do Condomínio', description: 'Conheça todas as áreas do nosso condomínio', category: 'tour', type: 'video' },
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

  const closeModal = () => setSelectedItem(null);

  const navigateItem = (direction: 'prev' | 'next') => {
    let newIndex = currentIndex;
    if (direction === 'prev') newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    else newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedItem) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') navigateItem('prev');
    else if (e.key === 'ArrowRight') navigateItem('next');
  };

  return (
    <div className="galeria-container">
      <div className="galeria-header">
        <h1>Galeria Completa</h1>
        <p>Conheça nosso condomínio através de imagens e vídeos</p>
      </div>

      <div className="filter-container">
        {['all', 'image', 'video', 'residence'].map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f as any)}
          >
            {f === 'all' ? 'Todos' : f === 'image' ? 'Imagens' : f === 'video' ? 'Vídeos' : 'Residências'}
          </button>
        ))}
      </div>

      <div className="galeria-grid">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="galeria-item" onClick={() => openModal(item, index)}>
            {item.type === 'image' ? (
              <img src={item.src} alt={item.title} loading="lazy" />
            ) : (
              <div className="video-item">
                {/* Use o próprio vídeo como preview */}
                <video src={item.src} muted preload="metadata" poster="" />
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
        <div className="modal-overlay active" onClick={closeModal} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {selectedItem.type === 'image' ? (
              <img src={selectedItem.src} alt={selectedItem.title} />
            ) : (
              <video src={selectedItem.src} controls autoPlay className="modal-video" />
            )}

            <button className="modal-nav modal-prev" onClick={() => navigateItem('prev')}>‹</button>
            <button className="modal-nav modal-next" onClick={() => navigateItem('next')}>›</button>

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
