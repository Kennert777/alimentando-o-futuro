import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './database.js';

export default function AdminDicas() {
    const [dicas, setDicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editando, setEditando] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        conteudo: '',
        categoria: 'cultivo',
        tipo_planta: '',
        dificuldade: 'medio',
        tags: ''
    });

    useEffect(() => {
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
        if (!currentAdmin || currentAdmin.tipo_perfil !== 'admin') {
            window.location.href = '/admin/login';
            return;
        }
        setAdmin(currentAdmin);
        loadDicas();
    }, []);

    const loadDicas = async () => {
        try {
            const todasDicas = await db.buscarTodasDicas();
            setDicas(todasDicas);
        } catch (error) {
            console.error('Erro ao carregar dicas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await db.atualizarDica(editando, formData);
            } else {
                await db.criarDica(formData, admin.id);
            }
            
            setShowForm(false);
            setEditando(null);
            setFormData({
                titulo: '',
                conteudo: '',
                categoria: 'cultivo',
                tipo_planta: '',
                dificuldade: 'medio',
                tags: ''
            });
            loadDicas();
        } catch (error) {
            alert('Erro ao salvar dica: ' + error.message);
        }
    };

    const handleEdit = (dica) => {
        setEditando(dica.id);
        setFormData({
            titulo: dica.titulo,
            conteudo: dica.conteudo,
            categoria: dica.categoria,
            tipo_planta: dica.tipo_planta || '',
            dificuldade: dica.dificuldade,
            tags: dica.tags || ''
        });
        setShowForm(true);
    };

    const toggleAtiva = async (id, ativa) => {
        try {
            await db.atualizarDica(id, { ativa: !ativa });
            loadDicas();
        } catch (error) {
            alert('Erro ao atualizar dica: ' + error.message);
        }
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>💡 Gerenciar Dicas</h2>
                <div>
                    <button 
                        className="btn btn-success me-2"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancelar' : 'Nova Dica'}
                    </button>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
                </div>
            </div>

            {/* Formulário */}
            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>{editando ? 'Editar Dica' : 'Nova Dica'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <label className="form-label">Título *</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Categoria</label>
                                    <select 
                                        className="form-select"
                                        value={formData.categoria}
                                        onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                                    >
                                        <option value="cultivo">Cultivo</option>
                                        <option value="nutricao">Nutrição</option>
                                        <option value="receita">Receita</option>
                                        <option value="sustentabilidade">Sustentabilidade</option>
                                        <option value="pragas">Pragas</option>
                                        <option value="colheita">Colheita</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Tipo de Planta (opcional)</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.tipo_planta}
                                        onChange={(e) => setFormData({...formData, tipo_planta: e.target.value})}
                                        placeholder="Ex: Tomate, Alface..."
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Dificuldade</label>
                                    <select 
                                        className="form-select"
                                        value={formData.dificuldade}
                                        onChange={(e) => setFormData({...formData, dificuldade: e.target.value})}
                                    >
                                        <option value="facil">Fácil</option>
                                        <option value="medio">Médio</option>
                                        <option value="dificil">Difícil</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Conteúdo *</label>
                                <textarea 
                                    className="form-control" 
                                    rows="6"
                                    value={formData.conteudo}
                                    onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Tags (separadas por vírgula)</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                    placeholder="Ex: orgânico, iniciante, verão"
                                />
                            </div>
                            
                            <button type="submit" className="btn btn-success">
                                {editando ? 'Atualizar' : 'Criar'} Dica
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Lista de Dicas */}
            <div className="row">
                {dicas.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            Nenhuma dica cadastrada.
                        </div>
                    </div>
                ) : (
                    dicas.map(dica => (
                        <div key={dica.id} className="col-md-6 mb-4">
                            <div className={`card ${!dica.ativa ? 'opacity-50' : ''}`}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6 className="card-title">{dica.titulo}</h6>
                                        <div>
                                            <span className={`badge ${
                                                dica.categoria === 'cultivo' ? 'bg-success' :
                                                dica.categoria === 'nutricao' ? 'bg-info' :
                                                dica.categoria === 'receita' ? 'bg-warning' :
                                                dica.categoria === 'sustentabilidade' ? 'bg-primary' :
                                                dica.categoria === 'pragas' ? 'bg-danger' : 'bg-secondary'
                                            }`}>
                                                {dica.categoria}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {dica.tipo_planta && (
                                        <p><strong>Planta:</strong> {dica.tipo_planta}</p>
                                    )}
                                    
                                    <p className="small">{dica.conteudo.substring(0, 150)}...</p>
                                    
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">
                                            {dica.visualizacoes || 0} visualizações
                                        </small>
                                        <div className="btn-group btn-group-sm">
                                            <button 
                                                className="btn btn-outline-primary"
                                                onClick={() => handleEdit(dica)}
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                className={`btn ${dica.ativa ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                                onClick={() => toggleAtiva(dica.id, dica.ativa)}
                                            >
                                                {dica.ativa ? '👁️' : '🚫'}
                                            </button>
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