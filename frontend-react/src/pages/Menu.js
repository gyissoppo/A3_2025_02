import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";
import { getExtrato } from "../services/extrato";

export default function Menu() {
  const [saldo, setSaldo] = useState(0);
  const [ultimas, setUltimas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cpf = localStorage.getItem("cpf");
        if (!cpf) return;

        const dados = await getExtrato(cpf);

        // Converter valores
        const transacoes = dados.map((t) => ({
          ...t,
          valor: Number(t.valor),
          data_transacao: t.data_transacao
        }));

        // Calcular saldo acumulado
        let acumulado = 0;
        transacoes.forEach((t) => {
          acumulado += t.tipo === "entrada" ? t.valor : -t.valor;
        });

        setSaldo(acumulado);

        // 3 últimas transações (ordenadas da mais nova para a mais antiga)
        const ultimas3 = transacoes
          .sort((a, b) => new Date(b.data_transacao) - new Date(a.data_transacao))
          .slice(0, 3);

        setUltimas(ultimas3);
      } catch (err) {
        console.error("Erro ao carregar dados do menu:", err);
      }
    };

    fetchData();
  }, []);

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
          <h1 className="value">R$ {saldo.toFixed(2)}</h1>
        </div>
        <Link to="/extrato" className="view-statement">
          Ver Extrato
        </Link>
      </section>

      {/* Movimentações */}
      <section className="menu-transactions">
        {ultimas.length === 0 && (
          <p style={{ color: "#777" }}>Nenhuma movimentação recente.</p>
        )}

        {ultimas.map((t, i) => (
          <div
            key={i}
            className={`transaction ${t.tipo === "entrada" ? "transaction-in" : "transaction-out"}`}
          >
            {t.tipo === "entrada"
              ? `+ R$ ${t.valor.toFixed(2)}`
              : `- R$ ${t.valor.toFixed(2)}`}
          </div>
        ))}
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
