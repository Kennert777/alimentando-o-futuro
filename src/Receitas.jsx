// useState: Hook para gerenciar estados locais
// useMemo: Hook para otimizar cálculos pesados (evita recalcular a cada render)
import { useState, useMemo } from 'react';

// Componente da página de receitas sustentáveis
export default function Receitas() {
    // Estado para armazenar qual receita está selecionada para exibição
    const [receitaSelecionada, setReceitaSelecionada] = useState(null);
    // Estado para o texto de busca digitado pelo usuário
    const [busca, setBusca] = useState('');
    // Estado para armazenar IDs das receitas favoritadas
    const [favoritas, setFavoritas] = useState([]);
    
    // Array com todas as receitas disponíveis no sistema
    // Cada receita tem: id, nome, categoria, ingredientes e modo de preparo
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
        },
        {
            id: 5,
            nome: "Geleia de cascas de laranja",
            categoria: "Doce",
            ingredientes: ["Cascas de 6 laranjas", "2 xícaras de açúcar", "1 xícara de água", "Suco de 1 limão"],
            preparo: "Corte as cascas em tiras finas. Cozinhe com açúcar e água até engrossar. Adicione limão no final."
        },
        {
            id: 6,
            nome: "Refogado de folhas de beterraba",
            categoria: "Acompanhamento",
            ingredientes: ["Folhas de beterraba", "Alho", "Cebola", "Azeite", "Sal e pimenta"],
            preparo: "Refogue alho e cebola no azeite. Adicione as folhas picadas e tempere. Cozinhe por 5 minutos."
        },
        {
            id: 7,
            nome: "Pão de casca de abóbora",
            categoria: "Doce",
            ingredientes: ["2 xícaras de casca de abóbora cozida", "3 xícaras de farinha", "1 xícara de açúcar", "3 ovos", "1/2 xícara de óleo", "1 colher de fermento"],
            preparo: "Bata a abóbora com ovos e óleo. Misture farinha, açúcar e fermento. Una tudo e asse por 45min a 180°C."
        },
        {
            id: 8,
            nome: "Chá de cascas de abacaxi",
            categoria: "Bebida",
            ingredientes: ["Cascas de 1 abacaxi", "1 litro de água", "Canela em pau", "Cravo", "Mel a gosto"],
            preparo: "Ferva as cascas com água e especiarias por 15min. Coe, adoce com mel e sirva quente ou gelado."
        },
        {
            id: 9,
            nome: "Torta salgada de talos",
            categoria: "Prato Principal",
            ingredientes: ["Talos de acelga", "Talos de espinafre", "3 ovos", "1 xícara de leite", "Queijo ralado", "Massa de torta"],
            preparo: "Refogue os talos picados. Misture ovos, leite e queijo. Coloque na massa e asse por 30min a 180°C."
        },
        {
            id: 10,
            nome: "Vitamina de cascas verdes",
            categoria: "Bebida",
            ingredientes: ["Cascas de maçã verde", "Cascas de pepino", "1 banana", "Água de coco", "Hortelã"],
            preparo: "Bata todos os ingredientes no liquidificador. Coe se preferir e sirva gelado com gelo."
        },
        {
            id: 11,
            nome: "Doce de casca de melancia",
            categoria: "Doce",
            ingredientes: ["Cascas de melancia", "Açúcar", "Cravo", "Canela"],
            preparo: "Corte as cascas em cubos. Cozinhe com açúcar e especiarias até formar calda espessa."
        },
        {
            id: 12,
            nome: "Salada de talos e folhas",
            categoria: "Salada",
            ingredientes: ["Talos de couve-flor", "Folhas de cenoura", "Folhas de rabanete", "Azeite", "Limão", "Sal"],
            preparo: "Branqueie os talos por 2min. Misture com folhas cruas, tempere com azeite, limão e sal."
        }
    ];
    
    // useMemo: Otimiza a filtragem - só recalcula quando 'busca' muda
    // Filtra receitas por nome ou categoria baseado no texto de busca
    const receitasFiltradas = useMemo(() => {
        return receitas.filter(receita => 
            // Converte para minúsculo para busca case-insensitive
            receita.nome.toLowerCase().includes(busca.toLowerCase()) ||
            receita.categoria.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca]); // Dependência: só executa quando 'busca' muda
    
    // Função para adicionar/remover receita dos favoritos
    const toggleFavorita = (id) => {
        setFavoritas(prev => 
            // Se já está nos favoritos, remove; senão, adiciona
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    return (
      <div className="container mt-5">
        <h2 style={{ color: "#4F732C" }}>Receitas Sustentáveis</h2>
        <p>Descubra como reaproveitar alimentos com criatividade e sabor.</p>
        
        <div className="mb-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar receitas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5>📺 Tutoriais em Vídeo</h5>
                <p>Aprenda com vídeos práticos sobre reaproveitamento</p>
                <a href="https://www.youtube.com/results?search_query=receitas+sustentaveis+cascas" 
                   className="btn btn-success me-2" target="_blank" rel="noopener noreferrer">
                  Ver Tutoriais
                </a>
                <a href="https://www.youtube.com/results?search_query=aproveitamento+integral+alimentos" 
                   className="btn btn-outline-success" target="_blank" rel="noopener noreferrer">
                  Mais Dicas
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#D9AE89" }}>
              <div className="card-body">
                <h5>📚 Guias Completos</h5>
                <p>Documentos e artigos sobre alimentação sustentável</p>
                <a href="https://www.google.com/search?q=guia+aproveitamento+integral+alimentos+pdf" 
                   className="btn btn-success me-2" target="_blank" rel="noopener noreferrer">
                  Baixar Guias
                </a>
                <a href="https://www.google.com/search?q=receitas+cascas+talos+folhas" 
                   className="btn btn-outline-success" target="_blank" rel="noopener noreferrer">
                  Pesquisar
                </a>
              </div>
            </div>
          </div>
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
  