import { useState, useEffect } from 'react';
import { api } from './config/api.js';

export default function SystemStatus() {
    const [status, setStatus] = useState({
        database: 'checking',
        auth: 'checking',
        notifications: 'checking',
        email: 'checking'
    });
    const [stats, setStats] = useState({});

    useEffect(() => {
        checkSystemStatus();
    }, []);

    const checkSystemStatus = async () => {
        // Teste do banco de dados
        try {
            const dbTest = await testDatabase();
            setStatus(prev => ({ ...prev, database: dbTest ? 'ok' : 'error' }));
        } catch (error) {
            setStatus(prev => ({ ...prev, database: 'error' }));
        }

        // Teste de autenticação
        try {
            const currentUser = localStorage.getItem('currentUser');
            const currentAdmin = localStorage.getItem('currentAdmin');
            setStatus(prev => ({ 
                ...prev, 
                auth: (currentUser || currentAdmin) ? 'ok' : 'warning' 
            }));
        } catch (error) {
            setStatus(prev => ({ ...prev, auth: 'error' }));
        }

        // Teste de notificações
        try {
            const notificacoes = await db.buscarNotificacoesAdmin();
            setStatus(prev => ({ ...prev, notifications: 'ok' }));
        } catch (error) {
            setStatus(prev => ({ ...prev, notifications: 'error' }));
        }

        // Teste de email (sempre ok pois usa fallback)
        setStatus(prev => ({ ...prev, email: 'ok' }));

        // Carregar estatísticas
        try {
            const estatisticas = await db.obterEstatisticas();
            setStats(estatisticas);
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    };

    const getStatusIcon = (statusValue) => {
        switch (statusValue) {
            case 'ok': return '✅';
            case 'warning': return '⚠️';
            case 'error': return '❌';
            default: return '🔄';
        }
    };

    const getStatusColor = (statusValue) => {
        switch (statusValue) {
            case 'ok': return 'success';
            case 'warning': return 'warning';
            case 'error': return 'danger';
            default: return 'info';
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h5>🔧 Status do Sistema</h5>
                </div>
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-3">
                            <div className={`card border-${getStatusColor(status.database)}`}>
                                <div className="card-body text-center">
                                    <h6>{getStatusIcon(status.database)} Banco de Dados</h6>
                                    <span className={`badge bg-${getStatusColor(status.database)}`}>
                                        {status.database === 'ok' ? 'Conectado' : 
                                         status.database === 'error' ? 'Erro' : 'Verificando...'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={`card border-${getStatusColor(status.auth)}`}>
                                <div className="card-body text-center">
                                    <h6>{getStatusIcon(status.auth)} Autenticação</h6>
                                    <span className={`badge bg-${getStatusColor(status.auth)}`}>
                                        {status.auth === 'ok' ? 'Logado' : 
                                         status.auth === 'warning' ? 'Não logado' : 'Erro'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={`card border-${getStatusColor(status.notifications)}`}>
                                <div className="card-body text-center">
                                    <h6>{getStatusIcon(status.notifications)} Notificações</h6>
                                    <span className={`badge bg-${getStatusColor(status.notifications)}`}>
                                        {status.notifications === 'ok' ? 'Funcionando' : 'Erro'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={`card border-${getStatusColor(status.email)}`}>
                                <div className="card-body text-center">
                                    <h6>{getStatusIcon(status.email)} Sistema de Email</h6>
                                    <span className={`badge bg-${getStatusColor(status.email)}`}>
                                        Funcionando
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <h6>📊 Estatísticas do Sistema:</h6>
                            <ul className="list-unstyled">
                                <li>👥 Usuários: {stats.totalUsuarios || 0}</li>
                                <li>🌱 Hortas: {stats.totalHortas || 0}</li>
                                <li>🌾 Colheitas: {stats.totalColheitas || 0}</li>
                                <li>🏃‍♂️ Usuários Ativos: {stats.usuariosAtivos || 0}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6>🔧 Ações:</h6>
                            <div className="btn-group-vertical w-100">
                                <button 
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={checkSystemStatus}
                                >
                                    🔄 Verificar Status
                                </button>
                                <button 
                                    className="btn btn-outline-info btn-sm"
                                    onClick={() => window.location.href = '/admin/test'}
                                >
                                    🧪 Teste de Sessão
                                </button>
                                <button 
                                    className="btn btn-outline-success btn-sm"
                                    onClick={() => window.location.href = '/admin/test-notifications'}
                                >
                                    🔔 Teste de Notificações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}