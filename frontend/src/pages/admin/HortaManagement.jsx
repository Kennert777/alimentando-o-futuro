import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HortaManagement() {
    const [hortas, setHortas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingHorta, setEditingHorta] = useState(null);
    const [formData, setFormData] = useState({
        nome: '', localizacao: '', tipoPlantio: '', descricao: '', status: 'PLANEJAMENTO', usuarioId: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            
            const [hortasResp, usuariosResp] = await Promise.all([
                fetch('https://backend-y6kz.onrender.com/api/hortas', { headers }),
                fetch('https://backend-y6kz.onrender.com/api/usuarios', { headers })
            ]);
            
            if (hortasResp.ok && usuariosResp.ok) {
                const hortasData = await hortasResp.json();
                const usuariosData = await usuariosResp.json();
                setHortas(hortasData);
                setUsuarios(usuariosData);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const url = editingHorta ? 
                `https://backend-y6kz.onrender.com/api/hortas/${editingHorta}` : 
                'https://backend-y6kz.onrender.com/api/hortas';
            const method = editingHorta ? 'PUT' : 'POST';
            
            const payload = editingHorta
                ? { ...formData, usuario: { id: parseInt(formData.usuarioId) } }
                : {
                    nome: formData.nome,
                    localizacao: formData.localizacao,
                    tipoPlantio: formData.tipoPlantio,
                    descricao: formData.descricao,
                    status: formData.status,
                    usuario: { id: parseInt(formData.usuarioId) }
                };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                alert(editingHorta ? 'Horta atualizada com sucesso!' : 'Horta criada com sucesso!');
                resetForm();
                loadData();
            } else {
                alert('Erro ao salvar horta.');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        }
    };

    const deleteHorta = async (id, nome) => {
        if (confirm(`Tem certeza que deseja deletar a horta "${nome}"?`)) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`https://backend-y6kz.onrender.com/api/hortas/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    alert('Horta deletada com sucesso!');
                    loadData();
                } else {
                    alert('Erro ao deletar horta.');
                }
            } catch (error) {
                alert('Erro de conexão com o servidor.');
            }
        }
    };

    const editHorta = (horta) => {
        setEditingHorta(horta.id);
        setFormData({
            nome: horta.nome,
            localizacao: horta.localizacao,
            tipoPlantio: horta.tipoPlantio,
            descricao: horta.descricao,
            status: horta.status,
            usuarioId: horta.usuario?.id || ''
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingHorta(null);
        setFormData({
            nome: '', localizacao: '', tipoPlantio: '', descricao: '', status: 'PLANEJAMENTO', usuarioId: ''
        });
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>🌱 Gestão de Hortas</h2>
                <div>
                    <button 
                        onClick={() => setShowForm(!showForm)} 
                        className="btn btn-success me-2"
                    >
                        {showForm ? 'Cancelar' : 'Nova Horta'}
                    </button>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
                </div>
            </div>

            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>{editingHorta ? 'Editar Horta' : 'Nova Horta'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome</label>
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
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Tipo de Plantio</label>
                                    <select
                                        className="form-control"
                                        value={formData.tipoPlantio}
                                        onChange={(e) => setFormData({...formData, tipoPlantio: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="organico">Orgânico</option>
                                        <option value="hidroponico">Hidropônico</option>
                                        <option value="permacultura">Permacultura</option>
                                        <option value="tradicional">Tradicional</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-control"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="PLANEJAMENTO">Planejamento</option>
                                        <option value="PLANTIO">Plantio</option>
                                        <option value="CRESCIMENTO">Crescimento</option>
                                        <option value="COLHEITA">Colheita</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Usuário</label>
                                    <select
                                        className="form-control"
                                        value={formData.usuarioId}
                                        onChange={(e) => setFormData({...formData, usuarioId: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {usuarios.map(user => (
                                            <option key={user.id} value={user.id}>{user.nome}</option>
                                        ))}
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
                                />
                            </div>
                            <button type="submit" className="btn btn-success me-2">
                                {editingHorta ? 'Atualizar' : 'Criar'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Localização</th>
                                    <th>Tipo</th>
                                    <th>Status</th>
                                    <th>Usuário</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hortas.map(horta => (
                                    <tr key={horta.id}>
                                        <td>{horta.id}</td>
                                        <td>{horta.nome}</td>
                                        <td>{horta.localizacao}</td>
                                        <td>{horta.tipoPlantio}</td>
                                        <td>
                                            <span className={`badge ${
                                                horta.status === 'COLHEITA' ? 'bg-success' :
                                                horta.status === 'CRESCIMENTO' ? 'bg-warning' :
                                                horta.status === 'PLANTIO' ? 'bg-info' : 'bg-secondary'
                                            }`}>
                                                {horta.status}
                                            </span>
                                        </td>
                                        <td>{horta.usuario?.nome || 'N/A'}</td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => editHorta(horta)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteHorta(horta.id, horta.nome)}
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}