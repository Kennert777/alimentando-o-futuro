import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    
    // Debug: mostrar dados enviados
    console.log('Enviando:', { email, senha });
    
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      
      console.log('Status:', response.status);
      const data = await response.json();
      console.log('Resposta:', data);
      
      if (response.ok) {
        // Verificar se usuário está ativo
        if (data.usuario.ativo === false) {
          setErro("Conta inativa. Entre em contato com o administrador.");
          return;
        }
        
        // Sucesso (200)
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.usuario));
        login(data.usuario, data.token);
        navigate("/dashboard");
      } else {
        // Erros (400, 401, 404)
        const errorMessages = {
          400: "Email e senha são obrigatórios",
          401: "Email ou senha incorretos. Tente: admin@alimentandoofuturo.com / password",
          404: "Usuário não encontrado"
        };
        setErro(errorMessages[response.status] || data.erro || "Erro ao fazer login");
      }
    } catch (err) {
      console.error('Erro de conexão:', err);
      setErro("Erro de conexão com o servidor. Verifique se o backend está rodando em localhost:8080");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ color: '#4F732C' }}>Login</h2>
      
      {/* Credenciais de teste */}
      <div className="alert alert-info mb-3">
        <strong>Teste com:</strong><br/>
        Email: admin@alimentandoofuturo.com<br/>
        Senha: password<br/>
        <small>Verifique o console (F12) para debug</small>
      </div>
      
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {erro && <div className="alert alert-danger">{erro}</div>}
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: '#4F732C', borderColor: '#4F732C', color: 'white' }}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;