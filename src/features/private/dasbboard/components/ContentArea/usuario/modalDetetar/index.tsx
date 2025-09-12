import styles from "./style.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  mensagem: string;
}

export default function ModalConfirmacao({ isOpen, onClose, onConfirm, titulo, mensagem }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{titulo}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          <p>{mensagem}</p>
        </div>

        <div className={styles.modalActions}>
          <button
            onClick={onClose}
            className={styles.btnCancelar}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={styles.btnConfirmar}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}