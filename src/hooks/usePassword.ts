// hooks/usePassword.ts
'use client';

import { useState, useCallback } from 'react'; // ✅ Adicionar useCallback
import api from '@/lib/api';

interface ChangePasswordData {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordResponse {
  code: number;
  message: string;
}

export const usePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ Usar useCallback para evitar recriação da função
  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []); // ✅ Dependências vazias - função não recria

  const changePassword = async (data: ChangePasswordData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validação básica
      if (data.newPassword !== data.confirmNewPassword) {
        setError('As senhas não coincidem');
        setIsLoading(false);
        return false;
      }

      if (data.newPassword.length < 6) {
        setError('A nova senha deve ter pelo menos 6 caracteres');
        setIsLoading(false);
        return false;
      }

      const response = await api.post<ChangePasswordResponse>('/v1/Password/Change', data);
      
      if (response.data.code === 200) {
        setSuccess(true);
        return true;
      } else {
        setError(response.data.message || 'Erro ao alterar senha');
        return false;
      }
    } catch (error: any) {
      // Tratamento silencioso de erros
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.type === 'NETWORK_ERROR') {
        setError('Erro de conexão. Tente novamente.');
      } else {
        setError('Erro ao alterar senha. Tente novamente.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changePassword,
    isLoading,
    error,
    success,
    resetState, // ✅ Agora está memoizado
  };
};