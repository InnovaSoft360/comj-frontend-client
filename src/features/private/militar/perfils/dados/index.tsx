// Perfil.tsx
import { useState, useEffect } from 'react';
import api from '../../../../../core/api';
import type { UserData, ApiResponse } from './user';
import './style.css';
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaSpinner } from 'react-icons/fa';

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

        // ✅ CORREÇÃO: Use o endpoint correto
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

  // ... resto do código permanece igual

  if (loading) {
    return (
      <div className="perfil-container">
        <div className="perfil-card">
          <div className="loading-container">
            <FaSpinner className="spinner" size={32} />
            <p>Carregando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="perfil-container">
        <div className="perfil-card">
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={() => window.location.href = '/login'}>Fazer login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">

        <div className="perfil-content">
          <div className="perfil-photo-section">
            <div className="photo-container">
              <img 
                src={userData?.foto || '/default-avatar.png'} 
                alt="Foto do perfil"
                className="profile-photo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-avatar.png';
                }}
              />
            </div>
          </div>

          <div className="perfil-info">
            <div className="info-group">
              <label>Nome</label>
              <div className="info-value">
                <FaUser className="info-icon" />
                {userData?.nome || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>Sobrenome</label>
              <div className="info-value">
                <FaUser className="info-icon" />
                {userData?.sobreNome || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>Email</label>
              <div className="info-value">
                <FaEnvelope className="info-icon" />
                {userData?.email || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>NIP</label>
              <div className="info-value">
                <FaIdCard className="info-icon" />
                {userData?.militarInfo?.nip || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>Telefone</label>
              <div className="info-value">
                <FaPhone className="info-icon" />
                {userData?.militarInfo?.telefone || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>Função</label>
              <div className="info-value">
                <FaUser className="info-icon" />
                {userData?.role === 1 ? 'Administrador' : 
                 userData?.role === 2 ? 'Militar' : 'Não definido'}
              </div>
            </div>

            {userData?.administradorInfo?.cargo && (
              <div className="info-group">
                <label>Cargo</label>
                <div className="info-value">
                  <FaUser className="info-icon" />
                  {userData.administradorInfo.cargo}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}