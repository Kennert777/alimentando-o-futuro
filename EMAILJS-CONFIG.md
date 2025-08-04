# Configuração EmailJS - Alimentando o Futuro

## Como configurar o envio de emails

### 1. Criar conta no EmailJS
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita
- Confirme seu email

### 2. Configurar Serviço de Email
- No dashboard, vá em "Email Services"
- Clique em "Add New Service"
- Escolha seu provedor (Gmail, Outlook, etc.)
- Configure com suas credenciais

### 3. Criar Template de Email
- Vá em "Email Templates"
- Clique em "Create New Template"
- Use este template:

```
Assunto: {{subject}}

Nova solicitação de apoio recebida:

De: {{from_name}} ({{from_email}})
Tipo: {{tipo_solicitacao}}
Urgência: {{urgencia}}

Título: {{titulo}}

Descrição:
{{descricao}}

---
Mensagem completa:
{{message}}
```

### 4. Obter IDs de Configuração
- Service ID: Encontre em "Email Services"
- Template ID: Encontre em "Email Templates"
- Public Key: Encontre em "Account" > "General"

### 5. Atualizar o código
No arquivo `src/Apoio.jsx`, substitua:

```javascript
const SERVICE_ID = 'seu_service_id_aqui';
const TEMPLATE_ID = 'seu_template_id_aqui';
const PUBLIC_KEY = 'sua_public_key_aqui';
```

### 6. Testar
- Faça uma solicitação de apoio
- Verifique se o email chegou em rm94720@estudante.fieb.edu.br

## Configuração Atual
- **Email destino:** rm94720@estudante.fieb.edu.br
- **Fallback:** Abre cliente de email local se EmailJS falhar
- **Template:** Inclui todos os dados da solicitação

## Exemplo de Email Recebido
```
Assunto: Solicitação de Apoio - Preciso de sementes

Nova solicitação de apoio recebida:

De: João Silva (joao@teste.com)
Tipo: sementes
Urgência: media

Título: Preciso de sementes

Descrição:
Gostaria de receber sementes de tomate para minha horta comunitária.

---
Mensagem completa:
Tipo: sementes
Urgência: media

Título: Preciso de sementes

Descrição:
Gostaria de receber sementes de tomate para minha horta comunitária.
```