import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAdminAuth } from './useAuth.jsx';
import { AdminSessionInfo } from './ProtectedRoute.jsx';
import { handleDelete } from './utils/deleteHandler';

export default function AdminHortas() {
    const { admin, loading: authLoading, isAuthenticated } = useAdminAuth();
    const [hortas, setHortas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('todas');
    const [editingHorta, setEditingHorta] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: '', localizacao: '', tipoPlantio: '', descricao: '', aprovada: false
    });

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            loadHortas();
        }
    }, [authLoading, isAuthenticated]);

    const loadHortas = async () => {
        try {
            const response = await axios.get('https://backend-y6kz.onrender.com/api/hortas');
            const todasHortas = response.data;
            setHortas(todasHortas);
        } catch (error) {
            console.error('Erro ao carregar hortas:', error);
            alert('Erro ao carregar hortas. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    };

    const aprovarHorta = async (id) => {
        if (confirm('Tem certeza que deseja aprovar esta horta?')) {
            try {
                const horta = hortas.find(h => h.id === id);
                const payload = {
                    ...horta,
                    aprovada: true,
                    status: 'ATIVA'
                };
                await axios.put(`https://backend-y6kz.onrender.com/api/hortas/${id}`, payload);
                alert('Horta aprovada com sucesso!');
                loadHortas();
            } catch (error) {
                alert('Erro ao aprovar horta: ' + (error.response?.data?.erro || error.message));
            }
        }
    };

    const rejeitarHorta = async (id) => {
        const motivo = prompt('Motivo da rejeição:');
        if (motivo) {
            try {
                const horta = hortas.find(h => h.id === id);
                const payload = {
                    ...horta,
                    aprovada: false,
                    status: 'INATIVA',
                    motivo_rejeicao: motivo
                };
                await axios.put(`https://backend-y6kz.onrender.com/api/hortas/${id}`, payload);
                alert('Horta rejeitada com sucesso!');
                loadHortas();
            } catch (error) {
                alert('Erro ao rejeitar horta: ' + (error.response?.data?.erro || error.message));
            }
        }
    };

    const editHorta = (horta) => {
        setEditingHorta(horta.id);
        setFormData({
            nome: horta.nome,
            localizacao: horta.localizacao,
            tipoPlantio: horta.tipoPlantio,
            descricao: horta.descricao || '',
            aprovada: horta.aprovada
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const url = editingHorta 
                ? `https://backend-y6kz.onrender.com/api/hortas/${editingHorta}`
                : 'https://backend-y6kz.onrender.com/api/hortas';
            
            const method = editingHorta ? 'PUT' : 'POST';
            
            await axios({ method, url, data: formData });
            
            alert(editingHorta ? 'Horta atualizada!' : 'Horta criada!');
            loadHortas();
            resetForm();
        } catch (error) {
            alert('Erro ao salvar horta');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingHorta(null);
        setFormData({ nome: '', localizacao: '', tipoPlantio: '', descricao: '', aprovada: false });
    };

    const hortasFiltradas = hortas.filter(h => {
        if (filtro === 'todas') return true;
        if (filtro === 'aprovadas') return h.aprovada;
        if (filtro === 'pendentes') return !h.aprovada && h.status !== 'rejeitada';
        if (filtro === 'rejeitadas') return h.status === 'rejeitada';
        return true;
    });

    if (authLoading || loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;
    
    if (!isAuthenticated) return null;

    return (
        <div className="container mt-4">
            <AdminSessionInfo />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 style={{ color: "#4F732C" }}>🌱 Gerenciar Hortas</h2>
                    <div className="badge bg-danger">CONTROLE ADMINISTRATIVO DE HORTAS</div>
                </div>
                <div>
                    <button className="btn btn-success btn-sm me-2" onClick={() => alert('Criando nova horta comunitária...')}>➕ Nova Horta</button>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
                </div>
            </div>

            {/* Painel de Controle Administrativo */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card border-success">
                        <div className="card-body text-center">
                            <h6 className="text-success">📊 Estatísticas</h6>
                            <p className="mb-1">Total: <strong>{hortas.length}</strong></p>
                            <p className="mb-1">Aprovadas: <strong>{hortas.filter(h => h.aprovada).length}</strong></p>
                            <p className="mb-0">Pendentes: <strong>{hortas.filter(h => !h.aprovada && h.status !== 'rejeitada').length}</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-warning">
                        <div className="card-body text-center">
                            <h6 className="text-warning">⚡ Ações em Lote</h6>
                            <button className="btn btn-warning btn-sm mb-1 w-100" onClick={() => alert('Aprovando todas as hortas pendentes...')}>Aprovar Todas</button>
                            <button className="btn btn-outline-warning btn-sm w-100" onClick={() => alert('Enviando notificação para todos...')}>Notificar Todos</button>
                        </div>
                    </div>
                </div>
                {/* Card de mapa removido */}
            </div>

            {/* Filtros */}
            <div className="card mb-4 border-primary">
                <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">🔍 Filtros Administrativos</h6>
                </div>
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
                                <option value="aprovadas">Aprovadas</option>
                                <option value="pendentes">Pendentes</option>
                                <option value="rejeitadas">Rejeitadas</option>
                            </select>
                        </div>
                        <div className="col-md-6 d-flex align-items-end">
                            <div>
                                <div className="text-muted mb-1">Total: {hortasFiltradas.length} hortas</div>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => alert('Exportando dados...')}>📄 Exportar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Hortas */}
            <div className="card border-success">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">🌿 Gerenciamento de Hortas - Controle Total</h5>
                </div>
            </div>

            <div className="row">
                {hortasFiltradas.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            Nenhuma horta encontrada.
                        </div>
                    </div>
                ) : (
                    hortasFiltradas.map(horta => (
                        <div key={horta.id} className="col-md-6 mb-4">
                            <div className={`card ${!horta.aprovada ? 'border-warning' : 'border-success'}`}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6 className="card-title">{horta.nome}</h6>
                                        <div>
                                            <span className={`badge ${
                                                horta.aprovada ? 'bg-success' : 
                                                horta.status === 'rejeitada' ? 'bg-danger' : 'bg-warning'
                                            }`}>
                                                {horta.aprovada ? 'Aprovada' : 
                                                 horta.status === 'rejeitada' ? 'Rejeitada' : 'Pendente'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p><strong>Localização:</strong> {horta.localizacao}</p>
                                    <p><strong>Tipo:</strong> {horta.tipoPlantio}</p>
                                    <p><strong>Usuário:</strong> {horta.usuario?.nome || 'N/A'}</p>
                                    
                                    {horta.descricao && (
                                        <p><strong>Descrição:</strong> {horta.descricao.substring(0, 100)}...</p>
                                    )}
                                    
                                    {horta.motivo_rejeicao && (
                                        <div className="alert alert-danger p-2">
                                            <strong>Motivo da rejeição:</strong> {horta.motivo_rejeicao}
                                        </div>
                                    )}
                                    
                                    <small className="text-muted">
                                        Criada em: {new Date(horta.dataCriacao).toLocaleDateString()}
                                    </small>
                                    
                                    <div className="mt-3">
                                        {horta.status !== 'INATIVA' && (
                                            <>
                                                <button 
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => aprovarHorta(horta.id)}
                                                >
                                                    ✓ Aprovar
                                                </button>
                                                <button 
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => rejeitarHorta(horta.id)}
                                                >
                                                    ⚠️ Inativar
                                                </button>
                                            </>
                                        )}
                                        <button 
                                            className="btn btn-outline-primary btn-sm me-2"
                                            onClick={() => editHorta(horta)}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDelete(horta.id, 'hortas', horta.nome, setHortas, setLoading)}
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