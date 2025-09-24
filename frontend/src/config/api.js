/**
 * Configuração da API para conectar com o backend Spring Boot
 * 
 * Em desenvolvimento: usa proxy do Vite (/api -> localhost:8080)
 * Em produção: usa URL completa do backend no Somee.com
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://alimentandoofuturo.somee.com/api'
    : '/api');

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
  },
  
  // Endpoints para localizações no mapa
  localizacoes: {
    criar: `${API_BASE_URL}/localizacoes`, // POST - Criar nova localização
    listar: `${API_BASE_URL}/localizacoes`, // GET - Listar localizações
    porRegiao: (estado, cidade) => `${API_BASE_URL}/localizacoes/regiao?estado=${estado}&cidade=${cidade}`,
    atualizar: (id) => `${API_BASE_URL}/localizacoes/${id}`, // PUT - Atualizar localização
    excluir: (id) => `${API_BASE_URL}/localizacoes/${id}` // DELETE - Excluir localização
  },
  
  // Endpoints para relatórios
  relatorios: {
    exportarCsv: (usuarioId) => `${API_BASE_URL}/relatorios/csv/${usuarioId}`, // GET - Exportar CSV
    graficos: (usuarioId) => `${API_BASE_URL}/relatorios/graficos/${usuarioId}`, // GET - Dados para gráficos
    producaoMensal: (usuarioId) => `${API_BASE_URL}/relatorios/producao-mensal/${usuarioId}` // GET - Produção mensal
  }
};

// Exporta a URL base para uso em outros arquivos se necessário
export default API_BASE_URL;