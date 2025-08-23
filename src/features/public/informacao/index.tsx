import "./style.css"

import { useNavigate } from 'react-router-dom'

export default function Informacao() {
  const navigate = useNavigate()

  return (
    <section className="informacao-page">
      <div className="container">
        

        {/* Processo de Candidatura - Mantido conforme solicitado */}
        <div className="process-section">
          <h2 className="section-title">Processo de Candidatura</h2>
          <p className="section-subtitle">Siga estas etapas para candidatar-se ao seu novo lar</p>
          
          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Registro e Documentação</h3>
                <p>Complete o formulário de registro online com seus dados pessoais e documentos necessários (BI, comprovativo de residência, comprovativo de rendimentos).</p>
                <ul>
                  <li>✓ Cópia do BI ou Passaporte</li>
                  <li>✓ NIP</li>
                  <li>✓ Comprovativo de rendimentos (3 últimos meses)</li>
                  <li>✓ E outros Outros</li>
                </ul>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Análise e Validação</h3>
                <p>Nossa equipe analisará sua documentação e fará a verificação de elegibilidade dentro de 15 dias úteis.</p>
                <ul>
                  <li>✓ Verificação de documentos</li>
                  <li>✓ Análise de crédito</li>
                  <li>✓ Confirmação de elegibilidade</li>
                </ul>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Visita ao Condomínio</h3>
                <p>Agende uma visita guiada ao condomínio para conhecer as instalações.</p>
                <ul>
                  <li>✓ Tour guiado pelo condomínio</li>
                  <li>✓ Visita às unidades disponíveis</li>
                  <li>✓ Esclarecimento de dúvidas</li>
                </ul>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Entrega das Chaves</h3>
                <p>Após aprovação do financiamento e pagamento final, receba as chaves da sua nova casa!</p>
                <ul>
                  <li>✓ Vistoria final da unidade</li>
                  <li>✓ Entrega das chaves</li>
                  <li>✓ Início da mudança</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h3>Pronto para começar?</h3>
            <p>Inicie já o seu processo de candidatura e realize o sonho da casa própria.</p>
            <button 
              className="cta-button" 
              onClick={() => {
                console.log("Botão clicado!"); // Adicionando log para verificar o clique
                navigate('/militar');
              }}
            >
              Iniciar Candidatura
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
