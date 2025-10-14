'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dark Mode Effect
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const menuItems = [
    { href: "/", label: "Início" },
    { href: "/processo", label: "Processo" },
    { href: "/galeria", label: "Galeria" },
    { href: "/contato", label: "Contato" }
  ];

  const whatsappNumber = "935751955";
  const whatsappMessage = "Olá! Gostaria de mais informações sobre o Condomínio Osvaldo MJ.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar - WhatsApp & Dark Mode */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            {/* WhatsApp Contact */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 group"
            >
              <FaWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">+244 935 751 955</span>
              <span className="hidden sm:inline opacity-90">- Fale connosco</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/20 transition-colors duration-200 group"
              aria-label="Alternar modo escuro"
            >
              {darkMode ? (
                <FaSun className="w-4 h-4 text-yellow-300 group-hover:rotate-45 transition-transform duration-500" />
              ) : (
                <FaMoon className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform duration-500" />
              )}
              <span className="hidden sm:inline font-medium">
                {darkMode ? 'Modo Claro' : 'Modo Escuro'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="relative">
              {/* Logo Desktop */}
              <Image 
                src="/images/logo.png" 
                alt="Condomínio Osvaldo MJ" 
                width={65} 
                height={65}
                className="hidden lg:block transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Logo Mobile */}
              <Image 
                src="/images/logo.png"
                alt="Condomínio Osvaldo MJ" 
                width={50} 
                height={50}
                className="lg:hidden transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Brand Text */}
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                Condomínio Osvaldo MJ
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                Zango-4 • Benfica
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/candidatar"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transform relative overflow-hidden group"
            >
              <span className="relative z-10">Candidatar-se</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex flex-col space-y-1.5 p-2 group"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2 bg-orange-500' : 'group-hover:bg-orange-500'}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'group-hover:bg-orange-500'}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 bg-orange-500' : 'group-hover:bg-orange-500'}`}></span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-6 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium border-b border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:translate-x-2"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          
          {/* WhatsApp Mobile */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 py-3 text-green-600 dark:text-green-400 font-medium border-b border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:translate-x-2"
            onClick={closeMenu}
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </a>
          
          {/* CTA Button Mobile */}
          <Link
            href="/candidatar"
            className="block w-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg mt-4 transform hover:scale-105"
            onClick={closeMenu}
          >
            Candidatar-se
          </Link>
        </div>
      </div>
    </header>
  );
}