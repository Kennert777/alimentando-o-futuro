import { useState, useMemo } from 'react';

export default function Receitas() {
    const [receitaSelecionada, setReceitaSelecionada] = useState(null);
    const [busca, setBusca] = useState('');
    const [favoritas, setFavoritas] = useState([]);
    
    const receitas = [
        {
            id: 1,
            nome: "Bolo de casca de banana",
            categoria: "Doce",
            ingredientes: ["3 cascas de banana", "2 xícaras de farinha", "1 xícara de açúcar", "3 ovos", "1/2 xícara de óleo"],
            preparo: "Bata as cascas no liquidificador com os ovos e óleo. Misture com os ingredientes secos e asse por 40min."
        },
        {
            id: 2,
            nome: "Farofa de talos",
            categoria: "Acompanhamento",
            ingredientes: ["Talos de couve", "Talos de brócolis", "Farinha de mandioca", "Cebola", "Alho"],
            preparo: "Refogue os talos picados com cebola e alho. Adicione a farinha e misture bem."
        },
        {
            id: 3,
            nome: "Chips de casca de batata",
            categoria: "Petisco",
            ingredientes: ["Cascas de batata", "Sal", "Azeite", "Temperos a gosto"],
            preparo: "Tempere as cascas, leve ao forno a 200°C por 15-20 minutos até ficarem crocantes."
        },
        {
            id: 4,
            nome: "Suco de cascas de frutas",
            categoria: "Bebida",
            ingredientes: ["Cascas de maçã", "Cascas de pêra", "Água", "Açúcar ou mel"],
            preparo: "Ferva as cascas em água por 10min. Coe, adoce e sirva gelado."
        }
    ];
    
    const receitasFiltradas = useMemo(() => {
        return receitas.filter(receita => 
            receita.nome.toLowerCase().includes(busca.toLowerCase()) ||
            receita.categoria.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca]);
    
    const toggleFavorita = (id) => {
        setFavoritas(prev => 
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    return (
      <div className="container mt-5">
        <h2 style={{ color: "#4F732C" }}>Receitas Sustentáveis</h2>
        <p>Descubra como reaproveitar alimentos com criatividade e sabor.</p>
        
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar receitas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group">
              {receitasFiltradas.map(receita => (
                <li 
                  key={receita.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
                  style={{ backgroundColor: "#D9AE89", cursor: "pointer" }}
                  onClick={() => setReceitaSelecionada(receita)}
                >
                  <div>
                    <strong>{receita.nome}</strong>
                    <br/>
                    <small className="text-muted">{receita.categoria}</small>
                  </div>
                  <button 
                    className="btn btn-sm"
                    onClick={(e) => { e.stopPropagation(); toggleFavorita(receita.id); }}
                    style={{ color: favoritas.includes(receita.id) ? "red" : "gray" }}
                  >
                    ♥
                  </button>
                </li>
              ))}
            </ul>
            {receitasFiltradas.length === 0 && (
              <div className="alert alert-info">Nenhuma receita encontrada.</div>
            )}
          </div>
          
          <div className="col-md-6">
            {receitaSelecionada && (
              <div className="card" style={{ backgroundColor: "#F9F9F9" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title" style={{ color: "#4F732C" }}>{receitaSelecionada.nome}</h5>
                    <span className="badge bg-secondary">{receitaSelecionada.categoria}</span>
                  </div>
                  <h6>Ingredientes:</h6>
                  <ul>
                    {receitaSelecionada.ingredientes.map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))}
                  </ul>
                  <h6>Modo de preparo:</h6>
                  <p>{receitaSelecionada.preparo}</p>
                  <button 
                    className="btn btn-outline-success btn-sm"
                    onClick={() => toggleFavorita(receitaSelecionada.id)}
                  >
                    {favoritas.includes(receitaSelecionada.id) ? '💚 Favoritada' : '🤍 Favoritar'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {favoritas.length > 0 && (
          <div className="mt-4">
            <h4 style={{ color: "#558C03" }}>Suas Favoritas ({favoritas.length})</h4>
            <div className="d-flex flex-wrap gap-2">
              {favoritas.map(id => {
                const receita = receitas.find(r => r.id === id);
                return (
                  <span key={id} className="badge bg-success p-2">
                    {receita?.nome}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
  