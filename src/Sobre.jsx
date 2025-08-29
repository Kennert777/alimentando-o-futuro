export default function Sobre() {
    return (
      <div className="container mt-4">
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3">Alimentando o Futuro</h1>
          <p className="lead text-muted">Sustentabilidade, saúde e bem-estar através da educação nutricional</p>
        </div>
        
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h3 className="mb-3">Nossa Missão</h3>
                <p>Democratizar o acesso à alimentação saudável e sustentável, capacitando pessoas a cultivarem seus próprios alimentos e aproveitarem integralmente os recursos disponíveis.</p>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h3 className="mb-4">Funcionalidades</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <span className="me-3 fs-4">🌱</span>
                      <div>
                        <h6 className="mb-1">Horta Digital</h6>
                        <small className="text-muted">12 plantas com guias completos</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <span className="me-3 fs-4">🍽️</span>
                      <div>
                        <h6 className="mb-1">Receitas Sustentáveis</h6>
                        <small className="text-muted">50 receitas de aproveitamento</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <span className="me-3 fs-4">👤</span>
                      <div>
                        <h6 className="mb-1">Sistema de Usuários</h6>
                        <small className="text-muted">Dashboard personalizado</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <span className="me-3 fs-4">🔐</span>
                      <div>
                        <h6 className="mb-1">Painel Admin</h6>
                        <small className="text-muted">Gerenciamento completo</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="mb-3">Impacto Esperado</h3>
                <div className="row g-2">
                  <div className="col-md-6">• Redução do desperdício alimentar</div>
                  <div className="col-md-6">• Melhoria da segurança alimentar</div>
                  <div className="col-md-6">• Educação ambiental</div>
                  <div className="col-md-6">• Fortalecimento de comunidades</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body p-4">
                <h5 className="mb-3">🏫 Informações Acadêmicas</h5>
                <div className="small">
                  <div className="mb-2"><strong>Instituição:</strong> ITB</div>
                  <div className="mb-2"><strong>Curso:</strong> Técnico em Informática</div>
                  <div className="mb-2"><strong>Turma:</strong> INF2CM</div>
                  <div><strong>Ano:</strong> 2025</div>
                </div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body p-4">
                <h5 className="mb-3">📊 Estatísticas</h5>
                <div className="small">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Plantas:</span><strong>100</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Receitas:</span><strong>50</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Status:</span><strong className="text-success">Funcional</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body p-4">
                <h5 className="mb-3">🎨 Design</h5>
                <p className="small mb-3">Interface baseada no UI Kit Gardenex</p>
                <a 
                  href="https://www.figma.com/design/qxgXb4YhvQNWYSMoMQUxl1/Gardenex-App-UI-kit--Community-?node-id=0-1&m=dev&t=EhT8dU7eaBtQypOp-1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-success btn-sm w-100"
                >
                  Ver no Figma
                </a>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="mb-3">📧 Contato</h5>
                <p className="small mb-3">rm94720@estudante.fieb.edu.br</p>
                <a href="/apoio" className="btn btn-success btn-sm w-100">
                  Solicitar Apoio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }