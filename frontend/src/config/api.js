// Configuração da API para conectar com o backend Spring Boot
const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:8080/api';
  }
  // Para Codespaces: substitui a porta do frontend pela porta do backend
  const hostname = window.location.hostname;
  const backendHostname = hostname.replace(/-\d+\./, '-8080.');
  return `https://${backendHostname}/api`;
};

const API_BASE_URL = getApiUrl();

export const api = {
  // Usuários
  usuarios: {
    cadastro: `${API_BASE_URL}/usuarios/cadastro`,
    login: `${API_BASE_URL}/usuarios/login`,
    listar: `${API_BASE_URL}/usuarios`,
    buscar: (id) => `${API_BASE_URL}/usuarios/${id}`,
    atualizar: (id) => `${API_BASE_URL}/usuarios/${id}`,
    excluir: (id) => `${API_BASE_URL}/usuarios/${id}`,
    adicionarPontos: (id) => `${API_BASE_URL}/usuarios/${id}/pontos`
  },
  
  // Hortas
  hortas: {
    criar: `${API_BASE_URL}/hortas`,
    listar: `${API_BASE_URL}/hortas`,
    porUsuario: (usuarioId) => `${API_BASE_URL}/hortas/usuario/${usuarioId}`,
    buscar: (id) => `${API_BASE_URL}/hortas/${id}`,
    atualizar: (id) => `${API_BASE_URL}/hortas/${id}`
  }
};

export default API_BASE_URL;