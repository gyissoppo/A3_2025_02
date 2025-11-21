import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Perfil.css";

export default function Perfil() {
  const [formData, setFormData] = useState({
    nome: "João da Silva",
    email: "joao.silva@email.com",
    tema: "claro",
    idioma: "pt-BR",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="perfil-container">
      {/* Cabeçalho fixo */}
      <header className="perfil-header">
        <h2 className="menu-brand">FlowBank</h2>
        <h2 className="perfil-title">Configurações do Usuário</h2>
        <Link to="/menu" className="back-link">
          Voltar
        </Link>
      </header>

      {/* Conteúdo com scroll */}
      <div className="perfil-scroll">
        <form className="perfil-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label htmlFor="tema">Tema do app</label>
            <select
            id="tema"
            name="tema"
            value={formData.tema}
            onChange={handleChange}
            >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="idioma">Idioma</label>
            <select
            id="idioma"
            name="idioma"
            value={formData.idioma}
            onChange={handleChange}
            >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English</option>
            <option value="es-ES">Español</option>
            </select>
        </div>

        {/* Alterar senha como link */}
        <div className="change-password" onClick={() => alert("Abrir modal de alteração de senha")}>
            Alterar senha
        </div>

        <button type="submit" className="save-btn">
            Salvar alterações
        </button>
        </form>
      </div>
    </div>
  );
}
