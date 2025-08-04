import { useAuth, useAdminAuth } from './useAuth.js';

export default function AdminSessionTest() {
    const { currentUser, isAdmin, loading } = useAuth();
    const { admin, isAuthenticated } = useAdminAuth();

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h5>🔍 Teste de Sessão Admin</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h6>useAuth Hook:</h6>
                            <ul>
                                <li>currentUser: {currentUser ? currentUser.nome : 'null'}</li>
                                <li>isAdmin: {isAdmin ? 'true' : 'false'}</li>
                                <li>loading: {loading ? 'true' : 'false'}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6>useAdminAuth Hook:</h6>
                            <ul>
                                <li>admin: {admin ? admin.nome : 'null'}</li>
                                <li>isAuthenticated: {isAuthenticated ? 'true' : 'false'}</li>
                            </ul>
                        </div>
                    </div>
                    
                    <hr />
                    
                    <h6>LocalStorage:</h6>
                    <ul>
                        <li>currentUser: {localStorage.getItem('currentUser') || 'null'}</li>
                        <li>currentAdmin: {localStorage.getItem('currentAdmin') || 'null'}</li>
                    </ul>
                    
                    <div className="mt-3">
                        <button 
                            className="btn btn-primary me-2" 
                            onClick={() => window.location.reload()}
                        >
                            🔄 Recarregar Página
                        </button>
                        <button 
                            className="btn btn-warning me-2" 
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                        >
                            🗑️ Limpar Storage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}