import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute, Header, Footer, Home, Dashboard, Etapas, Login, RegisterMilitar, Candidaturas, Estado, DadosMilitar, EditarMilitar, SenhaMilitar, GaleriaVideo, GaleriaImagem, PoliticaPrivacidade } from "./imports";

function App() {
  const location = useLocation();

  // Hide header/footer for login, register, forgot-password and dashboard
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/registerMilitar" ||
    location.pathname === "/forgot-password";

  return (

      <div>
        {!hideLayout && <Header />}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/etapas" element={<Etapas />} />
          <Route path="/politicaPrivacidade" element={<PoliticaPrivacidade />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerMilitar" element={<RegisterMilitar />} />
          
          {/* Galeria é pública */}
          <Route path="/galeria/video" element={<GaleriaVideo />} />
          <Route path="/galeria/imagem" element={<GaleriaImagem />} />

          {/* Rotas PROTEGIDAS - Perfil */}
          <Route path="/perfil/dados" element={<ProtectedRoute><DadosMilitar /></ProtectedRoute>} />
          <Route path="/perfil/editar" element={<ProtectedRoute><EditarMilitar /></ProtectedRoute>} />
          <Route path="/perfil/senha" element={<ProtectedRoute><SenhaMilitar /></ProtectedRoute>} />

          {/* Rotas PROTEGIDAS - Candidatura */}
          <Route path="/candidatura/estado" element={<ProtectedRoute><Estado /></ProtectedRoute>} />
          <Route path="/candidaturas/formulario" element={<ProtectedRoute><Candidaturas /></ProtectedRoute>} />

          {/* Rotas PROTEGIDAS Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Redirect non-existent routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {!hideLayout && <Footer />}
      </div>
  );
}

export default App;