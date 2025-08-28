import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: number; // 1 = Admin, 2 = Militar
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Primeiro verifica se está autenticado
      const authResponse = await api.get("/v1/Auth/CheckAuth");
      setIsAuthenticated(authResponse.data.authenticated);
      
      if (authResponse.data.authenticated) {
        // Se estiver autenticado, busca os dados do usuário
        const userResponse = await api.get("/v1/Usuarios/GetCurrentUser");
        setUserRole(userResponse.data.data.role);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Verificando autenticação...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se uma role específica for requerida, verifica se o usuário tem permissão
  if (requiredRole && userRole !== requiredRole) {
    // Redireciona com base na role do usuário
    if (userRole === 1) {
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === 2) {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}