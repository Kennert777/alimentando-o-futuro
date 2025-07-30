// useState: Hook para gerenciar estados locais
// useEffect: Hook para executar código quando componente monta/atualiza
import { useState, useEffect } from 'react';

// Componente da página de apoio - formulário de contato
export default function Apoio() {
    // Estado para armazenar dados do formulário (nome, email, mensagem)
    const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
    // Estado para mostrar mensagem de sucesso após envio
    const [enviado, setEnviado] = useState(false);
    // Estado para mostrar loading durante envio
    const [loading, setLoading] = useState(false);
    // Estado para armazenar histórico de mensagens enviadas
    const [historico, setHistorico] = useState([]);

    // useEffect: Executa quando componente monta (carrega histórico do localStorage)
    useEffect(() => {
        // Recupera histórico salvo no navegador
        const saved = localStorage.getItem('apoio-historico');
        if (saved) setHistorico(JSON.parse(saved));
    }, []); // Array vazio = executa apenas uma vez

    // Função para processar envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede reload da página
        
        // Valida se todos os campos estão preenchidos
        if (formData.nome && formData.email && formData.mensagem) {
            setLoading(true); // Ativa estado de carregamento
            
            // Simula envio para servidor (1.5 segundos de delay)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Cria novo item para o histórico com data atual
            const novoItem = { ...formData, data: new Date().toLocaleString() };
            // Mantém apenas os últimos 5 itens no histórico
            const novoHistorico = [novoItem, ...historico.slice(0, 4)];
            
            // Atualiza estado e salva no localStorage
            setHistorico(novoHistorico);
            localStorage.setItem('apoio-historico', JSON.stringify(novoHistorico));
            
            // Mostra mensagem de sucesso
            setEnviado(true);
            setLoading(false);
            // Remove mensagem de sucesso após 3 segundos
            setTimeout(() => setEnviado(false), 3000);
            // Limpa o formulário
            setFormData({ nome: '', email: '', mensagem: '' });
        }
    };

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2 style={{ color: "#558C03" }}>Solicite Apoio</h2>
            {enviado && (
              <div className="alert alert-success">
                ✓ Mensagem enviada com sucesso! Responderemos em breve.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  disabled={loading}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={loading}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mensagem *</label>
                <textarea 
                  className="form-control" 
                  rows="4"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
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
                ) : 'Enviar'}
              </button>
            </form>
          </div>
          
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5>Outras formas de contato</h5>
                <p><strong>Email:</strong> contato@feedingthefuture.com</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>WhatsApp:</strong> (11) 9999-9999</p>
              </div>
            </div>
            
            {historico.length > 0 && (
              <div className="card mt-3">
                <div className="card-body">
                  <h6>Suas mensagens recentes</h6>
                  {historico.map((item, index) => (
                    <div key={index} className="border-bottom pb-2 mb-2">
                      <small className="text-muted">{item.data}</small>
                      <p className="mb-0 small">{item.mensagem.substring(0, 50)}...</p>
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
  