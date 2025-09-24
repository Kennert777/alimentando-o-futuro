import { useState, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import axios from 'axios';
import { api } from './config/api';

const MapComponent = ({ localizacoes, onMarkerClick }) => {
  const mapRef = useState(null);

  useEffect(() => {
    if (mapRef.current && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -14.2350, lng: -51.9253 }, // Centro do Brasil
        zoom: 5,
      });

      localizacoes.forEach(loc => {
        const marker = new window.google.maps.Marker({
          position: { lat: loc.latitude, lng: loc.longitude },
          map: map,
          title: loc.nome,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div>
              <h6>${loc.nome}</h6>
              <p><strong>Tipo:</strong> ${loc.tipo}</p>
              <p><strong>Endereço:</strong> ${loc.endereco}</p>
              <p><strong>Cidade:</strong> ${loc.cidade} - ${loc.estado}</p>
              ${loc.telefone ? `<p><strong>Telefone:</strong> ${loc.telefone}</p>` : ''}
              ${loc.descricao ? `<p>${loc.descricao}</p>` : ''}
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          if (onMarkerClick) onMarkerClick(loc);
        });
      });
    }
  }, [localizacoes, onMarkerClick]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="text-center p-4">Carregando mapa...</div>;
    case Status.FAILURE:
      return <div className="alert alert-danger">Erro ao carregar o mapa</div>;
    case Status.SUCCESS:
      return MapComponent;
  }
};

export default function MapaHortas() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [filtros, setFiltros] = useState({ estado: '', cidade: '', tipo: '' });
  const [novaLocalizacao, setNovaLocalizacao] = useState({
    nome: '', tipo: 'horta', endereco: '', cidade: '', estado: '',
    latitude: '', longitude: '', telefone: '', email: '', descricao: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    carregarLocalizacoes();
  }, []);

  const carregarLocalizacoes = async () => {
    try {
      const response = await axios.get(api.localizacoes.listar);
      setLocalizacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar localizações:', error);
    }
  };

  const filtrarLocalizacoes = async () => {
    try {
      const params = new URLSearchParams();
      if (filtros.estado) params.append('estado', filtros.estado);
      if (filtros.cidade) params.append('cidade', filtros.cidade);
      if (filtros.tipo) params.append('tipo', filtros.tipo);

      const response = await axios.get(`${api.localizacoes.listar}/regiao?${params}`);
      setLocalizacoes(response.data);
    } catch (error) {
      console.error('Erro ao filtrar localizações:', error);
    }
  };

  const adicionarLocalizacao = async (e) => {
    e.preventDefault();
    try {
      await axios.post(api.localizacoes.criar, {
        ...novaLocalizacao,
        latitude: parseFloat(novaLocalizacao.latitude),
        longitude: parseFloat(novaLocalizacao.longitude)
      });
      
      setNovaLocalizacao({
        nome: '', tipo: 'horta', endereco: '', cidade: '', estado: '',
        latitude: '', longitude: '', telefone: '', email: '', descricao: ''
      });
      setMostrarFormulario(false);
      carregarLocalizacoes();
      alert('Localização adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar localização:', error);
      alert('Erro ao adicionar localização');
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">🗺️ Mapa de Hortas e Pontos de Venda</h2>
          
          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
              <h5>Filtrar Localizações</h5>
              <div className="row g-3">
                <div className="col-md-3">
                  <select 
                    className="form-select"
                    value={filtros.estado}
                    onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                  >
                    <option value="">Todos os Estados</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cidade"
                    value={filtros.cidade}
                    onChange={(e) => setFiltros({...filtros, cidade: e.target.value})}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filtros.tipo}
                    onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                  >
                    <option value="">Todos os Tipos</option>
                    <option value="horta">Horta</option>
                    <option value="loja">Loja</option>
                    <option value="ponto_venda">Ponto de Venda</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary me-2" onClick={filtrarLocalizacoes}>
                    Filtrar
                  </button>
                  <button className="btn btn-success" onClick={() => setMostrarFormulario(true)}>
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="card mb-4">
            <div className="card-body">
              <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} render={render}>
                <MapComponent localizacoes={localizacoes} />
              </Wrapper>
            </div>
          </div>

          {/* Formulário para adicionar localização */}
          {mostrarFormulario && (
            <div className="card">
              <div className="card-body">
                <h5>Adicionar Nova Localização</h5>
                <form onSubmit={adicionarLocalizacao}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        value={novaLocalizacao.nome}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, nome: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <select
                        className="form-select"
                        value={novaLocalizacao.tipo}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, tipo: e.target.value})}
                      >
                        <option value="horta">Horta</option>
                        <option value="loja">Loja</option>
                        <option value="ponto_venda">Ponto de Venda</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Endereço completo"
                        value={novaLocalizacao.endereco}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, endereco: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Cidade"
                        value={novaLocalizacao.cidade}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, cidade: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Estado (ex: SP)"
                        value={novaLocalizacao.estado}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, estado: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefone"
                        value={novaLocalizacao.telefone}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, telefone: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        placeholder="Latitude"
                        value={novaLocalizacao.latitude}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, latitude: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        placeholder="Longitude"
                        value={novaLocalizacao.longitude}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, longitude: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        placeholder="Descrição"
                        value={novaLocalizacao.descricao}
                        onChange={(e) => setNovaLocalizacao({...novaLocalizacao, descricao: e.target.value})}
                        rows="3"
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-success me-2">Salvar</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}