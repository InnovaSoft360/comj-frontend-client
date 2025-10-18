// hooks/useDeleteAccount.ts
'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

interface DeleteAccountResponse {
  code: number;
  message: string;
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

  const deleteAccount = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.delete<DeleteAccountResponse>(`/v1/Users/Delete?Id=${userId}`);
      
      if (response.data.code === 200) {
        setSuccess(true);
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