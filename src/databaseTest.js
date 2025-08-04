// Teste de conectividade e funcionalidade do banco de dados
import db from './database.js';

export const testDatabase = async () => {
    console.log('🔍 Iniciando teste do banco de dados...');
    
    try {
        // Teste 1: Verificar inicialização
        console.log('✅ Teste 1: Inicialização do banco');
        const stats = await db.obterEstatisticas();
        console.log('Estatísticas:', stats);
        
        // Teste 2: Criar usuário
        console.log('✅ Teste 2: Criação de usuário');
        const usuario = await db.criarUsuario({
            nome: 'Teste DB',
            email: `teste-db-${Date.now()}@teste.com`,
            telefone: '(11) 99999-9999',
            senha: '123456'
        });
        console.log('Usuário criado:', usuario);
        
        // Teste 3: Autenticar usuário
        console.log('✅ Teste 3: Autenticação');
        const usuarioAuth = await db.autenticarUsuario(usuario.email, '123456');
        console.log('Usuário autenticado:', usuarioAuth);
        
        // Teste 4: Criar horta
        console.log('✅ Teste 4: Criação de horta');
        const horta = await db.criarHorta({
            nome: 'Horta Teste DB',
            localizacao: 'Local Teste',
            tipo_cultivo: 'organico',
            descricao: 'Teste de conectividade'
        }, usuario.id);
        console.log('Horta criada:', horta);
        
        // Teste 5: Criar colheita
        console.log('✅ Teste 5: Registro de colheita');
        const colheita = await db.criarColheita({
            horta_id: horta.id,
            tipo_planta: 'Alface Teste',
            quantidade_kg: 1.5,
            data_colheita: new Date().toISOString().split('T')[0],
            qualidade: 'boa',
            destino: 'consumo_proprio'
        }, usuario.id);
        console.log('Colheita criada:', colheita);
        
        // Teste 6: Criar solicitação
        console.log('✅ Teste 6: Solicitação de apoio');
        const solicitacao = await db.criarSolicitacaoApoio({
            tipo_solicitacao: 'sementes',
            titulo: 'Teste de Solicitação DB',
            descricao: 'Teste de conectividade do banco',
            urgencia: 'media'
        }, usuario.id);
        console.log('Solicitação criada:', solicitacao);
        
        // Teste 7: Verificar notificações admin
        console.log('✅ Teste 7: Notificações admin');
        const notificacoes = await db.buscarNotificacoesAdmin();
        console.log(`Notificações encontradas: ${notificacoes.length}`);
        
        // Teste 8: Estatísticas finais
        console.log('✅ Teste 8: Estatísticas finais');
        const statsFinais = await db.obterEstatisticas();
        console.log('Estatísticas finais:', statsFinais);
        
        console.log('🎉 Todos os testes do banco de dados passaram!');
        return true;
        
    } catch (error) {
        console.error('❌ Erro no teste do banco:', error);
        return false;
    }
};

// Teste de limpeza
export const cleanTestData = () => {
    const keys = [
        'usuarios', 'hortas', 'colheitas', 'solicitacoes_apoio', 
        'notificacoes_admin', 'mensagens_chat', 'dicas', 'gamificacao'
    ];
    
    keys.forEach(key => {
        const data = JSON.parse(localStorage.getItem(key) || '[]');
        const filtered = data.filter(item => 
            !item.nome?.includes('Teste DB') && 
            !item.email?.includes('teste-db') &&
            !item.titulo?.includes('Teste de Solicitação DB')
        );
        localStorage.setItem(key, JSON.stringify(filtered));
    });
    
    console.log('🧹 Dados de teste limpos');
};

// Auto-executar teste se em desenvolvimento
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    setTimeout(() => {
        testDatabase();
    }, 2000);
}