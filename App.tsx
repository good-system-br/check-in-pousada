import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { IconGrid } from './components/IconGrid';
import { RestaurantsScreen } from './components/RestaurantsScreen';
import { DirectionsScreen } from './components/DirectionsScreen';
import { ChatScreen } from './components/ChatScreen';
import { InfoScreen } from './components/InfoScreen';
import { GuestScreen } from './components/GuestScreen';
import { ScreenName } from './types';
import { Wifi, Copy, Info, LogOut, Cloud, Droplets, Wind, User } from 'lucide-react';
import { getWeatherForMonteVerde, WeatherData } from './services/weatherService';

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('WELCOME');
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await getWeatherForMonteVerde();
      setWeather(weatherData);
      setLoadingWeather(false);
    };
    fetchWeather();
    
    // Atualizar clima a cada 10 minutos
    const weatherTimer = setInterval(fetchWeather, 600000);
    return () => clearInterval(weatherTimer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'WELCOME':
        return <WelcomeScreen onStart={() => setCurrentScreen('MENU')} />;
      case 'RESTAURANTS':
        return <RestaurantsScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'DIRECTIONS':
        return <DirectionsScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'CHAT':
        return <ChatScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'BREAKFAST':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="BREAKFAST" />;
      case 'MENU_FOOD':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="MENU" />;
      case 'MINIBAR':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="MINIBAR" />;
      case 'TOURS':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="TOURS" />;
      case 'GUIDE':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="GUIDE" />;
      case 'RULES':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="RULES" />;
      case 'SPA':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="SPA" />;
      case 'TOWELS':
        return <InfoScreen onBack={() => setCurrentScreen('MENU')} type="TOWELS" />;
      case 'GUEST':
        return <GuestScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'WIFI':
         return (
             <div className="h-full flex flex-col items-center justify-center bg-sand-900 text-white p-8 relative">
                <button onClick={() => setCurrentScreen('MENU')} className="absolute top-14 left-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div className="w-full max-w-sm">
                    <div className="mx-auto bg-gradient-to-br from-sand-500 to-sand-700 w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-sand-500/20 rotate-3 border border-white/10">
                        <Wifi size={42} className="text-white" />
                    </div>
                    <div className="text-center mb-12">
                        <h3 className="font-serif text-3xl text-sand-50 mb-3 tracking-wide">Wi-Fi do Hóspede</h3>
                        <p className="text-sand-300 text-sm font-light leading-relaxed">Conecte-se e compartilhe seus<br/>momentos em Monte Verde.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <Info size={14} className="text-sand-400"/>
                                <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Rede</p>
                            </div>
                            <p className="font-medium text-xl tracking-wide text-white ml-6">VillaVerde_Guest</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors active:scale-[0.98]"
                             onClick={() => {
                                 navigator.clipboard.writeText("monteverde2024");
                             }}>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Info size={14} className="text-sand-400"/>
                                    <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Senha</p>
                                </div>
                                <p className="font-mono text-xl text-sand-200 ml-6 tracking-wide">monteverde2024</p>
                            </div>
                            <div className="bg-white/10 p-3 rounded-xl border border-white/5">
                                <Copy size={20} className="text-sand-200 group-hover:text-white transition-colors"/>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-center text-white/20 text-[10px] mt-16 uppercase tracking-widest">Toque para copiar</p>
                </div>
             </div>
         );
      case 'MENU':
      default:
        return (
          <div className="h-full flex flex-col bg-sand-50 relative overflow-hidden">
             {/* Header */}
             <div className="pt-16 pb-6 px-8 bg-gradient-to-b from-sand-50 to-sand-25 z-10 flex justify-between items-start border-b-2 border-sand-200">
                <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-sand-600 mb-2 font-bold flex items-center gap-1">
                      📍 Monte Verde • MG • Quarto 107
                    </p>
                    <h1 className="font-serif text-2xl text-charcoal-200 leading-tight font-bold tracking-tight">
                      Bem-vindo à Villa Verde
                    </h1>
                    <p className="text-xs text-sand-500 mt-2 font-light italic">Guia do Hospede</p>
                </div>
                
                {/* Weather Widget */}
                <div className="bg-white rounded-2xl p-3 border border-sand-100 shadow-sm min-w-[140px]">
                  {loadingWeather ? (
                    <div className="text-center text-sand-500 text-xs">Carregando...</div>
                  ) : weather ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold text-charcoal-900">{weather.temperature}°</span>
                        <Cloud size={18} className="text-sand-500" />
                      </div>
                      <p className="text-[10px] text-sand-600 font-medium leading-tight">{weather.condition}</p>
                      <div className="flex gap-3 text-[10px] text-sand-500 pt-1 border-t border-sand-100">
                        <div className="flex items-center gap-1">
                          <Droplets size={12} />
                          <span>{weather.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wind size={12} />
                          <span>{weather.windSpeed}km/h</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                
                {/* Back to Home Button */}
                <button 
                  onClick={() => setCurrentScreen('WELCOME')}
                  className="p-3 bg-white rounded-full text-sand-400 hover:text-charcoal-900 hover:bg-sand-100 transition-all shadow-sm border border-sand-100 ml-3"
                  title="Sair"
                >
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto pb-12 no-scrollbar px-2">
                <IconGrid onNavigate={setCurrentScreen} />
                
                <div className="mt-6 mb-24 px-8">
                    <div className="bg-gradient-to-br from-sand-800 via-sand-750 to-sand-900 rounded-[2.5rem] p-8 text-center shadow-lg relative overflow-hidden group border border-sand-700">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-sand-600 rounded-full blur-[100px] opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-sand-500 rounded-full blur-[80px] opacity-10 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                          <p className="text-sand-300 text-sm mb-3">⭐⭐⭐⭐⭐ 4.9 de 5 estrelas</p>
                          <p className="font-serif italic text-sand-50 text-lg mb-4 leading-relaxed tracking-wide">
                            "A Suíça Mineira em sua essência. Experiência inesquecível."
                          </p>
                          <div className="w-16 h-px bg-gradient-to-r from-transparent via-sand-500/50 to-transparent mx-auto my-4"></div>
                          <p className="text-sand-400 text-xs font-light">
                            Pousada Villa Verde • Monte Verde, MG
                          </p>
                        </div>
                    </div>
                </div>
             </div>

             {/* Emergency & WhatsApp Buttons */}
             <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-3">
               {/* Emergency Button */}
               <button 
                 onClick={() => alert('Chamando recepção de emergência...')}
                 className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/40 hover:scale-110 transition-all duration-300 active:scale-95 border-2 border-white hover:bg-red-700 animate-pulse"
                 title="Emergência"
               >
                 <span className="text-white text-lg font-bold">!</span>
               </button>
               
               {/* WhatsApp Button */}
               <a 
                 href="https://wa.me/5548999999999" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-green-900/20 hover:scale-105 transition-all duration-300 active:scale-95 group border-2 border-white hover:bg-[#20BA58]"
                 title="WhatsApp"
               >
                 <WhatsAppIcon className="text-white w-8 h-8" />
               </a>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-[#DCD9D5] flex justify-center items-center font-sans">
        {/* Mobile Frame Simulation */}
        <div className="w-full h-full sm:max-w-[400px] sm:h-[850px] bg-black sm:rounded-[55px] shadow-2xl overflow-hidden relative border-[8px] border-black ring-1 ring-white/10 box-border">
            
            {/* Screen Content */}
            <div className="w-full h-full overflow-hidden bg-sand-50 sm:rounded-[46px]">
                {renderScreen()}
            </div>

            {/* iOS Home Bar Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-black/20 rounded-full z-50 backdrop-blur-sm pointer-events-none"></div>
            
            {/* Status Bar Mockup */}
            <div className="absolute top-0 w-full h-12 z-50 flex justify-between px-8 items-center pointer-events-none text-white mix-blend-difference">
                 <span className="text-sm font-semibold tracking-wide">{formatTime(time)}</span>
                 <div className="flex gap-1.5 items-center">
                    <span className="text-xs font-medium">📡</span>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default App;