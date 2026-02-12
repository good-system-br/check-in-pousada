# Backend NestJS - Check-in Pousadas

API backend multi-tenant para sistema de check-in de pousadas.

## 🛠️ Stack Tecnológica

- **Framework**: NestJS
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Storage**: AWS S3
- **Auth**: JWT
- **Deploy**: Railway

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar .env
cp .env.example .env

# Editar .env com suas credenciais
# DATABASE_URL, JWT_SECRET, AWS credentials, etc.

# Gerar Prisma Client
npm run prisma:generate

# Rodar migrations
npm run prisma:migrate
```

## 🚀 Rodando Localmente

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

## 🗄️ Database

```bash
# Criar migration
npx prisma migrate dev --name nome_da_migration

# Abrir Prisma Studio
npm run prisma:studio

# Reset database
npx prisma migrate reset
```

## 📡 API Endpoints

### Públicos

- `GET /api/tenants/slug/:slug` - Buscar config de pousada

### Autenticação

- `POST /api/auth/login` - Login de admin
- `POST /api/auth/register` - Registrar novo admin

### Tenants (Protegido)

- `GET /api/tenants` - Listar todas pousadas
- `POST /api/tenants` - Criar pousada
- `PUT /api/tenants/:id` - Atualizar pousada
- `DELETE /api/tenants/:id` - Deletar pousada
- `POST /api/tenants/track/:slug` - Tracking de analytics

### Imagens (Protegido)

- `POST /api/images/upload` - Upload de imagem
- `GET /api/images/tenant/:tenantId` - Listar imagens
- `DELETE /api/images/:id` - Deletar imagem

## 🚢 Deploy Railway

1. Criar conta no [Railway](https://railway.app)
2. Criar novo projeto
3. Adicionar PostgreSQL database
4. Adicionar Redis
5. Deploy do GitHub:
   ```bash
   railway link
   railway up
   ```
6. Configurar variáveis de ambiente no Railway dashboard
7. Rodar migrations:
   ```bash
   railway run npx prisma migrate deploy
   ```

### Variáveis de Ambiente (Railway)

```
DATABASE_URL=             # Autopreenchido pelo Railway
JWT_SECRET=               # Gerar um aleatório
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=        # Da AWS
AWS_SECRET_ACCESS_KEY=    # Da AWS
AWS_S3_BUCKET=            # Nome do bucket
REDIS_HOST=               # Autopreenchido pelo Railway
REDIS_PORT=6379
FRONTEND_URL=             # URL do Vercel
```

## 🪣 Configurar AWS S3

1. Criar bucket no S3
2. Configurar CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```
3. Criar IAM user com permissões S3
4. Gerar Access Key e Secret

## 🔧 Seed Database (Opcional)

Criar arquivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar tenant
  const tenant = await prisma.tenant.create({
    data: {
      slug: 'villa-monte-verde',
      name: 'Villa Monte Verde',
      location: 'Monte Verde, MG',
      planType: 'PREMIUM',
    },
  });

  // Criar admin
  await prisma.adminUser.create({
    data: {
      email: 'admin@villamonteverde.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin',
      tenantId: tenant.id,
    },
  });
}

main()
  .then(() => console.log('✅ Seed completo'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

Rodar:
```bash
npx ts-node prisma/seed.ts
```

## 📝 Notas

- Cache Redis com TTL de 1 hora para configs de tenant
- Imagens são salvas no S3 com ACL public-read
- JWT expira em 7 dias
- Rate limiting: 100 requisições por minuto
- Todas rotas admin requerem JWT token no header: `Authorization: Bearer <token>`

## 🔗 Integração com Frontend

No frontend, atualizar `services/tenantService.ts`:

```typescript
const API_URL = 'https://seu-backend.railway.app/api';

export async function fetchTenantConfig(slug: string) {
  const response = await fetch(`${API_URL}/tenants/slug/${slug}`);
  return response.json();
}
```

---

**Desenvolvido para Check-in Pousadas SaaS**
