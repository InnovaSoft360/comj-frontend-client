// hooks/useUpdatePhoto.ts
'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

interface UpdatePhotoData {
  Id: string;
  PhotoFile: File;
}

interface UpdatePhotoResponse {
  code: number;
  message: string;
  data?: {
    photoUrl?: string;
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

export const useUpdatePhoto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  const updatePhoto = async (data: UpdatePhotoData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('Id', data.Id);
      formData.append('PhotoFile', data.PhotoFile);

      const response = await api.patch<UpdatePhotoResponse>('/v1/Users/UpdatePhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.code === 200) {
        setSuccess(true);
        return true;
      } else {
        setError(response.data.message || 'Erro ao atualizar foto');
        return false;
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.data?.message) {
        setError(apiError.response.data.message);
      } else if (apiError.type === 'NETWORK_ERROR') {
        setError('Erro de conexão. Tente novamente.');
      } else {
        setError('Erro ao atualizar foto. Tente novamente.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updatePhoto,
    isLoading,
    error,
    success,
    resetState,
  };
};