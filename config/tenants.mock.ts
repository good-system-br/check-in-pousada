/**
 * Mock de configurações de múltiplos tenants para testes
 * Em produção, esses dados viriam de uma API/Database
 */

import { TenantConfig } from '../types';

export const MOCK_TENANTS: TenantConfig[] = [
  {
    id: '1',
    slug: 'villa-monte-verde',
    active: true,
    plan: 'premium',
    name: 'Villa Monte Verde',
    location: 'Monte Verde, MG',
    region: 'Camanducaia, Minas Gerais',
    address: 'Av. Monte Verde, 1200',
    latitude: -22.9876,
    longitude: -43.1952,
    phone: '+55 (48) 99999-9999',
    email: 'contato@villaverde.com.br',
    whatsapp: '5548999999999',
    exampleGuest: null,
    wifi: {
      networkName: 'VillaVerde_Guest',
      password: 'monteverde2024',
    },
    rating: 4.9,
    reviews: 342,
    testimonial: 'A Suíça Mineira em sua essência. Experiência inesquecível.',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9522488624147!2d-43.19521!3d-22.98765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd9b5c3b5b5b5b5%3A0x0!2sPousada!5e0!3m2!1spt-BR!2sbr!4v1234567890',
    images: {
      welcome: [
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=1000&auto=format&fit=crop',
      ],
    },
    messages: {
      welcome: 'O charme dos Alpes com a hospitalidade de Minas Gerais',
      concierge: 'Olá! Sou seu Concierge Virtual. Posso ajudar com a senha do Wi-Fi, horários ou dicas locais. Como posso ajudar você hoje?',
    },
    theme: {
      primaryColor: '#8B7355',
      secondaryColor: '#A0826D',
      accentColor: '#C19A6B',
      backgroundGradient: 'from-sand-900 to-sand-800',
    },
  },
  {
    id: '2',
    slug: 'pousada-jardim-secreto',
    active: true,
    plan: 'basic',
    name: 'Pousada Jardim Secreto',
    location: 'Campos do Jordão, SP',
    region: 'Campos do Jordão, São Paulo',
    address: 'Rua das Flores, 456',
    latitude: -22.7390,
    longitude: -45.5916,
    phone: '+55 (12) 98888-8888',
    email: 'contato@jardimsecreto.com.br',
    whatsapp: '5512988888888',
    exampleGuest: null,
    wifi: {
      networkName: 'JardimSecreto_WiFi',
      password: 'flores2024',
    },
    rating: 4.7,
    reviews: 156,
    testimonial: 'Um refúgio de paz e natureza em Campos do Jordão.',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9522488624147!2d-45.5916!3d-22.7390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    images: {
      welcome: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format&fit=crop',
      ],
    },
    messages: {
      welcome: 'Bem-vindo ao seu jardim particular na montanha',
      concierge: 'Olá! Estou aqui para tornar sua estadia especial. Como posso ajudar?',
    },
    theme: {
      primaryColor: '#2C5F2D',
      secondaryColor: '#97BC62',
      accentColor: '#8FBC8F',
      backgroundGradient: 'from-emerald-900 to-emerald-800',
    },
  },
  {
    id: '3',
    slug: 'refugio-da-serra',
    active: true,
    plan: 'enterprise',
    name: 'Refúgio da Serra',
    location: 'Gramado, RS',
    region: 'Gramado, Rio Grande do Sul',
    address: 'Av. Borges de Medeiros, 789',
    latitude: -29.3750,
    longitude: -50.8761,
    phone: '+55 (54) 97777-7777',
    email: 'reservas@refugiodaserra.com.br',
    whatsapp: '5554977777777',
    exampleGuest: null,
    wifi: {
      networkName: 'Refugio_Premium',
      password: 'serra@2024',
    },
    rating: 4.95,
    reviews: 512,
    testimonial: 'Excelência em hospitalidade com charme europeu autêntico.',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9522488624147!2d-50.8761!3d-29.3750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    images: {
      welcome: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=1000&auto=format&fit=crop',
      ],
      logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200&auto=format&fit=crop',
    },
    messages: {
      welcome: 'O luxo encontra a natureza. Bem-vindo ao Refúgio da Serra.',
      concierge: 'Bem-vindo! Sou seu assistente pessoal. Estou aqui 24/7 para garantir uma experiência excepcional. O que posso fazer por você?',
    },
    theme: {
      primaryColor: '#1E3A5F',
      secondaryColor: '#4A6FA5',
      accentColor: '#7B9EC6',
      backgroundGradient: 'from-blue-900 to-blue-800',
    },
  },
];
