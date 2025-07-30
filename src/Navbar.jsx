// Link: Componente para navegação sem recarregar a página
import { Link } from 'react-router-dom';
// useState: Hook para gerenciar estado do menu mobile
import { useState } from 'react';

// Componente da barra de navegação
export default function Navbar() {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Navbar do Bootstrap com cor de fundo personalizada
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#4F732C" }}>
      <div className="container">
        {/* Logo/Título que leva para a página inicial */}
        <Link className="navbar-brand" to="/">Feeding the Future</Link>
        
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
            <li className="nav-item"><Link className="nav-link" to="/apoio">Apoio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sobre">Sobre</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
