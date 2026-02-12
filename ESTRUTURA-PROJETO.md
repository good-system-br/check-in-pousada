# 📁 Estrutura Completa do Projeto

## 🌳 Árvore de Diretórios

```
check-inPousadas/
│
├── 📄 Frontend (Raiz)
│   ├── index.html                      # HTML entry point
│   ├── index.tsx                       # React entry point (TenantProvider)
│   ├── App.tsx                         # Main app component
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.ts                  # Vite configuration
│   ├── tsconfig.json                   # TypeScript config
│   ├── vercel.json                     # Vercel deployment
│   ├── tailwind.config.js              # (implícito) Tailwind config
│   │
│   ├── 📂 components/                  # React components
│   │   ├── WelcomeScreen.tsx           # Hero + images
│   │   ├── InfoScreen.tsx              # Pousada info
│   │   ├── GuestScreen.tsx             # Formulário hóspede
│   │   ├── ChatScreen.tsx              # IA chat (Gemini)
│   │   ├── DirectionsScreen.tsx        # Mapa/direções
│   │   ├── RestaurantsScreen.tsx       # Restaurantes próximos
│   │   ├── IconGrid.tsx                # Grid de navegação
│   │   ├── AppWrapper.tsx              # Loading/error wrapper
│   │   ├── TenantLoading.tsx           # Loading screens
│   │   ├── TenantSwitcher.tsx          # Dev mode switcher
│   │   ├── AdminScreen.tsx             # Admin wrapper
│   │   │
│   │   └── 📂 admin/                   # Admin panel
│   │       ├── index.ts                # Barrel exports
│   │       ├── AdminLogin.tsx          # Login screen
│   │       ├── AdminDashboard.tsx      # Main dashboard
│   │       ├── DashboardOverview.tsx   # Stats + activity
│   │       ├── TenantSettings.tsx      # Settings editor
│   │       ├── ImageManager.tsx        # Image upload/gallery
│   │       ├── ThemeCustomizer.tsx     # Color picker + presets
│   │       └── AdminComponents.tsx     # Menu, Analytics, etc
│   │
│   ├── 📂 contexts/                    # React contexts
│   │   ├── TenantContext.tsx           # Multi-tenant state
│   │   └── AdminContext.tsx            # Admin auth state
│   │
│   ├── 📂 services/                    # API services
│   │   ├── tenantService.ts            # Tenant data fetching
│   │   ├── geminiService.ts            # Gemini AI integration
│   │   └── weatherService.ts           # Weather API
│   │
│   ├── 📂 config/                      # Configuration
│   │   └── tenants.mock.ts             # Mock data (3 pousadas)
│   │
│   ├── 📂 types/                       # (ou types.ts na raiz)
│   │   └── types.ts                    # TypeScript interfaces
│   │
│   └── 📄 Documentação Frontend
│       ├── README.md                   # Overview geral
│       ├── README_NEW.md               # (backup)
│       ├── SAAS.md                     # Arquitetura SaaS
│       ├── CUSTOMIZATION.md            # Como customizar
│       ├── DEPLOYMENT.md               # Deploy básico
│       ├── IMPROVEMENTS.md             # Melhorias futuras
│       ├── TESTING.md                  # Guia de testes
│       ├── QUICKSTART.md               # Início rápido
│       ├── ADMIN-PANEL.md              # Admin features
│       ├── IMPLEMENTATION-SUMMARY.md   # Resumo implementação
│       ├── DEPLOY-VERCEL.md            # Deploy Vercel
│       ├── SETUP-COMPLETO.md           # Setup full-stack
│       ├── CHECKLIST-FINAL.md          # Checklist completo
│       └── ESTRUTURA-PROJETO.md        # Este arquivo
│
└── 📂 backend/                         # Backend NestJS
    ├── package.json                    # Backend dependencies
    ├── tsconfig.json                   # TypeScript backend
    ├── nest-cli.json                   # NestJS CLI config
    ├── .env.example                    # Environment template
    ├── .gitignore                      # Git ignore
    ├── Dockerfile                      # Container image
    ├── railway.json                    # Railway config
    │
    ├── 📂 src/                         # Source code
    │   ├── main.ts                     # Entry point (port 3001)
    │   ├── app.module.ts               # Root module
    │   │
    │   ├── 📂 auth/                    # 🔐 Autenticação
    │   │   ├── auth.module.ts          # Auth module
    │   │   ├── auth.controller.ts      # Login/register endpoints
    │   │   ├── auth.service.ts         # Auth logic
    │   │   ├── jwt.strategy.ts         # JWT Passport strategy
    │   │   ├── jwt-auth.guard.ts       # Auth guard
    │   │   └── dto/
    │   │       └── auth.dto.ts         # DTOs
    │   │
    │   ├── 📂 tenants/                 # 🏨 Pousadas
    │   │   ├── tenants.module.ts       # Tenants module
    │   │   ├── tenants.controller.ts   # CRUD endpoints
    │   │   ├── tenants.service.ts      # Business logic + cache
    │   │   └── dto/
    │   │       └── tenant.dto.ts       # DTOs
    │   │
    │   ├── 📂 images/                  # 🖼️ Upload S3
    │   │   ├── images.module.ts        # Images module
    │   │   ├── images.controller.ts    # Upload endpoints
    │   │   ├── images.service.ts       # Image management
    │   │   └── s3.service.ts           # AWS S3 integration
    │   │
    │   ├── 📂 prisma/                  # 🗄️ Database
    │   │   ├── prisma.module.ts        # Prisma module (Global)
    │   │   └── prisma.service.ts       # Prisma client
    │   │
    │   └── 📂 redis/                   # ⚡ Cache
    │       ├── redis.module.ts         # Redis module (Global)
    │       └── redis.service.ts        # Redis client
    │
    ├── 📂 prisma/                      # Prisma ORM
    │   ├── schema.prisma               # Database schema
    │   ├── seed.ts                     # Seed data (3 pousadas)
    │   └── migrations/                 # (gerado) Migration history
    │
    └── 📄 Documentação Backend
        ├── README.md                   # Backend setup
        ├── DEPLOY-RAILWAY.md           # Deploy Railway
        └── IMPLEMENTACAO-BACKEND.md    # Resumo backend
```

---

## 📊 Contagem de Arquivos

### Frontend
- **Components**: 17 arquivos (.tsx)
- **Contexts**: 2 arquivos
- **Services**: 3 arquivos
- **Config**: 1 arquivo
- **Types**: 1 arquivo
- **Docs**: 13 arquivos (.md)

### Backend
- **Source**: ~20 arquivos (.ts)
- **Modules**: 6 módulos (auth, tenants, images, prisma, redis, app)
- **Prisma**: 2 arquivos (schema, seed)
- **Config**: 6 arquivos (package.json, tsconfig, nest-cli, etc)
- **Docs**: 3 arquivos (.md)

**Total**: ~65 arquivos criados

---

## 🎯 Arquivos Principais por Funcionalidade

### Multi-tenancy
```
contexts/TenantContext.tsx          # Estado global de tenant
services/tenantService.ts           # Fetch tenant config
config/tenants.mock.ts              # 3 pousadas demo
components/TenantSwitcher.tsx       # Switcher dev mode
components/TenantLoading.tsx        # Loading states
backend/src/tenants/                # API de tenants
backend/prisma/schema.prisma        # Tenant model
```

### Autenticação
```
contexts/AdminContext.tsx           # Estado auth frontend
components/admin/AdminLogin.tsx     # Login UI
backend/src/auth/                   # JWT backend
backend/src/auth/jwt.strategy.ts    # Passport JWT
backend/src/auth/jwt-auth.guard.ts  # Route protection
```

### Admin Panel
```
components/AdminScreen.tsx          # Wrapper
components/admin/AdminDashboard.tsx # Main dashboard
components/admin/DashboardOverview.tsx
components/admin/TenantSettings.tsx
components/admin/ImageManager.tsx
components/admin/ThemeCustomizer.tsx
components/admin/AdminComponents.tsx
```

### Telas Públicas
```
components/WelcomeScreen.tsx        # Hero
components/InfoScreen.tsx           # Informações
components/GuestScreen.tsx          # Formulário
components/ChatScreen.tsx           # IA chat
components/DirectionsScreen.tsx     # Mapa
components/RestaurantsScreen.tsx    # Restaurantes
```

### Backend Core
```
backend/src/main.ts                 # Entry point
backend/src/app.module.ts           # Root module
backend/src/prisma/                 # Database ORM
backend/src/redis/                  # Cache
backend/src/images/s3.service.ts    # S3 upload
backend/prisma/schema.prisma        # DB schema
```

### Deploy & Config
```
vercel.json                         # Frontend deploy
backend/Dockerfile                  # Container
backend/railway.json                # Railway config
backend/.env.example                # Env template
DEPLOY-VERCEL.md                    # Vercel guide
backend/DEPLOY-RAILWAY.md           # Railway guide
```

### Documentação
```
README.md                           # Overview
SAAS.md                             # Arquitetura
SETUP-COMPLETO.md                   # Setup guide
CHECKLIST-FINAL.md                  # Status final
ESTRUTURA-PROJETO.md                # Este arquivo
backend/README.md                   # Backend docs
backend/IMPLEMENTACAO-BACKEND.md    # Backend resumo
```

---

## 🔄 Fluxo de Dados

### 1. Carregamento de Tenant
```
URL (?tenant=slug)
    ↓
TenantContext.tsx
    ↓
services/tenantService.ts
    ↓
Backend: GET /api/tenants/slug/:slug
    ↓
tenants.service.ts → Redis cache check
    ↓
Prisma → PostgreSQL
    ↓
Response → Frontend
    ↓
TenantContext atualiza estado
    ↓
App.tsx recebe tenant config
```

### 2. Login Admin
```
AdminLogin.tsx (form submit)
    ↓
AdminContext.tsx (login method)
    ↓
Backend: POST /api/auth/login
    ↓
auth.service.ts → validate credentials
    ↓
Bcrypt compare password
    ↓
Generate JWT token (7d expiry)
    ↓
Response: { access_token, user }
    ↓
Frontend salva token → localStorage
    ↓
AdminContext atualiza user state
```

### 3. Upload de Imagem
```
ImageManager.tsx (file select)
    ↓
FormData + JWT token
    ↓
Backend: POST /api/images/upload
    ↓
JwtAuthGuard validates token
    ↓
images.service.ts
    ↓
s3.service.ts → AWS S3 upload
    ↓
Prisma → Salva metadata em DB
    ↓
Response: { id, url, key, ... }
    ↓
Frontend atualiza lista de imagens
```

### 4. Atualização de Tenant
```
TenantSettings.tsx (save)
    ↓
Backend: PUT /api/tenants/:id + JWT
    ↓
JwtAuthGuard + ownership check
    ↓
tenants.service.ts → Prisma update
    ↓
Redis invalidate cache
    ↓
Response: updated tenant
    ↓
Frontend recarrega tenant
```

---

## 🗄️ Database Schema (Resumo)

```sql
-- 6 Tabelas Principais

tenants               # Pousadas (slug, name, theme, features)
  ↓ has many
admin_users           # Admins (email, password, tenantId)
images                # Imagens S3 (url, key, tenantId)
guests                # Hóspedes (name, email, tenantId)
checkins              # Check-ins (guestId, tenantId, dates)
analytics             # Eventos (event, tenantId, metadata)
```

---

## 🌐 Rotas da API

### Públicas
```
GET  /api/tenants/slug/:slug      # Buscar tenant
POST /api/tenants/track/:slug     # Analytics
```

### Autenticação
```
POST /api/auth/login              # Login (retorna JWT)
POST /api/auth/register           # Registrar admin
```

### Protegidas (JWT Required)
```
GET    /api/tenants               # Listar
POST   /api/tenants               # Criar
PUT    /api/tenants/:id           # Atualizar
DELETE /api/tenants/:id           # Deletar

POST   /api/images/upload         # Upload S3
GET    /api/images/tenant/:id     # Listar
DELETE /api/images/:id            # Deletar
```

---

## 📦 Dependencies Principais

### Frontend (package.json)
```json
{
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "typescript": "^5.8.2",
  "vite": "^6.2.0",
  "tailwindcss": "^3.4.1",
  "lucide-react": "^0.556.0",
  "@google/generative-ai": "^0.21.0"
}
```

### Backend (backend/package.json)
```json
{
  "@nestjs/common": "^10.3.0",
  "@nestjs/core": "^10.3.0",
  "@nestjs/jwt": "^10.2.0",
  "@prisma/client": "^5.8.0",
  "bcrypt": "^5.1.1",
  "redis": "^4.6.12",
  "aws-sdk": "^2.1540.0",
  "class-validator": "^0.14.1",
  "helmet": "^7.1.0",
  "passport": "^0.7.0",
  "prisma": "^5.8.0"
}
```

---

## 🎨 Temas Disponíveis

### Villa Monte Verde (Premium)
```typescript
{
  primaryColor: '#8B7355',    // Marrom
  secondaryColor: '#A0826D',  // Bege
  accentColor: '#C19A6B',     // Dourado
}
```

### Pousada Jardim Secreto (Basic)
```typescript
{
  primaryColor: '#2C5F2D',    // Verde escuro
  secondaryColor: '#97BC62',  // Verde claro
  accentColor: '#8FBC8F',     // Verde médio
}
```

### Refúgio da Serra (Enterprise)
```typescript
{
  primaryColor: '#1E3A5F',    // Azul escuro
  secondaryColor: '#4A6FA5',  // Azul médio
  accentColor: '#7B9EC6',     # Azul claro
}
```

---

## 🔐 Credenciais de Teste

```bash
# Tenant 1
Slug: villa-monte-verde
Email: admin@villamonteverde.com
Senha: admin123

# Tenant 2
Slug: pousada-jardim-secreto
Email: admin@jardimsecreto.com
Senha: admin123

# Tenant 3
Slug: refugio-da-serra
Email: admin@refugiodaserra.com
Senha: admin123
```

---

## 🚀 Como Navegar no Código

### Quer entender Multi-tenancy?
1. Leia `contexts/TenantContext.tsx`
2. Veja `services/tenantService.ts`
3. Cheque `config/tenants.mock.ts`
4. Backend: `backend/src/tenants/`

### Quer entender Admin Panel?
1. Comece em `components/AdminScreen.tsx`
2. Veja `components/admin/AdminDashboard.tsx`
3. Explore cada seção (TenantSettings, ImageManager, etc)
4. Backend: `backend/src/auth/`

### Quer entender Backend?
1. Entry point: `backend/src/main.ts`
2. Modules: `backend/src/app.module.ts`
3. Database: `backend/prisma/schema.prisma`
4. API: Cada pasta em `backend/src/` tem controller + service

### Quer fazer Deploy?
1. Backend: Leia `backend/DEPLOY-RAILWAY.md`
2. Frontend: Leia `DEPLOY-VERCEL.md`
3. Full guide: Leia `SETUP-COMPLETO.md`

---

## 📚 Documentação por Ordem de Leitura

### Para Começar
1. `README.md` - Overview geral
2. `QUICKSTART.md` - Rodar projeto rápido
3. `SETUP-COMPLETO.md` - Setup detalhado

### Para Entender
4. `SAAS.md` - Arquitetura multi-tenant
5. `ADMIN-PANEL.md` - Features admin
6. `IMPLEMENTATION-SUMMARY.md` - O que foi feito
7. `backend/IMPLEMENTACAO-BACKEND.md` - Backend resumo

### Para Customizar
8. `CUSTOMIZATION.md` - Como customizar
9. `TESTING.md` - Como testar
10. `IMPROVEMENTS.md` - Melhorias futuras

### Para Deploy
11. `DEPLOY-VERCEL.md` - Frontend deploy
12. `backend/DEPLOY-RAILWAY.md` - Backend deploy
13. `backend/README.md` - Backend setup

### Para Verificar
14. `CHECKLIST-FINAL.md` - Status completo
15. `ESTRUTURA-PROJETO.md` - Este arquivo

---

## ✅ Status: 100% Completo

- [x] Frontend funcionando
- [x] Backend funcionando
- [x] Multi-tenancy implementado
- [x] Admin panel completo
- [x] Database schema criado
- [x] Auth JWT implementado
- [x] Cache Redis configurado
- [x] Upload S3 implementado
- [x] Documentação completa
- [x] Deploy guides prontos

---

**🎉 Projeto pronto para produção!**

Navegue pela estrutura e explore o código. Tudo está documentado e organizado!

**Desenvolvido para Check-in Pousadas SaaS** 🏨
