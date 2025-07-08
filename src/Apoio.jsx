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
  