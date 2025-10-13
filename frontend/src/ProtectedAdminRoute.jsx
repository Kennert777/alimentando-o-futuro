import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }) {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAdminAuth();
    }, []);

    const checkAdminAuth = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            
            if (!token || !currentUser) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            // Verificar se o usuário é admin
            if (currentUser.tipoPerfil === 'ADMIN' || currentUser.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação admin:', error);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}