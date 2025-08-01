# Configuração de Login Social

## 🔧 Para Implementação Real

### Google OAuth
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione existente
3. Ative a API Google+ 
4. Configure OAuth 2.0:
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
5. Obtenha Client ID

### Facebook Login
1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Crie um app
3. Configure Facebook Login:
   - Valid OAuth Redirect URIs: `http://localhost:3000/auth/facebook/callback`
4. Obtenha App ID

### Implementação com Bibliotecas

```bash
# Instalar dependências
npm install react-google-login react-facebook-login
```

```javascript
// Exemplo de implementação real
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const responseGoogle = (response) => {
  // Processar resposta do Google
  const userData = {
    name: response.profileObj.name,
    email: response.profileObj.email,
    provider: 'google'
  };
  // Salvar usuário
};

const responseFacebook = (response) => {
  // Processar resposta do Facebook
  const userData = {
    name: response.name,
    email: response.email,
    provider: 'facebook'
  };
  // Salvar usuário
};
```

## 🎭 Implementação Atual (Simulada)

- **Status:** Funcional para demonstração
- **Comportamento:** Cria usuários fictícios
- **Dados:** Salvos no localStorage
- **Benefícios:** 50 pontos bonus + emblemas especiais

### Como Testar:
1. Acesse a página de Login ou Registro
2. Clique em "🔍 Google" ou "📘 Facebook"
3. Aguarde simulação (1.5s)
4. Usuário será criado e logado automaticamente