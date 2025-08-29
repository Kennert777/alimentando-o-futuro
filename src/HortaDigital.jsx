// useState: Hook para gerenciar estado local
import { useState } from 'react';

// Componente da página Horta Digital - ensina cultivo de plantas
export default function HortaDigital() {
    // Estado para controlar qual planta está selecionada para mostrar detalhes
    const [plantaSelecionada, setPlantaSelecionada] = useState(null);
    
    // Array com 100 espécies de plantas para cultivo
    const plantas = [
        // 🍎 Frutas
        { id: 1, nome: "🍌 Banana", cientifico: "Musa paradisiaca", categoria: "Frutas", regionais: "Pacova, Caturra, Nanica" },
        { id: 2, nome: "🥭 Mamão", cientifico: "Carica papaya", categoria: "Frutas", regionais: "Leite, Papaia" },
        { id: 3, nome: "🍊 Laranja", cientifico: "Citrus sinensis", categoria: "Frutas", regionais: "Laranja-pera, Baía, Seleta" },
        { id: 4, nome: "🍋 Limão", cientifico: "Citrus limon", categoria: "Frutas", regionais: "Siciliano, Taiti, Galego" },
        { id: 5, nome: "🍈 Goiaba", cientifico: "Psidium guajava", categoria: "Frutas", regionais: "Araçá-goiaba" },
        { id: 6, nome: "🍍 Abacaxi", cientifico: "Ananas comosus", categoria: "Frutas", regionais: "Ananás" },
        { id: 7, nome: "🥭 Manga", cientifico: "Mangifera indica", categoria: "Frutas", regionais: "Espada, Palmer, Haden" },
        { id: 8, nome: "🥑 Abacate", cientifico: "Persea americana", categoria: "Frutas", regionais: "Pêra-avocado" },
        { id: 9, nome: "🍒 Pitanga", cientifico: "Eugenia uniflora", categoria: "Frutas", regionais: "Pitangueira" },
        { id: 10, nome: "🟡 Maracujá", cientifico: "Passiflora edulis", categoria: "Frutas", regionais: "Maracujá-azedo, Maracujá-doce" },
        
        // 🥦 Verduras & Legumes
        { id: 11, nome: "🥦 Brócolis", cientifico: "Brassica oleracea var. italica", categoria: "Verduras", regionais: "" },
        { id: 12, nome: "🥬 Repolho", cientifico: "Brassica oleracea var. capitata", categoria: "Verduras", regionais: "" },
        { id: 13, nome: "🥬 Espinafre", cientifico: "Spinacia oleracea", categoria: "Verduras", regionais: "" },
        { id: 14, nome: "🥬 Alface", cientifico: "Lactuca sativa", categoria: "Verduras", regionais: "Alface crespa, roxa, americana" },
        { id: 15, nome: "🥕 Cenoura", cientifico: "Daucus carota", categoria: "Verduras", regionais: "" },
        { id: 16, nome: "🧅 Cebola", cientifico: "Allium cepa", categoria: "Verduras", regionais: "" },
        { id: 17, nome: "🧄 Alho", cientifico: "Allium sativum", categoria: "Verduras", regionais: "" },
        { id: 18, nome: "🫑 Pimentão", cientifico: "Capsicum annuum", categoria: "Verduras", regionais: "Cambuci (var.)" },
        { id: 19, nome: "🌶️ Pimenta-malagueta", cientifico: "Capsicum frutescens", categoria: "Verduras", regionais: "Pimenta-de-cheiro" },
        { id: 20, nome: "🍅 Tomate", cientifico: "Solanum lycopersicum", categoria: "Verduras", regionais: "Tomate italiano, cereja" },
        
        // 🌽 Tubérculos & Raízes
        { id: 21, nome: "🍠 Mandioca", cientifico: "Manihot esculenta", categoria: "Tubérculos", regionais: "Macaxeira, Aipim" },
        { id: 22, nome: "🥔 Batata-inglesa", cientifico: "Solanum tuberosum", categoria: "Tubérculos", regionais: "Batatinha" },
        { id: 23, nome: "🍠 Batata-doce", cientifico: "Ipomoea batatas", categoria: "Tubérculos", regionais: "Batata-cara" },
        { id: 24, nome: "🍠 Inhame", cientifico: "Colocasia esculenta", categoria: "Tubérculos", regionais: "Taro, Cará-da-costa" },
        { id: 25, nome: "🍠 Cará", cientifico: "Dioscorea cayennensis", categoria: "Tubérculos", regionais: "Cara-roxo, Cara-branco" },
        { id: 26, nome: "🥔 Topinambo", cientifico: "Helianthus tuberosus", categoria: "Tubérculos", regionais: "Alcachofra-de-jerusalém" },
        { id: 27, nome: "🫚 Gengibre", cientifico: "Zingiber officinale", categoria: "Tubérculos", regionais: "" },
        { id: 28, nome: "🟡 Açafrão-da-terra", cientifico: "Curcuma longa", categoria: "Tubérculos", regionais: "Cúrcuma" },
        { id: 29, nome: "🟣 Beterraba", cientifico: "Beta vulgaris", categoria: "Tubérculos", regionais: "" },
        { id: 30, nome: "🤍 Pastinaga", cientifico: "Pastinaca sativa", categoria: "Tubérculos", regionais: "Cherivia" },
        
        // 🌿 Ervas & Condimentos
        { id: 31, nome: "🌿 Manjericão", cientifico: "Ocimum basilicum", categoria: "Ervas", regionais: "" },
        { id: 32, nome: "🌿 Salsa", cientifico: "Petroselinum crispum", categoria: "Ervas", regionais: "" },
        { id: 33, nome: "🌿 Coentro", cientifico: "Coriandrum sativum", categoria: "Ervas", regionais: "Daninho (região Sul)" },
        { id: 34, nome: "🌿 Orégano", cientifico: "Origanum vulgare", categoria: "Ervas", regionais: "" },
        { id: 35, nome: "🌿 Alecrim", cientifico: "Rosmarinus officinalis", categoria: "Ervas", regionais: "" },
        { id: 36, nome: "🌿 Tomilho", cientifico: "Thymus vulgaris", categoria: "Ervas", regionais: "" },
        { id: 37, nome: "🌿 Hortelã", cientifico: "Mentha spicata", categoria: "Ervas", regionais: "Hortelã-verde" },
        { id: 38, nome: "🌿 Hortelã-pimenta", cientifico: "Mentha piperita", categoria: "Ervas", regionais: "" },
        { id: 39, nome: "🌿 Cebolinha", cientifico: "Allium schoenoprasum", categoria: "Ervas", regionais: "Cebolete" },
        { id: 40, nome: "🌿 Sálvia", cientifico: "Salvia officinalis", categoria: "Ervas", regionais: "" },
        
        // 🌰 Oleaginosas & Castanhas
        { id: 41, nome: "🌰 Castanha-do-pará", cientifico: "Bertholletia excelsa", categoria: "Oleaginosas", regionais: "Castanha-do-Brasil" },
        { id: 42, nome: "🥜 Amendoim", cientifico: "Arachis hypogaea", categoria: "Oleaginosas", regionais: "" },
        { id: 43, nome: "🌰 Noz-pecã", cientifico: "Carya illinoinensis", categoria: "Oleaginosas", regionais: "" },
        { id: 44, nome: "🌰 Noz-comum", cientifico: "Juglans regia", categoria: "Oleaginosas", regionais: "Noz-da-europa" },
        { id: 45, nome: "🥭 Caju", cientifico: "Anacardium occidentale", categoria: "Oleaginosas", regionais: "Cajueiro" },
        { id: 46, nome: "🥥 Coco", cientifico: "Cocos nucifera", categoria: "Oleaginosas", regionais: "" },
        { id: 47, nome: "🌴 Dendê", cientifico: "Elaeis guineensis", categoria: "Oleaginosas", regionais: "Palma" },
        { id: 48, nome: "🫘 Soja", cientifico: "Glycine max", categoria: "Oleaginosas", regionais: "" },
        { id: 49, nome: "⚪ Gergelim", cientifico: "Sesamum indicum", categoria: "Oleaginosas", regionais: "Sésamo" },
        { id: 50, nome: "🌻 Girassol", cientifico: "Helianthus annuus", categoria: "Oleaginosas", regionais: "" },
        
        // 🍉 Outras Frutas Tropicais
        { id: 51, nome: "🍈 Graviola", cientifico: "Annona muricata", categoria: "Frutas Tropicais", regionais: "Jaca-do-pará" },
        { id: 52, nome: "🍈 Pinha", cientifico: "Annona squamosa", categoria: "Frutas Tropicais", regionais: "Fruta-do-conde" },
        { id: 53, nome: "🍈 Cherimoia", cientifico: "Annona cherimola", categoria: "Frutas Tropicais", regionais: "" },
        { id: 54, nome: "🍈 Atemoia", cientifico: "Annona reticulata", categoria: "Frutas Tropicais", regionais: "" },
        { id: 55, nome: "🔴 Jambo-vermelho", cientifico: "Syzygium malaccense", categoria: "Frutas Tropicais", regionais: "" },
        { id: 56, nome: "🟣 Caimito", cientifico: "Chrysophyllum cainito", categoria: "Frutas Tropicais", regionais: "Abiu-roxo" },
        { id: 57, nome: "🟡 Murici", cientifico: "Byrsonima crassifolia", categoria: "Frutas Tropicais", regionais: "" },
        { id: 58, nome: "🟡 Guabiroba", cientifico: "Campomanesia xanthocarpa", categoria: "Frutas Tropicais", regionais: "" },
        { id: 59, nome: "🟡 Cajá", cientifico: "Spondias mombin", categoria: "Frutas Tropicais", regionais: "Taperebá" },
        { id: 60, nome: "🟡 Umbu", cientifico: "Spondias tuberosa", categoria: "Frutas Tropicais", regionais: "" },
        
        // 🌱 Leguminosas
        { id: 61, nome: "🫘 Feijão-comum", cientifico: "Phaseolus vulgaris", categoria: "Leguminosas", regionais: "Feijão-carioca, feijão-preto" },
        { id: 62, nome: "🫘 Feijão-caupi", cientifico: "Vigna unguiculata", categoria: "Leguminosas", regionais: "Feijão-de-corda, feijão-macassar" },
        { id: 63, nome: "🫘 Guandu", cientifico: "Cajanus cajan", categoria: "Leguminosas", regionais: "Andu" },
        { id: 64, nome: "🟤 Lentilha", cientifico: "Lens culinaris", categoria: "Leguminosas", regionais: "" },
        { id: 65, nome: "🟢 Ervilha", cientifico: "Pisum sativum", categoria: "Leguminosas", regionais: "" },
        { id: 66, nome: "🫘 Fava", cientifico: "Vicia faba", categoria: "Leguminosas", regionais: "" },
        { id: 67, nome: "🌸 Trevo-vermelho", cientifico: "Trifolium pratense", categoria: "Leguminosas", regionais: "" },
        { id: 68, nome: "🥜 Amendoim-forrageiro", cientifico: "Arachis pintoi", categoria: "Leguminosas", regionais: "" },
        { id: 69, nome: "🫘 Feijão-fava", cientifico: "Phaseolus lunatus", categoria: "Leguminosas", regionais: "" },
        
        // 🥭 Frutas Nativas Brasileiras
        { id: 70, nome: "🟣 Jabuticaba", cientifico: "Plinia cauliflora", categoria: "Nativas", regionais: "" },
        { id: 71, nome: "🟣 Açaí", cientifico: "Euterpe oleracea", categoria: "Nativas", regionais: "" },
        { id: 72, nome: "🟣 Juçara", cientifico: "Euterpe edulis", categoria: "Nativas", regionais: "" },
        { id: 73, nome: "🟡 Buriti", cientifico: "Mauritia flexuosa", categoria: "Nativas", regionais: "" },
        { id: 74, nome: "🟡 Pupunha", cientifico: "Bactris gasipaes", categoria: "Nativas", regionais: "" },
        { id: 75, nome: "🟡 Mangaba", cientifico: "Hancornia speciosa", categoria: "Nativas", regionais: "" },
        { id: 76, nome: "🟡 Araçá-boi", cientifico: "Eugenia stipitata", categoria: "Nativas", regionais: "" },
        { id: 77, nome: "🔴 Camu-camu", cientifico: "Myrciaria dubia", categoria: "Nativas", regionais: "" },
        { id: 78, nome: "🟡 Araçá", cientifico: "Psidium cattleyanum", categoria: "Nativas", regionais: "" },
        { id: 79, nome: "🟡 Guavira", cientifico: "Campomanesia adamantium", categoria: "Nativas", regionais: "" },
        
        // 🌾 Cereais & Grãos
        { id: 80, nome: "🌾 Arroz", cientifico: "Oryza sativa", categoria: "Cereais", regionais: "" },
        { id: 81, nome: "🌽 Milho", cientifico: "Zea mays", categoria: "Cereais", regionais: "Milho-verde, Milho-pipoca" },
        { id: 82, nome: "🌾 Trigo", cientifico: "Triticum aestivum", categoria: "Cereais", regionais: "" },
        { id: 83, nome: "🌾 Cevada", cientifico: "Hordeum vulgare", categoria: "Cereais", regionais: "" },
        { id: 84, nome: "🌾 Centeio", cientifico: "Secale cereale", categoria: "Cereais", regionais: "" },
        { id: 85, nome: "🌾 Aveia", cientifico: "Avena sativa", categoria: "Cereais", regionais: "" },
        { id: 86, nome: "🌾 Milhete", cientifico: "Panicum miliaceum", categoria: "Cereais", regionais: "" },
        { id: 87, nome: "🌾 Sorgo", cientifico: "Sorghum bicolor", categoria: "Cereais", regionais: "" },
        { id: 88, nome: "🌾 Quinoa", cientifico: "Chenopodium quinoa", categoria: "Cereais", regionais: "" },
        { id: 89, nome: "🌾 Amaranto", cientifico: "Amaranthus caudatus", categoria: "Cereais", regionais: "" },
        
        // 🍋 Especiarias & Tropicais Secundárias
        { id: 90, nome: "🟤 Canela", cientifico: "Cinnamomum verum", categoria: "Especiarias", regionais: "" },
        { id: 91, nome: "⚫ Pimenta-do-reino", cientifico: "Piper nigrum", categoria: "Especiarias", regionais: "" },
        { id: 92, nome: "🌶️ Pimenta-de-cheiro", cientifico: "Capsicum chinense", categoria: "Especiarias", regionais: "Pimenta-biquinho" },
        { id: 93, nome: "🟤 Noz-moscada", cientifico: "Myristica fragrans", categoria: "Especiarias", regionais: "" },
        { id: 94, nome: "🟤 Cravo-da-índia", cientifico: "Syzygium aromaticum", categoria: "Especiarias", regionais: "" },
        { id: 95, nome: "🤍 Baunilha", cientifico: "Vanilla planifolia", categoria: "Especiarias", regionais: "" },
        { id: 96, nome: "⭐ Anis-estrelado", cientifico: "Illicium verum", categoria: "Especiarias", regionais: "" },
        { id: 97, nome: "🌿 Erva-doce", cientifico: "Foeniculum vulgare", categoria: "Especiarias", regionais: "Funcho" },
        { id: 98, nome: "🍿 Milho-pipoca", cientifico: "Zea mays everta", categoria: "Especiarias", regionais: "" },
        { id: 99, nome: "☕ Café", cientifico: "Coffea arabica", categoria: "Especiarias", regionais: "" },
        { id: 100, nome: "🫘 Soja", cientifico: "Glycine max", categoria: "Especiarias", regionais: "" }
    ];

    return (
      <div className="container mt-5">
        <h2 className="bubble-text" style={{ color: "#4F732C" }}>Horta Digital</h2>
        <p className="lead">
          Aprenda a cultivar seus próprios alimentos em casa com nossas dicas práticas.
        </p>
        
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card" style={{ backgroundColor: "#D9C179" }}>
              <div className="card-body">
                <h5>🌱 Iniciantes</h5>
                <p>Comece com plantas fáceis de cultivar</p>
                <a href="https://www.youtube.com/results?search_query=horta+caseira+iniciantes" 
                   className="btn btn-success btn-sm me-1" target="_blank" rel="noopener noreferrer">
                  Tutoriais
                </a>
                <a href="https://www.youtube.com/results?search_query=como+fazer+horta+casa" 
                   className="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer">
                  Passo a Passo
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card" style={{ backgroundColor: "#D9AE89" }}>
              <div className="card-body">
                <h5>🏡 Espaços Pequenos</h5>
                <p>Soluções para apartamentos e varandas</p>
                <a href="https://www.youtube.com/results?search_query=horta+apartamento" 
                   className="btn btn-success btn-sm me-1" target="_blank" rel="noopener noreferrer">
                  Apartamento
                </a>
                <a href="https://www.youtube.com/results?search_query=horta+vertical+varanda" 
                   className="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer">
                  Vertical
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card" style={{ backgroundColor: "#AEBF2C" }}>
              <div className="card-body">
                <h5>💧 Hidroponia</h5>
                <p>Cultivo sem solo, ideal para casa</p>
                <a href="https://www.youtube.com/results?search_query=hidroponia+caseira" 
                   className="btn btn-success btn-sm me-1" target="_blank" rel="noopener noreferrer">
                  Hidroponia
                </a>
                <a href="https://www.youtube.com/results?search_query=sistema+hidroponico+diy" 
                   className="btn btn-outline-success btn-sm" target="_blank" rel="noopener noreferrer">
                  DIY
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="card-body">
                <h5>📺 Canais Recomendados</h5>
                <ul className="list-unstyled mb-3">
                  <li>• <a href="https://www.youtube.com/@MinhaHortaUrbana" target="_blank" rel="noopener noreferrer">Minha Horta Urbana</a></li>
                  <li>• <a href="https://www.youtube.com/results?search_query=horta+em+casa+canal" target="_blank" rel="noopener noreferrer">Horta em Casa</a></li>
                  <li>• <a href="https://www.youtube.com/results?search_query=cultivo+organico" target="_blank" rel="noopener noreferrer">Cultivo Orgânico</a></li>
                </ul>
                <a href="https://www.youtube.com/results?search_query=horta+caseira+2024" 
                   className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                  Mais Canais
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="card-body">
                <h5>📚 Recursos Úteis</h5>
                <ul className="list-unstyled mb-3">
                  <li>• <a href="https://www.google.com/search?q=calendário+plantio+brasil" target="_blank" rel="noopener noreferrer">Calendário de Plantio</a></li>
                  <li>• <a href="https://www.google.com/search?q=pragas+horta+controle+natural" target="_blank" rel="noopener noreferrer">Controle de Pragas</a></li>
                  <li>• <a href="https://www.google.com/search?q=adubo+organico+caseiro" target="_blank" rel="noopener noreferrer">Adubos Caseiros</a></li>
                </ul>
                <a href="https://www.google.com/search?q=guia+horta+caseira+pdf" 
                   className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                  Baixar Guias
                </a>
              </div>
            </div>
          </div>
        </div>

        <h3 className="section-title" style={{ color: "#558C03" }}>Catálogo de Plantas ({plantas.length} espécies)</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="list-group" style={{ maxHeight: "600px", overflowY: "auto" }}>
              {plantas.map(planta => (
                <button 
                  key={planta.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "#AEBF2C" }}
                  onClick={() => setPlantaSelecionada(planta)}
                >
                  <span>{planta.nome}</span>
                  <span className="badge bg-success">{planta.categoria}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-md-6">
            {plantaSelecionada && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#4F732C" }}>{plantaSelecionada.nome}</h5>
                  <p><strong>Nome Científico:</strong> <em>{plantaSelecionada.cientifico}</em></p>
                  <p><strong>Categoria:</strong> {plantaSelecionada.categoria}</p>
                  {plantaSelecionada.regionais && (
                    <p><strong>Nomes Regionais:</strong> {plantaSelecionada.regionais}</p>
                  )}
                  <div className="alert alert-info">
                    <strong>💡 Dica:</strong> Consulte guias específicos de cultivo para esta espécie.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  