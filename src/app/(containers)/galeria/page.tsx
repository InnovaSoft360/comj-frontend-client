'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaExpand, FaHome, FaBuilding, FaCar, FaTree } from 'react-icons/fa';

// Dados das imagens (vou usar as mesmas do slider por enquanto)
const galleryImages = [
  {
    id: 1,
    src: "/images/hero/slide1.png",
    title: "Residências em Desenvolvimento",
    description: "Casas modernas em construção com design contemporâneo e áreas verdes integradas no condomínio planejado.",
    category: "construction",
    icon: FaHome
  },
  {
    id: 2,
    src: "/images/hero/slide1.png", 
    title: "Casa Modelo Pronta",
    description: "Residência completamente finalizada com acabamentos premium, pronta para entrega imediata aos novos moradores.",
    category: "completed",
    icon: FaBuilding
  },
  {
    id: 3,
    src: "/images/hero/slide1.png",
    title: "Fachada Principal",
    description: "Entrada monumental com portão eletrônico, segurança 24 horas e paisagismo cuidadosamente projetado.",
    category: "facade",
    icon: FaHome
  },
  {
    id: 4,
    src: "/images/hero/slide1.png",
    title: "Vista Frontal", 
    description: "Perspectiva frontal das residências mostrando arquitetura harmoniosa e integração com o ambiente urbano.",
    category: "view",
    icon: FaBuilding
  },
  {
    id: 5,
    src: "/images/hero/slide1.png",
    title: "Área de Lazer",
    description: "Espaços de convívio e recreação para todas as idades, com piscina e áreas de descanso.",
    category: "leisure",
    icon: FaTree
  },
  {
    id: 6,
    src: "/images/hero/slide1.png",
    title: "Estacionamento Coberto",
    description: "Área de garagem organizada com vagas cobertas e sistema de segurança para veículos dos residentes.",
    category: "parking",
    icon: FaCar
  },
  {
    id: 7,
    src: "/images/hero/slide1.png",
    title: "Vista Estacionamento",
    description: "Ampla área de estacionamento com iluminação LED e controle de acesso automatizado.",
    category: "parking", 
    icon: FaCar
  },
  {
    id: 8,
    src: "/images/hero/slide1.png",
    title: "Vista Lateral",
    description: "Visão lateral das construções destacando os volumes arquitetônicos e materiais de alta qualidade.",
    category: "view",
    icon: FaBuilding
  },
  {
    id: 9,
    src: "/images/hero/slide1.png",
    title: "Jardins Internos",
    description: "Paisagismo cuidadosamente planejado com espécies nativas e sistema de irrigação automatizado.",
    category: "leisure",
    icon: FaTree
  },
  {
    id: 10,
    src: "/images/hero/slide1.png",
    title: "Infraestrutura Completa",
    description: "Rede elétrica, hidráulica e de telecomunicações totalmente integradas e modernas.",
    category: "infrastructure",
    icon: FaBuilding
  },
  {
    id: 11,
    src: "/images/hero/slide1.png", 
    title: "Área Social",
    description: "Espaço gourmet e churrasqueira para eventos e confraternizações entre os moradores.",
    category: "leisure",
    icon: FaTree
  },
  {
    id: 12,
    src: "/images/hero/slide1.png",
    title: "Playground Infantil",
    description: "Área de brincadeiras segura e equipada para as crianças do condomínio.",
    category: "leisure",
    icon: FaTree
  }
];

const IMAGES_PER_PAGE = 6;
const categories = [
  { id: 'all', name: 'Todas', count: galleryImages.length },
  { id: 'construction', name: 'Em Construção', count: galleryImages.filter(img => img.category === 'construction').length },
  { id: 'completed', name: 'Prontas', count: galleryImages.filter(img => img.category === 'completed').length },
  { id: 'leisure', name: 'Lazer', count: galleryImages.filter(img => img.category === 'leisure').length },
  { id: 'parking', name: 'Estacionamento', count: galleryImages.filter(img => img.category === 'parking').length },
  { id: 'view', name: 'Vistas', count: galleryImages.filter(img => img.category === 'view').length },
];

export default function Galeria() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [zoom, setZoom] = useState(false);

  // Filtrar imagens por categoria
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Calcular paginação
  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const indexOfLastImage = currentPage * IMAGES_PER_PAGE;
  const indexOfFirstImage = indexOfLastImage - IMAGES_PER_PAGE;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

  // Funções de navegação
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (page: number) => setCurrentPage(page);

  // Funções do modal
  const openModal = (image: any) => setSelectedImage(image);
  const closeModal = () => {
    setSelectedImage(null);
    setZoom(false);
  };
  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setZoom(false);
  };
  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setZoom(false);
  };

  // Mudar categoria
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Nossa <span className="text-orange-600">Galeria</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça cada detalhe do Condomínio Osvaldo MJ através das nossas imagens
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white shadow-md'
              }`}
            >
              <span>{category.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid de Imagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentImages.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                onClick={() => openModal(item)}
              >
                {/* Container da Imagem */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay no Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white">
                        <FaExpand className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Categoria Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
                      <IconComponent className="w-3 h-3" />
                      <span>
                        {categories.find(cat => cat.id === item.category)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Informação da página */}
            <div className="text-gray-600 dark:text-gray-300 font-medium">
              Mostrando {indexOfFirstImage + 1}-{Math.min(indexOfLastImage, filteredImages.length)} de {filteredImages.length} imagens
            </div>

            {/* Controles de paginação */}
            <div className="flex items-center space-x-4">
              {/* Botão Anterior */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white shadow-md disabled:hover:bg-white/80 disabled:hover:text-gray-700"
              >
                <FaChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {/* Números das páginas */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white shadow-md'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Botão Próximo */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white shadow-md disabled:hover:bg-white/80 disabled:hover:text-gray-700"
              >
                <span>Próxima</span>
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Modal de Visualização */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
              
              {/* Botão Fechar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Botão Zoom */}
              <button
                onClick={() => setZoom(!zoom)}
                className="absolute top-4 right-16 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                {zoom ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H9" />
                  </svg>
                ) : (
                  <FaExpand className="w-6 h-6" />
                )}
              </button>

              {/* Botão Anterior */}
              <button
                onClick={prevImage}
                className="absolute left-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 hover:scale-110"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>

              {/* Botão Próximo */}
              <button
                onClick={nextImage}
                className="absolute right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 hover:scale-110"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>

              {/* Imagem */}
              <div className={`relative ${zoom ? 'w-full h-full cursor-zoom-out' : 'max-w-4xl max-h-[80vh] cursor-zoom-in'}`}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    zoom ? 'scale-100' : 'scale-95 hover:scale-100'
                  }`}
                  onClick={() => setZoom(!zoom)}
                />
              </div>

              {/* Informações da Imagem */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-xl p-6 text-white max-w-2xl w-full">
                <h3 className="text-2xl font-bold mb-2 text-center">{selectedImage.title}</h3>
                <p className="text-center text-gray-200">{selectedImage.description}</p>
                <div className="flex justify-center mt-3">
                  <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                    <selectedImage.icon className="w-3 h-3" />
                    <span>
                      {categories.find(cat => cat.id === selectedImage.category)?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contador */}
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}