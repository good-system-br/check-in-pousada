/**
 * Visão Geral do Dashboard
 */

import React from 'react';
import { Users, Eye, TrendingUp, Star } from 'lucide-react';
import { useTenant } from '../../contexts/TenantContext';

export const DashboardOverview: React.FC = () => {
  const { tenant } = useTenant();

  const stats = [
    { label: 'Hóspedes Ativos', value: '12', icon: Users, color: 'blue', change: '+3' },
    { label: 'Visualizações Hoje', value: '48', icon: Eye, color: 'green', change: '+12%' },
    { label: 'Taxa de Ocupação', value: '85%', icon: TrendingUp, color: 'purple', change: '+5%' },
    { label: 'Avaliação Média', value: tenant?.rating.toFixed(1) || '0', icon: Star, color: 'yellow', change: '+0.2' },
  ];

  const recentActivities = [
    { time: '10 min atrás', action: 'Novo check-in', user: 'João Silva - Quarto 101' },
    { time: '1 hora atrás', action: 'Pedido frigobar', user: 'Maria Santos - Quarto 205' },
    { time: '2 horas atrás', action: 'Check-out', user: 'Pedro Costa - Quarto 303' },
    { time: '3 horas atrás', action: 'Novo check-in', user: 'Ana Lima - Quarto 102' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-semibold text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-lg`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-600">{activity.user}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left">
              <p className="font-semibold text-blue-900 mb-1">Novo Check-in</p>
              <p className="text-xs text-blue-700">Registrar hóspede</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-left">
              <p className="font-semibold text-green-900 mb-1">Ver Reservas</p>
              <p className="text-xs text-green-700">Próximos 7 dias</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left">
              <p className="font-semibold text-purple-900 mb-1">Relatórios</p>
              <p className="text-xs text-purple-700">Gerar relatório</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-left">
              <p className="font-semibold text-orange-900 mb-1">Suporte</p>
              <p className="text-xs text-orange-700">Falar com equipe</p>
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Bem-vindo ao Painel Admin! 👋</h3>
        <p className="text-blue-100 mb-6">
          Gerencie sua pousada de forma simples e eficiente. Todas as ferramentas que você precisa em um só lugar.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
            Ver Tutorial
          </button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors">
            Documentação
          </button>
        </div>
      </div>
    </div>
  );
};
