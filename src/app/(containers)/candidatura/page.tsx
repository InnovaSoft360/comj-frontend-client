// app/(containers)/candidatura/page.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { FaFileAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export default function Candidatura() {
  const [isLoading] = useState(false);

  // Dados mockados - serão substituídos pela API depois
  const candidaturaStatus = {
    status: "pendente", // pendente, aprovada, rejeitada
    dataSubmissao: "2024-01-15",
    numeroProcesso: "CAND-2024-00123",
    ultimaAtualizacao: "2024-01-15"
  };

  const getStatusInfo = () => {
    switch (candidaturaStatus.status) {
      case "pendente":
        return {
          icon: FaClock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          title: "Candidatura em Análise",
          description: "Sua candidatura está sendo analisada pela nossa equipe."
        };
      case "aprovada":
        return {
          icon: FaCheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          title: "Candidatura Aprovada",
          description: "Parabéns! Sua candidatura foi aprovada."
        };
      case "rejeitada":
        return {
          icon: FaExclamationTriangle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          title: "Candidatura Requer Ajustes",
          description: "Sua candidatura precisa de algumas correções."
        };
      default:
        return {
          icon: FaClock,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          title: "Status Desconhecido",
          description: "Entre em contacto connosco para mais informações."
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/perfil"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para o Perfil
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <FaFileAlt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Minha Candidatura
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Acompanhe o status da sua candidatura ao Condomínio Osvaldo MJ
              </p>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className={`rounded-xl border-2 ${statusInfo.borderColor} ${statusInfo.bgColor} p-6 mb-8`}>
          <div className="flex items-center space-x-4">
            <StatusIcon className={`w-8 h-8 ${statusInfo.color}`} />
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${statusInfo.color}`}>
                {statusInfo.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {statusInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Informações da Candidatura */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informações da Candidatura
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Número do Processo
              </label>
              <p className="text-gray-900 dark:text-white font-mono">
                {candidaturaStatus.numeroProcesso}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Data de Submissão
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(candidaturaStatus.dataSubmissao).toLocaleDateString('pt-AO')}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Última Atualização
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(candidaturaStatus.ultimaAtualizacao).toLocaleDateString('pt-AO')}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Status
              </label>
              <div className="flex items-center space-x-2">
                <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                <span className={`font-medium ${statusInfo.color}`}>
                  {statusInfo.title}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ações e Informações */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Próximos Passos
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">1</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Análise da Documentação
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Nossa equipe está analisando os documentos submetidos. Este processo pode levar até 5 dias úteis.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">2</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Contacto para Validação
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Entraremos em contacto para validar informações adicionais se necessário.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">3</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Resposta Final
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Você receberá uma notificação com o resultado final da sua candidatura.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Precisa de ajuda?</strong> Entre em contacto connosco através do WhatsApp:{" "}
              <a 
                href="https://wa.me/244935751955" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
              >
                +244 935 751 955
              </a>
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center space-x-4">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-900 dark:text-white">Carregando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}