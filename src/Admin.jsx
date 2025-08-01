import { useState, useEffect } from 'react';

export default function Admin() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('usuarios');
    const [users, setUsers] = useState([]);
    const [hortas, setHortas] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser || currentUser.email !== 'admin@admin.com') {
            alert('Acesso negado. Apenas administradores.');
            window.location.href = '/';
            return;
        }
        setUser(currentUser);
        loadData();
    }, []);

    const loadData = () => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const allHortas = JSON.parse(localStorage.getItem('userHortas') || '[]');
        
        setUsers(allUsers);
        setHortas(allHortas);
        
        setStats({
            totalUsers: allUsers.length,
            totalHortas: allHortas.length,
            hortasAprovadas: allHortas.filter(h => h.aprovada).length,
            hortasPendentes: allHortas.filter(h => !h.aprovada).length
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
            <h2 style={{ color: "#4F732C" }}>🛠️ Painel Administrativo</h2>
            
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
                            <p>Pendentes</p>
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

            {activeTab === 'relatorios' && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5>📈 Crescimento de Usuários</h5>
                            </div>
                            <div className="card-body">
                                <p>Total de usuários cadastrados: <strong>{stats.totalUsers}</strong></p>
                                <p>Usuários ativos (com pontos): <strong>{users.filter(u => u.pontos > 0).length}</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
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
                </div>
            )}
        </div>
    );
}