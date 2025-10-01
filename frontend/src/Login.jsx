import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './config/axios.js';
import { useAuth } from './useAuth.jsx';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');

        try {
            const response = await api.post('/usuarios/login', {
                email: formData.email,
                senha: formData.password
            });
            
            console.log('Resposta do login:', response.data);
            
            // Verifica se a resposta contém token JWT
            if (response.data.token && response.data.usuario) {
                await login(response.data.usuario, response.data.token);
            } else {
                // Compatibilidade com resposta antiga
                await login(response.data);
            }
            
            console.log('Login realizado, redirecionando...');
            
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);
        } catch (error) {
            setErro(error.response?.data?.erro || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4 bubble-text" style={{ color: "#4F732C" }}>Entrar</h2>
                            
                            {erro && (
                                <div className="alert alert-danger">{erro}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        autoComplete="email"
                                        required 
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        autoComplete="current-password"
                                        required 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn w-100 mb-3"
                                    style={{ backgroundColor: "#4F732C", color: "white" }}
                                    disabled={loading}
                                >
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>

                            <div className="text-center">
                                <p className="mb-2">
                                    <Link to="/forgot-password" style={{ color: "#4F732C" }}>Esqueceu sua senha?</Link>
                                </p>
                                <p>Não tem conta? <Link to="/register" style={{ color: "#4F732C" }}>Cadastre-se</Link></p>
                                <hr />
                                <p className="small text-muted">
                                    Acesso administrativo? <Link to="/admin/login" style={{ color: "#4F732C" }}>Clique aqui</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}