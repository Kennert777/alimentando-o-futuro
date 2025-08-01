// Inicializa dados padrão do sistema
export const initializeDefaultData = () => {
    // Cria usuário admin se não existir
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = users.find(u => u.email === 'admin@admin.com');
    
    if (!adminExists) {
        const adminUser = {
            id: 1,
            nome: 'Administrador',
            email: 'admin@admin.com',
            telefone: '(11) 99999-9999',
            password: 'admin123',
            pontos: 0,
            emblemas: ['🛠️ Admin'],
            dataCadastro: new Date().toISOString(),
            isAdmin: true
        };
        
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuário admin criado: admin@admin.com / admin123');
    }

    // Inicializa dados de exemplo se não existirem
    if (!localStorage.getItem('chatMessages')) {
        const exampleMessages = {
            geral: [
                {
                    id: 1,
                    userId: 1,
                    userName: 'Administrador',
                    text: 'Bem-vindos ao chat da comunidade Alimentando o Futuro! 🌱',
                    timestamp: new Date().toISOString(),
                    room: 'geral',
                    isSupport: true
                }
            ],
            suporte: []
        };
        localStorage.setItem('chatMessages', JSON.stringify(exampleMessages));
    }
};

// Executa na inicialização
initializeDefaultData();