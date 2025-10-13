import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './useAuth.jsx';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import HortasUsuario from './HortasUsuario';
import Colheitas from './Colheitas';
import Perfil from './Perfil';
import HortaDigital from './HortaDigital';
import Receitas from './Receitas';
import ApoioNovo from './ApoioNovo';
import Sobre from './Sobre';
import AdminRegister from './AdminRegister';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminUsuarios from './AdminUsuarios';
import AdminHortas from './AdminHortas';
import AdminColheitas from './AdminColheitas';
import { UserRoute, AdminRoute } from './ProtectedRoute';

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
              <Route path="/horta" element={<HortaDigital />} />
              <Route path="/receitas" element={<Receitas />} />
              <Route path="/apoio" element={<ApoioNovo />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/usuarios" element={<AdminRoute><AdminUsuarios /></AdminRoute>} />
              <Route path="/admin/hortas" element={<AdminRoute><AdminHortas /></AdminRoute>} />
              <Route path="/admin/colheitas" element={<AdminRoute><AdminColheitas /></AdminRoute>} />
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