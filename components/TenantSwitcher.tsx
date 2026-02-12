/**
 * Seletor de Tenant para Desenvolvimento
 * Componente auxiliar para facilitar a troca entre pousadas durante testes
 * Só aparece em modo desenvolvimento
 */

import React, { useState } from 'react';
import { useTenant } from '../contexts/TenantContext';
import { MOCK_TENANTS } from '../config/tenants.mock';
import { Settings } from 'lucide-react';

export const TenantSwitcher: React.FC = () => {
  const { tenant, reloadTenant } = useTenant();
  const [isOpen, setIsOpen] = useState(false);
  
  // Só mostra em desenvolvimento (detecta se é localhost ou tem query param)
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.search.includes('tenant=');
  
  if (!isDev) {
    return null;
  }

  const switchTenant = (slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tenant', slug);
    window.location.href = url.toString();
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'bg-gray-500';
      case 'premium': return 'bg-blue-500';
      case 'enterprise': return 'bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed top-4 left-4 z-[9999]">
      {/* Botão de Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 text-white p-2 rounded-lg shadow-lg hover:bg-black transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/20"
        title="Trocar Pousada (Dev Mode)"
      >
        <Settings size={16} className={isOpen ? 'animate-spin' : ''} />
        <span className="text-xs font-medium">{tenant?.slug}</span>
      </button>

      {/* Menu de Seleção */}
      {isOpen && (
        <div className="absolute top-12 left-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-2 min-w-[280px] max-h-[400px] overflow-y-auto">
          <div className="px-3 py-2 border-b border-gray-200 mb-2">
            <h3 className="font-bold text-sm text-gray-900">🏨 Trocar Pousada</h3>
            <p className="text-xs text-gray-500 mt-0.5">Modo Desenvolvimento</p>
          </div>
          
          <div className="space-y-1">
            {MOCK_TENANTS.map((t) => (
              <button
                key={t.id}
                onClick={() => switchTenant(t.slug)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors hover:bg-gray-100 ${
                  tenant?.id === t.id ? 'bg-blue-50 border-2 border-blue-300' : 'border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                      {t.location}
                    </div>
                  </div>
                  <div>
                    <span className={`${getPlanBadgeColor(t.plan)} text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded`}>
                      {t.plan}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                  <span>⭐ {t.rating}</span>
                  <span>•</span>
                  <span>{t.reviews} reviews</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-gray-200">
            <button
              onClick={() => {
                reloadTenant();
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-xs text-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              🔄 Recarregar Tenant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
