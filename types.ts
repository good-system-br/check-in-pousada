export type ScreenName = 'WELCOME' | 'MENU' | 'RESTAURANTS' | 'DIRECTIONS' | 'WIFI' | 'CHAT' | 'BREAKFAST' | 'MENU_FOOD' | 'MINIBAR' | 'TOURS' | 'GUIDE' | 'RULES' | 'SPA' | 'TOWELS' | 'GUEST';

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
