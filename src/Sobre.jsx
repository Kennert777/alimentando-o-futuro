export default function Sobre() {
    return (
      <div className="container mt-5">
        <h2 style={{ color: "#4F732C" }}>Sobre o Projeto</h2>
        
        <div className="row mt-4">
          <div className="col-md-8">
            <p className="lead">
              O projeto "Feeding the Future" foi criado pelos alunos da INF2CM do ITB com o objetivo de promover saúde e bem-estar por meio da educação nutricional e hortas comunitárias.
            </p>
            
            <h4 style={{ color: "#558C03" }}>Nossos Objetivos</h4>
            <ul>
              <li>Promover alimentação saudável e sustentável</li>
              <li>Ensinar técnicas de cultivo doméstico</li>
              <li>Reduzir o desperdício de alimentos</li>
              <li>Conscientizar sobre sustentabilidade</li>
            </ul>
            
            <h4 style={{ color: "#558C03" }}>Como Funciona</h4>
            <p>
              Através de nossa plataforma, você pode aprender a cultivar seus próprios alimentos, 
              descobrir receitas sustentáveis que aproveitam cascas e talos, e solicitar apoio 
              para iniciar sua própria horta.
            </p>
          </div>
          
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5 className="card-title">Contato</h5>
                <p className="card-text">
                  <strong>Escola:</strong> ITB<br/>
                  <strong>Turma:</strong> INF2CM<br/>
                  <strong>Ano:</strong> 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }