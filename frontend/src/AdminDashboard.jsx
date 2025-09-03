import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from './config/api.js';
import { useAdminAuth } from './useAuth.js';
import { AdminSessionInfo } from './ProtectedRoute.jsx';

export default function AdminDashboard() {
    const { admin, loading: authLoading, isAuthenticated } = useAdminAuth();
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [notificacoes, setNotificacoes] = useState([]);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            loadStats();
        }
    }, [authLoading, isAuthenticated]);

    const loadStats = async () => {
        try {
            const estatisticas = await db.obterEstatisticas();
            const solicitacoes = await db.buscarTodasSolicitacoes();
            const pendentes = solicitacoes.filter(s => s.status === 'pendente').length;
            
            const notificacoesAdmin = await db.buscarNotificacoesAdmin();
            const naoLidas = notificacoesAdmin.filter(n => !n.lida).length;
            
            setStats({
                ...estatisticas,
                solicitacoesPendentes: pendentes,
                notificacoesNaoLidas: naoLidas
            });
            
            setNotificacoes(notificacoesAdmin.slice(0, 5)); // Últimas 5
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
            setStats({
                totalUsuarios: 0,
                totalHortas: 0,
                totalColheitas: 0,
                solicitacoesPendentes: 0,
                notificacoesNaoLidas: 0
            });
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentAdmin');
        window.location.href = '/';
    };

    if (authLoading || loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;
    
    if (!isAuthenticated) return null;

    return (
        <div className="container mt-4">
            <AdminSessionInfo />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 style={{ color: "#4F732C" }}>🔐 Painel Administrativo</h2>
                    <div className="badge bg-danger mb-2">ACESSO RESTRITO - ADMIN</div>
                </div>
                <div className="text-end">
                    <div className="mb-2">
                        <span className="badge bg-success me-2">👨‍💼 {admin?.nome}</span>
                        <span className="badge bg-info">🔑 {admin?.tipo_perfil}</span>
                    </div>
                    <button onClick={logout} className="btn btn-outline-danger btn-sm">Sair do Admin</button>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#D9C179" }}>
                        <div className="card-body">
                            <h3>{stats.totalUsuarios}</h3>
                            <p>Usuários</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#D9AE89" }}>
                        <div className="card-body">
                            <h3>{stats.totalHortas}</h3>
                            <p>Hortas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#AEBF2C" }}>
                        <div className="card-body">
                            <h3>{stats.totalColheitas}</h3>
                            <p>Colheitas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#558C03", color: "white" }}>
                        <div className="card-body">
                            <h3>{stats.solicitacoesPendentes}</h3>
                            <p>Pendentes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notificações Recentes */}
            {notificacoes.length > 0 && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0">🔔 Notificações Recentes</h5>
                                    <span className="badge bg-danger">{stats.notificacoesNaoLidas} não lidas</span>
                                </div>
                                <div className="list-group list-group-flush">
                                    {notificacoes.map(notif => (
                                        <div key={notif.id} className={`list-group-item ${!notif.lida ? 'bg-light' : ''}`}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="mb-1">
                                                        {notif.tipo === 'solicitacao' && '📝'}
                                                        {notif.tipo === 'chat' && '💬'}
                                                        {notif.tipo === 'cadastro' && '👤'}
                                                        {notif.tipo === 'horta' && '🌱'}
                                                        {notif.tipo === 'colheita' && '🌾'}
                                                        {' '}{notif.titulo}
                                                    </h6>
                                                    <p className="mb-1 small">{notif.mensagem}</p>
                                                    <small className="text-muted">
                                                        {new Date(notif.data_criacao).toLocaleString()}
                                                    </small>
                                                </div>
                                                {!notif.lida && (
                                                    <span className="badge bg-primary">Nova</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-3">
                                    <Link to="/admin/notificacoes" className="btn btn-outline-primary btn-sm">
                                        Ver todas as notificações
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row mb-4">
            </div>

            {/* Atalhos Rápidos Exclusivos do Admin */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-danger">
                        <div className="card-header bg-danger text-white">
                            <h5 className="mb-0">⚡ Ações Rápidas do Administrador</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <button className="btn btn-outline-danger btn-sm w-100 mb-2" onClick={() => alert('Backup do sistema iniciado!')}>🔄 Backup Sistema</button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-outline-warning btn-sm w-100 mb-2" onClick={() => alert('Modo manutenção ativado!')}>🔧 Modo Manutenção</button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-outline-info btn-sm w-100 mb-2" onClick={() => window.location.href = '/admin/notificacoes'}>📧 Enviar Notificação</button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-outline-success btn-sm w-100 mb-2" onClick={() => alert('Logs do sistema exportados!')}>📋 Exportar Logs</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu de Funcionalidades */}
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>👥 Gerenciar Usuários</h5>
                            <p>Incluir, editar e excluir usuários</p>
                            <Link to="/admin/usuarios" className="btn btn-primary" style={{ backgroundColor: "#4F732C", border: "none" }}>
                                Acessar
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>🌱 Gerenciar Hortas</h5>
                            <p>Cadastrar e editar hortas comunitárias</p>
                            <Link to="/admin/hortas" className="btn btn-primary" style={{ backgroundColor: "#558C03", border: "none" }}>
                                Acessar
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>📋 Solicitações</h5>
                            <p>Aprovar ou recusar pedidos de apoio</p>
                            <Link to="/admin/solicitacoes" className="btn btn-primary" style={{ backgroundColor: "#AEBF2C", border: "none" }}>
                                Acessar ({stats.solicitacoesPendentes})
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>💡 Dicas</h5>
                            <p>Inserir e editar dicas de cultivo</p>
                            <Link to="/admin/dicas" className="btn btn-primary" style={{ backgroundColor: "#D9C179", border: "none", color: "#333" }}>
                                Acessar
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>📊 Relatórios</h5>
                            <p>Gerar relatórios com filtros</p>
                            <Link to="/admin/relatorios" className="btn btn-primary" style={{ backgroundColor: "#D9AE89", border: "none", color: "#333" }}>
                                Acessar
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="card h-100 border-warning">
                        <div className="card-body text-center">
                            <h5>🎮 Gamificação</h5>
                            <p>Controlar pontos e desafios</p>
                            <div className="badge bg-warning text-dark mb-2">EM DESENVOLVIMENTO</div>
                            <br />
                            <button className="btn btn-warning" onClick={() => alert('Sistema de gamificação em desenvolvimento. Funcionalidades básicas disponíveis no painel legado.')}>Acessar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}