# 🧪 Testando o Sistema Multi-Tenant

## 🚀 Início Rápido

1. **Instale as dependências** (se ainda não fez):
```bash
npm install
```

2. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

3. **Teste diferentes pousadas** usando query parameters:

### Villa Monte Verde (Premium)
```
http://localhost:5173/?tenant=villa-monte-verde
```
- Tema: Tons de areia/marrom
- Features: Chat AI, Restaurantes, Tema customizado
- Localização: Monte Verde, MG

### Pousada Jardim Secreto (Basic)
```
http://localhost:5173/?tenant=pousada-jardim-secreto
```
- Tema: Verde/Natureza
- Features: Básicas apenas
- Localização: Campos do Jordão, SP

### Refúgio da Serra (Enterprise)
```
http://localhost:5173/?tenant=refugio-da-serra
```
- Tema: Azul/Sofisticado
- Features: Todas + Analytics
- Localização: Gramado, RS

## 🎨 O que Testar

### 1. Personalização Visual
- [ ] Cores diferentes em cada pousada
- [ ] Nome da pousada no header
- [ ] Localização correta
- [ ] Rating e reviews

### 2. Configurações Específicas
- [ ] Nome e senha Wi-Fi únicos
- [ ] Número de WhatsApp diferente
- [ ] Mensagem de boas-vindas personalizada
- [ ] Imagens diferentes

### 3. Estados do Sistema
- [ ] Loading inicial (pode ser rápido)
- [ ] Tenant não encontrado: `?tenant=nao-existe`
- [ ] Tenant inativo (teste editando mock)

### 4. Funcionalidades
- [ ] Navegação entre telas
- [ ] Copiar senha Wi-Fi
- [ ] Botão WhatsApp com número correto
- [ ] Chat AI (se disponível no plano)

## 🔧 Adicionar Nova Pousada (Mock)

Edite [config/tenants.mock.ts](config/tenants.mock.ts):

```typescript
{
  id: '4',
  slug: 'sua-pousada',  // URL: ?tenant=sua-pousada
  active: true,
  plan: 'premium',
  name: 'Sua Pousada',
  location: 'Sua Cidade, UF',
  region: 'Sua Cidade, Seu Estado',
  address: 'Seu Endereço',
  latitude: -23.0000,
  longitude: -45.0000,
  phone: '+55 (11) 98888-8888',
  email: 'contato@suapousada.com.br',
  whatsapp: '5511988888888',
  exampleGuest: null,
  wifi: {
    networkName: 'SuaPousada_WiFi',
    password: 'senha123',
  },
  rating: 4.8,
  reviews: 200,
  testimonial: 'Uma experiência única!',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?...',
  images: {
    welcome: [
      'https://images.unsplash.com/photo-...',
      // Adicione mais imagens
    ],
  },
  messages: {
    welcome: 'Bem-vindo à Sua Pousada',
    concierge: 'Olá! Como posso ajudar?',
  },
  theme: {
    primaryColor: '#FF6B6B',
    secondaryColor: '#4ECDC4',
    accentColor: '#45B7D1',
    backgroundGradient: 'from-red-900 to-red-800',
  },
}
```

Depois acesse: `http://localhost:5173/?tenant=sua-pousada`

## 📱 Teste de Responsividade

Teste em diferentes tamanhos:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## 🐛 Debugging

### Ver logs do tenant
Abra o DevTools (F12) e veja o console:
```
🏨 Carregando tenant: villa-monte-verde
✅ Tenant carregado: Villa Monte Verde
🎨 Tema aplicado: {primaryColor: "#8B7355", ...}
```

### Tenant não carrega?
1. Verifique o slug no console
2. Confirme que o slug existe em `tenants.mock.ts`
3. Verifique se `active: true`

### Tema não aplica?
1. Verifique se o tenant tem propriedade `theme`
2. Veja as variáveis CSS no DevTools:
   - `--primary-color`
   - `--secondary-color`
   - `--accent-color`

## 🔄 Hot Reload

Alterações nos arquivos recarregam automaticamente:
- Editar `tenants.mock.ts` → Salvar → Ver mudanças
- Adicionar nova pousada → Acessar URL → Funciona!

## ✅ Checklist de Testes

### Básico
- [ ] App carrega sem erros
- [ ] Consegue trocar entre tenants via URL
- [ ] Loading aparece brevemente
- [ ] Erro aparece para tenant inválido

### Avançado
- [ ] Temas aplicam corretamente
- [ ] Dados específicos de cada pousada aparecem
- [ ] WhatsApp abre com número correto
- [ ] Todas as telas funcionam

### Performance
- [ ] Carrega em menos de 1 segundo
- [ ] Navegação é fluida
- [ ] Não há memory leaks (ver DevTools)

## 🎯 Próximos Testes

Quando conectar com backend real:
1. Teste com dados da API
2. Teste offline (PWA)
3. Teste com muitos tenants
4. Teste performance com cache

## 💡 Dicas

- Use `?tenant=` para trocar rapidamente
- Abra múltiplas abas com tenants diferentes
- Use DevTools Network para ver requests
- Use React DevTools para ver o contexto

---

**Pronto para testar!** 🚀

Execute `npm run dev` e abra:
- http://localhost:5173/?tenant=villa-monte-verde
- http://localhost:5173/?tenant=pousada-jardim-secreto
- http://localhost:5173/?tenant=refugio-da-serra
