// Dados de teste para facilitar o desenvolvimento
import db from './database.js';

export const initTestData = async () => {
  try {
    // Verificar se já existe usuário de teste
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.length > 0) {
      console.log('Dados de teste já existem');
      return;
    }

    // Criar usuário de teste
    const usuarioTeste = await db.criarUsuario({
      nome: 'João Silva',
      email: 'joao@teste.com',
      telefone: '(11) 99999-9999',
      senha: '123456',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP'
    });

    console.log('Usuário de teste criado:', usuarioTeste);

    // Criar horta de teste
    const hortaTeste = await db.criarHorta({
      nome: 'Horta Comunitária Central',
      descricao: 'Horta para cultivo de hortaliças orgânicas',
      localizacao: 'Praça da Sé, São Paulo - SP',
      tipo_cultivo: 'organico',
      area_m2: 50,
      capacidade_pessoas: 10
    }, usuarioTeste.id);

    console.log('Horta de teste criada:', hortaTeste);

    // Criar colheita de teste
    const colheitaTeste = await db.criarColheita({
      horta_id: hortaTeste.id,
      tipo_planta: 'Alface',
      quantidade_kg: 2.5,
      data_colheita: new Date().toISOString().split('T')[0],
      qualidade: 'excelente',
      destino: 'consumo_proprio',
      observacoes: 'Primeira colheita da horta'
    }, usuarioTeste.id);

    console.log('Colheita de teste criada:', colheitaTeste);

    // Criar usuário admin de teste
    const adminTeste = await db.criarUsuario({
      nome: 'Admin Sistema',
      email: 'admin@teste.com',
      telefone: '(11) 88888-8888',
      senha: 'admin123',
      endereco: 'Rua Admin, 456',
      cidade: 'São Paulo',
      estado: 'SP'
    });
    
    // Atualizar para tipo admin
    await db.atualizarUsuario(adminTeste.id, { tipo_perfil: 'admin' });
    
    console.log('Admin de teste criado:', adminTeste);

    console.log('Dados de teste inicializados com sucesso!');
    console.log('Login usuário: joao@teste.com / 123456');
    console.log('Login admin: admin@teste.com / admin123');

  } catch (error) {
    console.error('Erro ao inicializar dados de teste:', error);
  }
};

// Função para limpar todos os dados (útil para desenvolvimento)
export const clearAllData = () => {
  localStorage.removeItem('usuarios');
  localStorage.removeItem('hortas');
  localStorage.removeItem('colheitas');
  localStorage.removeItem('solicitacoes_apoio');
  localStorage.removeItem('gamificacao');
  localStorage.removeItem('currentUser');
  console.log('Todos os dados foram limpos');
};

// Executar automaticamente se não houver dados
if (typeof window !== 'undefined') {
  // Aguardar um pouco para garantir que o DOM está carregado
  setTimeout(() => {
    initTestData();
  }, 1000);
}