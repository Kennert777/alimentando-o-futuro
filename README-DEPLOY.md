# Deploy no Vercel

## Opção 1: Via Interface Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/GitLab/Bitbucket
3. Clique em "New Project"
4. Conecte seu repositório GitHub
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Clique em "Deploy"

## Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

## Configuração

O arquivo `vercel.json` já está configurado para:
- Build automático com Vite
- Roteamento SPA (Single Page Application)
- Servir arquivos estáticos da pasta `dist`

## Build Local

Para testar o build localmente:

```bash
npm run build
npm run preview
```