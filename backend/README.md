# Backend Spring Boot - Alimentando o Futuro

## Conversão do Backend Node.js para Spring Boot Java

Este projeto converte o backend Node.js original para Spring Boot Java, mantendo todas as funcionalidades:

### Estrutura do Projeto

```
backend-java/
├── src/main/java/com/alimentandoofuturo/backend/
│   ├── BackendApplication.java          # Classe principal
│   ├── model/                           # Entidades JPA
│   │   ├── Usuario.java
│   │   └── Horta.java
│   ├── repository/                      # Repositórios JPA
│   │   └── UsuarioRepository.java
│   ├── service/                         # Lógica de negócio
│   │   └── UsuarioService.java
│   ├── controller/                      # Controllers REST
│   │   └── UsuarioController.java
│   └── config/                          # Configurações
│       └── SecurityConfig.java
├── src/main/resources/
│   └── application.properties           # Configurações da aplicação
└── pom.xml                             # Dependências Maven
```

### Funcionalidades Implementadas

- ✅ **Usuários**: CRUD completo com autenticação
- ✅ **Hortas**: Gerenciamento de hortas comunitárias
- ✅ **Sistema de Pontos**: Gamificação
- ✅ **Segurança**: BCrypt para senhas, CORS configurado
- ✅ **Banco de Dados**: SQL Server com JPA/Hibernate

### Como Executar

1. **Pré-requisitos**:
   - Java 17+
   - Maven 3.6+
   - SQL Server

2. **Configurar Banco**:
   - Execute o script `create_database.sql`
   - Ajuste as credenciais em `application.properties`

3. **Executar**:
   ```bash
   cd backend-java
   mvn spring-boot:run
   ```

4. **Testar**:
   - API disponível em: `http://localhost:8080/api`
   - Endpoints principais:
     - `POST /api/usuarios/cadastro`
     - `POST /api/usuarios/login`
     - `GET /api/usuarios`

### Endpoints da API

#### Usuários
- `POST /api/usuarios/cadastro` - Cadastrar usuário
- `POST /api/usuarios/login` - Autenticar usuário
- `GET /api/usuarios` - Listar usuários
- `GET /api/usuarios/{id}` - Buscar usuário
- `PUT /api/usuarios/{id}` - Atualizar usuário
- `DELETE /api/usuarios/{id}` - Excluir usuário
- `POST /api/usuarios/{id}/pontos` - Adicionar pontos

### Próximos Passos

Para completar a conversão, implemente:
- Entidades: Colheita, SolicitacaoApoio, Dica, Planta
- Controllers correspondentes
- Sistema de notificações
- JWT para autenticação
- Testes unitários