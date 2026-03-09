import axios from "axios";

const API_BASE_URL = 'http://localhost:8080';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const authHeaders = (token) => ({
  ...defaultHeaders,
  'Authorization': `Bearer ${token}`
});

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: defaultHeaders,
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { API_BASE_URL, defaultHeaders, authHeaders };
