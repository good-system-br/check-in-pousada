import React from 'react';
import { ArrowLeft, User, Calendar, Home, Clock, Phone, MapPin, Star } from 'lucide-react';

interface GuestScreenProps {
  onBack: () => void;
}

export const GuestScreen: React.FC<GuestScreenProps> = ({ onBack }) => {
  const guestData = {
    name: "Vitor Silva",
    room: "107",
    checkIn: "08 Dez 2024",
    checkOut: "10 Dez 2024",
    nights: "2 noites",
    roomType: "Suíte Premium",
    floor: "Andar 1",
    phone: "+55 (31) 99999-0000",
    email: "vitor@email.com",
    rating: 4.9,
    reviews: 342,
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sand-500 to-sand-400 px-6 py-4 flex items-center gap-3 shadow-lg">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded-full transition-all"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h2 className="text-lg font-bold text-white flex-1">Perfil do Hóspede</h2>
        <Star size={20} className="text-yellow-300 fill-yellow-300" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        
        {/* Guest Profile Card */}
        <div className="bg-gradient-to-br from-white/20 to-white/5 border border-white/30 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-sand-400 to-sand-500 rounded-full flex items-center justify-center shadow-lg">
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{guestData.name}</h3>
              <p className="text-sand-300 text-sm">Quarto {guestData.room} • {guestData.roomType}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-sand-300">{guestData.nights}</p>
              <p className="text-[10px] text-white/70 mt-1">Hospedagem</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-sand-300">4.9★</p>
              <p className="text-[10px] text-white/70 mt-1">{guestData.reviews} avaliações</p>
            </div>
          </div>
        </div>

        {/* Check-in / Check-out */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-[0.1em]">Datas da Estadia</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-sand-400" />
                <p className="text-[10px] text-white/60 uppercase">Check-in</p>
              </div>
              <p className="font-bold text-white">{guestData.checkIn}</p>
              <p className="text-[10px] text-white/50">14:00 - 18:00</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-sand-400" />
                <p className="text-[10px] text-white/60 uppercase">Check-out</p>
              </div>
              <p className="font-bold text-white">{guestData.checkOut}</p>
              <p className="text-[10px] text-white/50">até 11:00</p>
            </div>
          </div>
        </div>

        {/* Room Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-[0.1em]">Informações do Quarto</h4>
          <div className="space-y-2.5">
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
              <Home size={16} className="text-sand-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/60 uppercase">Tipo</p>
                <p className="font-semibold text-white">{guestData.roomType}</p>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
              <MapPin size={16} className="text-sand-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/60 uppercase">Localização</p>
                <p className="font-semibold text-white">{guestData.floor} • Frente Pousada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-[0.1em]">Contato</h4>
          <div className="space-y-2.5">
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
              <Phone size={16} className="text-sand-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/60 uppercase">Telefone</p>
                <p className="font-semibold text-white break-all">{guestData.phone}</p>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
              <Clock size={16} className="text-sand-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/60 uppercase">Recepção 24h</p>
                <p className="font-semibold text-white">(31) 3438-2000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Services */}
        <div className="bg-gradient-to-r from-sand-500/20 to-sand-400/10 border border-sand-400/30 rounded-lg p-4">
          <p className="text-xs text-white/80 leading-relaxed">
            🌟 <span className="font-semibold">Bem-vindo ao programa Premium!</span> Aproveite benefícios exclusivos: café da manhã premium, acesso às áreas comuns, e atendimento personalizado 24 horas.
          </p>
        </div>

      </div>
    </div>
  );
};
