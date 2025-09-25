import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import axios from 'axios';
import { api } from './config/api';

const COLORS = ['#4F732C', '#558C03', '#AEBF2C', '#D9C179', '#D9AE89'];

export default function Relatorios() {
  const [dadosGraficos, setDadosGraficos] = useState(null);
  const [producaoMensal, setProducaoMensal] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const usuarioId = localStorage.getItem('usuarioId');
      if (!usuarioId) return;

      const [graficosResponse, producaoResponse] = await Promise.all([
        axios.get(api.relatorios.graficos(usuarioId)),
        axios.get(api.relatorios.producaoMensal(usuarioId))
      ]);

      setDadosGraficos(graficosResponse.data);
      
      // Converter dados de produção mensal para formato do gráfico
      const producaoArray = Object.entries(producaoResponse.data).map(([mes, quantidade]) => ({
        mes,
        quantidade
      }));
      setProducaoMensal(producaoArray);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const exportarCSV = async () => {
    try {
      const usuarioId = localStorage.getItem('usuarioId');
      const response = await axios.get(api.relatorios.exportarCsv(usuarioId), {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio-colheitas.csv';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
      alert('Erro ao exportar relatório');
    }
  };

  if (carregando) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!dadosGraficos) {
    return (
      <div className="container py-5">
        <div className="alert alert-info">
          <h4>📊 Relatórios</h4>
          <p>Nenhum dado encontrado. Registre algumas colheitas para visualizar os relatórios.</p>
        </div>
      </div>
    );
  }

  // Preparar dados para gráficos
  const dadosQuantidadePorPlanta = Object.entries(dadosGraficos.quantidadePorPlanta || {}).map(([planta, quantidade]) => ({
    planta,
    quantidade
  }));

  const dadosColheitasPorMes = Object.entries(dadosGraficos.colheitasPorMes || {}).map(([mes, total]) => ({
    mes,
    total
  }));

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>📊 Relatórios e Análises</h2>
            <button className="btn btn-success" onClick={exportarCSV}>
              📥 Exportar CSV
            </button>
          </div>

          {/* Cards de Resumo */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Total de Colheitas</h5>
                  <h2>{dadosGraficos.totalColheitas}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Tipos de Plantas</h5>
                  <h2>{Object.keys(dadosGraficos.quantidadePorPlanta || {}).length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">Produção Total</h5>
                  <h2>{Object.values(dadosGraficos.quantidadePorPlanta || {}).reduce((a, b) => a + b, 0).toFixed(1)} kg</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="row">
            {/* Gráfico de Barras - Quantidade por Planta */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5>Produção por Tipo de Planta</h5>
                </div>
                <div className="card-body">
                  <BarChart width={500} height={300} data={dadosQuantidadePorPlanta}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="planta" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantidade" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>
            </div>

            {/* Gráfico de Pizza - Distribuição por Planta */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5>Distribuição da Produção</h5>
                </div>
                <div className="card-body">
                  <PieChart width={500} height={300}>
                    <Pie
                      data={dadosQuantidadePorPlanta}
                      cx={250}
                      cy={150}
                      labelLine={false}
                      label={({planta, percent}) => `${planta} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="quantidade"
                    >
                      {dadosQuantidadePorPlanta.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </div>

            {/* Gráfico de Linha - Colheitas por Mês */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5>Colheitas por Mês</h5>
                </div>
                <div className="card-body">
                  <LineChart width={500} height={300} data={dadosColheitasPorMes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                  </LineChart>
                </div>
              </div>
            </div>

            {/* Gráfico de Área - Produção Mensal */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5>Produção Mensal (kg)</h5>
                </div>
                <div className="card-body">
                  <BarChart width={500} height={300} data={producaoMensal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantidade" fill="#00C49F" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Dados */}
          <div className="card">
            <div className="card-header">
              <h5>Resumo Detalhado</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Planta</th>
                      <th>Quantidade Total (kg)</th>
                      <th>Percentual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosQuantidadePorPlanta.map((item, index) => {
                      const total = Object.values(dadosGraficos.quantidadePorPlanta).reduce((a, b) => a + b, 0);
                      const percentual = ((item.quantidade / total) * 100).toFixed(1);
                      return (
                        <tr key={index}>
                          <td>{item.planta}</td>
                          <td>{item.quantidade.toFixed(1)}</td>
                          <td>{percentual}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}