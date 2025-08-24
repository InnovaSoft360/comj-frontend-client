import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute, Header, Footer, Home, Dashboard, Etapas, Login, RegisterMilitar, ForgotPassword, ResetPassword, Candidaturas, Estado, DadosMilitar, EditarMilitar, SenhaMilitar, GaleriaVideo, GaleriaImagem } from "./imports";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  const location = useLocation();

  // Hide header/footer for login, register, forgot-password and dashboard
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/registerMilitar" ||
    location.pathname === "/forgot-password";

  return (
    <AuthProvider>
      <div>
        {!hideLayout && <Header />}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/etapas" element={<Etapas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerMilitar" element={<RegisterMilitar />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Galeria é pública */}
          <Route path="/galeria/video" element={<GaleriaVideo />} />
          <Route path="/galeria/imagem" element={<GaleriaImagem />} />

          {/* Rotas PROTEGIDAS - Perfil */}
          <Route path="/perfil/dados" element={
            <ProtectedRoute>
              <DadosMilitar />
            </ProtectedRoute>
          } />
          <Route path="/perfil/editar" element={
            <ProtectedRoute>
              <EditarMilitar />
            </ProtectedRoute>
          } />
          <Route path="/perfil/senha" element={
            <ProtectedRoute>
              <SenhaMilitar />
            </ProtectedRoute>
          } />

          {/* Rotas PROTEGIDAS - Candidatura */}
          <Route path="/candidatura/estado" element={
            <ProtectedRoute>
              <Estado />
            </ProtectedRoute>
          } />
          <Route path="/candidaturas/formulario" element={
            <ProtectedRoute>
              <Candidaturas />
            </ProtectedRoute>
          } />

          {/* Rotas PROTEGIDAS Dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Redirect non-existent routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {!hideLayout && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;