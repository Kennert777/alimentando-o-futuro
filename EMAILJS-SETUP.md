# Configuração EmailJS

Para que o envio de emails funcione, você precisa configurar o EmailJS:

## 1. Criar conta no EmailJS
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita

## 2. Configurar serviço de email
- Vá em "Email Services"
- Adicione um serviço (Gmail, Outlook, etc.)
- Anote o **Service ID**

## 3. Criar template de email
- Vá em "Email Templates"
- Crie um novo template com:
  ```
  Assunto: Nova mensagem de apoio - {{from_name}}
  
  Nome: {{from_name}}
  Email: {{from_email}}
  
  Mensagem:
  {{message}}
  ```
- Anote o **Template ID**

## 4. Obter Public Key
- Vá em "Account" > "General"
- Copie a **Public Key**

## 5. Atualizar código
No arquivo `src/Apoio.jsx`, substitua:
```javascript
await emailjs.send(
    'SEU_SERVICE_ID',     // Service ID
    'SEU_TEMPLATE_ID',    // Template ID  
    templateParams,
    'SUA_PUBLIC_KEY'      // Public Key
);
```

## 6. Configurar destinatário
O email será enviado para: **rm94720@estudante.fieb.edu.br**