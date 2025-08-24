// interfaces/User.ts
export interface UserData {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  foto?: string;
  role: number;
  dataRegistro?: string;
  militarInfo?: {
    nip?: string;
    telefone?: string;
  } | null;  // ← Pode ser null
  administradorInfo?: {
    cargo?: string;
  } | null;  // ← Pode ser null
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}