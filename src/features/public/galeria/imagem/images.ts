import type { GalleryImageItem } from './types';

// Importe suas imagens aqui
import img1 from "../../../../assets/section/img.png";
import img2 from "../../../../assets/section/img2.png";
import img3 from "../../../../assets/section/img3.png";
import img5 from "../../../../assets/section/img5.jpeg";
import img7 from "../../../../assets/section/img7.jpeg";

export const galleryImages: GalleryImageItem[] = [
  { id: 1, src: img1, title: 'Casa Modelo', description: 'Espaço completo para sua família desfrutar momentos especiais'},
  { id: 2, src: img2, title: 'Vista Superior', description: 'Vista superior do condomínio, com residências por acabar'},
  { id: 3, src: img3, title: 'Fachada Principal', description: 'Entrada imponente e acolhedora do condomínio'},
  { id: 5, src: img5, title: 'Vista Frontal', description: 'Vista Frontal da Casa Modelo'},
  { id: 7, src: img7, title: 'Cozinha Gourmet', description: 'Cozinha completa com ilha central e área de serviço' },
];