import { useState, useEffect } from 'react';

// Hook personalizado para gerenciar autenticação
export function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            const admin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
            
            // Prioriza admin se estiver logado
            if (admin && admin.tipo_perfil === 'admin') {
                setCurrentUser(admin);
                setIsAdmin(true);
            } else if (user) {
                setCurrentUser(user);
                setIsAdmin(user.tipo_perfil === 'admin');
            } else {
                setCurrentUser(null);
                setIsAdmin(false);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            setCurrentUser(null);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        if (userData.tipo_perfil === 'admin') {
            localStorage.setItem('currentAdmin', JSON.stringify(userData));
            setIsAdmin(true);
        } else {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            setIsAdmin(false);
        }
        setCurrentUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentAdmin');
        setCurrentUser(null);
        setIsAdmin(false);
    };

    const requireAuth = (redirectTo = '/login') => {
        if (!currentUser && !loading) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    };

    const requireAdmin = (redirectTo = '/admin/login') => {
        if (!isAdmin && !loading) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    };

    return {
        currentUser,
        isAdmin,
        loading,
        login,
        logout,
        requireAuth,
        requireAdmin,
        checkAuth
    };
}

// Hook específico para componentes admin
export function useAdminAuth() {
    const { currentUser, isAdmin, loading, requireAdmin } = useAuth();
    
    useEffect(() => {
        if (!loading && !requireAdmin()) {
            return;
        }
    }, [loading, isAdmin]);

    return {
        admin: currentUser,
        loading,
        isAuthenticated: isAdmin
    };
}