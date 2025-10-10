import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiService } from './services/apiService.js';
import { plantas } from './data/plantas.js';

export default function Colheitas() {
    const [user, setUser] = useState(null);
    const [colheitas, setColheitas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        tipo_planta: '', quantidade_kg: '', data_colheita: '', qualidade: 'boa', destino: 'consumo_proprio', observacoes: ''
    });


    const qualidades = ['excelente', 'boa', 'regular', 'ruim'];
    const destinos = ['consumo_proprio', 'doacao', 'venda', 'troca', 'compostagem'];

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }
        setUser(currentUser);
        loadColheitas(currentUser.id);
    }, []);

    const loadColheitas = async (userId) => {
        try {
            const response = await axios.get(apiService.colheitas.listar());
            setColheitas(response.data);
        } catch (error) {
            console.error('Erro ao carregar colheitas:', error);
            setColheitas([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const hortasResponse = await axios.get(apiService.hortas.listar());
            const hortas = hortasResponse.data;
            const hortaId = hortas.length > 0 ? hortas[0].id : null;
            
            if (!hortaId) {
                alert('Você precisa ter pelo menos uma horta cadastrada para registrar colheitas.');
                return;
            }
            
            await axios.post(apiService.colheitas.criar(), {
                horta: { id: hortaId },
                usuario: { id: user.id },
                produto: formData.tipo_planta,
                quantidade: parseFloat(formData.quantidade_kg),
                dataColheita: formData.data_colheita,
                qualidade: formData.qualidade.toUpperCase(),
                observacoes: formData.observacoes
            });
            
            alert('Colheita registrada com sucesso!');
            loadColheitas(user.id);
            setShowForm(false);
            setFormData({ tipo_planta: '', quantidade_kg: '', data_colheita: '', qualidade: 'boa', destino: 'consumo_proprio', observacoes: '' });
        } catch (error) {
            alert('Erro ao registrar colheita: ' + (error.response?.data?.erro || error.message));
        }
    };

    const deleteColheita = async (colheitaId, produto) => {
        if (confirm(`Tem certeza que deseja deletar a colheita de "${produto}"?`)) {
            try {
                await axios.delete(apiService.colheitas.deletar(colheitaId));
                alert('Colheita deletada com sucesso!');
                loadColheitas(user.id);
            } catch (error) {
                alert('Erro ao deletar colheita: ' + (error.response?.data?.erro || error.message));
            }
        }
    };

    const getTotalColheitas = () => {
        if (!colheitas || colheitas.length === 0) return '0.00';
        return colheitas.reduce((total, colheita) => {
            const kg = parseFloat(colheita.quantidade || colheita.quantidadeKg || colheita.quantidade_kg || 0);
            return total + (isNaN(kg) ? 0 : kg);
        }, 0).toFixed(2);
    };

    const getColheitasPorMes = () => {
        if (!colheitas || colheitas.length === 0) return {};
        const agrupadas = {};
        colheitas.forEach(colheita => {
            const dataColheita = colheita.dataColheita || colheita.data_colheita;
            if (dataColheita) {
                const mes = new Date(dataColheita).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
                const kg = parseFloat(colheita.quantidade || colheita.quantidadeKg || colheita.quantidade_kg || 0);
                agrupadas[mes] = (agrupadas[mes] || 0) + (isNaN(kg) ? 0 : kg);
            }
        });
        return agrupadas;
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="bubble-text" style={{ color: "#4F732C" }}>🌾 Minhas Colheitas</h2>
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className="btn btn-success"
                    style={{ backgroundColor: "#4F732C" }}
                >
                    {showForm ? 'Cancelar' : 'Nova Colheita'}
                </button>
            </div>

            {/* Estatísticas */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#D9C179" }}>
                        <div className="card-body">
                            <h3>{getTotalColheitas()} kg</h3>
                            <p>Total Colhido</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#D9AE89" }}>
                        <div className="card-body">
                            <h3>{colheitas.length}</h3>
                            <p>Colheitas Registradas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center" style={{ backgroundColor: "#AEBF2C" }}>
                        <div className="card-body">
                            <h3>{Object.keys(getColheitasPorMes()).length}</h3>
                            <p>Meses Ativos</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulário */}
            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>Registrar Nova Colheita</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Tipo de Planta</label>
                                    <select 
                                        className="form-control"
                                        value={formData.tipo_planta}
                                        onChange={(e) => setFormData({...formData, tipo_planta: e.target.value})}
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
                                        value={formData.quantidade_kg}
                                        onChange={(e) => setFormData({...formData, quantidade_kg: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Data da Colheita</label>
                                    <input 
                                        type="date" 
                                        className="form-control"
                                        value={formData.data_colheita}
                                        onChange={(e) => setFormData({...formData, data_colheita: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Qualidade</label>
                                    <select 
                                        className="form-control"
                                        value={formData.qualidade}
                                        onChange={(e) => setFormData({...formData, qualidade: e.target.value})}
                                    >
                                        {qualidades.map(qual => (
                                            <option key={qual} value={qual}>{qual}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Destino</label>
                                    <select 
                                        className="form-control"
                                        value={formData.destino}
                                        onChange={(e) => setFormData({...formData, destino: e.target.value})}
                                    >
                                        {destinos.map(dest => (
                                            <option key={dest} value={dest}>
                                                {dest.replace('_', ' ')}
                                            </option>
                                        ))}
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
                            <button type="submit" className="btn btn-success">Registrar Colheita (+100 pontos)</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Lista de Colheitas */}
            <div className="row">
                {colheitas.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            <h5>Nenhuma colheita registrada</h5>
                            <p>Registre sua primeira colheita e ganhe 100 pontos!</p>
                        </div>
                    </div>
                ) : (
                    colheitas.map(colheita => (
                        <div key={colheita.id} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title">{colheita.produto || colheita.tipoPlanta || colheita.tipo_planta}</h5>
                                        <span className={`badge ${
                                            colheita.qualidade === 'excelente' ? 'bg-success' :
                                            colheita.qualidade === 'boa' ? 'bg-primary' :
                                            colheita.qualidade === 'regular' ? 'bg-warning' : 'bg-danger'
                                        }`}>
                                            {colheita.qualidade}
                                        </span>
                                    </div>
                                    <p><strong>📊 Quantidade:</strong> {colheita.quantidade || colheita.quantidadeKg || colheita.quantidade_kg || 0} kg</p>
                                    <p><strong>📅 Data:</strong> {new Date(colheita.dataColheita || colheita.data_colheita).toLocaleDateString()}</p>
                                    <p><strong>🎯 Destino:</strong> {(colheita.destino || '').replace('_', ' ')}</p>
                                    {colheita.observacoes && (
                                        <p><strong>📝 Observações:</strong> {colheita.observacoes}</p>
                                    )}
                                    <small className="text-muted">
                                        Registrado em: {new Date(colheita.dataRegistro || colheita.data_registro || new Date()).toLocaleDateString()}
                                    </small>
                                    <div className="mt-2">
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteColheita(colheita.id, colheita.produto || colheita.tipoPlanta || colheita.tipo_planta)}
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