# Alimentando o Futuro

Plataforma completa para agricultura urbana e sustentabilidade alimentar.

## 🚀 Status do Projeto

✅ **Sistema de Autenticação** - JWT + Sessões persistentes  
✅ **Banco de Dados** - SQL Server configurado (Somee.com)  
✅ **API Backend** - Spring Boot com CORS otimizado  
✅ **Frontend** - React com Bootstrap e Recharts  
✅ **Dashboard** - Interface estável sem redirecionamentos  
❌ **Google Maps** - Removido do projeto  
✅ **Relatórios CSV** - Exportação e gráficos dinâmicos  
✅ **Deploy Ready** - Configurado para Netlify + Somee  

## 📁 Estrutura do Projeto

```
alimentando-o-futuro/
├── frontend/          # React + Vite (localhost:5173)
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── assets/
│   │   └── *.jsx
│   ├── public/
│   └── package.json
├── backend/           # Spring Boot Java (localhost:8080)
│   ├── src/main/java/com/alimentandoofuturo/backend/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── service/
│   │   ├── repository/
│   │   └── config/
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── database-setup.sql
│   ├── populate-data.sql
│   └── pom.xml
└── documentacao/      # Documentação Técnica
    ├── MER-alimentando-futuro.drawio
    ├── DER-alimentando-futuro.drawio
    ├── diagrama-caso-uso.drawio
    └── README.md
```

## 🖥️ Frontend (React + Vite)

**Porta:** `localhost:5173`

### Executar Frontend
```bash
cd frontend
npm install
npm run dev
```

### Funcionalidades Implementadas
✅ Sistema de cadastro de usuários
✅ Sistema de login/logout com JWT
✅ Dashboard estável e responsivo
✅ Gerenciamento de hortas e colheitas
✅ Relatórios CSV e gráficos dinâmicos
✅ Interface responsiva com Bootstrap
✅ Autenticação persistente e segura
✅ Exportação de dados em CSV
🔄 Chat integrado (em desenvolvimento)
🔄 Sistema de receitas (em desenvolvimento)

## ⚙️ Backend (Spring Boot Java)

**Porta:** `localhost:8080`

### Executar Backend
```bash
cd backend
mvn spring-boot:run
```

### API Endpoints Funcionais

#### Usuários
- `POST /api/usuarios/cadastro` - Cadastrar usuário
- `POST /api/usuarios/login` - Autenticar usuário (retorna JWT)
- `GET /api/usuarios` - Listar usuários
- `GET /api/usuarios/{id}` - Buscar usuário por ID

#### Hortas e Colheitas
- `POST /api/hortas` - Criar horta
- `GET /api/hortas` - Listar hortas
- `GET /api/hortas/usuario/{id}` - Hortas por usuário
- `POST /api/colheitas` - Registrar colheita
- `GET /api/colheitas/usuario/{id}` - Colheitas por usuário

#### Localizações
❌ Endpoints removidos

#### Relatórios
- `GET /api/relatorios/csv/{id}` - Exportar CSV
- `GET /api/relatorios/graficos/{id}` - Dados para gráficos
- `GET /api/relatorios/producao-mensal/{id}` - Produção mensal

### Banco de Dados
- **Servidor:** AlimentandoOFuturo.mssql.somee.com
- **Banco:** AlimentandoOFuturo
- **ORM:** JPA/Hibernate
- **Configuração:** `application.yml`

### Dados de Exemplo
- **Admin padrão:** admin@alimentandoofuturo.com / password
- **8 usuários** de exemplo
- **7 hortas** com diferentes tipos de cultivo
- **11 colheitas** registradas

## 🛠️ Tecnologias

### Frontend
- React 19
- Vite 7
- Bootstrap 5
- React Router DOM 7
- Axios 1.11
- React Bootstrap 2.10

### Backend
- Spring Boot 3.2
- Spring Data JPA
- Spring Security
- SQL Server (Microsoft)
- Maven
- BCrypt (criptografia)

## 📋 Documentação Técnica

A pasta `documentacao/` contém:
- **MER** - Modelo Entidade-Relacionamento (padrão BR Modelo)
- **DER** - Diagrama Entidade-Relacionamento com tabelas
- **Casos de Uso** - Diagrama UML dos casos de uso do sistema

### Visualizar Diagramas
- Acesse [app.diagrams.net](https://app.diagrams.net)
- Abra os arquivos `.drawio` da pasta documentacao/

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Node.js 18+
- Java 17+
- Maven 3.6+
- Draw.io (para visualizar diagramas)

### Configuração do Banco
1. Execute `database-setup.sql` para criar tabelas
2. Execute `populate-data.sql` para dados de exemplo
3. Configure `application.yml` com suas credenciais

### Executar Projeto Completo
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 👤 Usuários de Teste

**Administrador:**
- Email: admin@alimentandoofuturo.com
- Senha: password

**Usuários:**
- maria@exemplo.com / password
- joao@exemplo.com / password
- ana@exemplo.com / password

## 🚀 Deploy

### Desenvolvimento Local
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- API: `http://localhost:8080/api`

### Produção
- **Frontend:** Netlify - `https://alimentando-o-futuro.netlify.app`
- **Backend:** Somee.com - `https://alimentandoofuturo.somee.com`
- **API:** `https://alimentandoofuturo.somee.com/api`

### Guia de Deploy
Veja o arquivo [DEPLOY.md](DEPLOY.md) para instruções completas de deploy.

#### Deploy Rápido
```bash
# Backend
cd backend
mvn clean package -DskipTests
# Upload JAR no Somee.com

# Frontend
cd frontend
npm run build
# Deploy no Netlify
```

## 🎯 Funcionalidades Principais

### (Google Maps removido)

### 📊 Relatórios e Gráficos
- Exportação de dados em CSV
- Gráficos dinâmicos de produção
- Análise de qualidade das colheitas
- Produção mensal e anual
- Dashboard com métricas em tempo real

### 🔐 Autenticação Segura
- JWT (JSON Web Tokens)
- Sessões persistentes
- Logout automático por inatividade
- Proteção contra CSRF
- Criptografia de senhas com BCrypt

### 📱 Interface Responsiva
- Design mobile-first
- Bootstrap 5 integrado
- Componentes reutilizáveis
- Navegação intuitiva
- Modo escuro (em desenvolvimento)