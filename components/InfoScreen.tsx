import React from 'react';
import { ArrowLeft, MapPin, Clock, Users, Info, Zap, Coffee, Wind } from 'lucide-react';

interface InfoScreenProps {
  onBack: () => void;
  type: 'BREAKFAST' | 'MENU' | 'MINIBAR' | 'TOURS' | 'GUIDE' | 'RULES' | 'SPA' | 'TOWELS';
}

const InfoData = {
  BREAKFAST: {
    title: 'Café da Manhã',
    icon: Coffee,
    content: [
      { label: 'Horário', value: '07:00 - 11:00' },
      { label: 'Local', value: 'Sala de Estar Térreo' },
      { label: 'Tipo', value: 'Buffet Continental Premium' },
    ],
    description: 'Defrute de um café da manhã completo com pães franceses, frutas frescas, sucos naturais, café premium e ovos à disposição.'
  },
  MENU: {
    title: 'Cardápio',
    icon: MapPin,
    content: [
      { label: 'Disponibilidade', value: 'À la carte' },
      { label: 'Horário', value: '12:00 - 22:00' },
      { label: 'Especialidades', value: 'Fondue, Trutas, Risoto' },
    ],
    description: 'Cardápio assinado com pratos típicos da região, preparados com ingredientes frescos e técnica francesa refinada.'
  },
  MINIBAR: {
    title: 'Minibar',
    icon: Zap,
    content: [
      { label: 'Funcionamento', value: '24 horas' },
      { label: 'Cobranças', value: 'Automaticamente na saída' },
      { label: 'Seleção', value: 'Bebidas Premium & Lanches' },
    ],
    description: 'Minibar climatizado com bebidas nacionais e importadas, água, sucos e lanches gourmet disponíveis 24h.'
  },
  TOURS: {
    title: 'Passeios & Experiências',
    icon: MapPin,
    content: [
      { label: 'Trilhas', value: 'Trilha da Pedra Grande' },
      { label: 'Atividades', value: 'Trekking, Fotografia' },
      { label: 'Duração', value: '2-4 horas' },
    ],
    description: 'Explore a natureza de Monte Verde com guias locais experientes. Trilhas para todos os níveis de experiência.'
  },
  GUIDE: {
    title: 'Guia da Pousada',
    icon: Info,
    content: [
      { label: 'Check-in', value: '15:00' },
      { label: 'Check-out', value: '11:00' },
      { label: 'Recepção', value: '24 horas disponível' },
    ],
    description: 'Bem-vindo à Pousada Villa Verde. Aqui você encontrará todas as informações sobre a pousada e Monte Verde.'
  },
  RULES: {
    title: 'Nossas Regras',
    icon: Info,
    content: [
      { label: 'Ruído', value: 'Respeito após 22:00' },
      { label: 'Fumac', value: 'Proibido em áreas comuns' },
      { label: 'Animais', value: 'Sob consulta prévia' },
    ],
    description: 'Solicitamos respeito com nossa equipe, hóspedes e comunidade local para manter o ambiente tranquilo e acolhedor.'
  },
  SPA: {
    title: 'Spa & Lazer',
    icon: Wind,
    content: [
      { label: 'Serviços', value: 'Massagens & Terapias' },
      { label: 'Horário', value: '09:00 - 20:00' },
      { label: 'Reserva', value: 'Recepção' },
    ],
    description: 'Relaxe em nosso spa com tratamentos rejuvenescedores. Sauna, jacuzzi e sala de meditação disponíveis.'
  },
  TOWELS: {
    title: 'Toalhas & Lareira',
    icon: Zap,
    content: [
      { label: 'Toalhas', value: 'Troque quantas desejar' },
      { label: 'Lareira', value: 'Acione conforme necessário' },
      { label: 'Lenha', value: 'Reabastecemos diariamente' },
    ],
    description: 'Toalhas premium disponíveis a qualquer hora. A lareira oferece aconchego nos dias frios. Solicite à recepção.'
  },
};

export const InfoScreen: React.FC<InfoScreenProps> = ({ onBack, type }) => {
  const info = InfoData[type];
  const IconComponent = info.icon;

  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-sand-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 transition-colors text-charcoal-900">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-lg font-bold text-charcoal-900 tracking-wide">{info.title}</h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Icon Header */}
        <div className="pt-8 pb-6 px-8 text-center border-b border-sand-100">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sand-100 rounded-2xl mb-4">
            <IconComponent size={28} className="text-sand-800" />
          </div>
          <p className="text-sand-600 text-sm leading-relaxed font-light max-w-xs mx-auto">
            {info.description}
          </p>
        </div>

        {/* Info Cards */}
        <div className="px-8 py-8 space-y-3">
          {info.content.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-sand-100 hover:border-sand-300 transition-colors shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sand-500 font-bold">{item.label}</span>
                <div className="w-1 h-1 bg-sand-300 rounded-full"></div>
              </div>
              <p className="text-charcoal-900 font-medium text-sm mt-1.5">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-8 pb-12 pt-4">
          <button 
            onClick={onBack}
            className="w-full py-3.5 bg-sand-800 text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-sand-700 transition-colors shadow-lg shadow-sand-900/10 active:scale-[0.98]"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
