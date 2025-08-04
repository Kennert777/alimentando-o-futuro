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
    // Estado para filtro por categoria
    const [filtroCategoria, setFiltroCategoria] = useState('');
    // Estado para filtro por ingrediente aproveitado
    const [filtroIngrediente, setFiltroIngrediente] = useState('');
    // Estado para paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const receitasPorPagina = 6;
    
    // Array com 50 receitas sustentáveis organizadas por ingredientes aproveitados
    const receitas = [
        // Receitas com cascas
        { id: 1, nome: "Bolo de casca de banana", categoria: "Doce", ingredienteAproveitado: "casca de banana", temVideo: true },
        { id: 2, nome: "Doce de casca de melancia", categoria: "Doce", ingredienteAproveitado: "casca de melancia", temVideo: false },
        { id: 3, nome: "Refogado de casca de abóbora", categoria: "Acompanhamento", ingredienteAproveitado: "casca de abóbora", temVideo: true },
        { id: 4, nome: "Chips de casca de batata-doce", categoria: "Petisco", ingredienteAproveitado: "casca de batata-doce", temVideo: true },
        { id: 5, nome: "Suco verde com casca de abacaxi", categoria: "Bebida", ingredienteAproveitado: "casca de abacaxi", temVideo: false },
        { id: 6, nome: "Doce de casca de laranja cristalizada", categoria: "Doce", ingredienteAproveitado: "casca de laranja", temVideo: true },
        { id: 7, nome: "Torta de casca de maracujá", categoria: "Salgado", ingredienteAproveitado: "casca de maracujá", temVideo: false },
        { id: 8, nome: "Gelatina com casca de manga", categoria: "Doce", ingredienteAproveitado: "casca de manga", temVideo: false },
        { id: 9, nome: "Sopa de casca de inhame", categoria: "Prato principal", ingredienteAproveitado: "casca de inhame", temVideo: true },
        { id: 10, nome: "Farofa com casca de mandioca", categoria: "Acompanhamento", ingredienteAproveitado: "casca de mandioca", temVideo: false },
        
        // Receitas com talos
        { id: 11, nome: "Farofa de talos", categoria: "Acompanhamento", ingredienteAproveitado: "talos variados", temVideo: true },
        { id: 12, nome: "Suflê de talo de couve-flor", categoria: "Prato principal", ingredienteAproveitado: "talo de couve-flor", temVideo: false },
        { id: 13, nome: "Bolinho de talo de brócolis", categoria: "Salgado", ingredienteAproveitado: "talo de brócolis", temVideo: true },
        { id: 14, nome: "Arroz com talos de espinafre", categoria: "Prato principal", ingredienteAproveitado: "talo de espinafre", temVideo: false },
        { id: 15, nome: "Torta salgada de talos variados", categoria: "Salgado", ingredienteAproveitado: "talos variados", temVideo: true },
        { id: 16, nome: "Patê de talo de beterraba com alho", categoria: "Petisco", ingredienteAproveitado: "talo de beterraba", temVideo: false },
        { id: 17, nome: "Omelete de talo de agrião", categoria: "Café da manhã", ingredienteAproveitado: "talo de agrião", temVideo: true },
        { id: 18, nome: "Macarrão ao molho de talo de rúcula", categoria: "Prato principal", ingredienteAproveitado: "talo de rúcula", temVideo: false },
        { id: 19, nome: "Panqueca com recheio de talos", categoria: "Salgado", ingredienteAproveitado: "talos variados", temVideo: true },
        { id: 20, nome: "Pizza vegetariana com talos refogados", categoria: "Prato principal", ingredienteAproveitado: "talos variados", temVideo: false },
        
        // Receitas com folhas e sobras verdes
        { id: 21, nome: "Sopa de folhas de cenoura", categoria: "Prato principal", ingredienteAproveitado: "folhas de cenoura", temVideo: true },
        { id: 22, nome: "Refogado de folhas de beterraba", categoria: "Acompanhamento", ingredienteAproveitado: "folhas de beterraba", temVideo: false },
        { id: 23, nome: "Quiche de folhas de nabo", categoria: "Salgado", ingredienteAproveitado: "folhas de nabo", temVideo: true },
        { id: 24, nome: "Arroz com folhas e ervas", categoria: "Prato principal", ingredienteAproveitado: "folhas variadas", temVideo: false },
        { id: 25, nome: "Tortinha assada de folhas variadas", categoria: "Petisco", ingredienteAproveitado: "folhas variadas", temVideo: true },
        { id: 26, nome: "Chá digestivo com folhas de goiabeira", categoria: "Bebida", ingredienteAproveitado: "folhas de goiabeira", temVideo: false },
        { id: 27, nome: "Caldinho detox com folhas verdes", categoria: "Bebida quente", ingredienteAproveitado: "folhas verdes", temVideo: true },
        { id: 28, nome: "Salada morna com talos e folhas", categoria: "Acompanhamento", ingredienteAproveitado: "talos e folhas", temVideo: false },
        { id: 29, nome: "Mix refogado de sobras da horta", categoria: "Acompanhamento", ingredienteAproveitado: "sobras da horta", temVideo: true },
        { id: 30, nome: "Bolinho assado de folhas e cascas", categoria: "Petisco", ingredienteAproveitado: "folhas e cascas", temVideo: false },
        
        // Receitas com sementes e caroços
        { id: 31, nome: "Biscoito de semente de abóbora", categoria: "Petisco", ingredienteAproveitado: "semente de abóbora", temVideo: true },
        { id: 32, nome: "Chá de caroço de abacate ralado", categoria: "Bebida", ingredienteAproveitado: "caroço de abacate", temVideo: false },
        { id: 33, nome: "Arroz com semente de jaca tostada", categoria: "Prato principal", ingredienteAproveitado: "semente de jaca", temVideo: true },
        { id: 34, nome: "Bolo de caroço de tamarindo moído", categoria: "Doce", ingredienteAproveitado: "caroço de tamarindo", temVideo: false },
        { id: 35, nome: "Pesto de sementes de melancia", categoria: "Acompanhamento", ingredienteAproveitado: "sementes de melancia", temVideo: true },
        { id: 36, nome: "Granola com semente de manga", categoria: "Café da manhã", ingredienteAproveitado: "semente de manga", temVideo: false },
        { id: 37, nome: "Bolinho com semente de girassol", categoria: "Petisco", ingredienteAproveitado: "semente de girassol", temVideo: true },
        { id: 38, nome: "Farofa de semente de mamão", categoria: "Acompanhamento", ingredienteAproveitado: "semente de mamão", temVideo: false },
        { id: 39, nome: "Patê de sementes tostadas", categoria: "Petisco", ingredienteAproveitado: "sementes variadas", temVideo: true },
        { id: 40, nome: "Torradas crocantes com sementes reaproveitadas", categoria: "Lanche", ingredienteAproveitado: "sementes variadas", temVideo: false },
        
        // Receitas variadas de reaproveitamento
        { id: 41, nome: "Sopa completa com sobras da geladeira", categoria: "Prato principal", ingredienteAproveitado: "sobras variadas", temVideo: true },
        { id: 42, nome: "Massa de panqueca com casca de mandioca", categoria: "Salgado", ingredienteAproveitado: "casca de mandioca", temVideo: false },
        { id: 43, nome: "Doce de talo com banana madura", categoria: "Doce", ingredienteAproveitado: "talos e banana madura", temVideo: true },
        { id: 44, nome: "Recheio de pastel com folhas e sobras", categoria: "Petisco", ingredienteAproveitado: "folhas e sobras", temVideo: false },
        { id: 45, nome: "Chá energizante com folhas e cascas cítricas", categoria: "Bebida", ingredienteAproveitado: "folhas e cascas cítricas", temVideo: true },
        { id: 46, nome: "Escondidinho de raízes e folhas", categoria: "Prato principal", ingredienteAproveitado: "raízes e folhas", temVideo: false },
        { id: 47, nome: "Muffin com polpa de frutas maduras", categoria: "Doce", ingredienteAproveitado: "polpa de frutas maduras", temVideo: true },
        { id: 48, nome: "Caldo nutritivo de legumes reaproveitados", categoria: "Bebida quente", ingredienteAproveitado: "legumes reaproveitados", temVideo: false },
        { id: 49, nome: "Lasanha vegetariana com folhas de beterraba", categoria: "Prato principal", ingredienteAproveitado: "folhas de beterraba", temVideo: true },
        { id: 50, nome: "Hambúrguer vegetal com sobras da horta", categoria: "Prato principal", ingredienteAproveitado: "sobras da horta", temVideo: false }
    ];
    
    // Categorias únicas para filtro
    const categorias = [...new Set(receitas.map(r => r.categoria))];
    // Ingredientes únicos para filtro
    const ingredientes = [...new Set(receitas.map(r => r.ingredienteAproveitado))];
    
    // useMemo: Otimiza a filtragem - só recalcula quando filtros mudam
    const receitasFiltradas = useMemo(() => {
        return receitas.filter(receita => {
            const matchBusca = receita.nome.toLowerCase().includes(busca.toLowerCase()) ||
                              receita.categoria.toLowerCase().includes(busca.toLowerCase()) ||
                              receita.ingredienteAproveitado.toLowerCase().includes(busca.toLowerCase());
            const matchCategoria = !filtroCategoria || receita.categoria === filtroCategoria;
            const matchIngrediente = !filtroIngrediente || receita.ingredienteAproveitado === filtroIngrediente;
            return matchBusca && matchCategoria && matchIngrediente;
        });
    }, [busca, filtroCategoria, filtroIngrediente]);
    
    // Paginação
    const totalPaginas = Math.ceil(receitasFiltradas.length / receitasPorPagina);
    const receitasPaginadas = receitasFiltradas.slice(
        (paginaAtual - 1) * receitasPorPagina,
        paginaAtual * receitasPorPagina
    );
    
    // Função para adicionar/remover receita dos favoritos
    const toggleFavorita = (id) => {
        setFavoritas(prev => 
            // Se já está nos favoritos, remove; senão, adiciona
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    return (
      <div className="container mt-5">
        <h2 className="bubble-text" style={{ color: "#4F732C" }}>Receitas Sustentáveis</h2>
        <p>Descubra como reaproveitar alimentos com criatividade e sabor.</p>
        
        <div className="mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar receitas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={filtroIngrediente}
                onChange={(e) => setFiltroIngrediente(e.target.value)}
              >
                <option value="">Todos os ingredientes</option>
                {ingredientes.map(ing => (
                  <option key={ing} value={ing}>{ing}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setBusca('');
                  setFiltroCategoria('');
                  setFiltroIngrediente('');
                  setPaginaAtual(1);
                }}
              >
                Limpar
              </button>
            </div>
          </div>
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
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Receitas ({receitasFiltradas.length})</h5>
              <small className="text-muted">Página {paginaAtual} de {totalPaginas}</small>
            </div>
            
            <div className="row g-3">
              {receitasPaginadas.map(receita => (
                <div key={receita.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm" style={{ backgroundColor: "#F8F9FA" }}>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title text-success fw-bold mb-0">{receita.nome}</h6>
                        {receita.temVideo && (
                          <span className="badge bg-danger">📺</span>
                        )}
                      </div>
                      
                      <div className="mb-2">
                        <span className="badge bg-secondary">{receita.categoria}</span>
                      </div>
                      
                      <p className="text-muted small mb-3 flex-grow-1">
                        <strong>Aproveita:</strong> {receita.ingredienteAproveitado}
                      </p>
                      
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-success btn-sm flex-grow-1"
                          onClick={() => setReceitaSelecionada(receita)}
                        >
                          Ver Receita
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => toggleFavorita(receita.id)}
                          style={{ minWidth: "40px" }}
                        >
                          {favoritas.includes(receita.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {receitasFiltradas.length === 0 && (
              <div className="alert alert-info">Nenhuma receita encontrada.</div>
            )}
            
            {totalPaginas > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPaginaAtual(paginaAtual - 1)}>Anterior</button>
                  </li>
                  {[...Array(totalPaginas)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${paginaAtual === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setPaginaAtual(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPaginaAtual(paginaAtual + 1)}>Próxima</button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          
          <div className="col-md-6">
            {receitaSelecionada ? (
              <div className="card" style={{ backgroundColor: "#F9F9F9" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title" style={{ color: "#4F732C" }}>{receitaSelecionada.nome}</h5>
                    <div className="d-flex gap-2">
                      {receitaSelecionada.temVideo && <span className="badge bg-danger">📺 Vídeo</span>}
                      <span className="badge bg-secondary">{receitaSelecionada.categoria}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-success">Ingrediente Aproveitado:</h6>
                    <p className="text-muted">{receitaSelecionada.ingredienteAproveitado}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h6>Descrição:</h6>
                    <p>Receita sustentável que aproveita {receitaSelecionada.ingredienteAproveitado} para criar um delicioso {receitaSelecionada.categoria.toLowerCase()}.</p>
                  </div>
                  
                  <div className="d-flex gap-2 mb-3">
                    <button 
                      className="btn btn-outline-success btn-sm"
                      onClick={() => toggleFavorita(receitaSelecionada.id)}
                    >
                      {favoritas.includes(receitaSelecionada.id) ? '💚 Favoritada' : '🤍 Favoritar'}
                    </button>
                    
                    {receitaSelecionada.temVideo && (
                      <a 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(receitaSelecionada.nome + ' receita sustentável')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-danger btn-sm"
                      >
                        📺 Ver Vídeo
                      </a>
                    )}
                    
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(receitaSelecionada.nome + ' receita PDF')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      📄 Guia PDF
                    </a>
                  </div>
                  
                  <div className="alert alert-success" role="alert">
                    <strong>💡 Dica Sustentável:</strong> Esta receita ajuda a reduzir o desperdício alimentar e aproveita nutrientes que normalmente seriam descartados!
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ backgroundColor: "#F9F9F9" }}>
                <div className="card-body text-center">
                  <h5 className="text-muted">Selecione uma receita</h5>
                  <p>Clique em uma receita ao lado para ver os detalhes</p>
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
  