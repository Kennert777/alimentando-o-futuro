// Arquivo de índice para facilitar imports
export { default as App } from './App.jsx';

// Pages - Public
export { default as Home } from './pages/public/Home.jsx';
export { default as Login } from './pages/public/Login.jsx';
export { default as Register } from './pages/public/Register.jsx';
export { default as Sobre } from './pages/public/Sobre.jsx';
export { default as Receitas } from './pages/public/Receitas.jsx';
export { default as Dicas } from './pages/public/Dicas.jsx';
export { default as ApoioNovo } from './pages/public/ApoioNovo.jsx';
export { default as ForgotPassword } from './pages/public/ForgotPassword.jsx';

// Pages - User
export { default as Dashboard } from './pages/user/Dashboard.jsx';
export { default as HortasUsuario } from './pages/user/HortasUsuario.jsx';
export { default as Colheitas } from './pages/user/Colheitas.jsx';
export { default as Relatorios } from './pages/user/Relatorios.jsx';
export { default as RelatoriosNovo } from './pages/user/RelatoriosNovo.jsx';
export { default as Perfil } from './pages/user/Perfil.jsx';

// Pages - Admin
export { default as AdminDashboard } from './pages/admin/AdminDashboard.jsx';
export { default as AdminLogin } from './pages/admin/AdminLogin.jsx';
export { default as AdminRegister } from './pages/admin/AdminRegister.jsx';
export { default as AdminUsuarios } from './pages/admin/AdminUsuarios.jsx';
export { default as AdminHortas } from './pages/admin/AdminHortas.jsx';
export { default as AdminColheitas } from './pages/admin/AdminColheitas.jsx';
export { default as UserManagement } from './pages/admin/UserManagement.jsx';
export { default as HortaManagement } from './pages/admin/HortaManagement.jsx';
export { default as SupportManagement } from './pages/admin/SupportManagement.jsx';
export { default as ProtectedAdminRoute } from './pages/admin/ProtectedAdminRoute.jsx';

// Components
export { default as Navbar } from './components/Navbar.jsx';
export { default as Footer } from './components/Footer.jsx';
export { default as ProtectedRoute } from './components/ProtectedRoute.jsx';
export { default as Toast } from './components/Toast.jsx';

// Hooks
export { default as useAuth } from './hooks/useAuth.jsx';

// Context
export { default as ThemeContext } from './context/ThemeContext.jsx';