// components/layouts/Header.tsx
'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaFileAlt, FaSignOutAlt, FaChevronDown, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { getApiUrl } from "@/lib/config";
import { WHATSAPP_CONFIG } from "@/constants/whatsapp";

// Interface para o usuário
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const { user, logout, getUserInitials } = useAuth();

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const handleImageError = (userId: string) => {
    setImageErrors(prev => ({ ...prev, [userId]: true }));
  };

  // Helper para renderizar avatar do usuário
  const renderUserAvatar = (user: User, size: number = 40, className: string = "") => {
    const userPhoto = user.photoUrl ? getApiUrl(user.photoUrl) : null;
    const userInitials = getUserInitials(user);
    const showImage = userPhoto && !imageErrors[user.id];

    return (
      <div className={`flex items-center justify-center w-${size} h-${size} bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-semibold text-sm overflow-hidden ${className}`}>
        {showImage ? (
          <img 
            src={userPhoto}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full rounded-full object-cover"
            onError={() => handleImageError(user.id)}
          />
        ) : (
          <span className="text-white font-semibold">
            {userInitials}
          </span>
        )}
      </div>
    );
  };

  const menuItems = [
    { href: "/", label: "Início" },
    { href: "/galeria", label: "Galeria" },
    { href: "/localizacao", label: "Localização" },
    { href: "/contato", label: "Contato" }
  ];

  const userMenuItems = [
    { href: "/perfil", label: "Perfil", icon: FaUser },
    { href: "/candidatura", label: "Minha Candidatura", icon: FaFileAlt },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar - Apenas WhatsApp */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-2 text-sm">
            {/* WhatsApp Contact - No canto direito */}
            <a 
              href={WHATSAPP_CONFIG.urls.withMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 group"
            >
              <FaWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{WHATSAPP_CONFIG.display.formattedNumber}</span>
              <span className="hidden sm:inline opacity-90">- Fale connosco</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="relative">
              <Image 
                src="/images/logo.png" 
                alt="Condomínio Osvaldo MJ" 
                width={50} 
                height={50}
                className="lg:w-16 lg:h-16 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Brand Text - Desktop */}
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
            
            {/* User Profile Menu - APENAS SE ESTIVER LOGADO */}
            {user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                >
                  {renderUserAvatar(user, 10, "group-hover:scale-105 transition-transform duration-200")}
                  <span className="text-gray-700 dark:text-gray-300 font-medium max-w-32 truncate">
                    {user.firstName}
                  </span>
                  <FaChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in-0 zoom-in-95">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {userMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group"
                      >
                        <FaSignOutAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CTA Button - APENAS SE NÃO ESTIVER LOGADO */}
            {!user && (
              <Link
                href="/login"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transform relative overflow-hidden group"
              >
                <span className="relative z-10">Candidatar-se</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* CTA Button Mobile - APENAS SE NÃO ESTIVER LOGADO */}
            {!user && (
              <Link
                href="/login"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg"
              >
                Candidatar-se
              </Link>
            )}

            {/* User Avatar Mobile - APENAS SE ESTIVER LOGADO */}
            {user && (
              <button
                onClick={toggleUserMenu}
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-semibold text-sm hover:scale-105 transition-transform duration-200 overflow-hidden"
              >
                {renderUserAvatar(user)}
              </button>
            )}

            <button
              className="flex flex-col space-y-1.5 p-2 group"
              onClick={toggleMenu}
              aria-label="Abrir menu"
            >
              <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2 bg-orange-500' : 'group-hover:bg-orange-500'}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'group-hover:bg-orange-500'}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 bg-orange-500' : 'group-hover:bg-orange-500'}`}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Full Screen (APENAS NAVEGAÇÃO PRINCIPAL) */}
      <div className={`lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-all duration-500 ease-in-out transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-orange-500 transition-colors"
            aria-label="Fechar menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Items - APENAS MENU PRINCIPAL */}
          <div className="flex-1 space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-4 text-2xl font-semibold text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 transform hover:translate-x-4"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Seção do Usuário no Mobile - APENAS SE ESTIVER LOGADO */}
          {user && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <div className="flex items-center space-x-4 mb-6">
                {renderUserAvatar(user, 14, "w-14 h-14 text-lg")}
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* User Actions Mobile */}
              <div className="space-y-3">
                {userMenuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-4 py-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                      onClick={closeMenu}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-4 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 w-full"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile User Menu Overlay - MENU SEPARADO PARA USUÁRIO */}
      {userMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setUserMenuOpen(false)}>
          <div className="absolute top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-64 py-2 animate-in fade-in-0 zoom-in-95">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {userMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <IconComponent className="w-4 h-4 text-gray-400" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}