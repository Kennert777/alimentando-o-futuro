import { useState, useMemo } from 'react';

export default function Receitas() {
    const [receitaSelecionada, setReceitaSelecionada] = useState(null);
    const [busca, setBusca] = useState('');
    const [favoritas, setFavoritas] = useState([]);
    
    const receitas = [
        {
            id: 1,
            nome: "Bolo de casca de banana",
            categoria: "Doce",
            ingredientes: ["3 cascas de banana", "2 xícaras de farinha", "1 xícara de açúcar", "3 ovos", "1/2 xícara de óleo"],
            preparo: "Bata as cascas no liquidificador com os ovos e óleo. Misture com os ingredientes secos e asse por 40min."
        },
        {
            id: 2,
            nome: "Farofa de talos",
            categoria: "Acompanhamento",
            ingredientes: ["Talos de couve", "Talos de brócolis", "Farinha de mandioca", "Cebola", "Alho"],
            preparo: "Refogue os talos picados com cebola e alho. Adicione a farinha e misture bem."
        },
        {
            id: 3,
            nome: "Chips de casca de batata",
            categoria: "Petisco",
            ingredientes: ["Cascas de batata", "Sal", "Azeite", "Temperos a gosto"],
            preparo: "Tempere as cascas, leve ao forno a 200°C por 15-20 minutos até ficarem crocantes."
        },
        {
            id: 4,
            nome: "Suco de cascas de frutas",
            categoria: "Bebida",
            ingredientes: ["Cascas de maçã", "Cascas de pêra", "Água", "Açúcar ou mel"],
            preparo: "Ferva as cascas em água por 10min. Coe, adoce e sirva gelado."
        }
    ];
    
    const receitasFiltradas = useMemo(() => {
        return receitas.filter(receita => 
            receita.nome.toLowerCase().includes(busca.toLowerCase()) ||
            receita.categoria.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca]);
    
    const toggleFavorita = (id) => {
        setFavoritas(prev => 
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    return (
      <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ 
            color: "#2c3e50", 
            fontSize: "2.4rem", 
            fontWeight: "300", 
            marginBottom: "20px" 
          }}>
            Receitas Sustentáveis
          </h2>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "#6c757d", 
            fontWeight: "300", 
            lineHeight: "1.6", 
            marginBottom: "40px" 
          }}>
            Descubra como reaproveitar alimentos com criatividade e sabor.
          </p>
          
          <div style={{ marginBottom: "40px" }}>
            <input 
              type="text" 
              placeholder="Buscar receitas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                border: "1px solid #e9ecef", 
                borderRadius: "8px", 
                fontSize: "1rem", 
                outline: "none",
                transition: "border-color 0.3s ease"
              }}
            />
          </div>
          
          <div className="row">
            <div className="col-md-6" style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {receitasFiltradas.map(receita => (
                  <div 
                    key={receita.id}
                    onClick={() => setReceitaSelecionada(receita)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e9ecef", 
                      borderRadius: "8px", 
                      padding: "20px", 
                      cursor: "pointer", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}
                  >
                    <div>
                      <div style={{ 
                        color: "#2c3e50", 
                        fontSize: "1.1rem", 
                        fontWeight: "400", 
                        marginBottom: "4px" 
                      }}>
                        {receita.nome}
                      </div>
                      <div style={{ 
                        color: "#6c757d", 
                        fontSize: "0.9rem" 
                      }}>
                        {receita.categoria}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorita(receita.id); }}
                      style={{ 
                        backgroundColor: "transparent", 
                        border: "none", 
                        fontSize: "1.2rem", 
                        color: favoritas.includes(receita.id) ? "#e74c3c" : "#bdc3c7",
                        cursor: "pointer",
                        padding: "4px"
                      }}
                    >
                      ♥
                    </button>
                  </div>
                ))}
              </div>
              {receitasFiltradas.length === 0 && (
                <div style={{ 
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #e9ecef", 
                  borderRadius: "8px", 
                  padding: "20px", 
                  textAlign: "center", 
                  color: "#6c757d" 
                }}>
                  Nenhuma receita encontrada.
                </div>
              )}
            </div>
            
            <div className="col-md-6">
              {receitaSelecionada && (
                <div style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px", 
                  padding: "30px", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
                  border: "1px solid #f1f3f4" 
                }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginBottom: "20px" 
                  }}>
                    <h5 style={{ 
                      color: "#2c3e50", 
                      fontSize: "1.4rem", 
                      fontWeight: "400", 
                      margin: "0" 
                    }}>
                      {receitaSelecionada.nome}
                    </h5>
                    <span style={{ 
                      backgroundColor: "#4a90e2", 
                      color: "white", 
                      padding: "4px 12px", 
                      borderRadius: "12px", 
                      fontSize: "0.8rem", 
                      fontWeight: "400" 
                    }}>
                      {receitaSelecionada.categoria}
                    </span>
                  </div>
                  <h6 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.1rem", 
                    fontWeight: "400", 
                    marginBottom: "12px" 
                  }}>
                    Ingredientes:
                  </h6>
                  <ul style={{ 
                    color: "#6c757d", 
                    fontSize: "0.95rem", 
                    lineHeight: "1.5", 
                    marginBottom: "24px",
                    paddingLeft: "20px" 
                  }}>
                    {receitaSelecionada.ingredientes.map((ing, index) => (
                      <li key={index} style={{ marginBottom: "4px" }}>{ing}</li>
                    ))}
                  </ul>
                  <h6 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.1rem", 
                    fontWeight: "400", 
                    marginBottom: "12px" 
                  }}>
                    Modo de preparo:
                  </h6>
                  <p style={{ 
                    color: "#6c757d", 
                    fontSize: "0.95rem", 
                    lineHeight: "1.6", 
                    marginBottom: "24px" 
                  }}>
                    {receitaSelecionada.preparo}
                  </p>
                  <button 
                    onClick={() => toggleFavorita(receitaSelecionada.id)}
                    style={{ 
                      backgroundColor: favoritas.includes(receitaSelecionada.id) ? "#4a90e2" : "transparent", 
                      border: favoritas.includes(receitaSelecionada.id) ? "none" : "2px solid #4a90e2", 
                      borderRadius: "6px", 
                      padding: "8px 16px", 
                      color: favoritas.includes(receitaSelecionada.id) ? "white" : "#4a90e2", 
                      fontSize: "0.9rem", 
                      fontWeight: "400",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {favoritas.includes(receitaSelecionada.id) ? '💚 Favoritada' : '🤍 Favoritar'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {favoritas.length > 0 && (
            <div style={{ marginTop: "50px" }}>
              <h4 style={{ 
                color: "#2c3e50", 
                fontSize: "1.6rem", 
                fontWeight: "400", 
                marginBottom: "20px" 
              }}>
                Suas Favoritas ({favoritas.length})
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {favoritas.map(id => {
                  const receita = receitas.find(r => r.id === id);
                  return (
                    <span 
                      key={id} 
                      style={{ 
                        backgroundColor: "#4a90e2", 
                        color: "white", 
                        padding: "8px 16px", 
                        borderRadius: "16px", 
                        fontSize: "0.9rem", 
                        fontWeight: "400" 
                      }}
                    >
                      {receita?.nome}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  