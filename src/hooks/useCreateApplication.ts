// hooks/useCreateApplication.ts
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useAlert } from '@/components/ui/customAlert';
import { useAuth } from './useAuth';

export interface CreateApplicationData {
  documentIdCardUrl: File | null;
  documentSalaryDeclarationUrl: File | null;
  documentBankStatementUrl: File | null;
  documentLastBankReceiptUrl: File | null;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  request?: unknown;
}

export const useCreateApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { showAlert } = useAlert();
  const { user } = useAuth();

  const validatePDF = (file: File): { isValid: boolean; error?: string } => {
    // Validar tipo de arquivo
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return { isValid: false, error: 'Apenas arquivos PDF são permitidos' };
    }

    // Validar tamanho (2MB máximo)
    if (file.size > 2 * 1024 * 1024) {
      return { isValid: false, error: 'O arquivo não pode exceder 2MB' };
    }

    return { isValid: true };
  };

  const calculateProgress = (data: CreateApplicationData) => {
    let filled = 0;
    if (data.documentIdCardUrl) filled++;
    if (data.documentSalaryDeclarationUrl) filled++;
    if (data.documentBankStatementUrl) filled++;
    if (data.documentLastBankReceiptUrl) filled++;

    setProgress((filled / 4) * 100);
  };

  const createApplication = async (data: CreateApplicationData): Promise<boolean> => {
    if (!user) {
      showAlert('Erro: Usuário não autenticado.', 'error');
      return false;
    }

    // Validar se todos os arquivos foram selecionados
    if (!data.documentIdCardUrl || !data.documentSalaryDeclarationUrl || 
        !data.documentBankStatementUrl || !data.documentLastBankReceiptUrl) {
      showAlert('Por favor, selecione todos os documentos obrigatórios.', 'warning');
      return false;
    }

    // Validar todos os arquivos
    const files = [
      { file: data.documentIdCardUrl, name: 'Cópia do BI' },
      { file: data.documentSalaryDeclarationUrl, name: 'Declaração de Salário' },
      { file: data.documentBankStatementUrl, name: 'Extrato Bancário' },
      { file: data.documentLastBankReceiptUrl, name: 'Último Recibo Bancário' }
    ];

    for (const { file, name } of files) {
      const validation = validatePDF(file!);
      if (!validation.isValid) {
        showAlert(`${name}: ${validation.error}`, 'error');
        return false;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Adicionar UserId
      formData.append('UserId', user.id);
      
      // Adicionar arquivos
      formData.append('DocumentIdCardUrl', data.documentIdCardUrl);
      formData.append('DocumentSalaryDeclarationUrl', data.documentSalaryDeclarationUrl);
      formData.append('DocumentBankStatementUrl', data.documentBankStatementUrl);
      formData.append('DocumentLastBankReceiptUrl', data.documentLastBankReceiptUrl);

      const response = await api.post('/v1/Applications/Create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.code === 200) {
        showAlert('Candidatura criada com sucesso!', 'success');
        return true;
      } else {
        showAlert(response.data.message || 'Erro ao criar candidatura.', 'error');
        return false;
      }
    } catch (err: unknown) {
      console.error('Erro ao criar candidatura:', err);
      
      const apiError = err as ApiError;
      let errorMessage = 'Erro ao criar candidatura. Tente novamente.';
      
      if (apiError.response?.data?.message) {
        errorMessage = apiError.response.data.message;
      } else if (apiError.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
      } else if (apiError.request) {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      }

      showAlert(errorMessage, 'error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    progress,
    createApplication,
    calculateProgress,
    validatePDF,
  };
};