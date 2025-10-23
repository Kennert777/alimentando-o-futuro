import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/axios.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#4F732C', '#558C03', '#AEBF2C', '#D9C179', '#D9AE89'];

export default function RelatoriosNovo() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dadosGraficos, setDadosGraficos] = useState(null);
    const [producaoMensal, setProducaoMensal] = useState([]);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }
        setUser(currentUser);
        loadData(currentUser.id);
    }, []);

    const loadData = async (userId) => {
        try {
            const [graficosResponse, producaoResponse] = await Promise.all([
                api.get(`/relatorios/graficos/${userId}`),
                api.get(`/relatorios/producao-mensal/${userId}`)
            ]);
            
            setDadosGraficos(graficosResponse.data);
            setProducaoMensal(producaoResponse.data.producaoMensal);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportarCSV = async () => {
        try {
            const response = await api.get(`/relatorios/csv/${user.id}`, {
                responseType: 'blob'
            });
            
            const blob = new Blob([response.data], { type: 'text/csv' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'relatorio-hortas.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao exportar CSV:', error);
            alert('Erro ao exportar relatório. Tente novamente.');
        }
    };

    const exportarPDF = async () => {
        try {
            const response = await api.get(`/relatorios/pdf/${user.id}`, {
                responseType: 'blob'
            });
            
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'relatorio-producao.pdf');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao exportar PDF:', error);
            alert('Erro ao gerar relatório PDF. Tente novamente.');
        }
    };

    if (loading) return <div className="container mt-4"><div>Carregando...</div></div>;
    if (!user) return <div className="container mt-4"><div>Usuário não encontrado</div></div>;

    // Preparar dados para gráficos
    const dadosColheitasPorMes = dadosGraficos?.colheitasPorMes ? 
        Object.entries(dadosGraficos.colheitasPorMes).map(([mes, quantidade]) => ({
            mes,
            quantidade: parseFloat(quantidade)
        })) : [];

    const dadosColheitasPorQualidade = dadosGraficos?.colheitasPorQualidade ?
        Object.entries(dadosGraficos.colheitasPorQualidade).map(([qualidade, count]) => ({
            name: qualidade,
            value: parseInt(count)
        })) : [];

    const dadosHortasPorStatus = dadosGraficos?.hortasPorStatus ?
        Object.entries(dadosGraficos.hortasPorStatus).map(([status, count]) => ({
            name: status,
            value: parseInt(count)
        })) : [];

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 style={{ color: "#4F732C" }}>📊 Relatórios</h2>
                        <Link to="/dashboard" className="btn btn-secondary">Voltar ao Dashboard</Link>
                    </div>
                </div>
            </div>

            {/* Resumo Geral */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#D9C179" }}>
                        <div className="card-body">
                            <h3>{dadosGraficos?.totalColheitas || 0}</h3>
                            <p>Total de Colheitas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#D9AE89" }}>
                        <div className="card-body">
                            <h3>{dadosGraficos?.totalHortas || 0}</h3>
                            <p>Hortas Cadastradas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#AEBF2C" }}>
                        <div className="card-body">
                            <h3>{producaoMensal.reduce((sum, item) => sum + item.producao, 0).toFixed(1)} kg</h3>
                            <p>Produção Total</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center" style={{ backgroundColor: "#4F732C", color: "white" }}>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button onClick={exportarCSV} className="btn btn-light btn-sm">
                                    📄 Exportar CSV
                                </button>
                                <button onClick={exportarPDF} className="btn btn-warning btn-sm">
                                    📊 Relatório PDF
                                </button>
                            </div>
                            <p className="mt-2 mb-0">Downloads</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráficos */}
            <div className="row mb-4">
                {/* Produção Mensal */}
                <div className="col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">📈 Produção Mensal (kg)</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={producaoMensal}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="producao" stroke="#4F732C" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                {/* Colheitas por Qualidade */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">🏆 Qualidade das Colheitas</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={dadosColheitasPorQualidade}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {dadosColheitasPorQualidade.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Status das Hortas */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">🌱 Status das Hortas</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dadosHortasPorStatus}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#558C03" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}