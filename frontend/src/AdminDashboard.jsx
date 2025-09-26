import { useState, useEffect } from 'react';
import { useAuth } from './useAuth.jsx';
import { useTheme } from './ThemeContext.jsx';

export default function AdminDashboard() {
  const { currentUser, isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHortas: 0,
    totalColheitas: 0,
    activeUsers: 0
  });

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/';
      return;
    }
    fetchStats();
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className={`container py-5 ${isDarkMode ? 'text-white' : ''}`}>
      <h1 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Dashboard Administrativo</h1>
      
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className={`card h-100 ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <div className="card-body text-center">
              <h3 className="text-success">{stats.totalUsers}</h3>
              <p className="card-text">Total de Usuários</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card h-100 ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <div className="card-body text-center">
              <h3 className="text-success">{stats.totalHortas}</h3>
              <p className="card-text">Total de Hortas</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card h-100 ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <div className="card-body text-center">
              <h3 className="text-success">{stats.totalColheitas}</h3>
              <p className="card-text">Total de Colheitas</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card h-100 ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <div className="card-body text-center">
              <h3 className="text-success">{stats.activeUsers}</h3>
              <p className="card-text">Usuários Ativos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className={`card ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <div className="card-header">
              <h5>Ações Rápidas</h5>
            </div>
            <div className="card-body">
              <a href="/admin/usuarios" className="btn btn-success me-2 mb-2">Gerenciar Usuários</a>
              <a href="/admin/hortas" className="btn btn-outline-success me-2 mb-2">Ver Hortas</a>
              <a href="/admin/relatorios" className="btn btn-outline-success mb-2">Relatórios</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}