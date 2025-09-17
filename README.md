# Alimentando o Futuro

Plataforma completa para agricultura urbana e sustentabilidade alimentar.

## 🚀 Status do Projeto

✅ **Sistema de Autenticação** - Cadastro e Login funcionando  
✅ **Banco de Dados** - SQL Server configurado (Somee.com)  
✅ **API Backend** - Spring Boot com CORS configurado  
✅ **Frontend** - React com Bootstrap e Axios  
✅ **Dashboard** - Interface de usuário funcional  

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
└── backend/           # Spring Boot Java (localhost:8080)
    ├── src/main/java/com/alimentandoofuturo/backend/
    │   ├── controller/
    │   ├── model/
    │   ├── service/
    │   ├── repository/
    │   └── config/
    ├── src/main/resources/
    │   └── application.yml
    ├── database-setup.sql
    ├── populate-data.sql
    └── pom.xml
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
- ✅ Sistema de cadastro de usuários
- ✅ Sistema de login/logout
- ✅ Dashboard personalizado
- ✅ Gerenciamento de hortas
- ✅ Interface responsiva com Bootstrap
- ✅ Integração com API backend
- 🔄 Chat integrado (em desenvolvimento)
- 🔄 Sistema de receitas (em desenvolvimento)
- 🔄 Catálogo de plantas (em desenvolvimento)

## ⚙️ Backend (Spring Boot Java)

**Porta:** `localhost:8080`

### Executar Backend
```bash
cd backend
mvn spring-boot:run
```

### API Endpoints Funcionais
- `POST /api/usuarios/cadastro` - Cadastrar usuário
- `POST /api/usuarios/login` - Autenticar usuário
- `GET /api/usuarios` - Listar usuários
- `GET /api/usuarios/{id}` - Buscar usuário por ID
- `POST /api/hortas` - Criar horta
- `GET /api/hortas` - Listar hortas
- `GET /api/hortas/usuario/{id}` - Hortas por usuário

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

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Node.js 18+
- Java 17+
- Maven 3.6+

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

## 🌐 Deploy

### Desenvolvimento Local
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- API: `http://localhost:8080/api`

### Produção
- Backend: Configurado para Somee.com
- Frontend: Pronto para deploy em qualquer provedor