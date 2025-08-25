import type { GalleryImageItem } from './types';

// Importe suas imagens aqui
import img1 from "../../../../assets/section/img.png";
import img2 from "../../../../assets/section/img2.png";
import img3 from "../../../../assets/section/img3.png";
import img4 from "../../../../assets/section/img4.png";
import img7 from "../../../../assets/section/img7.jpeg";
import img8 from "../../../../assets/section/img8.jpeg";

export const galleryImages: GalleryImageItem[] = [

  { id: 1, src: img1, title: 'Residêcias em Desenvolvimento', description: 'Casas modernas em construção com design contemporâneo e áreas verdes integradas no condomínio planejado.'},

  { id: 2, src: img2, title: 'Casa Modelo Pronta', description: 'Residência completamente finalizada com acabamentos premium, pronta para entrega imediata aos novos moradores.'},

  { id: 3, src: img3, title: 'Fachada Principal', description: 'Entrada monumental com portão eletrônico, segurança 24 horas e paisagismo cuidadosamente projetado.'},

  { id: 4, src: img4, title: 'Vista Frontal', description: 'Perspectiva frontal das residências mostrando arquitetura harmoniosa e integração com o ambiente urbano.'},

  { id: 7, src: img7, title: 'Vista Estacionamento', description: 'Área de garagem organizada com vagas cobertas e sistema de segurança para veículos dos residentes' },

  { id: 8, src: img8, title: 'Vista Lateral', description: 'Visão lateral das construções destacando os volumes arquitetônicos e materiais de alta qualidade.'},
];