import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, MapPin, Star } from 'lucide-react';
import { getLocalRecommendations } from '../services/geminiService';
import { Restaurant } from '../types';

interface RestaurantsScreenProps {
  onBack: () => void;
}

export const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({ onBack }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      // Simulate location for Monte Verde
      const recs = await getLocalRecommendations("Monte Verde, MG");
      if (recs.length === 0) {
        // Fallback data - Monte Verde Classics
        setRestaurants([
          {
            name: "Mont Vert - A Casa do Fondue",
            description: "Referência em fondues premium e rodízios. Ambiente sofisticado com música ao vivo e adega climatizada.",
            cuisine: "Fondue & Suíça",
            priceRange: "$$$$"
          },
          {
            name: "Villa Donna Bistrô",
            description: "Culinária italiana artesanal com toque contemporâneo. Famoso pelos risotos e massas frescas em um chalé aconchegante.",
            cuisine: "Italiana / Bistrô",
            priceRange: "$$$"
          },
          {
            name: "Paulo das Trutas",
            description: "O mais tradicional restaurante de trutas da região. Pratos frescos direto do trutário local. Simples e imperdível.",
            cuisine: "Trutas & Grelhados",
            priceRange: "$$"
          }
        ]);
      } else {
        setRestaurants(recs);
      }
      setLoading(false);
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 sm:pt-14 pb-4 sm:pb-6 flex items-center justify-between bg-gradient-to-b from-white to-sand-25 sticky top-0 z-20 border-b-2 border-sand-200 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 transition-colors text-charcoal-900 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Voltar">
          <ArrowLeft size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
        </button>
        <h2 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 tracking-tight">Gastronomia Premiada</h2>
        <div className="w-10 sm:w-11" /> 
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 no-scrollbar pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-sand-500 space-y-4">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-sand-200 border-t-sand-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Star size={12} className="text-sand-600" fill="currentColor"/>
                </div>
            </div>
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase animate-pulse">Consultando o Chef...</p>
          </div>
        ) : (
          restaurants.map((place, idx) => (
            <div key={idx} className="group bg-white rounded-2xl sm:rounded-3xl shadow-card overflow-hidden hover:shadow-xl transition-all duration-300 border border-sand-100">
               <div className="h-40 sm:h-44 md:h-48 w-full relative overflow-hidden">
                 <img 
                    src={`https://images.unsplash.com/photo-${idx === 0 ? '1543353071-87d37adb0cb4' : idx === 1 ? '1559339352-11d035aa65de' : '1534422298391-e4f8c172dddb'}?q=80&w=600&auto=format&fit=crop`} 
                    alt={place.name}
                    loading="lazy"
                    width="600"
                    height="352"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold shadow-sm border border-sand-100 text-charcoal-900 tracking-wider">
                   {place.priceRange}
                 </div>
                 <div className="absolute bottom-0 inset-x-0 h-20 sm:h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                 <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold bg-sand-600/90 px-2 sm:px-2.5 py-1 rounded backdrop-blur-sm border border-white/10 mb-2 inline-block">
                        {place.cuisine}
                    </span>
                 </div>
               </div>
               
               <div className="p-4 sm:p-5 md:p-6">
                 <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-900 mb-2">{place.name}</h3>
                 <p className="text-sand-600 text-sm leading-relaxed mb-5 sm:mb-6 font-light">{place.description}</p>
                 
                 <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " Monte Verde MG")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 sm:py-3.5 bg-sand-800 text-sand-50 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] rounded-xl hover:bg-sand-700 transition-colors shadow-lg shadow-sand-900/10 active:scale-[0.98] min-h-[44px]"
                    aria-label={`Ver localização de ${place.name} no mapa`}
                 >
                    <MapPin size={13} className="mr-2 sm:w-[14px] sm:h-[14px]" />
                    Ver localização
                 </a>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};