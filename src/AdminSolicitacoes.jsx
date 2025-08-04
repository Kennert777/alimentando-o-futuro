import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './database.js';

export default function AdminSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('todas');
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
        if (!currentAdmin || currentAdmin.tipo_perfil !== 'admin') {
            window.location.href = '/admin/login';
            return;
        }
        setAdmin(currentAdmin);
        loadSolicitacoes();
    }, []);

    const loadSolicitacoes = async () => {
        try {
            const todasSolicitacoes = await db.buscarTodasSolicitacoes();
            setSolicitacoes(todasSolicitacoes);
        } catch (error) {
            console.error('Erro ao carregar solicitações:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, novoStatus, resposta = '') => {
        try {
            await db.atualizarSolicitacao(id, {
                status: novoStatus,
                resposta_admin: resposta
            }, admin.id);
            loadSolicitacoes();
        } catch (error) {
            alert('Erro ao atualizar solicitação: ' + error.message);
        }
    };

    const aprovar = (id) => {
        const resposta = prompt('Resposta para o usuário (opcional):');
        handleStatusChange(id, 'aprovada', resposta || 'Solicitação aprovada.');
    };

    const recusar = (id) => {
        const resposta = prompt('Motivo da recusa:');
        if (resposta) {
            handleStatusChange(id, 'rejeitada', resposta);
        }
    };

    const solicitacoesFiltradas = solicitacoes.filter(s => {
        if (filtro === 'todas') return true;
        return s.status === filtro;
    });

    const getStatusBadge = (status) => {
        const badges = {
            'pendente': 'bg-warning',
            'em_analise': 'bg-info',
            'aprovada': 'bg-success',
            'rejeitada': 'bg-danger',
            'concluida': 'bg-success'
        };
        return badges[status] || 'bg-secondary';
    };

    const getUrgenciaBadge = (urgencia) => {
        const badges = {
            'baixa': 'bg-secondary',
            'media': 'bg-primary',
            'alta': 'bg-warning',
            'critica': 'bg-danger'
        };
        return badges[urgencia] || 'bg-secondary';
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>📋 Solicitações de Apoio</h2>
                <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
            </div>

            {/* Filtros */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Filtrar por Status:</label>
                            <select 
                                className="form-select"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            >
                                <option value="todas">Todas</option>
                                <option value="pendente">Pendentes</option>
                                <option value="em_analise">Em Análise</option>
                                <option value="aprovada">Aprovadas</option>
                                <option value="rejeitada">Rejeitadas</option>
                                <option value="concluida">Concluídas</option>
                            </select>
                        </div>
                        <div className="col-md-6 d-flex align-items-end">
                            <div className="text-muted">
                                Total: {solicitacoesFiltradas.length} solicitações
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Solicitações */}
            <div className="row">
                {solicitacoesFiltradas.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            Nenhuma solicitação encontrada.
                        </div>
                    </div>
                ) : (
                    solicitacoesFiltradas.map(solicitacao => (
                        <div key={solicitacao.id} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6 className="card-title">{solicitacao.titulo}</h6>
                                        <div>
                                            <span className={`badge ${getStatusBadge(solicitacao.status)} me-1`}>
                                                {solicitacao.status}
                                            </span>
                                            <span className={`badge ${getUrgenciaBadge(solicitacao.urgencia)}`}>
                                                {solicitacao.urgencia}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p><strong>Tipo:</strong> {solicitacao.tipo_solicitacao}</p>
                                    <p><strong>Usuário ID:</strong> {solicitacao.usuario_id}</p>
                                    <p><strong>Descrição:</strong> {solicitacao.descricao}</p>
                                    
                                    <small className="text-muted">
                                        Solicitado em: {new Date(solicitacao.data_solicitacao).toLocaleDateString()}
                                    </small>
                                    
                                    {solicitacao.resposta_admin && (
                                        <div className="mt-2 p-2 bg-light rounded">
                                            <strong>Resposta Admin:</strong> {solicitacao.resposta_admin}
                                        </div>
                                    )}
                                    
                                    {solicitacao.status === 'pendente' && (
                                        <div className="mt-3">
                                            <button 
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => aprovar(solicitacao.id)}
                                            >
                                                ✓ Aprovar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() => recusar(solicitacao.id)}
                                            >
                                                ✗ Recusar
                                            </button>
                                            <button 
                                                className="btn btn-warning btn-sm"
                                                onClick={() => handleStatusChange(solicitacao.id, 'em_analise')}
                                            >
                                                👁️ Em Análise
                                            </button>
                                        </div>
                                    )}
                                    
                                    {solicitacao.status === 'aprovada' && (
                                        <div className="mt-3">
                                            <button 
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleStatusChange(solicitacao.id, 'concluida')}
                                            >
                                                ✓ Marcar como Concluída
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}