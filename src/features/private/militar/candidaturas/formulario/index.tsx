import React, { useState, useRef, useEffect } from "react";
import {
  FaUpload,
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaSpinner,
  FaFilePdf,
  FaFileImage,
  FaPercentage,
} from "react-icons/fa";
import api from "../../../../../app/api";
import styles from "./style.module.css";

export default function Candidaturas() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [militarId, setMilitarId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [fileNames, setFileNames] = useState({
    bi: "",
    declRemuneracao: "",
    compBancaria: "",
    ultRecibo: "",
  });

  // Refs para os arquivos - corrigido para não incluir null
  const biRef = useRef<HTMLInputElement>(null);
  const declRemuneracaoRef = useRef<HTMLInputElement>(null);
  const compBancariaRef = useRef<HTMLInputElement>(null);
  const ultReciboRef = useRef<HTMLInputElement>(null);

  // Buscar o ID do militar logado
  useEffect(() => {
    const fetchMilitarId = async () => {
      try {
        const response = await api.get("/v1/Usuarios/GetCurrentUser");
        if (response.data.code === 200 && response.data.data) {
          setMilitarId(response.data.data.id);
        }
      } catch (error) {
        console.error("Erro ao buscar ID do militar:", error);
      }
    };

    fetchMilitarId();
  }, []);

  // Atualizar progresso quando arquivos forem selecionados/removidos
  useEffect(() => {
    let filled = 0;
    if (fileNames.bi) filled++;
    if (fileNames.declRemuneracao) filled++;
    if (fileNames.compBancaria) filled++;
    if (fileNames.ultRecibo) filled++;

    setProgress((filled / 4) * 100);
  }, [fileNames]);

  const handleFileChange = (
    field: keyof typeof fileNames,
    file: File | null
  ) => {
    setFileNames((prev) => ({
      ...prev,
      [field]: file ? file.name : "",
    }));
  };

  const handleRemoveFile = (field: keyof typeof fileNames) => {
    const ref = getFileInputRef(field);
    if (ref?.current) {
      ref.current.value = "";
      setFileNames((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleViewFile = (field: keyof typeof fileNames) => {
    const ref = getFileInputRef(field);
    if (ref?.current?.files?.[0]) {
      const file = ref.current.files[0];
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  const getFileInputRef = (field: string) => {
    switch (field) {
      case "bi":
        return biRef;
      case "declRemuneracao":
        return declRemuneracaoRef;
      case "compBancaria":
        return compBancariaRef;
      case "ultRecibo":
        return ultReciboRef;
      default:
        return null;
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith(".pdf")) {
      return <FaFilePdf className={styles.fileIconPdf} />;
    }
    return <FaFileImage className={styles.fileIconImage} />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Verificar se temos o ID do militar
    if (!militarId) {
      alert(
        "Erro: Não foi possível identificar o militar. Faça login novamente."
      );
      setIsSubmitting(false);
      return;
    }

    // Verificar se todos os arquivos foram selecionados
    if (
      !biRef.current?.files?.[0] ||
      !declRemuneracaoRef.current?.files?.[0] ||
      !compBancariaRef.current?.files?.[0] ||
      !ultReciboRef.current?.files?.[0]
    ) {
      alert("Por favor, selecione todos os documentos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      // Adicionar campos obrigatórios
      formData.append("MilitarID", militarId.toString());
      formData.append("Status", "0"); // Status 0 = Pendente

      // Adicionar os arquivos
      formData.append("DocBIUrl", biRef.current.files[0]);
      formData.append(
        "DocDeclRemuneracaoUrl",
        declRemuneracaoRef.current.files[0]
      );
      formData.append(
        "DocDeclCompBancariaUrl",
        compBancariaRef.current.files[0]
      );
      formData.append("DocUltmRecBncarioUrl", ultReciboRef.current.files[0]);

      // Fazer a requisição para a API
      const response = await api.post("/v1/Candidaturas/Create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Candidatura submetida com sucesso!");

        // Limpar os arquivos
        setFileNames({
          bi: "",
          declRemuneracao: "",
          compBancaria: "",
          ultRecibo: "",
        });
        if (biRef.current) biRef.current.value = "";
        if (declRemuneracaoRef.current) declRemuneracaoRef.current.value = "";
        if (compBancariaRef.current) compBancariaRef.current.value = "";
        if (ultReciboRef.current) ultReciboRef.current.value = "";
      }
    } catch (error) {
      console.error("Erro ao enviar candidatura:", error);
      alert("Erro ao enviar candidatura. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!militarId) {
    return (
      <section className={styles.candidaturaSection}>
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>Carregando...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.candidaturaSection}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Candidatura</h1>
          <p className={styles.subtitle}>
            Faça upload dos documentos necessários
          </p>
        </div>

        {/* Barra de progresso */}
        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <FaPercentage className={styles.progressIcon} />
            <span>Progresso de preenchimento</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>{progress}% completo</div>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.successIcon} />
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Cópia do BI */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FaUpload className={styles.labelIcon} />
              Cópia do BI *
            </label>
            <div className={styles.fileInputContainer}>
              <input
                type="file"
                ref={biRef}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={(e) =>
                  handleFileChange("bi", e.target.files?.[0] || null)
                }
                className={styles.fileInput}
                id="bi"
              />
              <label htmlFor="bi" className={styles.fileInputLabel}>
                Selecionar arquivo
              </label>
            </div>
            {fileNames.bi && (
              <div className={styles.fileInfo}>
                {getFileIcon(fileNames.bi)}
                <span className={styles.fileName}>{fileNames.bi}</span>
                <div className={styles.fileActions}>
                  <button
                    type="button"
                    className={styles.viewButton}
                    onClick={() => handleViewFile("bi")}
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveFile("bi")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Declaração de Remuneração */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FaUpload className={styles.labelIcon} />
              Declaração de Remuneração *
            </label>
            <div className={styles.fileInputContainer}>
              <input
                type="file"
                ref={declRemuneracaoRef}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={(e) =>
                  handleFileChange(
                    "declRemuneracao",
                    e.target.files?.[0] || null
                  )
                }
                className={styles.fileInput}
                id="declRemuneracao"
              />
              <label
                htmlFor="declRemuneracao"
                className={styles.fileInputLabel}
              >
                Selecionar arquivo
              </label>
            </div>
            {fileNames.declRemuneracao && (
              <div className={styles.fileInfo}>
                {getFileIcon(fileNames.declRemuneracao)}
                <span className={styles.fileName}>
                  {fileNames.declRemuneracao}
                </span>
                <div className={styles.fileActions}>
                  <button
                    type="button"
                    className={styles.viewButton}
                    onClick={() => handleViewFile("declRemuneracao")}
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveFile("declRemuneracao")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Comprovativo Bancário */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FaUpload className={styles.labelIcon} />
              Comprovativo Bancário *
            </label>
            <div className={styles.fileInputContainer}>
              <input
                type="file"
                ref={compBancariaRef}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={(e) =>
                  handleFileChange("compBancaria", e.target.files?.[0] || null)
                }
                className={styles.fileInput}
                id="compBancaria"
              />
              <label htmlFor="compBancaria" className={styles.fileInputLabel}>
                Selecionar arquivo
              </label>
            </div>
            {fileNames.compBancaria && (
              <div className={styles.fileInfo}>
                {getFileIcon(fileNames.compBancaria)}
                <span className={styles.fileName}>
                  {fileNames.compBancaria}
                </span>
                <div className={styles.fileActions}>
                  <button
                    type="button"
                    className={styles.viewButton}
                    onClick={() => handleViewFile("compBancaria")}
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveFile("compBancaria")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Último Recibo Bancário */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FaUpload className={styles.labelIcon} />
              Último Recibo Bancário *
            </label>
            <div className={styles.fileInputContainer}>
              <input
                type="file"
                ref={ultReciboRef}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={(e) =>
                  handleFileChange("ultRecibo", e.target.files?.[0] || null)
                }
                className={styles.fileInput}
                id="ultRecibo"
              />
              <label htmlFor="ultRecibo" className={styles.fileInputLabel}>
                Selecionar arquivo
              </label>
            </div>
            {fileNames.ultRecibo && (
              <div className={styles.fileInfo}>
                {getFileIcon(fileNames.ultRecibo)}
                <span className={styles.fileName}>{fileNames.ultRecibo}</span>
                <div className={styles.fileActions}>
                  <button
                    type="button"
                    className={styles.viewButton}
                    onClick={() => handleViewFile("ultRecibo")}
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveFile("ultRecibo")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className={`${styles.submitButton} ${
              progress === 100 ? styles.submitButtonVisible : ""
            }`}
            type="submit"
            disabled={isSubmitting || progress !== 100}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className={styles.spinner} />
                Enviando...
              </>
            ) : (
              "Submeter Candidatura"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
