// Importações necessárias do React Router para navegação entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importação dos componentes da aplicação
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import HortaDigital from './HortaDigital';
import Receitas from './Receitas';
import ApoioNovo from './ApoioNovo';
import Sobre from './Sobre';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import HortasUsuario from './HortasUsuario';
import Chat from './Chat';
import Admin from './Admin';
import ChatbotFutuzinhoExpandido from './ChatbotFutuzinhoExpandido';
import Dicas from './Dicas';
import Colheitas from './Colheitas';
// Importação do CSS do Bootstrap para estilização
import 'bootstrap/dist/css/bootstrap.min.css';
// CSS para modo escuro
import './darkMode.css';
// Inicializa dados padrão do sistema
import './initData.js';

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
            <Route path="/apoio" element={<ApoioNovo />} />              {/* Página de apoio */}
            <Route path="/sobre" element={<Sobre />} />              {/* Página sobre */}
            <Route path="/login" element={<Login />} />              {/* Página de login */}
            <Route path="/register" element={<Register />} />        {/* Página de registro */}
            <Route path="/dashboard" element={<Dashboard />} />      {/* Dashboard do usuário */}
            <Route path="/hortas-usuario" element={<HortasUsuario />} /> {/* Hortas do usuário */}
            <Route path="/chat" element={<Chat />} />                {/* Sistema de chat */}
            <Route path="/admin" element={<Admin />} />              {/* Painel administrativo */}
            <Route path="/dicas" element={<Dicas />} />              {/* Dicas e conhecimento */}
            <Route path="/colheitas" element={<Colheitas />} />      {/* Controle de colheitas */}
          </Routes>
        </main>
        
        {/* Footer: Rodapé fixo na parte inferior */}
        <Footer />
        
        {/* Chatbot: Assistente virtual flutuante */}
        <ChatbotFutuzinhoExpandido />
      </div>
    </Router>
  );
}
