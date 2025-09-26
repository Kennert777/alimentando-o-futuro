import axios from 'axios';

// Configuração base do axios
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://alimentandoofuturo.somee.com/api';
  }
  
  // Para GitHub Codespaces
  if (window.location.hostname.includes('github.dev')) {
    return window.location.origin.replace('-5173', '-8080') + '/api';
  }
  
  return '/api'; // Proxy local
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentAdmin');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Disponibilizar globalmente
window.axios = api;

export default api;