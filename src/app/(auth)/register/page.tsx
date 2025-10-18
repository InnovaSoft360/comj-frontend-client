// app/(auth)/register/page.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaIdCard } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAlert } from "@/components/ui/customAlert";

export default function Register() {
  const router = useRouter();
  const { showAlert, AlertContainer } = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bi: "",
    password: "",
    confirmPassword: ""
  });

  // Função para validar BI
  const validateBI = (bi: string): boolean => {
    const biRegex = /^[0-9]{9}[A-Z]{2}[0-9]{3}$/;
    return biRegex.test(bi);
  };

  // Handler inteligente para input do BI
  const handleBIInput = (value: string) => {
    // Remove tudo que não é letra ou número
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Determina qual parte estamos preenchendo
    const currentLength = cleaned.length;
    
    let formatted = '';
    
    if (currentLength <= 9) {
      // Primeira parte: apenas números (0-9)
      formatted = cleaned.replace(/[^0-9]/g, '');
    } else if (currentLength <= 11) {
      // Segunda parte: apenas letras (A-Z)
      const numbersPart = cleaned.slice(0, 9).replace(/[^0-9]/g, '');
      const lettersPart = cleaned.slice(9).replace(/[^A-Z]/g, '');
      formatted = numbersPart + lettersPart;
    } else {
      // Terceira parte: apenas números (0-9)
      const numbersPart = cleaned.slice(0, 9).replace(/[^0-9]/g, '');
      const lettersPart = cleaned.slice(9, 11).replace(/[^A-Z]/g, '');
      const finalNumbers = cleaned.slice(11).replace(/[^0-9]/g, '');
      formatted = numbersPart + lettersPart + finalNumbers;
    }
    
    // Limita o comprimento total
    formatted = formatted.slice(0, 14);
    
    setFormData(prev => ({ ...prev, bi: formatted }));
  };

  // Função para obter a máscara visual do BI
  const getBIPlaceholder = (bi: string): string => {
    const length = bi.length;
    
    if (length <= 9) {
      // Mostra os números digitados e o resto da primeira parte
      const filled = bi;
      const remaining = '0'.repeat(9 - length);
      const rest = 'XX000';
      return filled + remaining + rest;
    } else if (length <= 11) {
      // Mostra números + letras digitadas e o resto
      const numbers = bi.slice(0, 9);
      const letters = bi.slice(9);
      const remainingLetters = 'X'.repeat(2 - letters.length);
      const finalNumbers = '000';
      return numbers + letters + remainingLetters + finalNumbers;
    } else {
      // Mostra tudo preenchido até onde foi
      const numbers = bi.slice(0, 9);
      const letters = bi.slice(9, 11);
      const finalNumbers = bi.slice(11);
      const remainingNumbers = '0'.repeat(3 - finalNumbers.length);
      return numbers + letters + finalNumbers + remainingNumbers;
    }
  };

  // Função para validar senha
  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push("A senha deve ter pelo menos 6 caracteres");
    }
    if (password.length > 20) {
      errors.push("A senha não pode exceder 20 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra minúscula");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("A senha deve conter pelo menos um número");
    }
    
    return { isValid: errors.length === 0, errors };
  };

  // Função para validar nome
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validações do frontend (para melhor UX)
      if (!validateName(formData.firstName)) {
        showAlert("Nome deve conter apenas letras e ter entre 2 e 50 caracteres", "warning");
        setIsLoading(false);
        return;
      }

      if (!validateName(formData.lastName)) {
        showAlert("Sobrenome deve conter apenas letras e ter entre 2 e 50 caracteres", "warning");
        setIsLoading(false);
        return;
      }

      if (!validateBI(formData.bi)) {
        showAlert("BI deve seguir o formato: 9 números + 2 letras + 3 números (ex: 123456789LA098)", "warning");
        setIsLoading(false);
        return;
      }

      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        showAlert(passwordValidation.errors[0], "warning");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        showAlert("As senhas não coincidem!", "warning");
        setIsLoading(false);
        return;
      }

      // Fazer requisição para a API
      const response = await api.post("/v1/Auth/RegisterClient", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bi: formData.bi,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (response.data.code === 200) {
        showAlert("Conta criada com sucesso! Você será redirecionado para o login.", "success");
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }

    } catch (error: unknown) {
      // SILENCIOSO - não loga erro no console
      
      const err = error as {
        response?: {
          data?: {
            message?: string;
            errors?: Record<string, unknown>;
          };
          status?: number;
        };
        request?: unknown;
      };

      // Mostrar mensagem de erro da API se disponível
      if (err.response?.data?.message) {
        showAlert(err.response.data.message, "error");
      } else if (err.response?.data?.errors) {
        // Se houver múltiplos erros de validação
        const firstError = Object.values(err.response.data.errors)[0];
        showAlert(Array.isArray(firstError) ? firstError[0] : String(firstError), "error");
      } else if (err.response?.status === 400) {
        showAlert("Dados de registro inválidos. Verifique os campos e tente novamente.", "error");
      } else if (err.request) {
        showAlert("Erro de conexão. Verifique sua internet.", "error");
      } else {
        showAlert("Erro ao criar conta. Tente novamente.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <AlertContainer />
      
      <div className="w-full max-w-2xl">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/logo.png" 
              alt="Condomínio Osvaldo MJ" 
              width={80} 
              height={80}
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Criar Conta
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Preencha seus dados para se candidatar
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    disabled={isLoading}
                    placeholder="Seu nome"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Apenas letras (2-50 caracteres)</p>
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sobrenome *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    disabled={isLoading}
                    placeholder="Seu sobrenome"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Apenas letras (2-50 caracteres)</p>
              </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-mail *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={isLoading}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

            {/* BI Number */}
            <div>
              <label htmlFor="bi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Número do BI *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="bi"
                  required
                  value={formData.bi}
                  onChange={(e) => handleBIInput(e.target.value)}
                  disabled={isLoading}
                  placeholder={getBIPlaceholder(formData.bi)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase font-mono tracking-wider"
                  maxLength={14}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  Formato: <span className="font-mono">000000000XX000</span>
                </p>
                {formData.bi.length > 0 && (
                  <p className="text-xs font-medium">
                    {formData.bi.length}/14
                  </p>
                )}
              </div>
              
              {/* Indicador visual das partes */}
              <div className="flex text-xs text-gray-400 mt-2 space-x-1">
                <span className={formData.bi.length >= 9 ? "text-green-600 font-medium" : ""}>
                  9 números
                </span>
                <span>•</span>
                <span className={formData.bi.length >= 11 ? "text-green-600 font-medium" : ""}>
                  2 letras
                </span>
                <span>•</span>
                <span className={formData.bi.length >= 14 ? "text-green-600 font-medium" : ""}>
                  3 números
                </span>
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    disabled={isLoading}
                    placeholder="Sua senha"
                    className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 disabled:opacity-50"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">6-20 caracteres, maiúscula, minúscula e número</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar Senha *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    disabled={isLoading}
                    placeholder="Confirme sua senha"
                    className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 disabled:opacity-50"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:translate-y-[-1px] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Criando conta...
                </div>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          {/* Links Section */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Já tem uma conta?{" "}
                <Link 
                  href="/login" 
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-200"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Precisa de ajuda?{" "}
            <a 
              href="https://wa.me/244935751955" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
            >
              Fale connosco no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}