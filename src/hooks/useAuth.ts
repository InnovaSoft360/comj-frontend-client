// hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  bi: string;
  email: string;
  role: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verificar se o usuário está autenticado
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/v1/Users/Me');
      if (response.data.code === 200) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.log('Usuário não autenticado');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/v1/Auth/Logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setUser(null);
      // Limpar qualquer token/local storage se estiver usando
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  const getUserInitials = (user: User) => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  return {
    user,
    isLoading,
    logout,
    getUserInitials
  };
};