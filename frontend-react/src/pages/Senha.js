import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Senha.css";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você chamaria a API de reset de senha
    alert(`Instruções enviadas para ${email}`);
  };

  return (
    <div className="esqueci-container">
      <header className="esqueci-header">
        <h2 className="menu-brand">FlowBank</h2>
        <Link to="/login" className="back-link">Voltar</Link>
      </header>

      <div className="esqueci-scroll">
        <h2 className="esqueci-title">Esqueci minha senha</h2>
        <form className="esqueci-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="save-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
}
