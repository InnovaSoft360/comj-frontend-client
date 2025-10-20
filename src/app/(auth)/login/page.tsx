// app/(auth)/login/page.tsx
'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAlert } from "@/components/ui/customAlert";
import { useAuth } from "@/hooks/useAuth";
import { WHATSAPP_CONFIG } from "@/constants/whatsapp";

export default function Login() {
  const router = useRouter();
  const { showAlert, AlertContainer } = useAlert();
  const { login } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  // Função para validar e formatar email (sempre minúsculo)
  const handleEmailChange = (value: string) => {
    const cleaned = value.toLowerCase().trim();
    setEmail(cleaned);
    
    // Atualiza também a ref para o submit
    if (emailRef.current) {
      emailRef.current.value = cleaned;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação básica apenas para campos vazios
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      showAlert("Preencha todos os campos obrigatórios!", "warning");
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(emailRef.current.value, passwordRef.current.value);

      if (success) {
        showAlert("Login realizado com sucesso!", "success");
        
        // Redirecionar para página principal após 1 segundo
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        showAlert("Credenciais inválidas. Verifique seus dados e tente novamente.", "error");
      }

    } catch (error: unknown) {
      // ⭐⭐ TRATAMENTO QUE USA APENAS MENSAGENS DA API ⭐⭐
      
      const err = error as {
        response?: {
          data?: string | { message?: string; errors?: Record<string, unknown> };
          status?: number;
        };
        request?: unknown;
        code?: string;
      };

      // DEBUG: Vamos ver o que a API está retornando
      if (process.env.NODE_ENV === 'development') {
        console.log('DEBUG - Erro completo:', {
          status: err?.response?.status,
          data: err?.response?.data,
        });
      }

      // ⭐⭐ PRIMEIRO: Verificar se é rate limiting (429) ⭐⭐
      if (err.response?.status === 429) {
        // Rate limiting - pegar mensagem do response data ou usar mensagem específica
        const rateLimitMessage = err.response.data || "🚫 Muitas tentativas de login! Aguarde 2 minutos antes de tentar novamente.";
        showAlert(rateLimitMessage as string, "error");
      } 
      // ⭐⭐ SEGUNDO: Verificar se tem mensagem específica da API ⭐⭐
      else if (typeof err.response?.data === 'object' && err.response.data?.message) {
        showAlert(err.response.data.message, "error");
      }
      // ⭐⭐ TERCEIRO: Verificar se é texto puro da API ⭐⭐
      else if (typeof err.response?.data === 'string') {
        showAlert(err.response.data, "error");
      }
      // ⭐⭐ QUARTO: Erros de validação ⭐⭐
      else if (typeof err.response?.data === 'object' && err.response.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0];
        showAlert(Array.isArray(firstError) ? firstError[0] : String(firstError), "error");
      }
      // ⭐⭐ QUINTO: Erros de conexão ⭐⭐
      else if (err.code === 'NETWORK_ERROR' || err.code === 'ECONNABORTED') {
        showAlert("Erro de conexão. Verifique sua internet e tente novamente.", "error");
      }
      // ⭐⭐ SEXTO: Request sem resposta ⭐⭐
      else if (err.request) {
        showAlert("Servidor indisponível. Tente novamente em alguns instantes.", "error");
      }
      // ⭐⭐ SÉTIMO: Unauthorized (401) - credenciais inválidas ⭐⭐
      else if (err.response?.status === 401) {
        showAlert("Email ou senha incorretos. Verifique suas credenciais.", "error");
      }
      // ⭐⭐ ÚLTIMO: Fallback genérico ⭐⭐
      else {
        showAlert("Ocorreu um erro inesperado. Tente novamente.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <AlertContainer />
      
      <div className="w-full max-w-md">
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
            Acessar Conta
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={(e) => handleEmailChange(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed lowercase"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  ref={passwordRef}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Sua senha está segura e protegida
              </p>
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
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Links Section */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center items-center space-x-4 text-sm">
              <Link 
                href="/forgot-password" 
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-200"
              >
                Esqueceu a senha?
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                href="/register" 
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-200"
              >
                Criar conta
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Precisa de ajuda?{" "}
            <a 
              href={WHATSAPP_CONFIG.urls.withMessage}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
            >
              {WHATSAPP_CONFIG.display.buttonText}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}