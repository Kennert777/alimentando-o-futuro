import { useState, useEffect } from 'react';

export default function Admin() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('usuarios');
    const [users, setUsers] = useState([]);
    const [hortas, setHortas] = useState([]);
    const [stats, setStats] = useState({});
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [metas, setMetas] = useState([]);

    useEffect(() => {
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
        if (!currentAdmin || currentAdmin.tipo_perfil !== 'admin') {
            alert('Acesso negado. Apenas administradores.');
            window.location.href = '/admin/login';
            return;
        }
        setUser(currentAdmin);
        loadData();
    }, []);

    const loadData = () => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const allHortas = JSON.parse(localStorage.getItem('userHortas') || '[]');
        
        setUsers(allUsers);
        setHortas(allHortas);
        
        const allSolicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
        const allMetas = JSON.parse(localStorage.getItem('metas') || '[]');
        
        setSolicitacoes(allSolicitacoes);
        setMetas(allMetas);
        
        setStats({
            totalUsers: allUsers.length,
            totalHortas: allHortas.length,
            hortasAprovadas: allHortas.filter(h => h.aprovada).length,
            hortasPendentes: allHortas.filter(h => !h.aprovada).length,
            solicitacoesPendentes: allSolicitacoes.filter(s => s.status === 'pendente').length,
            metasAtivas: allMetas.filter(m => m.ativa).length
        });
    };

    const approveHorta = (hortaId) => {
        const allHortas = JSON.parse(localStorage.getItem('userHortas') || '[]');
        const updatedHortas = allHortas.map(h => 
            h.id === hortaId ? { ...h, aprovada: true } : h
        );
        localStorage.setItem('userHortas', JSON.stringify(updatedHortas));
        
        // Adiciona pontos ao usuário
        const horta = allHortas.find(h => h.id === hortaId);
        if (horta) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedUsers = allUsers.map(u => 
                u.id === horta.userId ? { ...u, pontos: (u.pontos || 0) + 100 } : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
        
        loadData();
    };

    const deleteUser = (userId) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedUsers = allUsers.filter(u => u.id !== userId);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            loadData();
        }
    };

    const deleteHorta = (hortaId) => {
        if (confirm('Tem certeza que deseja excluir esta horta?')) {
            const allHortas = JSON.parse(localStorage.getItem('userHortas') || '[]');
            const updatedHortas = allHortas.filter(h => h.id !== hortaId);
            localStorage.setItem('userHortas', JSON.stringify(updatedHortas));
            loadData();
        }
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 style={{ color: "#4F732C" }}>🛠️ Painel Administrativo LEGADO</h2>
                <div className="alert alert-warning mb-0 py-2 px-3">
                    <small>⚠️ Esta é a versão antiga. Use o <a href="/admin/dashboard" className="alert-link">novo painel</a></small>
                </div>
            </div>
            
            {/* Estatísticas */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#D9C179" }}>
                        <div className="card-body">
                            <h3>{stats.totalUsers}</h3>
                            <p>Total de Usuários</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#D9AE89" }}>
                        <div className="card-body">
                            <h3>{stats.totalHortas}</h3>
                            <p>Total de Hortas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#AEBF2C" }}>
                        <div className="card-body">
                            <h3>{stats.hortasAprovadas}</h3>
                            <p>Hortas Aprovadas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center bg-warning">
                        <div className="card-body">
                            <h3>{stats.hortasPendentes}</h3>
                            <p>Hortas Pendentes</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#FF6B6B" }}>
                        <div className="card-body text-white">
                            <h3>{stats.solicitacoesPendentes || 0}</h3>
                            <p>Solicitações Pendentes</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#4ECDC4" }}>
                        <div className="card-body text-white">
                            <h3>{stats.metasAtivas || 0}</h3>
                            <p>Metas Ativas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#45B7D1" }}>
                        <div className="card-body text-white">
                            <h3>{users.reduce((total, u) => total + (u.pontos || 0), 0)}</h3>
                            <p>Total de Pontos</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'usuarios' ? 'active' : ''}`}
                        onClick={() => setActiveTab('usuarios')}
                    >
                        👥 Usuários
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'hortas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hortas')}
                    >
                        🌱 Hortas
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'apoio' ? 'active' : ''}`}
                        onClick={() => setActiveTab('apoio')}
                    >
                        🆘 Solicitações
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'dicas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dicas')}
                    >
                        💡 Dicas
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'gamificacao' ? 'active' : ''}`}
                        onClick={() => setActiveTab('gamificacao')}
                    >
                        🏆 Gamificação
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'relatorios' ? 'active' : ''}`}
                        onClick={() => setActiveTab('relatorios')}
                    >
                        📊 Relatórios
                    </button>
                </li>
            </ul>

            {/* Conteúdo das Tabs */}
            {activeTab === 'usuarios' && (
                <div className="card">
                    <div className="card-header">
                        <h5>Gerenciar Usuários</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Pontos</th>
                                        <th>Data Cadastro</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.nome}</td>
                                            <td>{user.email}</td>
                                            <td>{user.telefone}</td>
                                            <td>{user.pontos || 0}</td>
                                            <td>{new Date(user.dataCadastro).toLocaleDateString()}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-warning me-1"
                                                    onClick={() => window.location.href = '/admin/usuarios'}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-info me-1"
                                                    onClick={() => alert('Redefinir senha: ' + user.email)}
                                                >
                                                    Reset Senha
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'hortas' && (
                <div className="card">
                    <div className="card-header">
                        <h5>Gerenciar Hortas</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Localização</th>
                                        <th>Tipo</th>
                                        <th>Status</th>
                                        <th>Aprovada</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hortas.map(horta => (
                                        <tr key={horta.id}>
                                            <td>{horta.nome}</td>
                                            <td>{horta.localizacao}</td>
                                            <td>{horta.tipo}</td>
                                            <td>{horta.status}</td>
                                            <td>
                                                <span className={`badge ${horta.aprovada ? 'bg-success' : 'bg-warning'}`}>
                                                    {horta.aprovada ? 'Sim' : 'Não'}
                                                </span>
                                            </td>
                                            <td>{new Date(horta.dataCriacao).toLocaleDateString()}</td>
                                            <td>
                                                {!horta.aprovada && (
                                                    <button 
                                                        className="btn btn-sm btn-success me-2"
                                                        onClick={() => approveHorta(horta.id)}
                                                    >
                                                        Aprovar
                                                    </button>
                                                )}
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => deleteHorta(horta.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'apoio' && (
                <div className="card">
                    <div className="card-header">
                        <h5>Gerenciar Solicitações de Apoio</h5>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-success">
                            <strong>✅ Sistema Funcional:</strong> Acesse o <a href="/admin/solicitacoes" className="alert-link">novo sistema de solicitações</a> para gerenciar pedidos de apoio.
                            <br />Funcionalidades: Aprovar/Rejeitar solicitações, Gerenciar recursos, Conectar doadores.
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'dicas' && (
                <div className="card">
                    <div className="card-header">
                        <h5>Gerenciar Dicas e Conteúdo</h5>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <button className="btn btn-success me-2" onClick={() => window.location.href = '/admin/dicas'}>+ Nova Dica</button>
                                <button className="btn btn-primary me-2" onClick={() => alert('Funcionalidade de receitas será implementada em breve')}>+ Nova Receita</button>
                            </div>
                            <div className="col-md-6">
                                <select className="form-select">
                                    <option>Filtrar por categoria</option>
                                    <option>Cultivo</option>
                                    <option>Nutrição</option>
                                    <option>Receitas</option>
                                    <option>Sustentabilidade</option>
                                </select>
                            </div>
                        </div>
                        <div className="alert alert-info">
                            <strong>Funcionalidades disponíveis:</strong>
                            <ul className="mb-0">
                                <li>Criar e editar dicas de cultivo</li>
                                <li>Moderar receitas de usuários</li>
                                <li>Gerenciar base de conhecimento de plantas</li>
                                <li>Aprovar conteúdo gerado pela comunidade</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'gamificacao' && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5>🎯 Desafios e Metas</h5>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-success mb-3" onClick={() => alert('Sistema de desafios em desenvolvimento. Use o novo painel admin.')}>+ Novo Desafio</button>
                                <div className="list-group">
                                    <div className="list-group-item d-flex justify-content-between align-items-center">
                                        Primeira Horta
                                        <span className="badge bg-success">Ativo</span>
                                    </div>
                                    <div className="list-group-item d-flex justify-content-between align-items-center">
                                        Colhedor Semanal
                                        <span className="badge bg-success">Ativo</span>
                                    </div>
                                    <div className="list-group-item d-flex justify-content-between align-items-center">
                                        Login Diário
                                        <span className="badge bg-warning">Pausado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5>🏆 Emblemas e Recompensas</h5>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-primary mb-3" onClick={() => alert('Sistema de emblemas em desenvolvimento. Use o novo painel admin.')}>+ Novo Emblema</button>
                                <div className="row">
                                    <div className="col-6 text-center mb-2">
                                        <div className="badge bg-success p-2">🌱 Primeiro Passo</div>
                                        <small className="d-block">0 pontos</small>
                                    </div>
                                    <div className="col-6 text-center mb-2">
                                        <div className="badge bg-success p-2">🌿 Cultivador</div>
                                        <small className="d-block">50 pontos</small>
                                    </div>
                                    <div className="col-6 text-center mb-2">
                                        <div className="badge bg-success p-2">🏆 Mestre da Horta</div>
                                        <small className="d-block">500 pontos</small>
                                    </div>
                                    <div className="col-6 text-center mb-2">
                                        <div className="badge bg-success p-2">📚 Educador</div>
                                        <small className="d-block">200 pontos</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'relatorios' && (
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h5>📈 Crescimento de Usuários</h5>
                            </div>
                            <div className="card-body">
                                <p>Total de usuários: <strong>{stats.totalUsers}</strong></p>
                                <p>Usuários ativos: <strong>{users.filter(u => u.pontos > 0).length}</strong></p>
                                <p>Taxa de engajamento: <strong>
                                    {stats.totalUsers > 0 ? Math.round((users.filter(u => u.pontos > 0).length / stats.totalUsers) * 100) : 0}%
                                </strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h5>🌱 Status das Hortas</h5>
                            </div>
                            <div className="card-body">
                                <p>Hortas aprovadas: <strong>{stats.hortasAprovadas}</strong></p>
                                <p>Hortas pendentes: <strong>{stats.hortasPendentes}</strong></p>
                                <p>Taxa de aprovação: <strong>
                                    {stats.totalHortas > 0 ? Math.round((stats.hortasAprovadas / stats.totalHortas) * 100) : 0}%
                                </strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h5>🎯 Impacto Social</h5>
                            </div>
                            <div className="card-body">
                                <p>Colheitas registradas: <strong>0</strong></p>
                                <p>Kg de alimentos: <strong>0 kg</strong></p>
                                <p>Receitas compartilhadas: <strong>0</strong></p>
                                <button className="btn btn-sm btn-primary" onClick={() => window.location.href = '/admin/relatorios'}>Gerar Relatório Completo</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}