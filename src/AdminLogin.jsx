import { useState } from 'react';
import { Link } from 'react-router-dom';
import db from './database.js';

export default function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');

        try {
            const usuario = await db.autenticarUsuario(formData.email, formData.password);
            
            if (usuario.tipo_perfil !== 'admin') {
                setErro('Acesso negado. Apenas administradores podem acessar.');
                setLoading(false);
                return;
            }
            
            localStorage.setItem('currentAdmin', JSON.stringify(usuario));
            window.location.href = '/admin/dashboard';
        } catch (error) {
            setErro(error.message);
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
                            <div className="text-center mb-4">
                                <h2 className="bubble-text" style={{ color: "#4F732C" }}>🔐 Admin</h2>
                                <p className="text-muted">Acesso Administrativo</p>
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
                                    className="btn w-100 mb-3"
                                    style={{ backgroundColor: "#4F732C", color: "white" }}
                                    disabled={loading}
                                >
                                    {loading ? 'Entrando...' : 'Entrar como Admin'}
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