// Inicialização do sistema de autenticação
// Garante que as sessões sejam mantidas corretamente

// Função para verificar e corrigir sessões inconsistentes
export function initAuth() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
        
        // Se há admin logado mas não há currentUser, sincroniza
        if (currentAdmin && currentAdmin.tipo_perfil === 'admin' && !currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentAdmin));
            console.log('✅ Sessão admin sincronizada');
        }
        
        // Se há currentUser admin mas não há currentAdmin, sincroniza
        if (currentUser && currentUser.tipo_perfil === 'admin' && !currentAdmin) {
            localStorage.setItem('currentAdmin', JSON.stringify(currentUser));
            console.log('✅ Sessão admin sincronizada');
        }
        
        // Remove sessões inválidas
        if (currentUser && !currentUser.id) {
            localStorage.removeItem('currentUser');
            console.log('🧹 Sessão inválida removida');
        }
        
        if (currentAdmin && (!currentAdmin.id || currentAdmin.tipo_perfil !== 'admin')) {
            localStorage.removeItem('currentAdmin');
            console.log('🧹 Sessão admin inválida removida');
        }
        
    } catch (error) {
        console.error('❌ Erro na inicialização da autenticação:', error);
        // Em caso de erro, limpa tudo para evitar problemas
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentAdmin');
    }
}

// Função para debug de autenticação
export function debugAuth() {
    const currentUser = localStorage.getItem('currentUser');
    const currentAdmin = localStorage.getItem('currentAdmin');
    
    console.log('🔍 Debug Autenticação:');
    console.log('currentUser:', currentUser);
    console.log('currentAdmin:', currentAdmin);
    
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            console.log('Usuário logado:', user.nome, '- Tipo:', user.tipo_perfil);
        } catch (e) {
            console.log('❌ Erro ao parsear currentUser');
        }
    }
    
    if (currentAdmin) {
        try {
            const admin = JSON.parse(currentAdmin);
            console.log('Admin logado:', admin.nome, '- Tipo:', admin.tipo_perfil);
        } catch (e) {
            console.log('❌ Erro ao parsear currentAdmin');
        }
    }
}

// Executa inicialização automaticamente
initAuth();