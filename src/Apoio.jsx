// useState: Hook para gerenciar estados locais
// useEffect: Hook para executar código quando componente monta/atualiza
import { useState, useEffect } from 'react';
// EmailJS: Biblioteca para envio de emails direto do frontend
import emailjs from '@emailjs/browser';
import db from './database.js';

// Componente da página de apoio - formulário de contato
export default function Apoio() {
    // Estado para armazenar dados do formulário
    const [formData, setFormData] = useState({ 
        tipo_solicitacao: 'conhecimento', 
        titulo: '', 
        descricao: '', 
        urgencia: 'media' 
    });
    // Estado do usuário logado
    const [user, setUser] = useState(null);
    // Estado para mostrar mensagem de sucesso após envio
    const [enviado, setEnviado] = useState(false);
    // Estado para mostrar loading durante envio
    const [loading, setLoading] = useState(false);
    // Estado para armazenar histórico de mensagens enviadas
    const [historico, setHistorico] = useState([]);
    // Estado para mostrar erros de envio
    const [erro, setErro] = useState('');

    // useEffect: Executa quando componente monta
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        setUser(currentUser);
        
        if (currentUser) {
            loadSolicitacoes(currentUser.id);
        } else {
            // Recupera histórico salvo no navegador para usuários não logados
            const saved = localStorage.getItem('apoio-historico');
            if (saved) setHistorico(JSON.parse(saved));
        }
    }, []);
    
    const loadSolicitacoes = async (userId) => {
        try {
            const solicitacoes = await db.buscarSolicitacoesPorUsuario(userId);
            setHistorico(solicitacoes);
        } catch (error) {
            console.error('Erro ao carregar solicitações:', error);
        }
    };

    // Função para processar envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        
        if (!user) {
            setErro('Você precisa estar logado para solicitar apoio.');
            return;
        }
        
        if (formData.titulo && formData.descricao) {
            setLoading(true);
            
            try {
                // Salvar solicitação no banco de dados
                await db.criarSolicitacaoApoio({
                    tipo_solicitacao: formData.tipo_solicitacao,
                    titulo: formData.titulo,
                    descricao: formData.descricao,
                    urgencia: formData.urgencia
                }, user.id);
                
                // Enviar email via EmailJS
                try {
                    const templateParams = {
                        from_name: user.nome,
                        from_email: user.email,
                        to_email: 'rm94720@estudante.fieb.edu.br',
                        subject: `Solicitação de Apoio - ${formData.titulo}`,
                        message: `Tipo: ${formData.tipo_solicitacao}\nUrgência: ${formData.urgencia}\n\nTítulo: ${formData.titulo}\n\nDescrição:\n${formData.descricao}`,
                        tipo_solicitacao: formData.tipo_solicitacao,
                        urgencia: formData.urgencia,
                        titulo: formData.titulo,
                        descricao: formData.descricao
                    };
                    
                    // Configurar EmailJS via variáveis de ambiente
                    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_alimentando';
                    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_apoio';
                    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';
                    
                    // Tentar enviar via EmailJS
                    if (SERVICE_ID !== 'service_alimentando') {
                        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
                    } else {
                        // Fallback: mailto
                        const subject = encodeURIComponent(`Solicitação de Apoio - ${formData.titulo}`);
                        const body = encodeURIComponent(
                            `Usuário: ${user.nome} (${user.email})\n` +
                            `Tipo: ${formData.tipo_solicitacao}\n` +
                            `Urgência: ${formData.urgencia}\n\n` +
                            `Título: ${formData.titulo}\n\n` +
                            `Descrição:\n${formData.descricao}`
                        );
                        window.open(`mailto:rm94720@estudante.fieb.edu.br?subject=${subject}&body=${body}`);
                    }
                } catch (emailError) {
                    console.log('Erro no envio de email, usando fallback');
                    // Fallback em caso de erro
                    const subject = encodeURIComponent(`Solicitação de Apoio - ${formData.titulo}`);
                    const body = encodeURIComponent(
                        `Usuário: ${user.nome} (${user.email})\n` +
                        `Tipo: ${formData.tipo_solicitacao}\n` +
                        `Urgência: ${formData.urgencia}\n\n` +
                        `Título: ${formData.titulo}\n\n` +
                        `Descrição:\n${formData.descricao}`
                    );
                    window.open(`mailto:rm94720@estudante.fieb.edu.br?subject=${subject}&body=${body}`);
                }
                
                // Recarregar solicitações
                loadSolicitacoes(user.id);
                
                setEnviado(true);
                setTimeout(() => setEnviado(false), 3000);
                setFormData({ tipo_solicitacao: 'conhecimento', titulo: '', descricao: '', urgencia: 'media' });
                
            } catch (error) {
                console.error('Erro ao enviar solicitação:', error);
                setErro('Erro ao enviar solicitação: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2 style={{ color: "#558C03" }}>Solicite Apoio</h2>
            
            {!user && (
              <div className="alert alert-warning">
                Você precisa estar <a href="/login">logado</a> para solicitar apoio.
              </div>
            )}
            
            {enviado && (
              <div className="alert alert-success">
                ✓ Solicitação enviada com sucesso! Responderemos em breve.
              </div>
            )}
            {erro && (
              <div className="alert alert-danger">
                ✗ {erro}
              </div>
            )}
            
            {user && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tipo de Solicitação *</label>
                  <select 
                    className="form-control"
                    value={formData.tipo_solicitacao}
                    onChange={(e) => setFormData({...formData, tipo_solicitacao: e.target.value})}
                    disabled={loading}
                    required
                  >
                    <option value="sementes">Sementes</option>
                    <option value="ferramentas">Ferramentas</option>
                    <option value="conhecimento">Conhecimento</option>
                    <option value="voluntarios">Voluntários</option>
                    <option value="financeiro">Apoio Financeiro</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Título *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    disabled={loading}
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Urgência</label>
                  <select 
                    className="form-control"
                    value={formData.urgencia}
                    onChange={(e) => setFormData({...formData, urgencia: e.target.value})}
                    disabled={loading}
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                    <option value="critica">Crítica</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Descrição *</label>
                  <textarea 
                    className="form-control" 
                    rows="4"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    disabled={loading}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ backgroundColor: "#AEBF2C", border: "none" }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Enviando...
                    </>
                  ) : 'Enviar Solicitação'}
                </button>
              </form>
            )}
          </div>
          
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5>Outras formas de contato</h5>
                <p><strong>Email:</strong> rm94720@estudante.fieb.edu.br</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>WhatsApp:</strong> (11) 9999-9999</p>
              </div>
            </div>
            
            {user && historico.length > 0 && (
              <div className="card mt-3">
                <div className="card-body">
                  <h6>Suas solicitações recentes</h6>
                  {historico.slice(0, 5).map((item, index) => (
                    <div key={index} className="border-bottom pb-2 mb-2">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">{new Date(item.data_solicitacao).toLocaleDateString()}</small>
                        <span className={`badge ${
                          item.status === 'pendente' ? 'bg-warning' :
                          item.status === 'em_analise' ? 'bg-info' :
                          item.status === 'aprovada' ? 'bg-success' :
                          item.status === 'concluida' ? 'bg-success' : 'bg-danger'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <strong className="small">{item.titulo}</strong>
                      <p className="mb-0 small text-muted">{item.descricao.substring(0, 50)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  