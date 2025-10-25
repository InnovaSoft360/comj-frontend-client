// hooks/useDeleteAccount.ts
'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

interface DeleteAccountResponse {
  code: number;
  message: string;
}

interface CheckAuthResponse {
  authenticated: boolean;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  type?: string;
}

export const useDeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  // Função para verificar se o usuário está autenticado
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const response = await api.get<CheckAuthResponse>('/v1/Auth/CheckAuth');
      return response.data.authenticated;
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
      return false;
    }
  };

  // Função para fazer logout
  const performLogout = async (): Promise<boolean> => {
    try {
      await api.post('/v1/Auth/Logout');
      console.log('✅ Logout realizado com sucesso após exclusão da conta');
      return true;
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
      // Mesmo se o logout falhar, não impedimos o fluxo
      return true;
    }
  };

  const deleteAccount = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Primeiro verifica se o usuário está autenticado
      const isAuthenticated = await checkAuthStatus();
      console.log('🔐 Status de autenticação:', isAuthenticated);

      // Faz a requisição para excluir a conta
      const response = await api.delete<DeleteAccountResponse>(`/v1/Users/Delete?Id=${userId}`);
      
      if (response.data.code === 200) {
        setSuccess(true);
        
        // Se o usuário estava autenticado, faz logout automaticamente
        if (isAuthenticated) {
          console.log('🚪 Usuário estava autenticado, realizando logout automático...');
          await performLogout();
          
          // Força um refresh na página para garantir que todos os estados sejam limpos
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        
        return true;
      } else {
        setError(response.data.message || 'Erro ao excluir conta');
        return false;
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.data?.message) {
        setError(apiError.response.data.message);
      } else if (apiError.type === 'NETWORK_ERROR') {
        setError('Erro de conexão. Tente novamente.');
      } else {
        setError('Erro ao excluir conta. Tente novamente.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteAccount,
    isLoading,
    error,
    success,
    resetState,
  };
};