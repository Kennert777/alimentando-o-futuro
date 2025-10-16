import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ApoioNovo() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        nome: '', email: '', assunto: '', mensagem: ''
    });
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [minhasSolicitacoes, setMinhasSolicitacoes] = useState([]);
    const [activeTab, setActiveTab] = useState('nova');

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (currentUser) {
            setUser(currentUser);
            setFormData(prev => ({
                ...prev,
                nome: currentUser.nome || '',
                email: currentUser.email || ''
            }));
            loadSolicitacoes(currentUser.email);
        }
    }, []);

    const loadSolicitacoes = async (email) => {
        try {
            const response = await axios.get(`https://backend-y6kz.onrender.com/api/suporte/email/${email}`);
            setMinhasSolicitacoes(response.data);
        } catch (error) {
            console.error('Erro ao carregar solicitações:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axios.post('https://backend-y6kz.onrender.com/api/suporte', formData);
            
            setEnviado(true);
            setFormData(prev => ({
                nome: prev.nome,
                email: prev.email,
                assunto: '',
                mensagem: ''
            }));
            
            if (user) {
                loadSolicitacoes(user.email);
            }
            
            setTimeout(() => setEnviado(false), 5000);
        } catch (error) {
            setError(error.response?.data?.error || 'Erro ao enviar solicitação');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'PENDENTE': 'bg-warning text-dark',
            'EM_ANDAMENTO': 'bg-info text-white', 
            'RESOLVIDO': 'bg-success text-white'
        };
        return badges[status] || 'bg-secondary text-white';
    };

    return (
        <div className="container mt-4">
            <h2 className="bubble-text" style={{ color: "#4F732C" }}>🤝 Suporte ao Usuário</h2>
            <p className="lead">Precisa de ajuda? Entre em contato conosco!</p>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'nova' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nova')}
                    >
                        ➕ Nova Mensagem
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'minhas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('minhas')}
                    >
                        📋 Minhas Mensagens ({minhasSolicitacoes.length})
                    </button>
                </li>
            </ul>

            {activeTab === 'nova' && (
                <div>
                    {enviado && (
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Mensagem Enviada!</h4>
                            <p>Sua mensagem foi enviada com sucesso. Nossa equipe entrará em contato em breve.</p>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nome Completo</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                            placeholder="Seu nome completo"
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="seu@email.com"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Assunto</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.assunto}
                                        onChange={(e) => setFormData({...formData, assunto: e.target.value})}
                                        placeholder="Ex: Dúvida sobre cultivo de tomates"
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mensagem</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="5"
                                        value={formData.mensagem}
                                        onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                                        placeholder="Descreva sua dúvida, problema ou sugestão..."
                                        required
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-success btn-lg"
                                    disabled={loading}
                                >
                                    {loading ? '📤 Enviando...' : '📤 Enviar Mensagem'}
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
                            <h5>Nenhuma mensagem encontrada</h5>
                            <p>Você ainda não enviou nenhuma mensagem de suporte.</p>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setActiveTab('nova')}
                            >
                                Enviar Primeira Mensagem
                            </button>
                        </div>
                    ) : (
                        <div className="row">
                            {minhasSolicitacoes.map(solicitacao => (
                                <div key={solicitacao.id} className="col-md-6 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="card-title">{solicitacao.assunto}</h5>
                                                <span className={`badge ${getStatusBadge(solicitacao.status)}`}>
                                                    {solicitacao.status}
                                                </span>
                                            </div>
                                            <p><strong>📧 Email:</strong> {solicitacao.email}</p>
                                            <p><strong>📝 Mensagem:</strong> {solicitacao.mensagem.substring(0, 100)}...</p>
                                            <small className="text-muted">
                                                Enviado em: {new Date(solicitacao.dataCriacao).toLocaleDateString('pt-BR')}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Seção de Informações de Contato */}
            {activeTab === 'nova' && (
                <div className="row mt-5">
                    <div className="col-12">
                        <h3 style={{ color: "#4F732C" }}>Como Podemos Ajudar</h3>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100" style={{ backgroundColor: "#D9C179" }}>
                            <div className="card-body text-center">
                                <h4>🌱</h4>
                                <h5>Dúvidas sobre Cultivo</h5>
                                <p>Orientações sobre plantio e cuidados</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100" style={{ backgroundColor: "#D9AE89" }}>
                            <div className="card-body text-center">
                                <h4>🔧</h4>
                                <h5>Problemas Técnicos</h5>
                                <p>Suporte com o sistema</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100" style={{ backgroundColor: "#AEBF2C" }}>
                            <div className="card-body text-center">
                                <h4>💡</h4>
                                <h5>Sugestões</h5>
                                <p>Ideias para melhorar a plataforma</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}