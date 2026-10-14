# UPVET Lavras

Site institucional e catálogo demonstrativo da unidade UPVET Lavras, com páginas para produtos prontos, solicitação de manipulação e acompanhamento de pedidos.

## Publicação

O conteúdo publicado pelo GitHub Pages fica em `docs/`. Para reconstruí-lo a partir de `public/`:

```bash
npm run pages:build
```

O workflow `.github/workflows/pages.yml` publica `docs/` automaticamente após cada envio para a branch `main`.

## Escopo da demonstração

- Os preços são ilustrativos e não representam ofertas da farmácia.
- Pedidos, receitas de teste e alterações da gerência ficam somente no IndexedDB do navegador no GitHub Pages.
- Nenhuma mensagem é enviada ao WhatsApp; o resumo fica preparado para uma integração futura com a API oficial.
- A senha da gerência é fictícia e existe apenas para testar a interface.
- Não devem ser usados nomes, receitas ou dados reais nesta versão pública.

## Desenvolvimento completo

O projeto também mantém uma implementação Vinext/Cloudflare com rotas de API, D1 e R2 para evolução futura. Com Node.js 22 ou superior:

```bash
npm ci
npm run build
npm run dev
```

As páginas estáticas estão em `public/`; a lógica visual e de pedidos está em `public/assets/`.

