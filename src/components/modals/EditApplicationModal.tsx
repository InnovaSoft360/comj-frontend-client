// components/modals/EditApplicationModal.tsx
'use client';

import { useState, useRef } from 'react';
import {
  FaTimes,
  FaUpload,
  FaEye,
  FaTrash,
  FaSpinner,
  FaFilePdf,
  FaExclamationTriangle,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { useUpdateApplication } from '@/hooks/useUpdateApplication';
import { useAlert } from '@/components/ui/customAlert';
import { Application } from '@/hooks/useApplication';

interface EditApplicationModalProps {
  application: Application;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditApplicationModal({ application, onClose, onSuccess }: EditApplicationModalProps) {
  const { isSubmitting, updateApplication, validatePDF } = useUpdateApplication();
  const { showAlert, AlertContainer } = useAlert();

  const [fileData, setFileData] = useState({
    documentIdCardUrl: null as File | null,
    documentSalaryDeclarationUrl: null as File | null,
    documentBankStatementUrl: null as File | null,
    documentLastBankReceiptUrl: null as File | null,
  });

  const [fileErrors, setFileErrors] = useState({
    documentIdCardUrl: '',
    documentSalaryDeclarationUrl: '',
    documentBankStatementUrl: '',
    documentLastBankReceiptUrl: '',
  });

  // Refs para os inputs de arquivo
  const documentIdCardRef = useRef<HTMLInputElement>(null);
  const documentSalaryDeclarationRef = useRef<HTMLInputElement>(null);
  const documentBankStatementRef = useRef<HTMLInputElement>(null);
  const documentLastBankReceiptRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (field: keyof typeof fileData, file: File | null) => {
    console.log(`📁 Arquivo selecionado para ${field}:`, file?.name);
    
    const newFileData = { ...fileData, [field]: file };
    const newFileErrors = { ...fileErrors, [field]: '' };

    if (file) {
      const validation = validatePDF(file);
      if (!validation.isValid) {
        newFileErrors[field] = validation.error!;
        newFileData[field] = null;
        
        // Limpar o input
        const ref = getFileInputRef(field);
        if (ref?.current) ref.current.value = '';
        
        showAlert(validation.error!, 'warning');
      } else {
        console.log(`✅ ${field} válido:`, file.name);
      }
    }

    setFileData(newFileData);
    setFileErrors(newFileErrors);
  };

  const handleRemoveFile = (field: keyof typeof fileData) => {
    console.log(`🗑️ Removendo arquivo: ${field}`);
    
    const ref = getFileInputRef(field);
    if (ref?.current) ref.current.value = '';
    
    setFileData(prev => ({ ...prev, [field]: null }));
    setFileErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleViewCurrentFile = (field: keyof typeof fileData) => {
    const url = getCurrentFileUrl(field);
    if (url) {
      const fullUrl = url.startsWith('http') ? url : `http://localhost:5211${url}`;
      console.log(`👀 Abrindo arquivo atual: ${fullUrl}`);
      window.open(fullUrl, '_blank');
    }
  };

  const handleViewNewFile = (field: keyof typeof fileData) => {
    const file = fileData[field];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      console.log(`👀 Visualizando novo arquivo: ${file.name}`);
      window.open(fileURL, '_blank');
    }
  };

  const getFileInputRef = (field: string) => {
    switch (field) {
      case 'documentIdCardUrl': return documentIdCardRef;
      case 'documentSalaryDeclarationUrl': return documentSalaryDeclarationRef;
      case 'documentBankStatementUrl': return documentBankStatementRef;
      case 'documentLastBankReceiptUrl': return documentLastBankReceiptRef;
      default: return null;
    }
  };

  const getCurrentFileUrl = (field: string): string => {
    switch (field) {
      case 'documentIdCardUrl': return application.documentIdCardUrl;
      case 'documentSalaryDeclarationUrl': return application.documentSalaryDeclarationUrl;
      case 'documentBankStatementUrl': return application.documentBankStatementUrl;
      case 'documentLastBankReceiptUrl': return application.documentLastBankReceiptUrl;
      default: return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🎯 INICIANDO SUBMIT DO FORMULÁRIO DE EDIÇÃO');
    console.log('🔍 Dados da aplicação:', {
      id: application.id,
      status: application.status,
      allowRejectedEdit: application.allowRejectedEdit
    });
    
    // Verificar se pelo menos um arquivo foi selecionado
    const hasFilesToUpdate = Object.values(fileData).some(file => file !== null);
    
    if (!hasFilesToUpdate) {
      showAlert('Por favor, selecione pelo menos um documento para atualizar.', 'warning');
      return;
    }

    console.log('📦 Dados que serão enviados:', {
      id: application.id,
      files: Object.keys(fileData).filter(key => fileData[key as keyof typeof fileData] !== null)
    });
    
    const updateData = {
      id: application.id,
      ...fileData
    };
    
    try {
      console.log('🔄 Chamando updateApplication...');
      const success = await updateApplication(updateData);
      console.log('✅ Resultado da atualização:', success);
      
      if (success) {
        console.log('🚀 Sucesso! Fechando modal e recarregando dados...');
        // Pequeno delay para usuário ver a mensagem de sucesso
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('💥 Erro inesperado no handleSubmit:', error);
      showAlert('Erro inesperado ao processar a atualização.', 'error');
    }
  };

  // Função para renderizar cada campo de arquivo
  const renderFileField = (field: keyof typeof fileData, label: string) => {
    const hasNewFile = !!fileData[field];
    const hasError = !!fileErrors[field];

    return (
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <FaUpload className="inline w-4 h-4 mr-2 text-orange-600" />
          {label}
        </label>
        
        {/* Arquivo atual */}
        <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFilePdf className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Arquivo atual
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleViewCurrentFile(field)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-300 rounded-md transition-colors text-sm"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              <span>Ver</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          {/* Input file para novo arquivo */}
          {!hasNewFile && (
            <>
              <input
                type="file"
                ref={getFileInputRef(field)}
                accept=".pdf,application/pdf"
                onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
                className="hidden"
                id={`${field}-edit`}
              />
              <label
                htmlFor={`${field}-edit`}
                className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors bg-white dark:bg-gray-700"
              >
                <FaUpload className="w-5 h-5 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Clique para selecionar novo PDF
                </span>
              </label>
            </>
          )}
          
          {/* Mensagem de erro */}
          {hasError && (
            <div className="flex items-center space-x-2 text-red-600 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              <FaExclamationTriangle className="w-4 h-4" />
              <span>{fileErrors[field]}</span>
            </div>
          )}
          
          {/* Preview do novo arquivo */}
          {hasNewFile && !hasError && (
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <FaFilePdf className="w-5 h-5 text-red-600" />
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white block">
                    {fileData[field]?.name}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    ✅ Arquivo selecionado
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleViewNewFile(field)}
                  className="p-2 text-blue-600 hover:text-blue-700 transition-colors bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 rounded-md"
                  title="Visualizar arquivo"
                >
                  <FaEye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(field)}
                  className="p-2 text-red-600 hover:text-red-700 transition-colors bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 rounded-md"
                  title="Remover arquivo"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <AlertContainer />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                📝 Editar Candidatura
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Atualize os documentos que precisam de correção
              </p>
              <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/30 rounded-md">
                <p className="text-xs text-orange-800 dark:text-orange-300">
                  <strong>⚠️ Atenção:</strong> Após a edição, sua candidatura voltará para &quot;Pendente&quot; para nova análise.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ml-4"
              disabled={isSubmitting}
            >
              <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Cópia do BI */}
              {renderFileField('documentIdCardUrl', 'Cópia do BI')}

              {/* Declaração de Salário */}
              {renderFileField('documentSalaryDeclarationUrl', 'Declaração de Salário')}

              {/* Extrato Bancário */}
              {renderFileField('documentBankStatementUrl', 'Extrato Bancário')}

              {/* Último Recibo Bancário */}
              {renderFileField('documentLastBankReceiptUrl', 'Último Recibo Bancário')}

              {/* Informação */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>💡 Dica:</strong> Apenas os documentos que você selecionar serão atualizados. 
                  Os documentos não selecionados permanecerão os mesmos.
                </p>
              </div>

              {/* Botão de submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    !isSubmitting
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span>Atualizando candidatura...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FaUpload className="w-4 h-4" />
                      <span>Atualizar e Reenviar para Análise</span>
                    </div>
                  )}
                </button>
                
                {!isSubmitting && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    ⚠️ Sua candidatura voltará para status &quot;Pendente&quot;
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}