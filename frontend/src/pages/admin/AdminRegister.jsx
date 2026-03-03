import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../config/api';

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        nome: '', email: '', telefone: '', password: '', confirmPassword: '', codigoAdmin: ''
    });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    // Validação do código admin será feita no backend

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');

        if (formData.password !== formData.confirmPassword) {
            setErro('Senhas não coincidem');
            setLoading(false);
            return;
        }

        // Validação do código será feita no backend

        try {
            const response = await api.post('/usuarios/admin/cadastro', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.password
            });

            if (response.status === 200 || response.status === 201) {
                setSucesso(true);
            } else {
                const errorMessages = {
                    400: 'Dados inválidos. Verifique os campos.',
                    409: 'Este email já está cadastrado.',
                    500: 'Erro interno do servidor.'
                };
                setErro(errorMessages[response.status] || 'Erro ao cadastrar admin.');
            }
        } catch (error) {
            if (error.response && error.response.status) {
                const errorMessages = {
                    400: 'Dados inválidos. Verifique os campos.',
                    409: 'Este email já está cadastrado.',
                    500: 'Erro interno do servidor.'
                };
                setErro(errorMessages[error.response.status] || 'Erro ao cadastrar admin.');
            } else {
                setErro('Erro de conexão com o servidor');
            }
        } finally {
            setLoading(false);
        }
    };

    if (sucesso) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="alert alert-success text-center">
                            <h4>Admin cadastrado com sucesso!</h4>
                            <p>Você já pode fazer login como administrador.</p>
                            <Link to="/admin/login" className="btn btn-success">Fazer Login Admin</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-danger" style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(220,53,69,0.3)" }}>
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <div className="alert alert-danger mb-3">
                                    <strong>⚠️ REGISTRO ADMINISTRATIVO</strong>
                                </div>
                                <h2 className="bubble-text" style={{ color: "#4F732C" }}>🔐 Cadastro Admin</h2>
                                <p className="text-muted">Registro de Administrador</p>
                                <div className="badge bg-warning text-dark">Requer Código Secreto</div>
                            </div>
                            
                            {erro && (
                                <div className="alert alert-danger">{erro}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nome Completo</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Telefone</label>
                                    <input 
                                        type="tel" 
                                        className="form-control"
                                        value={formData.telefone}
                                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                                        required 
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Confirmar Senha</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Código de Administrador</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={formData.codigoAdmin}
                                        onChange={(e) => setFormData({...formData, codigoAdmin: e.target.value})}
                                        placeholder="Código secreto para admin"
                                        required 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn w-100 mb-3 btn-danger"
                                    disabled={loading}
                                >
                                    {loading ? '🔄 Cadastrando...' : '🔑 Cadastrar Admin'}
                                </button>
                            </form>

                            <div className="text-center">
                                <Link to="/admin/login" style={{ color: "#4F732C" }}>← Voltar ao login admin</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}