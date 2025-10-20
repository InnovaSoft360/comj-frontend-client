// constants/whatsapp.ts
export const WHATSAPP_CONFIG = {
  // Número principal (sem código do país)
  phoneNumber: "935751955",
  
  // Número com código do país para links
  fullPhoneNumber: "244935751955",
  
  // Mensagem padrão
  defaultMessage: "Olá! Gostaria de mais informações sobre o Condomínio Osvaldo MJ.",
  
  // URLs pré-formatadas
  urls: {
    // Para uso em links simples
    simple: "https://wa.me/244935751955",
    
    // Para uso com mensagem pré-definida
    withMessage: "https://wa.me/244935751955?text=Olá! Gostaria de mais informações sobre o Condomínio Osvaldo MJ.",
    
    // Função para gerar URL com mensagem customizada
    customMessage: (message: string) => 
      `https://wa.me/244935751955?text=${encodeURIComponent(message)}`
  },
  
  // Textos para exibição
  display: {
    // Número formatado para exibição
    formattedNumber: "+244 935 751 955",
    
    // Texto do botão
    buttonText: "Fale connosco no WhatsApp",
    contactText: "Contacte-nos no WhatsApp"
  }
} as const;