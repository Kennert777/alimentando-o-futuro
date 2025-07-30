import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <>
        {/* Hero Section */}
        <div className="container" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ 
              color: "#2c3e50", 
              fontSize: "2.8rem", 
              fontWeight: "300", 
              marginBottom: "24px",
              lineHeight: "1.2"
            }}>
              Alimentando o Futuro
            </h1>
            <p style={{ 
              fontSize: "1.2rem", 
              color: "#6c757d", 
              fontWeight: "300", 
              marginBottom: "40px",
              lineHeight: "1.6"
            }}>
              Promovendo alimentação saudável e sustentável através da educação nutricional e tecnologia
            </p>
            <Link 
              to="/sobre" 
              style={{ 
                backgroundColor: "#4a90e2", 
                border: "none",
                borderRadius: "8px",
                padding: "14px 32px",
                fontSize: "1rem",
                fontWeight: "400",
                color: "white",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(74, 144, 226, 0.2)"
              }}
            >
              Saiba Mais
            </Link>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="container" style={{ paddingBottom: "80px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ 
              textAlign: "center", 
              marginBottom: "60px", 
              color: "#2c3e50", 
              fontSize: "2.2rem", 
              fontWeight: "300" 
            }}>
              Nossas Funcionalidades
            </h2>
            <div className="row" style={{ gap: "0 20px" }}>
              <div className="col-md-4" style={{ marginBottom: "30px" }}>
                <div style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px", 
                  padding: "40px 30px", 
                  textAlign: "center", 
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #f1f3f4",
                  transition: "transform 0.3s ease"
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>🌿</div>
                  <h5 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.3rem", 
                    fontWeight: "400", 
                    marginBottom: "16px" 
                  }}>
                    Horta Digital
                  </h5>
                  <p style={{ 
                    color: "#6c757d", 
                    fontSize: "0.95rem", 
                    lineHeight: "1.5", 
                    marginBottom: "24px" 
                  }}>
                    Aprenda a cultivar seus próprios alimentos com guias práticos
                  </p>
                  <Link 
                    to="/horta" 
                    style={{ 
                      backgroundColor: "#4a90e2", 
                      border: "none", 
                      borderRadius: "6px", 
                      padding: "10px 24px", 
                      color: "white", 
                      textDecoration: "none", 
                      fontSize: "0.9rem", 
                      fontWeight: "400",
                      display: "inline-block"
                    }}
                  >
                    Explorar
                  </Link>
                </div>
              </div>
              <div className="col-md-4" style={{ marginBottom: "30px" }}>
                <div style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px", 
                  padding: "40px 30px", 
                  textAlign: "center", 
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #f1f3f4",
                  transition: "transform 0.3s ease"
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>🍽️</div>
                  <h5 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.3rem", 
                    fontWeight: "400", 
                    marginBottom: "16px" 
                  }}>
                    Receitas
                  </h5>
                  <p style={{ 
                    color: "#6c757d", 
                    fontSize: "0.95rem", 
                    lineHeight: "1.5", 
                    marginBottom: "24px" 
                  }}>
                    Descubra receitas sustentáveis que aproveitam cascas e talos
                  </p>
                  <Link 
                    to="/receitas" 
                    style={{ 
                      backgroundColor: "#4a90e2", 
                      border: "none", 
                      borderRadius: "6px", 
                      padding: "10px 24px", 
                      color: "white", 
                      textDecoration: "none", 
                      fontSize: "0.9rem", 
                      fontWeight: "400",
                      display: "inline-block"
                    }}
                  >
                    Ver Receitas
                  </Link>
                </div>
              </div>
              <div className="col-md-4" style={{ marginBottom: "30px" }}>
                <div style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px", 
                  padding: "40px 30px", 
                  textAlign: "center", 
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #f1f3f4",
                  transition: "transform 0.3s ease"
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>💬</div>
                  <h5 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.3rem", 
                    fontWeight: "400", 
                    marginBottom: "16px" 
                  }}>
                    Apoio
                  </h5>
                  <p style={{ 
                    color: "#6c757d", 
                    fontSize: "0.95rem", 
                    lineHeight: "1.5", 
                    marginBottom: "24px" 
                  }}>
                    Precisa de ajuda? Nossa equipe está pronta para te apoiar
                  </p>
                  <Link 
                    to="/apoio" 
                    style={{ 
                      backgroundColor: "#4a90e2", 
                      border: "none", 
                      borderRadius: "6px", 
                      padding: "10px 24px", 
                      color: "white", 
                      textDecoration: "none", 
                      fontSize: "0.9rem", 
                      fontWeight: "400",
                      display: "inline-block"
                    }}
                  >
                    Solicitar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="container" style={{ paddingBottom: "80px" }}>
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            borderRadius: "16px", 
            padding: "60px 40px", 
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            <h3 style={{ 
              color: "#2c3e50", 
              fontSize: "2rem", 
              fontWeight: "300", 
              marginBottom: "16px" 
            }}>
              Comece Sua Jornada Sustentável
            </h3>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "1.1rem", 
              fontWeight: "300", 
              marginBottom: "32px",
              lineHeight: "1.6"
            }}>
              Transforme sua alimentação com práticas sustentáveis e saudáveis
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link 
                to="/horta" 
                style={{ 
                  backgroundColor: "#4a90e2", 
                  border: "none", 
                  borderRadius: "8px", 
                  padding: "12px 28px", 
                  color: "white", 
                  textDecoration: "none", 
                  fontSize: "1rem", 
                  fontWeight: "400",
                  display: "inline-block"
                }}
              >
                Criar Horta
              </Link>
              <Link 
                to="/receitas" 
                style={{ 
                  backgroundColor: "transparent", 
                  border: "2px solid #4a90e2", 
                  borderRadius: "8px", 
                  padding: "10px 28px", 
                  color: "#4a90e2", 
                  textDecoration: "none", 
                  fontSize: "1rem", 
                  fontWeight: "400",
                  display: "inline-block"
                }}
              >
                Ver Receitas
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  