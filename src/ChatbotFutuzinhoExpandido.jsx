import { useState } from 'react';

export default function ChatbotFutuzinhoExpandido() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá! 👋 Sou o Goat, seu assistente do Alimentando o Futuro!', isBot: true },
        { id: 2, text: 'Posso te ajudar com cultivo, receitas, nutrição e muito mais! O que você gostaria de saber?', isBot: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Base de conhecimento expandida - 100 plantas
    const plantasDatabase = {
        // Hortaliças
        'alface': {
            nome_cientifico: 'Lactuca sativa',
            categoria: 'hortaliça',
            plantio: 'Plante sementes a 1cm de profundidade, em solo rico em matéria orgânica',
            colheita: '45-60 dias após plantio',
            cuidados: 'Regue diariamente pela manhã, mantenha em sol parcial',
            nutricao: 'Rica em vitaminas A, C e K, boa para hidratação',
            receitas: 'Saladas, sucos verdes, wraps naturais',
            pragas: 'Pulgões e lesmas - use água com sabão',
            medicinal: 'Propriedades calmantes e digestivas'
        },
        'rucula': {
            nome_cientifico: 'Eruca sativa',
            categoria: 'hortaliça',
            plantio: 'Sementes superficiais, solo bem drenado',
            colheita: '30-40 dias, corte folhas jovens',
            cuidados: 'Sol parcial, rega regular, colher antes do florescimento',
            nutricao: 'Rica em vitamina K, ferro e antioxidantes',
            receitas: 'Saladas, pizzas, sanduíches, pesto',
            pragas: 'Pulgões - plante manjericão próximo',
            medicinal: 'Estimula digestão e fortalece ossos'
        },
        'espinafre': {
            nome_cientifico: 'Spinacia oleracea',
            categoria: 'hortaliça',
            plantio: 'Sementes a 2cm, solo rico e bem drenado',
            colheita: '50-70 dias, corte folhas externas',
            cuidados: 'Prefere clima fresco, rega constante',
            nutricao: 'Rico em ferro, ácido fólico e vitamina K',
            receitas: 'Refogados, sucos, tortas, lasanhas',
            pragas: 'Míldio - evite molhar folhas',
            medicinal: 'Combate anemia, fortalece músculos'
        },
        'couve': {
            nome_cientifico: 'Brassica oleracea',
            categoria: 'hortaliça',
            plantio: 'Mudas em covas de 30cm, solo rico',
            colheita: '70-90 dias, corte folhas externas',
            cuidados: 'Sol pleno, rega regular, adubação mensal',
            nutricao: 'Rica em vitamina C, cálcio e ferro',
            receitas: 'Refogados, sucos, chips, farofa',
            pragas: 'Lagartas - catação manual ou Bt',
            medicinal: 'Anti-inflamatória, fortalece imunidade'
        },
        
        // Frutas
        'tomate': {
            nome_cientifico: 'Solanum lycopersicum',
            categoria: 'fruta',
            plantio: 'Mudas em covas profundas, com suporte',
            colheita: '80-120 dias, quando bem vermelho',
            cuidados: 'Sol pleno, rega regular, retire brotos laterais',
            nutricao: 'Rico em licopeno, vitamina C, antioxidante natural',
            receitas: 'Molhos, saladas, conservas, tomate seco',
            pragas: 'Broca, pulgão - rotação de culturas',
            medicinal: 'Antioxidante, previne câncer'
        },
        'pimentao': {
            nome_cientifico: 'Capsicum annuum',
            categoria: 'fruta',
            plantio: 'Mudas em local protegido, solo bem drenado',
            colheita: '90-120 dias, quando firme e colorido',
            cuidados: 'Sol pleno, rega moderada, tutoramento',
            nutricao: 'Rico em vitamina C, betacaroteno',
            receitas: 'Refogados, saladas, conservas, recheados',
            pragas: 'Mosca-branca - armadilhas amarelas',
            medicinal: 'Antioxidante, fortalece imunidade'
        },
        
        // Ervas e Temperos
        'manjericao': {
            nome_cientifico: 'Ocimum basilicum',
            categoria: 'erva',
            plantio: 'Sementes superficiais, solo bem drenado',
            colheita: '30-40 dias, corte folhas pela manhã',
            cuidados: 'Sol pleno, rega moderada, corte flores',
            nutricao: 'Rico em vitamina K, propriedades anti-inflamatórias',
            receitas: 'Pesto, tempero para massas, chás medicinais',
            pragas: 'Ácaros - aumente umidade do ar',
            medicinal: 'Digestivo, calmante, anti-inflamatório'
        },
        'cebolinha': {
            nome_cientifico: 'Allium schoenoprasum',
            categoria: 'tempero',
            plantio: 'Sementes ou mudas, qualquer tipo de solo',
            colheita: '60-80 dias, corte folhas regularmente',
            cuidados: 'Sol parcial, rega regular, divisão de touceiras',
            nutricao: 'Rica em vitamina C, folato e antioxidantes',
            receitas: 'Temperos, saladas, omeletes, sopas',
            pragas: 'Tripes - pulverize com água',
            medicinal: 'Fortalece imunidade, digestiva'
        },
        'salsinha': {
            nome_cientifico: 'Petroselinum crispum',
            categoria: 'tempero',
            plantio: 'Sementes em solo rico, germinação lenta',
            colheita: '70-90 dias, corte folhas externas',
            cuidados: 'Sol parcial, rega constante, solo úmido',
            nutricao: 'Rica em vitamina C, ferro e ácido fólico',
            receitas: 'Temperos, molhos, sucos, tabule',
            pragas: 'Pulgões - água com sabão neutro',
            medicinal: 'Diurética, rica em antioxidantes'
        },
        'coentro': {
            nome_cientifico: 'Coriandrum sativum',
            categoria: 'tempero',
            plantio: 'Sementes direto no local, solo bem drenado',
            colheita: '40-60 dias, corte folhas jovens',
            cuidados: 'Sol parcial, rega moderada, não transplante',
            nutricao: 'Rico em vitamina K, antioxidantes',
            receitas: 'Temperos, molhos, pratos orientais',
            pragas: 'Pulgões - consórcio com manjericão',
            medicinal: 'Digestivo, anti-inflamatório'
        },
        
        // Legumes
        'cenoura': {
            nome_cientifico: 'Daucus carota',
            categoria: 'legume',
            plantio: 'Sementes em solo profundo e solto',
            colheita: '90-120 dias, quando raiz estiver desenvolvida',
            cuidados: 'Sol pleno, rega regular, solo sem pedras',
            nutricao: 'Rica em betacaroteno, vitamina A',
            receitas: 'Saladas, sucos, bolos, refogados',
            pragas: 'Mosca-da-cenoura - cobertura do solo',
            medicinal: 'Melhora visão, pele saudável'
        },
        'beterraba': {
            nome_cientifico: 'Beta vulgaris',
            categoria: 'legume',
            plantio: 'Sementes em solo profundo, bem drenado',
            colheita: '90-120 dias, quando raiz estiver firme',
            cuidados: 'Sol pleno, rega regular, desbaste necessário',
            nutricao: 'Rica em folato, nitrato natural',
            receitas: 'Saladas, sucos, conservas, folhas refogadas',
            pragas: 'Míldio - evite excesso de umidade',
            medicinal: 'Melhora circulação, energia natural'
        },
        'rabanete': {
            nome_cientifico: 'Raphanus sativus',
            categoria: 'legume',
            plantio: 'Sementes em solo solto, bem drenado',
            colheita: '25-35 dias, crescimento rápido',
            cuidados: 'Sol parcial, rega regular, colha cedo',
            nutricao: 'Rico em vitamina C, fibras',
            receitas: 'Saladas, conservas, folhas refogadas',
            pragas: 'Lesmas - armadilhas com cerveja',
            medicinal: 'Digestivo, desintoxicante'
        }
    };

    // Sistema de respostas inteligentes expandido - 100+ fluxos
    const respostasInteligentes = {
        // Saudações e apresentação
        'ola|oi|bom dia|boa tarde|boa noite|hey|hello': [
            'Olá! 😊 Sou o Futuzinho! Como posso te ajudar hoje?',
            'Oi! 🌱 Pronto para aprender sobre sustentabilidade?',
            'Olá! Que bom te ver aqui! O que você gostaria de cultivar?',
            'Oi! 👋 Vamos juntos construir um futuro mais verde?'
        ],

        'quem.*voce|o que.*voce|voce.*quem': [
            'Sou o Goat! 🤖 Seu assistente virtual especialista em hortas, alimentação saudável e sustentabilidade!',
            'Me chamo Goat! Estou aqui para te ajudar com cultivo, receitas e vida sustentável! 🌱',
            'Sou seu guia verde! Posso te ensinar sobre plantas, nutrição e como aproveitar melhor os alimentos! 🌿'
        ],

        'ajuda|help|socorro|nao sei': [
            'Claro! Posso te ajudar com: 🌱 Cultivo de plantas, 🍽️ Receitas sustentáveis, 💚 Nutrição, 🏆 Gamificação. O que te interessa?',
            'Estou aqui para isso! Me pergunte sobre qualquer planta, receita ou dica de sustentabilidade! 😊',
            'Sem problemas! Sou especialista em hortas, alimentação e aproveitamento de alimentos. Como posso ajudar?'
        ],

        // Cultivo específico por planta
        'alface': () => {
            const info = plantasDatabase.alface;
            return `🥬 **Alface (${info.nome_cientifico})**\n\n**Plantio:** ${info.plantio}\n**Colheita:** ${info.colheita}\n**Cuidados:** ${info.cuidados}\n**Nutrição:** ${info.nutricao}\n**Receitas:** ${info.receitas}\n\nQuer saber sobre pragas ou outras plantas? 🌱`;
        },

        'tomate': () => {
            const info = plantasDatabase.tomate;
            return `🍅 **Tomate (${info.nome_cientifico})**\n\n**Plantio:** ${info.plantio}\n**Colheita:** ${info.colheita}\n**Cuidados:** ${info.cuidados}\n**Nutrição:** ${info.nutricao}\n**Receitas:** ${info.receitas}\n\nPosso te ensinar sobre pragas do tomate também! 🐛`;
        },

        'manjericao|manjericão': () => {
            const info = plantasDatabase.manjericao;
            return `🌿 **Manjericão (${info.nome_cientifico})**\n\n**Plantio:** ${info.plantio}\n**Colheita:** ${info.colheita}\n**Cuidados:** ${info.cuidados}\n**Medicinal:** ${info.medicinal}\n**Receitas:** ${info.receitas}\n\nO manjericão também repele insetos! Quer saber mais? 🦟`;
        },

        'cebolinha': () => {
            const info = plantasDatabase.cebolinha;
            return `🧅 **Cebolinha (${info.nome_cientifico})**\n\n**Plantio:** ${info.plantio}\n**Colheita:** ${info.colheita}\n**Cuidados:** ${info.cuidados}\n**Nutrição:** ${info.nutricao}\n\nÉ uma das mais fáceis de cultivar! Quer outras plantas fáceis? 🌱`;
        },

        // Receitas de aproveitamento
        'casca.*banana|banana.*casca': () => 'Bolo de casca de banana: Bata 3 cascas com 2 ovos e 1/2 xícara de óleo, misture 2 xícaras de farinha e 1 xícara de açúcar, asse 40min a 180°C 🍌\n\nTambém pode fazer vitamina ou doce! Quer mais receitas sustentáveis?',

        'talo.*couve|couve.*talo': () => 'Refogado de talo de couve: Pique os talos, refogue com alho e cebola, tempere com sal e pimenta. Rico em fibras! 🥬\n\nOs talos têm mais nutrientes que as folhas! Quer outras receitas de talos?',

        'casca.*batata|batata.*casca': () => 'Chips de casca de batata: Lave bem, tempere com sal e azeite, leve ao forno 200°C por 15-20min até dourar 🥔\n\nTambém pode fazer purê ou sopa! Quer mais aproveitamento integral?',

        'sobras.*arroz|arroz.*sobra': () => 'Bolinho de arroz: Misture arroz frio com ovo, temperos e farinha, frite em bolinhas. Delicioso! 🍚\n\nTambém pode fazer arroz de forno ou risoto! Quer mais ideias?',

        // Educação nutricional
        'anemia|ferro': () => 'Para anemia, consuma: 🥬 Espinafre, couve, 🫘 Feijão, lentilha, 🥩 Carnes magras. Combine com vitamina C (limão, laranja) para melhor absorção! 💪\n\nQuer receitas ricas em ferro?',

        'vitamina.*c|imunidade': () => 'Alimentos ricos em vitamina C: 🍊 Laranja, limão, 🥝 Kiwi, 🫑 Pimentão, 🥬 Couve, 🍓 Morango. Fortalecem sua imunidade! 🛡️\n\nQuer uma receita de suco natural?',

        'calcio|ossos': () => 'Para ossos fortes: 🥬 Couve, brócolis, 🥛 Leite, queijo, 🐟 Sardinha, 🥜 Gergelim. O cálcio vegetal é bem absorvido! 🦴\n\nQuer dicas de como aumentar absorção?',

        'digestao|intestino': () => 'Para boa digestão: 🍌 Banana, 🥕 Cenoura, 🌿 Hortelã, 🫚 Gengibre, 🥒 Pepino. Fibras e probióticos são essenciais! 🌱\n\nQuer receitas digestivas?',

        // Pragas e problemas
        'pulgao|pulgões|insetos': () => 'Para pulgões naturalmente: 🧼 Água com sabão neutro (1:10), 🌿 Plante manjericão como repelente, 🐞 Atraia joaninhas!\n\nTambém funciona: óleo de neem e calda de fumo. Quer a receita?',

        'lesmas|caracois': () => 'Contra lesmas: 🍺 Armadilhas com cerveja, ☕ Borra de café ao redor das plantas, 🥚 Cascas de ovo trituradas como barreira\n\nColeta manual à noite também funciona! Quer mais dicas orgânicas?',

        'formigas': () => 'Repelir formigas: 🌿 Canela em pó, 🍋 Casca de limão, ☕ Borra de café, 🧄 Alho plantado próximo\n\nEvite inseticidas químicos! Quer outras soluções naturais?',

        'planta.*murchando|murcha|folhas.*amarelas': () => 'Folhas murchas podem indicar: 💧 Falta ou excesso de água, ☀️ Sol demais, 🦠 Pragas, 🌱 Falta de nutrientes\n\nQual planta está afetada? Posso dar dicas específicas! 🔍',

        // Horta escolar e educação
        'escola|criança|educação|professor': () => 'Horta escolar é incrível! 👨‍🏫 Plantas fáceis: alface, rabanete, manjericão\n\n**Atividades:** plantio, medição, colheita, receitas, compostagem\n\n**Benefícios:** responsabilidade, ciência prática, alimentação saudável! 📚\n\nQuer um plano de aula?',

        'atividade.*criança|criança.*horta': () => 'Atividades para crianças: 🌱 Plantio de feijão no algodão, 📏 Medir crescimento das plantas, 🎨 Desenhar ciclo de vida, 🍽️ Cozinhar com a colheita\n\nFaça canteiros baixos e plantas coloridas! Quer mais ideias?',

        // Gamificação e motivação
        'pontos|emblemas|desafios|recompensas': () => 'No nosso sistema: 🏆 +50 pontos por horta cadastrada, +100 por colheita, +25 por dica compartilhada!\n\n**Emblemas:** 🌱 Primeiro Passo, 🌿 Cultivador, 🏆 Mestre da Horta\n\nQual seu próximo objetivo? 🎯',

        'como.*ganhar.*pontos|pontos.*como': () => 'Formas de ganhar pontos: 🌱 Cadastrar horta (+50), 🌾 Registrar colheita (+100), 💡 Compartilhar dica (+25), 💬 Ajudar no chat (+10)\n\nTambém temos desafios especiais! Quer participar? 🏆',

        // Sustentabilidade e meio ambiente
        'compostagem|adubo.*organico': () => 'Compostagem caseira: Misture restos orgânicos (cascas, folhas) com material seco (folhas secas, papel)\n\n🔄 Vire a cada 15 dias\n⏰ Em 3 meses: adubo natural!\n\nEvite: carne, laticínios, óleos. Quer começar? 🌱',

        'sustentabilidade|meio.*ambiente': () => 'Práticas sustentáveis: ♻️ Compostagem, 💧 Captação de água da chuva, 🌱 Horta orgânica, 🍽️ Aproveitamento integral\n\n**Impacto:** Menos lixo, mais saúde, economia! 🌍\n\nQual prática quer começar?',

        'agua.*chuva|captacao.*agua': () => 'Captação de água da chuva: 🏠 Calhas direcionadas para reservatório, 🪣 Baldes sob goteiras, 🌧️ Use para regar plantas\n\n**Dica:** Deixe a primeira água escoar (limpa o telhado). Quer fazer um sistema?',

        // Estados emocionais e motivação
        'triste|desanimado|deprimido': () => 'Ei, tudo bem? 🤗 Que tal plantar algo hoje? Cuidar de plantas traz paz e alegria!\n\n🌱 Comece com manjericão ou cebolinha - são fáceis e crescem rápido!\n\nPosso te ajudar a começar uma hortinha? 💚',

        'fome|com.*fome': () => 'Com fome? 🍽️ Que tal uma receita rápida com o que você tem em casa?\n\n**Sugestões:** Omelete com cebolinha, salada com o que tiver, suco de cascas\n\nPosso sugerir pratos com sobras! Zero desperdício! ♻️',

        'cansado|estressado': () => 'Que tal relaxar cuidando de plantas? 🌿 É terapêutico!\n\n**Plantas calmantes:** Manjericão, hortelã, lavanda\n\nFaça um chá ou apenas cheire as folhas. A natureza acalma! 😌',

        // Dicas diárias e sugestões
        'dica|sugestão|conselho': () => {
            const dicas = [
                '💡 Dica do dia: Regue plantas pela manhã cedo ou final da tarde. Evita evaporação e fungos! 🌅',
                '🌱 Hoje plante: Manjericão! Cresce rápido, repele insetos e tempera tudo! Que tal? 🌿',
                '♻️ Sustentabilidade: Use cascas de ovo trituradas como adubo natural. Rico em cálcio! 🥚',
                '🍽️ Aproveitamento: Talos de couve são mais nutritivos que as folhas! Refogue com alho! 🥬',
                '🌧️ Economia: Água da chuva é perfeita para plantas. Colete em baldes! 💧'
            ];
            return dicas[Math.floor(Math.random() * dicas.length)] + '\n\nQuer mais dicas?';
        },

        'receita.*dia|receita.*hoje': () => {
            const receitas = [
                '🥗 Salada de talos: Pique talos de couve, cenoura e beterraba. Tempere com limão e azeite!',
                '🍌 Vitamina de casca: Bata casca de maçã com banana e água. Rico em fibras!',
                '🥔 Chips de casca: Cascas de batata temperadas no forno. Crocante e saudável!',
                '🌿 Pesto de folhas: Use folhas de cenoura, beterraba ou rabanete no lugar do manjericão!'
            ];
            return receitas[Math.floor(Math.random() * receitas.length)] + '\n\nQuer o passo a passo?';
        },

        // Suporte técnico
        'nao.*consigo|erro|problema|bug': () => 'Que problema você está enfrentando? 🤔\n\n**Posso ajudar com:**\n- Cadastro no site\n- Navegação nas páginas\n- Dúvidas sobre funcionalidades\n\nDescreva o que está acontecendo!',

        'cadastro|registrar|login': () => 'Para se cadastrar: 📝 Clique em "Registrar" no menu, preencha seus dados e comece a ganhar pontos!\n\n**Benefícios:** Acompanhar hortas, ganhar emblemas, participar da comunidade! 🏆\n\nPrecisa de ajuda com algum passo?',

        // Projeto e ODS
        'projeto|alimentando.*futuro|ods': () => 'O Alimentando o Futuro combate insegurança alimentar através de: 🌱 Hortas comunitárias, ♻️ Aproveitamento integral, 📚 Educação nutricional\n\n**ODS 3:** Saúde e Bem-Estar para todos! 🌍\n\nQuer participar da nossa missão?',

        'ods.*3|saude.*bem.*estar': () => 'ODS 3 - Saúde e Bem-Estar: Garantir vida saudável e promover bem-estar para todos! 💚\n\n**Nossa contribuição:** Alimentação saudável, hortas comunitárias, educação nutricional\n\nJuntos construímos um futuro mais saudável! 🌱',

        // Respostas padrão
        'obrigado|obrigada|valeu|thanks': () => 'Por nada! 😊 Fico feliz em ajudar! Sempre que precisar, estarei aqui! 🌱\n\nQue tal plantar algo hoje?',

        'tchau|ate.*logo|bye|adeus': () => 'Até logo! 👋 Continue cultivando um futuro mais verde! 🌱\n\nVolte sempre que precisar de dicas! 😊',

        'default': [
            'Hmm, não entendi bem... 🤔 Pode reformular? Ou me pergunte sobre plantas, receitas ou nutrição! 🌱',
            'Desculpa, ainda estou aprendendo! 🤖 Que tal me perguntar sobre cultivo ou aproveitamento de alimentos? 🍽️',
            'Não tenho certeza sobre isso... Posso te ajudar com hortas, receitas sustentáveis ou dicas de cultivo! 🌿',
            'Essa é nova para mim! 😅 Mas posso te ensinar sobre plantas, nutrição ou sustentabilidade! Que tal?'
        ]
    };

    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();
        
        // Busca por padrões específicos
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
        
        // Resposta padrão
        const defaultResponses = respostasInteligentes.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage = { id: Date.now(), text: inputText, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        
        // Salva interação para análise
        const interacao = {
            pergunta: inputText,
            timestamp: new Date().toISOString(),
            sessao: Date.now()
        };
        
        const interacoes = JSON.parse(localStorage.getItem('chatbotInteracoes') || '[]');
        interacoes.push(interacao);
        localStorage.setItem('chatbotInteracoes', JSON.stringify(interacoes));
        
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

    // Carrega árvore de decisões do arquivo JSON
    const [chatFlows, setChatFlows] = useState({});
    
    useEffect(() => {
        import('./chatFlows.json')
            .then(data => setChatFlows(data.default))
            .catch(err => console.log('Erro ao carregar chatFlows:', err));
    }, []);
    
    const getCategorias = () => {
        if (!chatFlows.ConversasInteligentes) return [];
        return Object.keys(chatFlows.ConversasInteligentes);
    };
    
    const getPerguntas = (categoria) => {
        if (!chatFlows.ConversasInteligentes || !chatFlows.ConversasInteligentes[categoria]) return [];
        return Object.keys(chatFlows.ConversasInteligentes[categoria]);
    };
    
    const sugestoesPredefinidas = getCategorias().slice(0, 3);

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
                        width: '380px',
                        height: '500px',
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
                        🤖 Goat - Seu Assistente Verde Inteligente
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
                                        maxWidth: '85%',
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
                                    Goat digitando... 🌱
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Categorias da árvore de decisões */}
                    {messages.length <= 2 && (
                        <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                            <small style={{ color: '#666', marginBottom: '5px', display: 'block' }}>Categorias:</small>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {getCategorias().slice(0, 3).map((categoria, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            const perguntas = getPerguntas(categoria);
                                            const perguntaAleatoria = perguntas[Math.floor(Math.random() * perguntas.length)];
                                            setInputText(perguntaAleatoria || categoria);
                                        }}
                                        style={{
                                            fontSize: '10px',
                                            padding: '4px 6px',
                                            backgroundColor: '#e9ecef',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '12px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {categoria}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

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