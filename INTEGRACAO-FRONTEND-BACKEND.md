# 🔌 Guia de Integração Frontend ↔ Backend

Este guia mostra como conectar o frontend (que atualmente usa mocks) com o backend real.

---

## 📋 Overview

**Status atual:**
- ✅ Frontend usa `config/tenants.mock.ts` (dados estáticos)
- ✅ Backend tem API completa funcionando
- ⏳ Precisa conectar os dois

**Após integração:**
- Frontend busca dados reais do backend
- Admin pode editar configurações via API
- Upload de imagens vai para S3
- Cache Redis melhora performance

---

## 🔧 Passo a Passo

### 1. Configurar Environment Variables

Criar `.env.local` na raiz do frontend:

```bash
# Backend API URL
VITE_API_URL=http://localhost:3001/api

# Gemini (já existe)
VITE_GEMINI_API_KEY=sua_chave_gemini
```

Para produção (`.env.production`):
```bash
VITE_API_URL=https://seu-backend.railway.app/api
VITE_GEMINI_API_KEY=sua_chave_gemini
```

---

### 2. Atualizar `services/tenantService.ts`

**Substituir todo o conteúdo:**

```typescript
import { TenantConfig } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Extrair slug do tenant da URL
 */
export function getTenantSlugFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  const slugParam = params.get('tenant');
  
  if (slugParam) {
    return slugParam;
  }
  
  // Fallback: usar subdomínio se configurado
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  
  if (subdomain && subdomain !== 'localhost' && subdomain !== 'www') {
    return subdomain;
  }
  
  return null;
}

/**
 * Buscar configuração do tenant do backend
 */
export async function fetchTenantConfig(slug: string): Promise<TenantConfig> {
  try {
    const response = await fetch(`${API_URL}/tenants/slug/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Tenant não encontrado: ${slug}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar tenant:', error);
    throw error;
  }
}

/**
 * Verificar se tenant tem acesso a uma feature
 */
export function hasFeatureAccess(tenant: TenantConfig, feature: string): boolean {
  const planFeatures = {
    BASIC: ['wifi', 'info', 'guest'],
    PREMIUM: ['wifi', 'info', 'guest', 'chat', 'directions', 'weather'],
    ENTERPRISE: ['wifi', 'info', 'guest', 'chat', 'directions', 'weather', 'restaurants', 'analytics'],
  };
  
  const allowedFeatures = planFeatures[tenant.planType] || [];
  return allowedFeatures.includes(feature);
}

/**
 * Registrar evento de analytics
 */
export async function trackEvent(
  slug: string,
  event: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await fetch(`${API_URL}/tenants/track/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, metadata }),
    });
  } catch (error) {
    console.error('Erro ao registrar evento:', error);
    // Não bloqueia a aplicação se analytics falhar
  }
}
```

---

### 3. Atualizar `contexts/AdminContext.tsx`

**Substituir seção de login:**

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    // Salvar token
    localStorage.setItem('authToken', data.access_token);
    
    // Atualizar user
    setUser({
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      tenantSlug: data.user.tenantSlug,
    });

    return true;
  } catch (error: any) {
    console.error('Erro no login:', error);
    throw new Error(error.message || 'Falha na autenticação');
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
  setUser(null);
};

// Verificar se já tem token salvo ao carregar
useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Aqui você pode validar o token com backend se quiser
    // Por enquanto, assume que é válido
    // TODO: Implementar verificação de token
  }
}, []);
```

---

### 4. Criar Serviço de API Helper

Criar `services/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Helper para fazer requests autenticadas
 */
export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Se 401, token expirou
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.reload();
  }

  return response;
}

/**
 * Atualizar configurações do tenant
 */
export async function updateTenantSettings(tenantId: string, data: any) {
  const response = await authenticatedFetch(`/tenants/${tenantId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

/**
 * Upload de imagem
 */
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_URL}/images/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData, // Não adicionar Content-Type, deixa o browser fazer
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

/**
 * Listar imagens do tenant
 */
export async function getTenantImages(tenantId: string) {
  const response = await authenticatedFetch(`/images/tenant/${tenantId}`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar imagens');
  }

  return response.json();
}

/**
 * Deletar imagem
 */
export async function deleteImage(imageId: string) {
  const response = await authenticatedFetch(`/images/${imageId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar imagem');
  }

  return response.json();
}
```

---

### 5. Atualizar `components/admin/TenantSettings.tsx`

**Modificar o handleSave:**

```typescript
import { updateTenantSettings } from '../../services/api';

const handleSave = async () => {
  if (!tenant) return;

  try {
    setIsSaving(true);
    
    await updateTenantSettings(tenant.id, {
      name: formData.name,
      location: formData.location,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      whatsapp: formData.whatsapp,
      wifiNetwork: formData.wifiNetwork,
      wifiPassword: formData.wifiPassword,
      testimonial: formData.testimonial,
    });

    alert('Configurações salvas com sucesso!');
    
    // Recarregar tenant
    window.location.reload();
  } catch (error: any) {
    console.error('Erro ao salvar:', error);
    alert('Erro ao salvar: ' + error.message);
  } finally {
    setIsSaving(false);
  }
};
```

---

### 6. Atualizar `components/admin/ImageManager.tsx`

**Implementar upload real:**

```typescript
import { uploadImage, getTenantImages, deleteImage } from '../../services/api';

export const ImageManager: React.FC = () => {
  const { tenant } = useTenant();
  const [images, setImages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Carregar imagens ao montar
  useEffect(() => {
    if (tenant?.id) {
      loadImages();
    }
  }, [tenant]);

  const loadImages = async () => {
    try {
      const data = await getTenantImages(tenant.id);
      setImages(data);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      const result = await uploadImage(file);
      
      alert('Upload realizado com sucesso!');
      loadImages(); // Recarregar lista
    } catch (error: any) {
      console.error('Erro no upload:', error);
      alert('Erro no upload: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Deletar esta imagem?')) return;

    try {
      await deleteImage(imageId);
      alert('Imagem deletada!');
      loadImages();
    } catch (error: any) {
      alert('Erro ao deletar: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Upload de Imagens</h3>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
          id="file-upload"
        />
        
        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer block"
        >
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-700 font-medium mb-2">
            {isUploading ? 'Enviando...' : 'Clique para fazer upload'}
          </p>
          <p className="text-sm text-slate-500">PNG, JPG até 10MB</p>
        </label>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Galeria</h3>
        
        {images.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Nenhuma imagem ainda</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.filename}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleDelete(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

### 7. Atualizar `components/admin/ThemeCustomizer.tsx`

**Salvar tema no backend:**

```typescript
import { updateTenantSettings } from '../../services/api';

const handleSave = async () => {
  if (!tenant) return;

  try {
    setIsSaving(true);
    
    await updateTenantSettings(tenant.id, {
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      accentColor: colors.accent,
    });

    alert('Tema salvo com sucesso!');
    window.location.reload();
  } catch (error: any) {
    alert('Erro ao salvar: ' + error.message);
  } finally {
    setIsSaving(false);
  }
};
```

---

### 8. Adicionar Tracking de Analytics

Em `App.tsx`, adicionar tracking de mudança de tela:

```typescript
import { trackEvent } from './services/tenantService';

const changeScreen = (newScreen: ScreenName) => {
  setCurrentScreen(newScreen);
  
  // Track analytics
  if (tenant?.slug) {
    trackEvent(tenant.slug, 'screen_change', { 
      screen: newScreen,
      timestamp: new Date().toISOString(),
    });
  }
};
```

Em `components/ChatScreen.tsx`, tracking de mensagens:

```typescript
import { trackEvent } from '../services/tenantService';

const handleSendMessage = async () => {
  // ... existing code ...
  
  // Track
  if (tenant?.slug) {
    trackEvent(tenant.slug, 'chat_message', {
      messageLength: userMessage.length,
      timestamp: new Date().toISOString(),
    });
  }
};
```

---

## ✅ Checklist de Integração

### Preparação
- [ ] Backend rodando em `http://localhost:3001`
- [ ] PostgreSQL + Redis funcionando
- [ ] Migrations executadas
- [ ] Seed executado (3 pousadas criadas)
- [ ] `.env.local` criado no frontend

### Arquivos Atualizados
- [ ] `services/tenantService.ts` - fetch do backend
- [ ] `services/api.ts` - helper criado
- [ ] `contexts/AdminContext.tsx` - login com JWT
- [ ] `components/admin/TenantSettings.tsx` - save via API
- [ ] `components/admin/ImageManager.tsx` - upload S3
- [ ] `components/admin/ThemeCustomizer.tsx` - save tema
- [ ] `App.tsx` - tracking analytics

### Testes
- [ ] Acessar `http://localhost:3000?tenant=villa-monte-verde`
- [ ] Verificar se carrega dados do backend (não mock)
- [ ] Login admin funciona
- [ ] Editar configurações salva no banco
- [ ] Upload de imagem vai para S3
- [ ] Customizar tema atualiza cores
- [ ] Analytics registra eventos

---

## 🐛 Troubleshooting

### Frontend não conecta com backend

**Erro: Failed to fetch**
```bash
# 1. Verificar backend rodando
curl http://localhost:3001/api/health

# 2. Verificar CORS no backend
# Em backend/src/main.ts deve ter:
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});

# 3. Verificar VITE_API_URL no .env.local
cat .env.local
```

### Login retorna 401 Unauthorized

```bash
# Verificar se seed rodou
cd backend
npx ts-node prisma/seed.ts

# Testar login direto
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@villamonteverde.com","password":"admin123"}'

# Deve retornar { "access_token": "..." }
```

### Upload de imagem falha

**Erro: 403 Forbidden (S3)**
```bash
# Verificar credenciais AWS no backend/.env
# Verificar bucket existe e CORS configurado
# Ver guia: SETUP-COMPLETO.md seção AWS S3
```

### Tenant não carrega

```bash
# Verificar slug correto na URL
http://localhost:3000?tenant=villa-monte-verde

# Testar endpoint direto
curl http://localhost:3001/api/tenants/slug/villa-monte-verde

# Verificar Redis cache (opcional)
redis-cli
> GET tenant:villa-monte-verde
```

---

## 🚀 Deploy em Produção

### 1. Deploy Backend (Railway)

Ver guia: [backend/DEPLOY-RAILWAY.md](backend/DEPLOY-RAILWAY.md)

Após deploy, anotar URL: `https://seu-app.up.railway.app`

### 2. Atualizar Frontend

Editar `.env.production`:
```bash
VITE_API_URL=https://seu-backend.railway.app/api
```

### 3. Deploy Frontend (Vercel)

Ver guia: [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

Configurar env variables no Vercel dashboard.

### 4. Atualizar CORS no Backend

Em `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: 'https://seu-app.vercel.app',
  credentials: true,
});
```

Fazer redeploy do backend.

---

## 📝 Notas Importantes

### Cache do Navegador
- Limpar cache após mudanças: `Ctrl + Shift + R`
- Ou usar modo anônimo para testar

### Token JWT
- Expira em 7 dias
- Salvo no localStorage
- Enviado em header: `Authorization: Bearer <token>`

### Rate Limiting
- Backend tem limite de 100 req/min por IP
- Em produção, ajustar conforme necessário

### Segurança
- Nunca commitar `.env` ou `.env.local`
- Usar `.env.example` como template
- Trocar `JWT_SECRET` em produção

---

## ✅ Resultado Final

Após integração completa:

**Frontend:**
- Busca dados reais do backend
- Admin pode editar via API
- Upload de imagens para S3
- Analytics registrados
- Cache Redis melhora performance

**Backend:**
- Serve todas configs via API
- JWT auth protege rotas sensíveis
- PostgreSQL persiste dados
- Redis cacheia tenant configs
- S3 armazena imagens

**Full-stack funcionando! 🎉**

---

**Próximo:** [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md) e [backend/DEPLOY-RAILWAY.md](backend/DEPLOY-RAILWAY.md)

**Desenvolvido para Check-in Pousadas SaaS** 🏨
