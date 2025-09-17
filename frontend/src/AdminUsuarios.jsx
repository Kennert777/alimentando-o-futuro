import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { api } from './config/api.js';
import { useAdminAuth } from './useAuth.js';
import { AdminSessionInfo } from './ProtectedRoute.jsx';

export default function AdminUsuarios() {
    const { admin, loading: authLoading, isAuthenticated } = useAdminAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            loadUsuarios();
        }
    }, [authLoading, isAuthenticated]);

    const loadUsuarios = async () => {
        try {
            const response = await axios.get(api.usuarios.listar);
            const todosUsuarios = response.data;
            setUsuarios(todosUsuarios);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            alert('Erro ao carregar usuários. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (usuario) => {
        setEditando(usuario.id);
        setFormData({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            tipo_perfil: usuario.tipo_perfil,
            ativo: usuario.ativo
        });
    };

    const handleSave = async () => {
        try {
            await axios.put(`${api.usuarios.listar}/${editando}`, formData);
            setEditando(null);
            loadUsuarios();
        } catch (error) {
            alert('Erro ao atualizar usuário: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await axios.delete(`${api.usuarios.listar}/${id}`);
                loadUsuarios();
            } catch (error) {
                alert('Erro ao excluir usuário: ' + error.message);
            }
        }
    };

    const resetPassword = async (id) => {
        if (confirm('Redefinir senha para "123456"?')) {
            try {
                await axios.put(`${api.usuarios.listar}/${id}`, { senha: '123456' });
                alert('Senha redefinida para: 123456');
            } catch (error) {
                alert('Erro ao redefinir senha: ' + error.message);
            }
        }
    };

    if (authLoading || loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;
    
    if (!isAuthenticated) return null;

    return (
        <div className="container mt-4">
            <AdminSessionInfo />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 style={{ color: "#4F732C" }}>👥 Gerenciar Usuários</h2>
                    <div className="badge bg-danger">PAINEL ADMINISTRATIVO</div>
                </div>
                <div>
                    <button className="btn btn-success btn-sm me-2" onClick={() => alert('Funcionalidade de criar usuário em desenvolvimento')}>➕ Novo Usuário</button>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
                </div>
            </div>

            {/* Ferramentas Administrativas Exclusivas */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card border-info">
                        <div className="card-body text-center">
                            <h6>📊 Estatísticas Rápidas</h6>
                            <p className="mb-1">Total: <strong>{usuarios.length}</strong></p>
                            <p className="mb-1">Ativos: <strong>{usuarios.filter(u => u.ativo).length}</strong></p>
                            <p className="mb-0">Admins: <strong>{usuarios.filter(u => u.tipo_perfil === 'admin').length}</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-warning">
                        <div className="card-body text-center">
                            <h6>⚡ Ações em Lote</h6>
                            <button className="btn btn-warning btn-sm mb-1 w-100" onClick={() => alert('Funcionalidade em desenvolvimento')}>Ativar Todos</button>
                            <button className="btn btn-outline-warning btn-sm w-100" onClick={() => alert('Funcionalidade em desenvolvimento')}>Exportar Lista</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-success">
                        <div className="card-body text-center">
                            <h6>🔍 Filtros Avançados</h6>
                            <select className="form-select form-select-sm mb-1" onChange={(e) => alert('Filtro: ' + e.target.value)}>
                                <option>Todos os tipos</option>
                                <option value="admin">Apenas Admins</option>
                                <option value="usuario">Apenas Usuários</option>
                                <option value="moderador">Apenas Moderadores</option>
                            </select>
                            <button className="btn btn-success btn-sm w-100" onClick={() => alert('Busca avançada em desenvolvimento')}>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">📋 Lista de Usuários - Controle Total</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Tipo</th>
                                    <th>Pontos</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>
                                            {editando === usuario.id ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm"
                                                    value={formData.nome}
                                                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                                />
                                            ) : usuario.nome}
                                        </td>
                                        <td>
                                            {editando === usuario.id ? (
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-sm"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            ) : usuario.email}
                                        </td>
                                        <td>
                                            {editando === usuario.id ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm"
                                                    value={formData.telefone}
                                                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                                                />
                                            ) : usuario.telefone}
                                        </td>
                                        <td>
                                            {editando === usuario.id ? (
                                                <select 
                                                    className="form-select form-select-sm"
                                                    value={formData.tipo_perfil}
                                                    onChange={(e) => setFormData({...formData, tipo_perfil: e.target.value})}
                                                >
                                                    <option value="usuario">Usuário</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="moderador">Moderador</option>
                                                </select>
                                            ) : (
                                                <span className={`badge ${
                                                    usuario.tipo_perfil === 'admin' ? 'bg-danger' :
                                                    usuario.tipo_perfil === 'moderador' ? 'bg-warning' : 'bg-primary'
                                                }`}>
                                                    {usuario.tipo_perfil}
                                                </span>
                                            )}
                                        </td>
                                        <td>{usuario.pontos || 0}</td>
                                        <td>
                                            {editando === usuario.id ? (
                                                <select 
                                                    className="form-select form-select-sm"
                                                    value={formData.ativo}
                                                    onChange={(e) => setFormData({...formData, ativo: e.target.value === 'true'})}
                                                >
                                                    <option value="true">Ativo</option>
                                                    <option value="false">Inativo</option>
                                                </select>
                                            ) : (
                                                <span className={`badge ${usuario.ativo ? 'bg-success' : 'bg-secondary'}`}>
                                                    {usuario.ativo ? 'Ativo' : 'Inativo'}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {editando === usuario.id ? (
                                                <div className="btn-group btn-group-sm">
                                                    <button className="btn btn-success" onClick={handleSave}>
                                                        ✓
                                                    </button>
                                                    <button className="btn btn-secondary" onClick={() => setEditando(null)}>
                                                        ✗
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="btn-group btn-group-sm">
                                                    <button className="btn btn-outline-primary" onClick={() => handleEdit(usuario)}>
                                                        ✏️
                                                    </button>
                                                    <button className="btn btn-outline-warning" onClick={() => resetPassword(usuario.id)}>
                                                        🔑
                                                    </button>
                                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(usuario.id)}>
                                                        🗑️
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}