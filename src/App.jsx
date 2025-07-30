// Importações necessárias do React Router para navegação entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importação dos componentes da aplicação
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import HortaDigital from './HortaDigital';
import Receitas from './Receitas';
import Apoio from './Apoio';
import Sobre from './Sobre';
// Importação do CSS do Bootstrap para estilização
import 'bootstrap/dist/css/bootstrap.min.css';

// Componente principal da aplicação
export default function App() {
  return (
    // Router: Habilita navegação entre páginas sem recarregar
    <Router>
      {/* Container principal com layout flexbox */}
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar: Menu de navegação fixo no topo */}
        <Navbar />
        
        {/* Main: Área principal que cresce para ocupar espaço disponível */}
        <main className="flex-grow-1">
          {/* Routes: Define as rotas da aplicação */}
          <Routes>
            {/* Cada Route mapeia uma URL para um componente */}
            <Route path="/" element={<Home />} />                    {/* Página inicial */}
            <Route path="/horta" element={<HortaDigital />} />       {/* Página da horta */}
            <Route path="/receitas" element={<Receitas />} />        {/* Página de receitas */}
            <Route path="/apoio" element={<Apoio />} />              {/* Página de apoio */}
            <Route path="/sobre" element={<Sobre />} />              {/* Página sobre */}
          </Routes>
        </main>
        
        {/* Footer: Rodapé fixo na parte inferior */}
        <Footer />
      </div>
    </Router>
  );
}
