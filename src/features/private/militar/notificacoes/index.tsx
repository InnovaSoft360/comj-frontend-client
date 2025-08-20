import { Bell, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import "./style.css";

// Tipos permitidos de notificação
type TipoNotificacao = "sucesso" | "erro" | "aviso";

// Interface para cada notificação
interface Notificacao {
  id: number;
  tipo: TipoNotificacao;
  mensagem: string;
}

export default function Notificacoes() {
  const notificacoes: Notificacao[] = [
    { id: 1, tipo: "sucesso", mensagem: "Operação realizada com sucesso!" },
    { id: 2, tipo: "erro", mensagem: "Falha ao salvar os dados." },
    { id: 3, tipo: "aviso", mensagem: "Sua sessão irá expirar em breve." },
  ];

  // Retorna ícone baseado no tipo
  const getIcon = (tipo: TipoNotificacao) => {
    switch (tipo) {
      case "sucesso":
        return <CheckCircle className="icon sucesso" />;
      case "erro":
        return <XCircle className="icon erro" />;
      case "aviso":
        return <AlertTriangle className="icon aviso" />;
      default:
        return <Bell className="icon padrao" />;
    }
  };

  return (
    <div className="notificacoes-container">
      {/* Cabeçalho */}
      <div className="notificacoes-header">
        <h2>
          <Bell className="icon titulo" /> Centro de Notificações
        </h2>
        <p>Aqui estão suas notificações recentes. Fique atento às atualizações!</p>
      </div>

      {/* Lista de notificações */}
      <div className="notificacoes-lista">
        {notificacoes.map((n) => (
          <div key={n.id} className={`notificacao-card ${n.tipo}`}>
            {getIcon(n.tipo)}

            <div className="notificacao-conteudo">
              <span className="notificacao-tipo">{n.tipo}</span>
              <p>{n.mensagem}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
