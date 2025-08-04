import { useState, useEffect } from 'react';
import db from './database.js';

export default function HortasUsuario() {
    const [user, setUser] = useState(null);
    const [hortas, setHortas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: '', localizacao: '', tipo: '', descricao: '', status: 'planejamento'
    });

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }
        setUser(currentUser);
        loadHortas(currentUser.id);
    }, []);

    const loadHortas = async (userId) => {
        try {
            const userHortas = await db.buscarHortasPorUsuario(userId);
            setHortas(userHortas);
        } catch (error) {
            console.error('Erro ao carregar hortas:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await db.criarHorta({
                nome: formData.nome,
                localizacao: formData.localizacao,
                tipo_cultivo: formData.tipo,
                descricao: formData.descricao,
                status: formData.status
            }, user.id);
            
            // Atualizar pontos do usuário
            const updatedUser = await db.buscarUsuarioPorId(user.id);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setUser(updatedUser);

            loadHortas(user.id);
            setShowForm(false);
            setFormData({ nome: '', localizacao: '', tipo: '', descricao: '', status: 'planejamento' });
        } catch (error) {
            alert('Erro ao cadastrar horta: ' + error.message);
        }
    };

    const updateStatus = async (hortaId, newStatus) => {
        try {
            await db.atualizarHorta(hortaId, { status: newStatus });
            
            // Adiciona pontos por atualizar status para colheita
            if (newStatus === 'colheita') {
                await db.adicionarPontos(user.id, 100, 'status_colheita');
                const updatedUser = await db.buscarUsuarioPorId(user.id);
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
            
            loadHortas(user.id);
        } catch (error) {
            alert('Erro ao atualizar status: ' + error.message);
        }
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>Minhas Hortas</h2>
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className="btn btn-success"
                    style={{ backgroundColor: "#4F732C" }}
                >
                    {showForm ? 'Cancelar' : 'Nova Horta'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>Cadastrar Nova Horta</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome da Horta</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Localização</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.localizacao}
                                        onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Tipo de Cultivo</label>
                                    <select 
                                        className="form-control"
                                        value={formData.tipo}
                                        onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="organico">Orgânico</option>
                                        <option value="hidroponico">Hidropônico</option>
                                        <option value="permacultura">Permacultura</option>
                                        <option value="tradicional">Tradicional</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Status</label>
                                    <select 
                                        className="form-control"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="planejamento">Planejamento</option>
                                        <option value="plantio">Plantio</option>
                                        <option value="crescimento">Crescimento</option>
                                        <option value="colheita">Colheita</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3"
                                    value={formData.descricao}
                                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-success">Cadastrar Horta</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="row">
                {hortas.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            <h5>Nenhuma horta cadastrada</h5>
                            <p>Cadastre sua primeira horta e comece a ganhar pontos!</p>
                        </div>
                    </div>
                ) : (
                    hortas.map(horta => (
                        <div key={horta.id} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title">{horta.nome}</h5>
                                        <span className={`badge ${horta.aprovada ? 'bg-success' : 'bg-warning'}`}>
                                            {horta.aprovada ? 'Aprovada' : 'Pendente'}
                                        </span>
                                    </div>
                                    <p><strong>📍 Local:</strong> {horta.localizacao}</p>
                                    <p><strong>🌱 Tipo:</strong> {horta.tipo_cultivo}</p>
                                    <p><strong>📊 Status:</strong> 
                                        <select 
                                            className="form-select form-select-sm d-inline-block ms-2" 
                                            style={{ width: 'auto' }}
                                            value={horta.status}
                                            onChange={(e) => updateStatus(horta.id, e.target.value)}
                                        >
                                            <option value="planejamento">Planejamento</option>
                                            <option value="plantio">Plantio</option>
                                            <option value="crescimento">Crescimento</option>
                                            <option value="colheita">Colheita</option>
                                        </select>
                                    </p>
                                    {horta.descricao && <p><strong>Descrição:</strong> {horta.descricao}</p>}
                                    <small className="text-muted">
                                        Criada em: {new Date(horta.dataCriacao).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}