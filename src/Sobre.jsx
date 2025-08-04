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
                  <li>50 receitas de aproveitamento</li>
                  <li>Sistema de busca e favoritos</li>
                  <li>Categorias organizadas</li>
                  <li>Tutoriais passo a passo</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>👤 Sistema de Usuários</h6>
                <ul className="small">
                  <li>Cadastro e autenticação completos</li>
                  <li>Dashboard personalizado</li>
                  <li>Gerenciamento de hortas</li>
                  <li>Registro de colheitas</li>
                </ul>
                
                <h6>🔐 Painel Administrativo</h6>
                <ul className="small">
                  <li>Gerenciamento de usuários</li>
                  <li>Controle de solicitações</li>
                  <li>Relatórios detalhados</li>
                  <li>Sistema de gamificação</li>
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
          
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="icon me-2">🏫</span>
                  <h5 className="mb-0">Informações Acadêmicas</h5>
                </div>
                <div className="mb-2">
                  <span className="icon me-2" style={{ fontSize: '0.8rem' }}>🏢</span>
                  <strong>Instituição:</strong> Instituto Técnico de Barueri (ITB)
                </div>
                <div className="mb-2">
                  <span className="icon me-2" style={{ fontSize: '0.8rem' }}>📚</span>
                  <strong>Curso:</strong> Técnico em Informática
                </div>
                <div className="mb-2">
                  <span className="icon me-2" style={{ fontSize: '0.8rem' }}>👥</span>
                  <strong>Turma:</strong> INF2CM
                </div>
                <div className="mb-2">
                  <span className="icon me-2" style={{ fontSize: '0.8rem' }}>📅</span>
                  <strong>Ano:</strong> 2025 - 2º Semestre
                </div>
              </div>
            </div>
            
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">📊 Estatísticas</h5>
                <p className="card-text small">
                  <strong>Plantas Catalogadas:</strong> 12<br/>
                  <strong>Receitas Disponíveis:</strong> 50<br/>
                  <strong>Sistema de Usuários:</strong> Completo<br/>
                  <strong>Painel Admin:</strong> Funcional<br/>
                  <strong>Banco de Dados:</strong> Integrado
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="icon me-2">📧</span>
                  <h5 className="mb-0">Contato</h5>
                </div>
                <p className="small mb-3">
                  <span className="icon me-2" style={{ fontSize: '0.8rem' }}>✉</span>
                  rm94720@estudante.fieb.edu.br<br/>
                  <span className="icon me-2" style={{ fontSize: '0.8rem' }}>💬</span>
                  Chat integrado - Resposta em até 24h
                </p>
                <a href="/apoio" className="btn btn-success w-100">
                  <span className="icon me-2">🤝</span>
                  Solicitar Apoio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }