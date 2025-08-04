import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './database.js';

export default function AdminNotificacoes() {
    const [notificacoes, setNotificacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
        if (!currentAdmin || currentAdmin.tipo_perfil !== 'admin') {
            window.location.href = '/admin/login';
            return;
        }
        loadNotificacoes();
    }, []);

    const loadNotificacoes = async () => {
        try {
            const todasNotificacoes = await db.buscarNotificacoesAdmin();
            setNotificacoes(todasNotificacoes);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        } finally {
            setLoading(false);
        }
    };

    const marcarComoLida = async (id) => {
        try {
            await db.marcarNotificacaoLida(id);
            loadNotificacoes();
        } catch (error) {
            console.error('Erro ao marcar como lida:', error);
        }
    };

    const marcarTodasLidas = async () => {
        try {
            const promises = notificacoes
                .filter(n => !n.lida)
                .map(n => db.marcarNotificacaoLida(n.id));
            await Promise.all(promises);
            loadNotificacoes();
        } catch (error) {
            console.error('Erro ao marcar todas como lidas:', error);
        }
    };

    const notificacoesFiltradas = notificacoes.filter(n => {
        if (filtro === 'todas') return true;
        if (filtro === 'nao_lidas') return !n.lida;
        return n.tipo === filtro;
    });

    const getIcone = (tipo) => {
        const icones = {
            'solicitacao': '📝',
            'chat': '💬',
            'cadastro': '👤',
            'horta': '🌱',
            'colheita': '🌾'
        };
        return icones[tipo] || '📢';
    };

    const getCor = (tipo) => {
        const cores = {
            'solicitacao': 'warning',
            'chat': 'info',
            'cadastro': 'success',
            'horta': 'primary',
            'colheita': 'secondary'
        };
        return cores[tipo] || 'light';
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>🔔 Notificações</h2>
                <div>
                    <button 
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={marcarTodasLidas}
                    >
                        ✓ Marcar todas como lidas
                    </button>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
                </div>
            </div>

            {/* Filtros */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Filtrar por:</label>
                            <select 
                                className="form-select"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            >
                                <option value="todas">Todas</option>
                                <option value="nao_lidas">Não lidas</option>
                                <option value="solicitacao">Solicitações</option>
                                <option value="chat">Chat</option>
                                <option value="cadastro">Cadastros</option>
                                <option value="horta">Hortas</option>
                                <option value="colheita">Colheitas</option>
                            </select>
                        </div>
                        <div className="col-md-6 d-flex align-items-end">
                            <div className="text-muted">
                                Total: {notificacoesFiltradas.length} notificações
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Notificações */}
            <div className="row">
                {notificacoesFiltradas.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            Nenhuma notificação encontrada.
                        </div>
                    </div>
                ) : (
                    notificacoesFiltradas.map(notif => (
                        <div key={notif.id} className="col-12 mb-3">
                            <div className={`card ${!notif.lida ? 'border-primary' : ''}`}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center mb-2">
                                                <span className="me-2" style={{ fontSize: '1.5rem' }}>
                                                    {getIcone(notif.tipo)}
                                                </span>
                                                <h6 className="mb-0">{notif.titulo}</h6>
                                                <span className={`badge bg-${getCor(notif.tipo)} ms-2`}>
                                                    {notif.tipo}
                                                </span>
                                                {!notif.lida && (
                                                    <span className="badge bg-danger ms-1">Nova</span>
                                                )}
                                            </div>
                                            
                                            <p className="mb-2">{notif.mensagem}</p>
                                            
                                            {notif.dados && Object.keys(notif.dados).length > 0 && (
                                                <div className="bg-light p-2 rounded mb-2">
                                                    <small><strong>Detalhes:</strong></small>
                                                    <ul className="small mb-0 mt-1">
                                                        {Object.entries(notif.dados).map(([key, value]) => (
                                                            <li key={key}>
                                                                <strong>{key}:</strong> {value}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            
                                            <small className="text-muted">
                                                {new Date(notif.data_criacao).toLocaleString()}
                                            </small>
                                        </div>
                                        
                                        <div className="ms-3">
                                            {!notif.lida && (
                                                <button 
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => marcarComoLida(notif.id)}
                                                >
                                                    ✓ Marcar como lida
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}