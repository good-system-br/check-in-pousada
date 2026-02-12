export type ScreenName = 'WELCOME' | 'MENU' | 'RESTAURANTS' | 'DIRECTIONS' | 'WIFI' | 'CHAT' | 'BREAKFAST' | 'MENU_FOOD' | 'MINIBAR' | 'GUIDE' | 'SPA' | 'GUEST' | 'LOCATION' | 'ADMIN';

export interface Restaurant {
  name: string;
  description: string;
  cuisine: string;
  priceRange: string;
}

export interface MenuItem {
  id: string;
  label: string;
  iconName: string; // We will map string to Lucide icon component
  targetScreen: ScreenName;
}

// Multi-tenant types
export type PlanType = 'basic' | 'premium' | 'enterprise';

export interface GuestProfile {
  name: string;
  room: string;
  roomType: string;
  floor: string;
  checkIn: string;
  checkOut: string;
  nights: string;
  phone: string;
  email: string;
  reviews: number;
}

export interface TenantTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundGradient: string;
}

export interface TenantConfig {
  // Identificação do tenant
  id: string;
  slug: string; // villa-monte-verde, pousada-jardim, etc
  active: boolean;
  plan: PlanType;
  
  // Informações básicas
  name: string;
  location: string;
  region: string;
  
  // Coordenadas e endereço
  address: string;
  latitude: number;
  longitude: number;
  
  // Contato
  phone: string;
  email: string;
  whatsapp: string;
  
  // Dados do hóspede de exemplo
  exampleGuest: GuestProfile | null;
  
  // Wi-Fi
  wifi: {
    networkName: string;
    password: string;
  };
  
  // Classificação
  rating: number;
  reviews: number;
  
  // Avaliação/Descrição
  testimonial: string;
  
  // Google Maps
  googleMapsEmbedUrl: string;
  
  // Imagens
  images: {
    welcome: string[];
    logo?: string;
  };
  
  // Mensagens customizadas
  messages: {
    welcome: string;
    concierge: string;
  };
  
  // Tema (cores personalizadas)
  theme?: TenantTheme;
  
  // Menu items (pode ser customizado por tenant)
  menuItems?: MenuItem[];
}

// Admin types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  role: 'owner' | 'admin' | 'staff';
  createdAt: Date;
}

export interface AdminStats {
  totalGuests: number;
  activeGuests: number;
  totalViews: number;
  popularFeatures: { name: string; count: number }[];
  revenueThisMonth?: number;
}
