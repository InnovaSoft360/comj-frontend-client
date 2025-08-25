import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFileAlt, 
  FaSearch, 
  FaBuilding, 
  FaKey,
  FaCheck,
  FaIdCard,
  FaMoneyBillWave,
  FaFileInvoiceDollar
} from 'react-icons/fa';

// Variantes de animação para o Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function Etapas() {
  const navigate = useNavigate();

  // Dados das etapas para mapeamento
  const stepsData = [
    {
      number: 1,
      icon: <FaFileAlt />,
      title: "Registro e Documentação",
      description: "Complete o formulário de registro online com seus dados pessoais e documentos necessários.",
      items: [
        { icon: <FaIdCard />, text: "Cópia do BI ou Passaporte" },
        { icon: <FaFileInvoiceDollar />, text: "NIP" },
        { icon: <FaMoneyBillWave />, text: "Comprovativo de rendimentos (3 últimos meses)" },
        { icon: <FaCheck />, text: "E outros documentos" }
      ]
    },
    {
      number: 2,
      icon: <FaSearch />,
      title: "Análise e Validação",
      description: "Nossa equipe analisará sua documentação e fará a verificação de elegibilidade dentro de 15 dias úteis.",
      items: [
        { icon: <FaCheck />, text: "Verificação de documentos" },
        { icon: <FaCheck />, text: "Análise de crédito" },
        { icon: <FaCheck />, text: "Confirmação de elegibilidade" }
      ]
    },
    {
      number: 3,
      icon: <FaBuilding />,
      title: "Visita ao Condomínio",
      description: "Agende uma visita guiada ao condomínio para conhecer as instalações.",
      items: [
        { icon: <FaCheck />, text: "Tour guiado pelo condomínio" },
        { icon: <FaCheck />, text: "Visita às unidades disponíveis" },
        { icon: <FaCheck />, text: "Esclarecimento de dúvidas" }
      ]
    },
    {
      number: 4,
      icon: <FaKey />,
      title: "Entrega das Chaves",
      description: "Após aprovação do financiamento e pagamento final, receba as chaves da sua nova casa!",
      items: [
        { icon: <FaCheck />, text: "Vistoria final da unidade" },
        { icon: <FaCheck />, text: "Entrega das chaves" },
        { icon: <FaCheck />, text: "Início da mudança" }
      ]
    }
  ];

  return (
    <section className={styles.informacaoPage}>
      <div className={styles.container}>
        {/* Processo de Candidatura */}
        <div className={styles.processSection}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Processo de Candidatura
          </motion.h2>
          <motion.p 
            className={styles.sectionSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Siga estas etapas para candidatar-se ao seu novo lar
          </motion.p>
          
          <motion.div 
            className={styles.processSteps}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stepsData.map((step, index) => (
              <motion.div 
                key={index}
                className={styles.stepCard}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                </div>
                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <ul>
                    {step.items.map((item, i) => (
                      <li key={i}>
                        <span className={styles.itemIcon}>{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className={styles.ctaSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3>Pronto para começar?</h3>
            <p>Inicie já o seu processo de candidatura e realize o sonho da casa própria.</p>
            <motion.button 
              className={styles.ctaButton}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/militar')}
            >
              Iniciar Candidatura
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}