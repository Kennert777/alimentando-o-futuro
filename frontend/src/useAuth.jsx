import { useState, useEffect, createContext, useContext } from 'react';

// Contexto de autenticação
const AuthContext = createContext();

// Provider de autenticação
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sessionExpiry, setSessionExpiry] = useState(null);

    useEffect(() => {
        checkAuth();
        // Verificar sessão a cada 5 minutos
        const interval = setInterval(checkSessionExpiry, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const checkAuth = () => {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            const admin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
            const expiry = localStorage.getItem('sessionExpiry');
            const userId = localStorage.getItem('usuarioId');
            
            // Verificar se a sessão expirou
            if (expiry && new Date() > new Date(expiry)) {
                logout();
                return;
            }
            
            // Prioriza admin se estiver logado
            if (admin && (admin.tipoPerfil === 'ADMIN' || admin.tipo_perfil === 'admin')) {
                setCurrentUser(admin);
                setIsAdmin(true);
                setSessionExpiry(expiry);
                if (!userId) localStorage.setItem('usuarioId', admin.id);
            } else if (user) {
                setCurrentUser(user);
                setIsAdmin(user.tipoPerfil === 'ADMIN' || user.tipo_perfil === 'admin');
                setSessionExpiry(expiry);
                if (!userId) localStorage.setItem('usuarioId', user.id);
            } else {
                setCurrentUser(null);
                setIsAdmin(false);
                setSessionExpiry(null);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const checkSessionExpiry = () => {
        const expiry = localStorage.getItem('sessionExpiry');
        if (expiry && new Date() > new Date(expiry)) {
            logout();
            alert('Sua sessão expirou. Faça login novamente.');
        }
    };

    const login = (userData, token = null, rememberMe = false) => {
        // Definir tempo de expiração da sessão
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + (rememberMe ? 24 * 7 : 8)); // 7 dias se lembrar, 8 horas se não
        
        localStorage.setItem('sessionExpiry', expiryTime.toISOString());
        localStorage.setItem('usuarioId', userData.id);
        
        // Salvar token JWT se fornecido
        if (token) {
            localStorage.setItem('authToken', token);
        }
        
        if (userData.tipoPerfil === 'ADMIN' || userData.tipo_perfil === 'admin') {
            localStorage.setItem('currentAdmin', JSON.stringify(userData));
            setIsAdmin(true);
        } else {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            setIsAdmin(false);
        }
        
        setCurrentUser(userData);
        setSessionExpiry(expiryTime.toISOString());
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentAdmin');
        localStorage.removeItem('sessionExpiry');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('authToken');
        setCurrentUser(null);
        setIsAdmin(false);
        setSessionExpiry(null);
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

    const value = {
        currentUser,
        isAdmin,
        loading,
        sessionExpiry,
        login,
        logout,
        requireAuth,
        requireAdmin,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

// Hook específico para componentes admin
export function useAdminAuth() {
    const { currentUser, isAdmin, loading } = useAuth();
    
    return {
        admin: currentUser,
        loading,
        isAuthenticated: isAdmin && currentUser !== null
    };
}