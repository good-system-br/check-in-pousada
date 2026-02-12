/**
 * Componentes Admin simplificados (placeholder)
 */

import React from 'react';
import { Coffee, BarChart3, Users, Zap } from 'lucide-react';

export const MenuManager: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
      <Coffee className="w-16 h-16 text-slate-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-slate-900 mb-2">Gerenciamento de Cardápios</h3>
      <p className="text-slate-600">
        Configure cardápios, frigobar, café da manhã e serviços especiais.
      </p>
    </div>
  );
};

export const Analytics: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
      <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-slate-900 mb-2">Analytics</h3>
      <p className="text-slate-600">
        Visualize estatísticas de uso, features mais acessadas e comportamento dos hóspedes.
      </p>
    </div>
  );
};

export const GuestManager: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
      <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-slate-900 mb-2">Gestão de Hóspedes</h3>
      <p className="text-slate-600">
        Cadastre e gerencie informações dos hóspedes, check-ins e check-outs.
      </p>
    </div>
  );
};

export const Integrations: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
      <Zap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-slate-900 mb-2">Integrações</h3>
      <p className="text-slate-600">
        Conecte com Booking.com, PMS, sistemas de pagamento e outras ferramentas.
      </p>
    </div>
  );
};
