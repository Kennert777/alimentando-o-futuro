/**
 * Arquivo principal da aplicação React - Alimentando o Futuro
 * 
 * Este arquivo configura:
 * - Roteamento da aplicação (React Router)
 * - Layout principal (Navbar, Main, Footer)
 * - Todas as rotas públicas e administrativas
 * - Integração do chatbot
 * - Estilos globais (Bootstrap + CSS customizado)
 */

// Importações necessárias do React Router para navegação entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação dos componentes principais da aplicação
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
// Componentes Administrativos
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminUsuarios from './AdminUsuarios';
import AdminSolicitacoes from './AdminSolicitacoes';
import AdminRelatorios from './AdminRelatorios';
import AdminDicas from './AdminDicas';
import AdminRegister from './AdminRegister';
import AdminNotificacoes from './AdminNotificacoes';
import AdminHortas from './AdminHortas';
import { AdminRoute, UserRoute } from './ProtectedRoute';

// Importação do CSS do Bootstrap para estilização
import 'bootstrap/dist/css/bootstrap.min.css';
// CSS para modo escuro
import './darkMode.css';

/**
 * Componente principal da aplicação
 * 
 * Estrutura:
 * - Router: Gerencia navegação SPA
 * - Layout: Navbar + Main + Footer
 * - Routes: Define todas as rotas da aplicação
 * - Chatbot: Assistente virtual flutuante
 */
export default function App() {
  return (
    // Router: Habilita navegação entre páginas sem recarregar (SPA)
    <Router>
      {/* Container principal com layout flexbox */}
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar: Menu de navegação fixo no topo */}
        <Navbar />
        
        {/* Main: Área principal que cresce para ocupar espaço disponível */}
        <main className="flex-grow-1">
          {/* Routes: Define as rotas da aplicação */}
          <Routes>
            {/* ROTAS PÚBLICAS - Acessíveis a todos os usuários */}
            <Route path="/" element={<Home />} />                    {/* Página inicial */}
            <Route path="/horta" element={<HortaDigital />} />       {/* Página da horta */}
            <Route path="/receitas" element={<Receitas />} />        {/* Página de receitas */}
            <Route path="/apoio" element={<ApoioNovo />} />              {/* Página de apoio */}
            <Route path="/sobre" element={<Sobre />} />              {/* Página sobre */}
            <Route path="/login" element={<Login />} />              {/* Página de login */}
            <Route path="/register" element={<Register />} />        {/* Página de registro */}
            <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />      {/* Dashboard do usuário */}
            <Route path="/hortas-usuario" element={<UserRoute><HortasUsuario /></UserRoute>} /> {/* Hortas do usuário */}
            <Route path="/chat" element={<UserRoute><Chat /></UserRoute>} />                {/* Sistema de chat */}
            <Route path="/admin" element={<Admin />} />              {/* Painel administrativo */}
            <Route path="/dicas" element={<Dicas />} />              {/* Dicas e conhecimento */}
            <Route path="/colheitas" element={<UserRoute><Colheitas /></UserRoute>} />      {/* Controle de colheitas */}
            {/* ROTAS ADMINISTRATIVAS - Requerem autenticação de admin */}
            <Route path="/admin/login" element={<AdminLogin />} />   {/* Login admin */}
            <Route path="/admin/register" element={<AdminRegister />} /> {/* Cadastro admin */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> {/* Dashboard admin */}
            <Route path="/admin/usuarios" element={<AdminRoute><AdminUsuarios /></AdminRoute>} /> {/* Gerenciar usuários */}
            <Route path="/admin/hortas" element={<AdminRoute><AdminHortas /></AdminRoute>} />   {/* Gerenciar hortas */}
            <Route path="/admin/solicitacoes" element={<AdminRoute><AdminSolicitacoes /></AdminRoute>} /> {/* Solicitações */}
            <Route path="/admin/dicas" element={<AdminRoute><AdminDicas /></AdminRoute>} />       {/* Gerenciar dicas */}
            <Route path="/admin/relatorios" element={<AdminRoute><AdminRelatorios /></AdminRoute>} /> {/* Relatórios */}
            <Route path="/admin/notificacoes" element={<AdminRoute><AdminNotificacoes /></AdminRoute>} /> {/* Notificações */}
            <Route path="/admin/gamificacao" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> {/* Gamificação */}

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
