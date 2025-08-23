import React, { useState, useRef, useEffect } from 'react';
import api from '../../../../core/api';
import './style.css';

export default function Candidatura() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [militarId, setMilitarId] = useState<number | null>(null);

  // Refs para os arquivos
  const biRef = useRef<HTMLInputElement>(null);
  const declRemuneracaoRef = useRef<HTMLInputElement>(null);
  const compBancariaRef = useRef<HTMLInputElement>(null);
  const ultReciboRef = useRef<HTMLInputElement>(null);

  // Buscar o ID do militar logado
  useEffect(() => {
    const fetchMilitarId = async () => {
      try {
        const response = await api.get('/v1/Usuarios/GetCurrentUser');
        if (response.data.code === 200 && response.data.data) {
          setMilitarId(response.data.data.id);
        }
      } catch (error) {
        console.error('Erro ao buscar ID do militar:', error);
      }
    };

    fetchMilitarId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Verificar se temos o ID do militar
    if (!militarId) {
      alert('Erro: Não foi possível identificar o militar. Faça login novamente.');
      setIsSubmitting(false);
      return;
    }

    // Verificar se todos os arquivos foram selecionados
    if (!biRef.current?.files?.[0] || 
        !declRemuneracaoRef.current?.files?.[0] || 
        !compBancariaRef.current?.files?.[0] || 
        !ultReciboRef.current?.files?.[0]) {
      alert('Por favor, selecione todos os documentos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      
      // Adicionar campos obrigatórios
      formData.append('MilitarID', militarId.toString());
      formData.append('Status', '0'); // Status 0 = Pendente
      
      // Adicionar os arquivos
      formData.append('DocBIUrl', biRef.current.files[0]);
      formData.append('DocDeclRemuneracaoUrl', declRemuneracaoRef.current.files[0]);
      formData.append('DocDeclCompBancariaUrl', compBancariaRef.current.files[0]);
      formData.append('DocUltmRecBncarioUrl', ultReciboRef.current.files[0]);

      // Fazer a requisição para a API
      const response = await api.post('/v1/Candidaturas/Create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setSuccessMessage('Candidatura submetida com sucesso!');
        
        // Limpar os arquivos
        if (biRef.current) biRef.current.value = '';
        if (declRemuneracaoRef.current) declRemuneracaoRef.current.value = '';
        if (compBancariaRef.current) compBancariaRef.current.value = '';
        if (ultReciboRef.current) ultReciboRef.current.value = '';
      }
    } catch (error) {
      console.error('Erro ao enviar candidatura:', error);
      alert('Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!militarId) {
    return (
      <div className="candidatura-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="candidatura-container">
      <div className="candidatura-header">
        <h1>Candidatura</h1>
        <p>Faça upload dos documentos necessários</p>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cópia do BI *</label>
          <input
            type="file"
            ref={biRef}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <div className="form-group">
          <label>Declaração de Remuneração *</label>
          <input
            type="file"
            ref={declRemuneracaoRef}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <div className="form-group">
          <label>Comprovativo Bancário *</label>
          <input
            type="file"
            ref={compBancariaRef}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <div className="form-group">
          <label>Último Recibo Bancário *</label>
          <input
            type="file"
            ref={ultReciboRef}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Submeter Candidatura'}
        </button>
      </form>
    </div>
  );
}