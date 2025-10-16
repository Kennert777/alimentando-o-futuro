import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ hortas: 0, colheitas: 0, pontos: 0 });
    const { currentUser, logout: authLogout, requireAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!requireAuth()) return;
        
        if (currentUser) {
            setUser(currentUser);
            loadUserStats(currentUser.id);
        }
    }, [currentUser]);
    
    const loadUserStats = async (userId) => {
        try {
            const [hortasResponse, colheitasResponse, userResponse] = await Promise.all([
                axios.get(`https://backend-y6kz.onrender.com/api/hortas`),
                axios.get(`https://backend-y6kz.onrender.com/api/colheitas`),
                axios.get(`https://backend-y6kz.onrender.com/api/usuarios`)
            ]);
            
            const updatedUser = userResponse.data;
            setUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            setStats({
                hortas: hortasResponse.data.length,
                colheitas: colheitasResponse.data.length,
                pontos: updatedUser.pontos || 0
            });
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
            setStats({
                hortas: 0,
                colheitas: 0,
                pontos: user?.pontos || 0
            });
        }
    };

    const handleLogout = () => {
        authLogout();
        navigate('/');
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 style={{ color: "#4F732C" }}>Olá, {user.nome}!</h2>
                        <button onClick={handleLogout} className="btn btn-outline-danger">Sair</button>
                    </div>
                </div>
            </div>

            {/* Cards de Estatísticas */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#D9C179" }}>
                        <div className="card-body">
                            <h3>{stats.pontos}</h3>
                            <p>Pontos Sustentáveis</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#D9AE89" }}>
                        <div className="card-body">
                            <h3>{stats.hortas}</h3>
                            <p>Hortas Cadastradas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#AEBF2C" }}>
                        <div className="card-body">
                            <h3>{stats.colheitas}</h3>
                            <p>Colheitas Registradas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emblemas */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">🏆 Seus Emblemas</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {user.emblemas && user.emblemas.length > 0 ? (
                                    user.emblemas.map((emblema, index) => (
                                        <span key={index} className="badge bg-success p-2">
                                            {emblema}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-muted">Nenhum emblema conquistado ainda. Continue praticando ações sustentáveis!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ações Rápidas */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>🌱 Gerenciar Hortas</h5>
                            <p>Cadastre e monitore suas hortas comunitárias</p>
                            <Link to="/hortas-usuario" className="btn btn-primary" style={{ backgroundColor: "#4F732C", border: "none" }}>
                                Acessar
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <h5>🌾 Registrar Colheitas</h5>
                            <p>Registre suas colheitas e ganhe pontos</p>
                            <Link to="/colheitas" className="btn btn-primary" style={{ backgroundColor: "#558C03", border: "none" }}>
                                Acessar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}