import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import api from "@/app/api";
import Logo from "@/assets/logo/logo.png";
import { useAlert } from "@/components/ui/customAlert"; 
import styles from "./style.module.css";


export default function Login() {
  const navigate = useNavigate();
  const { showAlert, AlertContainer } = useAlert();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Função para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar senha (mínimo 6 caracteres)
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      showAlert("Preencha todos os campos obrigatórios!", "info");
      setIsLoading(false);
      return;
    }

    // Validar email
    if (!validateEmail(emailRef.current.value)) {
      showAlert("Por favor, insira um email válido!", "warning");
      setIsLoading(false);
      return;
    }

    // Validar senha
    if (!validatePassword(passwordRef.current.value)) {
      showAlert("A senha deve ter pelo menos 6 caracteres!", "warning");
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
      } else if (error.response?.status === 400) {
        showAlert("Dados de login incorretos!", "error");
      } else if (error.request) {
        showAlert("Erro de conexão. Verifique sua internet.", "error");
      } else {
        showAlert("Erro ao fazer login. Tente novamente.", "error");
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
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  ref={passwordRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
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
            <Link to="/forgot-password" className={styles.link}>
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