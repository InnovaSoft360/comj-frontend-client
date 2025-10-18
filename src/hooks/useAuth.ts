// hooks/useAuth.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  role?: number;
  bi?: string;
}

interface AuthResponse {
  code: number;
  message: string;
  data: User;
  token?: string;
}

interface CheckAuthResponse {
  authenticated: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verificar autenticação - SILENCIOSO
  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get<CheckAuthResponse>('/v1/Auth/CheckAuth');
      setIsAuthenticated(response.data.authenticated);
      
      if (response.data.authenticated) {
        // Buscar dados do usuário
        const userResponse = await api.get<AuthResponse>('/v1/Users/Me');
        if (userResponse.data.code === 200) {
          setUser(userResponse.data.data);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      // SILENCIOSO - não loga erro no console
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login - SILENCIOSO
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>('/v1/Auth/Login', {
        email,
        password,
      });

      const userData = response.data.data;

      // ⭐⭐ VERIFICAÇÃO DE ROLE - SÓ ROLE 1 (CLIENT) PODE ENTRAR ⭐⭐
      if (userData.role === 1) {
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // SILENCIOSO - não loga erro no console
      return false;
    }
  };

  // Logout - SILENCIOSO
  const logout = useCallback(async () => {
    try {
      await api.post('/v1/Auth/Logout');
    } catch (error) {
      // SILENCIOSO - não importa se falhar o logout
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      router.push('/');
    }
  }, [router]);

  // Atualizar usuário - SILENCIOSO
  const updateUser = async (updatedUser: User): Promise<boolean> => {
    try {
      const response = await api.put<AuthResponse>('/v1/Users/Me', updatedUser);
      if (response.data.code === 200) {
        setUser(response.data.data);
        return true;
      }
      return false;
    } catch (error) {
      // SILENCIOSO - não loga erro no console
      return false;
    }
  };

  // Iniciais do usuário
  const getUserInitials = (user: User): string => {
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    getUserInitials,
    refreshAuth: checkAuth,
  };
};