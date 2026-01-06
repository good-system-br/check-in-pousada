# 🏔️ Villa Verde - Check-In Digital

> **Aplicação moderna de check-in para hóspedes com guia interativo da pousada**

[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-green)](.)
[![React 19](https://img.shields.io/badge/React-19.2.1-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## 📋 Visão Geral

Uma solução digital completa e moderna para gerenciar o check-in de hóspedes e fornecer um guia interativo da pousada. Desenvolvida com as melhores práticas em UX/UI, acessibilidade e performance.

### ✨ Características Principais

- ✅ **Check-in Digital Sem Papel** - Experiência fluida e profissional
- ✅ **Guia Interativo** - Acesso a informações da pousada
- ✅ **Concierge AI** - Assistente virtual para dúvidas (powered by Gemini)
- ✅ **Informações Meteorológicas** - Clima em tempo real
- ✅ **Integração com Maps** - Directions e navegação
- ✅ **Responsivo & Mobile-First** - Funciona perfeitamente em qualquer dispositivo
- ✅ **Design Profissional** - Interface moderna e intuitiva
- ✅ **Acessibilidade WCAG** - Inclusiva para todos os usuários
- ✅ **PWA Ready** - Instalável como app nativo

---

## 🎯 Casos de Uso

### Para Hóspedes
- Acesso fácil ao Wi-Fi da pousada
- Guia completo de serviços
- Reservas de restaurantes e passeios
- Chat com concierge virtual
- Informações de check-in/check-out

### Para Pousadas
- Reduzir carga administrativa do check-in
- Oferecer experiência premium aos hóspedes
- Upsell de serviços (restaurantes, passeios)
- Dados e feedback dos hóspedes
- Imagem corporativa moderna e profissional

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js >= 18.0.0
- npm >= 9.0.0
- Chave da API Gemini (opcional, para o Concierge AI)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/villa-verde-check-in.git
cd villa-verde-check-in

# Instale as dependências
npm install

# Configure as variáveis de ambiente
echo "VITE_GEMINI_API_KEY=sua_chave_aqui" > .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
npm run preview
```

---

## 📝 Configuração

Toda a configuração da pousada está centralizada em `config.ts`:

```typescript
// config.ts
export const POUSADA_CONFIG = {
  name: 'Villa Verde',
  location: 'Monte Verde, MG',
  phone: '+55 (48) 99999-9999',
  wifi: {
    networkName: 'VillaVerde_Guest',
    password: 'monteverde2024',
  },
  // ... mais configurações
};
```

**Altere os valores conforme necessário para sua pousada.**

---

## 🏗️ Arquitetura

```
src/
├── components/          # Componentes React
│   ├── WelcomeScreen.tsx
│   ├── IconGrid.tsx
│   ├── ChatScreen.tsx
│   ├── RestaurantsScreen.tsx
│   ├── DirectionsScreen.tsx
│   ├── GuestScreen.tsx
│   └── InfoScreen.tsx
├── services/            # Serviços/APIs
│   ├── geminiService.ts
│   └── weatherService.ts
├── config.ts            # Configuração centralizada
├── constants.ts         # Constantes de strings
├── types.ts             # Tipos TypeScript
└── App.tsx              # Componente principal
```

---

## 🎨 Design & UX

- **Design System**: Paleta de cores "Sand" (tons quentes e arenosos)
- **Typography**: Playfair Display (headings) + Lato/Inter (body)
- **Animações**: Transições suaves e feedback visual
- **Responsividade**: Mobile-first com breakpoints Tailwind

---

## 🔐 Segurança

- ✅ Variáveis de ambiente para dados sensíveis
- ✅ HTTPS recomendado para produção
- ✅ Inputs validados e sanitizados
- ✅ Sem armazenamento de dados sensíveis no cliente

---

## ♿ Acessibilidade

- ✅ Contraste de cores WCAG AA
- ✅ Navegação por teclado completa
- ✅ ARIA labels em todos os botões
- ✅ Estrutura semântica HTML
- ✅ Suporte a leitores de tela

---

## 📊 Performance

- ⚡ **LCP**: < 2s
- ⚡ **FID**: < 100ms
- ⚡ **CLS**: < 0.1
- 📦 Bundle size: ~45KB (minificado + gzipped)

---

## 🌐 Integração com APIs

### Gemini API
Usado para o Concierge AI que responde dúvidas dos hóspedes.

```bash
# Configure sua chave da API
VITE_GEMINI_API_KEY=sua_chave_aqui
```

### Weather API
Integração com API de clima (OpenWeatherMap ou similar).

---

## 🔄 Lifecycle

1. **Welcome Screen** - Boas-vindas interativas
2. **Menu** - Grid de serviços disponíveis
3. **Service Screens** - Informações e funcionalidades
4. **Navigation** - Entre e volta do menu facilmente

---

## 🧪 Testes

```bash
# Type checking
npm run type-check

# Build test
npm run build
```

---

## 📦 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Outras Plataformas
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

---

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE) para detalhes.

---

## 📞 Suporte

Para suporte:

- **Email**: dev@villaverde.com.br
- **WhatsApp**: +55 (48) 99999-9999

---

**Desenvolvido com ❤️ para Villa Verde**
