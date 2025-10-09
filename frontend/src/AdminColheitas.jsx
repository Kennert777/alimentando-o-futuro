import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiService } from './services/apiService.js';
import { Link } from 'react-router-dom';
import { useAdminAuth } from './useAuth.jsx';
import { AdminSessionInfo } from './ProtectedRoute.jsx';

export default function AdminColheitas() {
    const { admin, loading: authLoading, isAuthenticated } = useAdminAuth();
    const [colheitas, setColheitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            loadColheitas();
        }
    }, [authLoading, isAuthenticated]);

    const loadColheitas = async () => {
        try {
            const response = await axios.get(apiService.colheitas.listar());
            setColheitas(response.data);
        } catch (error) {
            console.error('Erro ao carregar colheitas:', error);
            alert('Erro ao carregar colheitas. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    };

    const excluirColheita = async (id, produto) => {
        if (confirm(`Tem certeza que deseja excluir a colheita de "${produto}"?`)) {
            try {
                await axios.delete(apiService.colheitas.deletar(id));
                alert('Colheita excluída com sucesso!');
                loadColheitas();
            } catch (error) {
                alert('Erro ao excluir colheita: ' + (error.response?.data?.erro || error.message));
            }
        }
    };

    if (authLoading || loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;
    
    if (!isAuthenticated) return null;

    return (
        <div className="container mt-4">
            <AdminSessionInfo />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 style={{ color: "#4F732C" }}>🌾 Gerenciar Colheitas</h2>
                    <div className="badge bg-danger">CONTROLE ADMINISTRATIVO DE COLHEITAS</div>
                </div>
                <div>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card border-success">
                        <div className="card-body text-center">
                            <h6 className="text-success">📊 Estatísticas</h6>
                            <p className="mb-1">Total: <strong>{colheitas.length}</strong></p>
                            <p className="mb-0">
                                Produção Total: <strong>
                                    {colheitas.reduce((total, c) => total + (parseFloat(c.quantidade || 0)), 0).toFixed(2)} kg
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Colheitas */}
            <div className="card border-success">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">🌿 Gerenciamento de Colheitas - Controle Total</h5>
                </div>
            </div>

            <div className="row">
                {colheitas.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            Nenhuma colheita encontrada.
                        </div>
                    </div>
                ) : (
                    colheitas.map(colheita => (
                        <div key={colheita.id} className="col-md-6 mb-4">
                            <div className="card border-primary">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6 className="card-title">{colheita.produto}</h6>
                                        <span className={`badge ${
                                            colheita.qualidade === 'EXCELENTE' ? 'bg-success' :
                                            colheita.qualidade === 'BOA' ? 'bg-primary' :
                                            colheita.qualidade === 'REGULAR' ? 'bg-warning' : 'bg-danger'
                                        }`}>
                                            {colheita.qualidade}
                                        </span>
                                    </div>
                                    
                                    <p><strong>Quantidade:</strong> {colheita.quantidade} kg</p>
                                    <p><strong>Data:</strong> {new Date(colheita.dataColheita).toLocaleDateString()}</p>
                                    <p><strong>Usuário:</strong> {colheita.usuario?.nome || 'N/A'}</p>
                                    <p><strong>Horta:</strong> {colheita.horta?.nome || 'N/A'}</p>
                                    
                                    {colheita.observacoes && (
                                        <p><strong>Observações:</strong> {colheita.observacoes.substring(0, 100)}...</p>
                                    )}
                                    
                                    <small className="text-muted">
                                        Registrada em: {new Date(colheita.dataRegistro).toLocaleDateString()}
                                    </small>
                                    
                                    <div className="mt-3">
                                        <button 
                                            className="btn btn-outline-info btn-sm me-2"
                                            onClick={() => alert('Visualizando detalhes da colheita...')}
                                        >
                                            👁️ Detalhes
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => excluirColheita(colheita.id, colheita.produto)}
                                        >
                                            🗑️ Excluir
                                        </button>
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