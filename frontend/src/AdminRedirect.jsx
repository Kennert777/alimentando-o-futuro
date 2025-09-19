import { useEffect } from 'react';
import { useAuth } from './useAuth.js';

export default function AdminRedirect() {
    const { currentUser, isAdmin, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (isAdmin && currentUser) {
                // Se já está logado como admin, vai para o dashboard
                window.location.href = '/admin/dashboard';
            } else {
                // Se não está logado como admin, vai para o login admin
                window.location.href = '/admin/login';
            }
        }
    }, [loading, isAdmin, currentUser]);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Redirecionando...</p>
                </div>
            </div>
        );
    }

    return null;
}