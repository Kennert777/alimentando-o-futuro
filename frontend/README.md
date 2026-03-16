# Alimentando o Futuro — Frontend

Interface web da plataforma de agricultura urbana e sustentabilidade alimentar.

## 🚀 Status

✅ **Autenticação** - JWT + sessões persistentes  
✅ **Rotas Protegidas** - UserRoute e AdminRoute  
✅ **CRUD Completo** - Hortas e Colheitas com criar, editar, listar e deletar  
✅ **Perfil do Usuário** - Edição de nome, email e senha  
✅ **Recuperação de Senha** - Fluxo de 2 etapas com código por email  
✅ **Relatórios** - Gráficos dinâmicos e exportação CSV  
✅ **Tratamento de Erros** - Toast de feedback em todas as ações  
✅ **Interface Responsiva** - Bootstrap 5 + mobile-first  

## 📁 Estrutura

```
frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Toast.jsx
│   ├── config/
│   │   ├── api.js
│   │   └── axios.js
│   ├── data/
│   │   └── plantas.js
│   ├── hooks/
│   │   └── useAuth.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminRegister.jsx
│   │   │   ├── AdminColheitas.jsx
│   │   │   ├── AdminHortas.jsx
│   │   │   ├── AdminUsuarios.jsx
│   │   │   ├── HortaManagement.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── SupportManagement.jsx
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Receitas.jsx
│   │   │   ├── ApoioNovo.jsx
│   │   │   └── Sobre.jsx
│   │   └── user/
│   │       ├── Dashboard.jsx
│   │       ├── HortasUsuario.jsx
│   │       ├── Colheitas.jsx
│   │       ├── Perfil.jsx
│   │       └── Relatorios.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## ▶️ Executar

```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## 🔗 Rotas da Aplicação

### Públicas
| Rota | Página |
|------|--------|
| `/` | Home |
| `/login` | Login do usuário |
| `/register` | Cadastro de usuário |
| `/forgot-password` | Recuperação de senha |
| `/receitas` | Receitas e dicas |
| `/apoio` | Página de apoio |
| `/sobre` | Sobre o projeto |

### Usuário (protegidas — requer login)
| Rota | Página |
|------|--------|
| `/dashboard` | Dashboard do usuário |
| `/hortas-usuario` | CRUD de hortas |
| `/colheitas` | CRUD de colheitas |
| `/perfil` | Edição de perfil |

### Admin (protegidas — requer login admin)
| Rota | Página |
|------|--------|
| `/admin/login` | Login do admin |
| `/admin/dashboard` | Dashboard administrativo |
| `/admin/usuarios` | Gerenciamento de usuários |
| `/admin/hortas` | Gerenciamento de hortas |
| `/admin/colheitas` | Gerenciamento de colheitas |
| `/admin/suporte` | Gerenciamento de suporte |

## 🔐 Autenticação

- Token JWT armazenado em `localStorage` como `authToken`
- Usuário armazenado como `currentUser`
- `UserRoute` redireciona para `/login` se não autenticado
- `AdminRoute` redireciona para `/admin/login` se não autenticado

## 🌐 Configuração da API

O arquivo `src/config/api.js` centraliza a URL base da API:

```js
// Desenvolvimento
const API_BASE_URL = 'http://localhost:8080';

// Produção
const API_BASE_URL = 'https://alimentandoofuturo.somee.com';
```

O arquivo `src/config/axios.js` configura o interceptor global com o token JWT.

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| react | 19 | Framework principal |
| react-router-dom | 7 | Roteamento |
| bootstrap | 5.3 | Estilização |
| react-bootstrap | 2.10 | Componentes Bootstrap |
| axios | 1.11 | Requisições HTTP |
| recharts | 2.13 | Gráficos |
| vite | 7 | Build tool |

## 🛠️ Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento (porta 5173)
npm run build      # Build de produção
npm run preview    # Preview do build
npm run lint       # Verificação de código
```

## 🚀 Deploy (Netlify)

```bash
npm run build
# Fazer upload da pasta dist/ no Netlify
# Ou usar: npm run deploy:netlify
```

Configurar variável de ambiente no Netlify:
```
VITE_API_URL=https://alimentandoofuturo.somee.com/api
```

## 👤 Usuários de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | admin@alimentandoofuturo.com | password |
| Usuário | maria@exemplo.com | password |
| Usuário | joao@exemplo.com | password |
