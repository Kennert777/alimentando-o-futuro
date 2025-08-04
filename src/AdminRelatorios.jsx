import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './database.js';

export default function AdminRelatorios() {
    const [relatorio, setRelatorio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filtros, setFiltros] = useState({
        tipo: 'usuarios',
        dataInicio: '',
        dataFim: ''
    });

    useEffect(() => {
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin') || 'null');
        if (!currentAdmin || currentAdmin.tipo_perfil !== 'admin') {
            window.location.href = '/admin/login';
            return;
        }
    }, []);

    const gerarRelatorio = async () => {
        setLoading(true);
        try {
            const resultado = await db.gerarRelatorio(filtros.tipo, {
                dataInicio: filtros.dataInicio,
                dataFim: filtros.dataFim
            });
            setRelatorio(resultado);
        } catch (error) {
            alert('Erro ao gerar relatório: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const exportarCSV = () => {
        if (!relatorio || !relatorio.dados.length) return;

        const headers = Object.keys(relatorio.dados[0]).join(',');
        const rows = relatorio.dados.map(item => 
            Object.values(item).map(value => 
                typeof value === 'string' && value.includes(',') ? `"${value}"` : value
            ).join(',')
        );
        
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_${filtros.tipo}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#4F732C" }}>📊 Relatórios</h2>
                <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Voltar</Link>
            </div>

            {/* Filtros */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5>Gerar Relatório</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Tipo de Relatório:</label>
                            <select 
                                className="form-select"
                                value={filtros.tipo}
                                onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                            >
                                <option value="usuarios">Usuários</option>
                                <option value="hortas">Hortas</option>
                                <option value="colheitas">Colheitas</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Data Início:</label>
                            <input 
                                type="date" 
                                className="form-control"
                                value={filtros.dataInicio}
                                onChange={(e) => setFiltros({...filtros, dataInicio: e.target.value})}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Data Fim:</label>
                            <input 
                                type="date" 
                                className="form-control"
                                value={filtros.dataFim}
                                onChange={(e) => setFiltros({...filtros, dataFim: e.target.value})}
                            />
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                            <button 
                                className="btn btn-primary w-100"
                                onClick={gerarRelatorio}
                                disabled={loading}
                                style={{ backgroundColor: "#4F732C", border: "none" }}
                            >
                                {loading ? 'Gerando...' : 'Gerar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resultado do Relatório */}
            {relatorio && (
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Relatório de {relatorio.tipo}</h5>
                            <div>
                                <span className="me-3">Total: {relatorio.total} registros</span>
                                <button 
                                    className="btn btn-success btn-sm"
                                    onClick={exportarCSV}
                                >
                                    📥 Exportar CSV
                                </button>
                            </div>
                        </div>

                        {relatorio.dados.length === 0 ? (
                            <div className="alert alert-info">
                                Nenhum registro encontrado para os filtros selecionados.
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            {Object.keys(relatorio.dados[0]).map(key => (
                                                <th key={key}>{key.replace('_', ' ').toUpperCase()}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {relatorio.dados.slice(0, 100).map((item, index) => (
                                            <tr key={index}>
                                                {Object.values(item).map((value, i) => (
                                                    <td key={i}>
                                                        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') :
                                                         typeof value === 'string' && value.includes('T') ? 
                                                         new Date(value).toLocaleDateString() : value}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {relatorio.dados.length > 100 && (
                                    <div className="alert alert-info">
                                        Mostrando apenas os primeiros 100 registros. 
                                        Use a exportação CSV para ver todos os dados.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-3">
                            <small className="text-muted">
                                Relatório gerado em: {new Date(relatorio.data_geracao).toLocaleString()}
                            </small>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}