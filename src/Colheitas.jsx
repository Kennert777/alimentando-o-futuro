import { useState, useEffect } from 'react';

export default function Colheitas() {
    const [user, setUser] = useState(null);
    const [colheitas, setColheitas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        tipo_planta: '', quantidade_kg: '', data_colheita: '', qualidade: 'boa', destino: 'consumo_proprio', observacoes: ''
    });

    const plantas = ['Alface', 'Tomate', 'Manjericão', 'Cebolinha', 'Rúcula', 'Espinafre', 'Couve', 'Beterraba'];
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

    const loadColheitas = (userId) => {
        const allColheitas = JSON.parse(localStorage.getItem('colheitas') || '[]');
        const userColheitas = allColheitas.filter(c => c.usuario_id === userId);
        setColheitas(userColheitas);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allColheitas = JSON.parse(localStorage.getItem('colheitas') || '[]');
        
        const novaColheita = {
            id: Date.now(),
            usuario_id: user.id,
            horta_id: 1, // Assumindo horta padrão
            ...formData,
            data_registro: new Date().toISOString(),
            quantidade_kg: parseFloat(formData.quantidade_kg)
        };

        allColheitas.push(novaColheita);
        localStorage.setItem('colheitas', JSON.stringify(allColheitas));
        
        // Adiciona pontos por colheita
        const updatedUser = { ...user, pontos: (user.pontos || 0) + 100 };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);

        loadColheitas(user.id);
        setShowForm(false);
        setFormData({ tipo_planta: '', quantidade_kg: '', data_colheita: '', qualidade: 'boa', destino: 'consumo_proprio', observacoes: '' });
    };

    const getTotalColheitas = () => {
        return colheitas.reduce((total, colheita) => total + colheita.quantidade_kg, 0).toFixed(2);
    };

    const getColheitasPorMes = () => {
        const agrupadas = {};
        colheitas.forEach(colheita => {
            const mes = new Date(colheita.data_colheita).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
            agrupadas[mes] = (agrupadas[mes] || 0) + colheita.quantidade_kg;
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
                                        <h5 className="card-title">{colheita.tipo_planta}</h5>
                                        <span className={`badge ${
                                            colheita.qualidade === 'excelente' ? 'bg-success' :
                                            colheita.qualidade === 'boa' ? 'bg-primary' :
                                            colheita.qualidade === 'regular' ? 'bg-warning' : 'bg-danger'
                                        }`}>
                                            {colheita.qualidade}
                                        </span>
                                    </div>
                                    <p><strong>📊 Quantidade:</strong> {colheita.quantidade_kg} kg</p>
                                    <p><strong>📅 Data:</strong> {new Date(colheita.data_colheita).toLocaleDateString()}</p>
                                    <p><strong>🎯 Destino:</strong> {colheita.destino.replace('_', ' ')}</p>
                                    {colheita.observacoes && (
                                        <p><strong>📝 Observações:</strong> {colheita.observacoes}</p>
                                    )}
                                    <small className="text-muted">
                                        Registrado em: {new Date(colheita.data_registro).toLocaleDateString()}
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