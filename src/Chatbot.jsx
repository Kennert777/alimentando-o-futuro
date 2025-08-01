import { useState } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá! 👋 Sou o Bot Verde do Alimentando o Futuro!', isBot: true },
        { id: 2, text: 'Escolha uma categoria ou digite sua pergunta:', isBot: true, showCategories: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const categories = [
        { id: 'hortas', name: '🌱 Hortas', icon: '🌿' },
        { id: 'receitas', name: '🍽️ Receitas', icon: '🥗' },
        { id: 'conta', name: '👤 Minha Conta', icon: '🔑' },
        { id: 'pontos', name: '🏆 Gamificação', icon: '⭐' },
        { id: 'suporte', name: '🎆 Suporte', icon: '📞' }
    ];

    const categoryResponses = {
        hortas: {
            intro: 'Você escolheu Hortas! 🌱 Temos muito conteúdo:',
            topics: {
                'plantas': {
                    title: '🌿 Plantas Disponíveis',
                    content: 'Temos 12 plantas catalogadas:\n\n• **Fáceis**: Alface, Manjericão, Cebolinha, Rúcula\n• **Médias**: Tomate Cereja, Pimentão\n• **Especiais**: Rabanete (25 dias!), Hortelã\n\nQual te interessa mais?'
                },
                'como começar': {
                    title: '🌱 Como Começar',
                    content: '**Passo a passo:**\n\n1. Escolha o local (sol/sombra)\n2. Prepare o solo ou vaso\n3. Selecione plantas fáceis\n4. Regue regularmente\n5. Acompanhe o crescimento\n\nPrecisa de dicas específicas?'
                },
                'cuidados': {
                    title: '💧 Cuidados Essenciais',
                    content: '**Cuidados básicos:**\n\n• **Rega**: Manhã ou final da tarde\n• **Sol**: 4-6h diárias para maioria\n• **Solo**: Bem drenado e nutritivo\n• **Pragas**: Controle natural\n\nQuer saber sobre alguma planta específica?'
                }
            }
        },
        receitas: {
            intro: 'Receitas Sustentáveis! 🍽️ Aproveitamento total:',
            topics: {
                'cascas': {
                    title: '🍌 Receitas com Cascas',
                    content: '**Receitas populares:**\n\n• Bolo de casca de banana\n• Chips de casca de batata\n• Geleia de casca de laranja\n• Chá de casca de abacaxi\n\nTodas com tutoriais completos!'
                },
                'talos': {
                    title: '🥦 Aproveitando Talos',
                    content: '**Receitas com talos:**\n\n• Farofa de talos (couve/brócolis)\n• Refogado de folhas de beterraba\n• Torta salgada de talos\n• Salada de talos e folhas\n\nZero desperdício!'
                },
                'doces': {
                    title: '🍰 Doces Sustentáveis',
                    content: '**Sobremesas especiais:**\n\n• Pão de casca de abóbora\n• Doce de casca de melancia\n• Bolo de casca de banana\n\nDeliciosos e sustentáveis!'
                }
            }
        },
        conta: {
            intro: 'Sua Conta 👤 Tudo sobre login e cadastro:',
            topics: {
                'login': {
                    title: '🔑 Como Fazer Login',
                    content: '**Passo a passo:**\n\n1. Clique no ícone de perfil (canto superior direito)\n2. Selecione "Entrar"\n3. Digite email e senha\n4. Clique "Entrar"\n\nProblemas? Verifique email/senha!'
                },
                'cadastro': {
                    title: '📝 Criar Conta',
                    content: '**Cadastro rápido:**\n\n1. Clique no perfil > "Cadastrar"\n2. Preencha: nome, email, telefone\n3. Crie uma senha segura\n4. Confirme a senha\n\n🎆 Ganhe pontos ao se cadastrar!'
                },
                'perfil': {
                    title: '📋 Gerenciar Perfil',
                    content: '**No seu dashboard:**\n\n• Veja suas estatísticas\n• Gerencie hortas cadastradas\n• Acompanhe pontos e emblemas\n• Acesse chat comunitário\n\nTudo em um lugar!'
                }
            }
        },
        pontos: {
            intro: 'Sistema de Gamificação! 🏆 Ganhe pontos e emblemas:',
            topics: {
                'como ganhar': {
                    title: '⭐ Como Ganhar Pontos',
                    content: '**Ações que dão pontos:**\n\n• Cadastrar horta: +50 pontos\n• Atualizar para colheita: +100 pontos\n• Primeiro cadastro: +50 pontos\n• Participar do chat: +10 pontos\n\nSeja sustentável e ganhe!'
                },
                'emblemas': {
                    title: '🏅 Emblemas Especiais',
                    content: '**Emblemas disponíveis:**\n\n• 🎆 Primeiro Cadastro\n• 🌱 Mestre da Horta\n• 🍽️ Chef Sustentável\n• 💬 Comunicador\n\nColecione todos!'
                },
                'ranking': {
                    title: '📈 Sistema de Níveis',
                    content: '**Níveis de sustentabilidade:**\n\n• 0-99: Iniciante 🌱\n• 100-299: Cultivador 🌿\n• 300-599: Especialista 🌳\n• 600+: Mestre Verde 🌲\n\nQual seu nível?'
                }
            }
        },
        suporte: {
            intro: 'Suporte Técnico 📞 Estou aqui para ajudar:',
            topics: {
                'problemas': {
                    title: '🔧 Problemas Comuns',
                    content: '**Soluções rápidas:**\n\n• **Não consigo logar**: Verifique email/senha\n• **Esqueci senha**: Use "Esqueci senha"\n• **Site lento**: Limpe cache do navegador\n• **Erro no cadastro**: Verifique dados\n\nAinda com problema?'
                },
                'contato': {
                    title: '📧 Falar com Humanos',
                    content: '**Canais de contato:**\n\n• **Email**: rm94720@estudante.fieb.edu.br\n• **Chat**: Sala de suporte\n• **Formulário**: Página "Apoio"\n\nResposta em até 24h!'
                },
                'admin': {
                    title: '🔑 Acesso Administrativo',
                    content: '**Para administradores:**\n\nEmail: admin@admin.com\nSenha: admin123\n\n🚨 Apenas para testes e demonstração!'
                }
            }
        }
    };

    const quickResponses = {
        'ola': ['Olá! 😊 Escolha uma categoria acima ou me faça uma pergunta!'],
        'oi': ['Oi! 👋 Que categoria te interessa mais?'],
        'ajuda': ['Escolha uma das categorias acima ou digite sua dúvida! Estou aqui para ajudar! 🤖'],
        'obrigado': ['Por nada! 😊 Precisa de mais alguma coisa?'],
        'tchau': ['Tchau! 👋 Volte sempre que precisar de ajuda!'],
        'default': ['Não entendi... 🤔 Tente escolher uma categoria acima ou reformule sua pergunta!']
    };

    const handleCategoryClick = (categoryId) => {
        const category = categoryResponses[categoryId];
        if (!category) return;

        setCurrentCategory(categoryId);
        const categoryMessage = {
            id: Date.now(),
            text: category.intro,
            isBot: true,
            showTopics: true,
            categoryId: categoryId
        };
        setMessages(prev => [...prev, categoryMessage]);
    };

    const handleTopicClick = (categoryId, topicKey) => {
        const topic = categoryResponses[categoryId]?.topics[topicKey];
        if (!topic) return;

        const topicMessage = {
            id: Date.now(),
            text: `**${topic.title}**\n\n${topic.content}`,
            isBot: true
        };
        setMessages(prev => [...prev, topicMessage]);
    };

    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();
        
        // Respostas rápidas
        for (const [key, response] of Object.entries(quickResponses)) {
            if (message.includes(key)) {
                if (Array.isArray(response)) {
                    return response[Math.floor(Math.random() * response.length)];
                }
                return response;
            }
        }
        
        // Busca em categorias
        for (const [categoryId, category] of Object.entries(categoryResponses)) {
            for (const [topicKey, topic] of Object.entries(category.topics)) {
                if (message.includes(topicKey) || message.includes(topic.title.toLowerCase())) {
                    return `**${topic.title}**\n\n${topic.content}`;
                }
            }
        }
        
        return quickResponses.default;
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
                            <div key={message.id}>
                                <div
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
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                            whiteSpace: 'pre-line'
                                        }}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                                
                                {/* Botões de categorias */}
                                {message.showCategories && (
                                    <div style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => handleCategoryClick(cat.id)}
                                                    style={{
                                                        backgroundColor: '#4F732C',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '15px',
                                                        padding: '5px 10px',
                                                        fontSize: '12px',
                                                        cursor: 'pointer',
                                                        margin: '2px'
                                                    }}
                                                >
                                                    {cat.icon} {cat.name.split(' ')[1]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Botões de tópicos */}
                                {message.showTopics && message.categoryId && (
                                    <div style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                            {Object.entries(categoryResponses[message.categoryId].topics).map(([key, topic]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => handleTopicClick(message.categoryId, key)}
                                                    style={{
                                                        backgroundColor: '#558C03',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '12px',
                                                        padding: '4px 8px',
                                                        fontSize: '11px',
                                                        cursor: 'pointer',
                                                        margin: '2px'
                                                    }}
                                                >
                                                    {topic.title.split(' ')[1] || topic.title}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
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