import { useState } from 'react';
import styles from "./style.module.css";
import api from '@/app/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalNovoUsuario({ isOpen, onClose, onSuccess }: ModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    sobreNome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    role: 1,
    cargo: 0
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setCarregando(true);
    setErro(null);

    try {
      const userData = {
        nome: formData.nome,
        sobreNome: formData.sobreNome,
        email: formData.email,
        password: formData.senha,
        role: formData.role,
        adminInfo: formData.role === 1 ? { cargo: formData.cargo } : null
      };

      const response = await api.post('/v1/Usuarios/Create', userData);

      if (response.data.code === 201) {
        alert('Usuário criado com sucesso!');
        onSuccess();
      } else {
        setErro(response.data.message || 'Erro ao criar usuário');
      }
    } catch (error: any) {
      setErro(error.response?.data?.message || 'Erro ao criar usuário');
      console.error('Erro ao criar usuário:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' || name === 'cargo' ? parseInt(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Novo Usuário</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sobreNome">Sobrenome</label>
            <input
              type="text"
              id="sobreNome"
              name="sobreNome"
              value={formData.sobreNome}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Tipo de Usuário</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value={1}>Administrador</option>
              <option value={2}>Militar</option>
            </select>
          </div>

          {formData.role === 1 && (
            <div className={styles.formGroup}>
              <label htmlFor="cargo">Cargo</label>
              <select
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
              >
                <option value={0}>Administrador</option>
                <option value={1}>Super Administrador</option>
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {erro && <div className={styles.erro}>{erro}</div>}

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.btnCancelar}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btnSalvar}
              disabled={carregando}
            >
              {carregando ? 'Criando...' : 'Criar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}