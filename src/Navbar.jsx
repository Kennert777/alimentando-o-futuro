import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ 
      backgroundColor: "white", 
      borderBottom: "1px solid #e9ecef", 
      padding: "16px 0",
      boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
    }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link 
            to="/" 
            style={{ 
              fontSize: "1.4rem", 
              fontWeight: "400", 
              color: "#2c3e50", 
              textDecoration: "none" 
            }}
          >
            Alimentando o Futuro
          </Link>
          
          <button 
            style={{ 
              display: "none", 
              backgroundColor: "transparent", 
              border: "none", 
              fontSize: "1.2rem", 
              color: "#2c3e50" 
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <Link 
              to="/" 
              style={{ 
                color: "#6c757d", 
                textDecoration: "none", 
                fontSize: "0.95rem", 
                fontWeight: "400",
                transition: "color 0.3s ease"
              }}
            >
              Início
            </Link>
            <Link 
              to="/horta" 
              style={{ 
                color: "#6c757d", 
                textDecoration: "none", 
                fontSize: "0.95rem", 
                fontWeight: "400",
                transition: "color 0.3s ease"
              }}
            >
              Horta
            </Link>
            <Link 
              to="/receitas" 
              style={{ 
                color: "#6c757d", 
                textDecoration: "none", 
                fontSize: "0.95rem", 
                fontWeight: "400",
                transition: "color 0.3s ease"
              }}
            >
              Receitas
            </Link>
            <Link 
              to="/apoio" 
              style={{ 
                color: "#6c757d", 
                textDecoration: "none", 
                fontSize: "0.95rem", 
                fontWeight: "400",
                transition: "color 0.3s ease"
              }}
            >
              Apoio
            </Link>
            <Link 
              to="/sobre" 
              style={{ 
                color: "#6c757d", 
                textDecoration: "none", 
                fontSize: "0.95rem", 
                fontWeight: "400",
                transition: "color 0.3s ease"
              }}
            >
              Sobre
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
