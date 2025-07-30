import { useState, useEffect } from 'react';

export default function Apoio() {
    const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('apoio-historico');
        if (saved) setHistorico(JSON.parse(saved));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.nome && formData.email && formData.mensagem) {
            setLoading(true);
            
            // Simula envio
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const novoItem = { ...formData, data: new Date().toLocaleString() };
            const novoHistorico = [novoItem, ...historico.slice(0, 4)];
            
            setHistorico(novoHistorico);
            localStorage.setItem('apoio-historico', JSON.stringify(novoHistorico));
            
            setEnviado(true);
            setLoading(false);
            setTimeout(() => setEnviado(false), 3000);
            setFormData({ nome: '', email: '', mensagem: '' });
        }
    };

    return (
      <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="row">
            <div className="col-md-8" style={{ marginBottom: "40px" }}>
              <h2 style={{ 
                color: "#2c3e50", 
                fontSize: "2.4rem", 
                fontWeight: "300", 
                marginBottom: "40px" 
              }}>
                Solicite Apoio
              </h2>
              {enviado && (
                <div style={{ 
                  backgroundColor: "#d4edda", 
                  border: "1px solid #c3e6cb", 
                  borderRadius: "8px", 
                  padding: "16px", 
                  marginBottom: "30px", 
                  color: "#155724" 
                }}>
                  ✓ Mensagem enviada com sucesso! Responderemos em breve.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ 
                    display: "block", 
                    color: "#2c3e50", 
                    fontSize: "0.95rem", 
                    fontWeight: "400", 
                    marginBottom: "8px" 
                  }}>
                    Nome *
                  </label>
                  <input 
                    type="text" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    disabled={loading}
                    required
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
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ 
                    display: "block", 
                    color: "#2c3e50", 
                    fontSize: "0.95rem", 
                    fontWeight: "400", 
                    marginBottom: "8px" 
                  }}>
                    Email *
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={loading}
                    required
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
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ 
                    display: "block", 
                    color: "#2c3e50", 
                    fontSize: "0.95rem", 
                    fontWeight: "400", 
                    marginBottom: "8px" 
                  }}>
                    Mensagem *
                  </label>
                  <textarea 
                    rows="4"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                    disabled={loading}
                    required
                    style={{ 
                      width: "100%", 
                      padding: "12px 16px", 
                      border: "1px solid #e9ecef", 
                      borderRadius: "8px", 
                      fontSize: "1rem", 
                      outline: "none",
                      resize: "vertical",
                      minHeight: "100px",
                      transition: "border-color 0.3s ease"
                    }}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    backgroundColor: "#4a90e2", 
                    border: "none", 
                    borderRadius: "8px", 
                    padding: "12px 24px", 
                    color: "white", 
                    fontSize: "1rem", 
                    fontWeight: "400",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    transition: "all 0.3s ease"
                  }}
                >
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
            
            <div className="col-md-4">
              <div style={{ 
                backgroundColor: "white", 
                borderRadius: "12px", 
                padding: "30px", 
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
                border: "1px solid #f1f3f4",
                marginBottom: "30px"
              }}>
                <h5 style={{ 
                  color: "#2c3e50", 
                  fontSize: "1.3rem", 
                  fontWeight: "400", 
                  marginBottom: "20px" 
                }}>
                  Outras formas de contato
                </h5>
                <div style={{ 
                  color: "#6c757d", 
                  fontSize: "0.95rem", 
                  lineHeight: "1.6" 
                }}>
                  <p style={{ marginBottom: "12px" }}>
                    <strong style={{ color: "#2c3e50" }}>Email:</strong> contato@alimentandoofuturo.com
                  </p>
                  <p style={{ marginBottom: "12px" }}>
                    <strong style={{ color: "#2c3e50" }}>Telefone:</strong> (11) 9999-9999
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    <strong style={{ color: "#2c3e50" }}>WhatsApp:</strong> (11) 9999-9999
                  </p>
                </div>
              </div>
              
              {historico.length > 0 && (
                <div style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px", 
                  padding: "30px", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
                  border: "1px solid #f1f3f4" 
                }}>
                  <h6 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.1rem", 
                    fontWeight: "400", 
                    marginBottom: "20px" 
                  }}>
                    Suas mensagens recentes
                  </h6>
                  {historico.map((item, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        borderBottom: index < historico.length - 1 ? "1px solid #e9ecef" : "none", 
                        paddingBottom: "12px", 
                        marginBottom: index < historico.length - 1 ? "12px" : "0" 
                      }}
                    >
                      <div style={{ 
                        color: "#6c757d", 
                        fontSize: "0.8rem", 
                        marginBottom: "4px" 
                      }}>
                        {item.data}
                      </div>
                      <p style={{ 
                        color: "#2c3e50", 
                        fontSize: "0.9rem", 
                        margin: "0", 
                        lineHeight: "1.4" 
                      }}>
                        {item.mensagem.substring(0, 50)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  