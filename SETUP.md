# Guia de Configuração - Alimentando o Futuro

## 🚀 Configuração Rápida

### 1. Pré-requisitos
```bash
# Verificar versões
node --version  # 18+
java --version  # 17+
mvn --version   # 3.6+
```

### 2. Clonar e Configurar
```bash
git clone <repository-url>
cd alimentando-o-futuro
```

### 3. Backend (Spring Boot)
```bash
cd backend

# Configurar banco de dados
# Execute os scripts SQL:
# 1. database-setup.sql
# 2. populate-data.sql  
# 3. new-tables.sql

# Configurar email no application.yml
# Substitua MAIL_PASSWORD pela senha real
mail:
  password: SUA_SENHA_EMAIL_AQUI

# Executar
mvn spring-boot:run
```

### 4. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 5. Acessar
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- API: http://localhost:8080/api

## 📧 Configuração de Email

### Outlook/Office 365
```yaml
mail:
  host: smtp.office365.com
  port: 587
  username: rm94720@estudante.fieb.edu.br
  password: ${MAIL_PASSWORD:sua_senha}
  properties:
    mail:
      smtp:
        auth: true
        starttls:
          enable: true
```

### Gmail (Alternativo)
```yaml
mail:
  host: smtp.gmail.com
  port: 587
  username: seu@gmail.com
  password: sua_senha_app
```

## 🗄️ Banco de Dados

### SQL Server (Somee.com)
```yaml
spring:
  datasource:
    url: jdbc:sqlserver://AlimentandoOFuturo.mssql.somee.com;databaseName=AlimentandoOFuturo;encrypt=true;trustServerCertificate=true
    username: alimentandoofuturo
    password: "@ITB123456"
```

### Executar Scripts SQL
1. `database-setup.sql` - Tabelas principais
2. `populate-data.sql` - Dados de exemplo
3. `new-tables.sql` - Novas funcionalidades

## 🔐 Configuração de Segurança

### JWT Secret
```yaml
jwt:
  secret: alimentandoofuturo2024secretkeysupersecure
  expiration: 28800000 # 8 horas
```

### CORS
```yaml
cors:
  allowed-origins:
    - http://localhost:5173
    - https://alimentando-o-futuro.netlify.app
```

## 🌐 Deploy em Produção

### Frontend (Netlify)
```bash
cd frontend
npm run build
# Upload da pasta dist/ no Netlify
```

### Backend (Somee.com)
```bash
cd backend
mvn clean package -DskipTests
# Upload do arquivo .jar no Somee.com
```

## 🧪 Testes

### Usuários de Teste
```
Admin:
- Email: admin@alimentandoofuturo.com
- Senha: password

Usuário:
- Email: maria@exemplo.com
- Senha: password
```

### Funcionalidades para Testar
1. ✅ Cadastro de usuário
2. ✅ Login/Logout
3. ✅ Redefinição de senha
4. ✅ Envio de suporte
5. ✅ Dashboard responsivo
6. ✅ Carrossel da home
7. ✅ Todas as páginas

## 🔧 Troubleshooting

### Problemas Comuns

#### Email não envia
```bash
# Verificar configurações SMTP
# Testar credenciais manualmente
# Verificar logs do Spring Boot
```

#### Banco não conecta
```bash
# Verificar URL de conexão
# Testar credenciais
# Verificar firewall/rede
```

#### Frontend não carrega
```bash
# Verificar se backend está rodando
# Verificar CORS
# Limpar cache do navegador
```

#### Sessão expira rapidamente
```bash
# Verificar configuração JWT
# Verificar localStorage
# Verificar useAuth.jsx
```

### Logs Úteis
```bash
# Backend
tail -f logs/spring.log

# Frontend
# Abrir DevTools > Console
```

## 📱 Configuração Mobile

### PWA (Progressive Web App)
```json
// public/manifest.json
{
  "name": "Alimentando o Futuro",
  "short_name": "AlimentandoFuturo",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#4F732C"
}
```

## 🔄 Atualizações

### Atualizar Dependências
```bash
# Frontend
cd frontend
npm update

# Backend
cd backend
mvn versions:use-latest-versions
```

### Backup do Banco
```sql
-- Backup das tabelas principais
SELECT * INTO usuarios_backup FROM usuarios;
SELECT * INTO hortas_backup FROM hortas;
SELECT * INTO colheitas_backup FROM colheitas;
```

## 📊 Monitoramento

### Métricas Importantes
- Tempo de resposta da API
- Taxa de erro de email
- Uso de memória
- Conexões de banco ativas

### Logs de Auditoria
- Logins/Logouts
- Redefinições de senha
- Mensagens de suporte
- Erros de sistema

## 🆘 Suporte

### Contatos
- Email: rm94720@estudante.fieb.edu.br
- Sistema interno de suporte
- Documentação: `/documentacao`

### Recursos Úteis
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [Bootstrap Docs](https://getbootstrap.com)
- [SQL Server Docs](https://docs.microsoft.com/sql)

---

**Última atualização:** 2024  
**Versão:** 2.0.0