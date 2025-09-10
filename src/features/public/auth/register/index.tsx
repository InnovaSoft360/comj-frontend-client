import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "@/app/api";
import Logo from "@/assets/logo/logo.png";
import { useAlert } from "@/components/ui/customAlert"; 
import styles from "./style.module.css";

export default function RegisterMilitar() {
  const { showAlert, AlertContainer } = useAlert();
  const nomeRef = useRef<HTMLInputElement>(null);
  const sobreNomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const confirmarSenhaRef = useRef<HTMLInputElement>(null);
  const nipRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Função para validar NIP (5-7 dígitos numéricos)
  const validateNIP = (nip: string): boolean => {
    const nipRegex = /^\d{5,7}$/;
    return nipRegex.test(nip);
  };

  // Função para validar telefone (9 dígitos, começando com 9)
  const validateTelefone = (telefone: string): boolean => {
    const telefoneRegex = /^9\d{8}$/;
    return telefoneRegex.test(telefone.replace(/\D/g, ''));
  };

  // Função para formatar telefone enquanto digita
  const formatTelefone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 9) {
      return numbers.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2 $3');
    }
    return numbers.slice(0, 9).replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2 $3');
  };

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
      showAlert("Preencha todos os campos obrigatórios!", "warning");
      setIsLoading(false);
      return;
    }

    // Validar NIP
    if (!validateNIP(nipRef.current.value)) {
      showAlert("NIP deve ter entre 5 e 7 dígitos numéricos!", "warning");
      setIsLoading(false);
      return;
    }

    // Validar telefone
    if (!validateTelefone(telefoneRef.current.value)) {
      showAlert("Telefone deve ter 9 dígitos e começar com 9!", "warning");
      setIsLoading(false);
      return;
    }

    if (senhaRef.current.value !== confirmarSenhaRef.current.value) {
      showAlert("As senhas não coincidem!", "warning");
      setIsLoading(false);
      return;
    }

    try {
      const data = {
        nome: nomeRef.current.value,
        sobreNome: sobreNomeRef.current.value,
        email: emailRef.current.value,
        senha: senhaRef.current.value,
        confirmarSenha: confirmarSenhaRef.current.value,
        militarInfo: {
          nip: nipRef.current.value,
          telefone: telefoneRef.current.value.replace(/\D/g, '')
        }
      };

      await api.post("/v1/Auth/RegisterMilitar", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      showAlert("Cadastro realizado com sucesso!", "success");
      
      // Limpar formulário após sucesso
      if (nomeRef.current) nomeRef.current.value = '';
      if (sobreNomeRef.current) sobreNomeRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (senhaRef.current) senhaRef.current.value = '';
      if (confirmarSenhaRef.current) confirmarSenhaRef.current.value = '';
      if (nipRef.current) nipRef.current.value = '';
      if (telefoneRef.current) telefoneRef.current.value = '';

    } catch (error: any) {
      console.error("Erro detalhado:", error);
      
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Dados:", error.response.data);
        showAlert(`Erro: ${error.response.data.message || "Tente novamente"}`, "error");
      } else if (error.request) {
        showAlert("Erro de conexão. Verifique sua internet.", "error");
      } else {
        showAlert("Erro inesperado.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Handler para input do NIP (apenas números)
  const handleNIPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7);
  };

  // Handler para input do telefone
  const handleTelefoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Garantir que começa com 9
    if (value.length > 0 && value[0] !== '9') {
      value = '9' + value;
    }
    
    // Limitar a 9 dígitos
    value = value.slice(0, 9);
    
    // Formatar visualmente
    e.target.value = formatTelefone(value);
  };

  return (
    <div className={styles.registerContainer}>
      <AlertContainer />
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
                  placeholder="NIP (5-7 dígitos)"
                  ref={nipRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                  onInput={handleNIPInput}
                  maxLength={7}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Telefone (9XXXX XXXX)"
                  ref={telefoneRef}
                  required
                  className={styles.input}
                  disabled={isLoading}
                  onInput={handleTelefoneInput}
                  maxLength={11} // 9 + 2 espaços
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <div className={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    ref={senhaRef}
                    required
                    className={styles.input}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.passwordContainer}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    ref={confirmarSenhaRef}
                    required
                    className={styles.input}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
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