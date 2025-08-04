import { useState, useEffect } from 'react';
import db from './database.js';

export default function AdminNotificationTest() {
    const [notificacoes, setNotificacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotificacoes();
    }, []);

    const loadNotificacoes = async () => {
        try {
            const todasNotificacoes = await db.buscarNotificacoesAdmin();
            setNotificacoes(todasNotificacoes);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        } finally {
            setLoading(false);
        }
    };

    const criarTesteCadastro = async () => {
        try {
            const usuario = await db.criarUsuario({
                nome: 'Usuário Teste',
                email: `teste${Date.now()}@teste.com`,
                telefone: '(11) 99999-9999',
                senha: '123456'
            });
            alert('Usuário teste criado! Verifique as notificações.');
            loadNotificacoes();
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    const criarTesteSolicitacao = async () => {
        try {
            // Buscar primeiro usuário
            const usuarios = await db.buscarTodosUsuarios();
            if (usuarios.length === 0) {
                alert('Crie um usuário primeiro!');
                return;
            }

            await db.criarSolicitacaoApoio({
                tipo_solicitacao: 'sementes',
                titulo: 'Teste de Solicitação',
                descricao: 'Esta é uma solicitação de teste para verificar notificações',
                urgencia: 'alta'
            }, usuarios[0].id);
            
            alert('Solicitação teste criada! Verifique as notificações.');
            loadNotificacoes();
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    const criarTesteHorta = async () => {
        try {
            const usuarios = await db.buscarTodosUsuarios();
            if (usuarios.length === 0) {
                alert('Crie um usuário primeiro!');
                return;
            }

            await db.criarHorta({
                nome: 'Horta Teste',
                localizacao: 'Local Teste',
                tipo_cultivo: 'organico',
                descricao: 'Horta de teste para verificar notificações'
            }, usuarios[0].id);
            
            alert('Horta teste criada! Verifique as notificações.');
            loadNotificacoes();
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    const criarTesteColheita = async () => {
        try {
            const usuarios = await db.buscarTodosUsuarios();
            const hortas = await db.buscarTodasHortas();
            
            if (usuarios.length === 0 || hortas.length === 0) {
                alert('Crie um usuário e uma horta primeiro!');
                return;
            }

            await db.criarColheita({
                horta_id: hortas[0].id,
                tipo_planta: 'Alface Teste',
                quantidade_kg: 2.5,
                data_colheita: new Date().toISOString().split('T')[0],
                qualidade: 'excelente',
                destino: 'consumo_proprio',
                observacoes: 'Colheita de teste'
            }, usuarios[0].id);
            
            alert('Colheita teste criada! Verifique as notificações.');
            loadNotificacoes();
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    const criarTesteChat = async () => {
        try {
            const usuarios = await db.buscarTodosUsuarios();
            if (usuarios.length === 0) {
                alert('Crie um usuário primeiro!');
                return;
            }

            await db.salvarMensagemChat(usuarios[0], 'Esta é uma mensagem de teste do chat');
            
            alert('Mensagem teste criada! Verifique as notificações.');
            loadNotificacoes();
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    if (loading) return <div className="container mt-5"><div className="text-center">Carregando...</div></div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h5>🔔 Teste de Notificações Admin</h5>
                </div>
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h6>Criar Testes:</h6>
                            <div className="btn-group me-2 mb-2">
                                <button className="btn btn-primary btn-sm" onClick={criarTesteCadastro}>
                                    👤 Teste Cadastro
                                </button>
                                <button className="btn btn-warning btn-sm" onClick={criarTesteSolicitacao}>
                                    📝 Teste Solicitação
                                </button>
                                <button className="btn btn-success btn-sm" onClick={criarTesteHorta}>
                                    🌱 Teste Horta
                                </button>
                                <button className="btn btn-info btn-sm" onClick={criarTesteColheita}>
                                    🌾 Teste Colheita
                                </button>
                                <button className="btn btn-secondary btn-sm" onClick={criarTesteChat}>
                                    💬 Teste Chat
                                </button>
                            </div>
                            <button className="btn btn-outline-primary btn-sm" onClick={loadNotificacoes}>
                                🔄 Recarregar
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <h6>Notificações ({notificacoes.length}):</h6>
                            {notificacoes.length === 0 ? (
                                <div className="alert alert-info">
                                    Nenhuma notificação encontrada. Crie alguns testes acima.
                                </div>
                            ) : (
                                <div className="list-group">
                                    {notificacoes.slice(0, 10).map(notif => (
                                        <div key={notif.id} className={`list-group-item ${!notif.lida ? 'bg-light' : ''}`}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="mb-1">
                                                        {notif.tipo === 'solicitacao' && '📝'}
                                                        {notif.tipo === 'chat' && '💬'}
                                                        {notif.tipo === 'cadastro' && '👤'}
                                                        {notif.tipo === 'horta' && '🌱'}
                                                        {notif.tipo === 'colheita' && '🌾'}
                                                        {' '}{notif.titulo}
                                                    </h6>
                                                    <p className="mb-1 small">{notif.mensagem}</p>
                                                    <small className="text-muted">
                                                        {new Date(notif.data_criacao).toLocaleString()}
                                                    </small>
                                                    {notif.dados && Object.keys(notif.dados).length > 0 && (
                                                        <div className="mt-1">
                                                            <small className="text-muted">
                                                                Dados: {JSON.stringify(notif.dados)}
                                                            </small>
                                                        </div>
                                                    )}
                                                </div>
                                                {!notif.lida && (
                                                    <span className="badge bg-primary">Nova</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h6>Verificações:</h6>
                        <ul className="list-unstyled">
                            <li>✅ Cadastro de usuário → Notificação admin</li>
                            <li>✅ Solicitação de apoio → Notificação admin</li>
                            <li>✅ Cadastro de horta → Notificação admin</li>
                            <li>✅ Registro de colheita → Notificação admin</li>
                            <li>✅ Mensagem no chat → Notificação admin</li>
                            <li>✅ Email automático para admin</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}