# Informações do Sistema Administrativo

## 🔐 Acesso Administrativo

### Contas Admin Existentes:
- **Email:** rm94720@estudante.fieb.edu.br
- **Senha:** 123456

### Criar Nova Conta Admin:
1. Acesse: `/admin/register`
2. Preencha os dados
3. **Código Admin:** `ADMIN2025ITB`
4. Clique em "Cadastrar Admin"

## 📧 Sistema de Emails

### Configuração Atual:
- **Destino:** rm94720@estudante.fieb.edu.br
- **Método:** EmailJS + Fallback (kennert)
- **Status:** Funcional

### Como Funciona:
1. Usuário faz ação (solicitação, chat, cadastro, etc.)
2. Sistema salva no banco de dados
3. Cria notificação para admin
4. Envia email automático para rm94720@estudante.fieb.edu.br
5. Admin vê notificação no painel
6. Admin pode marcar como lida

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
- [x] Sistema de notificações em tempo real
- [x] Monitoramento de chat
- [x] Emails automáticos para admin

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
8. **Notificações:** Monitorar todas as atividades

## 🔧 Configurações:

### Código Admin:
- **Atual:** `ADMIN2025ITB`
- **Localização:** `src/AdminRegister.jsx`
- **Segurança:** Altere em produção

### Email:
- **Configuração:** `EMAILJS-CONFIG.md`
- **Fallback:** Sempre funcional via mailto
- **Destino:** rm94720@estudante.fieb.edu.br

### Notificações Automáticas:
- **Cadastros:** Novos usuários
- **Hortas:** Novas hortas cadastradas
- **Colheitas:** Registros de colheita
- **Solicitações:** Pedidos de apoio
- **Chat:** Mensagens dos usuários