export default function Sobre() {
    return (
      <div className="container mt-5">
        <h2 style={{ color: "#4F732C" }}>Sobre o Projeto</h2>
        
        <div className="row mt-4">
          <div className="col-md-8">
            <p className="lead">
              O projeto "Alimentando o Futuro" nasceu da visão dos alunos da INF2CM do ITB de criar uma solução tecnológica que promova sustentabilidade, saúde e bem-estar através da educação nutricional e agricultura urbana.
            </p>
            
            <h4 style={{ color: "#558C03" }}>Nossa Missão</h4>
            <p>
              Democratizar o acesso à alimentação saudável e sustentável, capacitando pessoas a cultivarem seus próprios alimentos e aproveitarem integralmente os recursos disponíveis, contribuindo para um futuro mais verde e consciente.
            </p>
            
            <h4 style={{ color: "#558C03" }}>Objetivos do Projeto</h4>
            <ul>
              <li><strong>Educação Nutricional:</strong> Promover conhecimento sobre alimentação saudável e sustentável</li>
              <li><strong>Agricultura Urbana:</strong> Ensinar técnicas de cultivo doméstico e comunitário</li>
              <li><strong>Aproveitamento Integral:</strong> Reduzir desperdício com receitas que usam cascas e talos</li>
              <li><strong>Gamificação:</strong> Motivar práticas sustentáveis através de pontos e emblemas</li>
              <li><strong>Comunidade:</strong> Conectar pessoas interessadas em sustentabilidade</li>
              <li><strong>Impacto Social:</strong> Contribuir para segurança alimentar e saúde pública</li>
            </ul>
            
            <h4 style={{ color: "#558C03" }}>Funcionalidades da Plataforma</h4>
            <div className="row">
              <div className="col-md-6">
                <h6>🌱 Horta Digital</h6>
                <ul className="small">
                  <li>Catálogo com 12 plantas</li>
                  <li>Guias de cultivo detalhados</li>
                  <li>Dicas de cuidados específicos</li>
                  <li>Links para tutoriais em vídeo</li>
                </ul>
                
                <h6>🍽️ Receitas Sustentáveis</h6>
                <ul className="small">
                  <li>12 receitas de aproveitamento</li>
                  <li>Sistema de busca e favoritos</li>
                  <li>Categorias organizadas</li>
                  <li>Tutoriais passo a passo</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>👤 Sistema de Usuários</h6>
                <ul className="small">
                  <li>Cadastro e autenticação</li>
                  <li>Dashboard personalizado</li>
                  <li>Gerenciamento de hortas</li>
                  <li>Histórico de atividades</li>
                </ul>
                
                <h6>🏆 Gamificação</h6>
                <ul className="small">
                  <li>Sistema de pontos</li>
                  <li>Emblemas de conquistas</li>
                  <li>Níveis de sustentabilidade</li>
                  <li>Ranking de usuários</li>
                </ul>
              </div>
            </div>
            
            <h4 style={{ color: "#558C03" }}>Tecnologias Utilizadas</h4>
            <div className="row">
              <div className="col-md-6">
                <h6>Frontend</h6>
                <ul className="small">
                  <li><strong>React:</strong> Interface dinâmica</li>
                  <li><strong>Bootstrap:</strong> Design responsivo</li>
                  <li><strong>Google Fonts:</strong> Tipografia DynaPuff</li>
                  <li><strong>CSS3:</strong> Modo escuro e animações</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>Funcionalidades</h6>
                <ul className="small">
                  <li><strong>LocalStorage:</strong> Persistência de dados</li>
                  <li><strong>EmailJS:</strong> Sistema de contato</li>
                  <li><strong>React Router:</strong> Navegação SPA</li>
                  <li><strong>Chatbot:</strong> Suporte inteligente</li>
                </ul>
              </div>
            </div>
            
            <h4 style={{ color: "#558C03" }}>Impacto Esperado</h4>
            <p>
              Esperamos que a plataforma contribua para:
            </p>
            <ul>
              <li><strong>Redução do desperdício alimentar</strong> através do aproveitamento integral</li>
              <li><strong>Melhoria da segurança alimentar</strong> com o cultivo doméstico</li>
              <li><strong>Educação ambiental</strong> e consciência sustentável</li>
              <li><strong>Fortalecimento de comunidades</strong> interessadas em sustentabilidade</li>
              <li><strong>Promoção da saúde</strong> através de alimentação natural</li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <div className="card mb-3" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5 className="card-title">🏫 Informações Acadêmicas</h5>
                <p className="card-text">
                  <strong>Instituição:</strong> Instituto Técnico de Barueri (ITB)<br/>
                  <strong>Curso:</strong> Técnico em Informática<br/>
                  <strong>Turma:</strong> INF2CM<br/>
                  <strong>Ano:</strong> 2025<br/>
                  <strong>Semestre:</strong> 2º
                </p>
              </div>
            </div>
            
            <div className="card mb-3" style={{ backgroundColor: "#D9AE89" }}>
              <div className="card-body">
                <h5 className="card-title">📊 Estatísticas</h5>
                <p className="card-text small">
                  <strong>Plantas Catalogadas:</strong> 12<br/>
                  <strong>Receitas Disponíveis:</strong> 12<br/>
                  <strong>Categorias de Suporte:</strong> 5<br/>
                  <strong>Tópicos de Ajuda:</strong> 15<br/>
                  <strong>Funcionalidades:</strong> 8+
                </p>
              </div>
            </div>
            
            <div className="card" style={{ backgroundColor: "#AEBF2C" }}>
              <div className="card-body">
                <h5 className="card-title">📧 Contato</h5>
                <p className="card-text small">
                  <strong>Email:</strong> rm94720@estudante.fieb.edu.br<br/>
                  <strong>Suporte:</strong> Chat integrado<br/>
                  <strong>Formulário:</strong> Página Apoio<br/>
                  <strong>Resposta:</strong> Até 24h
                </p>
                <a href="/apoio" className="btn btn-sm" style={{ backgroundColor: "#4F732C", color: "white" }}>
                  Solicitar Apoio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }