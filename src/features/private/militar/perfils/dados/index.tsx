// Perfil.tsx
import { useState, useEffect } from 'react';
import api from '../../../../../core/api';
import type { UserData, ApiResponse } from './user';
import styles from './style.module.css';
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaSpinner, FaCog } from 'react-icons/fa';

export default function DadosMilitar() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const authCheck = await api.get('/v1/Auth/CheckAuth');
        
        if (!authCheck.data.authenticated) {
          setError('Usuário não autenticado. Faça login novamente.');
          setLoading(false);
          return;
        }

        const response = await api.get<ApiResponse<UserData>>('/v1/Usuarios/GetCurrentUser');
        
        if (response.data.code === 200 && response.data.data) {
          setUserData(response.data.data);
        } else {
          setError('Erro ao carregar dados do usuário');
        }
      } catch (err: any) {
        console.error('Erro ao buscar dados:', err);
        if (err.response?.status === 401) {
          setError('Sessão expirada. Faça login novamente.');
        } else {
          setError('Erro ao carregar perfil. Tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className={styles.perfilContainer}>
        <div className={styles.perfilCard}>
          <div className={styles.loadingContainer}>
            <FaSpinner className={styles.spinner} size={32} />
            <p>Carregando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.perfilContainer}>
        <div className={styles.perfilCard}>
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
            <button 
              className={styles.loginButton}
              onClick={() => window.location.href = '/login'}
            >
              Fazer login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.perfilCard}>
        <div className={styles.cardHeader}>
          <h2>Meu Perfil</h2>
          <FaCog className={styles.settingsIcon} />
        </div>

        <div className={styles.perfilContent}>
          <div className={styles.perfilPhotoSection}>
            <div className={styles.photoContainer}>
              <img 
                src={userData?.foto || '/default-avatar.png'} 
                alt="Foto do perfil"
                className={styles.profilePhoto}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-avatar.png';
                }}
              />
              <div className={styles.photoOverlay}>
                <span>Visualizar</span>
              </div>
            </div>
            <div className={styles.userStatus}>
              <div className={`${styles.statusBadge} ${userData?.role === 1 ? styles.admin : styles.military}`}>
                {userData?.role === 1 ? 'Administrador' : 'Militar'}
              </div>
            </div>
          </div>

          <div className={styles.perfilInfo}>
            <div className={styles.infoRow}>
              <div className={styles.infoGroup}>
                <label className={styles.infoLabel}>
                  <FaUser className={styles.infoIcon} />
                  Nome
                </label>
                <div className={styles.infoValue}>
                  {userData?.nome || 'Não informado'}
                </div>
              </div>

              <div className={styles.infoGroup}>
                <label className={styles.infoLabel}>
                  <FaUser className={styles.infoIcon} />
                  Sobrenome
                </label>
                <div className={styles.infoValue}>
                  {userData?.sobreNome || 'Não informado'}
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoGroup}>
                <label className={styles.infoLabel}>
                  <FaEnvelope className={styles.infoIcon} />
                  Email
                </label>
                <div className={styles.infoValue}>
                  {userData?.email || 'Não informado'}
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoGroup}>
                <label className={styles.infoLabel}>
                  <FaIdCard className={styles.infoIcon} />
                  NIP
                </label>
                <div className={styles.infoValue}>
                  {userData?.militarInfo?.nip || 'Não informado'}
                </div>
              </div>

              <div className={styles.infoGroup}>
                <label className={styles.infoLabel}>
                  <FaPhone className={styles.infoIcon} />
                  Telefone
                </label>
                <div className={styles.infoValue}>
                  {userData?.militarInfo?.telefone || 'Não informado'}
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoGroup}>
                <label className={styles.infoLabel}>
                  <FaCog className={styles.infoIcon} />
                  Função
                </label>
                <div className={styles.infoValue}>
                  {userData?.role === 1 ? 'Administrador' : 
                   userData?.role === 2 ? 'Militar' : 'Não definido'}
                </div>
              </div>

              <div className={styles.infoGroup}>
                <label className={styles.infoLabel}>
                  <FaCog className={styles.infoIcon} />
                  Data de Registro
                </label>
                <div className={styles.infoValue}>
                  {userData?.dataRegistro ? new Date(userData.dataRegistro).toLocaleDateString('pt-BR') : 'Não informado'}
                </div>
              </div>
            </div>

            {userData?.administradorInfo?.cargo && (
              <div className={styles.infoRow}>
                <div className={styles.infoGroup}>
                  <label className={styles.infoLabel}>
                    <FaUser className={styles.infoIcon} />
                    Cargo Administrativo
                  </label>
                  <div className={styles.infoValue}>
                    {userData.administradorInfo.cargo}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}