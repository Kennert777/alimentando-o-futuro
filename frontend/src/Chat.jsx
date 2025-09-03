import { useState, useEffect, useRef } from 'react';
import { api } from './config/api.js';

export default function Chat() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeRoom, setActiveRoom] = useState('geral');
    const messagesEndRef = useRef(null);

    const rooms = [
        { id: 'geral', name: '💬 Chat Geral', desc: 'Conversa geral da comunidade' },
        { id: 'hortas', name: '🌱 Hortas', desc: 'Dicas sobre cultivo' },
        { id: 'receitas', name: '🍽️ Receitas', desc: 'Compartilhe receitas sustentáveis' },
        { id: 'suporte', name: '🆘 Suporte', desc: 'Ajuda e suporte técnico' }
    ];

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }
        setUser(currentUser);
        loadMessages(activeRoom);
    }, [activeRoom]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = (roomId) => {
        const allMessages = JSON.parse(localStorage.getItem('chatMessages') || '{}');
        setMessages(allMessages[roomId] || []);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: Date.now(),
            userId: user.id,
            userName: user.nome,
            text: newMessage,
            timestamp: new Date().toISOString(),
            room: activeRoom
        };

        const allMessages = JSON.parse(localStorage.getItem('chatMessages') || '{}');
        if (!allMessages[activeRoom]) allMessages[activeRoom] = [];
        allMessages[activeRoom].push(message);
        localStorage.setItem('chatMessages', JSON.stringify(allMessages));

        // Salvar mensagem e notificar admin
        await db.salvarMensagemChat(user, `[${rooms.find(r => r.id === activeRoom)?.name}] ${newMessage}`);

        setMessages([...messages, message]);
        setNewMessage('');

        // Simula resposta automática do suporte
        if (activeRoom === 'suporte') {
            setTimeout(() => {
                const supportMessage = {
                    id: Date.now() + 1,
                    userId: 'support',
                    userName: 'Suporte',
                    text: 'Obrigado pela sua mensagem! Nossa equipe irá responder em breve.',
                    timestamp: new Date().toISOString(),
                    room: activeRoom,
                    isSupport: true
                };
                
                allMessages[activeRoom].push(supportMessage);
                localStorage.setItem('chatMessages', JSON.stringify(allMessages));
                setMessages(prev => [...prev, supportMessage]);
            }, 2000);
        }
    };

    if (!user) return <div>Carregando...</div>;

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar com salas */}
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h6>💬 Salas de Chat</h6>
                        </div>
                        <div className="list-group list-group-flush">
                            {rooms.map(room => (
                                <button
                                    key={room.id}
                                    className={`list-group-item list-group-item-action ${activeRoom === room.id ? 'active' : ''}`}
                                    onClick={() => setActiveRoom(room.id)}
                                    style={{ 
                                        backgroundColor: activeRoom === room.id ? '#4F732C' : 'transparent',
                                        borderColor: activeRoom === room.id ? '#4F732C' : '#dee2e6'
                                    }}
                                >
                                    <div className="fw-bold">{room.name}</div>
                                    <small className={activeRoom === room.id ? 'text-light' : 'text-muted'}>
                                        {room.desc}
                                    </small>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info do usuário */}
                    <div className="card mt-3">
                        <div className="card-body text-center">
                            <h6>👤 {user.nome}</h6>
                            <small className="text-muted">Online</small>
                        </div>
                    </div>
                </div>

                {/* Área do chat */}
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header">
                            <h6>{rooms.find(r => r.id === activeRoom)?.name}</h6>
                        </div>
                        
                        {/* Mensagens */}
                        <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
                            {messages.length === 0 ? (
                                <div className="text-center text-muted">
                                    <p>Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
                                </div>
                            ) : (
                                messages.map(message => (
                                    <div key={message.id} className={`mb-3 ${message.userId === user.id ? 'text-end' : ''}`}>
                                        <div className={`d-inline-block p-2 rounded ${
                                            message.userId === user.id 
                                                ? 'bg-primary text-white' 
                                                : message.isSupport 
                                                    ? 'bg-success text-white'
                                                    : 'bg-light'
                                        }`} style={{ maxWidth: '70%' }}>
                                            {message.userId !== user.id && (
                                                <small className="fw-bold d-block">
                                                    {message.isSupport ? '🆘 ' : '👤 '}{message.userName}
                                                </small>
                                            )}
                                            <div>{message.text}</div>
                                            <small className="opacity-75">
                                                {new Date(message.timestamp).toLocaleTimeString()}
                                            </small>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Formulário de envio */}
                        <div className="card-footer">
                            <form onSubmit={sendMessage}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite sua mensagem..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        style={{ backgroundColor: '#4F732C', borderColor: '#4F732C' }}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}