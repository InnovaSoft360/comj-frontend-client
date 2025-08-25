import type { GalleryVideoItem } from './types';

// Importe seus vídeos aqui
import video1 from "../../../../assets/section/videogeral.mp4";

export const galleryVideos: GalleryVideoItem[] = [
  { 
    id: 1, 
    src: video1, 
    title: 'Tour Completo', 
    description: 'Conheça cada detalhe do nosso condomínio'
  },
  { 
    id: 2, 
    src: video1, 
    title: 'Área de Lazer', 
    description: 'Todas as opções de entretenimento disponíveis'
  },
  { 
    id: 3, 
    src: video1, 
    title: 'Plantas dos Apartamentos', 
    description: 'Modelos e variedade de plantas disponíveis'
  },
  { 
    id: 4, 
    src: video1, 
    title: 'Localização', 
    description: 'Vantagens da nossa localização privilegiada'
  },
  { 
    id: 5, 
    src: video1, 
    title: 'Depoimentos', 
    description: 'O que nossos moradores têm a dizer'
  },
  { 
    id: 6, 
    src: video1, 
    title: 'Tour Noturno', 
    description: 'Veja como é o condomínio durante a noite'
  },
];