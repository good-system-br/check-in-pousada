# Deploy Frontend - Vercel

Guia completo para fazer deploy do frontend React no Vercel.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Backend deployado no Railway
- Código no GitHub

## 🚀 Passo a Passo

### 1. Preparar Frontend

Criar arquivo `.env.production` na raiz do projeto:

```bash
VITE_API_URL=https://seu-backend.up.railway.app/api
VITE_GEMINI_API_KEY=sua_chave_gemini
```

### 2. Atualizar Services

Modificar `services/tenantService.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function fetchTenantConfig(slug: string): Promise<TenantConfig> {
  try {
    const response = await fetch(`${API_URL}/tenants/slug/${slug}`);
    if (!response.ok) throw new Error('Tenant not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenant:', error);
    throw error;
  }
}

export async function trackEvent(slug: string, event: string, metadata?: any) {
  try {
    await fetch(`${API_URL}/tenants/track/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, metadata }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}
```

Modificar `contexts/AdminContext.tsx`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// No login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

const data = await response.json();
if (!response.ok) throw new Error(data.message);

// Salvar token
localStorage.setItem('token', data.access_token);
setUser(data.user);
```

### 3. Deploy no Vercel

#### Via Dashboard

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte sua conta GitHub
3. Selecione o repositório `check-inPousadas`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na raiz do projeto
cd check-inPousadas
vercel

# Seguir prompts:
# - Set up and deploy? Y
# - Which scope? Sua conta
# - Link to existing project? N
# - Project name? check-in-pousadas
# - Directory? ./
# - Want to override settings? N

# Deploy para produção
vercel --prod
```

### 4. Configurar Variáveis de Ambiente

No Vercel dashboard → seu projeto → **Settings** → **Environment Variables**:

```bash
VITE_API_URL=https://seu-backend.up.railway.app/api
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

Após adicionar, fazer redeploy:
```bash
vercel --prod
```

### 5. Configurar Domínios Customizados (Opcional)

**Para cada pousada ter subdomínio próprio:**

#### Opção 1: Subdomínios Vercel
No Vercel dashboard → **Domains**:
- `villa-monte-verde.seu-dominio.com`
- `jardim-secreto.seu-dominio.com`
- `refugio-serra.seu-dominio.com`

#### Opção 2: Redirecionar via Query Param
Todo acesso vai para: `seu-app.vercel.app?tenant=slug`

Adicionar em `App.tsx`:
```typescript
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tenantParam = params.get('tenant');
  if (tenantParam && !slug) {
    window.history.replaceState({}, '', `/?tenant=${tenantParam}`);
  }
}, []);
```

### 6. Configurar CORS no Backend

No backend (Railway), atualizar `main.ts`:

```typescript
app.enableCors({
  origin: [
    'https://seu-app.vercel.app',
    'https://villa-monte-verde.seu-dominio.com',
    'https://jardim-secreto.seu-dominio.com',
    // ... outros domínios
  ],
  credentials: true,
});
```

Ou permitir todos subdomínios:
```typescript
app.enableCors({
  origin: (origin, callback) => {
    if (!origin || origin.endsWith('.vercel.app') || origin.endsWith('.seu-dominio.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});
```

### 7. Otimizações de Performance

Adicionar em `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide': ['lucide-react'],
        },
      },
    },
  },
  server: {
    host: true,
  },
});
```

### 8. Adicionar Analytics (Opcional)

```bash
npm install @vercel/analytics
```

Em `main.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TenantProvider>
      <App />
    </TenantProvider>
    <Analytics />
  </React.StrictMode>
);
```

## ✅ Verificar Deploy

1. Acessar URL gerada pelo Vercel
2. Testar tenant: `https://seu-app.vercel.app?tenant=villa-monte-verde`
3. Verificar se carrega dados do backend
4. Testar admin login

## 🔧 Troubleshooting

### Build Failed
```bash
# Verificar logs no Vercel dashboard
# Comum: dependências faltando

# Garantir que package.json tem todas deps
npm install
```

### API não conecta
1. Verificar `VITE_API_URL` está correto
2. Testar backend direto: `curl https://seu-backend.railway.app/api/health`
3. Verificar CORS no backend

### Tenant não carrega
1. Verificar se `fetchTenantConfig` está chamando API correta
2. Ver console do navegador para erros
3. Testar endpoint direto: `https://seu-backend.railway.app/api/tenants/slug/villa-monte-verde`

## 🌐 URLs Finais

Após deploy, você terá:

**Frontend**:
- Main: `https://check-in-pousadas.vercel.app`
- Tenant 1: `https://check-in-pousadas.vercel.app?tenant=villa-monte-verde`
- Tenant 2: `https://check-in-pousadas.vercel.app?tenant=pousada-jardim-secreto`
- Tenant 3: `https://check-in-pousadas.vercel.app?tenant=refugio-da-serra`

**Backend**:
- API: `https://seu-app.up.railway.app/api`

## 💰 Custos

Vercel oferece:
- **Hobby**: Grátis (100GB bandwidth/mês)
- **Pro**: $20/mês (1TB bandwidth/mês)

Para começar, Hobby é suficiente!

## 🔐 Segurança

- [ ] HTTPS ativado (automático no Vercel)
- [ ] Environment variables configuradas
- [ ] CORS configurado no backend
- [ ] Credenciais nunca commitadas no Git

## 📊 Monitoramento

Vercel oferece:
- Speed Insights
- Web Vitals
- Analytics de acesso
- Error tracking

Acesse: Dashboard → seu projeto → **Analytics**

---

✅ **Frontend deployado com sucesso!**

🎉 Seu SaaS está no ar: frontend no Vercel + backend no Railway!

## 🚀 Próximos Passos

1. Configurar domínio customizado
2. Adicionar mais tenants via admin panel
3. Configurar email notifications
4. Adicionar pagamento (Stripe/PagSeguro)
5. Melhorar analytics
