// components/modals/CreateApplicationModal.tsx
'use client';

import { useState, useRef } from 'react';
import {
  FaTimes,
  FaUpload,
  FaEye,
  FaTrash,
  FaSpinner,
  FaFilePdf,
  FaPercentage,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useCreateApplication } from '@/hooks/useCreateApplication';
import { useAlert } from '@/components/ui/customAlert';

interface CreateApplicationModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateApplicationModal({ onClose, onSuccess }: CreateApplicationModalProps) {
  const { isSubmitting, progress, createApplication, calculateProgress, validatePDF } = useCreateApplication();
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

  const [fileNames, setFileNames] = useState({
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
    const newFileData = { ...fileData, [field]: file };
    const newFileNames = { ...fileNames, [field]: file ? file.name : '' };
    const newFileErrors = { ...fileErrors, [field]: '' };

    if (file) {
      const validation = validatePDF(file);
      if (!validation.isValid) {
        newFileErrors[field] = validation.error!;
        newFileNames[field] = '';
        newFileData[field] = null;
        
        // Limpar o input
        const ref = getFileInputRef(field);
        if (ref?.current) ref.current.value = '';
        
        showAlert(validation.error!, 'warning');
      }
    }

    setFileData(newFileData);
    setFileNames(newFileNames);
    setFileErrors(newFileErrors);
    calculateProgress(newFileData);
  };

  const handleRemoveFile = (field: keyof typeof fileData) => {
    // Limpar o input file se existir
    const ref = getFileInputRef(field);
    if (ref?.current) ref.current.value = '';
    
    // Atualizar estados
    setFileData(prev => ({ ...prev, [field]: null }));
    setFileNames(prev => ({ ...prev, [field]: '' }));
    setFileErrors(prev => ({ ...prev, [field]: '' }));
    
    // Recalcular progresso
    calculateProgress({ ...fileData, [field]: null });
  };

  const handleViewFile = (field: keyof typeof fileData) => {
    const file = fileData[field];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  };

  const getFileInputRef = (field: string) => {
    switch (field) {
      case 'documentIdCardUrl':
        return documentIdCardRef;
      case 'documentSalaryDeclarationUrl':
        return documentSalaryDeclarationRef;
      case 'documentBankStatementUrl':
        return documentBankStatementRef;
      case 'documentLastBankReceiptUrl':
        return documentLastBankReceiptRef;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await createApplication(fileData);
    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  // Função para renderizar cada campo de arquivo
  const renderFileField = (field: keyof typeof fileData, label: string) => {
    const hasFile = !!fileData[field];
    const hasError = !!fileErrors[field];

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <FaUpload className="inline w-4 h-4 mr-2 text-orange-600" />
          {label} *
        </label>
        <div className="flex flex-col space-y-2">
          {/* Input file - SÓ APARECE se não tiver arquivo selecionado */}
          {!hasFile && (
            <>
              <input
                type="file"
                ref={getFileInputRef(field)}
                accept=".pdf,application/pdf"
                onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
                className="hidden"
                id={field}
              />
              <label
                htmlFor={field}
                className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
              >
                <FaUpload className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Selecionar PDF
                </span>
              </label>
            </>
          )}
          
          {/* Mensagem de erro */}
          {hasError && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <FaExclamationTriangle className="w-4 h-4" />
              <span>{fileErrors[field]}</span>
            </div>
          )}
          
          {/* Preview do arquivo - SÓ APARECE se tiver arquivo válido */}
          {hasFile && !hasError && (
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <FaFilePdf className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {fileNames[field]}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleViewFile(field)}
                  className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaEye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(field)}
                  className="p-1 text-red-600 hover:text-red-700 transition-colors"
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
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Nova Candidatura
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Faça upload dos documentos necessários (apenas PDF, máximo 2MB cada)
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Barra de progresso */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FaPercentage className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Progresso de preenchimento
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                {progress}% completo
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cópia do BI */}
              {renderFileField('documentIdCardUrl', 'Cópia do BI')}

              {/* Declaração de Salário */}
              {renderFileField('documentSalaryDeclarationUrl', 'Declaração de Salário')}

              {/* Extrato Bancário */}
              {renderFileField('documentBankStatementUrl', 'Extrato Bancário')}

              {/* Último Recibo Bancário */}
              {renderFileField('documentLastBankReceiptUrl', 'Último Recibo Bancário')}

              {/* Botão de submit */}
              <button
                type="submit"
                disabled={isSubmitting || progress !== 100}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  progress === 100 && !isSubmitting
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    <span>Enviando candidatura...</span>
                  </div>
                ) : (
                  'Submeter Candidatura'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}