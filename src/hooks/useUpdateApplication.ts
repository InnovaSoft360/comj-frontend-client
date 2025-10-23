// hooks/useUpdateApplication.ts
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useAlert } from '@/components/ui/customAlert';

export interface UpdateApplicationData {
  id: string;
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
  message?: string;
}

export const useUpdateApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showAlert } = useAlert();

  const validatePDF = (file: File): { isValid: boolean; error?: string } => {
    if (!file) return { isValid: false, error: 'Arquivo não selecionado' };
    
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return { isValid: false, error: 'Apenas arquivos PDF são permitidos' };
    }

    if (file.size > 2 * 1024 * 1024) {
      return { isValid: false, error: 'O arquivo não pode exceder 2MB' };
    }

    return { isValid: true };
  };

  const updateApplication = async (data: UpdateApplicationData): Promise<boolean> => {
    console.log('🚀 INICIANDO ATUALIZAÇÃO DA CANDIDATURA');
    console.log('📝 ID:', data.id);
    console.log('📁 Arquivos selecionados:', {
      docId: data.documentIdCardUrl?.name || 'NÃO',
      salary: data.documentSalaryDeclarationUrl?.name || 'NÃO',
      bank: data.documentBankStatementUrl?.name || 'NÃO',
      receipt: data.documentLastBankReceiptUrl?.name || 'NÃO'
    });

    // Verificar se pelo menos um arquivo foi selecionado
    const hasFilesToUpdate = data.documentIdCardUrl || 
                            data.documentSalaryDeclarationUrl || 
                            data.documentBankStatementUrl || 
                            data.documentLastBankReceiptUrl;

    if (!hasFilesToUpdate) {
      showAlert('Por favor, selecione pelo menos um documento para atualizar.', 'warning');
      return false;
    }

    // Validar arquivos
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
      
      // 🔥 PARÂMETRO CORRETO: 'Id' (conforme teu backend)
      formData.append('Id', data.id);
      console.log('✅ ID adicionado ao FormData:', data.id);

      // 🔥🔥🔥 CORREÇÃO CRÍTICA: NÃO enviar campos vazios - apenas os arquivos selecionados
      if (data.documentIdCardUrl) {
        formData.append('DocumentIdCardUrl', data.documentIdCardUrl);
        console.log('✅ DocumentIdCardUrl adicionado:', data.documentIdCardUrl.name);
      }
      // 🔥 NÃO adicionar se for null - o backend vai manter o atual
      
      if (data.documentSalaryDeclarationUrl) {
        formData.append('DocumentSalaryDeclarationUrl', data.documentSalaryDeclarationUrl);
        console.log('✅ DocumentSalaryDeclarationUrl adicionado:', data.documentSalaryDeclarationUrl.name);
      }
      // 🔥 NÃO adicionar se for null
      
      if (data.documentBankStatementUrl) {
        formData.append('DocumentBankStatementUrl', data.documentBankStatementUrl);
        console.log('✅ DocumentBankStatementUrl adicionado:', data.documentBankStatementUrl.name);
      }
      // 🔥 NÃO adicionar se for null
      
      if (data.documentLastBankReceiptUrl) {
        formData.append('DocumentLastBankReceiptUrl', data.documentLastBankReceiptUrl);
        console.log('✅ DocumentLastBankReceiptUrl adicionado:', data.documentLastBankReceiptUrl.name);
      }
      // 🔥 NÃO adicionar se for null

      // 🔥 DEBUG: Verificar conteúdo do FormData
      console.log('📦 CONTEÚDO DO FORMDATA:');
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }

      console.log('🔄 ENVIANDO REQUISIÇÃO PUT...');
      
      const response = await api.put('/v1/Applications/Update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      console.log('✅ RESPOSTA DO BACKEND:', response.data);

      if (response.data.code === 200) {
        console.log('🎉 CANDIDATURA ATUALIZADA COM SUCESSO!');
        showAlert('Candidatura atualizada com sucesso!', 'success');
        return true;
      } else {
        console.log('❌ Erro na resposta:', response.data.message);
        showAlert(response.data.message || 'Erro ao atualizar candidatura.', 'error');
        return false;
      }
    } catch (err: unknown) {
      console.error('💥 ERRO NA REQUISIÇÃO:', err);
      
      const apiError = err as ApiError;
      let errorMessage = 'Erro ao atualizar candidatura. Tente novamente.';
      
      if (apiError.response?.status === 400) {
        errorMessage = 'Dados inválidos. Verifique os arquivos e tente novamente.';
        console.log('🔴 Bad Request - Possível problema com os parâmetros');
      } else if (apiError.response?.status === 404) {
        errorMessage = 'Candidatura não encontrada.';
      } else if (apiError.response?.data?.message) {
        errorMessage = apiError.response.data.message;
      } else if (apiError.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
      } else if (apiError.request) {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      } else if (apiError.message) {
        errorMessage = apiError.message;
      }

      console.error('🔴 Mensagem de erro final:', errorMessage);
      showAlert(errorMessage, 'error');
      return false;
    } finally {
      setIsSubmitting(false);
      console.log('🏁 PROCESSO DE ATUALIZAÇÃO FINALIZADO');
    }
  };

  return {
    isSubmitting,
    updateApplication,
    validatePDF,
  };
};