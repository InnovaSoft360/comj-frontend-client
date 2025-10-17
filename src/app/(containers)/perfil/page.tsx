// app/(container)/user/perfil/page.tsx
'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaAddressCard, FaEdit, FaKey, FaTrash } from "react-icons/fa";
import { getApiUrl } from "@/lib/config";
import { useEffect, useState } from "react";

export default function PerfilPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  // Redirecionar se não estiver logado
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) return null;

  // Foto do usuário - se tiver photoUrl, usa a URL completa, senão mostra iniciais
  const userPhoto = user.photoUrl ? getApiUrl(user.photoUrl) : null;
  const userInitials = `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`;
  const showImage = userPhoto && !imageError;

  const userInfo = [
    { icon: FaUser, label: 'Nome Completo', value: `${user.firstName} ${user.lastName}` },
    { icon: FaEnvelope, label: 'Email', value: user.email },
    { icon: FaAddressCard, label: 'BI/Identificação', value: user.bi || 'Não informado' }
  ];

  const handleEditProfile = () => console.log('Abrir modal de edição');
  const handleChangePassword = () => console.log('Abrir modal de senha');
  const handleDeleteAccount = () => console.log('Abrir modal de deleção');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Meu Perfil</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie suas informações e configurações</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          
          {/* Banner com Foto - CORRIGIDO */}
          <div className="h-32 bg-gradient-to-r from-orange-500 to-red-600 relative">
            <div className="absolute -bottom-12 left-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center text-white font-bold text-xl shadow-lg overflow-hidden">
                  {showImage ? (
                    <img 
                      src={userPhoto}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-full h-full rounded-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-lg">{userInitials}</span>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="pt-16 px-6 pb-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={handleEditProfile} className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  <FaEdit className="w-4 h-4" />
                  <span>Editar Perfil</span>
                </button>
                
                <button onClick={handleChangePassword} className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FaKey className="w-4 h-4" />
                  <span>Alterar Senha</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {userInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group">
                    <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{item.label}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-red-200 dark:border-red-800">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Zona Perigosa</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                </p>
                <button onClick={handleDeleteAccount} className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <FaTrash className="w-4 h-4" />
                  <span>Excluir Minha Conta</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}