import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { apiService } from "./services/apiService";

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
    try {
      const response = await fetch(apiService.auth.login(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErro(data?.erro || "Erro ao fazer login.");
      } else {
        login(data.usuario, data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ color: '#4F732C' }}>Login</h2>
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