/**
 * Contexto de Tenant (Multi-tenant)
 * Gerencia qual pousada está sendo acessada e suas configurações
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TenantConfig } from '../types';
import { fetchTenantConfig, getTenantSlugFromURL } from '../services/tenantService';

interface TenantContextType {
  tenant: TenantConfig | null;
  loading: boolean;
  error: string | null;
  reloadTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
}

/**
 * Provider que carrega e fornece a configuração do tenant atual
 */
export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTenant = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const slug = getTenantSlugFromURL();
      console.log('🏨 Carregando tenant:', slug);
      
      const tenantData = await fetchTenantConfig(slug);
      
      if (!tenantData) {
        setError('Pousada não encontrada ou inativa');
        setTenant(null);
      } else {
        setTenant(tenantData);
        console.log('✅ Tenant carregado:', tenantData.name);
        
        // Aplica tema customizado se existir
        if (tenantData.theme) {
          applyTheme(tenantData.theme);
        }
      }
    } catch (err) {
      console.error('❌ Erro ao carregar tenant:', err);
      setError('Erro ao carregar configurações da pousada');
      setTenant(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTenant();
  }, []);

  const reloadTenant = async () => {
    await loadTenant();
  };

  return (
    <TenantContext.Provider value={{ tenant, loading, error, reloadTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

/**
 * Hook para acessar o tenant atual
 */
export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant deve ser usado dentro de um TenantProvider');
  }
  return context;
};

/**
 * Aplica cores do tema customizado
 */
function applyTheme(theme: TenantConfig['theme']) {
  if (!theme) return;
  
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primaryColor);
  root.style.setProperty('--secondary-color', theme.secondaryColor);
  root.style.setProperty('--accent-color', theme.accentColor);
  
  console.log('🎨 Tema aplicado:', theme);
}
