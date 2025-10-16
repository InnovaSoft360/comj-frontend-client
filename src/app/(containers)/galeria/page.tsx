// app/galeria/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Dados das imagens da galeria (usando as mesmas imagens do slider)
const galleryImages = [
  {
    id: 1,
    src: "/images/hero/slide1.png",
    title: "Condomínio Osvaldo MJ",
    description: "Vista panorâmica do condomínio mostrando a excelência em arquitetura e urbanismo em Zango-4."
  },
  {
    id: 2,
    src: "/images/hero/slide2.png",
    title: "Segurança Absoluta",
    description: "Sistema completo de segurança 24 horas garantindo tranquilidade total para sua família."
  },
  {
    id: 3,
    src: "/images/hero/slide3.png",
    title: "Design Moderno",
    description: "Arquitetura contemporânea com acabamentos premium e design inovador."
  },
  {
    id: 4,
    src: "/images/hero/slide4.png",
    title: "Conforto Superior",
    description: "Ambientes amplos e bem planejados para oferecer máxima qualidade de vida."
  },
  {
    id: 5,
    src: "/images/hero/slide1.png",
    title: "Áreas Verdes",
    description: "Paisagismo cuidadosamente projetado com amplas áreas de convivência ao ar livre."
  },
  {
    id: 6,
    src: "/images/hero/slide2.png",
    title: "Infraestrutura Completa",
    description: "Toda a infraestrutura necessária para seu conforto e bem-estar diário."
  },
  {
    id: 7,
    src: "/images/hero/slide3.png",
    title: "Lazer e Entretenimento",
    description: "Espaços de lazer equipados para toda a família aproveitar momentos especiais."
  },
  {
    id: 8,
    src: "/images/hero/slide4.png",
    title: "Localização Privilegiada",
    description: "Posicionamento estratégico no Zango-4 com fácil acesso a principais vias."
  },
  {
    id: 9,
    src: "/images/hero/slide1.png",
    title: "Acabamentos Premium",
    description: "Materiais de primeira qualidade em todos os ambientes das residências."
  },
  {
    id: 10,
    src: "/images/hero/slide2.png",
    title: "Sustentabilidade",
    description: "Projetos que respeitam o meio ambiente com tecnologias sustentáveis."
  },
  {
    id: 11,
    src: "/images/hero/slide3.png",
    title: "Comunidade Integrada",
    description: "Espírito de comunidade em um ambiente seguro e acolhedor para todos."
  },
  {
    id: 12,
    src: "/images/hero/slide4.png",
    title: "Futuro Brilhante",
    description: "Investimento seguro em um dos condomínios mais promissores da região."
  }
];

const IMAGES_PER_PAGE = 6;

export default function Galeria() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Função para ir para página específica
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Grid de Imagens - Começa direto com o conteúdo */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-700"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full font-bold text-sm backdrop-blur-sm">
                      {image.id}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {image.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {image.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-orange-600 font-semibold text-sm">
                    <span>Ver detalhes</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Paginação */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-between mt-16 space-y-4 sm:space-y-0"
            >
              {/* Botão Anterior */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Anterior</span>
              </button>

              {/* Indicadores de Página */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                      page === currentPage
                        ? 'bg-orange-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-orange-400 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Botão Próxima */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                <span>Próxima</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Info da Página */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 dark:text-gray-400">
              Mostrando {indexOfFirstImage + 1}-{Math.min(indexOfLastImage, galleryImages.length)} de {galleryImages.length} imagens
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal de Imagem Ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-96 sm:h-[500px]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  {selectedImage.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}