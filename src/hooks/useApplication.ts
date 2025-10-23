// hooks/useApplication.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { useAuth } from './useAuth';

export interface Application {
  id: string;
  userId: string;
  status: number;
  documentIdCardUrl: string;
  documentSalaryDeclarationUrl: string;
  documentBankStatementUrl: string;
  documentLastBankReceiptUrl: string;
  allowRejectedEdit: boolean;
  createdAt: string;
  updatedAt: string;
  remainingDays: number;
  reviewComments: string[];
  lastReviewComment: string | null;
}

interface ApplicationResponse {
  code: number;
  message: string;
  data: Application | null;
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

export const useApplication = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchApplication = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get<ApplicationResponse>(
        `/v1/Applications/GetByUserId?UserId=${user.id}`
      );

      if (response.data.code === 200 && response.data.data) {
        setApplication(response.data.data);
      } else if (response.data.code === 404) {
        setApplication(null); // Não tem candidatura
      } else {
        setError(response.data.message);
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      if (apiError.response?.status === 404) {
        setApplication(null); // Não tem candidatura
      } else {
        setError('Erro ao carregar candidatura');
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchApplication();
    }
  }, [user, fetchApplication]);

  const refetch = () => {
    fetchApplication();
  };

  // NOVA LÓGICA PARA BOTÕES
  const shouldShowCreateButton = !application;
  const shouldShowEditButton = application?.status === 3 && application.allowRejectedEdit;
  const shouldHideAllButtons = application && 
    (application.status === 1 || 
     application.status === 2 || 
     (application.status === 3 && !application.allowRejectedEdit));

  return {
    application,
    isLoading,
    error,
    refetch,
    hasApplication: !!application,
    shouldShowCreateButton,
    shouldShowEditButton,
    shouldHideAllButtons
  };
};