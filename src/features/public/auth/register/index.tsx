import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/logo/logo.png";
import { userService } from "../../../../core/api/userService";
import { validarFormularioCadastro } from "../../../../core/utils/validation";
import type { RegisterFormData } from "../../../../core/types/user";
import "./style.css";

export default function RegisterMilitar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    foto: null,
    nip: ""
  });
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      if (name === 'senha' || name === 'nip' || name === 'confirmarSenha') {
        validateField(name, value);
      }
    }
  };

  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...fieldErrors };
    
    switch (fieldName) {
      case 'senha':
        if (value.length < 4) newErrors.senha = 'A senha deve ter no mínimo 4 caracteres';
        else delete newErrors.senha;
        break;
      case 'nip':
        const nipLimpo = value.replace(/\s/g, '');
        if (!nipLimpo) newErrors.nip = 'NIP é obrigatório';
        else if (!/^\d+$/.test(nipLimpo)) newErrors.nip = 'NIP deve conter apenas números';
        else if (nipLimpo.length > 7) newErrors.nip = 'NIP deve ter no máximo 7 dígitos';
        else delete newErrors.nip;
        break;
      case 'confirmarSenha':
        if (value !== formData.senha) newErrors.confirmarSenha = 'As senhas não coincidem';
        else delete newErrors.confirmarSenha;
        break;
    }
    
    setFieldErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validationErrors = validarFormularioCadastro({
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email: formData.email,
      telefone: formData.telefone,
      senha: formData.senha,
      confirmarSenha: formData.confirmarSenha,
      nip: formData.nip
    });

    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await userService.cadastrarUsuario({
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        email: formData.email,
        senha: formData.senha,
        nip: formData.nip,
        foto: formData.foto
      });

      if (response.success) {
        // Store user data in localStorage for profile access
        const userData = {
          id: response.user?.id || '',
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
          telefone: formData.telefone,
          nip: formData.nip,
          foto: previewFoto
        };
        
        localStorage.setItem('militaryUser', JSON.stringify(userData));
        alert(response.message || "Cadastro realizado com sucesso!");
        navigate("/militar/perfil");
      } else {
        setError(response.message || "Erro ao realizar cadastro");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>
          <img src={Logo} alt="Logo" />
        </h2>
        <h3>Cadastro de Militar</h3>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sobrenome">Sobre-Nome</label>
              <input
                type="text"
                id="sobrenome"
                name="sobrenome"
                placeholder="Digite seu sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nip">NIP</label>
            <input
              type="text"
              id="nip"
              name="nip"
              placeholder="Digite seu NIP"
              value={formData.nip}
              onChange={handleChange}
              required
              className={fieldErrors.nip ? 'error' : ''}
            />
            {fieldErrors.nip && <span className="error-message">{fieldErrors.nip}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="(XX) XXXXX-XXXX"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="foto">Foto</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                onChange={handleChange}
                className="file-input"
              />
              {previewFoto && (
                <div className="photo-preview">
                  <img src={previewFoto} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className={fieldErrors.senha ? 'error' : ''}
              />
              {fieldErrors.senha && <span className="error-message">{fieldErrors.senha}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                className={fieldErrors.confirmarSenha ? 'error' : ''}
              />
              {fieldErrors.confirmarSenha && <span className="error-message">{fieldErrors.confirmarSenha}</span>}
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Criar Conta"}
          </button>
        </form>

        <p className="login-text">
          Já tem uma conta?{" "}
          <Link to="/login" className="login-link">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
