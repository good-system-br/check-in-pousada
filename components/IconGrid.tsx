import React from 'react';
import { 
  Wifi, MapPin, Coffee, Key, BookOpen, 
  ShoppingBag, Compass, Info, Utensils, 
  Trees, MessageSquareText, LifeBuoy, User
} from 'lucide-react';
import { MenuItem, ScreenName } from '../types';
import { MENU_ITEMS } from '../config';
import { LABELS } from '../constants';

interface IconGridProps {
  onNavigate: (screen: ScreenName) => void;
}

const IconMap: Record<string, React.ElementType> = {
  Wifi, MapPin, Key, BookOpen, ShoppingBag, Compass, Info, Utensils, Trees, LifeBuoy, MessageSquareText, Coffee, User
};

/**
 * Componente que exibe os serviços da pousada em formato de lista
 * com integração do Google Maps na parte inferior
 */
export const IconGrid: React.FC<IconGridProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 sm:p-5 md:p-6 space-y-8">
      {/* Lista de Informações */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">{LABELS.services}</h2>
          <p className="text-sand-600 text-sm">Acesse todos os serviços disponíveis</p>
        </div>
        
        <ul className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const IconComponent = IconMap[item.iconName] || Info;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.targetScreen)}
                  className="w-full flex items-center gap-4 p-4 sm:p-5 bg-gradient-to-r from-white via-sand-25 to-sand-50 rounded-xl sm:rounded-2xl shadow-sm border border-sand-100 hover:border-sand-300 hover:shadow-lg hover:bg-gradient-to-r hover:from-sand-25 hover:via-sand-50 hover:to-sand-75 transition-all duration-300 active:scale-[0.98] text-left group"
                  aria-label={`Acessar ${item.label}`}
                >
                  <div className="text-sand-600 p-3 sm:p-3.5 rounded-xl bg-gradient-to-br from-sand-100 to-sand-50 group-hover:from-sand-200 group-hover:to-sand-100 group-hover:text-sand-800 transition-all duration-300 flex-shrink-0">
                    <IconComponent size={24} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-charcoal-900 text-base group-hover:text-sand-700">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-sand-400 group-hover:text-sand-600 transition-colors flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Google Maps */}
      <div className="pt-6 border-t border-sand-200">
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">{LABELS.location}</h2>
          <p className="text-sand-600 text-sm">Encontre a pousada no mapa</p>
        </div>
        <div className="w-full h-80 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-sand-200 hover:shadow-xl transition-shadow duration-300">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9522488624147!2d-43.19521!3d-22.98765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd9b5c3b5b5b5b5%3A0x0!2sPousada!5e0!3m2!1spt-BR!2sbr!4v1234567890"
            title="Localização da Pousada Villa Verde no Google Maps"
          />
        </div>
      </div>
    </div>
  );
};