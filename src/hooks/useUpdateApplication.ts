// hooks/useUpdateApplication.ts
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useAlert } from '@/components/ui/customAlert';
import { Application } from './useApplication';

export interface UpdateApplicationData {
  id: string;
  documentIdCardUrl: File | null;
  documentSalaryDeclarationUrl: File | null;
  documentBankStatementUrl: File | null;
  documentLastBankReceiptUrl: File | null;
}

export const useUpdateApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showAlert } = useAlert();

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

  const updateApplication = async (data: UpdateApplicationData): Promise<boolean> => {
    // Verificar se pelo menos um arquivo foi selecionado para atualização
    const hasFilesToUpdate = data.documentIdCardUrl || 
                            data.documentSalaryDeclarationUrl || 
                            data.documentBankStatementUrl || 
                            data.documentLastBankReceiptUrl;

    if (!hasFilesToUpdate) {
      showAlert('Por favor, selecione pelo menos um documento para atualizar.', 'warning');
      return false;
    }

    // Validar arquivos selecionados
    const files = [
      { file: data.documentIdCardUrl, name: 'Cópia do BI' },
      { file: data.documentSalaryDeclarationUrl, name: 'Declaração de Salário' },
      { file: data.documentBankStatementUrl, name: 'Extrato Bancário' },
      { file: data.documentLastBankReceiptUrl, name: 'Último Recibo Bancário' }
    ];

    for (const { file, name } of files) {
      if (file) {
        const validation = validatePDF(file);
        if (!validation.isValid) {
          showAlert(`${name}: ${validation.error}`, 'error');
          return false;
        }
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Adicionar ID da candidatura
      formData.append('Id', data.id);
      
      // Adicionar apenas os arquivos que foram selecionados
      if (data.documentIdCardUrl) {
        formData.append('DocumentIdCardUrl', data.documentIdCardUrl);
      }
      if (data.documentSalaryDeclarationUrl) {
        formData.append('DocumentSalaryDeclarationUrl', data.documentSalaryDeclarationUrl);
      }
      if (data.documentBankStatementUrl) {
        formData.append('DocumentBankStatementUrl', data.documentBankStatementUrl);
      }
      if (data.documentLastBankReceiptUrl) {
        formData.append('DocumentLastBankReceiptUrl', data.documentLastBankReceiptUrl);
      }

      const response = await api.put('/v1/Applications/Update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.code === 200) {
        showAlert('Candidatura atualizada com sucesso!', 'success');
        return true;
      } else {
        showAlert(response.data.message || 'Erro ao atualizar candidatura.', 'error');
        return false;
      }
    } catch (error: any) {
      console.error('Erro ao atualizar candidatura:', error);
      
      let errorMessage = 'Erro ao atualizar candidatura. Tente novamente.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
      } else if (error.request) {
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
    updateApplication,
    validatePDF,
  };
};