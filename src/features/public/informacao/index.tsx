import "./style.css"
import { Building2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Informacao() {
  const navigate = useNavigate()
  const condominiumInfo = {
    name: "Condomínio Osvaldo MJ",
    address: "Província do Icolo e Bengo, Zango IV, imediações da SIAC",
    totalUnits: 288,
    constructionYear: 2020,
    security: "24 horas em um espaço fechado",
    area: "10 hectares",
    lotSize: "15.00 x 14.00 (210 m²)",
    houseSize: "98.70 m²",
    freeSpace: "111.30 m²",
    price: "Akz 25.000.000,00",
    amenities: [
      "Loja",
      "Zonas comerciais",
      "Restaurante",
      "Creche",
      "Posto Médico",
      "Áreas de lazer e desportivas (ginásio, quadras polidesportivas, parques infantis)",
      "Estacionamento para visitantes"
    ]
  }

  return (
    <section className="informacao-page">
      <div className="container">
        {/* Informações Gerais - Única seção mantida */}
        <div className="info-section">
          <div className="info-card-general">
            <div className="card-icon">
              <Building2 size={32} />
            </div>
            <h3>Informações Gerais</h3>
            <ul>
              <li><strong>Total de Unidades:</strong> {condominiumInfo.totalUnits}</li>
              <li><strong>Ano de Construção:</strong> {condominiumInfo.constructionYear}</li>
              <li><strong>Segurança:</strong> {condominiumInfo.security}</li>
              <li><strong>Área:</strong> {condominiumInfo.area}</li>
              <li><strong>Tamanho do Lote:</strong> {condominiumInfo.lotSize}</li>
              <li><strong>Tamanho da Habitação:</strong> {condominiumInfo.houseSize}</li>
              <li><strong>Espaço Livre:</strong> {condominiumInfo.freeSpace}</li>
              <li><strong>Preço:</strong> {condominiumInfo.price}</li>
            </ul>
          </div>
        </div>

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
                navigate('/registerMilitar');
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
