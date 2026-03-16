import { useAdminAuth, useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';

// Componente para proteger rotas administrativas
export function AdminRoute({ children }) {
    const { admin, loading, isAuthenticated } = useAdminAuth();
    
    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Verificando autenticação...</p>
                </div>
            </div>
        );
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/error/403" replace />;
    }
    
    return children;
}

// Componente para proteger rotas de usuários comuns
export function UserRoute({ children }) {
    const { currentUser, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Verificando autenticação...</p>
                </div>
            </div>
        );
    }
    
    if (!currentUser) {
        return <Navigate to="/error/401" replace />;
    }
    
    return children;
}

// Componente para mostrar informações de sessão admin
export function AdminSessionInfo() {
    const { admin, isAuthenticated } = useAdminAuth();
    
    if (!isAuthenticated) return null;
    
    return (
        <div className="alert alert-success mb-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <strong>🔐 Sessão Admin Ativa</strong>
                    <br />
                    <small>Logado como: {admin?.nome} ({admin?.email})</small>
                </div>
                <div className="badge bg-success">
                    Admin Conectado
                </div>
            </div>
        </div>
    );
}