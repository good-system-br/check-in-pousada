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
               className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === currentImage ? 'scale-110' : 'scale-100'}`}
             />
          </div>
        ))}
      </div>

      {/* Top Status Area Mockup */}
      <div className="absolute top-3 right-4 z-20 flex gap-2 text-white/80 animate-fade-in">
         <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
             <Snowflake size={12} />
             <span className="text-[10px] font-medium">{loading ? '--' : weather?.temperature}°</span>
         </div>
         {!loading && weather && (
           <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-medium max-w-[100px]">
             <Cloud size={12} />
             <span className="truncate">{weather.condition}</span>
           </div>
         )}
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex-1 flex flex-col justify-end pb-12 px-8">
        
        {/* Main Headings */}
        <div className="mb-8 space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 text-sand-300 mb-2">
                <MapPin size={14} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Monte Verde • MG</span>
            </div>
            
            <h1 className="font-serif text-5xl text-white leading-[0.9] drop-shadow-xl">
               <span className="block text-3xl font-light italic opacity-90 mb-1">Bem-vindo à</span>
               <span className="font-semibold tracking-wide">Villa Verde</span>
            </h1>
            
            <p className="text-white/80 text-sm font-light leading-relaxed max-w-[280px] border-l-2 border-sand-500 pl-4">
               O charme dos Alpes com a hospitalidade de Minas Gerais
            </p>
        </div>

        {/* Quick Stats - Ultra Compact */}
        <div className="mb-3 flex gap-2 px-2">
          <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded p-1.5 text-center">
            <p className="text-sm font-bold text-white">{loading ? '--' : weather?.temperature}°</p>
            <p className="text-[6px] text-sand-300 mt-0.5">Temp</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded p-1.5 text-center">
            <p className="text-sm font-bold text-white">1800m</p>
            <p className="text-[6px] text-sand-300 mt-0.5">Alt</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded p-1.5 text-center">
            <p className="text-sm font-bold text-white">24h</p>
            <p className="text-[6px] text-sand-300 mt-0.5">Sup</p>
          </div>
        </div>

        {/* Action Area */}
        <div className="space-y-1.5">
            <button 
                onClick={onStart}
                className="group w-full bg-gradient-to-r from-sand-400 to-sand-500 p-1 rounded-full flex items-center justify-between hover:from-sand-500 hover:to-sand-600 transition-all duration-300 active:scale-95 shadow-lg shadow-sand-500/40"
            >
                <span className="pl-4 text-[11px] text-white uppercase tracking-[0.15em] font-bold">
                    Acessar Guia
                </span>
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-sand-600 shadow-lg group-hover:rotate-90 transition-transform duration-500">
                    <ChevronRight size={18} strokeWidth={3} />
                </div>
            </button>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2">
                {images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-500 ${idx === currentImage ? 'w-8 bg-white' : 'w-1.5 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};