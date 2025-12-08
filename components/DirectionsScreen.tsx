import React from 'react';
import { ArrowLeft, Map, Navigation, CheckCircle2, Mountain } from 'lucide-react';

interface DirectionsScreenProps {
  onBack: () => void;
}

export const DirectionsScreen: React.FC<DirectionsScreenProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Navbar */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-sand-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 transition-colors text-charcoal-900">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-lg font-bold text-charcoal-900 tracking-wide">Rota para Monte Verde</h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Map Header */}
        <div className="w-full h-64 relative bg-sand-200">
           <img 
             src="https://images.unsplash.com/photo-1545562083-c583d991776f?q=80&w=1000&auto=format&fit=crop" 
             alt="Estrada da Serra" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-sand-50/90 to-transparent"></div>
           
           {/* Floating CTA */}
           <div className="absolute -bottom-8 left-6 right-6">
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=Monte+Verde+MG" 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between bg-sand-800 text-white p-5 rounded-2xl shadow-xl shadow-sand-900/20 hover:bg-sand-700 transition-all active:scale-[0.98] border border-white/10"
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-sand-300 tracking-[0.2em] font-bold mb-1">GPS Conectado</span>
                        <span className="font-serif text-xl text-white">Abrir no Maps/Waze</span>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-full border border-white/5">
                        <Navigation size={22} className="text-white" fill="currentColor" />
                    </div>
                </a>
           </div>
        </div>

        <div className="mt-16 px-8 pb-12">
            <div className="text-center mb-10">
                <div className="flex justify-center mb-3 text-sand-600">
                    <Mountain size={28} strokeWidth={1} />
                </div>
                <p className="font-serif text-2xl text-charcoal-900 mb-2">Av. Monte Verde, 1200</p>
                <p className="text-xs text-sand-500 uppercase tracking-[0.2em] font-medium">Camanducaia • Minas Gerais</p>
            </div>

            {/* Timeline Steps */}
            <div className="relative pl-4 border-l border-sand-300 space-y-10 ml-2">
                {[
                    { title: "Rodovia Fernão Dias (BR-381)", desc: "Siga até a saída 918 (Camanducaia). Não entre em Extrema, siga as placas." },
                    { title: "Chegada em Camanducaia", desc: "Entre na cidade e siga as placas marrons indicando 'Monte Verde' (aprox. 30km de subida)." },
                    { title: "Estrada da Serra", desc: "A estrada é asfaltada e sinuosa. Aprecie a vista das araucárias. Cuidado com a neblina à noite." },
                    { title: "Portal de Monte Verde", desc: "Após o portal estilo europeu, siga pela Avenida Principal por 1km e entre à direita na Rua do Moinho." }
                ].map((step, idx) => (
                    <div key={idx} className="relative pl-8">
                        <div className={`absolute -left-[21px] top-1 w-5 h-5 rounded-full border-[3px] box-content ${idx === 3 ? 'bg-sand-800 border-sand-800 shadow-lg' : 'bg-sand-50 border-sand-300'}`}>
                            {idx === 3 && <CheckCircle2 size={14} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                        </div>
                        <h4 className={`font-bold text-sm mb-1.5 uppercase tracking-wide ${idx === 3 ? 'text-sand-800' : 'text-sand-600'}`}>{step.title}</h4>
                        <p className="text-charcoal-800 text-sm leading-relaxed font-light">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};