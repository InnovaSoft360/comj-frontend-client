import { useState, useEffect } from 'react';
import styles from "./style.module.css";
import api from '@/app/api';

interface Usuario {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  foto: string;
  role: number;
  dataRegistro: string;
  militarInfo: any;
  administradorInfo: any;
}

interface ModalProps {
  usuario: Usuario | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface AdminInfo {
  cargo: number;
}

interface UpdateData {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  role: number;
  adminInfo: AdminInfo;
}

export default function ModalEditarUsuario({ usuario, isOpen, onClose, onSuccess }: ModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    sobreNome: '',
    email: '',
    cargo: 0
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome || '',
        sobreNome: usuario.sobreNome || '',
        email: usuario.email || '',
        cargo: usuario.administradorInfo?.cargo || 0
      });
    }
  }, [usuario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    setCarregando(true);
    setErro(null);

    try {
      const updateData: UpdateData = {
        id: usuario.id,
        nome: formData.nome,
        sobreNome: formData.sobreNome,
        email: formData.email,
        role: usuario.role,
        adminInfo: {
          cargo: formData.cargo
        }
      };

      const response = await api.put('/v1/Usuarios/UpdateAdm', updateData);

      if (response.data.code === 204) {
        onSuccess();
      } else {
        setErro(response.data.message || 'Erro ao atualizar usuário');
      }
    } catch (error: any) {
      setErro(error.response?.data?.message || 'Erro ao atualizar usuário');
      console.error('Erro ao atualizar usuário:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen || !usuario) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Editar Usuário</h2>
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

          {usuario.role === 1 && (
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
              {carregando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}