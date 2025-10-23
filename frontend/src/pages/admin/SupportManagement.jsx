import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SupportManagement() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroStatus, setFiltroStatus] = useState('');

    useEffect(() => {
        loadSolicitacoes();
    }, []);

    const loadSolicitacoes = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const url = filtroStatus ? 
<<<<<<< HEAD:frontend/src/pages/admin/SupportManagement.jsx
                `https://backend-y6kz.onrender.com/api/suporte/status/${filtroStatus}` : 
                'https://backend-y6kz.onrender.com/api/suporte';
=======
                `http://localhost:8080/api/suporte/status/${filtroStatus}` : 
                'http://localhost:8080/api/suporte';
>>>>>>> d1e8e21:frontend/src/SupportManagement.jsx
                
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setSolicitacoes(data);
            }
        } catch (error) {
            console.error('Erro ao carregar solicitações:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, novoStatus) => {
        try {
            const token = localStorage.getItem('authToken');
<<<<<<< HEAD:frontend/src/pages/admin/SupportManagement.jsx
            const response = await fetch(`https://backend-y6kz.onrender.com/api/suporte/${id}/status`, {
=======
            const response = await fetch(`http://localhost:8080/api/suporte/${id}/status`, {
>>>>>>> d1e8e21:frontend/src/SupportManagement.jsx
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: novoStatus })
            });
            
            if (response.ok) {
                alert('Status atualizado com sucesso!');
                loadSolicitacoes();
            } else {
                alert('Erro ao atualizar status.');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        }
    };

    const deleteSolicitacao = async (id) => {
        if (confirm('Tem certeza que deseja deletar esta solicitação?')) {
            try {
                const token = localStorage.getItem('authToken');
<<<<<<< HEAD:frontend/src/pages/admin/SupportManagement.jsx
                const response = await fetch(`https://backend-y6kz.onrender.com/api/suporte/${id}`, {
=======
                const response = await fetch(`http://localhost:8080/api/suporte/${id}`, {
>>>>>>> d1e8e21:frontend/src/SupportManagement.jsx
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    alert('Solicitação deletada com sucesso!');
                    loadSolicitacoes();
                } else {
                    alert('Erro ao deletar solicitação.');
                }
            } catch (error) {
                alert('Erro de conexão com o servidor.');
            }
        }
    };

    const handleFiltroChange = (status) => {
        setFiltroStatus(status);
        setTimeout(loadSolicitacoes, 100);
    };

    const getStatusBadge = (status) => {
        const badges = {
            'PENDENTE': 'bg-warning',
            'EM_ANDAMENTO': 'bg-info',
            'RESOLVIDO': 'bg-success',
            'CANCELADO': 'bg-danger'
        };
        return badges[status] || 'bg-secondary';
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>🆘 Gestão de Suporte</h2>
                <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
            </div>

            {/* Filtros */}
            <div className="card mb-4">
                <div className="card-body">
                    <h6>Filtrar por Status:</h6>
                    <div className="btn-group" role="group">
                        <button 
                            className={`btn ${filtroStatus === '' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handleFiltroChange('')}
                        >
                            Todos
                        </button>
                        <button 
                            className={`btn ${filtroStatus === 'PENDENTE' ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={() => handleFiltroChange('PENDENTE')}
                        >
                            Pendente
                        </button>
                        <button 
                            className={`btn ${filtroStatus === 'EM_ANDAMENTO' ? 'btn-info' : 'btn-outline-info'}`}
                            onClick={() => handleFiltroChange('EM_ANDAMENTO')}
                        >
                            Em Andamento
                        </button>
                        <button 
                            className={`btn ${filtroStatus === 'RESOLVIDO' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => handleFiltroChange('RESOLVIDO')}
                        >
                            Resolvido
                        </button>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    {solicitacoes.length === 0 ? (
                        <div className="text-center py-4">
                            <p>Nenhuma solicitação encontrada.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Assunto</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitacoes.map(solicitacao => (
                                        <tr key={solicitacao.id}>
                                            <td>{solicitacao.id}</td>
                                            <td>{solicitacao.email}</td>
                                            <td>{solicitacao.assunto}</td>
                                            <td>
                                                <span className={`badge ${getStatusBadge(solicitacao.status)}`}>
                                                    {solicitacao.status}
                                                </span>
                                            </td>
                                            <td>{new Date(solicitacao.dataCriacao).toLocaleDateString()}</td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button 
                                                        className="btn btn-outline-warning"
                                                        onClick={() => updateStatus(solicitacao.id, 'PENDENTE')}
                                                        disabled={solicitacao.status === 'PENDENTE'}
                                                    >
                                                        Pendente
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-info"
                                                        onClick={() => updateStatus(solicitacao.id, 'EM_ANDAMENTO')}
                                                        disabled={solicitacao.status === 'EM_ANDAMENTO'}
                                                    >
                                                        Em Andamento
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-success"
                                                        onClick={() => updateStatus(solicitacao.id, 'RESOLVIDO')}
                                                        disabled={solicitacao.status === 'RESOLVIDO'}
                                                    >
                                                        Resolvido
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-danger"
                                                        onClick={() => deleteSolicitacao(solicitacao.id)}
                                                    >
                                                        Deletar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}