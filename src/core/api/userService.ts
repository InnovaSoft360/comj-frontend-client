import type { UserRegistration, UserRegistrationResponse, ForgotPasswordResponse } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const userService = {
  async cadastrarUsuario(dados: UserRegistration): Promise<UserRegistrationResponse> {
    try {
      const formData = new FormData();
      
      formData.append('nome', dados.nome);
      formData.append('sobrenome', dados.sobrenome);
      formData.append('email', dados.email);
      formData.append('senha', dados.senha);
      formData.append('nip', dados.nip);
      
      if (dados.foto) {
        formData.append('foto', dados.foto);
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }

      return {
        success: true,
        message: 'Usuário cadastrado com sucesso!',
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao cadastrar usuário',
      };
    }
  },

  async solicitarRecuperacaoSenha(email: string): Promise<ForgotPasswordResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao solicitar recuperação de senha');
      }

      return {
        success: true,
        message: data.message || 'Instruções de recuperação enviadas para seu e-mail',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao solicitar recuperação de senha',
      };
    }
  },

  async redefinirSenha(token: string, novaSenha: string): Promise<ResetPasswordResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, novaSenha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao redefinir senha');
      }

      return {
        success: true,
        message: data.message || 'Senha redefinida com sucesso!',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao redefinir senha',
      };
    }
  },
};
