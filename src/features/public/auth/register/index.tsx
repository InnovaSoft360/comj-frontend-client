import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../../../core/api";
import Logo from "../../../../assets/logo/logo.png";
import "./style.css";

export default function RegisterMilitar() {
  
  //#region Refs
  const nomeRef = useRef<HTMLInputElement>(null);
  const sobreNomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const confirmarSenhaRef = useRef<HTMLInputElement>(null);
  const nipRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  //#endregion

  //#region Method Post
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

    try {
      await api.post("/v1/Auth/RegisterMilitar", {
        nome: nomeRef.current?.value,
        sobreNome: sobreNomeRef.current?.value,
        email: emailRef.current?.value,
        senha: senhaRef.current?.value,
        confirmarSenha: confirmarSenhaRef.current?.value,
        militarInfo: {
          nip: nipRef.current?.value,
          telefone: telefoneRef.current?.value,
        }
      });

      alert("Cadastro realizado!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar.");
    } finally {
      setIsLoading(false);
    }
  }
  //#endregion

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>
          <img src={Logo} alt="Logo" />
        </h2>
        <h3>Cadastro de Militar</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" placeholder="Digite seu nome" ref={nomeRef} />
            </div>
            <div className="form-group">
              <label htmlFor="sobrenome">Sobre-Nome</label>
              <input type="text" id="sobrenome" placeholder="Digite seu sobrenome" ref={sobreNomeRef} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite seu email" ref={emailRef} />
          </div>

          <div className="form-group">
            <label htmlFor="nip">NIP</label>
            <input type="text" id="nip" placeholder="Digite seu NIP" ref={nipRef} />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" id="telefone" ref={telefoneRef} />
          </div>

          <div className="form-group">
            <label htmlFor="foto">Foto</label>
            <div className="file-upload-container">
              <input type="file" id="foto" accept="image/*" className="file-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="Digite sua senha" ref={senhaRef} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input type="password" id="confirmarSenha" placeholder="Confirme sua senha" ref={confirmarSenhaRef} />
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Criar Conta"}
          </button>
        </form>

        <p className="login-text">
          Já tem uma conta? <Link to="/login" className="login-link">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
