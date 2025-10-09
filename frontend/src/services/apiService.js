const API_URL = "http://localhost:8080/api";

export const apiService = {
  // Usuários
  usuarios: {
    listar: () => `${API_URL}/usuarios`,
    buscar: (id) => `${API_URL}/usuarios/${id}`,
    cadastro: () => `${API_URL}/usuarios/cadastro`,
    login: () => `${API_URL}/usuarios/login`,
    atualizar: (id) => `${API_URL}/usuarios/${id}`,
    deletar: (id) => `${API_URL}/usuarios/${id}`,
  },

  // Hortas
  hortas: {
    listar: () => `${API_URL}/hortas`,
    buscar: (id) => `${API_URL}/hortas/${id}`,
    criar: () => `${API_URL}/hortas`,
    atualizar: (id) => `${API_URL}/hortas/${id}`,
    deletar: (id) => `${API_URL}/hortas/${id}`,
    porUsuario: (usuarioId) => `${API_URL}/hortas/usuario/${usuarioId}`,
    aprovar: (id) => `${API_URL}/hortas/${id}/aprovar`,
  },

  // Colheitas
  colheitas: {
    listar: () => `${API_URL}/colheitas`,
    buscar: (id) => `${API_URL}/colheitas/${id}`,
    criar: () => `${API_URL}/colheitas`,
    atualizar: (id) => `${API_URL}/colheitas/${id}`,
    deletar: (id) => `${API_URL}/colheitas/${id}`,
    porUsuario: (usuarioId) => `${API_URL}/colheitas/usuario/${usuarioId}`,
    porHorta: (hortaId) => `${API_URL}/colheitas/horta/${hortaId}`,
  },

  // Health check
  ping: () => `${API_URL}/ping`,
  health: () => `${API_URL}/health`,
};