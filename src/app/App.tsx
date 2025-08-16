import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header, Footer, Home, Dashboard, Informacao, Galeria, Login, RegisterMilitar } from "./imports";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/dashboard"); 
  // Qualquer rota que comece com /dashboard não terá header/footer

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
