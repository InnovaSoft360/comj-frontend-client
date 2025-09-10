import { useState, useEffect } from 'react';
import { FiX, FiMail, FiUser, FiCalendar, FiShield } from 'react-icons/fi';
import styles from './style.module.css';
import api from '@/app/api';

interface AdministradorInfo {
  id: number;
  cargo: number;
}

interface MilitarInfo {
  id: number;
  nip: string;
  posto: string;
  unidade: string;
}

interface UsuarioDetalhes {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  foto: string;
  role: number;
  dataRegistro: string;
  militarInfo: MilitarInfo | null;
  administradorInfo: AdministradorInfo | null;
}

interface ModalDetalhesUsuarioProps {
  usuarioId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ModalDetalhesUsuario({ 
  usuarioId, 
  isOpen, 
  onClose,
}: ModalDetalhesUsuarioProps) {
  const [usuario, setUsuario] = useState<UsuarioDetalhes | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && usuarioId) {
      fetchDetalhesUsuario();
    } else {
      // Resetar estado quando o modal fechar
      setUsuario(null);
      setErro(null);
    }
  }, [isOpen, usuarioId]);

  const fetchDetalhesUsuario = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      const response = await api.get(`/v1/Usuarios/GetById?Id=${usuarioId}`);
      
      if (response.data.code === 200) {
        setUsuario(response.data.data);
      } else {
        setErro(response.data.message || 'Erro ao carregar detalhes do usuário');
      }
      
      setCarregando(false);
    } catch (error: any) {
      setErro('Erro ao carregar detalhes do usuário');
      setCarregando(false);
      console.error('Erro:', error);
      
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
  };

  const getRoleText = (role: number) => {
    switch (role) {
      case 1: return 'Administrador';
      case 2: return 'Militar';
      default: return 'Desconhecido';
    }
  };

  const getCargoText = (cargo: number) => {
    switch (cargo) {
      case 0: return 'Administrador Geral';
      case 1: return 'Moderador';
      case 2: return 'Suporte';
      default: return 'Desconhecido';
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR');
  };


  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Detalhes do Usuário #{usuarioId}</h2>
          <button className={styles.btnFechar} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.conteudo}>
          {carregando && <div className={styles.carregando}>Carregando detalhes do usuário...</div>}
          
          {erro && <div className={styles.erro}>{erro}</div>}
          
          {usuario && !carregando && (
            <div className={styles.detalhes}>
              <div className={styles.perfil}>
                <div className={styles.fotoContainer}>
                  <img 
                    src={usuario.foto || '/avatar-placeholder.png'} 
                    alt={`${usuario.nome} ${usuario.sobreNome}`}
                    className={styles.foto}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/avatar-placeholder.png';
                    }}
                  />
                </div>
                
                <div className={styles.infoPrincipal}>
                  <h3 className={styles.nomeCompleto}>
                    {usuario.nome} {usuario.sobreNome}
                  </h3>
                  <p className={styles.email}>
                    <FiMail /> {usuario.email}
                  </p>
                  <div className={`${styles.role} ${usuario.role === 1 ? styles.admin : styles.militar}`}>
                    <FiShield /> {getRoleText(usuario.role)}
                  </div>
                </div>
              </div>

              <div className={styles.infoDetalhada}>
                <h3>Informações Detalhadas</h3>
                
                <div className={styles.gridInfo}>
                  <div className={styles.infoItem}>
                    <FiUser className={styles.infoIcon} />
                    <div>
                      <span className={styles.label}>Nome Completo</span>
                      <span className={styles.valor}>{usuario.nome} {usuario.sobreNome}</span>
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <FiMail className={styles.infoIcon} />
                    <div>
                      <span className={styles.label}>Email</span>
                      <span className={styles.valor}>{usuario.email}</span>
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <FiShield className={styles.infoIcon} />
                    <div>
                      <span className={styles.label}>Tipo de Usuário</span>
                      <span className={styles.valor}>{getRoleText(usuario.role)}</span>
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <FiCalendar className={styles.infoIcon} />
                    <div>
                      <span className={styles.label}>Data de Registro</span>
                      <span className={styles.valor}>{formatarData(usuario.dataRegistro)}</span>
                    </div>
                  </div>
                  
                  {usuario.role === 1 && usuario.administradorInfo && (
                    <div className={styles.infoItem}>
                      <FiShield className={styles.infoIcon} />
                      <div>
                        <span className={styles.label}>Cargo</span>
                        <span className={styles.valor}>{getCargoText(usuario.administradorInfo.cargo)}</span>
                      </div>
                    </div>
                  )}
                  
                  {usuario.role === 2 && usuario.militarInfo && (
                    <>
                      <div className={styles.infoItem}>
                        <FiUser className={styles.infoIcon} />
                        <div>
                          <span className={styles.label}>NIP</span>
                          <span className={styles.valor}>{usuario.militarInfo.nip}</span>
                        </div>
                      </div>
                      
                      <div className={styles.infoItem}>
                        <FiUser className={styles.infoIcon} />
                        <div>
                          <span className={styles.label}>Posto</span>
                          <span className={styles.valor}>{usuario.militarInfo.posto || 'Não informado'}</span>
                        </div>
                      </div>
                      
                      <div className={styles.infoItem}>
                        <FiUser className={styles.infoIcon} />
                        <div>
                          <span className={styles.label}>Unidade</span>
                          <span className={styles.valor}>{usuario.militarInfo.unidade || 'Não informada'}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}