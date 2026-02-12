/**
 * Serviço de gerenciamento de Tenants (Pousadas)
 * Responsável por buscar e gerenciar configurações de múltiplas pousadas
 */

import { TenantConfig } from '../types';
import { MOCK_TENANTS } from '../config/tenants.mock';

/**
 * Obtém o slug do tenant a partir da URL
 * Suporta subdomínios e query params para testes
 */
export function getTenantSlugFromURL(): string {
  // Em desenvolvimento, permite usar ?tenant=slug
  const urlParams = new URLSearchParams(window.location.search);
  const queryTenant = urlParams.get('tenant');
  if (queryTenant) {
    return queryTenant;
  }

  // Em produção, pega do subdomínio
  const hostname = window.location.hostname;
  
  // Se for localhost ou IP, usa o tenant padrão
  if (hostname === 'localhost' || hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    return 'villa-monte-verde'; // tenant padrão para desenvolvimento
  }
  
  // Extrai subdomínio: villa-monte-verde.checkinpousadas.com -> villa-monte-verde
  const parts = hostname.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }
  
  // Domínio customizado - usar o hostname como slug
  return hostname.replace(/\./g, '-');
}

/**
 * Busca configuração do tenant
 * Em produção, isso faria uma chamada à API
 */
export async function fetchTenantConfig(slug: string): Promise<TenantConfig | null> {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // TODO: Em produção, substituir por chamada real à API
  // const response = await fetch(`/api/tenants/${slug}`);
  // return response.json();
  
  // Por enquanto, usa dados mock
  const tenant = MOCK_TENANTS.find(t => t.slug === slug);
  
  if (!tenant || !tenant.active) {
    return null;
  }
  
  return tenant;
}

/**
 * Busca todos os tenants (para admin)
 */
export async function fetchAllTenants(): Promise<TenantConfig[]> {
  // TODO: Em produção, chamar API com autenticação
  return MOCK_TENANTS.filter(t => t.active);
}

/**
 * Valida se o tenant está ativo e tem acesso a uma feature
 */
export function hasFeatureAccess(tenant: TenantConfig, feature: string): boolean {
  const featuresByPlan: Record<string, string[]> = {
    basic: ['wifi', 'directions', 'info', 'guest'],
    premium: ['wifi', 'directions', 'info', 'guest', 'chat', 'restaurants', 'theme'],
    enterprise: ['wifi', 'directions', 'info', 'guest', 'chat', 'restaurants', 'theme', 'analytics', 'whitelabel'],
  };
  
  return featuresByPlan[tenant.plan]?.includes(feature) ?? false;
}
