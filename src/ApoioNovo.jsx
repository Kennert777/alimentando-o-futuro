import { useState, useEffect } from 'react';
import db from './database.js';

export default function ApoioNovo() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        tipo_solicitacao: '', titulo: '', descricao: '', urgencia: 'media', valor_estimado: ''
    });
    const [enviado, setEnviado] = useState(false);
    const [minhasSolicitacoes, setMinhasSolicitacoes] = useState([]);
    const [activeTab, setActiveTab] = useState('nova');

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }
        setUser(currentUser);
        loadSolicitacoes(currentUser.id);
    }, []);

    const loadSolicitacoes = async (userId) => {
        try {
            const userSolicitacoes = await db.buscarSolicitacoesPorUsuario(userId);
            setMinhasSolicitacoes(userSolicitacoes);
        } catch (error) {
            console.error('Erro ao carregar solicitações:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await db.criarSolicitacaoApoio(formData, user.id);
            
            setEnviado(true);
            setFormData({ tipo_solicitacao: '', titulo: '', descricao: '', urgencia: 'media', valor_estimado: '' });
            loadSolicitacoes(user.id);
            
            setTimeout(() => setEnviado(false), 3000);
        } catch (error) {
            alert('Erro ao enviar solicitação: ' + error.message);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'pendente': 'bg-warning',
            'em_analise': 'bg-info', 
            'aprovada': 'bg-success',
            'rejeitada': 'bg-danger',
            'concluida': 'bg-secondary'
        };
        return badges[status] || 'bg-secondary';
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="container mt-4">
            <h2 className="bubble-text" style={{ color: "#4F732C" }}>🤝 Solicitar Apoio</h2>
            <p className="lead">Precisa de ajuda com sua horta? Solicite apoio da comunidade!</p>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'nova' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nova')}
                    >
                        ➕ Nova Solicitação
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'minhas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('minhas')}
                    >
                        📋 Minhas Solicitações ({minhasSolicitacoes.length})
                    </button>
                </li>
            </ul>

            {activeTab === 'nova' && (
                <div>
                    {enviado && (
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Solicitação Enviada!</h4>
                            <p>Sua solicitação foi enviada com sucesso. Nossa equipe analisará em breve.</p>
                        </div>
                    )}

                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Tipo de Apoio</label>
                                        <select 
                                            className="form-control"
                                            value={formData.tipo_solicitacao}
                                            onChange={(e) => setFormData({...formData, tipo_solicitacao: e.target.value})}
                                            required
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="sementes">🌱 Sementes</option>
                                            <option value="ferramentas">🔧 Ferramentas</option>
                                            <option value="conhecimento">📚 Conhecimento Técnico</option>
                                            <option value="voluntarios">👥 Voluntários</option>
                                            <option value="financeiro">💰 Apoio Financeiro</option>
                                            <option value="outro">❓ Outro</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nível de Urgência</label>
                                        <select 
                                            className="form-control"
                                            value={formData.urgencia}
                                            onChange={(e) => setFormData({...formData, urgencia: e.target.value})}
                                        >
                                            <option value="baixa">🟢 Baixa</option>
                                            <option value="media">🟡 Média</option>
                                            <option value="alta">🟠 Alta</option>
                                            <option value="critica">🔴 Crítica</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Título da Solicitação</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                        placeholder="Ex: Preciso de sementes de tomate para horta escolar"
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Valor Estimado (R$) - Opcional</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        className="form-control"
                                        value={formData.valor_estimado}
                                        onChange={(e) => setFormData({...formData, valor_estimado: e.target.value})}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descrição Detalhada</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="4"
                                        value={formData.descricao}
                                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                                        placeholder="Descreva detalhadamente o tipo de apoio que você precisa, localização, prazo, etc..."
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-success btn-lg">
                                    📤 Enviar Solicitação
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'minhas' && (
                <div>
                    {minhasSolicitacoes.length === 0 ? (
                        <div className="alert alert-info text-center">
                            <h5>Nenhuma solicitação encontrada</h5>
                            <p>Você ainda não fez nenhuma solicitação de apoio.</p>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setActiveTab('nova')}
                            >
                                Fazer Primeira Solicitação
                            </button>
                        </div>
                    ) : (
                        <div className="row">
                            {minhasSolicitacoes.map(solicitacao => (
                                <div key={solicitacao.id} className="col-md-6 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="card-title">{solicitacao.titulo}</h5>
                                                <span className={`badge ${getStatusBadge(solicitacao.status)}`}>
                                                    {solicitacao.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                            <p><strong>🏷️ Tipo:</strong> {solicitacao.tipo_solicitacao}</p>
                                            <p><strong>⚡ Urgência:</strong> {solicitacao.urgencia}</p>
                                            {solicitacao.valor_estimado > 0 && (
                                                <p><strong>💰 Valor:</strong> R$ {solicitacao.valor_estimado.toFixed(2)}</p>
                                            )}
                                            <p><strong>📝 Descrição:</strong> {solicitacao.descricao.substring(0, 100)}...</p>
                                            <small className="text-muted">
                                                Enviado em: {new Date(solicitacao.data_solicitacao).toLocaleDateString()}
                                            </small>
                                            {solicitacao.resposta_admin && (
                                                <div className="mt-2 p-2 bg-light rounded">
                                                    <strong>📋 Resposta da Equipe:</strong>
                                                    <p className="mb-0 mt-1">{solicitacao.resposta_admin}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Seção de Tipos de Apoio - apenas para referência */}
            {activeTab === 'nova' && (
                <div className="row mt-5">
                    <div className="col-12">
                        <h3 style={{ color: "#4F732C" }}>Tipos de Apoio Disponíveis</h3>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100" style={{ backgroundColor: "#D9C179" }}>
                            <div className="card-body text-center">
                                <h4>🌱</h4>
                                <h5>Sementes</h5>
                                <p>Sementes orgânicas para sua horta</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100" style={{ backgroundColor: "#D9AE89" }}>
                            <div className="card-body text-center">
                                <h4>🔧</h4>
                                <h5>Ferramentas</h5>
                                <p>Equipamentos para cultivo</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100" style={{ backgroundColor: "#AEBF2C" }}>
                            <div className="card-body text-center">
                                <h4>📚</h4>
                                <h5>Conhecimento</h5>
                                <p>Orientação técnica especializada</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}