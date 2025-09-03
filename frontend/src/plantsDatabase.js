// Base de conhecimento com 100 plantas organizadas por categoria
export const plantsDatabase = {
  "hortalicas_legumes": [
    { id: 1, nome: "Alface", cientifico: "Lactuca sativa", dificuldade: "Fácil", tempo: "45-60 dias", cuidados: "Rega diária, sol parcial, solo úmido", dicas: "Plante em local com sombra parcial. Regue pela manhã." },
    { id: 2, nome: "Tomate", cientifico: "Solanum lycopersicum", dificuldade: "Médio", tempo: "80-120 dias", cuidados: "Sol pleno, rega regular, suporte", dicas: "Use estacas para apoiar. Retire brotos laterais." },
    { id: 3, nome: "Cenoura", cientifico: "Daucus carota", dificuldade: "Médio", tempo: "90-120 dias", cuidados: "Sol pleno, solo profundo e solto", dicas: "Solo sem pedras para raízes retas." },
    { id: 4, nome: "Beterraba", cientifico: "Beta vulgaris", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, rega regular", dicas: "Folhas também são comestíveis." },
    { id: 5, nome: "Couve", cientifico: "Brassica oleracea", dificuldade: "Fácil", tempo: "70-90 dias", cuidados: "Sol pleno, rega regular", dicas: "Corte folhas externas para rebrota." },
    { id: 6, nome: "Rúcula", cientifico: "Eruca sativa", dificuldade: "Fácil", tempo: "30-40 dias", cuidados: "Sol parcial, rega regular", dicas: "Colha antes do florescimento." },
    { id: 7, nome: "Espinafre", cientifico: "Spinacia oleracea", dificuldade: "Fácil", tempo: "50-70 days", cuidados: "Sol parcial, clima fresco", dicas: "Prefere temperaturas amenas." },
    { id: 8, nome: "Pimentão", cientifico: "Capsicum annuum", dificuldade: "Médio", tempo: "90-120 dias", cuidados: "Sol pleno, rega moderada", dicas: "Colha quando bem colorido." },
    { id: 9, nome: "Abobrinha", cientifico: "Cucurbita pepo", dificuldade: "Fácil", tempo: "50-60 dias", cuidados: "Sol pleno, espaço amplo", dicas: "Colha jovem para melhor sabor." },
    { id: 10, nome: "Pepino", cientifico: "Cucumis sativus", dificuldade: "Médio", tempo: "60-70 dias", cuidados: "Sol pleno, treliça", dicas: "Use suporte vertical." },
    { id: 11, nome: "Berinjela", cientifico: "Solanum melongena", dificuldade: "Médio", tempo: "100-120 dias", cuidados: "Sol pleno, calor", dicas: "Precisa de clima quente." },
    { id: 12, nome: "Chuchu", cientifico: "Sechium edule", dificuldade: "Fácil", tempo: "120-150 dias", cuidados: "Sol pleno, treliça forte", dicas: "Planta trepadeira vigorosa." },
    { id: 13, nome: "Quiabo", cientifico: "Abelmoschus esculentus", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol pleno, calor", dicas: "Colha vagens jovens." },
    { id: 14, nome: "Inhame", cientifico: "Colocasia esculenta", dificuldade: "Médio", tempo: "180-240 dias", cuidados: "Solo úmido, sombra parcial", dicas: "Gosta de umidade constante." },
    { id: 15, nome: "Batata-doce", cientifico: "Ipomoea batatas", dificuldade: "Fácil", tempo: "120-150 dias", cuidados: "Sol pleno, solo bem drenado", dicas: "Folhas também são comestíveis." },
    { id: 16, nome: "Mandioca", cientifico: "Manihot esculenta", dificuldade: "Fácil", tempo: "300-360 dias", cuidados: "Sol pleno, resistente à seca", dicas: "Muito resistente e nutritiva." },
    { id: 17, nome: "Batata inglesa", cientifico: "Solanum tuberosum", dificuldade: "Médio", tempo: "90-120 dias", cuidados: "Sol pleno, clima fresco", dicas: "Amontoe terra sobre as plantas." },
    { id: 18, nome: "Abóbora", cientifico: "Cucurbita moschata", dificuldade: "Fácil", tempo: "120-150 dias", cuidados: "Sol pleno, espaço amplo", dicas: "Precisa de muito espaço." },
    { id: 19, nome: "Nabo", cientifico: "Brassica rapa", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol pleno, solo solto", dicas: "Folhas também são nutritivas." },
    { id: 20, nome: "Acelga", cientifico: "Beta vulgaris var. cicla", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol parcial, rega regular", dicas: "Corte folhas externas." },
    { id: 21, nome: "Almeirão", cientifico: "Cichorium intybus", dificuldade: "Fácil", tempo: "70-90 dias", cuidados: "Sol parcial, solo rico", dicas: "Ligeiramente amargo, muito nutritivo." },
    { id: 22, nome: "Cebolinha", cientifico: "Allium fistulosum", dificuldade: "Muito Fácil", tempo: "60-80 dias", cuidados: "Sol parcial, rega regular", dicas: "Corte apenas as pontas." },
    { id: 23, nome: "Salsa", cientifico: "Petroselinum crispum", dificuldade: "Fácil", tempo: "70-90 dias", cuidados: "Sol parcial, rega moderada", dicas: "Germinação lenta, seja paciente." },
    { id: 24, nome: "Cebola", cientifico: "Allium cepa", dificuldade: "Médio", tempo: "120-150 days", cuidados: "Sol pleno, solo bem drenado", dicas: "Plante mudas para melhor resultado." },
    { id: 25, nome: "Alho", cientifico: "Allium sativum", dificuldade: "Médio", tempo: "180-240 dias", cuidados: "Sol pleno, clima fresco", dicas: "Plante dentes no outono." }
  ],
  "frutas": [
    { id: 26, nome: "Banana", cientifico: "Musa spp.", dificuldade: "Médio", tempo: "12-18 meses", cuidados: "Sol pleno, muita água", dicas: "Precisa de clima tropical." },
    { id: 27, nome: "Maçã", cientifico: "Malus domestica", dificuldade: "Difícil", tempo: "3-5 anos", cuidados: "Sol pleno, clima temperado", dicas: "Precisa de frio no inverno." },
    { id: 28, nome: "Laranja", cientifico: "Citrus sinensis", dificuldade: "Médio", tempo: "3-4 anos", cuidados: "Sol pleno, rega regular", dicas: "Pode ser cultivada em vaso grande." },
    { id: 29, nome: "Limão", cientifico: "Citrus limon", dificuldade: "Fácil", tempo: "2-3 anos", cuidados: "Sol pleno, rega moderada", dicas: "Muito produtivo em vasos." },
    { id: 30, nome: "Manga", cientifico: "Mangifera indica", dificuldade: "Médio", tempo: "3-5 anos", cuidados: "Sol pleno, clima quente", dicas: "Árvore de grande porte." },
    { id: 31, nome: "Mamão", cientifico: "Carica papaya", dificuldade: "Fácil", tempo: "8-12 meses", cuidados: "Sol pleno, rega regular", dicas: "Crescimento rápido." },
    { id: 32, nome: "Goiaba", cientifico: "Psidium guajava", dificuldade: "Fácil", tempo: "2-3 anos", cuidados: "Sol pleno, resistente", dicas: "Muito resistente e produtiva." },
    { id: 33, nome: "Abacaxi", cientifico: "Ananas comosus", dificuldade: "Médio", tempo: "18-24 meses", cuidados: "Sol pleno, pouca água", dicas: "Plante a coroa do abacaxi." },
    { id: 34, nome: "Abacate", cientifico: "Persea americana", dificuldade: "Médio", tempo: "3-4 anos", cuidados: "Sol pleno, rega moderada", dicas: "Árvore de médio porte." },
    { id: 35, nome: "Melancia", cientifico: "Citrullus lanatus", dificuldade: "Médio", tempo: "90-120 dias", cuidados: "Sol pleno, muito espaço", dicas: "Precisa de espaço amplo." },
    { id: 36, nome: "Melão", cientifico: "Cucumis melo", dificuldade: "Médio", tempo: "90-120 dias", cuidados: "Sol pleno, rega controlada", dicas: "Reduza água próximo à colheita." },
    { id: 37, nome: "Morango", cientifico: "Fragaria × ananassa", dificuldade: "Fácil", tempo: "60-90 dias", cuidados: "Sol parcial, rega regular", dicas: "Ótimo para vasos suspensos." },
    { id: 38, nome: "Uva", cientifico: "Vitis vinifera", dificuldade: "Médio", tempo: "2-3 anos", cuidados: "Sol pleno, poda regular", dicas: "Precisa de suporte para trepar." },
    { id: 39, nome: "Jabuticaba", cientifico: "Plinia cauliflora", dificuldade: "Médio", tempo: "8-15 anos", cuidados: "Sol parcial, rega regular", dicas: "Frutos nascem no tronco." },
    { id: 40, nome: "Pera", cientifico: "Pyrus communis", dificuldade: "Difícil", tempo: "3-5 anos", cuidados: "Sol pleno, clima temperado", dicas: "Precisa de frio no inverno." },
    { id: 41, nome: "Pêssego", cientifico: "Prunus persica", dificuldade: "Médio", tempo: "2-3 anos", cuidados: "Sol pleno, poda anual", dicas: "Faça poda de formação." },
    { id: 42, nome: "Maracujá", cientifico: "Passiflora edulis", dificuldade: "Fácil", tempo: "8-12 meses", cuidados: "Sol pleno, treliça", dicas: "Trepadeira vigorosa." },
    { id: 43, nome: "Acerola", cientifico: "Malpighia emarginata", dificuldade: "Fácil", tempo: "1-2 anos", cuidados: "Sol pleno, rega moderada", dicas: "Rica em vitamina C." },
    { id: 44, nome: "Caju", cientifico: "Anacardium occidentale", dificuldade: "Médio", tempo: "3-5 anos", cuidados: "Sol pleno, clima quente", dicas: "Árvore de grande porte." },
    { id: 45, nome: "Figo", cientifico: "Ficus carica", dificuldade: "Fácil", tempo: "1-2 anos", cuidados: "Sol pleno, rega moderada", dicas: "Pode ser podada para controlar tamanho." },
    { id: 46, nome: "Pitanga", cientifico: "Eugenia uniflora", dificuldade: "Fácil", tempo: "2-3 anos", cuidados: "Sol pleno, resistente", dicas: "Nativa do Brasil, muito resistente." },
    { id: 47, nome: "Kiwi", cientifico: "Actinidia deliciosa", dificuldade: "Difícil", tempo: "3-5 anos", cuidados: "Sol parcial, clima temperado", dicas: "Precisa de macho e fêmea." },
    { id: 48, nome: "Tamarindo", cientifico: "Tamarindus indica", dificuldade: "Médio", tempo: "5-8 anos", cuidados: "Sol pleno, resistente à seca", dicas: "Árvore de grande porte." },
    { id: 49, nome: "Carambola", cientifico: "Averrhoa carambola", dificuldade: "Fácil", tempo: "2-3 anos", cuidados: "Sol pleno, rega regular", dicas: "Frutos em formato de estrela." },
    { id: 50, nome: "Romã", cientifico: "Punica granatum", dificuldade: "Fácil", tempo: "2-3 anos", cuidados: "Sol pleno, pouca água", dicas: "Resistente à seca." }
  ],
  "ervas_temperos": [
    { id: 51, nome: "Manjericão", cientifico: "Ocimum basilicum", dificuldade: "Fácil", tempo: "30-40 dias", cuidados: "Sol pleno, rega moderada", dicas: "Corte flores para manter folhas saborosas." },
    { id: 52, nome: "Hortelã", cientifico: "Mentha spp.", dificuldade: "Muito Fácil", tempo: "30-45 dias", cuidados: "Sol parcial, rega frequente", dicas: "Plante em vaso separado, se espalha muito." },
    { id: 53, nome: "Alecrim", cientifico: "Rosmarinus officinalis", dificuldade: "Fácil", tempo: "60-90 dias", cuidados: "Sol pleno, pouca água", dicas: "Resistente à seca." },
    { id: 54, nome: "Tomilho", cientifico: "Thymus vulgaris", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol pleno, solo bem drenado", dicas: "Pequeno arbusto aromático." },
    { id: 55, nome: "Orégano", cientifico: "Origanum vulgare", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol pleno, rega moderada", dicas: "Pode ser seco para conservar." },
    { id: 56, nome: "Louro", cientifico: "Laurus nobilis", dificuldade: "Médio", tempo: "120-180 dias", cuidados: "Sol parcial, rega moderada", dicas: "Árvore de crescimento lento." },
    { id: 57, nome: "Coentro", cientifico: "Coriandrum sativum", dificuldade: "Fácil", tempo: "40-50 dias", cuidados: "Sol parcial, rega moderada", dicas: "Não gosta de transplante." },
    { id: 58, nome: "Erva-doce", cientifico: "Foeniculum vulgare", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, rega regular", dicas: "Sementes também são aromáticas." },
    { id: 59, nome: "Sálvia", cientifico: "Salvia officinalis", dificuldade: "Fácil", tempo: "60-90 dias", cuidados: "Sol pleno, pouca água", dicas: "Folhas aveludadas aromáticas." },
    { id: 60, nome: "Cúrcuma", cientifico: "Curcuma longa", dificuldade: "Médio", tempo: "240-300 dias", cuidados: "Sol parcial, rega regular", dicas: "Rizoma amarelo medicinal." },
    { id: 61, nome: "Gengibre", cientifico: "Zingiber officinale", dificuldade: "Médio", tempo: "240-300 dias", cuidados: "Sol parcial, solo úmido", dicas: "Plante rizoma fresco." },
    { id: 62, nome: "Camomila", cientifico: "Matricaria chamomilla", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol pleno, rega moderada", dicas: "Flores para chá calmante." },
    { id: 63, nome: "Capim-limão", cientifico: "Cymbopogon citratus", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, rega regular", dicas: "Chá digestivo e calmante." },
    { id: 64, nome: "Boldo", cientifico: "Peumus boldus", dificuldade: "Médio", tempo: "180-240 dias", cuidados: "Sol parcial, rega moderada", dicas: "Folhas para chá digestivo." },
    { id: 65, nome: "Alfavaca", cientifico: "Ocimum gratissimum", dificuldade: "Fácil", tempo: "40-60 dias", cuidados: "Sol pleno, rega regular", dicas: "Manjericão de folha grande." },
    { id: 66, nome: "Malva", cientifico: "Malva sylvestris", dificuldade: "Fácil", tempo: "60-90 days", cuidados: "Sol parcial, rega regular", dicas: "Folhas e flores medicinais." },
    { id: 67, nome: "Urtiga", cientifico: "Urtica dioica", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol parcial, solo rico", dicas: "Use luvas para colher." },
    { id: 68, nome: "Salsão", cientifico: "Apium graveolens", dificuldade: "Médio", tempo: "120-150 dias", cuidados: "Sol parcial, solo úmido", dicas: "Precisa de solo sempre úmido." },
    { id: 69, nome: "Estragão", cientifico: "Artemisia dracunculus", dificuldade: "Médio", tempo: "90-120 dias", cuidados: "Sol pleno, solo bem drenado", dicas: "Tempero francês clássico." },
    { id: 70, nome: "Cebolinha japonesa", cientifico: "Allium tuberosum", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol parcial, rega regular", dicas: "Sabor mais suave que cebolinha comum." }
  ],
  "cereais_leguminosas": [
    { id: 71, nome: "Milho", cientifico: "Zea mays", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, rega regular", dicas: "Plante em blocos para polinização." },
    { id: 72, nome: "Feijão carioca", cientifico: "Phaseolus vulgaris", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, suporte para trepar", dicas: "Fixa nitrogênio no solo." },
    { id: 73, nome: "Arroz", cientifico: "Oryza sativa", dificuldade: "Difícil", tempo: "120-150 dias", cuidados: "Solo alagado, muito trabalho", dicas: "Cultivo complexo, precisa de água." },
    { id: 74, nome: "Soja", cientifico: "Glycine max", dificuldade: "Médio", tempo: "120-150 dias", cuidados: "Sol pleno, rega regular", dicas: "Rica em proteína." },
    { id: 75, nome: "Grão-de-bico", cientifico: "Cicer arietinum", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, pouca água", dicas: "Resistente à seca." },
    { id: 76, nome: "Lentilha", cientifico: "Lens culinaris", dificuldade: "Fácil", tempo: "90-110 dias", cuidados: "Sol pleno, clima fresco", dicas: "Prefere temperaturas amenas." },
    { id: 77, nome: "Ervilha", cientifico: "Pisum sativum", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol pleno, suporte", dicas: "Plante no outono/inverno." },
    { id: 78, nome: "Quinoa", cientifico: "Chenopodium quinoa", dificuldade: "Médio", tempo: "120-150 dias", cuidados: "Sol pleno, altitude", dicas: "Prefere clima de altitude." },
    { id: 79, nome: "Linhaça", cientifico: "Linum usitatissimum", dificuldade: "Fácil", tempo: "90-110 dias", cuidados: "Sol pleno, clima fresco", dicas: "Sementes ricas em ômega-3." },
    { id: 80, nome: "Gergelim", cientifico: "Sesamum indicum", dificuldade: "Fácil", tempo: "90-120 days", cuidados: "Sol pleno, pouca água", dicas: "Resistente à seca." },
    { id: 81, nome: "Amendoim", cientifico: "Arachis hypogaea", dificuldade: "Fácil", tempo: "120-150 dias", cuidados: "Sol pleno, solo arenoso", dicas: "Flores se enterram no solo." },
    { id: 82, nome: "Castanha-do-pará", cientifico: "Bertholletia excelsa", dificuldade: "Muito Difícil", tempo: "15-20 anos", cuidados: "Floresta amazônica", dicas: "Árvore gigante da Amazônia." },
    { id: 83, nome: "Castanha de caju", cientifico: "Anacardium occidentale", dificuldade: "Médio", tempo: "3-5 anos", cuidados: "Sol pleno, clima quente", dicas: "Semente do caju." },
    { id: 84, nome: "Noz", cientifico: "Juglans regia", dificuldade: "Difícil", tempo: "5-8 anos", cuidados: "Sol pleno, clima temperado", dicas: "Precisa de frio no inverno." },
    { id: 85, nome: "Aveia", cientifico: "Avena sativa", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, clima fresco", dicas: "Cereal nutritivo." },
    { id: 86, nome: "Trigo", cientifico: "Triticum spp.", dificuldade: "Médio", tempo: "120-150 dias", cuidados: "Sol pleno, clima temperado", dicas: "Base da alimentação mundial." },
    { id: 87, nome: "Centeio", cientifico: "Secale cereale", dificuldade: "Fácil", tempo: "120-150 dias", cuidados: "Sol pleno, resistente ao frio", dicas: "Mais resistente que o trigo." },
    { id: 88, nome: "Cevada", cientifico: "Hordeum vulgare", dificuldade: "Fácil", tempo: "90-120 dias", cuidados: "Sol pleno, clima fresco", dicas: "Usado para fazer cerveja." },
    { id: 89, nome: "Chia", cientifico: "Salvia hispanica", dificuldade: "Fácil", tempo: "120-150 dias", cuidados: "Sol pleno, pouca água", dicas: "Sementes ricas em ômega-3." },
    { id: 90, nome: "Araruta", cientifico: "Maranta arundinacea", dificuldade: "Médio", tempo: "240-300 dias", cuidados: "Sol parcial, solo úmido", dicas: "Rizoma rico em amido." }
  ],
  "plantas_medicinais": [
    { id: 91, nome: "Babosa", cientifico: "Aloe vera", dificuldade: "Muito Fácil", tempo: "180-240 dias", cuidados: "Sol pleno, pouca água", dicas: "Gel das folhas é cicatrizante." },
    { id: 92, nome: "Guaco", cientifico: "Mikania glomerata", dificuldade: "Fácil", tempo: "120-180 dias", cuidados: "Sol parcial, rega regular", dicas: "Folhas para xarope de tosse." },
    { id: 93, nome: "Arnica", cientifico: "Arnica montana", dificuldade: "Difícil", tempo: "180-240 dias", cuidados: "Sol parcial, clima frio", dicas: "Flores para pomada anti-inflamatória." },
    { id: 94, nome: "Ginkgo biloba", cientifico: "Ginkgo biloba", dificuldade: "Difícil", tempo: "10-20 anos", cuidados: "Sol pleno, paciência", dicas: "Árvore milenar, folhas medicinais." },
    { id: 95, nome: "Calêndula", cientifico: "Calendula officinalis", dificuldade: "Fácil", tempo: "60-80 dias", cuidados: "Sol pleno, rega moderada", dicas: "Flores cicatrizantes." },
    { id: 96, nome: "Erva-cidreira", cientifico: "Melissa officinalis", dificuldade: "Fácil", tempo: "60-90 dias", cuidados: "Sol parcial, rega regular", dicas: "Chá calmante e digestivo." },
    { id: 97, nome: "Alcaçuz", cientifico: "Glycyrrhiza glabra", dificuldade: "Médio", tempo: "180-240 dias", cuidados: "Sol pleno, solo profundo", dicas: "Raiz adocicada medicinal." },
    { id: 98, nome: "Moringa", cientifico: "Moringa oleifera", dificuldade: "Fácil", tempo: "180-240 dias", cuidados: "Sol pleno, resistente", dicas: "Árvore da vida, muito nutritiva." },
    { id: 99, nome: "Carqueja", cientifico: "Baccharis trimera", dificuldade: "Fácil", tempo: "120-180 dias", cuidados: "Sol pleno, pouca água", dicas: "Chá digestivo e emagrecedor." },
    { id: 100, nome: "Jurubeba", cientifico: "Solanum paniculatum", dificuldade: "Fácil", tempo: "180-240 dias", cuidados: "Sol pleno, resistente", dicas: "Frutos para licor medicinal." }
  ]
};

export const getAllPlants = () => {
  const allPlants = [];
  Object.values(plantsDatabase).forEach(category => {
    allPlants.push(...category);
  });
  return allPlants;
};

export const getPlantsByCategory = (category) => {
  return plantsDatabase[category] || [];
};

export const searchPlants = (query) => {
  const allPlants = getAllPlants();
  return allPlants.filter(plant => 
    plant.nome.toLowerCase().includes(query.toLowerCase()) ||
    plant.cientifico.toLowerCase().includes(query.toLowerCase())
  );
};