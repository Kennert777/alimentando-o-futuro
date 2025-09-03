# Alimentando o Futuro

Plataforma completa para agricultura urbana e sustentabilidade alimentar.

## Estrutura do Projeto

```
alimentando-o-futuro/
├── frontend/          # React + Vite (localhost:5173)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── backend/           # Spring Boot Java (localhost:8080)
    ├── src/main/java/
    ├── src/main/resources/
    └── pom.xml
```

## Frontend (React + Vite)

**Porta:** `localhost:5173`

### Executar Frontend
```bash
cd frontend
npm install
npm run dev
```

### Funcionalidades
- 100 plantas catalogadas
- Sistema de usuários
- Horta digital
- 50 receitas sustentáveis
- Dashboard personalizado
- Chat integrado

## Backend (Spring Boot Java)

**Porta:** `localhost:8080`

### Executar Backend
```bash
cd backend
mvn spring-boot:run
```

### API Endpoints
- `POST /api/usuarios/cadastro` - Cadastrar usuário
- `POST /api/usuarios/login` - Login
- `GET /api/usuarios` - Listar usuários
- `POST /api/hortas` - Criar horta
- `GET /api/hortas` - Listar hortas

### Banco de Dados
- SQL Server
- JPA/Hibernate
- Configuração em `application.properties`

## Tecnologias

### Frontend
- React 19
- Vite 7
- Bootstrap 5
- React Router DOM

### Backend
- Spring Boot 3.2
- Spring Data JPA
- Spring Security
- SQL Server
- Maven

## Deploy

### Frontend
- Vercel (configurado)
- Build: `npm run build`

### Backend
- Heroku/AWS
- Build: `mvn clean package`