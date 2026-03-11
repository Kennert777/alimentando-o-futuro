import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../../components/Toast';

export default function Perfil() {
    const { currentUser, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        nome: '', email: '', senha: '', confirmarSenha: '', ativo: true
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    useEffect(() => {
        if (currentUser) {
            setFormData({
                nome: currentUser.nome || '',
                email: currentUser.email || '',
                senha: '', confirmarSenha: '',
                ativo: currentUser.ativo !== false
            });
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.senha && formData.senha !== formData.confirmarSenha) {
            alert('Senhas não coincidem!');
            return;
        }

        setLoading(true);
        try {
            const updateData = {
                nome: formData.nome,
                email: formData.email,
                ativo: formData.ativo
            };
            
            if (formData.senha) {
                updateData.senha = formData.senha;
            }

            const response = await fetch(`http://localhost:8080/api/usuarios/perfil`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Erro ao atualizar perfil');
            }

            const updatedUser = await response.json();
            updateUser(updatedUser);
            
            if (!formData.ativo) {
                showToast('Conta desativada! Você será deslogado.', 'warning');
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }, 2000);
            } else {
                showToast('Perfil atualizado com sucesso!', 'success');
            }
            
            setFormData(prev => ({ ...prev, senha: '', confirmarSenha: '' }));
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) return <div>Carregando...</div>;

    return (
        <>
        <Toast 
            show={toast.show}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
        />
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4" style={{ color: '#4F732C' }}>
                                👤 Meu Perfil
                            </h3>
                            
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
                                    <label className="form-label">Nova Senha (opcional)</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formData.senha}
                                        onChange={(e) => setFormData({...formData, senha: e.target.value})}
                                        placeholder="Deixe em branco para manter a atual"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Confirmar Nova Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formData.confirmarSenha}
                                        onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                                        placeholder="Confirme a nova senha"
                                    />
                                </div>

                                <div className="mb-3">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="ativoSwitch"
                                            checked={formData.ativo}
                                            onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                                        />
                                        <label className="form-check-label" htmlFor="ativoSwitch">
                                            {formData.ativo ? '✅ Conta Ativa' : '❌ Conta Inativa'}
                                        </label>
                                    </div>
                                    <small className="text-muted">
                                        {formData.ativo ? 'Sua conta está ativa e funcional' : 'Conta inativa - você será deslogado'}
                                    </small>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-success w-100"
                                    style={{ backgroundColor: '#4F732C' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Atualizando...' : 'Atualizar Perfil'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}