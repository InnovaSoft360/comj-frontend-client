// hooks/useApplication.ts
'use client';

import { useState, useEffect } from 'react';
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

export const useApplication = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchApplication = async () => {
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
    } catch (err: any) {
      if (err.response?.status === 404) {
        setApplication(null); // Não tem candidatura
      } else {
        setError('Erro ao carregar candidatura');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplication();
    }
  }, [user]);

  const refetch = () => {
    fetchApplication();
  };

  return {
    application,
    isLoading,
    error,
    refetch,
    hasApplication: !!application,
  };
};