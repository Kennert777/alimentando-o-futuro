// src/config/api.js

import axios from "axios";

// Troque a URL abaixo conforme o ambiente
// Localhost (para desenvolvimento):
// const API_URL = "http://localhost:8080/api";

// Somee (produção):
const API_URL = "https://alimentandoofuturo.somee.com/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
