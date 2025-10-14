import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Dashboard from './pages/user/Dashboard';
import HortasUsuario from './pages/user/HortasUsuario';
import Colheitas from './pages/user/Colheitas';
import Perfil from './pages/user/Perfil';
import Receitas from './pages/public/Receitas';
import ApoioNovo from './pages/public/ApoioNovo';
import Sobre from './pages/public/Sobre';
import AdminRegister from './pages/admin/AdminRegister';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminHortas from './pages/admin/AdminHortas';
import AdminColheitas from './pages/admin/AdminColheitas';
import UserManagement from './pages/admin/UserManagement';
import HortaManagement from './pages/admin/HortaManagement';
import SupportManagement from './pages/admin/SupportManagement';
import { UserRoute, AdminRoute } from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import './config/axios.js';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dicas" element={<Receitas />} />
              <Route path="/receitas" element={<Receitas />} />
              <Route path="/apoio" element={<ApoioNovo />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/usuarios" element={<AdminRoute><UserManagement /></AdminRoute>} />
              <Route path="/admin/hortas" element={<AdminRoute><HortaManagement /></AdminRoute>} />
              <Route path="/admin/colheitas" element={<AdminRoute><AdminColheitas /></AdminRoute>} />
              <Route path="/admin/suporte" element={<AdminRoute><SupportManagement /></AdminRoute>} />
              <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />
              <Route path="/hortas-usuario" element={<UserRoute><HortasUsuario /></UserRoute>} />
              <Route path="/colheitas" element={<UserRoute><Colheitas /></UserRoute>} />
              <Route path="/perfil" element={<UserRoute><Perfil /></UserRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}