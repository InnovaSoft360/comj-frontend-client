// app/(containers)/candidatura/page.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  FaFileAlt, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaArrowLeft,
  FaEdit,
  FaPlus 
} from "react-icons/fa";
import { IconType } from "react-icons";
import { useApplication } from "@/hooks/useApplication";
import { useAuth } from "@/hooks/useAuth";
import CreateApplicationModal from "@/components/modals/CreateApplicationModal";
import EditApplicationModal from '@/components/modals/EditApplicationModal';
import { WHATSAPP_CONFIG } from "@/constants/whatsapp";

// Mapeamento de status
const STATUS_MAP = {
  1: { name: "Pendente", description: "Sua candidatura está aguardando análise inicial." },
  2: { name: "Em Análise", description: "Sua candidatura está sendo analisada pela nossa equipe." },
  3: { name: "Aprovada", description: "Parabéns! Sua candidatura foi aprovada." },
  4: { name: "Rejeitada", description: "Sua candidatura precisa de algumas correções." },
  5: { name: "Cancelada", description: "Sua candidatura foi cancelada." }
};

// Interface para as informações de status
interface StatusInfo {
  icon: IconType;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
}

export default function Candidatura() {
  const { application, isLoading, hasApplication, refetch } = useApplication();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Função para obter informações do status
  const getStatusInfo = (): StatusInfo | null => {
    if (!application) return null;

    const statusConfig = {
      1: { // Pending
        icon: FaClock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
      },
      2: { // UnderReview
        icon: FaClock,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      },
      3: { // Approved
        icon: FaCheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      },
      4: { // Rejected
        icon: FaExclamationTriangle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      },
      5: { // Cancelled
        icon: FaExclamationTriangle,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      }
    };

    const config = statusConfig[application.status as keyof typeof statusConfig] || statusConfig[1];
    const statusInfo = STATUS_MAP[application.status as keyof typeof STATUS_MAP] || STATUS_MAP[1];

    return {
      icon: config.icon,
      color: config.color,
      bgColor: config.bgColor,
      borderColor: config.borderColor,
      title: statusInfo.name,
      description: statusInfo.description
    };
  };

  // Determinar se mostra botão de criar ou editar
  const shouldShowCreateButton = !hasApplication;
  
  const shouldShowEditButton = hasApplication && 
    application?.status === 4 && 
    application.allowRejectedEdit; // Apenas Rejeitada com permissão para editar

  // Status onde NENHUM botão aparece
  const shouldHideAllButtons = hasApplication && 
    (application?.status === 1 || // Pendente
     application?.status === 2 || // Em Análise
     application?.status === 3 || // Aprovada
     application?.status === 5 || // Cancelada
     (application?.status === 4 && !application.allowRejectedEdit)); // Rejeitada sem permissão

  const statusInfo = application ? getStatusInfo() : null;

  // Se não tem candidatura
  if (!isLoading && !hasApplication) {
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

          {/* Estado sem candidatura */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt className="w-8 h-8 text-gray-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhuma Candidatura Encontrada
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Você ainda não submeteu nenhuma candidatura. Clique no botão abaixo para criar sua primeira candidatura.
              </p>

              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FaPlus className="mr-2" />
                Criar Candidatura
              </button>
            </div>
          </div>
        </div>

        {/* Modal de criação */}
        {showCreateModal && (
          <CreateApplicationModal 
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              // Recarregar os dados da aplicação após criação bem-sucedida
              refetch();
            }}
          />
        )}
      </div>
    );
  }

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
          
          <div className="flex items-center justify-between">
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

            {/* Botões de ação - APENAS quando aplicável */}
            {!shouldHideAllButtons && (
              <div className="flex space-x-3">
                {shouldShowCreateButton && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    <FaPlus className="mr-2" />
                    Criar Candidatura
                  </button>
                )}
                
                {shouldShowEditButton && (
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    <FaEdit className="mr-2" />
                    Editar Candidatura
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-900 dark:text-white">Carregando candidatura...</span>
            </div>
          </div>
        )}

        {/* Conteúdo quando tem candidatura */}
        {!isLoading && application && statusInfo && (
          <>
            {/* Status Card */}
            <div className={`rounded-xl border-2 ${statusInfo.borderColor} ${statusInfo.bgColor} p-6 mb-8`}>
              <div className="flex items-center space-x-4">
                <statusInfo.icon className={`w-8 h-8 ${statusInfo.color}`} />
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${statusInfo.color}`}>
                    {statusInfo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {statusInfo.description}
                  </p>
                  
                  {/* Mostrar remainingDays apenas para status 1 e 2 */}
                  {(application.status === 1 || application.status === 2) && application.remainingDays > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <strong>Tempo restante:</strong> {application.remainingDays} dia(s)
                    </p>
                  )}
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
                    {application.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Data de Submissão
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(application.createdAt).toLocaleDateString('pt-AO')}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Última Atualização
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(application.updatedAt).toLocaleDateString('pt-AO')}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <statusInfo.icon className={`w-4 h-4 ${statusInfo.color}`} />
                    <span className={`font-medium ${statusInfo.color}`}>
                      {statusInfo.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximos Passos */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Próximos Passos
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold">1</span>
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
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold">2</span>
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
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold">3</span>
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
                    href={WHATSAPP_CONFIG.urls.withMessage}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                  >
                    {WHATSAPP_CONFIG.display.formattedNumber}
                  </a>
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateApplicationModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            // Recarregar os dados da aplicação após criação bem-sucedida
            refetch();
          }}
        />
      )}
      
      {showEditModal && application && (
        <EditApplicationModal 
          application={application}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            // Recarregar os dados da aplicação após atualização bem-sucedida
            refetch();
          }}
        />
      )}
    </div>
  );
}