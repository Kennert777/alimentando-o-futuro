import { useState, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import axios from 'axios';
import { api } from './config/api.js';

const MapComponent = ({ center, zoom, localizacoes, onMarkerClick }) => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (!map) return;

        // Limpar marcadores existentes
        markers.forEach(marker => marker.setMap(null));

        // Adicionar novos marcadores
        const newMarkers = localizacoes.map(localizacao => {
            const marker = new window.google.maps.Marker({
                position: { lat: localizacao.latitude, lng: localizacao.longitude },
                map: map,
                title: localizacao.nome,
                icon: getMarkerIcon(localizacao.tipo)
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: `
                    <div>
                        <h6>${localizacao.nome}</h6>
                        <p><strong>Tipo:</strong> ${getTipoLabel(localizacao.tipo)}</p>
                        <p><strong>Endereço:</strong> ${localizacao.endereco}</p>
                        <p><strong>Cidade:</strong> ${localizacao.cidade}, ${localizacao.estado}</p>
                        ${localizacao.telefone ? `<p><strong>Telefone:</strong> ${localizacao.telefone}</p>` : ''}
                        ${localizacao.descricao ? `<p>${localizacao.descricao}</p>` : ''}
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
                if (onMarkerClick) onMarkerClick(localizacao);
            });

            return marker;
        });

        setMarkers(newMarkers);
    }, [map, localizacoes]);

    const getMarkerIcon = (tipo) => {
        const icons = {
            'HORTA_COMUNITARIA': 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            'LOJA_SEMENTES': 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            'FEIRA_ORGANICA': 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            'PONTO_COLETA': 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        };
        return icons[tipo] || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
    };

    const getTipoLabel = (tipo) => {
        const labels = {
            'HORTA_COMUNITARIA': 'Horta Comunitária',
            'LOJA_SEMENTES': 'Loja de Sementes',
            'FEIRA_ORGANICA': 'Feira Orgânica',
            'PONTO_COLETA': 'Ponto de Coleta'
        };
        return labels[tipo] || tipo;
    };

    const initMap = (map) => {
        setMap(map);
    };

    return (
        <div
            style={{ height: '400px', width: '100%' }}
            ref={(node) => {
                if (node && !map) {
                    const newMap = new window.google.maps.Map(node, {
                        center,
                        zoom,
                        mapTypeId: 'roadmap'
                    });
                    initMap(newMap);
                }
            }}
        />
    );
};

const render = (status) => {
    switch (status) {
        case Status.LOADING:
            return <div>Carregando mapa...</div>;
        case Status.FAILURE:
            return <div>Erro ao carregar o mapa</div>;
        case Status.SUCCESS:
            return null;
    }
};

export default function MapaHortasNovo() {
    const [localizacoes, setLocalizacoes] = useState([]);
    const [filtros, setFiltros] = useState({
        estado: '',
        cidade: '',
        tipo: ''
    });
    const [novaLocalizacao, setNovaLocalizacao] = useState({
        nome: '',
        tipo: 'HORTA_COMUNITARIA',
        endereco: '',
        cidade: '',
        estado: '',
        latitude: '',
        longitude: '',
        telefone: '',
        email: '',
        descricao: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const center = { lat: -14.2350, lng: -51.9253 }; // Centro do Brasil
    const zoom = 4;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        carregarLocalizacoes();
    }, []);

    const carregarLocalizacoes = async () => {
        try {
            const response = await axios.get(api.localizacoes.listar);
            setLocalizacoes(response.data);
        } catch (error) {
            console.error('Erro ao carregar localizações:', error);
        } finally {
            setLoading(false);
        }
    };

    const filtrarLocalizacoes = async () => {
        try {
            setLoading(true);
            let url = api.localizacoes.listar;
            
            if (filtros.estado || filtros.cidade) {
                url = api.localizacoes.porRegiao(filtros.estado, filtros.cidade);
            }
            
            const response = await axios.get(url);
            let dados = response.data;
            
            if (filtros.tipo) {
                dados = dados.filter(loc => loc.tipo === filtros.tipo);
            }
            
            setLocalizacoes(dados);
        } catch (error) {
            console.error('Erro ao filtrar localizações:', error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarLocalizacao = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(api.localizacoes.criar, {
                ...novaLocalizacao,
                latitude: parseFloat(novaLocalizacao.latitude),
                longitude: parseFloat(novaLocalizacao.longitude)
            });
            
            setLocalizacoes([...localizacoes, response.data]);
            setNovaLocalizacao({
                nome: '',
                tipo: 'HORTA_COMUNITARIA',
                endereco: '',
                cidade: '',
                estado: '',
                latitude: '',
                longitude: '',
                telefone: '',
                email: '',
                descricao: ''
            });
            setShowForm(false);
            alert('Localização adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar localização:', error);
            alert('Erro ao adicionar localização. Tente novamente.');
        }
    };

    const obterCoordenadas = async () => {
        if (!novaLocalizacao.endereco || !novaLocalizacao.cidade || !novaLocalizacao.estado) {
            alert('Preencha o endereço, cidade e estado primeiro');
            return;
        }

        try {
            const endereco = `${novaLocalizacao.endereco}, ${novaLocalizacao.cidade}, ${novaLocalizacao.estado}, Brasil`;
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${apiKey}`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setNovaLocalizacao({
                    ...novaLocalizacao,
                    latitude: location.lat.toString(),
                    longitude: location.lng.toString()
                });
            } else {
                alert('Endereço não encontrado. Verifique os dados informados.');
            }
        } catch (error) {
            console.error('Erro ao obter coordenadas:', error);
            alert('Erro ao obter coordenadas. Tente novamente.');
        }
    };

    if (!apiKey) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    <h4>🗺️ Google Maps não configurado</h4>
                    <p>Para usar o mapa, configure a chave da API do Google Maps no arquivo .env:</p>
                    <code>VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui</code>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 style={{ color: "#4F732C" }}>🗺️ Mapa de Hortas e Pontos de Venda</h2>
                        <button 
                            className="btn btn-success"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Cancelar' : '+ Adicionar Local'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5>🔍 Filtros</h5>
                            <div className="row">
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
                                        <option value="PR">Paraná</option>
                                        <option value="SC">Santa Catarina</option>
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
                                        <option value="HORTA_COMUNITARIA">Horta Comunitária</option>
                                        <option value="LOJA_SEMENTES">Loja de Sementes</option>
                                        <option value="FEIRA_ORGANICA">Feira Orgânica</option>
                                        <option value="PONTO_COLETA">Ponto de Coleta</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-primary w-100" onClick={filtrarLocalizacoes}>
                                        Filtrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulário para adicionar localização */}
            {showForm && (
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5>📍 Adicionar Nova Localização</h5>
                                <form onSubmit={adicionarLocalizacao}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Nome *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={novaLocalizacao.nome}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, nome: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Tipo *</label>
                                            <select 
                                                className="form-select"
                                                value={novaLocalizacao.tipo}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, tipo: e.target.value})}
                                                required
                                            >
                                                <option value="HORTA_COMUNITARIA">Horta Comunitária</option>
                                                <option value="LOJA_SEMENTES">Loja de Sementes</option>
                                                <option value="FEIRA_ORGANICA">Feira Orgânica</option>
                                                <option value="PONTO_COLETA">Ponto de Coleta</option>
                                            </select>
                                        </div>
                                        <div className="col-md-8 mb-3">
                                            <label className="form-label">Endereço *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={novaLocalizacao.endereco}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, endereco: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label">Cidade *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={novaLocalizacao.cidade}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, cidade: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label">Estado *</label>
                                            <select 
                                                className="form-select"
                                                value={novaLocalizacao.estado}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, estado: e.target.value})}
                                                required
                                            >
                                                <option value="">Selecione</option>
                                                <option value="SP">São Paulo</option>
                                                <option value="RJ">Rio de Janeiro</option>
                                                <option value="MG">Minas Gerais</option>
                                                <option value="RS">Rio Grande do Sul</option>
                                                <option value="PR">Paraná</option>
                                                <option value="SC">Santa Catarina</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label">Latitude</label>
                                            <input
                                                type="number"
                                                step="any"
                                                className="form-control"
                                                value={novaLocalizacao.latitude}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, latitude: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label">Longitude</label>
                                            <input
                                                type="number"
                                                step="any"
                                                className="form-control"
                                                value={novaLocalizacao.longitude}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, longitude: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <button type="button" className="btn btn-info" onClick={obterCoordenadas}>
                                                📍 Obter Coordenadas do Endereço
                                            </button>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Telefone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={novaLocalizacao.telefone}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, telefone: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={novaLocalizacao.email}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">Descrição</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={novaLocalizacao.descricao}
                                                onChange={(e) => setNovaLocalizacao({...novaLocalizacao, descricao: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">Adicionar Localização</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mapa */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5>🗺️ Mapa Interativo</h5>
                            <Wrapper apiKey={apiKey} render={render}>
                                <MapComponent
                                    center={center}
                                    zoom={zoom}
                                    localizacoes={localizacoes}
                                />
                            </Wrapper>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de localizações */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5>📋 Localizações Cadastradas ({localizacoes.length})</h5>
                            {loading ? (
                                <div>Carregando...</div>
                            ) : localizacoes.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Tipo</th>
                                                <th>Cidade/Estado</th>
                                                <th>Telefone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {localizacoes.map((loc, index) => (
                                                <tr key={index}>
                                                    <td>{loc.nome}</td>
                                                    <td>
                                                        <span className={`badge ${
                                                            loc.tipo === 'HORTA_COMUNITARIA' ? 'bg-success' :
                                                            loc.tipo === 'LOJA_SEMENTES' ? 'bg-primary' :
                                                            loc.tipo === 'FEIRA_ORGANICA' ? 'bg-warning' : 'bg-danger'
                                                        }`}>
                                                            {loc.tipo === 'HORTA_COMUNITARIA' ? 'Horta' :
                                                             loc.tipo === 'LOJA_SEMENTES' ? 'Loja' :
                                                             loc.tipo === 'FEIRA_ORGANICA' ? 'Feira' : 'Coleta'}
                                                        </span>
                                                    </td>
                                                    <td>{loc.cidade}, {loc.estado}</td>
                                                    <td>{loc.telefone || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-muted">Nenhuma localização encontrada.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}