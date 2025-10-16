import axios from 'axios';

const API_URL = 'https://backend-y6kz.onrender.com/api';

export const testBackendConnection = async () => {
    try {
        console.log('Testando conexão com backend...');
        const response = await axios.get(`${API_URL}/ping`);
        console.log('✅ Backend conectado:', response.data);
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar com backend:', error.message);
        return false;
    }
};

export const testApiEndpoints = async () => {
    const tests = [
        { name: 'Ping', url: `${API_URL}/ping` },
        { name: 'Health', url: `${API_URL}/health` },
        { name: 'Usuários', url: `${API_URL}/v1/usuario` },
        { name: 'Hortas', url: `${API_URL}/v1/horta` },
        { name: 'Colheitas', url: `${API_URL}/v1/colheita` }
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