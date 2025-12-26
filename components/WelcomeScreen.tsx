import React, { useState, useEffect } from 'react';
import { ChevronRight, Wind, Snowflake, MapPin, Cloud, Droplets } from 'lucide-react';
import { getWeatherForMonteVerde, WeatherData } from '../services/weatherService';

interface WelcomeScreenProps {
  onStart: () => void;
}

const images = [
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop", // Misty Forest/Mountains (Araucaria vibe)
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000&auto=format&fit=crop", // Cozy Fireplace
  "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?q=80&w=1000&auto=format&fit=crop", // Interior Cabin
  "https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=1000&auto=format&fit=crop"  // Winter Coffee/Breakfast
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await getWeatherForMonteVerde();
      setWeather(weatherData);
      setLoading(false);
    };
    fetchWeather();
    
    // Atualizar clima a cada 10 minutos
    const weatherTimer = setInterval(fetchWeather, 600000);
    return () => clearInterval(weatherTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col relative bg-charcoal-900 overflow-hidden font-sans">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
          >
             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10"></div> 
             <img 
               src={img} 
               alt={`Ambiente ${index}`}
               loading={index === 0 ? 'eager' : 'lazy'}
               width="1000"
               height="1000"
               className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === currentImage ? 'scale-110' : 'scale-100'}`}
             />
          </div>
        ))}
      </div>

      {/* Top Status Area Mockup */}
      <div className="absolute top-3 right-3 sm:right-4 z-20 flex gap-1.5 sm:gap-2 text-white/80 animate-fade-in">
         <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10">
             <Snowflake size={11} className="sm:w-3 sm:h-3" />
             <span className="text-[9px] sm:text-[10px] font-medium">{loading ? '--' : weather?.temperature}°</span>
         </div>
         {!loading && weather && (
           <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 text-[8px] sm:text-[9px] font-medium max-w-[90px] sm:max-w-[100px]">
             <Cloud size={11} className="sm:w-3 sm:h-3 flex-shrink-0" />
             <span className="truncate">{weather.condition}</span>
           </div>
         )}
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex-1 flex flex-col justify-end pb-20 sm:pb-24 px-5 sm:px-8">
        
        {/* Main Headings */}
        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-sand-300 mb-2">
                <MapPin size={12} className="sm:w-[14px] sm:h-[14px]" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium">Monte Verde • MG</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl text-white leading-[0.9] drop-shadow-xl">
               <span className="block text-2xl sm:text-3xl font-light italic opacity-90 mb-1">Bem-vindo à</span>
               <span className="font-semibold tracking-wide">Villa Verde</span>
            </h1>
            
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-[260px] sm:max-w-[280px] border-l-2 border-sand-500 pl-3 sm:pl-4">
               O charme dos Alpes com a hospitalidade de Minas Gerais
            </p>
        </div>

        {/* Quick Stats - Ultra Compact */}
        <div className="mb-2.5 sm:mb-3 flex gap-1.5 sm:gap-2 px-1 sm:px-2">
          <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded p-2 text-center min-h-[52px] flex flex-col justify-center">
            <p className="text-base sm:text-lg font-bold text-white leading-none">{loading ? '--' : weather?.temperature}°</p>
            <p className="text-[7px] sm:text-[8px] text-sand-300 mt-1">Temp</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded p-2 text-center min-h-[52px] flex flex-col justify-center">
            <p className="text-base sm:text-lg font-bold text-white leading-none">1800m</p>
            <p className="text-[7px] sm:text-[8px] text-sand-300 mt-1">Alt</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded p-2 text-center min-h-[52px] flex flex-col justify-center">
            <p className="text-base sm:text-lg font-bold text-white leading-none">24h</p>
            <p className="text-[7px] sm:text-[8px] text-sand-300 mt-1">Sup</p>
          </div>
        </div>

        {/* Info Cards - Novos */}
        <div className="mb-2.5 sm:mb-3 grid grid-cols-2 gap-1.5 sm:gap-2 px-1 sm:px-2">
          <div className="bg-gradient-to-br from-white/15 to-white/5 border border-white/25 backdrop-blur-md rounded-lg p-2.5 sm:p-3">
            <p className="text-[8px] sm:text-[9px] text-sand-300 uppercase font-semibold mb-1 sm:mb-1.5 leading-none">Experiência Premium</p>
            <p className="text-white text-[10px] sm:text-xs leading-snug">Café especial, spa e lazer 24h</p>
          </div>
          <div className="bg-gradient-to-br from-white/15 to-white/5 border border-white/25 backdrop-blur-md rounded-lg p-2.5 sm:p-3">
            <p className="text-[8px] sm:text-[9px] text-sand-300 uppercase font-semibold mb-1 sm:mb-1.5 leading-none">Localização</p>
            <p className="text-white text-[10px] sm:text-xs leading-snug">1.300m de altitude, floresta</p>
          </div>
        </div>

        {/* Action Area */}
        <div className="space-y-1.5">
            <button 
                onClick={onStart}
                className="group w-full bg-gradient-to-r from-sand-400 to-sand-500 p-1 rounded-full flex items-center justify-between hover:from-sand-500 hover:to-sand-600 transition-all duration-300 active:scale-95 shadow-lg shadow-sand-500/40 min-h-[44px]"
                aria-label="Acessar guia do hóspede"
            >
                <span className="pl-4 sm:pl-5 text-[10px] sm:text-[11px] text-white uppercase tracking-[0.12em] sm:tracking-[0.15em] font-bold">
                    Acessar Guia
                </span>
                <div className="h-9 w-9 sm:h-10 sm:w-10 bg-white rounded-full flex items-center justify-center text-sand-600 shadow-lg group-hover:rotate-90 transition-transform duration-500">
                    <ChevronRight size={16} strokeWidth={3} className="sm:w-[18px] sm:h-[18px]" />
                </div>
            </button>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-1.5 sm:gap-2 pt-1">
                {images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-500 ${idx === currentImage ? 'w-6 sm:w-8 bg-white' : 'w-1.5 bg-white/30'}`}
                        role="presentation"
                        aria-label={idx === currentImage ? `Imagem ${idx + 1} ativa` : undefined}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};