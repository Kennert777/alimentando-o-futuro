// Configuração da API para conectar com o backend Spring Boot
const API_BASE_URL = '/api';

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
  },
  
  // Colheitas
  colheitas: {
    criar: `${API_BASE_URL}/colheitas`,
    listar: `${API_BASE_URL}/colheitas`,
    porUsuario: (usuarioId) => `${API_BASE_URL}/colheitas/usuario/${usuarioId}`
  }
};

export default API_BASE_URL;