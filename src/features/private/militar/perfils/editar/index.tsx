import { useRef, useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaSpinner, FaCog, FaCalendar } from 'react-icons/fa';
import api from '../../../../../core/api';
import styles from "./style.module.css";

export default function EditarMilitar() {
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
  //#endregion

  //#region Fetch User Data
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await api.get('/v1/Usuarios/GetCurrentUser');
        setUserData(response.data.data);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário');
      } finally {
        setLoadingData(false);
      }
    }

    fetchCurrentUser();
  }, []);
  //#endregion

  //#region Method Put - Update User
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!nomeRef.current?.value || !sobreNomeRef.current?.value || 
        !emailRef.current?.value || !telefoneRef.current?.value) {
      alert("Preencha todos os campos obrigatórios!");
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
          telefone: telefoneRef.current.value
        }
      };

      const response = await api.put("/v1/Usuarios/UpdateMilitar", updateData);

      if (response.data.code === 204) {
        alert("Perfil atualizado com sucesso!");
        // Recarregar os dados atualizados
        const userResponse = await api.get('/v1/Usuarios/GetCurrentUser');
        setUserData(userResponse.data.data);
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 400) {
        alert("Dados inválidos!");
      } else {
        alert("Erro ao atualizar perfil.");
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
            <input 
              type="tel" 
              id="telefone" 
              ref={telefoneRef}
              defaultValue={userData.militarInfo?.telefone || ''}
              className={styles.input}
              required 
            />
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
              defaultValue={userData.militarInfo?.nip || ''}
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
              defaultValue={userData.role === 1 ? 'Administrador' : 'Militar'}
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
              defaultValue={new Date(userData.dataRegistro).toLocaleDateString('pt-BR')}
              className={`${styles.input} ${styles.readOnly}`}
              readOnly
              disabled
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isLoading}
          >
            {isLoading ? "Atualizando..." : "Atualizar Perfil"}
          </button>
        </form>
      </div>
    </section>
  );
}