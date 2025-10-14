import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ nome: '', email: '', tipoPerfil: '', ativo: true });

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios`, {
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
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
        setFormData({ 
            nome: user.nome, 
            email: user.email, 
            tipoPerfil: user.tipoPerfil || 'USER',
            ativo: user.ativo !== false,
            currentUser: user // Store full user data
        });
    };

    const updateUser = async (e) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
        
        if (!formData.nome.trim() || !formData.email.trim()) {
            alert('Nome e email são obrigatórios!');
            return;
        }
        
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Token de autenticação não encontrado. Faça login novamente.');
                return;
            }
            
            const payload = {
                ...formData.currentUser, // Preserve all existing fields
                nome: formData.nome.trim(),
                email: formData.email.trim(),
                tipoPerfil: formData.tipoPerfil,
                ativo: formData.ativo
            };
            
            console.log('Enviando payload:', payload);
            console.log('URL:', `${import.meta.env.VITE_API_URL}/usuarios/${editingUser}`);
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${editingUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            
            console.log('Response status:', response.status);
            
            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                setEditingUser(null);
                setFormData({ nome: '', email: '', tipoPerfil: '', ativo: true });
                loadUsuarios();
            } else {
                const errorText = await response.text();
                console.error('Erro do servidor:', response.status, errorText);
                alert(`Erro ao atualizar usuário: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            alert(`Erro de conexão com o servidor: ${error.message}`);
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
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Tipo de Perfil</label>
                                    <select
                                        className="form-select"
                                        value={formData.tipoPerfil}
                                        onChange={(e) => setFormData({...formData, tipoPerfil: e.target.value})}
                                        required
                                    >
                                        <option value="USER">Usuário</option>
                                        <option value="ADMIN">Administrador</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={formData.ativo}
                                        onChange={(e) => setFormData({...formData, ativo: e.target.value === 'true'})}
                                    >
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </select>
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
                                    <th>Status</th>
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
                                            <span className={`badge ${usuario.tipoPerfil === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                                {usuario.tipoPerfil === 'ADMIN' ? 'Admin' : 'Usuário'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${usuario.ativo !== false ? 'bg-success' : 'bg-secondary'}`}>
                                                {usuario.ativo !== false ? 'Ativo' : 'Inativo'}
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