// Simulação de banco de dados usando localStorage
// Em produção, isso seria substituído por uma API real

class Database {
  constructor() {
    this.initializeDatabase();
  }

  initializeDatabase() {
    // Inicializa tabelas se não existirem
    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify([]));
    }
    if (!localStorage.getItem('hortas')) {
      localStorage.setItem('hortas', JSON.stringify([]));
    }
    if (!localStorage.getItem('colheitas')) {
      localStorage.setItem('colheitas', JSON.stringify([]));
    }
    if (!localStorage.getItem('solicitacoes_apoio')) {
      localStorage.setItem('solicitacoes_apoio', JSON.stringify([]));
    }
    if (!localStorage.getItem('dicas')) {
      localStorage.setItem('dicas', JSON.stringify([]));
    }
    if (!localStorage.getItem('notificacoes_admin')) {
      localStorage.setItem('notificacoes_admin', JSON.stringify([]));
    }
    if (!localStorage.getItem('mensagens_chat')) {
      localStorage.setItem('mensagens_chat', JSON.stringify([]));
    }
  }

  // Usuários
  async criarUsuario(dadosUsuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar se email já existe
    if (usuarios.find(u => u.email === dadosUsuario.email)) {
      throw new Error('Email já cadastrado');
    }

    const novoUsuario = {
      id: Date.now(),
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      telefone: dadosUsuario.telefone || '',
      senha: dadosUsuario.senha, // Em produção, usar hash
      tipo_perfil: 'usuario',
      pontos: 0,
      nivel: 1,
      data_cadastro: new Date().toISOString(),
      data_ultimo_acesso: null,
      ativo: true,
      endereco: dadosUsuario.endereco || '',
      cidade: dadosUsuario.cidade || '',
      estado: dadosUsuario.estado || ''
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Notificar admin sobre novo cadastro
    await this.criarNotificacaoAdmin(
      'cadastro',
      'Novo usuário cadastrado',
      `${novoUsuario.nome} se cadastrou no sistema`,
      { nome: novoUsuario.nome, email: novoUsuario.email }
    );
    
    return { ...novoUsuario, senha: undefined }; // Não retornar senha
  }

  async autenticarUsuario(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (!usuario) {
      throw new Error('Email ou senha incorretos');
    }

    // Atualizar último acesso
    usuario.data_ultimo_acesso = new Date().toISOString();
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    return { ...usuario, senha: undefined }; // Não retornar senha
  }

  async buscarUsuarioPorId(id) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.id === parseInt(id));
    return usuario ? { ...usuario, senha: undefined } : null;
  }

  // Hortas
  async criarHorta(dadosHorta, usuarioId) {
    const hortas = JSON.parse(localStorage.getItem('hortas') || '[]');
    
    const novaHorta = {
      id: Date.now(),
      nome: dadosHorta.nome,
      descricao: dadosHorta.descricao || '',
      localizacao: dadosHorta.localizacao,
      latitude: dadosHorta.latitude || null,
      longitude: dadosHorta.longitude || null,
      tipo_cultivo: dadosHorta.tipo_cultivo,
      area_m2: dadosHorta.area_m2 || null,
      capacidade_pessoas: dadosHorta.capacidade_pessoas || null,
      status: 'planejamento',
      usuario_responsavel_id: usuarioId,
      data_criacao: new Date().toISOString(),
      data_ultima_atualizacao: new Date().toISOString(),
      aprovada: false,
      data_aprovacao: null,
      admin_aprovador_id: null
    };

    hortas.push(novaHorta);
    localStorage.setItem('hortas', JSON.stringify(hortas));
    
    // Adicionar pontos ao usuário
    await this.adicionarPontos(usuarioId, 50, 'cadastro_horta');
    
    // Notificar admin
    const usuario = await this.buscarUsuarioPorId(usuarioId);
    await this.criarNotificacaoAdmin(
      'horta',
      'Nova horta cadastrada',
      `${usuario.nome} cadastrou uma nova horta: ${novaHorta.nome}`,
      { usuario: usuario.nome, horta: novaHorta.nome, localizacao: novaHorta.localizacao }
    );
    
    return novaHorta;
  }

  async buscarHortasPorUsuario(usuarioId) {
    const hortas = JSON.parse(localStorage.getItem('hortas') || '[]');
    return hortas.filter(h => h.usuario_responsavel_id === parseInt(usuarioId));
  }

  async buscarTodasHortas() {
    return JSON.parse(localStorage.getItem('hortas') || '[]');
  }

  async atualizarHorta(id, dadosAtualizacao) {
    const hortas = JSON.parse(localStorage.getItem('hortas') || '[]');
    const index = hortas.findIndex(h => h.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Horta não encontrada');
    }

    hortas[index] = {
      ...hortas[index],
      ...dadosAtualizacao,
      data_ultima_atualizacao: new Date().toISOString()
    };

    localStorage.setItem('hortas', JSON.stringify(hortas));
    return hortas[index];
  }

  // Colheitas
  async criarColheita(dadosColheita, usuarioId) {
    const colheitas = JSON.parse(localStorage.getItem('colheitas') || '[]');
    
    const novaColheita = {
      id: Date.now(),
      horta_id: dadosColheita.horta_id,
      usuario_id: usuarioId,
      tipo_planta: dadosColheita.tipo_planta,
      quantidade_kg: dadosColheita.quantidade_kg,
      data_colheita: dadosColheita.data_colheita,
      data_registro: new Date().toISOString(),
      qualidade: dadosColheita.qualidade || 'boa',
      destino: dadosColheita.destino || '',
      observacoes: dadosColheita.observacoes || '',
      foto_url: dadosColheita.foto_url || ''
    };

    colheitas.push(novaColheita);
    localStorage.setItem('colheitas', JSON.stringify(colheitas));
    
    // Adicionar pontos ao usuário
    await this.adicionarPontos(usuarioId, 25, 'colheita');
    
    // Notificar admin
    const usuario = await this.buscarUsuarioPorId(usuarioId);
    await this.criarNotificacaoAdmin(
      'colheita',
      'Nova colheita registrada',
      `${usuario.nome} registrou colheita de ${novaColheita.quantidade_kg}kg de ${novaColheita.tipo_planta}`,
      { usuario: usuario.nome, planta: novaColheita.tipo_planta, quantidade: novaColheita.quantidade_kg }
    );
    
    return novaColheita;
  }

  async buscarColheitasPorUsuario(usuarioId) {
    const colheitas = JSON.parse(localStorage.getItem('colheitas') || '[]');
    return colheitas.filter(c => c.usuario_id === parseInt(usuarioId));
  }

  // Solicitações de Apoio
  async criarSolicitacaoApoio(dadosSolicitacao, usuarioId) {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes_apoio') || '[]');
    
    const novaSolicitacao = {
      id: Date.now(),
      usuario_id: usuarioId,
      horta_id: dadosSolicitacao.horta_id || null,
      tipo_solicitacao: dadosSolicitacao.tipo_solicitacao,
      titulo: dadosSolicitacao.titulo,
      descricao: dadosSolicitacao.descricao,
      urgencia: dadosSolicitacao.urgencia || 'media',
      status: 'pendente',
      data_solicitacao: new Date().toISOString(),
      data_resposta: null,
      resposta_admin: null,
      admin_responsavel_id: null,
      valor_estimado: dadosSolicitacao.valor_estimado || null
    };

    solicitacoes.push(novaSolicitacao);
    localStorage.setItem('solicitacoes_apoio', JSON.stringify(solicitacoes));
    
    // Notificar admin
    const usuario = await this.buscarUsuarioPorId(usuarioId);
    await this.criarNotificacaoAdmin(
      'solicitacao',
      'Nova solicitação de apoio',
      `${usuario.nome} fez uma solicitação: ${novaSolicitacao.titulo}`,
      { 
        usuario: usuario.nome, 
        email: usuario.email,
        tipo: novaSolicitacao.tipo_solicitacao,
        titulo: novaSolicitacao.titulo,
        urgencia: novaSolicitacao.urgencia
      }
    );
    
    return novaSolicitacao;
  }

  async buscarSolicitacoesPorUsuario(usuarioId) {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes_apoio') || '[]');
    return solicitacoes.filter(s => s.usuario_id === parseInt(usuarioId));
  }

  // Sistema de Pontos
  async adicionarPontos(usuarioId, pontos, tipoAcao) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex(u => u.id === parseInt(usuarioId));
    
    if (index !== -1) {
      usuarios[index].pontos += pontos;
      
      // Calcular novo nível (a cada 100 pontos = 1 nível)
      usuarios[index].nivel = Math.floor(usuarios[index].pontos / 100) + 1;
      
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      // Registrar ação de gamificação
      const gamificacao = JSON.parse(localStorage.getItem('gamificacao') || '[]');
      gamificacao.push({
        id: Date.now(),
        usuario_id: parseInt(usuarioId),
        tipo_acao: tipoAcao,
        pontos_ganhos: pontos,
        data_acao: new Date().toISOString(),
        descricao: `Ganhou ${pontos} pontos por ${tipoAcao}`
      });
      localStorage.setItem('gamificacao', JSON.stringify(gamificacao));
    }
  }

  // Estatísticas
  async obterEstatisticas() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const hortas = JSON.parse(localStorage.getItem('hortas') || '[]');
    const colheitas = JSON.parse(localStorage.getItem('colheitas') || '[]');
    
    return {
      totalUsuarios: usuarios.length,
      totalHortas: hortas.length,
      totalColheitas: colheitas.length,
      hortasAtivas: hortas.filter(h => h.status !== 'inativo').length,
      usuariosAtivos: usuarios.filter(u => u.ativo).length
    };
  }

  // FUNÇÕES ADMINISTRATIVAS
  
  // Gerenciar Usuários
  async buscarTodosUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.map(u => ({ ...u, senha: undefined }));
  }

  async atualizarUsuario(id, dadosAtualizacao) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    usuarios[index] = { ...usuarios[index], ...dadosAtualizacao };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    return { ...usuarios[index], senha: undefined };
  }

  async excluirUsuario(id) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const novaLista = usuarios.filter(u => u.id !== parseInt(id));
    localStorage.setItem('usuarios', JSON.stringify(novaLista));
  }

  // Aprovar Solicitações
  async buscarTodasSolicitacoes() {
    return JSON.parse(localStorage.getItem('solicitacoes_apoio') || '[]');
  }

  async atualizarSolicitacao(id, dadosAtualizacao, adminId) {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes_apoio') || '[]');
    const index = solicitacoes.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Solicitação não encontrada');
    }

    solicitacoes[index] = {
      ...solicitacoes[index],
      ...dadosAtualizacao,
      data_resposta: new Date().toISOString(),
      admin_responsavel_id: adminId
    };

    localStorage.setItem('solicitacoes_apoio', JSON.stringify(solicitacoes));
    return solicitacoes[index];
  }

  // Dicas
  async criarDica(dadosDica, autorId) {
    const dicas = JSON.parse(localStorage.getItem('dicas') || '[]');
    
    const novaDica = {
      id: Date.now(),
      titulo: dadosDica.titulo,
      conteudo: dadosDica.conteudo,
      categoria: dadosDica.categoria,
      tipo_planta: dadosDica.tipo_planta || null,
      dificuldade: dadosDica.dificuldade || 'medio',
      autor_id: autorId,
      data_criacao: new Date().toISOString(),
      data_atualizacao: new Date().toISOString(),
      ativa: true,
      visualizacoes: 0,
      curtidas: 0,
      tags: dadosDica.tags || '',
      imagem_url: dadosDica.imagem_url || '',
      video_url: dadosDica.video_url || ''
    };

    dicas.push(novaDica);
    localStorage.setItem('dicas', JSON.stringify(dicas));
    return novaDica;
  }

  async buscarTodasDicas() {
    return JSON.parse(localStorage.getItem('dicas') || '[]');
  }

  async atualizarDica(id, dadosAtualizacao) {
    const dicas = JSON.parse(localStorage.getItem('dicas') || '[]');
    const index = dicas.findIndex(d => d.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Dica não encontrada');
    }

    dicas[index] = {
      ...dicas[index],
      ...dadosAtualizacao,
      data_atualizacao: new Date().toISOString()
    };

    localStorage.setItem('dicas', JSON.stringify(dicas));
    return dicas[index];
  }

  // Relatórios
  async gerarRelatorio(tipo, filtros = {}) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const hortas = JSON.parse(localStorage.getItem('hortas') || '[]');
    const colheitas = JSON.parse(localStorage.getItem('colheitas') || '[]');
    
    let dados = [];
    
    switch (tipo) {
      case 'usuarios':
        dados = usuarios.map(u => ({
          id: u.id,
          nome: u.nome,
          email: u.email,
          pontos: u.pontos,
          nivel: u.nivel,
          data_cadastro: u.data_cadastro,
          ativo: u.ativo
        }));
        break;
        
      case 'hortas':
        dados = hortas.map(h => ({
          id: h.id,
          nome: h.nome,
          localizacao: h.localizacao,
          tipo_cultivo: h.tipo_cultivo,
          status: h.status,
          data_criacao: h.data_criacao,
          aprovada: h.aprovada
        }));
        break;
        
      case 'colheitas':
        dados = colheitas.map(c => ({
          id: c.id,
          tipo_planta: c.tipo_planta,
          quantidade_kg: c.quantidade_kg,
          data_colheita: c.data_colheita,
          qualidade: c.qualidade,
          usuario_id: c.usuario_id,
          horta_id: c.horta_id
        }));
        break;
    }
    
    // Aplicar filtros se fornecidos
    if (filtros.dataInicio) {
      dados = dados.filter(item => {
        const dataItem = new Date(item.data_colheita || item.data_criacao || item.data_cadastro);
        return dataItem >= new Date(filtros.dataInicio);
      });
    }
    
    if (filtros.dataFim) {
      dados = dados.filter(item => {
        const dataItem = new Date(item.data_colheita || item.data_criacao || item.data_cadastro);
        return dataItem <= new Date(filtros.dataFim);
      });
    }
    
    return {
      tipo,
      dados,
      total: dados.length,
      filtros,
      data_geracao: new Date().toISOString()
    };
  }

  // Notificações para Admin
  async criarNotificacaoAdmin(tipo, titulo, mensagem, dados = {}) {
    const notificacoes = JSON.parse(localStorage.getItem('notificacoes_admin') || '[]');
    
    const novaNotificacao = {
      id: Date.now(),
      tipo, // 'solicitacao', 'chat', 'cadastro', 'colheita'
      titulo,
      mensagem,
      dados,
      lida: false,
      data_criacao: new Date().toISOString()
    };

    notificacoes.unshift(novaNotificacao); // Adiciona no início
    localStorage.setItem('notificacoes_admin', JSON.stringify(notificacoes));
    
    // Enviar email para admin
    this.enviarEmailAdmin(titulo, mensagem, dados);
    
    return novaNotificacao;
  }

  async buscarNotificacoesAdmin() {
    return JSON.parse(localStorage.getItem('notificacoes_admin') || '[]');
  }

  async marcarNotificacaoLida(id) {
    const notificacoes = JSON.parse(localStorage.getItem('notificacoes_admin') || '[]');
    const index = notificacoes.findIndex(n => n.id === parseInt(id));
    
    if (index !== -1) {
      notificacoes[index].lida = true;
      localStorage.setItem('notificacoes_admin', JSON.stringify(notificacoes));
    }
  }

  // Enviar email para admin
  enviarEmailAdmin(titulo, mensagem, dados) {
    const subject = encodeURIComponent(`[Alimentando o Futuro] ${titulo}`);
    const body = encodeURIComponent(
      `${mensagem}\n\n` +
      `Dados adicionais:\n${JSON.stringify(dados, null, 2)}\n\n` +
      `Acesse o painel admin: ${window.location.origin}/admin/dashboard`
    );
    
    // Tentar abrir cliente de email
    try {
      window.open(`mailto:rm94720@estudante.fieb.edu.br?subject=${subject}&body=${body}`);
    } catch (error) {
      console.log('Erro ao abrir cliente de email:', error);
    }
  }

  // Mensagens de Chat
  async salvarMensagemChat(usuario, mensagem) {
    const mensagens = JSON.parse(localStorage.getItem('mensagens_chat') || '[]');
    
    const novaMensagem = {
      id: Date.now(),
      usuario_id: usuario.id,
      usuario_nome: usuario.nome,
      usuario_email: usuario.email,
      mensagem,
      data_envio: new Date().toISOString()
    };

    mensagens.push(novaMensagem);
    localStorage.setItem('mensagens_chat', JSON.stringify(mensagens));
    
    // Notificar admin
    await this.criarNotificacaoAdmin(
      'chat',
      'Nova mensagem no chat',
      `${usuario.nome} enviou uma mensagem no chat`,
      { usuario: usuario.nome, email: usuario.email, mensagem }
    );
    
    return novaMensagem;
  }

  async buscarMensagensChat() {
    return JSON.parse(localStorage.getItem('mensagens_chat') || '[]');
  }
}

// Instância única do banco de dados
const db = new Database();
export default db;