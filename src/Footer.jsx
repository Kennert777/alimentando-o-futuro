export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "#f8f9fa", 
      borderTop: "1px solid #e9ecef", 
      padding: "60px 0 40px 0", 
      marginTop: "80px" 
    }}>
      <div className="container">
        <div className="row" style={{ marginBottom: "40px" }}>
          <div className="col-md-4" style={{ marginBottom: "30px" }}>
            <h5 style={{ 
              color: "#2c3e50", 
              fontSize: "1.2rem", 
              fontWeight: "400", 
              marginBottom: "16px" 
            }}>
              Alimentando o Futuro
            </h5>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "0.9rem", 
              lineHeight: "1.5" 
            }}>
              Promovendo sustentabilidade através da educação nutricional.
            </p>
          </div>
          <div className="col-md-4" style={{ marginBottom: "30px" }}>
            <h5 style={{ 
              color: "#2c3e50", 
              fontSize: "1.2rem", 
              fontWeight: "400", 
              marginBottom: "16px" 
            }}>
              Contato
            </h5>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "0.9rem", 
              lineHeight: "1.6" 
            }}>
              Email: contato@alimentandoofuturo.com<br/>
              Telefone: (11) 9999-9999
            </p>
          </div>
          <div className="col-md-4" style={{ marginBottom: "30px" }}>
            <h5 style={{ 
              color: "#2c3e50", 
              fontSize: "1.2rem", 
              fontWeight: "400", 
              marginBottom: "16px" 
            }}>
              Redes Sociais
            </h5>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "0.9rem" 
            }}>
              @alimentandoofuturo
            </p>
          </div>
        </div>
        <div style={{ 
          borderTop: "1px solid #e9ecef", 
          paddingTop: "20px", 
          textAlign: "center" 
        }}>
          <small style={{ 
            color: "#6c757d", 
            fontSize: "0.85rem" 
          }}>
            &copy; 2025 ITB - INF2CM. Todos os direitos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}