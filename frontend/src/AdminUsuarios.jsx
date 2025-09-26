import { useState, useEffect } from 'react';
import { useAuth } from './useAuth.jsx';
import { useTheme } from './ThemeContext.jsx';

export default function AdminUsuarios() {
  const { isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const deleteUser = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        setUsuarios(usuarios.filter(u => u.id !== id));
        alert('Usuário excluído com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className={`container py-5 ${isDarkMode ? 'text-white' : ''}`}>
      <h1 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Gerenciar Usuários</h1>
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className={`card ${isDarkMode ? 'bg-dark text-white' : ''}`}>
          <div className="card-body">
            <div className="table-responsive">
              <table className={`table ${isDarkMode ? 'table-dark' : ''}`}>
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
                        <span className={`badge ${usuario.isAdmin ? 'bg-danger' : 'bg-success'}`}>
                          {usuario.isAdmin ? 'Admin' : 'Usuário'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteUser(usuario.id)}
                          disabled={usuario.isAdmin}
                        >
                          Excluir
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