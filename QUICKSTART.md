# 🚀 Multi-Tenant SaaS - Guia Rápido

## ✨ O que mudou?

Seu projeto agora é **multi-tenant**! Múltiplas pousadas podem usar o mesmo código com configurações personalizadas.

## 🎯 Como funciona?

### 1. Cada pousada tem seu próprio "espaço"
- Configurações únicas (Wi-Fi, contatos, cores)
- URL própria (`?tenant=nome-da-pousada`)
- Temas personalizados
- Planos diferentes (basic, premium, enterprise)

### 2. Sistema automático de detecção
- Detecta qual pousada acessar pela URL
- Carrega as configurações corretas
- Aplica o tema automaticamente

## 🧪 Testando AGORA

### Opção 1: Seletor Visual (Recomendado)
1. Execute: `npm run dev`
2. Abra: http://localhost:3000
3. **Clique no botão no canto superior esquerdo** 🎯
4. Escolha uma pousada para ver as mudanças!

### Opção 2: URL Manual
Abra essas URLs no navegador:

**Villa Monte Verde** (Premium - Original)
```
http://localhost:3000/?tenant=villa-monte-verde
```

**Pousada Jardim Secreto** (Basic - Campos do Jordão)
```
http://localhost:3000/?tenant=pousada-jardim-secreto
```

**Refúgio da Serra** (Enterprise - Gramado)
```
http://localhost:3000/?tenant=refugio-da-serra
```

## 📁 Arquivos Criados

```
✅ tipos.ts                      → Tipos do sistema
✅ contexts/TenantContext.tsx    → Gerenciador de tenant
✅ services/tenantService.ts     → Lógica de busca
✅ config/tenants.mock.ts        → 3 pousadas de exemplo
✅ components/TenantSwitcher.tsx → Seletor visual (dev)
✅ components/TenantLoading.tsx  → Telas de loading/erro
✅ components/AppWrapper.tsx     → Wrapper do App
✅ SAAS.md                       → Documentação completa
✅ TESTING.md                    → Guia de testes
```

## 🎨 O que é personalizado?

Cada pousada pode ter:
- ✅ Nome e localização
- ✅ Cores do tema (primária, secundária, accent)
- ✅ Wi-Fi (nome da rede e senha)
- ✅ Contatos (telefone, WhatsApp, email)
- ✅ Imagens diferentes
- ✅ Mensagens personalizadas
- ✅ Rating e reviews

## 🆕 Adicionar Nova Pousada

Edite `config/tenants.mock.ts` e adicione:

```typescript
{
  id: '4',
  slug: 'minha-pousada',           // URL: ?tenant=minha-pousada
  active: true,
  plan: 'premium',
  name: 'Minha Pousada Incrível',
  location: 'Gramado, RS',
  // ... resto das configurações
}
```

Acesse: `http://localhost:3000/?tenant=minha-pousada`

## 🔄 Próximos Passos

### Para SaaS Completo:
1. **Backend** - Criar API para gerenciar pousadas
2. **Admin Dashboard** - Interface para donos configurarem
3. **Autenticação** - Login para administradores
4. **Pagamentos** - Integrar Stripe/Paddle
5. **Deploy** - Vercel + Railway/Render

Veja [SAAS.md](SAAS.md) para roadmap completo!

## 📊 Planos Implementados

| Feature | Basic | Premium | Enterprise |
|---------|-------|---------|------------|
| Wi-Fi Info | ✅ | ✅ | ✅ |
| Direções | ✅ | ✅ | ✅ |
| Perfil Hóspede | ✅ | ✅ | ✅ |
| Chat AI | ❌ | ✅ | ✅ |
| Tema Custom | ❌ | ✅ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| White-label | ❌ | ❌ | ✅ |

## 💡 Dicas

- O **botão no canto superior esquerdo** só aparece em desenvolvimento
- Cada tenant tem cores diferentes - repare!
- O WhatsApp abre com o número correto de cada pousada
- Tente: `?tenant=nao-existe` para ver tela de erro

## 🐛 Problemas?

### Tenant não carrega?
- Verifique o console (F12)
- Confirme que o slug existe em `tenants.mock.ts`
- Veja se `active: true`

### Seletor não aparece?
- Só funciona em modo dev (`npm run dev`)
- É removido automaticamente em produção

## 📖 Documentação Completa

- [SAAS.md](SAAS.md) - Arquitetura e roadmap completo
- [TESTING.md](TESTING.md) - Guia detalhado de testes
- [README.md](README.md) - Documentação original

---

**Pronto! Teste agora:**
```bash
npm run dev
```
Abra http://localhost:3000 e clique no botão no canto superior esquerdo! 🎉
