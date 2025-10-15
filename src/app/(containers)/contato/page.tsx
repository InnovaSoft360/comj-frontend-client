'use client';

import { useState } from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setIsLoading(false);
      alert("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
      setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      info: "+244 935 751 955",
      link: "https://wa.me/244935751955",
      color: "text-green-500"
    },
    {
      icon: FaPhone,
      title: "Telefone",
      info: "+244 222 123 456",
      link: "tel:+244222123456",
      color: "text-blue-500"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      info: "info@condominio-osvaldomj.ao",
      link: "mailto:info@condominio-osvaldomj.ao",
      color: "text-orange-500"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Localização",
      info: "Zango-4, Benfica, Luanda",
      link: "/localizacao",
      color: "text-red-500"
    },
    {
      icon: FaClock,
      title: "Horário de Atendimento",
      info: "Seg - Sex: 8h00 - 18h00",
      link: "#",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Entre em <span className="text-orange-600">Contacto</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ajudar. Entre em contacto connosco através dos nossos canais de atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Informações de Contacto
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : '_self'}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                    >
                      <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300 ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.info}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <FaWhatsapp className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-2">Contacto de Emergência</h3>
                <p className="text-orange-100 mb-4">Disponível 24/7 para situações urgentes</p>
                <a
                  href="https://wa.me/244935751955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Falar no WhatsApp Agora</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Envie-nos uma Mensagem
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-200"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-200"
                    placeholder="+244 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-200"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assunto *
                </label>
                <select
                  required
                  value={formData.assunto}
                  onChange={(e) => handleChange('assunto', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-all duration-200"
                >
                  <option value="">Selecione o assunto</option>
                  <option value="candidatura">Candidatura a Apartamento</option>
                  <option value="informacao">Informações Gerais</option>
                  <option value="visita">Agendar Visita</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.mensagem}
                  onChange={(e) => handleChange('mensagem', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-200 resize-none"
                  placeholder="Descreva a sua mensagem..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                pergunta: "Como me candidatar a um apartamento?",
                resposta: "Pode candidatar-se através do nosso site, preenchendo o formulário de candidatura online ou contactando-nos diretamente."
              },
              {
                pergunta: "Quais os documentos necessários?",
                resposta: "BI, comprovativo de rendimentos, declaração de IRS e outros documentos que possam ser solicitados conforme o caso."
              },
              {
                pergunta: "Qual o prazo de resposta?",
                resposta: "O prazo médio de resposta é de 5 a 10 dias úteis após a submissão completa da candidatura."
              },
              {
                pergunta: "Posso agendar uma visita?",
                resposta: "Sim, pode agendar uma visita através do nosso WhatsApp ou formulário de contacto."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Q: {faq.pergunta}</h3>
                <p className="text-gray-600 dark:text-gray-300">R: {faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}