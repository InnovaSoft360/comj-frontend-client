// hooks/useUpdateProfile.ts
'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

interface UpdateProfileData {
  id: string;
  firstName: string;
  lastName: string;
}

interface UpdateProfileResponse {
  code: number;
  message: string;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl?: string;
    role?: number;
    bi?: string;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  type?: string;
}

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.put<UpdateProfileResponse>('/v1/Users/Update', data);
      
      if (response.data.code === 200) {
        setSuccess(true);
        return true;
      } else {
        setError(response.data.message || 'Erro ao atualizar perfil');
        return false;
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.data?.message) {
        setError(apiError.response.data.message);
      } else if (apiError.type === 'NETWORK_ERROR') {
        setError('Erro de conexão. Tente novamente.');
      } else {
        setError('Erro ao atualizar perfil. Tente novamente.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
    success,
    resetState,
  };
};