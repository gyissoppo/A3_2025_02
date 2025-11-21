import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { login } from "../services/auth"; // import do serviço

export default function Login() {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, cpf, nome } = await login(formData.email, formData.senha); // chama API e salva token e dados do usuário
      alert("Login realizado com sucesso!");
      console.log("Token:", token);
      console.log("CPF:", cpf);
      console.log("Nome:", nome);
      navigate("/menu"); // redireciona para menu/extrato
    } catch (err) {
      alert("Falha no login: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h2 className="menu-brand">FlowBank</h2>
        <Link to="/" className="back-link">Voltar</Link>
      </header>

      <div className="login-content">
        <h2 className="login-title">Faça seu login!</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <Link to="/senha" className="forgot-password">
            Esqueci a senha
          </Link>

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}
