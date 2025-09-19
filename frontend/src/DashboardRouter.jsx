import { useEffect } from 'react';
import { useAuth } from './useAuth.js';
import Dashboard from './Dashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';

export default function DashboardRouter() {
    const { currentUser, isAdmin, loading } = useAuth();

    useEffect(() => {
        if (!loading && !currentUser) {
            window.location.href = '/login';
        }
    }, [loading, currentUser]);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    if (!currentUser) return null;

    // Redireciona automaticamente baseado no tipo de usuário
    return isAdmin ? <AdminDashboard /> : <Dashboard />;
}