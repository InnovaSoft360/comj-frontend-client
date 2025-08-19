export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarSenha = (senha: string): { valido: boolean; mensagem?: string } => {
  if (senha.length < 4) {
    return { valido: false, mensagem: 'A senha deve ter no mínimo 4 caracteres' };
  }
  return { valido: true };
};

export const validarTelefone = (telefone: string): boolean => {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(telefone);
};

export const validarNIP = (nip: string): { valido: boolean; mensagem?: string } => {
  // Remove espaços para validação
  const nipLimpo = nip.replace(/\s/g, '');
  
  if (!nipLimpo) {
    return { valido: false, mensagem: 'NIP é obrigatório' };
  }
  
  if (!/^\d+$/.test(nipLimpo)) {
    return { valido: false, mensagem: 'NIP deve conter apenas números' };
  }
  
  if (nipLimpo.length > 7) {
    return { valido: false, mensagem: 'NIP deve ter no máximo 7 dígitos' };
  }
  
  return { valido: true };
};

export const validarFormularioCadastro = (dados: {
  nome: string;
  sobrenome: string;
  email: string;
  telefone?: string;
  senha: string;
  confirmarSenha: string;
  nip: string;
}) => {
  const erros: { [key: string]: string } = {};

  if (!dados.nome.trim()) {
    erros.nome = 'Nome é obrigatório';
  }

  if (!dados.sobrenome.trim()) {
    erros.sobrenome = 'Sobrenome é obrigatório';
  }

  if (!validarEmail(dados.email)) {
    erros.email = 'Email inválido';
  }

  const validacaoSenha = validarSenha(dados.senha);
  if (!validacaoSenha.valido) {
    erros.senha = validacaoSenha.mensagem || 'Senha inválida';
  }

  if (dados.senha !== dados.confirmarSenha) {
    erros.confirmarSenha = 'As senhas não coincidem';
  }

  const validacaoNIP = validarNIP(dados.nip);
  if (!validacaoNIP.valido) {
    erros.nip = validacaoNIP.mensagem || 'NIP inválido';
  }

  if (dados.telefone && !validarTelefone(dados.telefone)) {
    erros.telefone = 'Telefone inválido. Use o formato (XX) XXXXX-XXXX';
  }

  return erros;
};
