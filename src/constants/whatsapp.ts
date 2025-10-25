// constants/whatsapp.ts
export const WHATSAPP_CONFIG = {
  // Número principal (sem código do país)
  phoneNumber: "948398687",
  
  // Número com código do país para links
  fullPhoneNumber: "244948398687",
  
  // Mensagem padrão
  defaultMessage: "Olá! Gostaria de mais informações sobre o Condomínio Osvaldo MJ.",
  
  // URLs pré-formatadas
  urls: {
    // Para uso em links simples
    simple: "https://wa.me/244948398687",
    
    // Para uso com mensagem pré-definida
    withMessage: "https://wa.me/244948398687?text=Olá! Gostaria de mais informações sobre os apartamentos do Condomínio Osvaldo MJ.",

    // Para uso com mensagem pré-definida
    withMessageEmargencia: "https://wa.me/244948398687?text=🚨 URGENTE - Condomínio Osvaldo MJ%0A%0APreciso de assistência imediata com uma situação de emergência.",
    
    // Função para gerar URL com mensagem customizada
    customMessage: (message: string) => 
      `https://wa.me/244948398687?text=${encodeURIComponent(message)}`
  },
  
  // Textos para exibição
  display: {
    // Número formatado para exibição
    formattedNumber: "+244 948 398 687",
    
    // Texto do botão
    buttonText: "Fale connosco no WhatsApp",
    contactText: "Contacte-nos no WhatsApp"
  }
} as const;