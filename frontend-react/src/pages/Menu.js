import React from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";

export default function Menu() {
  return (
    <div className="menu-container">
      {/* Cabeçalho */}
      <header className="menu-header">
        <h2 className="menu-brand">FlowBank</h2>
        <Link to="/perfil" className="user-config">
            Configurações do <br /> usuário
        </Link>
      </header>

      {/* Seção de saldo */}
      <section className="menu-balance">
        <div className="balance-info">
          <p className="label">Saldo disponível</p>
          <h1 className="value">R$ 0,00</h1>
        </div>
        <Link to="/extrato" className="view-statement">
          Ver Extrato
        </Link>
      </section>

      {/* Movimentações */}
        <section className="menu-transactions">
        <div className="transaction transaction-in">+ R$ 00,00</div>
        <div className="transaction transaction-out">- R$ 00,00</div>
        <div className="transaction transaction-in">+ R$ 00,00</div>
        </section>

      {/* Botão de Cotações */}
      <div className="menu-actions">
        <Link to="/cotacoes" className="btn">
          Cotações do Mercado
        </Link>
      </div>

      {/* Voltar */}
      <footer className="menu-footer">
        <Link to="/" className="back-link">Voltar</Link>
      </footer>
    </div>
  );
}
