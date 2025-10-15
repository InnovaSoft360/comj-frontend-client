'use client';

import { FaMapMarkerAlt, FaCar, FaBus, FaWalking, FaClock, FaPhone, FaWhatsapp } from "react-icons/fa";

export default function Localizacao() {
  const locationInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Endereço Exato",
      description: "Zango-4, Benfica, Município de Belas, Luanda - Angola",
      details: "Projeto Habitacional Osvaldo MJ, Lote específico conforme agendamento"
    },
    {
      icon: FaCar,
      title: "De Carro",
      description: "Acesso pela EN-100",
      details: "Aproximadamente 25-30 minutos do centro de Luanda, dependendo do trânsito"
    },
    {
      icon: FaBus,
      title: "Transporte Público",
      description: "Autocarros e Candongueiros",
      details: "Linhas que passam pelo Zango-4 com paragem próxima ao condomínio"
    },
    {
      icon: FaWalking,
      title: "Acesso Pedonal",
      description: "Áreas Seguras para Peões",
      details: "Passeios e passadeiras disponíveis nas principais vias de acesso"
    }
  ];

  const amenities = [
    { name: "Supermercados", distance: "500m" },
    { name: "Escolas", distance: "1km" },
    { name: "Farmácias", distance: "800m" },
    { name: "Parques", distance: "300m" },
    { name: "Centros de Saúde", distance: "1.2km" },
    { name: "Bancos", distance: "2km" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Nossa <span className="text-orange-600">Localização</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Situado no coração do Zango-4, um dos locais mais privilegiados de Luanda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FaMapMarkerAlt className="w-6 h-6 text-red-500 mr-3" />
                  Localização Exacta
                </h2>
              </div>
              
              {/* Google Maps Embed */}
              <div className="relative h-96 lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.109194791949!2d13.3985436!3d-9.087145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a5205d78b5aeda1%3A0x1b42d18386b283dd!2sProjeto%20habitacional%20Osvaldo%20MJ!5e0!3m2!1spt-PT!2sao!4v1723801234567!5m2!1spt-PT!2sao"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.1) saturate(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-2xl"
                  title="Localização do Condomínio Osvaldo MJ"
                />
                
                {/* Overlay Info */}
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      Você está aqui
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Info Sidebar */}
          <div className="space-y-6">
            {locationInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        {item.description}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Nearby Amenities */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FaWalking className="w-6 h-6 text-green-500 mr-3" />
              Comodidades Próximas
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {amenity.name}
                    </span>
                    <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-2 py-1 rounded-full text-sm font-bold">
                      {amenity.distance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visit Information */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaClock className="w-6 h-6 mr-3" />
              Agendar Visita
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="font-semibold">Segunda a Sexta: 8h00 - 18h00</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="font-semibold">Sábado: 9h00 - 13h00</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="font-semibold">Domingo: Por marcação</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/244935751955"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full bg-white text-orange-600 py-3 px-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Agendar por WhatsApp</span>
              </a>
              
              <a
                href="tel:+244935751955"
                className="flex items-center justify-center space-x-2 w-full bg-white/20 text-white py-3 px-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                <FaPhone className="w-5 h-5" />
                <span>Ligar Agora</span>
              </a>
            </div>
          </div>
        </div>

        {/* Transportation Tips */}
        <div className="mt-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Dicas de Transporte
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <FaCar className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Estacionamento</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Amplo estacionamento disponível para visitantes
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <FaBus className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Transporte Público</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Várias linhas de autocarros com paragem próxima
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <FaWalking className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Acesso Pedonal</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Passeios seguros e bem iluminados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}