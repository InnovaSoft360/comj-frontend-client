import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import api from "../../../../app/api";
import Logo from "../../../../assets/logo/logo.png";
import styles from "./style.module.css";
import { useAlert } from "../../../../components/ui/customAlert"; 

export default function Login() {
  const navigate = useNavigate();
  const { showAlert, AlertContainer } = useAlert();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
        password: passwordRef.current.value,
      });

      const userData = response.data.user;

      if (userData.role === 1) {
        navigate("/dashboard");
      } else if (userData.role === 2) {
        navigate("/");
      } else {
        navigate("/");
      }

      showAlert("Login realizado com sucesso!", "success");
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        showAlert("Credenciais inválidas!", "warning");
      } else {
      showAlert("Erro ao fazer login.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <AlertContainer />
      <div className={styles.loginBox}>
        <div className={styles.logoTop}>
          <img
            src={Logo}
            alt="Logo Condomínio Osvaldo MJ"
            className={styles.logo}
          />
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.title}>Acessar Conta</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="E-mail"
                ref={emailRef}
                required
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="password"
                placeholder="Senha"
                ref={passwordRef}
                required
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={`${styles.loginBtn} ${
                isLoading ? styles.loading : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className={styles.linksContainer}>
            <Link to="/" className={styles.link}>
              Esqueceu a senha?
            </Link>
            <span className={styles.separator}>•</span>
            <Link to="/registerMilitar" className={styles.link}>
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
