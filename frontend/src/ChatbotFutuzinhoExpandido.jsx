import { useState } from 'react';

export default function ChatbotFutuzinhoExpandido() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Olá! Sou o Futuzinho, seu assistente de agricultura urbana! Como posso ajudar?' }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage = { type: 'user', text: inputText };
        const botResponse = { type: 'bot', text: 'Obrigado pela sua mensagem! Em breve terei mais funcionalidades.' };

        setMessages(prev => [...prev, userMessage, botResponse]);
        setInputText('');
    };

    return (
        <>
            {/* Botão flutuante */}
            <div 
                className="position-fixed"
                style={{ 
                    bottom: '20px', 
                    right: '20px', 
                    zIndex: 1000,
                    cursor: 'pointer'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div 
                    className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '60px', height: '60px', fontSize: '24px' }}
                >
                    🤖
                </div>
            </div>

            {/* Chat expandido */}
            {isOpen && (
                <div 
                    className="position-fixed bg-white border rounded shadow"
                    style={{ 
                        bottom: '90px', 
                        right: '20px', 
                        width: '300px', 
                        height: '400px',
                        zIndex: 1001
                    }}
                >
                    <div className="p-3 bg-success text-white rounded-top">
                        <h6 className="mb-0">Futuzinho - Assistente</h6>
                    </div>
                    
                    <div className="p-3" style={{ height: '300px', overflowY: 'auto' }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-end' : ''}`}>
                                <div 
                                    className={`d-inline-block p-2 rounded ${
                                        msg.type === 'user' 
                                            ? 'bg-primary text-white' 
                                            : 'bg-light'
                                    }`}
                                    style={{ maxWidth: '80%' }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="p-2 border-top">
                        <div className="input-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Digite sua mensagem..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button 
                                className="btn btn-success"
                                onClick={handleSendMessage}
                            >
                                📤
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}