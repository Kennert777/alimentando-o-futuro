import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from './config/api';

export default function ForgotPassword() {
    const [step, setStep] = useState(1); // 1: email, 2: token + nova senha
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/password-reset/request', { email });
            setMessage('Código enviado para seu email! Verifique sua caixa de entrada.');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao enviar código');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (newPassword.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/password-reset/reset', { token, newPassword });
            setMessage('Senha redefinida com sucesso! Você pode fazer login agora.');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao redefinir senha');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="h3 mb-3" style={{ color: '#4F732C' }}>
                                    Redefinir Senha
                                </h2>
                                <p className="text-muted">
                                    {step === 1 ? 'Digite seu email para receber o código' : 'Digite o código e sua nova senha'}
                                </p>
                            </div>

                            {message && (
                                <div className="alert alert-success" role="alert">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {step === 1 ? (
                                <form onSubmit={handleRequestReset}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Digite seu email cadastrado"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn w-100 mb-3"
                                        style={{ backgroundColor: '#558C03', color: 'white' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Enviando...' : 'Enviar Código'}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleResetPassword}>
                                    <div className="mb-3">
                                        <label htmlFor="token" className="form-label">Código de Verificação</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="token"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                            required
                                            placeholder="Digite o código de 6 dígitos"
                                            maxLength="6"
                                        />
                                        <small className="text-muted">Código enviado para {email}</small>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">Nova Senha</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            placeholder="Digite sua nova senha"
                                            minLength="6"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirmar Nova Senha</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            placeholder="Confirme sua nova senha"
                                            minLength="6"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn w-100 mb-3"
                                        style={{ backgroundColor: '#558C03', color: 'white' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100 mb-3"
                                        onClick={() => setStep(1)}
                                    >
                                        Voltar
                                    </button>
                                </form>
                            )}

                            <div className="text-center">
                                <Link to="/login" className="text-decoration-none" style={{ color: '#4F732C' }}>
                                    Voltar ao Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}