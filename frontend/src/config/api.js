/**
 * Configuração da API para conectar com o backend Spring Boot
 * 
 * Utiliza proxy do Vite para redirecionar requisições /api
 * para o backend rodando na porta 8080
 * 
 * Em desenvolvimento:
 * - Frontend: localhost:3000 (ou 5173)
 * - Backend: localhost:8080
 * - Proxy: /api -> http://localhost:8080/api
 */
const API_BASE_URL = '/api';

/**
 * Objeto com todas as URLs dos endpoints da API
 * 
 * Organizado por funcionalidade para facilitar manutenção
 * e reutilização em diferentes componentes
 */
export const api = {
  // Endpoints relacionados a usuários
  usuarios: {
    cadastro: `${API_BASE_URL}/usuarios/cadastro`, // POST - Cadastrar usuário
    login: `${API_BASE_URL}/usuarios/login`, // POST - Autenticar usuário
    listar: `${API_BASE_URL}/usuarios`, // GET - Listar todos os usuários
    buscar: (id) => `${API_BASE_URL}/usuarios/${id}`, // GET - Buscar usuário por ID
    atualizar: (id) => `${API_BASE_URL}/usuarios/${id}`, // PUT - Atualizar usuário
    excluir: (id) => `${API_BASE_URL}/usuarios/${id}`, // DELETE - Excluir usuário
    adicionarPontos: (id) => `${API_BASE_URL}/usuarios/${id}/pontos` // POST - Adicionar pontos
  },
  
  // Endpoints relacionados a hortas
  hortas: {
    criar: `${API_BASE_URL}/hortas`, // POST - Criar nova horta
    listar: `${API_BASE_URL}/hortas`, // GET - Listar todas as hortas
    porUsuario: (usuarioId) => `${API_BASE_URL}/hortas/usuario/${usuarioId}`, // GET - Hortas por usuário
    buscar: (id) => `${API_BASE_URL}/hortas/${id}`, // GET - Buscar horta por ID
    atualizar: (id) => `${API_BASE_URL}/hortas/${id}` // PUT - Atualizar horta
  },
  
  // Endpoints relacionados a colheitas
  colheitas: {
    criar: `${API_BASE_URL}/colheitas`, // POST - Registrar nova colheita
    listar: `${API_BASE_URL}/colheitas`, // GET - Listar todas as colheitas
    porUsuario: (usuarioId) => `${API_BASE_URL}/colheitas/usuario/${usuarioId}` // GET - Colheitas por usuário
  }
};

// Exporta a URL base para uso em outros arquivos se necessário
export default API_BASE_URL;