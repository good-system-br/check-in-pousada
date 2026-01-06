# 📖 Guia de Customização

## 1️⃣ Configuração Básica da Pousada

Abra o arquivo `config.ts` e customize os dados da sua pousada:

```typescript
export const POUSADA_CONFIG = {
  // Informações básicas
  name: 'Seu Nome',
  location: 'Cidade, Estado',
  region: 'Camanducaia, Minas Gerais',
  
  // Endereço
  address: 'Av. Principal, 123',
  latitude: -22.9876,
  longitude: -43.1952,
  
  // Contato
  phone: '+55 (XX) XXXXX-XXXX',
  email: 'seu@email.com.br',
  whatsapp: '55XXXXXXXXXX', // Apenas números
  
  // Wi-Fi
  wifi: {
    networkName: 'Seu_WiFi_Name',
    password: 'sua-senha-wifi',
  },
  
  // Dados do hóspede de exemplo (para testes)
  exampleGuest: {
    name: 'Nome do Hóspede',
    room: '101',
    roomType: 'Tipo de Suíte',
    floor: 'Andar',
    checkIn: '01 Jan 2025',
    checkOut: '03 Jan 2025',
    nights: '2 noites',
  },
};
```

## 2️⃣ Alterar Cardápio e Serviços

No arquivo `config.ts`, customize o `MENU_ITEMS`:

```typescript
export const MENU_ITEMS = [
  { 
    id: '0', 
    label: 'Seu Serviço', 
    iconName: 'IconName', // Veja lista de ícones disponíveis
    targetScreen: 'SCREEN_NAME' as const 
  },
  // ... mais itens
];
```

### Ícones Disponíveis (Lucide React)
- `Wifi`, `MapPin`, `Coffee`, `Key`, `BookOpen`
- `ShoppingBag`, `Compass`, `Info`, `Utensils`
- `Trees`, `MessageSquareText`, `LifeBuoy`, `User`

[Ver mais ícones](https://lucide.dev)

## 3️⃣ Customizar Textos e Labels

Edite o arquivo `constants.ts`:

```typescript
export const LABELS = {
  network: 'Rede',
  password: 'Senha',
  location: 'Localização',
  services: 'Serviços',
  // ... e mais
};

export const ARIA_LABELS = {
  back: 'Voltar',
  contact: 'Contato',
  // ... para acessibilidade
};
```

## 4️⃣ Integrar Google Maps

No `IconGrid.tsx`, adicione o embed URL correto:

1. Vá para [Google Maps](https://maps.google.com)
2. Localize sua pousada
3. Clique em "Compartilhar" → "Incorporar um mapa"
4. Copie o URL do `src` do iframe
5. Substitua em `config.ts`:

```typescript
googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=...'
```

## 5️⃣ Implementar Serviços

Crie componentes customizados para seus serviços:

```tsx
// components/MyServiceScreen.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface MyServiceScreenProps {
  onBack: () => void;
}

export const MyServiceScreen: React.FC<MyServiceScreenProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between bg-white border-b border-sand-100">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-sand-100" aria-label="Voltar">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-lg">Meu Serviço</h2>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Seu conteúdo aqui */}
      </div>
    </div>
  );
};
```

Depois adicione em `App.tsx`:

```tsx
import { MyServiceScreen } from './components/MyServiceScreen';

// No renderScreen():
case 'MY_SERVICE':
  return <MyServiceScreen onBack={() => setCurrentScreen('MENU')} />;
```

## 6️⃣ Configurar API Gemini (Concierge AI)

1. Obtenha uma chave em [Google AI Studio](https://aistudio.google.com)
2. Crie `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

3. A API será usada automaticamente no ChatScreen

## 7️⃣ Customizar Cores

O projeto usa Tailwind CSS com paleta "Sand". Edite em `tailwind.config.js` ou use as classes existentes:

- `bg-sand-50` até `bg-sand-900`
- `text-sand-50` até `text-sand-900`
- `border-sand-100` até `border-sand-700`

## 8️⃣ Adicionar Imagens

### Welcome Screen
Em `config.ts`:

```typescript
images: {
  welcome: [
    'https://seu-servidor.com/imagem1.jpg',
    'https://seu-servidor.com/imagem2.jpg',
  ],
}
```

### Restaurantes
Edite `RestaurantsScreen.tsx` para mudar URLs das imagens.

## 9️⃣ Métrica Google Analytics (Opcional)

Adicione ao `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔟 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel
```

### GitHub Pages
```bash
npm run build
# Copiar conteúdo de dist/ para gh-pages branch
```

### AWS S3 + CloudFront
```bash
npm run build
aws s3 sync dist/ s3://seu-bucket/
```

---

## ✅ Checklist de Customização

- [ ] Dados da pousada em `config.ts`
- [ ] Wi-Fi network e password
- [ ] Contatos (phone, email, WhatsApp)
- [ ] Textos em `constants.ts`
- [ ] Google Maps embed URL
- [ ] Imagens (welcome screen, restaurantes)
- [ ] Serviços customizados
- [ ] Gemini API Key (opcional)
- [ ] Cores e branding
- [ ] Deploy testado

---

## 🆘 Troubleshooting

**Problema**: As imagens não aparecem
- Verifique se as URLs são HTTPS
- Teste em modo incógnito
- Verifique CORS do servidor

**Problema**: Serviço meteorológico não funciona
- Chave da API de clima pode estar expirada
- Verifique permissões de CORS

**Problema**: Gemini AI não responde
- Configure `VITE_GEMINI_API_KEY`
- Verifique créditos na conta Google
- Tente fazer rebuild: `npm run build`

---

Para mais ajuda, abra uma issue no repositório! 🚀
