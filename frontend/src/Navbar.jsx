import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './useAuth.jsx';
import { useTheme } from './ThemeContext.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { currentUser, isAdmin, logout: authLogout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const logout = () => {
    authLogout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(135deg, #245829 0%, #357a38 25%, #45a049 50%, #4CAF50 75%, #8fd18f 100%)' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', color: 'white' }}>
          Alimentando o Futuro
        </Link>
        
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/" style={{ color: 'white', fontFamily: 'Playfair Display' }}>Início</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/horta" style={{ color: 'white', fontFamily: 'Playfair Display' }}>Horta</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/receitas" style={{ color: 'white', fontFamily: 'Playfair Display' }}>Receitas</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/mapa" style={{ color: 'white', fontFamily: 'Playfair Display' }}>Mapa</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/apoio" style={{ color: 'white', fontFamily: 'Playfair Display' }}>Apoio</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/sobre" style={{ color: 'white', fontFamily: 'Playfair Display' }}>Sobre</Link>
            </li>
            <li className="nav-item mx-2">
              <button 
                className="btn btn-outline-light btn-sm" 
                onClick={toggleDarkMode}
                style={{ borderRadius: '20px' }}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            {!currentUser ? (
              <>
                <li className="nav-item dropdown me-2">
                  <button 
                    className="btn btn-outline-light dropdown-toggle" 
                    onClick={() => setLoginOpen(!loginOpen)}
                    style={{ borderRadius: '25px', fontFamily: 'Playfair Display' }}
                  >
                    Entrar
                  </button>
                  {loginOpen && (
                    <ul className="dropdown-menu show" style={{ position: 'absolute', right: '0' }}>
                      <li><Link className="dropdown-item" to="/login">👤 Login Usuário</Link></li>
                      <li><Link className="dropdown-item" to="/admin/login">🔐 Login Admin</Link></li>
                    </ul>
                  )}
                </li>
                <li className="nav-item dropdown">
                  <button 
                    className="btn btn-light dropdown-toggle" 
                    onClick={() => setRegisterOpen(!registerOpen)}
                    style={{ borderRadius: '25px', fontFamily: 'Playfair Display' }}
                  >
                    Cadastrar
                  </button>
                  {registerOpen && (
                    <ul className="dropdown-menu show" style={{ position: 'absolute', right: '0' }}>
                      <li><Link className="dropdown-item" to="/register">👤 Cadastro Usuário</Link></li>
                      <li><Link className="dropdown-item" to="/admin/register">🔐 Cadastro Admin</Link></li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-success dropdown-toggle d-flex align-items-center"
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{ borderRadius: '25px', fontFamily: 'Playfair Display' }}
                >
                  <div className="rounded-circle bg-white text-success d-flex align-items-center justify-content-center me-2" style={{ width: '30px', height: '30px' }}>
                    {currentUser ? currentUser.nome.charAt(0).toUpperCase() : 'U'}
                  </div>
                  {currentUser ? currentUser.nome.split(' ')[0] : 'Perfil'}
                </button>
                
                {profileOpen && (
                  <div className="dropdown-menu show" style={{ position: 'absolute', right: '0', zIndex: 1000 }}>
                    {currentUser ? (
                      <>
                        <div className="dropdown-header">
                          <strong>{currentUser.nome}</strong><br/>
                          <small className="text-muted">{currentUser.email}</small>
                        </div>
                        <div className="dropdown-divider"></div>
                        {isAdmin ? (
                          <>
                            <Link className="dropdown-item" to="/admin/dashboard">🔐 Dashboard Admin</Link>
                            <Link className="dropdown-item" to="/admin/usuarios">👥 Gerenciar Usuários</Link>
                          </>
                        ) : (
                          <>
                            <Link className="dropdown-item" to="/dashboard">📊 Dashboard</Link>
                            <Link className="dropdown-item" to="/hortas-usuario">🌱 Minhas Hortas</Link>
                          </>
                        )}
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={logout}>🚪 Sair</button>
                      </>
                    ) : (
                      <>
                        <Link className="dropdown-item" to="/login">🔑 Entrar</Link>
                        <Link className="dropdown-item" to="/register">📝 Cadastrar</Link>
                      </>
                    )}
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {(profileOpen || loginOpen || registerOpen) && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}
          onClick={() => {
            setProfileOpen(false);
            setLoginOpen(false);
            setRegisterOpen(false);
          }}
        ></div>
      )}
    </nav>
  );
}
