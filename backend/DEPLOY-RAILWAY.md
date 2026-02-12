# Deploy Backend - Railway

Este guia mostra como fazer deploy do backend no Railway.

## 📋 Pré-requisitos

- Conta no [Railway](https://railway.app)
- Conta AWS com S3 configurado
- Código no GitHub

## 🚀 Passo a Passo

### 1. Criar Projeto no Railway

```bash
# Instalar CLI (opcional)
npm install -g @railway/cli

# Login
railway login

# Criar projeto
railway init
```

Ou criar pelo dashboard: https://railway.app/new

### 2. Adicionar Serviços

No Railway dashboard, adicionar:

#### PostgreSQL
1. Click em **"New"** → **"Database"** → **"PostgreSQL"**
2. Anote a variável `DATABASE_URL` gerada

#### Redis
1. Click em **"New"** → **"Database"** → **"Redis"**
2. Anote as variáveis `REDIS_HOST`, `REDIS_PORT`

### 3. Deploy do Backend

1. Click em **"New"** → **"GitHub Repo"**
2. Conectar seu repositório
3. Selecionar a pasta `backend`
4. Railway detecta automaticamente NestJS

### 4. Configurar Variáveis de Ambiente

No Railway dashboard → seu serviço → **Variables**:

```bash
# Database (já preenchido automaticamente)
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui_123456789
JWT_EXPIRES_IN=7d

# Redis (já preenchido automaticamente)
REDIS_HOST=...
REDIS_PORT=6379

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_S3_BUCKET=checkin-pousadas-images

# API
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://seu-app.vercel.app

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

### 5. Rodar Migrations

```bash
# Via Railway CLI
railway run npx prisma migrate deploy

# Ou via dashboard: Settings → Deploy Hooks
# Adicionar comando: npx prisma migrate deploy
```

### 6. Seed Database (Opcional)

```bash
# Via Railway CLI
railway run npx ts-node prisma/seed.ts
```

### 7. Gerar Domain

No Railway dashboard → seu serviço → **Settings** → **Networking**:

- Click em **"Generate Domain"**
- Você receberá um domínio tipo: `seu-app.up.railway.app`
- Anote essa URL para usar no frontend

### 8. Configurar Health Check (Opcional)

Criar endpoint de health check:

```typescript
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
```

Railway → Settings → Health Check:
- Path: `/health`
- Interval: 60s

## ✅ Verificar Deploy

1. Acesse: `https://seu-app.up.railway.app/api/health`
2. Deve retornar: `{"status":"ok","timestamp":"..."}`

## 🔧 Troubleshooting

### Build Failed

Verificar logs no Railway dashboard → **Deployments** → última build

Problemas comuns:
- `prisma generate` não rodou → adicionar ao `postinstall` no package.json
- Variáveis não configuradas → verificar **Variables**
- Falta de memória → aumentar plano do Railway

### Database Connection Failed

1. Verificar se `DATABASE_URL` está correto
2. Testar conexão:
   ```bash
   railway run npx prisma db push
   ```

### Redis Connection Failed

1. Verificar `REDIS_HOST` e `REDIS_PORT`
2. Certificar que Redis está no mesmo projeto Railway

## 🌐 Conectar com Frontend

Atualizar o frontend (Vercel) com a URL do Railway:

```typescript
// services/tenantService.ts
const API_URL = 'https://seu-app.up.railway.app/api';
```

## 💰 Custos

Railway oferece:
- **Hobby Plan**: $5/mês com $5 de crédito
- **Developer Plan**: $20/mês com $10 de crédito incluído

Estimativa mensal:
- Backend NestJS: ~$5
- PostgreSQL: ~$5
- Redis: ~$3
**Total**: ~$13/mês

## 🔐 Segurança

- [ ] Trocar todas senhas padrão
- [ ] Usar `JWT_SECRET` forte (min 32 caracteres)
- [ ] Configurar CORS apenas para seu domínio frontend
- [ ] Ativar HTTPS (Railway faz automaticamente)
- [ ] Limitar rate limiting conforme necessário

## 📊 Monitoramento

Railway oferece:
- CPU/Memory usage
- Request logs
- Crash logs
- Uptime monitoring

Acesse: Dashboard → seu serviço → **Observability**

---

✅ **Backend pronto para produção!**

Próximo passo: [Deploy Frontend (Vercel)](../DEPLOY-VERCEL.md)
