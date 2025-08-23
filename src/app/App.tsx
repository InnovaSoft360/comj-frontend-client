import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute, Header, Footer, Home, Dashboard, Informacao, Galeria, Login, RegisterMilitar, ForgotPassword, ResetPassword, Militar } from "./imports";
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
          <Route path="/informacao" element={<Informacao />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerMilitar" element={<RegisterMilitar />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Rotas protegidas */}
          <Route path="/militar/*" element={
            <ProtectedRoute>
              <Militar />
            </ProtectedRoute>
          } />

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
