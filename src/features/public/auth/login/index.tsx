import { Link } from "react-router-dom";
import Logo from "../../../../assets/logo/logo.png";
import "./style.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2><img src={Logo} alt="Logo" /></h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="Digite seu e-mail" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" required />
          </div>

          <button type="submit" className="login-btn">Entrar</button>
        </form>

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
