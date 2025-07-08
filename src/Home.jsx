import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    const [stats, setStats] = useState({ usuarios: 0, receitas: 0, plantas: 0 });
    
    useEffect(() => {
        // Animação dos números
        const timer = setInterval(() => {
            setStats(prev => ({
                usuarios: prev.usuarios < 1250 ? prev.usuarios + 25 : 1250,
                receitas: prev.receitas < 50 ? prev.receitas + 1 : 50,
                plantas: prev.plantas < 25 ? prev.plantas + 1 : 25
            }));
        }, 50);
        
        setTimeout(() => clearInterval(timer), 2000);
        return () => clearInterval(timer);
    }, []);

    return (
      <>
        {/* Hero Section */}
        <div className="container mt-5 text-center">
          <h1 style={{ color: "#4F732C", fontSize: "3rem" }}>🌱 Feeding the Future</h1>
          <p className="lead">
            Promovendo alimentação saudável e sustentável por meio da tecnologia e educação.
          </p>
          <Link to="/sobre" className="btn btn-success btn-lg mt-4" style={{ backgroundColor: "#558C03" }}>
            Saiba Mais →
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="container mt-5">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card border-0" style={{ backgroundColor: "transparent" }}>
                <div className="card-body">
                  <h2 style={{ color: "#4F732C", fontSize: "3rem" }}>{stats.usuarios}+</h2>
                  <p>Usuários Ativos</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0" style={{ backgroundColor: "transparent" }}>
                <div className="card-body">
                  <h2 style={{ color: "#558C03", fontSize: "3rem" }}>{stats.receitas}+</h2>
                  <p>Receitas Sustentáveis</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0" style={{ backgroundColor: "transparent" }}>
                <div className="card-body">
                  <h2 style={{ color: "#AEBF2C", fontSize: "3rem" }}>{stats.plantas}+</h2>
                  <p>Plantas Catalogadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="container mt-5">
          <h2 className="text-center mb-5" style={{ color: "#4F732C" }}>Explore Nossas Funcionalidades</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#D9C179" }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: "3rem" }}>🌿</div>
                  <h5 className="card-title">Horta Digital</h5>
                  <p className="card-text">Aprenda a cultivar seus próprios alimentos com guias práticos</p>
                  <Link to="/horta" className="btn btn-primary" style={{ backgroundColor: "#4F732C", border: "none" }}>Explorar</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#D9AE89" }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: "3rem" }}>🍽️</div>
                  <h5 className="card-title">Receitas</h5>
                  <p className="card-text">Descubra receitas sustentáveis que aproveitam cascas e talos</p>
                  <Link to="/receitas" className="btn btn-primary" style={{ backgroundColor: "#558C03", border: "none" }}>Ver Receitas</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#AEBF2C" }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: "3rem" }}>💬</div>
                  <h5 className="card-title">Apoio</h5>
                  <p className="card-text">Precisa de ajuda? Nossa equipe está pronta para te apoiar</p>
                  <Link to="/apoio" className="btn btn-primary" style={{ backgroundColor: "#4F732C", border: "none" }}>Solicitar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="container mt-5 mb-5">
          <div className="card" style={{ backgroundColor: "#4F732C", color: "white" }}>
            <div className="card-body text-center py-5">
              <h3>Comece Sua Jornada Sustentável Hoje!</h3>
              <p className="lead">Junte-se a milhares de pessoas que já transformaram sua alimentação</p>
              <Link to="/horta" className="btn btn-light btn-lg me-3">Criar Horta</Link>
              <Link to="/receitas" className="btn btn-outline-light btn-lg">Ver Receitas</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  