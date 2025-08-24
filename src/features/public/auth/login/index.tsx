import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import api from "../../../../core/api";
import Logo from "../../../../assets/logo/logo.png";
import "./style.css";

export default function Login() {
  const navigate = useNavigate();
  
  //#region Refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  //#endregion

  //#region Method Post
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      alert("Preencha todos os campos obrigatórios!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/v1/Auth/Login", {
        email: emailRef.current.value,
        password: passwordRef.current.value
      });

      // O backend agora retorna as informações do usuário incluindo o role
      const userData = response.data.user;
      
      // Redirecionar baseado no role
      if (userData.role === 1) { // Administrador
        navigate("/dashboard");
      } else if (userData.role === 2) { // Militar
        navigate("/");
      } else {
        navigate("/");
      }
      
      alert("Login realizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        alert("Credenciais inválidas!");
      } else {
        alert("Erro ao fazer login.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  //#endregion

  return (
    <div className="login-container">
      <div className="login-box">
        <h2><img src={Logo} alt="Logo" /></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="Digite seu e-mail" ref={emailRef} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" ref={passwordRef} required />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logando..." : "Entrar"}
          </button>
        </form>

        <p className="forgot-password-text">
          <Link to="/forgot-password" className="forgot-password-link">
            Esqueceu sua senha?
          </Link>
        </p>

        <p className="register-text">
          Não tem uma conta?{" "}
          <Link to="/registerMilitar" className="register-link">
            Crie agora
          </Link>
        </p>
      </div>
    </div>
  );
}