import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ usuarios: 0, hortas: 0, colheitas: 0, suporte: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            
            const [usuariosResp, hortasResp, colheitasResp, suporteResp] = await Promise.all([
<<<<<<< HEAD:frontend/src/pages/admin/AdminDashboard.jsx
                fetch('https://backend-y6kz.onrender.com/api/usuarios', { headers }),
                fetch('https://backend-y6kz.onrender.com/api/hortas', { headers }),
                fetch('https://backend-y6kz.onrender.com/api/colheitas', { headers }),
                fetch('https://backend-y6kz.onrender.com/api/suporte', { headers })
=======
                fetch('http://localhost:8080/api/usuarios', { headers }),
                fetch('http://localhost:8080/api/hortas', { headers }),
                fetch('http://localhost:8080/api/colheitas', { headers }),
                fetch('http://localhost:8080/api/suporte', { headers })
>>>>>>> d1e8e21:frontend/src/AdminDashboard.jsx
            ]);
            
            const usuarios = await usuariosResp.json();
            const hortas = await hortasResp.json();
            const colheitas = await colheitasResp.json();
            const suporte = await suporteResp.json();
            
            setStats({
                usuarios: usuarios.length || 0,
                hortas: hortas.length || 0,
                colheitas: colheitas.length || 0,
                suporte: suporte.length || 0
            });
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        window.location.href = '/admin/login';
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 style={{ color: "#4F732C" }}>🏛️ Painel Administrativo</h2>
                        <div className="badge bg-danger">CONTROLE TOTAL DO SISTEMA</div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline-danger">Sair</button>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-center border-primary">
                        <div className="card-body">
                            <h3 className="text-primary">{stats.usuarios}</h3>
                            <p>Usuários Cadastrados</p>
                            <Link to="/admin/usuarios" className="btn btn-primary btn-sm">Gerenciar</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center border-success">
                        <div className="card-body">
                            <h3 className="text-success">{stats.hortas}</h3>
                            <p>Hortas Registradas</p>
                            <Link to="/admin/hortas" className="btn btn-success btn-sm">Gerenciar</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center border-warning">
                        <div className="card-body">
                            <h3 className="text-warning">{stats.colheitas}</h3>
                            <p>Colheitas Registradas</p>
                            <Link to="/admin/colheitas" className="btn btn-warning btn-sm">Gerenciar</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center border-danger">
                        <div className="card-body">
                            <h3 className="text-danger">{stats.suporte}</h3>
                            <p>Solicitações de Suporte</p>
                            <Link to="/admin/suporte" className="btn btn-danger btn-sm">Gerenciar</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu de Ações */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-info">
                        <div className="card-header bg-info text-white">
                            <h5 className="mb-0">🎛️ Painel de Controle Administrativo</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="list-group">
                                        <Link to="/admin/usuarios" className="list-group-item list-group-item-action">
                                            👥 Gerenciar Usuários
                                        </Link>
                                        <Link to="/admin/hortas" className="list-group-item list-group-item-action">
                                            🌱 Gerenciar Hortas
                                        </Link>
                                        <Link to="/admin/colheitas" className="list-group-item list-group-item-action">
                                            🌾 Gerenciar Colheitas
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="list-group">
                                        <Link to="/admin/suporte" className="list-group-item list-group-item-action">
                                            🆘 Gerenciar Suporte
                                        </Link>
                                        <Link to="/admin/relatorios" className="list-group-item list-group-item-action">
                                            📊 Relatórios
                                        </Link>
                                        <Link to="/admin/configuracoes" className="list-group-item list-group-item-action">
                                            ⚙️ Configurações
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}