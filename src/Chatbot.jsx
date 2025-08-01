import { useState } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá! 👋 Sou o assistente virtual do Alimentando o Futuro. Como posso ajudar?', isBot: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const responses = {
        // Cumprimentos
        'ola': ['Olá! 😊 Como posso ajudar você hoje?', 'Oi! Que bom te ver aqui! Em que posso ajudar?', 'Olá! Bem-vindo ao Alimentando o Futuro! 🌱'],
        'oi': ['Oi! 👋 Como vai? Em que posso te ajudar?', 'Oi! Que legal você estar aqui! O que precisa?', 'Oi! Pronto para uma vida mais sustentável? 🌿'],
        'bom dia': ['Bom dia! ☀️ Que seu dia seja cheio de sustentabilidade!', 'Bom dia! Como posso tornar seu dia mais verde?'],
        'boa tarde': ['Boa tarde! 🌅 Em que posso ajudar nesta tarde?', 'Boa tarde! Vamos falar sobre sustentabilidade?'],
        'boa noite': ['Boa noite! 🌙 Ainda dá tempo de aprender algo novo!', 'Boa noite! Que tal planejar uma horta para amanhã?'],
        
        // Despedidas
        'tchau': ['Tchau! 👋 Volte sempre que precisar!', 'Até logo! Continue sendo sustentável! 🌱'],
        'obrigado': ['Por nada! 😊 Fico feliz em ajudar!', 'Sempre à disposição! 💚', 'De nada! Que tal começar uma horta agora? 🌱'],
        'valeu': ['Valeu você! 😄 Precisa de mais alguma coisa?', 'Tmj! 🤝 Sempre aqui para ajudar!'],
        
        // Perguntas sobre o bot
        'quem': ['Sou o assistente virtual do Alimentando o Futuro! 🤖 Estou aqui para te ajudar com tudo sobre sustentabilidade!'],
        'nome': ['Pode me chamar de Bot Verde! 🌱 Sou especialista em sustentabilidade!'],
        'como vai': ['Estou ótimo! 😊 Sempre animado para falar sobre sustentabilidade! E você?'],
        
        // Funcionalidades
        'horta': ['Para criar uma horta, acesse "Horta Digital"! 🌿 Temos 12 plantas catalogadas e guias completos. Quer que eu te conte sobre alguma planta específica?'],
        'receitas': ['Temos 12 receitas incríveis! 🍽️ Desde bolo de casca de banana até chips de batata. Qual tipo de receita te interessa mais?'],
        'login': ['Para entrar, clique no ícone de perfil 👤 no canto superior direito! Ainda não tem conta? Posso te ajudar a se cadastrar!'],
        'cadastro': ['Cadastrar é super fácil! 🚀 Clique no perfil e "Cadastrar". Você já ganha pontos só por se inscrever!'],
        'pontos': ['Sistema de pontos é demais! 🏆 Cadastrar horta = +50, colheita = +100. Quanto mais sustentável, mais pontos!'],
        'chat': ['Nosso chat comunitário é incrivel! 💬 Tem salas para hortas, receitas e suporte. A galera lá é muito gente boa!'],
        
        // Temas sustentabilidade
        'sustentabilidade': ['Sustentabilidade é tudo! 🌍 Pequenas ações fazem grande diferença. Que tal começar com uma hortinha?'],
        'meio ambiente': ['Cuidar do planeta é cuidar de nós! 🌱 Cada receita reaproveitada e cada planta cultivada ajuda muito!'],
        'organico': ['Orgânico é vida! 🌿 Sem agrotóxicos, mais saúde. Quer aprender a cultivar orgânico?'],
        
        // Utilitários
        'admin': ['Acesso admin: admin@admin.com / admin123 🔑 (Psiu, só entre nós! 🤫)'],
        'ajuda': ['Posso conversar sobre: 🌱 hortas, 🍽️ receitas, 🔑 login, 💬 chat, 🏆 pontos, 🌍 sustentabilidade. O que te interessa?'],
        
        // Respostas padrão
        'default': [
            'Hmm, não entendi muito bem... 🤔 Pode reformular? Ou digite "ajuda" para ver o que sei fazer!',
            'Opa, me confundi! 😅 Tenta de novo ou me pergunta sobre hortas, receitas ou sustentabilidade!',
            'Desculpa, ainda estou aprendendo! 🤖 Que tal me perguntar sobre nossas hortas ou receitas?'
        ]
    };

    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();
        
        // Verifica cumprimentos exatos primeiro
        if (message === 'oi' || message === 'ola' || message === 'olá') {
            const greetings = responses[message === 'olá' ? 'ola' : 'oi'];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Verifica outras palavras-chave
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                if (Array.isArray(response)) {
                    return response[Math.floor(Math.random() * response.length)];
                }
                return response;
            }
        }
        
        // Resposta padrão aleatória
        const defaultResponses = responses.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage = { id: Date.now(), text: inputText, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simula digitação do bot
        setTimeout(() => {
            const botResponse = getBotResponse(inputText);
            const botMessage = { id: Date.now() + 1, text: botResponse, isBot: true };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {/* Botão flutuante */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#4F732C',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                }}
            >
                <span style={{ fontSize: '24px', color: 'white' }}>
                    {isOpen ? '✕' : '💬'}
                </span>
            </div>

            {/* Janela do chat */}
            {isOpen && (
                <div
                    className="chatbot-window"
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '20px',
                        width: '350px',
                        height: '450px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            backgroundColor: '#4F732C',
                            color: 'white',
                            padding: '15px',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        🤖 Assistente Virtual
                    </div>

                    {/* Mensagens */}
                    <div
                        className="chatbot-messages"
                        style={{
                            flex: 1,
                            padding: '15px',
                            overflowY: 'auto',
                            backgroundColor: '#f8f9fa'
                        }}
                    >
                        {messages.map(message => (
                            <div
                                key={message.id}
                                style={{
                                    marginBottom: '10px',
                                    display: 'flex',
                                    justifyContent: message.isBot ? 'flex-start' : 'flex-end'
                                }}
                            >
                                <div
                                    className={message.isBot ? 'bot-message' : ''}
                                    style={{
                                        maxWidth: '80%',
                                        padding: '10px 12px',
                                        borderRadius: '12px',
                                        backgroundColor: message.isBot ? 'white' : '#4F732C',
                                        color: message.isBot ? '#333' : 'white',
                                        fontSize: '14px',
                                        lineHeight: '1.4',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                                <div
                                    style={{
                                        padding: '10px 12px',
                                        borderRadius: '12px',
                                        backgroundColor: 'white',
                                        color: '#666',
                                        fontSize: '14px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Digitando...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div
                        style={{
                            padding: '15px',
                            borderTop: '1px solid #dee2e6',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Digite sua mensagem..."
                                className="chatbot-input"
                                style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    border: '1px solid #dee2e6',
                                    borderRadius: '20px',
                                    outline: 'none',
                                    fontSize: '14px'
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                style={{
                                    backgroundColor: '#4F732C',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}