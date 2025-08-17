import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../../../assets/logo/logo.png";
import { validarSenha } from "../../../../core/utils/validation";
import { userService } from "../../../../core/api/userService";
import "./style.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setError("");
    setMessage("");
    
    // Validate passwords
    if (!newPassword.trim()) {
      setError("Por favor, digite a nova senha");
      return;
    }
    
    const passwordValidation = validarSenha(newPassword);
    if (!passwordValidation.valido) {
      setError(passwordValidation.mensagem || "Senha inválida");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    if (!token) {
      setError("Token de recuperação inválido ou expirado");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await userService.redefinirSenha(token, newPassword);
      
      if (response.success) {
        setMessage(response.message || "Senha redefinida com sucesso!");
        setSuccess(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(response.message || "Erro ao redefinir senha");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-box">
          <h2>
            <img src={Logo} alt="Logo" />
          </h2>
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Token Inválido</h3>
            <p>O link de recuperação de senha é inválido ou expirou.</p>
            <button 
              onClick={() => navigate("/forgot-password")} 
              className="reset-password-btn"
            >
              Solicitar Novo Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>
          <img src={Logo} alt="Logo" />
        </h2>
        
        {!success ? (
          <>
            <h3>Redefinir Senha</h3>
            <p className="reset-password-description">
              Digite sua nova senha nos campos abaixo.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="newPassword">Nova Senha</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirme sua nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {error && <div className="error-message">{error}</div>}
              {message && <div className="success-message">{message}</div>}

              <button 
                type="submit" 
                className="reset-password-btn"
                disabled={loading}
              >
                {loading ? "Redefinindo..." : "Redefinir Senha"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h3>Senha Redefinida!</h3>
            <p className="success-message">{message}</p>
            <p className="success-description">
              Você será redirecionado para a página de login em instantes...
            </p>
          </div>
        )}

        <p className="back-to-login">
          <a href="/login" className="back-link">
            Voltar para o login
          </a>
        </p>
      </div>
    </div>
  );
}
