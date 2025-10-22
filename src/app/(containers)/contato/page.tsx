'use client';

import { useState } from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaExclamationTriangle, FaUser } from "react-icons/fa";
import api from "@/lib/api";
import { useAlert } from "@/components/ui/customAlert";
import { WHATSAPP_CONFIG } from "@/constants/whatsapp";
import { INFORMATION_CONFIG } from "@/constants/information";

// Mapeamento dos assuntos para valores em inglês
const subjectMapping = {
  'informacao': 'Informações Gerais',
  'visita': 'Agendar Visita', 
  'suporte': 'Suporte Técnico',
  'outro': 'Outro'
};

// Interface para erros
interface ApiError {
  code?: string;
  message?: string;
  name?: string;
  response?: {
    status?: number;
    data?: {
      errors?: string[] | Record<string, string[]>;
      message?: string;
      success?: boolean;
    };
  };
}

type ErrorType = 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'SERVER_ERROR' | 'TIMEOUT_ERROR' | 'UNKNOWN_ERROR';

// Função auxiliar para detectar tipo de erro - SILENCIOSA
const getErrorType = (error: ApiError): ErrorType => {
  if (!error) return 'UNKNOWN_ERROR';
  
  // Erro de timeout
  if (error.message === 'TIMEOUT_ERROR') {
    return 'TIMEOUT_ERROR';
  }
  
  // Erro de rede
  if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED' || error.message?.includes('Network Error')) {
    return 'NETWORK_ERROR';
  }
  
  // Erro de validação (status 400)
  if (error.response?.status === 400) {
    return 'VALIDATION_ERROR';
  }
  
  // Erro do servidor (status 500+)
  if (error.response?.status && error.response.status >= 500) {
    return 'SERVER_ERROR';
  }
  
  return 'UNKNOWN_ERROR';
};

// Função para retry automático - SILENCIOSA
const retryApiCall = async (fn: () => Promise<unknown>, retries = 2): Promise<unknown> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && getErrorType(error as ApiError) === 'NETWORK_ERROR') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryApiCall(fn, retries - 1);
    }
    throw error;
  }
};

// Função para processar erros de validação
const processValidationErrors = (errors: string[] | Record<string, string[]> | undefined): Record<string, string> => {
  const validationErrors: Record<string, string> = {};

  if (!errors) return validationErrors;

  // Se for array de strings
  if (Array.isArray(errors)) {
    errors.forEach((err: string) => {
      if (err.includes('Full name') || err.includes('Nome')) validationErrors.nome = err;
      else if (err.includes('Email') || err.includes('E-mail')) validationErrors.email = err;
      else if (err.includes('Phone') || err.includes('Telefone')) validationErrors.telefone = err;
      else if (err.includes('Subject') || err.includes('Assunto')) validationErrors.assunto = err;
      else if (err.includes('Message') || err.includes('Mensagem')) validationErrors.mensagem = err;
    });
  } 
  // Se for objeto com campos
  else if (typeof errors === 'object') {
    Object.entries(errors).forEach(([field, errorMessages]) => {
      if (Array.isArray(errorMessages) && errorMessages.length > 0) {
        const errorMessage = errorMessages[0];
        if (field.includes('FullName') || field.includes('fullName') || field.includes('nome')) validationErrors.nome = errorMessage;
        else if (field.includes('Email') || field.includes('email')) validationErrors.email = errorMessage;
        else if (field.includes('Phone') || field.includes('phone') || field.includes('telefone')) validationErrors.telefone = errorMessage;
        else if (field.includes('Subject') || field.includes('subject') || field.includes('assunto')) validationErrors.assunto = errorMessage;
        else if (field.includes('Message') || field.includes('message') || field.includes('mensagem')) validationErrors.mensagem = errorMessage;
      }
    });
  }

  return validationErrors;
};

export default function Contacto() {
  const { showAlert, AlertContainer } = useAlert();
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "", 
    assunto: "",
    mensagem: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função para formatar nome (PRIMEIRA maiúscula, RESTO minúscula)
  const formatNamePart = (name: string): string => {
    if (!name) return "";
    
    // Remove espaços extras e trim
    const cleaned = name.trim();
    
    // PRIMEIRA LETRA MAIÚSCULA, RESTO SEMPRE MINÚSCULA
    if (cleaned.length > 0) {
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    }
    
    return cleaned;
  };

  // Função para juntar nome e sobrenome em FullName
  const getFullName = (): string => {
    const nomeFormatado = formatNamePart(formData.nome);
    const sobrenomeFormatado = formatNamePart(formData.sobrenome);
    
    if (nomeFormatado && sobrenomeFormatado) {
      return `${nomeFormatado} ${sobrenomeFormatado}`;
    } else if (nomeFormatado) {
      return nomeFormatado;
    } else if (sobrenomeFormatado) {
      return sobrenomeFormatado;
    }
    
    return "";
  };

  // Função para validar e formatar email (sempre minúsculo)
  const handleEmailChange = (value: string) => {
    const cleaned = value.toLowerCase().trim();
    setFormData(prev => ({ ...prev, email: cleaned }));
  };

  // Função para validar telefone (9 dígitos, começando com 9)
  const validateTelefone = (telefone: string): boolean => {
    const numbers = telefone.replace(/\D/g, '');
    const telefoneRegex = /^9\d{8}$/;
    return telefoneRegex.test(numbers);
  };

  // Função para formatar telefone enquanto digita
  const formatTelefone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    // Garantir que começa com 9
    let formatted = numbers;
    if (formatted.length > 0 && formatted[0] !== '9') {
      formatted = '9' + formatted.slice(1);
    }
    
    // Limitar a 9 dígitos
    formatted = formatted.slice(0, 9);
    
    // Formatar visualmente: 9XX XXX XXX
    if (formatted.length <= 3) {
      return formatted;
    } else if (formatted.length <= 6) {
      return `${formatted.slice(0, 3)} ${formatted.slice(3)}`;
    } else {
      return `${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6)}`;
    }
  };

  // Handler para input do telefone
  const handleTelefoneInput = (value: string) => {
    const formatted = formatTelefone(value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
    
    // Limpar erro do telefone quando usuário começar a digitar
    if (errors.telefone) {
      setErrors(prev => ({ ...prev, telefone: '' }));
    }
  };

  // Função para validar nome (mínimo 2 caracteres)
  const validateNamePart = (name: string): boolean => {
    return name.length >= 2;
  };

  // Função para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validações do frontend - NOME
    if (!validateNamePart(formData.nome)) {
      setErrors(prev => ({ 
        ...prev, 
        nome: 'Nome deve ter pelo menos 2 caracteres' 
      }));
      showAlert("Por favor, corrija o nome.", "warning");
      setIsLoading(false);
      return;
    }

    // Validações do frontend - SOBRENOME (opcional mas recomendado)
    if (formData.sobrenome && !validateNamePart(formData.sobrenome)) {
      setErrors(prev => ({ 
        ...prev, 
        sobrenome: 'Sobrenome deve ter pelo menos 2 caracteres' 
      }));
      showAlert("Por favor, corrija o sobrenome.", "warning");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ 
        ...prev, 
        email: 'Email inválido' 
      }));
      showAlert("Por favor, insira um email válido.", "warning");
      setIsLoading(false);
      return;
    }

    // Validação do telefone antes de enviar
    const telefoneNumbers = formData.telefone.replace(/\D/g, '');
    if (!validateTelefone(formData.telefone)) {
      setErrors(prev => ({ 
        ...prev, 
        telefone: 'Telefone deve ter 9 dígitos e começar com 9 (ex: 923 456 789)' 
      }));
      showAlert("Por favor, corrija o número de telefone.", "warning");
      setIsLoading(false);
      return;
    }

    try {
      // Juntar nome e sobrenome em FullName para a API
      const fullName = getFullName();
      
      // Mapear dados para o formato da API
      const apiData = {
        fullName: fullName, // "Domingos Nascimento"
        phone: telefoneNumbers,
        email: formData.email.toLowerCase(), // Email sempre minúsculo
        subject: subjectMapping[formData.assunto as keyof typeof subjectMapping] || formData.assunto,
        message: formData.mensagem
      };

      // Função de requisição com timeout
      const makeRequest = async (): Promise<unknown> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
          const response = await api.post('/v1/Support/SendEmail', apiData, {
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          return response;
        } catch (error: unknown) {
          clearTimeout(timeoutId);
          if ((error as ApiError).name === 'AbortError') {
            throw new Error('TIMEOUT_ERROR');
          }
          throw error;
        }
      };

      // Executar requisição com retry automático
      const response = await retryApiCall(makeRequest) as { data?: { success?: boolean } };

      if (response.data?.success) {
        showAlert("Mensagem enviada com sucesso! Entraremos em contacto em breve.", "success");
        setFormData({ 
          nome: "", 
          sobrenome: "", 
          email: "", 
          telefone: "", 
          assunto: "", 
          mensagem: "" 
        });
      } else {
        showAlert("Erro ao enviar mensagem. Tente novamente.", "error");
      }

    } catch (error: unknown) {
      // ⭐⭐ REMOVIDO COMPLETAMENTE O console.error ⭐⭐
      // Nenhum log no console - tratamento totalmente silencioso

      const errorType = getErrorType(error as ApiError);

      switch (errorType) {
        case 'NETWORK_ERROR':
          showAlert("Erro de conexão. Verifique sua internet e tente novamente.", "error");
          break;

        case 'TIMEOUT_ERROR':
          showAlert("Tempo de espera esgotado. O servidor está demorando para responder.", "error");
          break;

        case 'VALIDATION_ERROR':
          const apiError = error as ApiError;
          if (apiError.response?.data?.errors) {
            const validationErrors = processValidationErrors(apiError.response.data.errors);
            setErrors(validationErrors);
            showAlert("Por favor, corrija os erros no formulário.", "warning");
          } else {
            showAlert("Dados inválidos. Verifique as informações do formulário.", "warning");
          }
          break;

        case 'SERVER_ERROR':
          showAlert("Servidor indisponível no momento. Tente novamente em alguns instantes.", "error");
          break;

        default:
          if ((error as ApiError).response?.data?.message) {
            showAlert((error as ApiError).response!.data!.message!, "error");
          } else {
            showAlert("Erro inesperado ao enviar mensagem. Tente novamente mais tarde.", "error");
          }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'telefone') {
      handleTelefoneInput(value);
    } else if (field === 'email') {
      handleEmailChange(value);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handler específico para o blur dos nomes (aplica formatação final)
  const handleNameBlur = (field: 'nome' | 'sobrenome', value: string) => {
    const formatted = formatNamePart(value);
    setFormData(prev => ({ ...prev, [field]: formatted }));
  };

  // Handler específico para o blur do email (aplica formatação final)
  const handleEmailBlur = (value: string) => {
    const formatted = value.toLowerCase().trim();
    setFormData(prev => ({ ...prev, email: formatted }));
  };

  const contactInfo = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      info: WHATSAPP_CONFIG.display.formattedNumber,
      link: WHATSAPP_CONFIG.urls.withMessage,
      color: "text-green-500"
    },
    {
      icon: FaPhone,
      title: "Telefone", 
      info: INFORMATION_CONFIG.display.formattedNumber,
      link: INFORMATION_CONFIG.display.linkformattedNumberCall,
      color: "text-blue-500"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      info: INFORMATION_CONFIG.display.linkEmail, 
      link: INFORMATION_CONFIG.display.linkEmail,
      color: "text-orange-500"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Localização",
      info: INFORMATION_CONFIG.display.linkLocalization,
      link: "/localizacao",
      color: "text-red-500"
    },
    {
      icon: FaClock,
      title: "Horário de Atendimento",
      info: INFORMATION_CONFIG.display.linkInformation,
      link: "#",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <AlertContainer />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Entre em <span className="text-orange-600">Contacto</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ajudar. Entre em contacto connosco através dos nossos canais de atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Informações de Contacto
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : '_self'}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                    >
                      <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300 ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.info}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <FaWhatsapp className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-2">Contacto de Emergência</h3>
                <p className="text-orange-100 mb-4">Disponível 24/7 para situações urgentes</p>
                <a
                  href={WHATSAPP_CONFIG.urls.withMessageEmargencia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Falar no WhatsApp Agora</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Envie-nos uma Mensagem
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome e Sobrenome em linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => handleChange('nome', e.target.value)}
                      onBlur={(e) => handleNameBlur('nome', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                        errors.nome ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'
                      }`}
                      placeholder="Ex: Domingos"
                    />
                  </div>
                  {errors.nome ? (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaExclamationTriangle className="w-3 h-3 mr-1" />
                      {errors.nome}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm mt-1">
                      Primeiro nome
                    </p>
                  )}
                </div>

                {/* Sobrenome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sobrenome
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.sobrenome}
                      onChange={(e) => handleChange('sobrenome', e.target.value)}
                      onBlur={(e) => handleNameBlur('sobrenome', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                        errors.sobrenome ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'
                      }`}
                      placeholder="Ex: Nascimento"
                    />
                  </div>
                  {errors.sobrenome ? (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaExclamationTriangle className="w-3 h-3 mr-1" />
                      {errors.sobrenome}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm mt-1">
                      Sobrenome (opcional)
                    </p>
                  )}
                </div>
              </div>

              {/* Preview do FullName */}
              {formData.nome && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Nome completo que será enviado:</strong>{' '}
                    <span className="font-semibold">{getFullName()}</span>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={(e) => handleEmailBlur(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 lowercase ${
                      errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaExclamationTriangle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                      errors.telefone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'
                    }`}
                    placeholder="9XX XXX XXX"
                    maxLength={11}
                  />
                  {errors.telefone ? (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaExclamationTriangle className="w-3 h-3 mr-1" />
                      {errors.telefone}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm mt-1">
                      Formato: 9 dígitos começando com 9
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assunto *
                </label>
                <select
                  required
                  value={formData.assunto}
                  onChange={(e) => handleChange('assunto', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none transition-all duration-200 ${
                    errors.assunto ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'
                  }`}
                >
                  <option value="">Selecione o assunto</option>
                  <option value="informacao">Informações Gerais</option>
                  <option value="visita">Agendar Visita</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.assunto && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FaExclamationTriangle className="w-3 h-3 mr-1" />
                    {errors.assunto}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.mensagem}
                  onChange={(e) => handleChange('mensagem', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 resize-none ${
                    errors.mensagem ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'
                  }`}
                  placeholder="Descreva a sua mensagem..."
                />
                {errors.mensagem && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FaExclamationTriangle className="w-3 h-3 mr-1" />
                    {errors.mensagem}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                pergunta: "Como me candidatar a um apartamento?",
                resposta: "Pode candidatar-se através do nosso site, preenchendo o formulário de candidatura online ou contactando-nos diretamente."
              },
              {
                pergunta: "Quais os documentos necessários?",
                resposta: "BI, comprovativo de rendimentos, declaração de IRS e outros documentos que possam ser solicitados conforme o caso."
              },
              {
                pergunta: "Qual o prazo de resposta?",
                resposta: "O prazo médio de resposta é de 5 a 10 dias úteis após a submissão completa da candidatura."
              },
              {
                pergunta: "Posso agendar uma visita?",
                resposta: `Sim, pode agendar uma visita através do nosso ${WHATSAPP_CONFIG.display.buttonText} ou formulário de contacto.`
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Q: {faq.pergunta}</h3>
                <p className="text-gray-600 dark:text-gray-300">R: {faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}