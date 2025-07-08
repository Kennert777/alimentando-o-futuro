import { useState } from 'react';

export default function HortaDigital() {
    const [plantaSelecionada, setPlantaSelecionada] = useState(null);
    
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
        }
    ];

    return (
      <div className="container mt-5">
        <h2 style={{ color: "#4F732C" }}>Horta Digital</h2>
        <p className="lead">
          Aprenda a cultivar seus próprios alimentos em casa com nossas dicas práticas.
        </p>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5>🌱 Iniciantes</h5>
                <p>Comece com plantas fáceis de cultivar</p>
                <a href="https://www.youtube.com/results?search_query=horta+caseira+iniciantes" 
                   className="btn btn-success" target="_blank" rel="noopener noreferrer">
                  Ver Tutoriais
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#D9AE89" }}>
              <div className="card-body">
                <h5>🏡 Espaços Pequenos</h5>
                <p>Soluções para apartamentos e varandas</p>
                <a href="https://www.youtube.com/results?search_query=horta+apartamento" 
                   className="btn btn-success" target="_blank" rel="noopener noreferrer">
                  Ver Dicas
                </a>
              </div>
            </div>
          </div>
        </div>

        <h3 style={{ color: "#558C03" }}>Plantas Recomendadas</h3>
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
  