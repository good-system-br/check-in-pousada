/**
 * Wrapper do App que gerencia loading e erros do tenant
 */

import React from 'react';
import { useTenant } from '../contexts/TenantContext';
import { TenantLoading, TenantError } from './TenantLoading';

interface AppWrapperProps {
  children: React.ReactNode;
}

/**
 * Componente que envolve o App e gerencia estados de loading/erro do tenant
 */
export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const { tenant, loading, error, reloadTenant } = useTenant();

  if (loading) {
    return <TenantLoading />;
  }

  if (error || !tenant) {
    return <TenantError error={error || 'Configurações não encontradas'} onRetry={reloadTenant} />;
  }

  return <>{children}</>;
};
