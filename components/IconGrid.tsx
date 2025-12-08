import React from 'react';
import { 
  Wifi, MapPin, Coffee, Key, BookOpen, 
  ShoppingBag, Compass, Info, Utensils, 
  Trees, MessageSquareText, LifeBuoy, User
} from 'lucide-react';
import { MenuItem, ScreenName } from '../types';

interface IconGridProps {
  onNavigate: (screen: ScreenName) => void;
}

const menuItems: MenuItem[] = [
  { id: '0', label: 'Perfil', iconName: 'User', targetScreen: 'GUEST' },
  { id: '1', label: 'Wi-Fi', iconName: 'Wifi', targetScreen: 'WIFI' },
  { id: '2', label: 'Como Chegar', iconName: 'MapPin', targetScreen: 'DIRECTIONS' },
  { id: '3', label: 'Café da Manhã', iconName: 'Coffee', targetScreen: 'BREAKFAST' }, 
  { id: '4', label: 'Cardápio', iconName: 'Utensils', targetScreen: 'MENU_FOOD' }, 
  { id: '5', label: 'Minibar', iconName: 'ShoppingBag', targetScreen: 'MINIBAR' }, 
  { id: '6', label: 'Passeios', iconName: 'Compass', targetScreen: 'TOURS' }, 
  { id: '7', label: 'Guia da Pousada', iconName: 'Info', targetScreen: 'GUIDE' }, 
  { id: '8', label: 'Gastronomia', iconName: 'Utensils', targetScreen: 'RESTAURANTS' },
  { id: '9', label: 'Spa & Lazer', iconName: 'Trees', targetScreen: 'SPA' }, 
  { id: '10', label: 'Toalhas & Lareira', iconName: 'LifeBuoy', targetScreen: 'TOWELS' }, 
  { id: '11', label: 'Recepção', iconName: 'MessageSquareText', targetScreen: 'CHAT' },
  { id: '12', label: 'Nossas Regras', iconName: 'BookOpen', targetScreen: 'RULES' }, 
];

const IconMap: Record<string, React.ElementType> = {
  Wifi, MapPin, Key, BookOpen, ShoppingBag, Compass, Info, Utensils, Trees, LifeBuoy, MessageSquareText, Coffee, User
};

export const IconGrid: React.FC<IconGridProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-6">
      {menuItems.map((item) => {
        const IconComponent = IconMap[item.iconName] || Info;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.targetScreen)}
            className="group flex flex-col items-center justify-center aspect-square bg-gradient-to-br from-white via-sand-25 to-sand-50 rounded-2xl shadow-md border border-sand-100 hover:border-sand-400 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <div className="text-sand-600 mb-2.5 p-3 rounded-xl bg-gradient-to-br from-sand-100 to-sand-50 group-hover:from-sand-200 group-hover:to-sand-100 group-hover:text-sand-800 transition-all duration-300 shadow-sm">
                <IconComponent size={22} strokeWidth={1.5} />
            </div>
            <span className="text-[9px] font-sans text-charcoal-800 font-semibold tracking-wide text-center px-1 leading-tight uppercase opacity-85 group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};