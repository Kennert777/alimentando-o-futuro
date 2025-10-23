import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAuth.jsx';
import { AdminSessionInfo } from '../../components/ProtectedRoute.jsx';
import { handleDelete } from './utils/deleteHandler';
import { plantas } from './data/plantas.js';

export default function AdminColheitas() {
    const { admin, loading: authLoading, isAuthenticated } = useAdminAuth();
    const [colheitas, setColheitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingColheita, setEditingColheita] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        produto: '', quantidade: '', dataColheita: '', qualidade: 'BOA', observacoes: ''
    });

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            loadColheitas();
        }
    }, [authLoading, isAuthenticated]);

    const loadColheitas = async () => {
        try {
            const response = await axios.get('https://backend-y6kz.onrender.com/api/colheitas');
            setColheitas(response.data);
        } catch (error) {
            console.error('Erro ao carregar colheitas:', error);
            alert('Erro ao carregar colheitas. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    };

    const editColheita = (colheita) => {
        setEditingColheita(colheita.id);
        setFormData({
            produto: colheita.produto,
            quantidade: colheita.quantidade,
            dataColheita: colheita.dataColheita,
            qualidade: colheita.qualidade,
            observacoes: colheita.observacoes || ''
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const url = editingColheita 
                ? `https://backend-y6kz.onrender.com/api/colheitas/${editingColheita}`
                : 'https://backend-y6kz.onrender.com/api/colheitas';
            
            const method = editingColheita ? 'PUT' : 'POST';
            
            await axios({ method, url, data: formData });
            
            alert(editingColheita ? 'Colheita atualizada!' : 'Colheita criada!');
            loadColheitas();
            resetForm();
        } catch (error) {
            alert('Erro ao salvar colheita');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingColheita(null);
        setFormData({ produto: '', quantidade: '', dataColheita: '', qualidade: 'BOA', observacoes: '' });
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
                    <button className="btn btn-success btn-sm me-2" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancelar' : '➥ Nova Colheita'}
                    </button>
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

            {/* Formulário */}
            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>{editingColheita ? 'Editar Colheita' : 'Nova Colheita'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Produto</label>
                                    <select
                                        className="form-control"
                                        value={formData.produto}
                                        onChange={(e) => setFormData({...formData, produto: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {plantas.map(planta => (
                                            <option key={planta} value={planta}>{planta}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Quantidade (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="form-control"
                                        value={formData.quantidade}
                                        onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Data da Colheita</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={formData.dataColheita}
                                        onChange={(e) => setFormData({...formData, dataColheita: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Qualidade</label>
                                    <select
                                        className="form-control"
                                        value={formData.qualidade}
                                        onChange={(e) => setFormData({...formData, qualidade: e.target.value})}
                                    >
                                        <option value="EXCELENTE">Excelente</option>
                                        <option value="BOA">Boa</option>
                                        <option value="REGULAR">Regular</option>
                                        <option value="RUIM">Ruim</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Observações</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={formData.observacoes}
                                    onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-success me-2">
                                {editingColheita ? 'Atualizar' : 'Criar'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}

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
                                            className="btn btn-outline-primary btn-sm me-2"
                                            onClick={() => editColheita(colheita)}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDelete(colheita.id, 'colheitas', colheita.produto, setColheitas, setLoading)}
                                        >
                                            🗑️ Deletar
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