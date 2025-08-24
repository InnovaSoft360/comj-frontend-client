import { useRef, useState, useEffect } from "react";
import api from '../../../../../core/api';
import styles from "./style.module.css";

export default function SenhaMilitar() {
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
  //#endregion

  //#region Buscar dados do usuário logado
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await api.get("/v1/Usuarios/GetCurrentUser");
        setUserId(response.data.data.id);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setError("Erro ao carregar dados do usuário");
      }
    }

    fetchCurrentUser();
  }, []);
  //#endregion

  //#region Toggle functions CORRIGIDAS - usando o novo valor
  const toggleSenhaAtual = () => {
    const novoValor = !showSenhaAtual;
    setShowSenhaAtual(novoValor);
    if (senhaAtualRef.current) {
      senhaAtualRef.current.type = novoValor ? "text" : "password";
    }
  };

  const toggleNovaSenha = () => {
    const novoValor = !showNovaSenha;
    setShowNovaSenha(novoValor);
    if (novaSenhaRef.current) {
      novaSenhaRef.current.type = novoValor ? "text" : "password";
    }
  };

  const toggleConfirmarSenha = () => {
    const novoValor = !showConfirmarSenha;
    setShowConfirmarSenha(novoValor);
    if (confirmarSenhaRef.current) {
      confirmarSenhaRef.current.type = novoValor ? "text" : "password";
    }
  };
  //#endregion

  //#region Method Post - Alterar Senha
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!senhaAtualRef.current?.value || !novaSenhaRef.current?.value || !confirmarSenhaRef.current?.value) {
      setError("Preencha todos os campos obrigatórios!");
      setIsLoading(false);
      return;
    }

    if (novaSenhaRef.current.value !== confirmarSenhaRef.current.value) {
      setError("As senhas não coincidem!");
      setIsLoading(false);
      return;
    }

    if (novaSenhaRef.current.value.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/v1/Auth/ChangePassword", {
        id: userId,
        senhaAtual: senhaAtualRef.current.value,
        novaSenha: novaSenhaRef.current.value,
        confirmarNovaSenha: confirmarSenhaRef.current.value
      });

      if (response.data.code === 200) {
        setSuccess("Senha alterada com sucesso!");
        // Limpar os campos
        if (senhaAtualRef.current) senhaAtualRef.current.value = "";
        if (novaSenhaRef.current) novaSenhaRef.current.value = "";
        if (confirmarSenhaRef.current) confirmarSenhaRef.current.value = "";
        // Resetar os checkboxes e tipos dos inputs
        setShowSenhaAtual(false);
        setShowNovaSenha(false);
        setShowConfirmarSenha(false);
        if (senhaAtualRef.current) senhaAtualRef.current.type = "password";
        if (novaSenhaRef.current) novaSenhaRef.current.type = "password";
        if (confirmarSenhaRef.current) confirmarSenhaRef.current.type = "password";
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 400) {
        setError(error.response.data.message || "Erro ao alterar senha");
      } else if (error.response?.status === 401) {
        setError("Senha atual incorreta");
      } else {
        setError("Erro ao alterar senha. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  //#endregion

  return (
    <section className={styles.perfilSection}>
      <div className={styles.main}>
        <h2 className={styles.title}>Alterar Senha</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Campo Senha Atual */}
          <div className={styles.formGroup}>
            <label htmlFor="senhaAtual" className={styles.label}>
              Senha Atual
            </label>
            <input
              type="password"
              id="senhaAtual"
              placeholder="Digite sua senha atual"
              ref={senhaAtualRef}
              className={styles.input}
              required
            />
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="showSenhaAtual"
                checked={showSenhaAtual}
                onChange={toggleSenhaAtual}
                className={styles.checkbox}
              />
              <label htmlFor="showSenhaAtual" className={styles.checkboxLabel}>
                Visualizar senha atual
              </label>
            </div>
          </div>

          {/* Campo Nova Senha */}
          <div className={styles.formGroup}>
            <label htmlFor="novaSenha" className={styles.label}>
              Nova Senha
            </label>
            <input
              type="password"
              id="novaSenha"
              placeholder="Digite a nova senha (mínimo 6 caracteres)"
              ref={novaSenhaRef}
              className={styles.input}
              required
              minLength={6}
            />
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="showNovaSenha"
                checked={showNovaSenha}
                onChange={toggleNovaSenha}
                className={styles.checkbox}
              />
              <label htmlFor="showNovaSenha" className={styles.checkboxLabel}>
                Visualizar nova senha
              </label>
            </div>
          </div>

          {/* Campo Confirmar Senha */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmarSenha" className={styles.label}>
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Confirme a nova senha"
              ref={confirmarSenhaRef}
              className={styles.input}
              required
              minLength={6}
            />
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="showConfirmarSenha"
                checked={showConfirmarSenha}
                onChange={toggleConfirmarSenha}
                className={styles.checkbox}
              />
              <label htmlFor="showConfirmarSenha" className={styles.checkboxLabel}>
                Visualizar confirmação de senha
              </label>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading || !userId}
          >
            {isLoading ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      </div>
    </section>
  );
}