// Link: Para navegação entre páginas sem recarregar
import { Link } from 'react-router-dom';

// Componente da página inicial - primeira página que o usuário vê
export default function Home() {
    return (
      <>
        {/* Seção Hero - Apresentação principal do site */}
        <div className="container mt-5 text-center">
          {/* Título principal com emoji e cor personalizada */}
          <h1 className="bubble-text" style={{ color: "#4F732C", fontSize: "3rem" }}>🌱 Alimentando o Futuro</h1>
          
          {/* Subtítulo explicativo */}
          <p className="lead">
            Promovendo alimentação saudável e sustentável por meio da tecnologia e educação.
          </p>
          
          {/* Botão de call-to-action que leva para a página Sobre */}
          <Link to="/sobre" className="btn btn-success btn-lg mt-4" style={{ backgroundColor: "#558C03" }}>
            Saiba Mais →
          </Link>
        </div>
        
        {/* Seção de Funcionalidades - Cards apresentando as principais áreas do site */}
        <div className="container mt-5">
          {/* Título da seção */}
          <h2 className="text-center mb-5 section-title" style={{ color: "#4F732C" }}>Explore Nossas Funcionalidades</h2>
          
          {/* Grid responsivo com 3 colunas */}
          <div className="row">
            {/* Card 1: Horta Digital */}
            <div className="col-md-4 mb-4">
              {/* Card com altura igual (h-100) e cor de fundo personalizada */}
              <div className="card h-100" style={{ backgroundColor: "#D9C179" }}>
                <div className="card-body text-center">
                  {/* Ícone emoji grande */}
                  <div style={{ fontSize: "3rem" }}>🌿</div>
                  <h5 className="card-title">Horta Digital</h5>
                  <p className="card-text">Aprenda a cultivar seus próprios alimentos com guias práticos</p>
                  {/* Botão que navega para a página da horta */}
                  <Link to="/horta" className="btn btn-primary" style={{ backgroundColor: "#4F732C", border: "none" }}>Explorar</Link>
                </div>
              </div>
            </div>
            
            {/* Card 2: Receitas */}
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#D9AE89" }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: "3rem" }}>🍽️</div>
                  <h5 className="card-title">Receitas</h5>
                  <p className="card-text">Descubra receitas sustentáveis que aproveitam cascas e talos</p>
                  {/* Botão que navega para a página de receitas */}
                  <Link to="/receitas" className="btn btn-primary" style={{ backgroundColor: "#558C03", border: "none" }}>Ver Receitas</Link>
                </div>
              </div>
            </div>
            
            {/* Card 3: Apoio */}
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#AEBF2C" }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: "3rem" }}>💬</div>
                  <h5 className="card-title">Apoio</h5>
                  <p className="card-text">Precisa de ajuda? Nossa equipe está pronta para te apoiar</p>
                  {/* Botão que navega para a página de apoio */}
                  <Link to="/apoio" className="btn btn-primary" style={{ backgroundColor: "#4F732C", border: "none" }}>Solicitar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção Call to Action - Incentiva o usuário a começar */}
        <div className="container mt-5 mb-5">
          {/* Card com fundo verde escuro e texto branco */}
          <div className="card" style={{ backgroundColor: "#4F732C", color: "white" }}>
            <div className="card-body text-center py-5">
              {/* Título motivacional */}
              <h3 className="bubble-text">Comece Sua Jornada Sustentável!</h3>
              {/* Texto de apoio */}
              <p className="lead">Junte-se a milhares de pessoas que já transformaram sua alimentação</p>
              
              {/* Botões de ação principais */}
              {/* Botão primário - fundo branco */}
              <Link to="/horta" className="btn btn-light btn-lg me-3">Criar Horta</Link>
              {/* Botão secundário - apenas borda branca */}
              <Link to="/receitas" className="btn btn-outline-light btn-lg">Ver Receitas</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  