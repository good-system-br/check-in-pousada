/**
 * Configuração centralizada da aplicação
 * Altere os valores aqui para personalizar a experiência
 */

export const POUSADA_CONFIG = {
  // Informações básicas
  name: 'Villa Verde',
  location: 'Monte Verde, MG',
  region: 'Camanducaia, Minas Gerais',
  
  // Coordenadas e endereço
  address: 'Av. Monte Verde, 1200',
  latitude: -22.9876,
  longitude: -43.1952,
  
  // Contato
  phone: '+55 (48) 99999-9999',
  email: 'contato@villaverde.com.br',
  whatsapp: '5548999999999',
  
  // Dados do hóspede de exemplo
  exampleGuest: {
    name: 'Vitor Silva',
    room: '107',
    roomType: 'Suíte Premium',
    floor: 'Andar 1',
    checkIn: '08 Dez 2024',
    checkOut: '10 Dez 2024',
    nights: '2 noites',
    email: 'vitor@email.com',
  },
  
  // Wi-Fi
  wifi: {
    networkName: 'VillaVerde_Guest',
    password: 'monteverde2024',
  },
  
  // Classificação
  rating: 4.9,
  reviews: 342,
  
  // Avaliação/Descrição
  testimonial: 'A Suíça Mineira em sua essência. Experiência inesquecível.',
  
  // Google Maps embed
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9522488624147!2d-43.19521!3d-22.98765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd9b5c3b5b5b5b5%3A0x0!2sPousada!5e0!3m2!1spt-BR!2sbr!4v1234567890',
  
  // URLs de imagens
  images: {
    welcome: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=1000&auto=format&fit=crop',
    ],
  },
  
  // Mensagens
  messages: {
    welcome: 'O charme dos Alpes com a hospitalidade de Minas Gerais',
    concierge: 'Olá! Sou seu Concierge Virtual. Posso ajudar com a senha do Wi-Fi, horários ou dicas locais. Como posso ajudar você hoje?',
  },
};

export const MENU_ITEMS = [
  { id: '0', label: 'Perfil', iconName: 'User', targetScreen: 'GUEST' as const },
  { id: '1', label: 'Wi-Fi', iconName: 'Wifi', targetScreen: 'WIFI' as const },
  { id: '2', label: 'Como Chegar', iconName: 'MapPin', targetScreen: 'DIRECTIONS' as const },
  { id: '3', label: 'Café da Manhã', iconName: 'Coffee', targetScreen: 'BREAKFAST' as const },
  { id: '4', label: 'Cardápio', iconName: 'Utensils', targetScreen: 'MENU_FOOD' as const },
  { id: '5', label: 'Minibar', iconName: 'ShoppingBag', targetScreen: 'MINIBAR' as const },
  { id: '6', label: 'Passeios', iconName: 'Compass', targetScreen: 'TOURS' as const },
  { id: '7', label: 'Guia da Pousada', iconName: 'Info', targetScreen: 'GUIDE' as const },
  { id: '8', label: 'Gastronomia', iconName: 'Utensils', targetScreen: 'RESTAURANTS' as const },
  { id: '9', label: 'Spa & Lazer', iconName: 'Trees', targetScreen: 'SPA' as const },
  { id: '10', label: 'Toalhas & Lareira', iconName: 'LifeBuoy', targetScreen: 'TOWELS' as const },
  { id: '11', label: 'Nossas Regras', iconName: 'BookOpen', targetScreen: 'RULES' as const },
];
