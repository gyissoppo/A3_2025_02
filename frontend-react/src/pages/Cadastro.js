import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const [loading, setLoading] = useState(false);

  // Função para formatar CPF: 000.000.000-00
  const formatCPF = (value) => {
    const digits = value.replace(/\D/g, ""); // só números
    let formatted = digits;

    if (digits.length > 3 && digits.length <= 6) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3)}`;
    } else if (digits.length > 6 && digits.length <= 9) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    } else if (digits.length > 9) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }

    return formatted;
  };

  // Função para validar CPF
  const isValidCPF = (cpf) => {
    const cleaned = cpf.replace(/\D/g, ""); // só números
    if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) {
      return false;
    }

    let sum = 0;
    let remainder;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

    // Segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      setFormData((prev) => ({ ...prev, [name]: formatCPF(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const cpfOnlyNumbers = formData.cpf.replace(/\D/g, "");

    if (!isValidCPF(cpfOnlyNumbers)) {
      alert("CPF inválido! Verifique os números e tente novamente.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf: cpfOnlyNumbers,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar usuário");
      }

      console.log("Usuário cadastrado:", data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Falha ao cadastrar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <header className="cadastro-header">
        <h2 className="menu-brand">FlowBank</h2>
        <Link to="/" className="back-link">Voltar</Link>
      </header>

      <div className="cadastro-scroll">
        <h2 className="cadastro-title">Realize seu cadastro!</h2>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              maxLength={14} // 11 números + 3 caracteres de formatação
              placeholder="000.000.000-00"
              required
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmaSenha">Confirme a senha</label>
            <input
              type="password"
              id="confirmaSenha"
              name="confirmaSenha"
              value={formData.confirmaSenha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Cadastrando..." : "Prosseguir"}
          </button>
        </form>
      </div>
    </div>
  );
}
