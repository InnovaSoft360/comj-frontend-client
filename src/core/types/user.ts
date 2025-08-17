export interface UserRegistration {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  foto?: File | null;
  nip: string;
}

export interface UserRegistrationResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    nip: string;
  };
}

export interface RegisterFormData {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  foto: File | null;
  nip: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}
