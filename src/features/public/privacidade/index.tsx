import { useState } from 'react';
import styles from './style.module.css';

// Definir interface para as seções
interface Section {
  title: string;
  content: string;
  icon: string;
  list?: string[];
  additional?: string;
}

export default function PoliticaPrivacidade() {
  // Especificar que activeSection pode ser number ou null
  const [activeSection, setActiveSection] = useState<number | null>(null);

  // Adicionar tipo para o parâmetro index
  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  // Tipar o array de seções
  const sections: Section[] = [
    {
      title: "1. Seus Dados são Seguros",
      content: "No Condomínio Osvaldo MJ, cuidamos da proteção dos seus dados pessoais. Esta política explica como usamos as informações que você nos fornece durante o processo de candidatura.",
      icon: "🔒"
    },
    {
      title: "2. O que Coletamos",
      content: "Para processar sua candidatura, precisamos de:",
      list: [
        "Seus dados pessoais (nome, BI/Passaporte, NIP militar)",
        "Informações de contato (telefone, e-mail)",
        "Comprovativo de rendimentos dos últimos 3 meses",
        "Dados profissionais (posto, unidade militar)"
      ],
      icon: "📋"
    },
    {
      title: "3. Para que Usamos",
      content: "Suas informações servem para:",
      list: [
        "Avaliar sua elegibilidade para residência",
        "Verificar suas informações com as autoridades militares",
        "Entrar em contato sobre o status da sua candidatura",
        "Agendar visitas ao condomínio"
      ],
      icon: "🎯"
    },
    {
      title: "4. Com quem Compartilhamos",
      content: "Seus dados só são compartilhados quando necessário com:",
      list: [
        "Autoridades militares (para confirmação de informações)",
        "Instituições financeiras (apenas se precisar de financiamento)"
      ],
      additional: "Não vendemos ou alugamos seus dados para terceiros.",
      icon: "🤝"
    },
    {
      title: "5. Seus Direitos",
      content: "Você pode:",
      list: [
        "Acessar e corrigir suas informações",
        "Solicitar que apaguemos seus dados",
        "Saber como usamos suas informações"
      ],
      icon: "⚖️"
    }
  ];

  return (
    <section className={styles.politicaPrivacidade}>
      <div className={styles.mainPrivacidade}>
        <div className={styles.headerPrivacidade}>
          <div className={styles.badge}>Privacidade & Segurança</div>
          <h1>Política de Privacidade</h1>
          <p>Condomínio Osvaldo MJ - Residências para militares e suas famílias</p>
          <div className={styles.lastUpdate}>Última atualização: 26 de Agosto de 2025</div>
        </div>
        
        <div className={styles.contentPrivacidade}>
          <div className={styles.toc}>
            <h3>Sumário</h3>
            <ul>
              {sections.map((section, index) => (
                <li key={index}>
                  <a 
                    href={`#section-${index}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection(index);
                    }}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {sections.map((section, index) => (
            <div 
              key={index} 
              id={`section-${index}`}
              className={`${styles.sectionPrivacidade} ${activeSection === index ? styles.active : ''}`}
            >
              <div className={styles.sectionHeader} onClick={() => toggleSection(index)}>
                <div className={styles.sectionIcon}>{section.icon}</div>
                <h2>{section.title}</h2>
                <span className={styles.accordionToggle}>
                  {activeSection === index ? '−' : '+'}
                </span>
              </div>
              
              <div className={styles.sectionContent}>
                <p>{section.content}</p>
                
                {section.list && (
                  <ul>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                
                {section.additional && <p>{section.additional}</p>}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.contactBox}>
          <h3>Dúvidas sobre privacidade?</h3>
          <p>Entre em contato com nosso encarregado de proteção de dados</p>
          <div className={styles.contactInfo}>
            <p>📧 privacidade@condominioosvaldomj.com</p>
            <p>📞 +244 923 456 789</p>
          </div>
        </div>
        
        <div className={styles.footerPrivacidade}>
          <p>Esta política está de acordo com a Lei de Proteção de Dados Pessoais de Angola.</p>
        </div>
      </div>
    </section>
  );
}