import { useRef, useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaSpinner,
  FaCog,
  FaCalendar,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import api from "../../../../../app/api";
import styles from "./style.module.css";
import { useAlert } from "../../../../../components/ui/customAlert"; 

export default function EditarMilitar() {
  const { showAlert, AlertContainer } = useAlert();
  //#region Refs
  const nomeRef = useRef<HTMLInputElement>(null);
  const sobreNomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  //#endregion

  //#region States
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [telefoneValido, setTelefoneValido] = useState(true);
  //#endregion

  //#region Fetch User Data
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await api.get("/v1/Usuarios/GetCurrentUser");
        setUserData(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        showAlert("Erro ao carregar dados do usuário", "error");
      } finally {
        setLoadingData(false);
      }
    }

    fetchCurrentUser();
  }, []);
  //#endregion

  //#region Função para validar telefone (9 dígitos, começando com 9)
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
    
    // Validar telefone
    const isValid = validateTelefone(value);
    setTelefoneValido(isValid);
  };
  //#endregion

  //#region Method Put - Update User
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (
      !nomeRef.current?.value ||
      !sobreNomeRef.current?.value ||
      !emailRef.current?.value ||
      !telefoneRef.current?.value
    ) {
      showAlert("Preencha todos os campos obrigatórios!", "info");
      setIsLoading(false);
      return;
    }

    // Validar telefone
    const telefoneNumeros = telefoneRef.current.value.replace(/\D/g, '');
    if (!validateTelefone(telefoneNumeros)) {
      showAlert("Telefone deve ter 9 dígitos e começar com 9!", "warning");
      setIsLoading(false);
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailRef.current.value)) {
      showAlert("Por favor, insira um email válido!", "warning");
      setIsLoading(false);
      return;
    }

    try {
      const updateData = {
        id: userData.id,
        nome: nomeRef.current.value,
        sobreNome: sobreNomeRef.current.value,
        email: emailRef.current.value,
        role: userData.role,
        militarInfo: {
          nip: userData.militarInfo.nip,
          telefone: telefoneNumeros,
        },
      };

      const response = await api.put("/v1/Usuarios/UpdateMilitar", updateData);

      if (response.data.code === 204) {
        showAlert("Perfil atualizado com sucesso!", "success");
        // Recarregar os dados atualizados
        const userResponse = await api.get("/v1/Usuarios/GetCurrentUser");
        setUserData(userResponse.data.data);
      } else {
        showAlert("Erro ao atualizar perfil.", "error");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 400) {
        showAlert("Dados inválidos!", "error");
      } else if (error.response?.status === 409) {
        showAlert("Email já está em uso!", "error");
      } else {
        showAlert("Erro ao atualizar perfil.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }
  //#endregion

  if (loadingData) {
    return (
      <section className={styles.perfilSection}>
        <div className={styles.main}>
          <div className={styles.loadingContainer}>
            <FaSpinner className={styles.spinner} />
            <p>Carregando dados...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section className={styles.perfilSection}>
        <div className={styles.main}>
          <div className={styles.error}>Erro ao carregar dados do usuário</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.perfilSection}>
      <AlertContainer />
      <div className={styles.main}>
        <h2 className={styles.title}>Editar Perfil</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campo Nome */}
          <div className={styles.formGroup}>
            <label htmlFor="nome" className={styles.label}>
              <FaUser className={styles.infoIcon} />
              Nome
            </label>
            <input
              type="text"
              id="nome"
              ref={nomeRef}
              defaultValue={userData.nome}
              className={styles.input}
              required
            />
          </div>

          {/* Campo Sobrenome */}
          <div className={styles.formGroup}>
            <label htmlFor="sobreNome" className={styles.label}>
              <FaUser className={styles.infoIcon} />
              Sobrenome
            </label>
            <input
              type="text"
              id="sobreNome"
              ref={sobreNomeRef}
              defaultValue={userData.sobreNome}
              className={styles.input}
              required
            />
          </div>

          {/* Campo Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              <FaEnvelope className={styles.infoIcon} />
              E-mail
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              defaultValue={userData.email}
              className={styles.input}
              required
            />
          </div>

          {/* Campo Telefone */}
          <div className={styles.formGroup}>
            <label htmlFor="telefone" className={styles.label}>
              <FaPhone className={styles.infoIcon} />
              Telefone
            </label>
            <div className={styles.inputContainer}>
              <input
                type="tel"
                id="telefone"
                ref={telefoneRef}
                defaultValue={userData.militarInfo?.telefone ? 
                  formatTelefone(userData.militarInfo.telefone) : ""}
                className={`${styles.input} ${!telefoneValido ? styles.inputError : ''}`}
                required
                onInput={handleTelefoneInput}
                maxLength={11} // 9 + 2 espaços
              />
              {telefoneRef.current?.value && (
                <span className={styles.validationIcon}>
                  {telefoneValido ? <FaCheck className={styles.valid} /> : <FaTimes className={styles.invalid} />}
                </span>
              )}
            </div>
            {telefoneRef.current?.value && !telefoneValido && (
              <div className={styles.validationMessage}>
                <FaTimes className={styles.invalid} />
                <span>Telefone deve ter 9 dígitos e começar com 9</span>
              </div>
            )}
          </div>

          {/* Campos somente leitura */}
          <div className={styles.formGroup}>
            <label htmlFor="nip" className={styles.label}>
              <FaIdCard className={styles.infoIcon} />
              NIP
            </label>
            <input
              type="text"
              id="nip"
              defaultValue={userData.militarInfo?.nip || ""}
              className={`${styles.input} ${styles.readOnly}`}
              readOnly
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>
              <FaCog className={styles.infoIcon} />
              Cargo
            </label>
            <input
              type="text"
              id="role"
              defaultValue={userData.role === 1 ? "Administrador" : "Militar"}
              className={`${styles.input} ${styles.readOnly}`}
              readOnly
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dataRegistro" className={styles.label}>
              <FaCalendar className={styles.infoIcon} />
              Data de Registro
            </label>
            <input
              type="text"
              id="dataRegistro"
              defaultValue={new Date(userData.dataRegistro).toLocaleDateString(
                "pt-BR"
              )}
              className={`${styles.input} ${styles.readOnly}`}
              readOnly
              disabled
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || !telefoneValido}
          >
            {isLoading ? (
              <>
                <FaSpinner className={styles.spinner} />
                Atualizando...
              </>
            ) : (
              "Atualizar Perfil"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}