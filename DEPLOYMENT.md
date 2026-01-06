# 🚀 Guia de Deployment

## Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

## ✅ Antes de Deploy

1. **Teste em produção local**
   ```bash
   npm run build
   npm run preview
   ```

2. **Valide o build**
   - Abra `http://localhost:4173` no navegador
   - Teste todos os recursos
   - Verifique responsividade em mobile

3. **Atualize configurações**
   - `config.ts` - Dados da pousada
   - `constants.ts` - Textos
   - `.env.local` - Chaves de API

---

## 🌐 Opção 1: Vercel (Recomendado)

### Vantagens
- ✅ Configuração automática
- ✅ HTTPS grátis
- ✅ CDN global
- ✅ Deploys automáticos do Git
- ✅ Free tier generoso

### Passos

1. **Crie conta no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Sign up com GitHub

2. **Conecte seu repositório**
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Configure variáveis de ambiente**
   - No dashboard Vercel: Settings → Environment Variables
   - Adicione `VITE_GEMINI_API_KEY`

4. **Deploy automático**
   - Será automático em cada `git push`

### URL de Produção
- Padrão: `https://seu-projeto.vercel.app`
- Custom: Configure em Project Settings

---

## 🌐 Opção 2: Netlify

### Vantagens
- ✅ Deployment simples
- ✅ Preview automático
- ✅ Forms grátis

### Passos

1. **Build localmente**
   ```bash
   npm run build
   ```

2. **Faça upload**
   - Acesse [netlify.com](https://netlify.com)
   - Drag and drop a pasta `dist/`

3. **Ou via Git**
   ```bash
   npm i -g netlify-cli
   netlify deploy
   ```

---

## 🌐 Opção 3: GitHub Pages

### Vantagens
- ✅ Hospedagem grátis
- ✅ Integração com GitHub

### Passos

1. **Configure `vite.config.ts`**
   ```typescript
   export default {
     base: '/seu-repo/',  // Se não usar domínio custom
     // ...
   }
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Crie branch e push**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Deploy"
   git push origin gh-pages
   ```

---

## ☁️ Opção 4: AWS S3 + CloudFront

### Vantagens
- ✅ Infraestrutura profissional
- ✅ Escalável
- ✅ Domínio custom fácil

### Passos

1. **Crie bucket S3**
   ```bash
   aws s3 mb s3://seu-pousada-app
   ```

2. **Build e upload**
   ```bash
   npm run build
   aws s3 sync dist/ s3://seu-pousada-app/
   ```

3. **Configure CloudFront**
   - Distribution origin: S3 bucket
   - Default root object: `index.html`
   - Custom domain: Route 53

4. **Deploy automático com CI/CD**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to AWS
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - run: npm ci && npm run build
         - run: aws s3 sync dist/ s3://seu-bucket/
   ```

---

## 🔐 Configurar Domínio Custom

### Namecheap, GoDaddy, etc.

1. **Obtenha nameservers do seu host**
   - Vercel: Dashboard → Domains
   - Netlify: Domain settings
   - AWS: Route 53

2. **Atualize DNS no registrador**
   - Adicione os nameservers fornecidos
   - Aguarde propagação (até 48h)

3. **Aponte para seu app**
   - No dashboard do host
   - Adicione domínio custom

---

## 🔒 HTTPS e Certificado SSL

✅ **Automático em:**
- Vercel ✅
- Netlify ✅
- GitHub Pages ✅
- AWS CloudFront ✅

---

## 📊 Monitoring e Analytics

### Google Analytics
```html
<!-- No index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### Sentry (Error Tracking)
```bash
npm i @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://seu-dsn@sentry.io/project",
  environment: "production",
});
```

---

## 🚨 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules
npm install
npm run build
```

### Erro: Variáveis de ambiente não funcionam
- Certifique-se de prefixo `VITE_`
- Reinicie dev server
- Rebuild para produção

### App em branco após deploy
- Verifique console do navegador
- Valide build local: `npm run preview`
- Verifique variáveis de ambiente

### Imagens não carregam
- Verifique URLs (HTTPS)
- Teste CORS: `curl -i https://url-da-imagem`
- Use CDN confiável (Unsplash, Cloudinary)

---

## ⚡ Performance

### Otimizações aplicadas
- ✅ Code splitting automático
- ✅ Tree-shaking Tailwind
- ✅ Lazy loading de imagens
- ✅ Minificação com Terser

### Métricas alvo
- LCP: < 2s
- FID: < 100ms
- CLS: < 0.1

### Teste
```bash
# Build
npm run build

# Analise
npx lighthouse https://seu-app.com
```

---

## 🔄 CI/CD com GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      
      - run: npm run type-check
      
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📱 PWA (Progressive Web App)

Torne seu app instalável como app nativo:

1. **Adicione `manifest.json`** (já incluído em `index.html`)

2. **Configure Service Worker**
   ```typescript
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

3. **Teste no navegador**
   - Abra DevTools → Application
   - Verifique Manifest e Service Workers

---

## ✅ Checklist Final

- [ ] `.env.local` configurado com chaves de API
- [ ] `config.ts` com dados corretos da pousada
- [ ] Teste local completo: `npm run preview`
- [ ] Build sem erros: `npm run build`
- [ ] Imagens funcionando
- [ ] Links do WhatsApp corretos
- [ ] Google Maps embed funciona
- [ ] Domínio custom configurado
- [ ] HTTPS ativo
- [ ] Analytics configurado
- [ ] Backup dos dados

---

## 🎉 Parabéns!

Seu app está online! 

**Próximos passos:**
- Monitore analytics
- Colete feedback dos hóspedes
- Faça updates regulares
- Mantenha certificados atualizados

Para suporte: [developer.vercel.com](https://developer.vercel.com)
