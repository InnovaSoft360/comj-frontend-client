// Seu componente GestaoUsuarios atualizado
import { useState, useEffect } from 'react';
import { FiTrash2, FiEdit, FiEye, FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';
import styles from "./style.module.css";
import api from '@/app/api';
import ModalDetalhesUsuario from './modalDetalhes'; // Importe o modal

interface Usuario {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  foto: string;
  role: number;
  dataRegistro: string;
  militarInfo: any;
  administradorInfo: any;
}

interface ApiResponse {
  code: number;
  message: string | null;
  data: Usuario[];
}

export default function GestaoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(5);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroRole, setFiltroRole] = useState<number | 'todos'>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        // Chamada real à API
        const response = await api.get<ApiResponse>('/v1/Usuarios/GetAll');
        
        if (response.data.code === 200) {
          setUsuarios(response.data.data);
          setUsuariosFiltrados(response.data.data);
        } else {
          setErro(response.data.message || 'Erro ao carregar usuários');
        }
        
        setCarregando(false);
      } catch (error: any) {
        setErro('Erro ao carregar usuários');
        setCarregando(false);
        console.error('Erro ao buscar usuários:', error);
        
        // Log mais detalhado do erro
        if (error.response) {
          console.error('Detalhes do erro:', error.response.data);
        }
      }
    };

    fetchUsuarios();
  }, []);

  // Aplicar filtro quando o filtroRole mudar
  useEffect(() => {
    if (filtroRole === 'todos') {
      setUsuariosFiltrados(usuarios);
    } else {
      const filtrados = usuarios.filter(usuario => usuario.role === filtroRole);
      setUsuariosFiltrados(filtrados);
    }
    setPaginaAtual(1); // Resetar para a primeira página ao aplicar filtro
  }, [filtroRole, usuarios]);

  // Calcular totais de páginas
  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);
  
  // Obter usuários da página atual
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const usuariosPaginaAtual = usuariosFiltrados.slice(indicePrimeiroItem, indiceUltimoItem);

  // Mudar página
  const avancarPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const voltarPagina = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Funções de ação
  const handleDeletar = async (id: number) => {
    try {
      console.log('Deletar usuário:', id);
      // Implementar lógica de deleção
      // await api.delete(`/v1/Usuarios/${id}`);
      // Atualizar a lista após deletar
      setUsuarios(usuarios.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleDetalhes = (id: number) => {
    setUsuarioSelecionado(id);
    setModalAberto(true);
  };

  const handleEditar = (id: number) => {
    console.log('Editar usuário:', id);
    // Implementar edição
  };

  const fecharModal = () => {
    setModalAberto(false);
    setUsuarioSelecionado(null);
  };

  if (carregando) {
    return <div className={styles.carregando}>Carregando usuários...</div>;
  }

  if (erro) {
    return <div className={styles.erro}>{erro}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Lista de Usuários</h1>
        
        <button 
          className={styles.btnFiltro}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          title="Filtrar por role"
        >
          <FiFilter /> Filtrar
        </button>
      </div>

      {mostrarFiltros && (
        <div className={styles.filtros}>
          <label>
            <input
              type="radio"
              name="filtroRole"
              value="todos"
              checked={filtroRole === 'todos'}
              onChange={() => setFiltroRole('todos')}
            />
            Todos
          </label>
          <label>
            <input
              type="radio"
              name="filtroRole"
              value="1"
              checked={filtroRole === 1}
              onChange={() => setFiltroRole(1)}
            />
            Administradores
          </label>
          <label>
            <input
              type="radio"
              name="filtroRole"
              value="2"
              checked={filtroRole === 2}
              onChange={() => setFiltroRole(2)}
            />
            Militares
          </label>
        </div>
      )}

      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Completo</th>
              <th>Email</th>
              <th>Role</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginaAtual.length > 0 ? (
              usuariosPaginaAtual.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{`${usuario.nome} ${usuario.sobreNome}`}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`${styles.role} ${usuario.role === 1 ? styles.admin : styles.militar}`}>
                      {usuario.role === 1 ? 'Administrador' : 'Militar'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.acoes}>
                      <button 
                        className={styles.btnDeletar}
                        onClick={() => handleDeletar(usuario.id)}
                        title="Deletar"
                      >
                        <FiTrash2 />
                      </button>
                      <button 
                        className={styles.btnDetalhes}
                        onClick={() => handleDetalhes(usuario.id)}
                        title="Detalhes"
                      >
                        <FiEye />
                      </button>
                      {usuario.role === 1 && (
                        <button 
                          className={styles.btnEditar}
                          onClick={() => handleEditar(usuario.id)}
                          title="Editar"
                        >
                          <FiEdit />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.semDados}>
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className={styles.paginacao}>
        <div className={styles.infoPaginacao}>
          Mostrando {usuariosPaginaAtual.length} de {usuariosFiltrados.length} usuários
          {filtroRole !== 'todos' && ` (filtrados)`}
        </div>
        
        <div className={styles.controlesPaginacao}>
          <button 
            onClick={voltarPagina} 
            disabled={paginaAtual === 1}
            className={styles.btnPagina}
            title="Página anterior"
          >
            <FiChevronLeft />
          </button>
          
          <span className={styles.indicePagina}>
            Página {paginaAtual} de {totalPaginas}
          </span>
          
          <button 
            onClick={avancarPagina} 
            disabled={paginaAtual === totalPaginas || totalPaginas === 0}
            className={styles.btnPagina}
            title="Próxima página"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Modal de detalhes */}
      <ModalDetalhesUsuario
        usuarioId={usuarioSelecionado}
        isOpen={modalAberto}
        onClose={fecharModal}
        onEdit={handleEditar}
        onDelete={handleDeletar}
      />
    </div>
  );
}