import React from 'react';
import { ArrowLeft, User, Calendar, Home, Clock, Phone, MapPin, Star } from 'lucide-react';
import { POUSADA_CONFIG } from '../config';

interface GuestScreenProps {
  onBack: () => void;
}

export const GuestScreen: React.FC<GuestScreenProps> = ({ onBack }) => {
  const guestData = POUSADA_CONFIG.exampleGuest;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sand-500 to-sand-400 px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 shadow-lg">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft size={18} className="text-white sm:w-5 sm:h-5" />
        </button>
        <h2 className="text-base sm:text-lg font-bold text-white flex-1">Perfil do Hóspede</h2>
        <Star size={18} className="text-yellow-300 fill-yellow-300 sm:w-5 sm:h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 space-y-5 sm:space-y-6 no-scrollbar">
        {guestData ? (
          <>
            {/* Guest Profile Card */}
            <div className="bg-gradient-to-br from-white/20 to-white/5 border border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-sand-400 to-sand-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <User size={28} className="text-white sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white truncate">{guestData.name}</h3>
                  <p className="text-sand-300 text-xs sm:text-sm truncate">Quarto {guestData.room} • {guestData.roomType}</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="bg-black/30 rounded-lg p-3 text-center min-h-[70px] flex flex-col justify-center">
                  <p className="text-xl sm:text-2xl font-bold text-sand-300 leading-none">{guestData.nights}</p>
                  <p className="text-[9px] sm:text-[10px] text-white/70 mt-1.5 sm:mt-2">Hospedagem</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center min-h-[70px] flex flex-col justify-center">
                  <p className="text-xl sm:text-2xl font-bold text-sand-300 leading-none">4.9★</p>
                  <p className="text-[9px] sm:text-[10px] text-white/70 mt-1.5 sm:mt-2">{guestData.reviews} avaliações</p>
                </div>
              </div>
            </div>

            {/* Check-in / Check-out */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-[0.08em] sm:tracking-[0.1em]">Datas da Estadia</h4>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 backdrop-blur-sm min-h-[90px] flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                    <Calendar size={14} className="text-sand-400 sm:w-4 sm:h-4 flex-shrink-0" />
                    <p className="text-[9px] sm:text-[10px] text-white/60 uppercase">Check-in</p>
                  </div>
                  <p className="font-bold text-sm sm:text-base text-white truncate">{guestData.checkIn}</p>
                  <p className="text-[9px] sm:text-[10px] text-white/50">14:00 - 18:00</p>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 backdrop-blur-sm min-h-[90px] flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                    <Calendar size={14} className="text-sand-400 sm:w-4 sm:h-4 flex-shrink-0" />
                    <p className="text-[9px] sm:text-[10px] text-white/60 uppercase">Check-out</p>
                  </div>
                  <p className="font-bold text-sm sm:text-base text-white truncate">{guestData.checkOut}</p>
                  <p className="text-[9px] sm:text-[10px] text-white/50">até 11:00</p>
                </div>
              </div>
            </div>

            {/* Room Information */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-[0.08em] sm:tracking-[0.1em]">Informações do Quarto</h4>
              <div className="space-y-2 sm:space-y-2.5">
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <Home size={15} className="text-sand-400 mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-white/60 uppercase">Tipo</p>
                    <p className="font-semibold text-sm sm:text-base text-white">{guestData.roomType}</p>
                  </div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <MapPin size={15} className="text-sand-400 mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-white/60 uppercase">Localização</p>
                    <p className="font-semibold text-sm sm:text-base text-white">{guestData.floor} • Frente Pousada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-[0.08em] sm:tracking-[0.1em]">Contato</h4>
              <div className="space-y-2 sm:space-y-2.5">
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <Phone size={15} className="text-sand-400 mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-white/60 uppercase">Telefone</p>
                    <p className="font-semibold text-sm sm:text-base text-white break-all">{guestData.phone}</p>
                  </div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <Clock size={15} className="text-sand-400 mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-white/60 uppercase">Recepção 24h</p>
                    <p className="font-semibold text-sm sm:text-base text-white">(31) 3438-2000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Services */}
            <div className="bg-gradient-to-r from-sand-500/20 to-sand-400/10 border border-sand-400/30 rounded-lg p-3 sm:p-4">
              <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed">
                🌟 <span className="font-semibold">Bem-vindo ao programa Premium!</span> Aproveite benefícios exclusivos: café da manhã premium, acesso às áreas comuns, e atendimento personalizado 24 horas.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white/10 border border-white/20 rounded-lg p-6 sm:p-8 text-center text-white/80 space-y-3 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 border border-white/20 mx-auto">
              <User size={26} className="text-white" />
            </div>
            <p className="text-lg font-semibold">Nenhum perfil de hóspede disponível</p>
            <p className="text-sm text-white/70 leading-relaxed">Atribua um quarto ou faça o check-in para carregar os dados do hóspede.</p>
          </div>
        )}
      </div>
    </div>
  );
};
