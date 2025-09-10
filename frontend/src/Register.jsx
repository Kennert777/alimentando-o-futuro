import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { api } from './config/api.js';

export default function Register() {
    console.log('API URL:', api.usuarios.cadastro);
    const [formData, setFormData] = useState({
        nome: '', email: '', telefone: '', password: '', confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');

        if (formData.password !== formData.confirmPassword) {
            setErro('Senhas não coincidem');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(api.usuarios.cadastro, {
                nome: formData.nome,
                email: formData.email,
                telefone: formData.telefone,
                senha: formData.password
            });
            
            setSucesso(true);
        } catch (error) {
            setErro(error.response?.data?.message || 'Erro ao cadastrar usuário');
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
                            <h4>Cadastro realizado com sucesso!</h4>
                            <p>Você já pode fazer login na plataforma.</p>
                            <Link to="/login" className="btn btn-success">Fazer Login</Link>
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
                    <div className="card" style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4 bubble-text" style={{ color: "#4F732C" }}>Cadastrar</h2>
                            
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

                                <button 
                                    type="submit" 
                                    className="btn w-100 mb-3"
                                    style={{ backgroundColor: "#4F732C", color: "white" }}
                                    disabled={loading}
                                >
                                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                                </button>
                            </form>

                            <div className="text-center">
                                <p>Já tem conta? <Link to="/login" style={{ color: "#4F732C" }}>Faça login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}