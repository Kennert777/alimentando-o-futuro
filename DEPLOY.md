# 🚀 Guia de Deploy - Alimentando o Futuro

## 📋 Pré-requisitos

### Backend (Somee.com)
- Conta no Somee.com (gratuita)
- Java 17+ instalado
- Maven 3.6+ instalado

### Frontend (Netlify)
- Conta no Netlify (gratuita)
- Node.js 18+ instalado
- Chave da API do Google Maps

## 🔧 Configuração do Backend

### 1. Preparar o JAR
```bash
cd backend
mvn clean package -DskipTests
```

### 2. Upload no Somee.com
1. Acesse [somee.com](https://somee.com)
2. Faça login na sua conta
3. Vá em "File Manager"
4. Faça upload do arquivo `target/backend-1.0.0.jar`
5. Configure as variáveis de ambiente:
   - `JAVA_OPTS=-Xmx512m`
   - `SERVER_PORT=8080`

### 3. Configurar Banco de Dados
O banco SQL Server já está configurado no `application.yml`:
- **Servidor:** AlimentandoOFuturo.mssql.somee.com
- **Banco:** AlimentandoOFuturo
- **Usuário:** alimentandoofuturo
- **Senha:** @ITB123456

## 🌐 Configuração do Frontend

### 1. Configurar Variáveis de Ambiente
Edite o arquivo `.env.production`:
```env
VITE_API_URL=https://alimentandoofuturo.somee.com/api
VITE_GOOGLE_MAPS_API_KEY=sua_chave_google_maps_aqui
VITE_APP_NAME=Alimentando o Futuro
VITE_APP_VERSION=1.0.0
```

### 2. Build para Produção
```bash
cd frontend
npm install
npm run build
```

### 3. Deploy no Netlify

#### Opção A: Deploy Manual
1. Acesse [netlify.com](https://netlify.com)
2. Faça login na sua conta
3. Arraste a pasta `dist` para o deploy
4. Configure o domínio personalizado (opcional)

#### Opção B: Deploy via Git
1. Conecte seu repositório GitHub ao Netlify
2. Configure as build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `frontend`

#### Opção C: Deploy via CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login no Netlify
netlify login

# Deploy
cd frontend
npm run deploy:netlify
```

## 🔑 Configuração da API do Google Maps

### 1. Obter Chave da API
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione existente
3. Ative as APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Crie credenciais (API Key)
5. Configure restrições de domínio

### 2. Configurar Restrições
- **Referenciadores HTTP:** 
  - `https://seu-dominio.netlify.app/*`
  - `http://localhost:5173/*` (para desenvolvimento)

## 🛡️ Configurações de Segurança

### Backend
- JWT configurado com chave secreta
- CORS configurado para domínios específicos
- Validação de entrada em todos os endpoints

### Frontend
- Headers de segurança configurados no Netlify
- Variáveis de ambiente protegidas
- Autenticação persistente com JWT

## 📊 Monitoramento

### Backend (Somee.com)
- Logs disponíveis no painel de controle
- Monitoramento de recursos (CPU, memória)
- Backup automático do banco de dados

### Frontend (Netlify)
- Analytics integrado
- Logs de deploy e build
- Monitoramento de performance

## 🔄 Atualizações

### Backend
```bash
cd backend
mvn clean package -DskipTests
# Upload do novo JAR no Somee.com
```

### Frontend
```bash
cd frontend
npm run build
# Deploy automático via Git ou manual no Netlify
```

## 🐛 Troubleshooting

### Problemas Comuns

#### CORS Error
- Verificar configuração no `SecurityConfig.java`
- Confirmar URL do frontend no backend

#### Google Maps não carrega
- Verificar chave da API no `.env.production`
- Confirmar restrições de domínio no Google Cloud

#### Erro 404 em rotas
- Verificar configuração de redirects no `netlify.toml`
- Confirmar SPA routing

#### Erro de conexão com banco
- Verificar credenciais no `application.yml`
- Confirmar conectividade com Somee.com

## 📞 Suporte

Para problemas específicos:
- **Backend:** Documentação do Somee.com
- **Frontend:** Documentação do Netlify
- **Google Maps:** Google Cloud Support

## 🎯 URLs de Produção

- **Frontend:** https://alimentando-o-futuro.netlify.app
- **Backend:** https://alimentandoofuturo.somee.com
- **API:** https://alimentandoofuturo.somee.com/api

## ✅ Checklist de Deploy

### Backend
- [ ] JAR compilado sem erros
- [ ] Banco de dados configurado
- [ ] CORS configurado para produção
- [ ] JWT configurado
- [ ] Upload realizado no Somee.com

### Frontend
- [ ] Variáveis de ambiente configuradas
- [ ] Build executado com sucesso
- [ ] Google Maps API configurada
- [ ] Deploy realizado no Netlify
- [ ] Domínio configurado (opcional)

### Testes
- [ ] Login/logout funcionando
- [ ] Dashboard carregando
- [ ] Mapa exibindo localizações
- [ ] Relatórios gerando CSV
- [ ] Gráficos carregando dados
- [ ] Responsividade em mobile