const API_URL = "http://localhost:8080/api";
const AUTH_URL = "http://localhost:8080/auth";

export const apiService = {
  // Autenticação (2 endpoints)
  auth: {
    register: () => `${AUTH_URL}/register`,
    login: () => `${AUTH_URL}/login`,
  },

  // Usuários (4 endpoints)
  usuarios: {
    listar: () => `${API_URL}/usuarios`,
    findAll: () => `${API_URL}/usuarios/findAll`,
    atualizar: (id) => `${API_URL}/usuarios/${id}`,
    deletar: (id) => `${API_URL}/usuarios/${id}`,
  },

  // Hortas (5 endpoints)
  hortas: {
    listar: () => `${API_URL}/hortas`,
    criar: () => `${API_URL}/hortas`,
    buscar: (id) => `${API_URL}/hortas/${id}`,
    atualizar: (id) => `${API_URL}/hortas/${id}`,
    deletar: (id) => `${API_URL}/hortas/${id}`,
  },

  // Colheitas (5 endpoints)
  colheitas: {
    listar: () => `${API_URL}/colheitas`,
    criar: () => `${API_URL}/colheitas`,
    buscar: (id) => `${API_URL}/colheitas/${id}`,
    atualizar: (id) => `${API_URL}/colheitas/${id}`,
    deletar: (id) => `${API_URL}/colheitas/${id}`,
  },

  // Reset de Senhas (8 endpoints)
  passwordReset: {
    listar: () => `${API_URL}/password-reset`,
    criar: () => `${API_URL}/password-reset`,
    buscar: (id) => `${API_URL}/password-reset/${id}`,
    buscarPorToken: (token) => `${API_URL}/password-reset/token/${token}`,
    buscarPorEmail: (email) => `${API_URL}/password-reset/email/${email}`,
    atualizar: (id) => `${API_URL}/password-reset/${id}`,
    deletar: (id) => `${API_URL}/password-reset/${id}`,
    deletarPorEmail: (email) => `${API_URL}/password-reset/email/${email}`,
  },

  // Suporte (8 endpoints)
  support: {
    listar: () => `${API_URL}/support`,
    criar: () => `${API_URL}/support`,
    buscar: (id) => `${API_URL}/support/${id}`,
    buscarPorEmail: (email) => `${API_URL}/support/email/${email}`,
    buscarPorStatus: (status) => `${API_URL}/support/status/${status}`,
    atualizar: (id) => `${API_URL}/support/${id}`,
    atualizarStatus: (id) => `${API_URL}/support/${id}/status`,
    deletar: (id) => `${API_URL}/support/${id}`,
  },
};

// Compatibilidade com código existente
export const auth = apiService.auth;
export const usuarios = apiService.usuarios;
export const hortas = apiService.hortas;
export const colheitas = apiService.colheitas;