// app/(auth)/forgot-password/page.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAlert } from "@/components/ui/customAlert";

export default function ForgotPassword() {
  const router = useRouter();
  const { showAlert, AlertContainer } = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  // Função para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação do email
    if (!validateEmail(email)) {
      showAlert("Por favor, insira um email válido!", "warning");
      setIsLoading(false);
      return;
    }

    try {
      // Fazer requisição para a API
      const response = await api.post("/v1/Password/Forgot", {
        email: email
      });

      if (response.data.code === 200) {
        showAlert("Senha temporária enviada para seu email!", "success");
        
        // Redirecionar para login após 3 segundos
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }

    } catch (error: any) {
      console.error("Erro na recuperação de senha:", error);
      
      // Mostrar mensagem de erro da API se disponível
      if (error.response?.data?.message) {
        showAlert(error.response.data.message, "error");
      } else if (error.response?.status === 404) {
        showAlert("Email não encontrado em nosso sistema.", "error");
      } else if (error.response?.status === 400) {
        showAlert("Email inválido. Verifique o formato e tente novamente.", "error");
      } else if (error.request) {
        showAlert("Erro de conexão. Verifique sua internet.", "error");
      } else {
        showAlert("Erro ao enviar instruções. Tente novamente.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <AlertContainer />
      
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          href="/login"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o login
        </Link>

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
            Recuperar Senha
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Digite seu email para receber instruções de recuperação
          </p>
        </div>

        {/* Recovery Form */}
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
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
                  Enviando...
                </div>
              ) : (
                "Enviar Instruções"
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lembrou sua senha?{" "}
              <Link 
                href="/login" 
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-200"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não recebeu o email?{" "}
            <a 
              href="https://wa.me/244935751955" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
            >
              Contacte-nos no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}