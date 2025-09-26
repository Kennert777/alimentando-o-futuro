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
        // Configurar axios com token salvo
        const token = localStorage.getItem('authToken');
        if (token && window.axios) {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
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
        try {
            // Definir tempo de expiração da sessão (24 horas)
            const expiryTime = new Date();
            expiryTime.setHours(expiryTime.getHours() + 24); // 24 horas
            
            localStorage.setItem('sessionExpiry', expiryTime.toISOString());
            localStorage.setItem('usuarioId', userData.id);
            
            // Salvar token JWT se fornecido
            if (token) {
                localStorage.setItem('authToken', token);
                // Configurar header padrão do axios
                if (window.axios) {
                    window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            }
            
            if (userData.tipoPerfil === 'ADMIN' || userData.tipo_perfil === 'admin') {
                localStorage.setItem('currentAdmin', JSON.stringify(userData));
                localStorage.removeItem('currentUser'); // Remove usuário comum se existir
                setIsAdmin(true);
            } else {
                localStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.removeItem('currentAdmin'); // Remove admin se existir
                setIsAdmin(false);
            }
            
            setCurrentUser(userData);
            setSessionExpiry(expiryTime.toISOString());
            
            // Forçar atualização do estado
            setTimeout(() => checkAuth(), 100);
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    };

    const logout = () => {
        try {
            // Limpar todos os dados de autenticação
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentAdmin');
            localStorage.removeItem('sessionExpiry');
            localStorage.removeItem('usuarioId');
            localStorage.removeItem('authToken');
            
            // Limpar header do axios
            if (window.axios) {
                delete window.axios.defaults.headers.common['Authorization'];
            }
            
            setCurrentUser(null);
            setIsAdmin(false);
            setSessionExpiry(null);
            
            // Redirecionar para home após logout
            setTimeout(() => {
                window.location.href = '/';
            }, 100);
        } catch (error) {
            console.error('Erro no logout:', error);
        }
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