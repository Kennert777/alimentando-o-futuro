import { useState } from 'react';

export default function ChatbotFutuzinho() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá! 👋 Sou o Futuzinho, seu assistente do Alimentando o Futuro!', isBot: true },
        { id: 2, text: 'Posso te ajudar com cultivo, receitas, nutrição e muito mais! O que você gostaria de saber?', isBot: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const plantasDatabase = {
        'alface': {
            nome_cientifico: 'Lactuca sativa',
            plantio: 'Plante sementes a 1cm de profundidade, em solo rico em matéria orgânica',
            colheita: '45-60 dias após plantio',
            cuidados: 'Regue diariamente pela manhã, mantenha em sol parcial',
            nutricao: 'Rica em vitaminas A, C e K, boa para hidratação',
            receitas: 'Saladas, sucos verdes, wraps naturais'
        },
        'tomate': {
            nome_cientifico: 'Solanum lycopersicum',
            plantio: 'Plante mudas em covas de 30cm, com suporte para crescimento',
            colheita: '80-120 dias, quando estiver bem vermelho',
            cuidados: 'Sol pleno, rega regular, retire brotos laterais',
            nutricao: 'Rico em licopeno, vitamina C, antioxidante natural',
            receitas: 'Molhos, saladas, conservas, tomate seco'
        },
        'manjericao': {
            nome_cientifico: 'Ocimum basilicum',
            plantio: 'Sementes superficiais, solo bem drenado',
            colheita: '30-40 dias, corte folhas pela manhã',
            cuidados: 'Sol pleno, rega moderada, corte flores para manter sabor',
            nutricao: 'Rico em vitamina K, propriedades anti-inflamatórias',
            receitas: 'Pesto, tempero para massas, chás medicinais'
        }
    };

    const respostasInteligentes = {
        'ola|oi|bom dia|boa tarde|boa noite': [
            'Olá! 😊 Sou o Futuzinho! Como posso te ajudar hoje?',
            'Oi! 🌱 Pronto para aprender sobre sustentabilidade?',
            'Olá! Que bom te ver aqui! O que você gostaria de cultivar?'
        ],

        'alface': () => {
            const info = plantasDatabase.alface;
            return `🥬 **Alface (${info.nome_cientifico})**\n\n**Plantio:** ${info.plantio}\n**Colheita:** ${info.colheita}\n**Cuidados:** ${info.cuidados}\n**Nutrição:** ${info.nutricao}\n\nQuer saber sobre outras plantas? 🌱`;
        },

        'tomate': () => {
            const info = plantasDatabase.tomate;
            return `🍅 **Tomate (${info.nome_cientifico})**\n\n**Plantio:** ${info.plantio}\n**Colheita:** ${info.colheita}\n**Cuidados:** ${info.cuidados}\n**Nutrição:** ${info.nutricao}\n\nPosso te ensinar sobre pragas do tomate também! 🐛`;
        },

        'casca.*banana|banana.*casca': () => 'Bolo de casca de banana: Bata 3 cascas com ovos e óleo, misture farinha e açúcar, asse 40min a 180°C 🍌\n\nQuer mais receitas sustentáveis?',

        'planta.*murchando|murcha|folhas.*amarelas': [
            'Folhas murchas podem indicar: 💧 Falta ou excesso de água, ☀️ Sol demais, 🦠 Pragas. Qual planta está afetada?',
            'Vamos investigar! Me conta: que planta é? Como está o solo? Quanto sol recebe? 🔍'
        ],

        'pragas|pulgao|insetos': [
            'Para pragas naturalmente: 🧼 Água com sabão neutro (1:10), 🌿 Plante manjericão como repelente, 🐞 Atraia joaninhas!',
            'Controle orgânico: Óleo de neem, calda de fumo, ou plantio de tagetes. Que praga você está vendo? 🐛'
        ],

        'anemia|ferro': 'Para anemia, consuma: 🥬 Espinafre, couve, 🫘 Feijão, lentilha, 🥩 Carnes magras. Combine com vitamina C (limão, laranja) para melhor absorção! 💪',

        'escola|criança|educação': [
            'Horta escolar é incrível! 👨‍🏫 Plantas fáceis: alface, rabanete, manjericão. Atividades: plantio, medição, colheita, receitas! 📚',
            'Para crianças: Faça canteiros baixos, plantas coloridas, experimentos simples. Elas adoram ver crescer! 🌱👶'
        ],

        'pontos|emblemas|desafios': 'No nosso sistema: 🏆 +50 pontos por horta, +100 por colheita, +25 por dica compartilhada! Emblemas especiais para conquistas! 🎯',

        'triste|desanimado': 'Ei, tudo bem? 🤗 Que tal plantar algo hoje? Cuidar de plantas traz paz e alegria! Posso te ajudar a começar uma hortinha? 🌱💚',

        'fome': 'Com fome? 🍽️ Que tal uma receita rápida com o que você tem em casa? Posso sugerir pratos com sobras ou cascas! Zero desperdício! ♻️',

        'dica|sugestão': [
            '💡 Dica do dia: Regue plantas pela manhã cedo ou final da tarde. Evita evaporação e fungos! 🌅',
            '🌱 Hoje plante: Manjericão! Cresce rápido, repele insetos e tempera tudo! Que tal? 🌿',
            '♻️ Sustentabilidade: Use cascas de ovo trituradas como adubo natural. Rico em cálcio! 🥚'
        ],

        'default': [
            'Hmm, não entendi bem... 🤔 Pode reformular? Ou me pergunte sobre plantas, receitas ou nutrição! 🌱',
            'Desculpa, ainda estou aprendendo! 🤖 Que tal me perguntar sobre cultivo ou aproveitamento de alimentos? 🍽️'
        ]
    };

    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();
        
        for (const [pattern, response] of Object.entries(respostasInteligentes)) {
            if (pattern === 'default') continue;
            
            const regex = new RegExp(pattern, 'i');
            if (regex.test(message)) {
                if (typeof response === 'function') {
                    return response();
                }
                if (Array.isArray(response)) {
                    return response[Math.floor(Math.random() * response.length)];
                }
                return response;
            }
        }
        
        const defaultResponses = respostasInteligentes.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage = { id: Date.now(), text: inputText, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

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
                    transition: 'all 0.3s ease'
                }}
            >
                <span style={{ fontSize: '24px', color: 'white' }}>
                    {isOpen ? '✕' : '🤖'}
                </span>
            </div>

            {isOpen && (
                <div
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
                    <div
                        style={{
                            backgroundColor: '#4F732C',
                            color: 'white',
                            padding: '15px',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        🤖 Futuzinho - Seu Assistente Verde
                    </div>

                    <div
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
                                    Futuzinho digitando... 🌱
                                </div>
                            </div>
                        )}
                    </div>

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
                                placeholder="Digite sua pergunta..."
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