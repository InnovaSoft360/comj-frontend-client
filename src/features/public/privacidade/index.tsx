import styles from './style.module.css'

export default function PoliticaPrivacidade(){
  return (
    <section className={styles.politicaPrivacidade}>
        <div className={styles.mainPrivacidade}>
            <div className={styles.headerPrivacidade}>
                <h1>Política de Privacidade</h1>
                <p>Condomínio Osvaldo MJ - Residências para militares e suas famílias</p>
            </div>
            
            <div className={styles.contentPrivacidade}>
                <div className={styles.sectionPrivacidade}>
                    <h2>1. Seus Dados são Seguros</h2>
                    <p>No Condomínio Osvaldo MJ, cuidamos da proteção dos seus dados pessoais. Esta política explica como usamos as informações que você nos fornece durante o processo de candidatura.</p>
                </div>
                
                <div className={styles.sectionPrivacidade}>
                    <h2>2. O que Coletamos</h2>
                    <p>Para processar sua candidatura, precisamos de:</p>
                    <ul>
                        <li>Seus dados pessoais (nome, BI/Passaporte, NIP militar)</li>
                        <li>Informações de contato (telefone, e-mail)</li>
                        <li>Comprovativo de rendimentos dos últimos 3 meses</li>
                        <li>Dados profissionais (posto, unidade militar)</li>
                    </ul>
                </div>
                
                <div className={styles.sectionPrivacidade}>
                    <h2>3. Para que Usamos</h2>
                    <p>Suas informações servem para:</p>
                    <ul>
                        <li>Avaliar sua elegibilidade para residência</li>
                        <li>Verificar suas informações com as autoridades militares</li>
                        <li>Entrar em contato sobre o status da sua candidatura</li>
                        <li>Agendar visitas ao condomínio</li>
                    </ul>
                </div>
                
                <div className={styles.sectionPrivacidade}>
                    <h2>4. Com quem Compartilhamos</h2>
                    <p>Seus dados só são compartilhados quando necessário com:</p>
                    <ul>
                        <li>Autoridades militares (para confirmação de informações)</li>
                        <li>Instituições financeiras (apenas se precisar de financiamento)</li>
                    </ul>
                    <p>Não vendemos ou alugamos seus dados para terceiros.</p>
                </div>
                
                <div className={styles.sectionPrivacidade}>
                    <h2>5. Seus Direitos</h2>
                    <p>Você pode:</p>
                    <ul>
                        <li>Acessar e corrigir suas informações</li>
                        <li>Solicitar que apaguemos seus dados</li>
                        <li>Saber como usamos suas informações</li>
                    </ul>
                </div>
                
                <div className={styles.sectionPrivacidade}>
                    <h2>6. Tempo de Armazenamento</h2>
                    <p>Mantemos seus dados apenas pelo tempo necessário:</p>
                    <ul>
                        <li>2 anos para candidatos não aprovados</li>
                        <li>Durante todo o contrato para residentes</li>
                    </ul>
                </div>
                
                <div className={styles.sectionPrivacidade}>
                    <h2>7. Contato</h2>
                    <p>Dúvidas sobre privacidade?</p>
                    <div className={styles.highlight}>
                        <p><strong>Condomínio Osvaldo MJ</strong></p>
                        <p>Bairro Zango-4, Icolo e Bengo</p>
                        <p>Telefone: +244 900 000 000</p>
                        <p>E-mail: info@condominio-osvaldo.ao</p>
                    </div>
                </div>
                
                <div className={styles.footerPrivacidade}>
                    <p>© 2025 Condomínio Osvaldo MJ. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </section>
  )
}