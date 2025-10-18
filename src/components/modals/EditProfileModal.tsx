// components/modals/EditProfileModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaCheck } from 'react-icons/fa';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { User } from '@/hooks/useAuth';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onProfileUpdated: () => void;
}

export default function EditProfileModal({ isOpen, onClose, user, onProfileUpdated }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  
  const { updateProfile, isLoading, error, success, resetState } = useUpdateProfile();

  useEffect(() => {
    if (isOpen && user) {
      resetState();
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [isOpen, user, resetState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await updateProfile({
      id: user.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });

    if (success) {
      setTimeout(() => {
        onProfileUpdated();
        onClose();
      }, 1500);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <FaUser className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Editar Perfil
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Atualize suas informações pessoais
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Mensagem de Sucesso */}
          {success && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
              <FaCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-800 dark:text-green-300 font-medium">
                  Perfil atualizado com sucesso!
                </p>
              </div>
            </div>
          )}

          {/* Mensagem de Erro */}
          {error && !success && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-300 text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Seu nome"
              disabled={isLoading || success}
            />
          </div>

          {/* Sobrenome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sobrenome *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Seu sobrenome"
              disabled={isLoading || success}
            />
          </div>

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={isLoading || success}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Atualizando...</span>
                </>
              ) : success ? (
                <>
                  <FaCheck className="w-4 h-4" />
                  <span>Sucesso!</span>
                </>
              ) : (
                <span>Atualizar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}