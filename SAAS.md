# 🏨 Sistema Multi-Tenant SaaS - Check-in Pousadas

## ✅ Implementado

O projeto agora está preparado para funcionar como um **SaaS multi-tenant**, permitindo que múltiplas pousadas usem a mesma aplicação com suas configurações personalizadas.

## 🏗️ Arquitetura Implementada

### 1. **Tipos e Interfaces** ([types.ts](types.ts))
- `TenantConfig`: Configuração completa de cada pousada
- `PlanType`: Três planos (basic, premium, enterprise)
- `TenantTheme`: Temas personalizados por pousada

### 2. **Contexto de Tenant** ([contexts/TenantContext.tsx](contexts/TenantContext.tsx))
- `TenantProvider`: Provê configurações do tenant para toda a aplicação
- `useTenant()`: Hook para acessar dados do tenant
- Carregamento automático baseado na URL
- Aplicação de temas customizados

### 3. **Serviço de Tenant** ([services/tenantService.ts](services/tenantService.ts))
- `getTenantSlugFromURL()`: Detecta qual pousada acessar
- `fetchTenantConfig()`: Busca configurações (mock por enquanto)
- `hasFeatureAccess()`: Controla acesso a features por plano

### 4. **Configurações Mock** ([config/tenants.mock.ts](config/tenants.mock.ts))
Três pousadas de exemplo:
- **Villa Monte Verde** (Premium) - Original
- **Pousada Jardim Secreto** (Basic) - Campos do Jordão
- **Refúgio da Serra** (Enterprise) - Gramado

### 5. **Componentes de UI**
- `TenantLoading`: Loading durante carregamento
- `TenantError`: Tela de erro quando tenant não encontrado
- `AppWrapper`: Gerencia estados de loading/erro

## 🧪 Como Testar

### Opção 1: Query Parameter (Desenvolvimento)
```
http://localhost:5173/?tenant=villa-monte-verde
http://localhost:5173/?tenant=pousada-jardim-secreto
http://localhost:5173/?tenant=refugio-da-serra
```

### Opção 2: Subdomínios (Produção Simulada)
Configure seu `/etc/hosts` (Linux/Mac) ou `C:\Windows\System32\drivers\etc\hosts`:
```
127.0.0.1 villa-monte-verde.localhost
127.0.0.1 pousada-jardim-secreto.localhost
127.0.0.1 refugio-da-serra.localhost
```

Acesse:
```
http://villa-monte-verde.localhost:5173
http://pousada-jardim-secreto.localhost:5173
http://refugio-da-serra.localhost:5173
```

## 🎨 Personalização por Tenant

Cada pousada pode customizar:
- ✅ Nome, localização, endereço
- ✅ Cores do tema (primária, secundária, accent)
- ✅ Logo e imagens
- ✅ Mensagens de boas-vindas
- ✅ Informações de Wi-Fi
- ✅ Contatos (telefone, WhatsApp, email)
- ✅ Menu items personalizados
- ✅ Dados do Google Maps

## 📊 Planos e Features

### Basic ($29/mês)
- Wi-Fi info
- Direções
- Informações básicas
- Perfil do hóspede
- Até 10 quartos

### Premium ($79/mês)
- Tudo do Basic +
- Chat AI ilimitado
- Restaurantes
- Tema customizado
- Até 50 quartos
- Suporte prioritário

### Enterprise ($199/mês)
- Tudo do Premium +
- Analytics avançado
- White-label (domínio próprio)
- API de acesso
- Quartos ilimitados
- Suporte 24/7

## 🚀 Próximos Passos para SaaS Completo

### Backend (Necessário)
```typescript
// API endpoints necessários:
POST   /api/tenants                  // Criar nova pousada
GET    /api/tenants/:slug            // Buscar configurações
PUT    /api/tenants/:slug            // Atualizar configurações
DELETE /api/tenants/:slug            // Desativar pousada

POST   /api/auth/register            // Registro de novo cliente
POST   /api/auth/login               // Login
GET    /api/auth/me                  // Dados do usuário

POST   /api/subscriptions            // Criar assinatura
GET    /api/subscriptions/:id        // Status da assinatura
POST   /api/subscriptions/:id/cancel // Cancelar assinatura
```

### Painel Administrativo
Criar dashboard para donos de pousadas:
- [ ] Login/registro
- [ ] Configurações da pousada
- [ ] Upload de imagens e logo
- [ ] Customização de cores
- [ ] Gerenciamento de cardápios
- [ ] Analytics de uso
- [ ] Gestão de hóspedes
- [ ] Configuração de integrações

### Infraestrutura
- [ ] Backend NestJS/Express
- [ ] Banco PostgreSQL com Prisma
- [ ] Storage S3 para imagens
- [ ] Redis para cache
- [ ] Stripe para pagamentos
- [ ] Deploy: Vercel (frontend) + Railway (backend)

### Autenticação & Segurança
- [ ] JWT authentication
- [ ] Rate limiting por tenant
- [ ] RBAC (Role-Based Access Control)
- [ ] Logs de auditoria

### Features Adicionais
- [ ] Sistema de notificações
- [ ] Integrações (PMS, Booking.com, etc)
- [ ] Multi-idioma
- [ ] PWA offline
- [ ] Analytics em tempo real

## 💻 Estrutura de Código

```
check-inPousadas/
├── contexts/
│   └── TenantContext.tsx         # Gerenciamento do tenant
├── services/
│   └── tenantService.ts          # Lógica de busca de tenant
├── config/
│   └── tenants.mock.ts           # Dados mock (substituir por API)
├── components/
│   ├── AppWrapper.tsx            # Wrapper com loading/erro
│   └── TenantLoading.tsx         # Componentes de UI
├── types.ts                       # Tipos do sistema
└── App.tsx                        # App atualizado com useTenant
```

## 🔄 Migração da API

Para conectar com backend real, edite [services/tenantService.ts](services/tenantService.ts):

```typescript
export async function fetchTenantConfig(slug: string): Promise<TenantConfig | null> {
  try {
    // Substituir por chamada real
    const response = await fetch(`${API_URL}/api/tenants/${slug}`);
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar tenant:', error);
    return null;
  }
}
```

## 📝 Exemplo de Uso no Código

```typescript
import { useTenant } from './contexts/TenantContext';

function MyComponent() {
  const { tenant, loading, error } = useTenant();
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return (
    <div>
      <h1>{tenant.name}</h1>
      <p>Wi-Fi: {tenant.wifi.networkName}</p>
      <p>Plano: {tenant.plan}</p>
    </div>
  );
}
```

## 🎯 Benefícios da Arquitetura

1. ✅ **Isolamento de dados** - Cada pousada tem suas configurações
2. ✅ **Escalabilidade** - Adicionar novas pousadas sem código
3. ✅ **Personalização** - Temas e conteúdo por pousada
4. ✅ **Monetização** - Planos com diferentes features
5. ✅ **Manutenção** - Código único para todos os clientes

## 📞 Suporte

Para dúvidas sobre a implementação SaaS:
- Documentação: [README.md](README.md)
- Issues: GitHub Issues
- Email: suporte@checkinpousadas.com
