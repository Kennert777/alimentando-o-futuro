import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#4F732C" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">Feeding the Future</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
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
