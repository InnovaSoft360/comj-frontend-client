'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Dados do slider - foco em visual impactante
const sliderData = [
  {
    image: "/images/hero/slide1.png",
    title: "Condomínio Osvaldo MJ",
    description: "Excelência em Zango-4"
  },
  {
    image: "/images/hero/slide2.png", 
    title: "Segurança Absoluta",
    description: "Tranquilidade para sua família"
  },
  {
    image: "/images/hero/slide3.png",
    title: "Design Moderno",
    description: "Arquitetura contemporânea"
  },
  {
    image: "/images/hero/slide4.png",
    title: "Conforto Superior",
    description: "Qualidade de vida excepcional"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play do slider - 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section Ultra Minimalista */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Slider Container */}
        <div className="relative h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {/* Imagem de Fundo com opacidade perfeita */}
              <Image
                src={sliderData[currentSlide].image}
                alt={sliderData[currentSlide].title}
                fill
                className="object-cover"
                priority
                style={{ 
                  filter: 'brightness(0.85) contrast(1.1)'
                }}
              />
              
              {/* Overlay sutil para melhor legibilidade */}
              <div className="absolute inset-0 bg-black/30"></div>
            </motion.div>
          </AnimatePresence>

          {/* Conteúdo Central Ultra Clean */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-3xl mx-auto"
                >
                  {/* Título Principal - Limpo e Impactante */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-tighter"
                  >
                    {sliderData[currentSlide].title}
                  </motion.h1>

                  {/* Descrição - Minimalista */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <p className="text-2xl md:text-3xl text-white/90 font-light tracking-widest uppercase">
                      {sliderData[currentSlide].description}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Indicadores de Progresso - Discretos */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-white' 
                      : 'bg-white/30'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Scroll Indicator - Elegante */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section de Destaques - Visualmente Atraente */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-gray-800 dark:text-white mb-6">
              Condomínio Osvaldo MJ
            </h2>
            <div className="w-32 h-0.5 bg-gray-300 dark:bg-gray-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Residências T3 modernas no coração do Zango-4
            </p>
          </motion.div>

          {/* Grid de Features Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: "📍",
                title: "Localização Privilegiada",
                description: "Zango-4, Benfica"
              },
              {
                icon: "🏠", 
                title: "Residências T3",
                description: "Design moderno e funcional"
              },
              {
                icon: "🛡️",
                title: "Segurança Total",
                description: "Ambiente protegido e familiar"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="text-center p-8"
              >
                <div className="text-4xl mb-4 text-gray-600 dark:text-gray-400">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}