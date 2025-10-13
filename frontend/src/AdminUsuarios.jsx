import { useState, useEffect } from 'react';
import { useAuth } from './useAuth.jsx';
import { handleDelete } from './utils/deleteHandler';


export default function AdminUsuarios() {
  const { isAdmin } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', tipoPerfil: 'USUARIO', ativo: true });

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/';
      return;
    }
    fetchUsuarios();
  }, [isAdmin]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const editUser = (user) => {
    setEditingUser(user.id);
    setFormData({
      nome: user.nome,
      email: user.email,
      tipoPerfil: user.tipoPerfil || user.tipo_perfil || 'USUARIO',
      ativo: user.ativo !== false
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingUser 
        ? `http://localhost:8080/api/usuarios/${editingUser}`
        : 'http://localhost:8080/api/usuarios/cadastro';
      
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert(editingUser ? 'Usuário atualizado!' : 'Usuário criado!');
        fetchUsuarios();
        resetForm();
      }
    } catch (error) {
      alert('Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({ nome: '', email: '', tipoPerfil: 'USUARIO', ativo: true });
  };

  if (!isAdmin) return null;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ fontFamily: 'Playfair Display' }}>👥 Gerenciar Usuários</h1>
        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Novo Usuário'}
        </button>
      </div>
      
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h5>
            <form onSubmit={handleSubmit}>
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
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-control"
                    value={formData.tipoPerfil}
                    onChange={(e) => setFormData({...formData, tipoPerfil: e.target.value})}
                  >
                    <option value="USUARIO">Usuário</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-check form-switch mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.ativo}
                      onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                    />
                    <label className="form-check-label">
                      {formData.ativo ? 'Ativo' : 'Inativo'}
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success me-2">
                {editingUser ? 'Atualizar' : 'Criar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
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
                        <span className={`badge ${(usuario.tipoPerfil || usuario.tipo_perfil) === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                          {(usuario.tipoPerfil || usuario.tipo_perfil) === 'ADMIN' ? 'Admin' : 'Usuário'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${usuario.ativo !== false ? 'bg-success' : 'bg-secondary'}`}>
                          {usuario.ativo !== false ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => editUser(usuario)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(usuario.id, 'usuarios', usuario.nome, setUsuarios, setLoading)}
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
      )}
    </div>
  );
}