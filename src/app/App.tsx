import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header, Footer, Home, Dashboard, Informacao, Galeria, Login, RegisterMilitar } from "./imports";

function App() {
  const location = useLocation();

  // Esconde header/footer para login, register e dashboard
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/registerMilitar";

  return (
    <div>
      {!hideLayout && <Header />}

      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/informacao" element={<Informacao />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerMilitar" element={<RegisterMilitar />} />

        {/* Rotas da Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redireciona rotas inexistentes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}
export default App;