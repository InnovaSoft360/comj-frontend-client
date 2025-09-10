import { useRef, useState, useEffect } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaKey,
  FaLock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import api from "../../../../../app/api";
import styles from "./style.module.css";
import { useAlert } from "../../../../../components/ui/customAlert"; 

export default function SenhaMilitar() {
  const { showAlert, AlertContainer } = useAlert();
  //#region Refs
  const senhaAtualRef = useRef<HTMLInputElement>(null);
  const novaSenhaRef = useRef<HTMLInputElement>(null);
  const confirmarSenhaRef = useRef<HTMLInputElement>(null);
  //#endregion

  //#region States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  //#endregion

  //#region Buscar dados do usuário logado
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await api.get("/v1/Usuarios/GetCurrentUser");
        setUserId(response.data.data.id);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        showAlert("Erro ao carregar dados do usuário", "error");
      }
    }

    fetchCurrentUser();
  }, []);
  //#endregion

  //#region Validar força da senha
  const validatePasswordStrength = (password: string) => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const isPasswordStrong = () => {
    return Object.values(passwordStrength).every(condition => condition);
  };
  //#endregion

  //#region Toggle functions
  const toggleSenhaAtual = () => {
    setShowSenhaAtual(!showSenhaAtual);
  };

  const toggleNovaSenha = () => {
    setShowNovaSenha(!showNovaSenha);
  };

  const toggleConfirmarSenha = () => {
    setShowConfirmarSenha(!showConfirmarSenha);
  };
  //#endregion

  //#region Method Post - Alterar Senha
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (
      !senhaAtualRef.current?.value ||
      !novaSenhaRef.current?.value ||
      !confirmarSenhaRef.current?.value
    ) {
      showAlert("Preencha todos os campos obrigatórios!", "info");
      setIsLoading(false);
      return;
    }

    // Validar se a nova senha é igual à atual
    if (senhaAtualRef.current.value === novaSenhaRef.current.value) {
      showAlert("A nova senha não pode ser igual à senha atual!", "warning");
      setIsLoading(false);
      return;
    }

    // Validar força da senha
    if (!isPasswordStrong()) {
      showAlert("A senha não atende aos requisitos de segurança!", "warning");
      setIsLoading(false);
      return;
    }

    if (novaSenhaRef.current.value !== confirmarSenhaRef.current.value) {
      showAlert("As senhas não coincidem!", "warning");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/v1/Auth/ChangePassword", {
        id: userId,
        senhaAtual: senhaAtualRef.current.value,
        novaSenha: novaSenhaRef.current.value,
        confirmarNovaSenha: confirmarSenhaRef.current.value,
      });

      if (response.data.code === 200) {
        showAlert("Senha alterada com sucesso!", "success");
        // Limpar os campos
        if (senhaAtualRef.current) senhaAtualRef.current.value = "";
        if (novaSenhaRef.current) novaSenhaRef.current.value = "";
        if (confirmarSenhaRef.current) confirmarSenhaRef.current.value = "";
        // Resetar estados
        setShowSenhaAtual(false);
        setShowNovaSenha(false);
        setShowConfirmarSenha(false);
        setPasswordStrength({
          hasMinLength: false,
          hasUpperCase: false,
          hasLowerCase: false,
          hasNumber: false,
          hasSpecialChar: false
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 400) {
        setError(error.response.data.message || "Erro ao alterar senha");
      } else if (error.response?.status === 401) {
        showAlert("Senha atual incorreta", "error");
      } else {
        showAlert("Erro ao alterar senha. Tente novamente.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }
  //#endregion

  return (
    <section className={styles.perfilSection}>
      <AlertContainer />
      <div className={styles.main}>
        <h2 className={styles.title}>Alterar Senha</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campo Senha Atual */}
          <div className={styles.formGroup}>
            <label htmlFor="senhaAtual" className={styles.label}>
              <FaKey className={styles.infoIcon} />
              Senha Atual
            </label>
            <div className={styles.inputContainer}>
              <input
                type={showSenhaAtual ? "text" : "password"}
                id="senhaAtual"
                placeholder="Digite sua senha atual"
                ref={senhaAtualRef}
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleSenhaAtual}
              >
                {showSenhaAtual ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Campo Nova Senha */}
          <div className={styles.formGroup}>
            <label htmlFor="novaSenha" className={styles.label}>
              <FaLock className={styles.infoIcon} />
              Nova Senha
            </label>
            <div className={styles.inputContainer}>
              <input
                type={showNovaSenha ? "text" : "password"}
                id="novaSenha"
                placeholder="Digite a nova senha"
                ref={novaSenhaRef}
                className={styles.input}
                required
                minLength={8}
                onChange={(e) => validatePasswordStrength(e.target.value)}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleNovaSenha}
              >
                {showNovaSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Indicador de força da senha */}
            {novaSenhaRef.current?.value && (
              <div className={styles.passwordStrength}>
                <h4>Requisitos da senha:</h4>
                <div className={styles.requirement}>
                  {passwordStrength.hasMinLength ? <FaCheck className={styles.valid} /> : <FaTimes className={styles.invalid} />}
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className={styles.requirement}>
                  {passwordStrength.hasUpperCase ? <FaCheck className={styles.valid} /> : <FaTimes className={styles.invalid} />}
                  <span>Letra maiúscula (A-Z)</span>
                </div>
                <div className={styles.requirement}>
                  {passwordStrength.hasLowerCase ? <FaCheck className={styles.valid} /> : <FaTimes className={styles.invalid} />}
                  <span>Letra minúscula (a-z)</span>
                </div>
                <div className={styles.requirement}>
                  {passwordStrength.hasNumber ? <FaCheck className={styles.valid} /> : <FaTimes className={styles.invalid} />}
                  <span>Número (0-9)</span>
                </div>
                <div className={styles.requirement}>
                  {passwordStrength.hasSpecialChar ? <FaCheck className={styles.valid} /> : <FaTimes className={styles.invalid} />}
                  <span>Caractere especial (!@#$%^&*)</span>
                </div>
              </div>
            )}
          </div>

          {/* Campo Confirmar Senha */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmarSenha" className={styles.label}>
              <FaLock className={styles.infoIcon} />
              Confirmar Nova Senha
            </label>
            <div className={styles.inputContainer}>
              <input
                type={showConfirmarSenha ? "text" : "password"}
                id="confirmarSenha"
                placeholder="Confirme a nova senha"
                ref={confirmarSenhaRef}
                className={styles.input}
                required
                minLength={8}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleConfirmarSenha}
              >
                {showConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Verificação de correspondência de senhas */}
            {novaSenhaRef.current?.value && confirmarSenhaRef.current?.value && (
              <div className={styles.passwordMatch}>
                {novaSenhaRef.current.value === confirmarSenhaRef.current.value ? (
                  <div className={styles.matchValid}>
                    <FaCheck /> As senhas coincidem
                  </div>
                ) : (
                  <div className={styles.matchInvalid}>
                    <FaTimes /> As senhas não coincidem
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className={styles.error}>
              <FaExclamationTriangle className={styles.errorIcon} />
              {error}
            </div>
          )}
          {success && (
            <div className={styles.success}>
              <FaCheckCircle className={styles.successIcon} />
              {success}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || !userId || !isPasswordStrong()}
          >
            {isLoading ? (
              <>
                <FaSpinner className={styles.spinner} />
                Alterando...
              </>
            ) : (
              "Alterar Senha"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}