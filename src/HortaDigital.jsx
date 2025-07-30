import { useState } from 'react';

export default function HortaDigital() {
    const [plantaSelecionada, setPlantaSelecionada] = useState(null);
    
    const plantas = [
        {
            id: 1,
            nome: "Alface",
            dificuldade: "Fácil",
            tempo: "45-60 dias",
            cuidados: "Rega diária, sol parcial, solo úmido",
            dicas: "Plante em local com sombra parcial. Regue pela manhã."
        },
        {
            id: 2,
            nome: "Tomate Cereja",
            dificuldade: "Médio",
            tempo: "70-80 dias",
            cuidados: "Sol pleno, rega regular, suporte para crescimento",
            dicas: "Use estacas para apoiar o crescimento. Retire brotos laterais."
        },
        {
            id: 3,
            nome: "Manjericão",
            dificuldade: "Fácil",
            tempo: "30-40 dias",
            cuidados: "Sol pleno, rega moderada",
            dicas: "Corte as flores para manter as folhas saborosas."
        },
        {
            id: 4,
            nome: "Cebolinha",
            dificuldade: "Muito Fácil",
            tempo: "60-70 dias",
            cuidados: "Sol parcial, rega regular",
            dicas: "Corte apenas as pontas, deixando a base para rebrotar."
        }
    ];

    return (
      <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ 
            color: "#2c3e50", 
            fontSize: "2.4rem", 
            fontWeight: "300", 
            marginBottom: "20px" 
          }}>
            Horta Digital
          </h2>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "#6c757d", 
            fontWeight: "300", 
            lineHeight: "1.6", 
            marginBottom: "50px" 
          }}>
            Aprenda a cultivar seus próprios alimentos em casa com nossas dicas práticas.
          </p>
          
          <div className="row" style={{ marginBottom: "60px" }}>
            <div className="col-md-6" style={{ marginBottom: "30px" }}>
              <div style={{ 
                backgroundColor: "white", 
                borderRadius: "12px", 
                padding: "30px", 
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
                border: "1px solid #f1f3f4",
                height: "100%"
              }}>
                <h5 style={{ 
                  color: "#2c3e50", 
                  fontSize: "1.3rem", 
                  fontWeight: "400", 
                  marginBottom: "16px" 
                }}>
                  🌱 Iniciantes
                </h5>
                <p style={{ 
                  color: "#6c757d", 
                  fontSize: "0.95rem", 
                  lineHeight: "1.5", 
                  marginBottom: "24px" 
                }}>
                  Comece com plantas fáceis de cultivar
                </p>
                <a 
                  href="https://www.youtube.com/results?search_query=horta+caseira+iniciantes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    backgroundColor: "#4a90e2", 
                    border: "none", 
                    borderRadius: "6px", 
                    padding: "10px 20px", 
                    color: "white", 
                    textDecoration: "none", 
                    fontSize: "0.9rem", 
                    fontWeight: "400",
                    display: "inline-block"
                  }}
                >
                  Ver Tutoriais
                </a>
              </div>
            </div>
            <div className="col-md-6" style={{ marginBottom: "30px" }}>
              <div style={{ 
                backgroundColor: "white", 
                borderRadius: "12px", 
                padding: "30px", 
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
                border: "1px solid #f1f3f4",
                height: "100%"
              }}>
                <h5 style={{ 
                  color: "#2c3e50", 
                  fontSize: "1.3rem", 
                  fontWeight: "400", 
                  marginBottom: "16px" 
                }}>
                  🏡 Espaços Pequenos
                </h5>
                <p style={{ 
                  color: "#6c757d", 
                  fontSize: "0.95rem", 
                  lineHeight: "1.5", 
                  marginBottom: "24px" 
                }}>
                  Soluções para apartamentos e varandas
                </p>
                <a 
                  href="https://www.youtube.com/results?search_query=horta+apartamento" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    backgroundColor: "#4a90e2", 
                    border: "none", 
                    borderRadius: "6px", 
                    padding: "10px 20px", 
                    color: "white", 
                    textDecoration: "none", 
                    fontSize: "0.9rem", 
                    fontWeight: "400",
                    display: "inline-block"
                  }}
                >
                  Ver Dicas
                </a>
              </div>
            </div>
          </div>

          <h3 style={{ 
            color: "#2c3e50", 
            fontSize: "1.8rem", 
            fontWeight: "400", 
            marginBottom: "30px" 
          }}>
            Plantas Recomendadas
          </h3>
          <div className="row">
            <div className="col-md-6" style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {plantas.map(planta => (
                  <button 
                    key={planta.id}
                    onClick={() => setPlantaSelecionada(planta)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e9ecef", 
                      borderRadius: "8px", 
                      padding: "16px 20px", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}
                  >
                    <span style={{ 
                      color: "#2c3e50", 
                      fontSize: "1rem", 
                      fontWeight: "400" 
                    }}>
                      {planta.nome}
                    </span>
                    <span style={{ 
                      backgroundColor: "#4a90e2", 
                      color: "white", 
                      padding: "4px 12px", 
                      borderRadius: "12px", 
                      fontSize: "0.8rem", 
                      fontWeight: "400" 
                    }}>
                      {planta.dificuldade}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="col-md-6">
              {plantaSelecionada && (
                <div style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px", 
                  padding: "30px", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
                  border: "1px solid #f1f3f4" 
                }}>
                  <h5 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.4rem", 
                    fontWeight: "400", 
                    marginBottom: "20px" 
                  }}>
                    {plantaSelecionada.nome}
                  </h5>
                  <div style={{ marginBottom: "16px" }}>
                    <strong style={{ color: "#2c3e50" }}>Dificuldade:</strong>
                    <span style={{ color: "#6c757d", marginLeft: "8px" }}>{plantaSelecionada.dificuldade}</span>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong style={{ color: "#2c3e50" }}>Tempo para colheita:</strong>
                    <span style={{ color: "#6c757d", marginLeft: "8px" }}>{plantaSelecionada.tempo}</span>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ color: "#2c3e50" }}>Cuidados:</strong>
                    <span style={{ color: "#6c757d", marginLeft: "8px" }}>{plantaSelecionada.cuidados}</span>
                  </div>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    border: "1px solid #e9ecef", 
                    borderRadius: "8px", 
                    padding: "16px" 
                  }}>
                    <strong style={{ color: "#2c3e50" }}>💡 Dica:</strong>
                    <span style={{ color: "#6c757d", marginLeft: "8px" }}>{plantaSelecionada.dicas}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  