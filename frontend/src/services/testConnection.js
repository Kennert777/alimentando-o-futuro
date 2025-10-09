import axios from 'axios';
import { apiService } from './apiService.js';

export const testBackendConnection = async () => {
    try {
        console.log('Testando conexão com backend...');
        const response = await axios.get(apiService.ping());
        console.log('✅ Backend conectado:', response.data);
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar com backend:', error.message);
        return false;
    }
};

export const testApiEndpoints = async () => {
    const tests = [
        { name: 'Ping', url: apiService.ping() },
        { name: 'Health', url: apiService.health() },
        { name: 'Usuários', url: apiService.usuarios.listar() },
        { name: 'Hortas', url: apiService.hortas.listar() },
        { name: 'Colheitas', url: apiService.colheitas.listar() }
    ];

    console.log('🧪 Testando endpoints da API...');
    
    for (const test of tests) {
        try {
            const response = await axios.get(test.url);
            console.log(`✅ ${test.name}: OK (${response.status})`);
        } catch (error) {
            console.log(`❌ ${test.name}: ERRO (${error.response?.status || 'Network Error'})`);
        }
    }
};