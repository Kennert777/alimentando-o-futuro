# Informações do Sistema Administrativo

## 🔐 Acesso Administrativo

### Contas Admin Existentes:
- **Email:** admin@teste.com
- **Senha:** admin123

### Criar Nova Conta Admin:
1. Acesse: `/admin/register`
2. Preencha os dados
3. **Código Admin:** `ADMIN2025ITB`
4. Clique em "Cadastrar Admin"

## 📧 Sistema de Emails

### Configuração Atual:
- **Destino:** rm94720@estudante.fieb.edu.br
- **Método:** EmailJS + Fallback (mailto)
- **Status:** Funcional

### Como Funciona:
1. Usuário faz solicitação de apoio
2. Sistema salva no banco de dados
3. Tenta enviar via EmailJS
4. Se falhar, abre cliente de email local
5. Admin recebe notificação por email

## 🎯 Funcionalidades Admin:

### ✅ Implementadas:
- [x] Login/Cadastro de admin
- [x] Dashboard com estatísticas
- [x] Gerenciar usuários (CRUD completo)
- [x] Aprovar/recusar solicitações
- [x] Gerenciar dicas de cultivo
- [x] Gerar relatórios com filtros
- [x] Exportar dados em CSV
- [x] Sistema de gamificação integrado

### 📊 Relatórios Disponíveis:
- Usuários (com filtros de data)
- Hortas (status, localização, etc.)
- Colheitas (quantidade, qualidade, etc.)

### 🎮 Gamificação:
- Sistema de pontos automático
- Níveis baseados em pontuação
- Histórico de ações dos usuários

## 🚀 Como Usar:

1. **Login Admin:** `/admin/login`
2. **Dashboard:** Visão geral do sistema
3. **Usuários:** Gerenciar contas e permissões
4. **Solicitações:** Aprovar/recusar pedidos
5. **Dicas:** Criar conteúdo educativo
6. **Relatórios:** Análise de dados
7. **Hortas:** Gerenciar hortas comunitárias

## 🔧 Configurações:

### Código Admin:
- **Atual:** `ADMIN2025ITB`
- **Localização:** `src/AdminRegister.jsx`
- **Segurança:** Altere em produção

### Email:
- **Configuração:** `EMAILJS-CONFIG.md`
- **Fallback:** Sempre funcional via mailto
- **Destino:** rm94720@estudante.fieb.edu.br