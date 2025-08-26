import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../../../app/api";
import Logo from "../../../../assets/logo/logo.png";
import styles from "./style.module.css";

export default function RegisterMilitar() {
  const nomeRef = useRef<HTMLInputElement>(null);
  const sobreNomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const confirmarSenhaRef = useRef<HTMLInputElement>(null);
  const nipRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (
      !nomeRef.current?.value ||
      !sobreNomeRef.current?.value ||
      !emailRef.current?.value ||
      !senhaRef.current?.value ||
      !confirmarSenhaRef.current?.value ||
      !nipRef.current?.value ||
      !telefoneRef.current?.value
    ) {
      alert("Preencha todos os campos obrigatórios!");
      setIsLoading(false);
      return;
    }

    if (senhaRef.current.value !== confirmarSenhaRef.current.value) {
      alert("As senhas não coincidem!");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", nomeRef.current.value);
      formData.append("sobreNome", sobreNomeRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("senha", senhaRef.current.value);
      formData.append("confirmarSenha", confirmarSenhaRef.current.value);
      formData.append("militarInfo[nip]", nipRef.current.value);
      formData.append("militarInfo[telefone]", telefoneRef.current.value);

      await api.post("/v1/Auth/RegisterMilitar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <div className={styles.logoTop}>
          <img
            src={Logo}
            alt="Logo Condomínio Osvaldo MJ"
            className={styles.logo}
          />
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.title}>Cadastro Militar</h1>
          <p className={styles.subtitle}>
            Preencha seus dados para criar sua conta
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Nome"
                  ref={nomeRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Sobrenome"
                  ref={sobreNomeRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
            </div>

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

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="NIP"
                  ref={nipRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  placeholder="Telefone"
                  ref={telefoneRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Senha"
                  ref={senhaRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  ref={confirmarSenhaRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.registerBtn} ${
                isLoading ? styles.loading : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Criar Conta"}
            </button>
          </form>

          <div className={styles.linksContainer}>
            <p className={styles.loginText}>
              Já tem uma conta?{" "}
              <Link to="/login" className={styles.loginLink}>
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
