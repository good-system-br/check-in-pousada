# 🚀 Guia Completo de Setup - Check-in Pousadas SaaS

Este guia cobre TODO o setup: desenvolvimento local, backend, frontend e deploy em produção.

---

## 📑 Índice

1. [Setup Desenvolvimento Local](#1-setup-desenvolvimento-local)
2. [Backend (NestJS + PostgreSQL + Redis)](#2-backend-nestjs--postgresql--redis)
3. [Frontend (React + Vite)](#3-frontend-react--vite)
4. [AWS S3 Configuration](#4-aws-s3-configuration)
5. [Deploy Produção](#5-deploy-produção)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Setup Desenvolvimento Local

### Pré-requisitos

```bash
# Node.js 18+
node --version  # v18.0.0+

# PostgreSQL
psql --version  # 14+

# Redis (opcional para local, mas recomendado)
redis-cli --version  # 6+
```

### Instalar PostgreSQL (Windows)

1. Download: https://www.postgresql.org/download/windows/
2. Instalar com pgAdmin
3. Senha: anotar para usar no `.env`
4. Criar database:
   ```sql
   CREATE DATABASE checkin_pousadas;
   ```

### Instalar Redis (Windows)

**Opção 1: Via WSL**
```bash
wsl
sudo apt install redis-server
redis-server
```

**Opção 2: Docker**
```bash
docker run -d -p 6379:6379 redis:alpine
```

**Opção 3: Memurai (Redis para Windows)**
Download: https://www.memurai.com/get-memurai

---

## 2. Backend (NestJS + PostgreSQL + Redis)

### Setup Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar .env
cp .env.example .env
```

### Configurar `.env`

```bash
# Database (local)
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/checkin_pousadas?schema=public"

# JWT
JWT_SECRET="chave-super-secreta-mudar-em-producao-123456789"
JWT_EXPIRES_IN="7d"

# Redis (local)
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD=""

# AWS S3 (criar depois)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="sua-key"
AWS_SECRET_ACCESS_KEY="sua-secret"
AWS_S3_BUCKET="checkin-pousadas-dev"

# API
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

### Rodar Migrations

```bash
# Gerar Prisma Client
npm run prisma:generate

# Rodar migrations
npm run prisma:migrate

# Seed database com dados de teste
npx ts-node prisma/seed.ts
```

### Iniciar Backend

```bash
# Modo desenvolvimento (watch)
npm run start:dev

# Backend rodando em: http://localhost:3001
```

### Testar API

```bash
# Health check
curl http://localhost:3001/api/health

# Buscar tenant
curl http://localhost:3001/api/tenants/slug/villa-monte-verde

# Login admin
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@villamonteverde.com","password":"admin123"}'
```

---

## 3. Frontend (React + Vite)

### Setup Frontend

```bash
# Na raiz do projeto (não na pasta backend)
npm install
```

### Configurar Variáveis

Criar `.env.local`:

```bash
VITE_API_URL=http://localhost:3001/api
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### Atualizar Services para usar API

Editar `services/tenantService.ts`:

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

### Iniciar Frontend

```bash
npm run dev

# Frontend rodando em: http://localhost:3000
```

### Testar Multi-tenant

```bash
# Tenant 1
http://localhost:3000?tenant=villa-monte-verde

# Tenant 2
http://localhost:3000?tenant=pousada-jardim-secreto

# Tenant 3
http://localhost:3000?tenant=refugio-da-serra
```

### Acessar Admin

1. Clicar 5x no nome da pousada (topo)
2. Login: `admin@villamonteverde.com` / `admin123`
3. Testar edição de configurações, tema, etc.

---

## 4. AWS S3 Configuration

### Criar Bucket S3

1. AWS Console → S3 → **Create bucket**
2. Bucket name: `checkin-pousadas-dev` (ou outro nome)
3. Region: `us-east-1`
4. **Uncheck** "Block all public access"
5. Create bucket

### Configurar CORS

No bucket → **Permissions** → **CORS configuration**:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### Criar IAM User

1. IAM → **Users** → **Add users**
2. Nome: `checkin-pousadas-s3`
3. Attach policy: **AmazonS3FullAccess** (ou criar custom policy)
4. Create user
5. **Security credentials** → **Create access key**
6. Copiar **Access Key ID** e **Secret Access Key**

### Atualizar Backend `.env`

```bash
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="checkin-pousadas-dev"
```

### Testar Upload

```bash
# Reiniciar backend
npm run start:dev

# No admin panel:
# - Login → Images → Upload teste
```

---

## 5. Deploy Produção

### 5.1 Deploy Backend (Railway)

Ver guia completo: [DEPLOY-RAILWAY.md](backend/DEPLOY-RAILWAY.md)

**Resumo:**
1. Criar conta no [Railway](https://railway.app)
2. Criar projeto + PostgreSQL + Redis
3. Deploy do GitHub
4. Configurar env variables
5. Rodar migrations: `railway run npx prisma migrate deploy`
6. Seed: `railway run npx ts-node prisma/seed.ts`
7. Anotar URL gerada: `https://seu-app.up.railway.app`

### 5.2 Deploy Frontend (Vercel)

Ver guia completo: [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

**Resumo:**
1. Criar conta no [Vercel](https://vercel.com)
2. Importar projeto do GitHub
3. Configurar env variables:
   ```
   VITE_API_URL=https://seu-backend.railway.app/api
   VITE_GEMINI_API_KEY=...
   ```
4. Deploy
5. Anotar URL: `https://seu-app.vercel.app`

### 5.3 Conectar Frontend ↔ Backend

**No Backend (Railway):**

Atualizar CORS em `src/main.ts`:
```typescript
app.enableCors({
  origin: 'https://seu-app.vercel.app',
  credentials: true,
});
```

**No Frontend (Vercel):**

Verificar env variable:
```
VITE_API_URL=https://seu-backend.railway.app/api
```

### 5.4 Testar Produção

```bash
# Tenant 1
https://seu-app.vercel.app?tenant=villa-monte-verde

# Admin
https://seu-app.vercel.app
# (clicar 5x no nome)
# Login: admin@villamonteverde.com / admin123
```

---

## 6. Troubleshooting

### Backend não inicia

**Erro: Can't reach database server**
```bash
# Verificar PostgreSQL rodando
psql -U postgres

# Verificar DATABASE_URL no .env
# Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

**Erro: Redis connection failed**
```bash
# Verificar Redis rodando
redis-cli ping  # Deve retornar PONG

# Ou usar Docker
docker run -d -p 6379:6379 redis:alpine
```

### Frontend não carrega tenant

**Erro: Failed to fetch**
```bash
# 1. Verificar backend rodando
curl http://localhost:3001/api/health

# 2. Verificar VITE_API_URL no .env.local
echo $VITE_API_URL

# 3. Verificar CORS no backend
# Deve permitir http://localhost:3000
```

**Tenant not found**
```bash
# Verificar seed rodou
npx ts-node backend/prisma/seed.ts

# Verificar tenants no banco
npx prisma studio
# Abrir tabela 'tenants'
```

### Upload de imagens não funciona

**Erro: S3 403 Forbidden**
```bash
# Verificar credenciais AWS no .env
# Verificar bucket existe
# Verificar IAM user tem permissões S3
# Verificar CORS configurado no bucket
```

### Deploy falhou

**Railway build failed**
```bash
# Ver logs no dashboard
# Comum: prisma generate não rodou

# Adicionar em package.json:
"postinstall": "prisma generate"
```

**Vercel build failed**
```bash
# Ver logs no dashboard
# Comum: env variables faltando
# Adicionar VITE_API_URL nas settings
```

### Admin login não funciona

**Erro: Unauthorized**
```bash
# Verificar seed rodou
npx ts-node backend/prisma/seed.ts

# Testar login direto na API
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@villamonteverde.com","password":"admin123"}'

# Deve retornar { "access_token": "..." }
```

---

## 📝 Checklist Final

### Desenvolvimento Local
- [ ] PostgreSQL instalado e rodando
- [ ] Redis instalado e rodando (opcional)
- [ ] Backend `.env` configurado
- [ ] `npm install` rodou sem erros (backend)
- [ ] Migrations executadas
- [ ] Seed executado
- [ ] Backend rodando em http://localhost:3001
- [ ] Frontend `npm install` rodou sem erros
- [ ] Frontend `.env.local` configurado
- [ ] Frontend rodando em http://localhost:3000
- [ ] Tenants carregam corretamente
- [ ] Admin login funciona

### AWS S3
- [ ] Bucket criado
- [ ] CORS configurado
- [ ] IAM user criado
- [ ] Access keys copiadas
- [ ] Backend `.env` atualizado
- [ ] Upload de imagens funciona

### Deploy Produção
- [ ] Conta Railway criada
- [ ] PostgreSQL + Redis adicionados
- [ ] Backend deployado
- [ ] Migrations executadas em produção
- [ ] Seed executado em produção
- [ ] URL backend anotada
- [ ] Conta Vercel criada
- [ ] Frontend deployado
- [ ] Env variables configuradas
- [ ] CORS configurado no backend
- [ ] Frontend conectando com backend
- [ ] Tenants funcionando em produção
- [ ] Admin login funciona em produção

---

## 🎉 Pronto!

Seu SaaS multi-tenant de check-in está funcionando!

**Acesso local:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Admin: Login com admin@villamonteverde.com / admin123

**Produção:**
- Frontend: https://seu-app.vercel.app
- Backend: https://seu-app.railway.app/api

---

## 📚 Documentação Adicional

- [Backend README](backend/README.md)
- [Deploy Railway](backend/DEPLOY-RAILWAY.md)
- [Deploy Vercel](DEPLOY-VERCEL.md)
- [Admin Panel](ADMIN-PANEL.md)
- [SaaS Architecture](SAAS.md)

---

**Desenvolvido para Check-in Pousadas SaaS** 🏨
