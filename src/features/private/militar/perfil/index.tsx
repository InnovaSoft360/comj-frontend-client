import { useAuth } from '../../../../contexts/AuthContext';
import './style.css';
import { FaUser, FaEnvelope, FaIdCard, FaPhone } from 'react-icons/fa';

export default function Perfil() {
  const { user } = useAuth();

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <h2>Perfil</h2>
        </div>

        <div className="perfil-content">
          <div className="perfil-photo-section">
            <div className="photo-container">
              <div className="photo-placeholder">
                <FaUser size={48} />
              </div>
            </div>
          </div>

          <div className="perfil-info">
            <div className="info-group">
              <label>Nome</label>
              <div className="info-value">
                <FaUser className="info-icon" />
                {user?.nome || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>Sobrenome</label>
              <div className="info-value">
                <FaUser className="info-icon" />
                {user?.sobrenome || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>Email</label>
              <div className="info-value">
                <FaEnvelope className="info-icon" />
                {user?.email || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>NIP</label>
              <div className="info-value">
                <FaIdCard className="info-icon" />
                {user?.nip || 'Não informado'}
              </div>
            </div>

            <div className="info-group">
              <label>Telefone</label>
              <div className="info-value">
                <FaPhone className="info-icon" />
                {user?.telefone || 'Não informado'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
