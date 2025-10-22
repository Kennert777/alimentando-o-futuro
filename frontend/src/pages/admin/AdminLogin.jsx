import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');

        try {
            const response = await fetch('https://backend-y6kz.onrender.com/api/usuarios/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    senha: formData.password
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                setErro('Email ou senha incorretos.');
                return;
            }
            
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.usuario));
            login(data.usuario, data.token);
            window.location.href = '/admin/dashboard';
        } catch (error) {
            setErro('Não foi possível conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-danger" style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(220,53,69,0.3)" }}>
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <div className="alert alert-danger mb-3">
                                    <strong>⚠️ ACESSO RESTRITO</strong>
                                </div>
                                <h2 className="bubble-text" style={{ color: "#4F732C" }}>🔐 Admin</h2>
                                <p className="text-muted">Painel Administrativo</p>
                                <div className="badge bg-warning text-dark">Apenas para Administradores</div>
                            </div>
                            
                            {erro && (
                                <div className="alert alert-danger">{erro}</div>
                            )}

                            <form onSubmit={handleSubmit}>
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
                                    <label className="form-label">Senha</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        required 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn w-100 mb-3 btn-danger"
                                    disabled={loading}
                                >
                                    {loading ? '🔄 Verificando...' : '🔑 Entrar como Admin'}
                                </button>
                            </form>

                            <div className="text-center">
                                <p>Não tem conta admin? <Link to="/admin/register" style={{ color: "#4F732C" }}>Cadastre-se</Link></p>
                                <Link to="/login" style={{ color: "#4F732C" }}>← Voltar ao login normal</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}