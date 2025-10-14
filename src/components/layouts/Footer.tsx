'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowUp, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const anoAtual = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaFacebookF, 
      href: "https://facebook.com", 
      color: "hover:bg-blue-600",
      label: "Facebook"
    },
    { 
      icon: FaInstagram, 
      href: "https://instagram.com", 
      color: "hover:bg-gradient-to-br from-purple-600 to-pink-500",
      label: "Instagram"
    },
    { 
      icon: FaLinkedinIn, 
      href: "https://linkedin.com", 
      color: "hover:bg-blue-700",
      label: "LinkedIn"
    }
  ];

  const quickLinks = [
    { href: '/', label: 'Início' },
    { href: '/galeria', label: 'Galeria' },
    { href: "/localizacao", label: "Localização" },
    { href: '/contato', label: 'Contato' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden transition-colors duration-300">
      
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path 
            d="M0,250 Q250,150 500,250 T1000,250 L1000,500 L0,500 Z" 
            fill="currentColor" 
            className="text-orange-500"
          />
          <path 
            d="M0,300 Q250,200 500,300 T1000,300 L1000,500 L0,500 Z" 
            fill="currentColor" 
            className="text-red-500"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-12" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            className="fill-white dark:fill-gray-900"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section with Logo */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 group">
              {/* Logo */}
              <div className="relative">
                <Image 
                  src="/images/logo.png" 
                  alt="Condomínio Osvaldo MJ" 
                  width={80} 
                  height={80}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Brand Text */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Condomínio Osvaldo MJ
                </h3>
                <p className="text-lg text-orange-600 dark:text-orange-400 font-medium">
                  Zango-4 • Benfica
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-2"></div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg max-w-md">
              Residências T3 modernas e seguras para famílias, oferecendo 
              conforto e qualidade de vida excepcional em Luanda.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Navegação
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
            
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 group text-lg"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Localização
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg">📍</span>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-white font-semibold">Zango-4</p>
                  <p className="text-gray-600 dark:text-gray-400">Benfica, Luanda</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg">🏠</span>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-white font-semibold">T3 Modernas</p>
                  <p className="text-gray-600 dark:text-gray-400">Residências Seguras</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-white font-semibold">Alto Padrão</p>
                  <p className="text-gray-600 dark:text-gray-400">Qualidade Superior</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <p className="text-gray-600 dark:text-gray-400 text-lg text-center lg:text-left">
              © {anoAtual} <span className="text-gray-800 dark:text-white font-bold">Condomínio Osvaldo MJ</span>. 
              Todos os direitos reservados.
            </p>

            {/* Developer Credit */}
            <motion.a
              href="https://innovasoft360.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 text-lg transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
            >
              Desenvolvido por:{" "}
              <span className="text-orange-500 font-bold group-hover:text-orange-600">
                innovaSoft360
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </motion.button>
    </footer>
  );
}