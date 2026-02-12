import React from 'react';
import { ArrowLeft, MapPin, Clock, Users, Info, Zap, Coffee, Wind, Utensils } from 'lucide-react';

interface InfoScreenProps {
  onBack: () => void;
  type: 'BREAKFAST' | 'MENU_FOOD' | 'MINIBAR' | 'GUIDE' | 'SPA' | 'LOCATION';
}

interface MinibarItem {
  category: string;
  name: string;
  price: string;
}

interface InfoType {
  title: string;
  icon: React.ElementType;
  content: Array<{ label: string; value: string }>;
  description: string;
  items?: MinibarItem[];
}

const InfoData: Record<string, InfoType> = {
  BREAKFAST: {
    title: 'Café da Manhã',
    icon: Coffee,
    content: [
      { label: 'Horário', value: '08:30 - 10:30' },
      { label: 'Local', value: 'Salão de Café' },
      { label: 'Incluído', value: 'Sim' },
    ],
    description: 'Nosso café da manhã é servido em nosso salão de café das 08:30 às 10:30.'
  },
  MENU: {
    title: 'Restaurante',
    icon: Utensils,
    content: [
      { label: 'Cardápio', value: 'Variado' },
      { label: 'Música Ao Vivo', value: 'Finais de semana' },
      { label: 'Desconto', value: '20% para hóspedes' },
      { label: 'Vista', value: 'Privilegiada' },
    ],
    description: 'Há um restaurante em nossa pousada, com vista privilegiada, cardápio variado e música ao vivo (voz e violão) aos finais de semana. Concedemos 20% de desconto aos nossos hóspedes.'
  },
  MINIBAR: {
    title: 'Frigobar',
    icon: Zap,
    content: [
      { label: 'Funcionamento', value: '24 horas' },
      { label: 'Cobranças', value: 'Na saída (check-out)' },
      { label: 'Método', value: 'Lançado na conta' },
    ],
    description: 'Frigobar disponível em sua acomodação com itens selecionados. A consumação é lançada na conta e cobrada no check-out.',
    items: [
      { category: 'Bebidas', name: 'Água sem gás', price: 'R$ 7,00' },
      { category: 'Bebidas', name: 'Água com gás', price: 'R$ 9,00' },
      { category: 'Bebidas', name: 'Refrigerante', price: 'R$ 10,00' },
      { category: 'Bebidas', name: 'Cerveja', price: 'R$ 16,00' },
      { category: 'Bebidas', name: 'Cápsula de Café', price: 'R$ 12,00' },
    ]
  },
  GUIDE: {
    title: 'Informações Importantes',
    icon: Info,
    content: [
      { label: 'Recepção', value: '08:00 - 22:00' },
      { label: 'Emergência', value: '(35) 98893-1913' },
      { label: 'Wi-Fi', value: 'Gratuito - chalesmv' },
      { label: 'Arrumação', value: 'Solicitar até 14:00' },
    ],
    description: '🚨 INFORMAÇÕES IMPORTANTES: Manter a ducha higiênica sempre desligada, pois pode influenciar no aquecimento do chuveiro e da hidromassagem.'
  },
  SPA: {
    title: 'Serviços Especiais',
    icon: Wind,
    content: [
      { label: 'Massagem', value: 'Disponível' },
      { label: 'Consulta', value: 'Contate a recepção' },
      { label: 'Valores', value: 'Sob consulta' },
    ],
    description: 'Possuímos serviço de massagem. Para consultar valores e disponibilidade, contate a recepção.'
  },
  LOCATION: {
    title: 'Localização',
    icon: MapPin,
    content: [
      { label: 'Endereço', value: 'Av. Sol Nascente, 150' },
      { label: 'Cidade', value: 'Monte Verde - Camanducaia' },
      { label: 'Estado', value: 'Minas Gerais' },
      { label: 'CEP', value: '37653-000' },
      { label: 'Telefone', value: '(35) 3438-2399' },
    ],
    description: 'Encontre a pousada no mapa. Localizada em plena Serra da Mantiqueira, cercada pela natureza.'
  },
};

export const InfoScreen: React.FC<InfoScreenProps> = ({ onBack, type }) => {
  const info = InfoData[type];
  const IconComponent = info.icon;

  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 sm:pt-14 pb-3 sm:pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-sand-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 transition-colors text-charcoal-900 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Voltar">
          <ArrowLeft size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
        </button>
        <h2 className="font-serif text-base sm:text-lg font-bold text-charcoal-900 tracking-wide">{info.title}</h2>
        <div className="w-10 sm:w-11" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Icon Header with Badge */}
        <div className="pt-6 sm:pt-8 pb-5 sm:pb-6 px-4 sm:px-6 md:px-8 text-center border-b border-sand-100 bg-gradient-to-b from-sand-50 to-white">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-sand-100 to-sand-200 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-md">
            <IconComponent size={26} className="text-sand-800 sm:w-7 sm:h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-charcoal-900 mb-2">{info.title}</h2>
          <p className="text-sand-600 text-sm leading-relaxed font-light max-w-xs mx-auto px-2">
            {info.description}
          </p>
          {/* Service Badge */}
          <div className="flex justify-center gap-2 mt-3 sm:mt-4">
            <span className="bg-sand-100 text-sand-800 text-[9px] sm:text-[10px] font-bold uppercase px-2.5 sm:px-3 py-1 rounded-full tracking-wider">Premium</span>
            <span className="bg-green-100 text-green-800 text-[9px] sm:text-[10px] font-bold uppercase px-2.5 sm:px-3 py-1 rounded-full tracking-wider">24/7</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-2.5 sm:space-y-3">
          <style>{`
            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7), 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
              50% { box-shadow: 0 0 0 8px rgba(217, 119, 6, 0), 0 10px 25px -5px rgba(0, 0, 0, 0.2); }
            }
            @keyframes bounce-subtle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            .animate-pulse-glow {
              animation: pulse-glow 2s infinite;
            }
            .animate-bounce-subtle {
              animation: bounce-subtle 2s infinite;
            }
          `}</style>
          {info.content.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-gradient-to-r from-white to-sand-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition-all duration-300 shadow-sm hover:shadow-md group ${
                type === 'GUIDE' && item.label === 'Arrumação' 
                  ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-sand-50 animate-pulse-glow' 
                  : 'border-sand-100 hover:border-sand-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className={`text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.15em] font-bold ${
                    type === 'GUIDE' && item.label === 'Arrumação' 
                      ? 'text-orange-600' 
                      : 'text-sand-600'
                  }`}>
                    {item.label}
                  </span>
                  {type === 'GUIDE' && item.label === 'Arrumação' && (
                    <span className="animate-bounce-subtle">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  type === 'GUIDE' && item.label === 'Arrumação' 
                    ? 'bg-orange-600 group-hover:bg-orange-700' 
                    : 'bg-sand-400 group-hover:bg-sand-600'
                }`}></div>
              </div>
              <p className={`font-semibold text-sm sm:text-base ${
                type === 'GUIDE' && item.label === 'Arrumação' 
                  ? 'text-orange-700' 
                  : 'text-charcoal-900'
              }`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Map for Location */}
        {type === 'LOCATION' && (
          <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-sand-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.6842564821635!2d-46.04366342345434!3d-22.862283089999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc10111c695e25%3A0xdd32e4eb2fdb5dd0!2sAv.%20Sol%20Nascente%2C%20150%20-%20Monte%20Verde%2C%20Camanducaia%20-%20MG%2037653-000!5e0!3m2!1spt-BR!2sbr!4v1673894567890"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Minibar Items List */}
        {type === 'MINIBAR' && info.items && (
          <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 space-y-6">
            <div className="border-t border-sand-200 pt-6">
              <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 mb-4">Itens Disponíveis</h3>
              
              {/* Group items by category */}
              {Array.from(new Set(info.items.map(item => item.category))).map((category, catIdx) => (
                <div key={catIdx} className="mb-6">
                  <h4 className="text-sm font-bold text-sand-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-sand-300"></span>
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {info.items
                      .filter(item => item.category === category)
                      .map((item, itemIdx) => (
                        <div 
                          key={itemIdx} 
                          className="flex items-center justify-between bg-white rounded-lg p-3 sm:p-4 border border-sand-100 hover:border-sand-300 transition-all group"
                        >
                          <span className="text-sm text-charcoal-800 flex-1">{item.name}</span>
                          <span className="text-sm font-bold text-sand-800 ml-3">{item.price}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Note */}
              <div className="mt-6 bg-sand-50 border-l-4 border-sand-400 p-4 rounded-r-lg">
                <p className="text-xs text-sand-700 leading-relaxed">
                  <strong>Importante:</strong> Os valores serão automaticamente debitados da sua conta no check-out. 
                  Em caso de dúvidas, entre em contato com a recepção.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 pt-3 sm:pt-4">
          <button 
            onClick={onBack}
            className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-sand-800 to-sand-900 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] rounded-xl hover:from-sand-700 hover:to-sand-800 transition-all duration-300 shadow-lg shadow-sand-900/10 active:scale-95 hover:shadow-xl min-h-[44px]"
            aria-label="Voltar ao menu principal"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
};
