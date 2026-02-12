/**
 * Componente de Loading para carregar configurações do tenant
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export const TenantLoading: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-sand-900 to-sand-800 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-sand-300 animate-spin mx-auto mb-4" />
        <p className="text-sand-200 text-lg">Carregando pousada...</p>
      </div>
    </div>
  );
};

/**
 * Componente de Erro quando tenant não é encontrado
 */
interface TenantErrorProps {
  error: string;
  onRetry?: () => void;
}

export const TenantError: React.FC<TenantErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-3">
          Pousada não encontrada
        </h1>
        
        <p className="text-white/80 mb-6">
          {error}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors font-medium"
          >
            Tentar novamente
          </button>
        )}
        
        <div className="mt-8 text-white/60 text-sm">
          <p>Entre em contato com o suporte se o problema persistir</p>
        </div>
      </div>
    </div>
  );
};
