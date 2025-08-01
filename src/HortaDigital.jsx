// useState: Hook para gerenciar estado local
import { useState } from 'react';

// Componente da página Horta Digital - ensina cultivo de plantas
export default function HortaDigital() {
    // Estado para controlar qual planta está selecionada para mostrar detalhes
    const [plantaSelecionada, setPlantaSelecionada] = useState(null);
    
    // Array com informações de plantas para cultivo doméstico
    // Cada planta tem: id, nome, dificuldade, tempo de colheita, cuidados e dicas
    const plantas = [
        {
            id: 1,
            nome: "Alface",
            dificuldade: "Fácil",
            tempo: "45-60 dias",
            cuidados: "Rega diária, sol parcial, solo úmido",
            dicas: "Plante em local com sombra parcial. Regue pela manhã."
        },
        {
            id: 2,
            nome: "Tomate Cereja",
            dificuldade: "Médio",
            tempo: "70-80 dias",
            cuidados: "Sol pleno, rega regular, suporte para crescimento",
            dicas: "Use estacas para apoiar o crescimento. Retire brotos laterais."
        },
        {
            id: 3,
            nome: "Manjericão",
            dificuldade: "Fácil",
            tempo: "30-40 dias",
            cuidados: "Sol pleno, rega moderada",
            dicas: "Corte as flores para manter as folhas saborosas."
        },
        {
            id: 4,
            nome: "Cebolinha",
            dificuldade: "Muito Fácil",
            tempo: "60-70 dias",
            cuidados: "Sol parcial, rega regular",
            dicas: "Corte apenas as pontas, deixando a base para rebrotar."
        },
        {
            id: 5,
            nome: "Rúcula",
            dificuldade: "Fácil",
            tempo: "30-40 dias",
            cuidados: "Sol parcial, rega regular, solo bem drenado",
            dicas: "Colha as folhas externas primeiro. Plante a cada 15 dias para colheita contínua."
        },
        {
            id: 6,
            nome: "Salsa",
            dificuldade: "Fácil",
            tempo: "60-80 dias",
            cuidados: "Sol parcial, rega moderada",
            dicas: "Corte sempre as folhas externas. Pode ser cultivada o ano todo."
        },
        {
            id: 7,
            nome: "Espinafre",
            dificuldade: "Fácil",
            tempo: "40-50 dias",
            cuidados: "Sol parcial, solo rico em nutrientes, rega regular",
            dicas: "Prefere clima mais fresco. Evite sol forte do meio-dia."
        },
        {
            id: 8,
            nome: "Rabanete",
            dificuldade: "Muito Fácil",
            tempo: "25-30 dias",
            cuidados: "Sol pleno, solo solto, rega diária",
            dicas: "Uma das plantas mais rápidas para colher. Ótima para iniciantes."
        },
        {
            id: 9,
            nome: "Coentro",
            dificuldade: "Fácil",
            tempo: "40-50 dias",
            cuidados: "Sol parcial, rega moderada",
            dicas: "Plante sementes direto no vaso. Não gosta de transplante."
        },
        {
            id: 10,
            nome: "Pimentão",
            dificuldade: "Médio",
            tempo: "90-120 dias",
            cuidados: "Sol pleno, rega regular, solo rico",
            dicas: "Precisa de vaso grande. Colha quando estiver bem colorido."
        },
        {
            id: 11,
            nome: "Alecrim",
            dificuldade: "Fácil",
            tempo: "60-90 dias",
            cuidados: "Sol pleno, pouca água, solo bem drenado",
            dicas: "Resistência à seca. Pode ser usado fresco ou seco."
        },
        {
            id: 12,
            nome: "Hortelã",
            dificuldade: "Muito Fácil",
            tempo: "30-45 dias",
            cuidados: "Sol parcial, rega frequente, solo úmido",
            dicas: "Cresce rapidamente. Plante em vaso separado pois se espalha muito."
        }
    ];

    return (
      <div className="container mt-5">
        <h2 className="bubble-text" style={{ color: "#4F732C" }}>Horta Digital</h2>
        <p className="lead">
          Aprenda a cultivar seus próprios alimentos em casa com nossas dicas práticas.
        </p>
        
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5>🌱 Iniciantes</h5>
                <p>Comece com plantas fáceis de cultivar</p>
                <a href="https://www.youtube.com/results?search_query=horta+caseira+iniciantes" 
                   className="btn btn-success btn-sm me-1" target="_blank" rel="noopener noreferrer">
                  Tutoriais
                </a>
                <a href="https://www.youtube.com/results?search_query=como+fazer+horta+casa" 
                   className="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer">
                  Passo a Passo
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card" style={{ backgroundColor: "#D9AE89" }}>
              <div className="card-body">
                <h5>🏡 Espaços Pequenos</h5>
                <p>Soluções para apartamentos e varandas</p>
                <a href="https://www.youtube.com/results?search_query=horta+apartamento" 
                   className="btn btn-success btn-sm me-1" target="_blank" rel="noopener noreferrer">
                  Apartamento
                </a>
                <a href="https://www.youtube.com/results?search_query=horta+vertical+varanda" 
                   className="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer">
                  Vertical
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card" style={{ backgroundColor: "#AEBF2C" }}>
              <div className="card-body">
                <h5>💧 Hidroponia</h5>
                <p>Cultivo sem solo, ideal para casa</p>
                <a href="https://www.youtube.com/results?search_query=hidroponia+caseira" 
                   className="btn btn-success btn-sm me-1" target="_blank" rel="noopener noreferrer">
                  Hidroponia
                </a>
                <a href="https://www.youtube.com/results?search_query=sistema+hidroponico+diy" 
                   className="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer">
                  DIY
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="card-body">
                <h5>📺 Canais Recomendados</h5>
                <ul className="list-unstyled mb-3">
                  <li>• <a href="https://www.youtube.com/@MinhaHortaUrbana" target="_blank" rel="noopener noreferrer">Minha Horta Urbana</a></li>
                  <li>• <a href="https://www.youtube.com/results?search_query=horta+em+casa+canal" target="_blank" rel="noopener noreferrer">Horta em Casa</a></li>
                  <li>• <a href="https://www.youtube.com/results?search_query=cultivo+organico" target="_blank" rel="noopener noreferrer">Cultivo Orgânico</a></li>
                </ul>
                <a href="https://www.youtube.com/results?search_query=horta+caseira+2024" 
                   className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                  Mais Canais
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="card-body">
                <h5>📚 Recursos Úteis</h5>
                <ul className="list-unstyled mb-3">
                  <li>• <a href="https://www.google.com/search?q=calendário+plantio+brasil" target="_blank" rel="noopener noreferrer">Calendário de Plantio</a></li>
                  <li>• <a href="https://www.google.com/search?q=pragas+horta+controle+natural" target="_blank" rel="noopener noreferrer">Controle de Pragas</a></li>
                  <li>• <a href="https://www.google.com/search?q=adubo+organico+caseiro" target="_blank" rel="noopener noreferrer">Adubos Caseiros</a></li>
                </ul>
                <a href="https://www.google.com/search?q=guia+horta+caseira+pdf" 
                   className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                  Baixar Guias
                </a>
              </div>
            </div>
          </div>
        </div>

        <h3 className="section-title" style={{ color: "#558C03" }}>Catálogo de Plantas ({plantas.length} espécies)</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="list-group">
              {plantas.map(planta => (
                <button 
                  key={planta.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "#AEBF2C" }}
                  onClick={() => setPlantaSelecionada(planta)}
                >
                  <span>{planta.nome}</span>
                  <span className="badge bg-success">{planta.dificuldade}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-md-6">
            {plantaSelecionada && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#4F732C" }}>{plantaSelecionada.nome}</h5>
                  <p><strong>Dificuldade:</strong> {plantaSelecionada.dificuldade}</p>
                  <p><strong>Tempo para colheita:</strong> {plantaSelecionada.tempo}</p>
                  <p><strong>Cuidados:</strong> {plantaSelecionada.cuidados}</p>
                  <div className="alert alert-info">
                    <strong>💡 Dica:</strong> {plantaSelecionada.dicas}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  