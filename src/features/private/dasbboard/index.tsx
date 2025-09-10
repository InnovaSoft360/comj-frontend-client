import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../components/ui/customAlert';
import api from '../../../app/api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
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

interface ApiResponse {
  code: number;
  message: string;
  data: UserData;
}

export default function Dashboard() {
  const [activeContent, setActiveContent] = useState<string>('visao-geral');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showAlert, AlertContainer } = useAlert();

  // Função para buscar dados do usuário logado
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await api.get<ApiResponse>('/v1/Usuarios/GetCurrentUser');
      setUserData(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      showAlert('Erro ao carregar informações do usuário.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Função para fazer logout
  const handleLogout = async (): Promise<void> => {
    try {
      await api.post("/v1/Auth/Logout");
      navigate("/");
      showAlert("Logout realizado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      showAlert("Erro ao fazer logout.", "error");
    }
  };

  // Função para navegar entre conteúdos
  const navigateToContent = (content: string) => {
    setActiveContent(content);
    setMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Overlay para mobile */}
      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={toggleMobileMenu}></div>
      )}

      <Sidebar
        activeContent={activeContent}
        sidebarCollapsed={sidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        navigateToContent={navigateToContent}
        toggleSidebar={toggleSidebar}
        toggleMobileMenu={toggleMobileMenu}
        handleLogout={handleLogout}
      />

      <main className={styles.mainContent}>
        <Header
          userData={userData}
          loading={loading}
          toggleMobileMenu={toggleMobileMenu}
        />

        <ContentArea activeContent={activeContent} />
      </main>
      
      {/* Container para alertas */}
      <AlertContainer />
    </div>
  );
}