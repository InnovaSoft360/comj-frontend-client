import { FiMenu, FiSearch } from 'react-icons/fi';
import styles from './style.module.css';

interface UserData {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  foto: string;
  role: number;
  dataRegistro: string;
  militarInfo: {
    nip: string;
    telefone: string;
  } | null;
  administradorInfo: any | null;
}

interface HeaderProps {
  userData: UserData | null;
  loading: boolean;
  toggleMobileMenu: () => void;
}

export default function Header({ userData, loading, toggleMobileMenu }: HeaderProps) {
  // Função para obter iniciais do nome
  const getInitials = (nome: string, sobreNome: string): string => {
    return `${nome.charAt(0)}${sobreNome.charAt(0)}`.toUpperCase();
  };

  return (
    <header className={styles.header}>
      <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
        <FiMenu />
      </button>
      <div className={styles.searchBox}>
        <FiSearch className={styles.searchIcon} />
        <input type="text" placeholder="Pesquisar..." />
      </div>
      <div className={styles.userProfile}>
        {loading ? (
          <span>Carregando...</span>
        ) : userData ? (
          <>
            <span>{userData.nome}</span>
            <div className={styles.avatar}>
              {getInitials(userData.nome, userData.sobreNome)}
            </div>
          </>
        ) : (
          <>
            <span>Usuário</span>
            <div className={styles.avatar}>U</div>
          </>
        )}
      </div>
    </header>
  );
}