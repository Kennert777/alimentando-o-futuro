import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");
    try {
      const response = await fetch("/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErro(data?.erro || "Erro ao cadastrar.");
      } else {
        setSucesso("Cadastro realizado com sucesso!");
        // Login automático
        const loginResp = await fetch("/api/usuarios/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        });
        const loginData = await loginResp.json();
        if (!loginResp.ok) {
          setErro(loginData?.erro || "Erro ao fazer login automático.");
        } else {
          login(loginData.usuario, loginData.token);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-success">Cadastro</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
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
            autoComplete="new-password"
          />
        </div>
        {erro && <div className="alert alert-danger">{erro}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default Register;