export default function Sobre() {
    return (
      <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ 
            color: "#2c3e50", 
            fontSize: "2.4rem", 
            fontWeight: "300", 
            marginBottom: "40px" 
          }}>
            Sobre o Projeto
          </h2>
          
          <div className="row">
            <div className="col-md-8" style={{ marginBottom: "40px" }}>
              <p style={{ 
                fontSize: "1.1rem", 
                color: "#6c757d", 
                fontWeight: "300", 
                lineHeight: "1.7", 
                marginBottom: "40px" 
              }}>
                O projeto "Alimentando o Futuro" foi criado pelos alunos da INF2CM do ITB com o objetivo de promover saúde e bem-estar por meio da educação nutricional e práticas sustentáveis.
              </p>
              
              <h4 style={{ 
                color: "#2c3e50", 
                fontSize: "1.5rem", 
                fontWeight: "400", 
                marginBottom: "20px" 
              }}>
                Nossos Objetivos
              </h4>
              <ul style={{ 
                color: "#6c757d", 
                fontSize: "1rem", 
                lineHeight: "1.6", 
                marginBottom: "40px",
                paddingLeft: "20px" 
              }}>
                <li style={{ marginBottom: "8px" }}>Promover alimentação saudável e sustentável</li>
                <li style={{ marginBottom: "8px" }}>Ensinar técnicas de cultivo doméstico</li>
                <li style={{ marginBottom: "8px" }}>Reduzir o desperdício de alimentos</li>
                <li style={{ marginBottom: "8px" }}>Conscientizar sobre sustentabilidade</li>
              </ul>
              
              <h4 style={{ 
                color: "#2c3e50", 
                fontSize: "1.5rem", 
                fontWeight: "400", 
                marginBottom: "20px" 
              }}>
                Como Funciona
              </h4>
              <p style={{ 
                color: "#6c757d", 
                fontSize: "1rem", 
                lineHeight: "1.6" 
              }}>
                Através de nossa plataforma, você pode aprender a cultivar seus próprios alimentos, 
                descobrir receitas sustentáveis que aproveitam cascas e talos, e solicitar apoio 
                para iniciar sua própria horta.
              </p>
            </div>
            
            <div className="col-md-4">
              <div style={{ 
                backgroundColor: "white", 
                borderRadius: "12px", 
                padding: "30px", 
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
                border: "1px solid #f1f3f4" 
              }}>
                <h5 style={{ 
                  color: "#2c3e50", 
                  fontSize: "1.3rem", 
                  fontWeight: "400", 
                  marginBottom: "20px" 
                }}>
                  Informações
                </h5>
                <div style={{ 
                  color: "#6c757d", 
                  fontSize: "0.95rem", 
                  lineHeight: "1.6" 
                }}>
                  <p style={{ marginBottom: "12px" }}>
                    <strong style={{ color: "#2c3e50" }}>Escola:</strong> ITB
                  </p>
                  <p style={{ marginBottom: "12px" }}>
                    <strong style={{ color: "#2c3e50" }}>Turma:</strong> INF2CM
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    <strong style={{ color: "#2c3e50" }}>Ano:</strong> 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }