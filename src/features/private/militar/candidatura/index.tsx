import React, { useState } from 'react';
import './style.css';
import './style-responsive.css';

export default function Candidatura() {
  const [isLoading] = useState(false); // removi setIsLoading pq não tava sendo usado

  const [documents, setDocuments] = useState<{
    bi: File | null;
    declaracaoRemuneracao: File | null;
    comprovativoBancario: File | null;
    recibosSalario: File[];
  }>({
    bi: null,
    declaracaoRemuneracao: null,
    comprovativoBancario: null,
    recibosSalario: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileUpload = (type: string, files: FileList | null) => {
    if (!files) return;

    if (type === 'recibos') {
      const newRecibos = Array.from(files).slice(0, 3 - documents.recibosSalario.length);
      setDocuments(prev => ({
        ...prev,
        recibosSalario: [...prev.recibosSalario, ...newRecibos]
      }));
    } else {
      const file = files[0];
      if (file) {
        setDocuments(prev => ({
          ...prev,
          [type]: file
        }));
      }
    }
  };

  const removeFile = (type: string, index?: number) => {
    if (type === 'recibos' && index !== undefined) {
      setDocuments(prev => ({
        ...prev,
        recibosSalario: prev.recibosSalario.filter((_, i) => i !== index)
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!documents.bi || !documents.declaracaoRemuneracao || 
        !documents.comprovativoBancario || documents.recibosSalario.length === 0) {
      alert('Por favor, faça upload de todos os documentos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setSuccessMessage('Candidatura submetida com sucesso! Aguarde a análise dos documentos.');
      setIsSubmitting(false);
      setDocuments({
        bi: null,
        declaracaoRemuneracao: null,
        comprovativoBancario: null,
        recibosSalario: []
      });
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="candidatura-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="candidatura-container">
      <div className="candidatura-header">
        <h1>Candidatura para Militares</h1>
        <p>Faça upload dos documentos necessários para análise da sua candidatura</p>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Informações Importantes</h2>
          <div className="info-note">
            <p>
              <strong>Atenção:</strong> Os seus dados militares já estão registados no sistema e serão 
              automaticamente associados à sua candidatura. Para visualizar ou atualizar seus dados pessoais, 
              acesse a página de <strong>Perfil</strong> após o login.
            </p>
          </div>
        </div>

        <div className="form-section">
          <h2>Documentos Necessários</h2>
          
          {/* BI */}
          <div className="form-group">
            <label>Cópia do BI <span className="required">*</span></label>
            <div className="document-upload">
              <div className="upload-icon">📄</div>
              <p className="upload-text">
                {documents.bi ? documents.bi.name : 'Arraste o arquivo ou clique para selecionar'}
              </p>
              <input
                type="file"
                className="file-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('bi', e.target.files)}
              />
            </div>
            {documents.bi && (
              <div className="file-list">
                <div className="file-item">
                  <span className="file-name">{documents.bi.name}</span>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => removeFile('bi')}
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Declaração de Remuneração */}
          <div className="form-group">
            <label>Declaração de Remuneração <span className="required">*</span></label>
            <div className="document-upload">
              <div className="upload-icon">💰</div>
              <p className="upload-text">
                {documents.declaracaoRemuneracao ? documents.declaracaoRemuneracao.name : 'Selecione um arquivo'}
              </p>
              <input
                type="file"
                className="file-input"
                accept=".pdf"
                onChange={(e) => handleFileUpload('declaracaoRemuneracao', e.target.files)}
              />
            </div>
            {documents.declaracaoRemuneracao && (
              <div className="file-list">
                <div className="file-item">
                  <span className="file-name">{documents.declaracaoRemuneracao.name}</span>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => removeFile('declaracaoRemuneracao')}
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Comprovativo Bancário */}
          <div className="form-group">
            <label>Comprovativo Bancário <span className="required">*</span></label>
            <div className="document-upload">
              <div className="upload-icon">🏦</div>
              <p className="upload-text">
                {documents.comprovativoBancario ? documents.comprovativoBancario.name : 'Selecione um arquivo'}
              </p>
              <input
                type="file"
                className="file-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('comprovativoBancario', e.target.files)}
              />
            </div>
            {documents.comprovativoBancario && (
              <div className="file-list">
                <div className="file-item">
                  <span className="file-name">{documents.comprovativoBancario.name}</span>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => removeFile('comprovativoBancario')}
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recibos */}
          <div className="form-group">
            <label>Últimos 3 Recibos de Salário <span className="required">*</span></label>
            <div className="document-upload">
              <div className="upload-icon">📋</div>
              <p className="upload-text">
                {documents.recibosSalario.length > 0 
                  ? `${documents.recibosSalario.length} arquivo(s) selecionado(s)` 
                  : 'Selecione até 3 arquivos'}
              </p>
              <input
                type="file"
                className="file-input"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => handleFileUpload('recibos', e.target.files)}
                disabled={documents.recibosSalario.length >= 3}
              />
            </div>
            {documents.recibosSalario.length > 0 && (
              <div className="file-list">
                {documents.recibosSalario.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      className="remove-file"
                      onClick={() => removeFile('recibos', index)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="submit-section">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Submeter Candidatura'}
          </button>
        </div>
      </form>
    </div>
  );
}
