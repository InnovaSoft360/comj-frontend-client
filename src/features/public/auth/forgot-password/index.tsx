import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/logo/logo.png";
import { validarEmail } from "../../../../core/utils/validation";
import { userService } from "../../../../core/api/userService";
import "./style.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setError("");
    setMessage("");
    
    // Validate email
    if (!email.trim()) {
      setError("Por favor, digite seu e-mail");
      return;
    }
    
    if (!validarEmail(email)) {
      setError("Por favor, digite um e-mail válido");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await userService.solicitarRecuperacaoSenha(email);
      
      if (response.success) {
        setMessage(response.message || "E-mail de recuperação enviado com sucesso!");
        setEmailSent(true);
        setEmail("");
      } else {
        setError(response.message || "Erro ao enviar e-mail de recuperação");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>
          <img src={Logo} alt="Logo" />
        </h2>
        
        {!emailSent ? (
          <>
            <h3>Recuperar Senha</h3>
            <p className="forgot-password-description">
              Digite seu e-mail cadastrado e enviaremos instruções para redefinir sua senha.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {error && <div className="error-message">{error}</div>}
              {message && <div className="success-message">{message}</div>}

              <button 
                type="submit" 
                className="forgot-password-btn"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Instruções"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h3>E-mail Enviado!</h3>
            <p className="success-message">{message}</p>
            <p className="success-description">
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
          </div>
        )}

        <p className="back-to-login">
          <Link to="/login" className="back-link">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}
