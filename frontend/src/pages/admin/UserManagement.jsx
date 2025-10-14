import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UserManagement() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ nome: '', email: '' });

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/api/usuarios', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            }
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id, nome) => {
        if (confirm(`Tem certeza que deseja deletar o usuário "${nome}"?`)) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    alert('Usuário deletado com sucesso!');
                    loadUsuarios();
                } else {
                    alert('Erro ao deletar usuário.');
                }
            } catch (error) {
                alert('Erro de conexão com o servidor.');
            }
        }
    };

    const editUser = (user) => {
        setEditingUser(user.id);
        setFormData({ nome: user.nome, email: user.email });
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/api/usuarios/${editingUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                setEditingUser(null);
                setFormData({ nome: '', email: '' });
                loadUsuarios();
            } else {
                alert('Erro ao atualizar usuário.');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        }
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>👥 Gestão de Usuários</h2>
                <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
            </div>

            {editingUser && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>Editar Usuário</h5>
                        <form onSubmit={updateUser}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success me-2">Salvar</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <span className={`badge ${usuario.tipoPerfil === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                                                {usuario.tipoPerfil || 'USER'}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => editUser(usuario)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteUser(usuario.id, usuario.nome)}
                                                disabled={usuario.tipoPerfil === 'ADMIN'}
                                            >
                                                Deletar
                                            </button>
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