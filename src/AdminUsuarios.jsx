import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './database.js';

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
        if (!currentAdmin || currentAdmin.tipo_perfil !== 'admin') {
            window.location.href = '/admin/login';
            return;
        }
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const todosUsuarios = await db.buscarTodosUsuarios();
            setUsuarios(todosUsuarios);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
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
            await db.atualizarUsuario(editando, formData);
            setEditando(null);
            loadUsuarios();
        } catch (error) {
            alert('Erro ao atualizar usuário: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await db.excluirUsuario(id);
                loadUsuarios();
            } catch (error) {
                alert('Erro ao excluir usuário: ' + error.message);
            }
        }
    };

    const resetPassword = async (id) => {
        if (confirm('Redefinir senha para "123456"?')) {
            try {
                await db.atualizarUsuario(id, { senha: '123456' });
                alert('Senha redefinida para: 123456');
            } catch (error) {
                alert('Erro ao redefinir senha: ' + error.message);
            }
        }
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>👥 Gerenciar Usuários</h2>
                <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
            </div>

            <div className="card">
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