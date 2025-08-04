// Link: Componente para navegação sem recarregar a página
import { Link } from 'react-router-dom';
// useState: Hook para gerenciar estado do menu mobile
import { useState, useEffect } from 'react';
// Componente para alternar modo escuro
import DarkModeToggle from './DarkModeToggle';

// Componente da barra de navegação
export default function Navbar() {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);
  // Estado para controlar dropdown do perfil
  const [profileOpen, setProfileOpen] = useState(false);
  // Estado do usuário logado
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Verifica se há usuário logado
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
  }, []);

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.href = '/';
  };

  return (
    // Navbar do Bootstrap com cor de fundo personalizada
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#4F732C" }}>
      <div className="container">
        {/* Logo/Título que leva para a página inicial */}
        <Link className="navbar-brand" to="/">Alimentando o Futuro</Link>
        
        {/* Botão hamburguer para menu mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          // Alterna entre aberto/fechado quando clicado
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Menu de navegação - mostra/esconde baseado no estado isOpen */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          {/* Lista de links alinhada à direita */}
          <ul className="navbar-nav ms-auto">
            {/* Cada item do menu com Link para navegação SPA */}
            <li className="nav-item"><Link className="nav-link" to="/">Início</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/horta">Horta</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/receitas">Receitas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/dicas">Dicas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/apoio">Apoio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sobre">Sobre</Link></li>
            {/* Toggle de modo escuro */}
            <li className="nav-item d-flex align-items-center">
              <DarkModeToggle />
            </li>
            
            {/* Dropdown do perfil */}
            <li className="nav-item dropdown">
              <button
                className="btn nav-link dropdown-toggle d-flex align-items-center"
                onClick={() => setProfileOpen(!profileOpen)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'white',
                  padding: '8px 12px'
                }}
              >
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: currentUser ? '#558C03' : '#6c757d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    fontSize: '16px'
                  }}
                >
                  {currentUser ? currentUser.nome.charAt(0).toUpperCase() : '👤'}
                </div>
                {currentUser ? currentUser.nome.split(' ')[0] : 'Perfil'}
              </button>
              
              {profileOpen && (
                <div 
                  className="dropdown-menu show"
                  style={{
                    position: 'absolute',
                    right: '0',
                    left: 'auto',
                    top: '100%',
                    minWidth: '200px',
                    backgroundColor: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    zIndex: 1000
                  }}
                >
                  {currentUser ? (
                    <>
                      <div className="dropdown-header">
                        <strong>{currentUser.nome}</strong><br/>
                        <small className="text-muted">{currentUser.email}</small>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/dashboard">
                        📊 Dashboard
                      </Link>
                      <Link className="dropdown-item" to="/hortas-usuario">
                        🌱 Minhas Hortas
                      </Link>
                      <Link className="dropdown-item" to="/colheitas">
                        🌾 Minhas Colheitas
                      </Link>
                      <Link className="dropdown-item" to="/chat">
                        💬 Chat
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={logout}>
                        🚪 Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-header">
                        Faça login ou cadastre-se
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/login">
                        🔑 Entrar
                      </Link>
                      <Link className="dropdown-item" to="/register">
                        📝 Cadastrar
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/admin/login">
                        🔐 Admin
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      
      {/* Overlay para fechar dropdown */}
      {profileOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setProfileOpen(false)}
        ></div>
      )}
    </nav>
  );
}
