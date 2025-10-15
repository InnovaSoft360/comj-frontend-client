export interface GalleryImageItem {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
  icon: any; // Componente de ícone
}

export interface Category {
  id: string;
  name: string;
  count: number;
}