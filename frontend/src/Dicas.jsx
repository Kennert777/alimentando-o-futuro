import { useState, useEffect } from 'react';

export default function Dicas() {
    const [dicas, setDicas] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('todas');
    const [dicaSelecionada, setDicaSelecionada] = useState(null);

    const categorias = ['todas', 'cultivo', 'nutricao', 'receita', 'sustentabilidade', 'pragas', 'colheita'];

    const dicasIniciais = [
        {
            id: 1,
            titulo: "Como plantar alface em casa",
            conteudo: "A alface é uma das plantas mais fáceis de cultivar. Plante em solo rico em matéria orgânica, regue diariamente e mantenha em local com sol parcial. Colheita em 45 dias.",
            categoria: "cultivo",
            tipo_planta: "Alface",
            dificuldade: "facil",
            visualizacoes: 150,
            curtidas: 23
        },
        {
            id: 2,
            titulo: "Benefícios nutricionais do espinafre",
            conteudo: "O espinafre é rico em ferro, vitamina K e folato. Excelente para anemia, fortalece ossos e melhora a coagulação sanguínea. Consuma preferencialmente cru em saladas.",
            categoria: "nutricao",
            tipo_planta: "Espinafre",
            dificuldade: "facil",
            visualizacoes: 89,
            curtidas: 15
        },
        {
            id: 3,
            titulo: "Receita: Chips de casca de batata",
            conteudo: "Lave bem as cascas, tempere com sal e azeite, leve ao forno a 200°C por 15-20 minutos. Uma forma deliciosa de aproveitar integralmente o alimento.",
            categoria: "receita",
            tipo_planta: "Batata",
            dificuldade: "facil",
            visualizacoes: 234,
            curtidas: 45
        },
        {
            id: 4,
            titulo: "Controle natural de pulgões",
            conteudo: "Misture água com sabão neutro (1:10) e borrife nas plantas afetadas. Também funciona plantar manjericão próximo às hortaliças como repelente natural.",
            categoria: "pragas",
            dificuldade: "medio",
            visualizacoes: 67,
            curtidas: 12
        },
        {
            id: 5,
            titulo: "Compostagem caseira simples",
            conteudo: "Misture restos orgânicos (cascas, folhas) com material seco (folhas secas, papel). Vire a cada 15 dias. Em 3 meses terá adubo natural para sua horta.",
            categoria: "sustentabilidade",
            dificuldade: "medio",
            visualizacoes: 178,
            curtidas: 31
        }
    ];

    useEffect(() => {
        try {
            const dicasSalvas = JSON.parse(localStorage.getItem('dicas') || '[]');
            if (dicasSalvas.length === 0) {
                localStorage.setItem('dicas', JSON.stringify(dicasIniciais));
                setDicas(dicasIniciais);
            } else {
                setDicas(dicasSalvas);
            }
        } catch (error) {
            console.error('Erro ao carregar dicas do localStorage:', error);
            localStorage.setItem('dicas', JSON.stringify(dicasIniciais));
            setDicas(dicasIniciais);
        }
    }, []);

    const dicasFiltradas = filtroCategoria === 'todas' 
        ? dicas 
        : dicas.filter(dica => dica.categoria === filtroCategoria);

    const curtirDica = (id) => {
        const dicasAtualizadas = dicas.map(dica => 
            dica.id === id ? { ...dica, curtidas: dica.curtidas + 1 } : dica
        );
        setDicas(dicasAtualizadas);
        localStorage.setItem('dicas', JSON.stringify(dicasAtualizadas));
    };

    return (
        <div className="container mt-4">
            <h2 className="bubble-text" style={{ color: "#4F732C" }}>💡 Dicas e Conhecimento</h2>
            <p className="lead">Aprenda técnicas de cultivo, nutrição e sustentabilidade</p>

            {/* Filtros */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="btn-group flex-wrap" role="group">
                        {categorias.map(cat => (
                            <button
                                key={cat}
                                className={`btn ${filtroCategoria === cat ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => setFiltroCategoria(cat)}
                                style={{ margin: '2px' }}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lista de Dicas */}
            <div className="row">
                {dicasFiltradas.map(dica => (
                    <div key={dica.id} className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title">{dica.titulo}</h5>
                                    <span className={`badge ${
                                        dica.dificuldade === 'facil' ? 'bg-success' :
                                        dica.dificuldade === 'medio' ? 'bg-warning' : 'bg-danger'
                                    }`}>
                                        {dica.dificuldade}
                                    </span>
                                </div>
                                
                                <span className="badge bg-secondary mb-2">{dica.categoria}</span>
                                {dica.tipo_planta && (
                                    <span className="badge bg-info ms-1 mb-2">{dica.tipo_planta}</span>
                                )}
                                
                                <p className="card-text">
                                    {dica.conteudo.length > 150 
                                        ? dica.conteudo.substring(0, 150) + '...'
                                        : dica.conteudo
                                    }
                                </p>
                                
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <small className="text-muted">
                                            👁️ {dica.visualizacoes} visualizações
                                        </small>
                                    </div>
                                    <div>
                                        <button 
                                            className="btn btn-sm btn-outline-danger me-2"
                                            onClick={() => curtirDica(dica.id)}
                                        >
                                            ❤️ {dica.curtidas}
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-primary"
                                            onClick={() => setDicaSelecionada(dica)}
                                        >
                                            Ver Mais
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Dica Completa */}
            {dicaSelecionada && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{dicaSelecionada.titulo}</h5>
                                <button 
                                    className="btn-close"
                                    onClick={() => setDicaSelecionada(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <span className="badge bg-secondary me-2">{dicaSelecionada.categoria}</span>
                                    {dicaSelecionada.tipo_planta && (
                                        <span className="badge bg-info me-2">{dicaSelecionada.tipo_planta}</span>
                                    )}
                                    <span className={`badge ${
                                        dicaSelecionada.dificuldade === 'facil' ? 'bg-success' :
                                        dicaSelecionada.dificuldade === 'medio' ? 'bg-warning' : 'bg-danger'
                                    }`}>
                                        {dicaSelecionada.dificuldade}
                                    </span>
                                </div>
                                <p style={{ whiteSpace: 'pre-line' }}>{dicaSelecionada.conteudo}</p>
                                <div className="text-muted">
                                    <small>👁️ {dicaSelecionada.visualizacoes} visualizações • ❤️ {dicaSelecionada.curtidas} curtidas</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}