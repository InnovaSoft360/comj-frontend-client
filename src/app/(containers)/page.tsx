'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FaFileAlt, 
  FaSearch, 
  FaBuilding, 
  FaKey,
  FaShieldAlt,
  FaSwimmingPool,
  FaTree,
  FaCar,
  FaSolarPanel,
  FaTools,
  FaBed,
  FaBath,
  FaCheck,
  FaCarSide,
} from "react-icons/fa";

// Dados do slider
const sliderData = [
  {
    image: "/images/hero/slide1.png",
    mobileImage: "/images/hero/slide1.png",
    title: "Condomínio Osvaldo MJ",
    description: "Excelência em Zango-4"
  },
  {
    image: "/images/hero/slide2.png", 
    mobileImage: "/images/hero/slide2.png",
    title: "Segurança Absoluta",
    description: "Tranquilidade para sua família"
  },
  {
    image: "/images/hero/slide3.png",
    mobileImage: "/images/hero/slide3.png",
    title: "Design Moderno",
    description: "Arquitetura contemporânea"
  },
  {
    image: "/images/hero/slide4.png",
    mobileImage: "/images/hero/slide4.png",
    title: "Conforto Superior",
    description: "Qualidade de vida excepcional"
  }
];

// Dados do processo de candidatura
const processoData = [
  {
    numero: 1,
    icone: FaFileAlt,
    titulo: "Registro e Documentação",
    descricao: "Complete o formulário de registro online com seus dados pessoais e documentos necessários.",
    itens: [
      { icone: FaFileAlt, texto: "Cópia do BI" },
      { icone: FaFileAlt, texto: "Comprovativo de rendimentos" },
      { icone: FaCheck, texto: "Outros documentos" }
    ]
  },
  {
    numero: 2,
    icone: FaSearch,
    titulo: "Análise e Validação",
    descricao: "Nossa equipe analisará sua documentação e fará a verificação de elegibilidade.",
    itens: [
      { icone: FaCheck, texto: "Verificação de documentos" },
      { icone: FaCheck, texto: "Análise de crédito" },
      { icone: FaCheck, texto: "Confirmação de elegibilidade" }
    ]
  },
  {
    numero: 3,
    icone: FaBuilding,
    titulo: "Visita ao Condomínio",
    descricao: "Agende uma visita guiada ao condomínio para conhecer as instalações.",
    itens: [
      { icone: FaCheck, texto: "Tour guiado pelo condomínio" },
      { icone: FaCheck, texto: "Visita às unidades disponíveis" },
      { icone: FaCheck, texto: "Esclarecimento de dúvidas" }
    ]
  },
  {
    numero: 4,
    icone: FaKey,
    titulo: "Entrega das Chaves",
    descricao: "Após aprovação do financiamento e pagamento final, receba as chaves da sua nova casa!",
    itens: [
      { icone: FaCheck, texto: "Vistoria final da unidade" },
      { icone: FaCheck, texto: "Entrega das chaves" },
      { icone: FaCheck, texto: "Início da mudança" }
    ]
  }
];

// Dados das características
const caracteristicasData = [
  {
    icone: FaShieldAlt,
    titulo: "Segurança 24/7",
    descricao: "Sistema completo de segurança com vigilância 24 horas, controle de acesso e portaria eletrônica.",
    cor: "from-blue-500 to-cyan-600"
  },
  {
    icone: FaSwimmingPool,
    titulo: "Área de Lazer",
    descricao: "Piscina adulto e infantil, espaço kids, quadra poliesportiva e área de churrasco.",
    cor: "from-green-500 to-emerald-600"
  },
  {
    icone: FaTree,
    titulo: "Áreas Verdes",
    descricao: "Amplo jardim arborizado com paisagismo profissional e áreas de convivência ao ar livre.",
    cor: "from-emerald-500 to-green-600"
  },
  {
    icone: FaCar,
    titulo: "Estacionamento",
    descricao: "Vagas cobertas e descobertas para residentes e visitantes, com segurança monitorada.",
    cor: "from-gray-500 to-gray-700"
  },
  {
    icone: FaSolarPanel,
    titulo: "Energia Solar",
    descricao: "Sistema de energia solar para áreas comuns, garantindo sustentabilidade e economia.",
    cor: "from-yellow-500 to-orange-600"
  },
  {
    icone: FaTools,
    titulo: "Manutenção",
    descricao: "Equipe de manutenção permanente para rápida resolução de qualquer necessidade.",
    cor: "from-purple-500 to-pink-600"
  }
];

// Dados das plantas (usando imagens do slide)
const plantasData = [
  {
    tipo: "T3 Padrão",
    area: "120m²",
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    preco: "280.000.000 Kz",
    imagem: "/images/hero/slide1.png",
    destaques: ["Sala ampla", "Cozinha americana", "Varanda gourmet", "Suite master"]
  },
  {
    tipo: "T3 Premium",
    area: "140m²",
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    preco: "320.000.000 Kz",
    imagem: "/images/hero/slide2.png",
    destaques: ["Sala dupla", "Cozinha planejada", "Varanda ampla", "Closet suite"]
  },
  {
    tipo: "T3 Luxo",
    area: "160m²",
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    preco: "380.000.000 Kz",
    imagem: "/images/hero/slide3.png",
    destaques: ["Sala tripla", "Cozinha gourmet", "Varanda panorâmica", "Home office"]
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play do slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative h-screen w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={sliderData[currentSlide].image}
                  alt={sliderData[currentSlide].title}
                  fill
                  priority
                  quality={90}
                  sizes="100vw"
                  className="transition-all duration-300"
                  style={{
                    objectFit: 'cover',
                    objectPosition: isMobile ? 'center 25%' : 'center center',
                    filter: 'brightness(0.85) contrast(1.1)'
                  }}
                />
              </div>
              <div className={`absolute inset-0 ${isMobile ? 'bg-black/40' : 'bg-black/30'}`}></div>
            </motion.div>
          </AnimatePresence>

          {/* Conteúdo Hero */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="text-center w-full max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full"
                >
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight"
                  >
                    {sliderData[currentSlide].title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-3 sm:mt-4 md:mt-6"
                  >
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light tracking-wide sm:tracking-widest uppercase px-2 leading-relaxed">
                      {sliderData[currentSlide].description}
                    </p>
                  </motion.div>

                  
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-3">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  } ${isMobile ? 'w-4 h-4 rounded-lg' : 'w-3 h-3 rounded-full'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sessão 1: Processo de Candidatura */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Processo de <span className="text-orange-600">Candidatura</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Siga estas etapas simples para garantir sua residência no Condomínio Osvaldo MJ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {processoData.map((etapa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {etapa.numero}
                  </div>
                  <div className="text-3xl text-orange-600">
                    <etapa.icone />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {etapa.titulo}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {etapa.descricao}
                </p>
                
                <ul className="space-y-3">
                  {etapa.itens.map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                      <span className="text-orange-600 text-lg">
                        <item.icone />
                      </span>
                      <span className="font-medium">{item.texto}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessão 2: Características do Condomínio */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              <span className="text-orange-600">Características</span> Exclusivas
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Descubra tudo que o Condomínio Osvaldo MJ oferece para seu conforto e segurança
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caracteristicasData.map((caracteristica, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 dark:border-gray-600 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${caracteristica.cor} rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className={`w-16 h-16 bg-gradient-to-r ${caracteristica.cor} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <caracteristica.icone />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {caracteristica.titulo}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {caracteristica.descricao}
                </p>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessão 3: Plantas e Modelos */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Nossos <span className="text-orange-600">Modelos</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Escolha entre nossos modelos T3, todos com acabamento de alto padrão
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plantasData.map((planta, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-64 bg-gray-200 dark:bg-gray-600">
                  <Image
                    src={planta.imagem}
                    alt={planta.tipo}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-sm">
                      {planta.tipo}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        {planta.tipo}
                      </h3>
                      <p className="text-orange-600 font-bold text-xl">{planta.preco}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400">{planta.area}</p>
                      <p className="text-sm text-gray-500">{planta.quartos} Quartos</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl text-orange-600">
                        <FaBed />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{planta.quartos} Quartos</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-orange-600">
                        <FaBath />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{planta.banheiros} Banheiros</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-orange-600">
                        <FaCarSide />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{planta.vagas} Vagas</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {planta.destaques.map((destaque, i) => (
                      <div key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <span className="text-green-500 text-lg">
                          <FaCheck />
                        </span>
                        <span>{destaque}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessão 4: CTA Final */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Pronto para o seu <span className="text-yellow-300">novo lar</span>?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Realize o sonho da casa própria em um condomínio moderno, seguro e com todas 
              as comodidades que sua família merece.
            </p>
          
          </motion.div>
        </div>
      </section>
    </div>
  );
}