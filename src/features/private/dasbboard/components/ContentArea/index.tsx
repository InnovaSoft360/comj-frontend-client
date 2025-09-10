import VisaoGeral from './visaogeral';
import GestaoUsuarios from './usuario';
import GestaoCandidatura from './candidatura/table';
import VisaoGealCandidatura from './candidatura/overview'
import styles from "./style.module.css"


interface ContentAreaProps {
  activeContent: string;
}

// Tipo para os componentes de conteúdo
type ContentComponent = React.ComponentType;

export default function ContentArea({ activeContent }: ContentAreaProps) {
  // Mapeamento de componentes de conteúdo
  const contentComponents: Record<string, ContentComponent> = {
    'visao-geral': VisaoGeral,
    'gestao-usuario': GestaoUsuarios,
    'visao-geral-candidaturas': VisaoGealCandidatura,
    'gestao-candidatura': GestaoCandidatura
  };

  // Componente de conteúdo atual
  const CurrentContentComponent = contentComponents[activeContent] || VisaoGeral;

  return (
    <div className={styles.contentArea}>
      <CurrentContentComponent />
    </div>
  );
}