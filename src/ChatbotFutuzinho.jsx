import { useState } from 'react';
import plantsKnowledgeBase from './plantsKnowledgeBase.json';
import chatFlows from './chatFlows.json';

export default function ChatbotFutuzinho() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá! 👋 Sou o Marley, seu assistente do Alimentando o Futuro!', isBot: true },
        { id: 2, text: 'Posso te ajudar com cultivo, receitas, nutrição e muito mais! O que você gostaria de saber?', isBot: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const getAllPlants = () => {
        return [
            ...plantsKnowledgeBase.hortaliças_legumes,
            ...plantsKnowledgeBase.frutas,
            ...plantsKnowledgeBase.ervas_temperos,
            ...plantsKnowledgeBase.cereais_leguminosas_sementes,
            ...plantsKnowledgeBase.plantas_medicinais
        ];
    };

    const findPlant = (searchTerm) => {
        const allPlants = getAllPlants();
        return allPlants.find(plant => 
            plant.nome_popular.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const respostasInteligentes = {
        'ola|oi|bom dia|boa tarde|boa noite': [
            'Olá! 😊 Sou o Marley! Como posso te ajudar hoje?',
            'Oi! 🌱 Pronto para aprender sobre sustentabilidade?',
            'Olá! Que bom te ver aqui! O que você gostaria de cultivar?'
        ],

        'como plantar|plantar|cultivo': (message) => {
            const words = message.toLowerCase().split(' ');
            for (const word of words) {
                const plant = findPlant(word);
                if (plant) {
                    return `🌱 **${plant.nome_popular} (${plant.nome_cientifico})**\n\nEncontrei informações sobre esta planta! Para cultivo específico, preciso de mais detalhes. Quer saber sobre:\n\n• Solo ideal\n• Época de plantio\n• Cuidados especiais\n\nO que te interessa mais? 🌿`;
                }
            }
            return 'Sobre qual planta você quer saber como plantar? Tenho informações sobre mais de 100 espécies! 🌱';
        },

        'receita|aproveitar|casca|talo': () => {
            const receitas = chatFlows.reaproveitamento_receitas;
            const randomReceita = receitas[Math.floor(Math.random() * receitas.length)];
            return `♻️ **Reaproveitamento Sustentável**\n\n${randomReceita}\n\nQuer mais ideias de aproveitamento? Posso sugerir receitas com cascas, talos e sobras! 🍽️`;
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
                        🤖 Marley - Seu Assistente Verde
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
                                    Marley digitando... 🌱
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