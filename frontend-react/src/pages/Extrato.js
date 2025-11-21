import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Extrato.css";
import { getExtrato } from "../services/extrato";

export default function Extrato() {
  const [extrato, setExtrato] = useState([]);
  const [search, setSearch] = useState("");
  const [saldoTotal, setSaldoTotal] = useState(0); // Novo estado para o saldo total

 useEffect(() => {
  const fetchData = async () => {
    try {
      const cpf = localStorage.getItem("cpf"); // Pega o CPF do localStorage

      // Verificar se o CPF está presente
      if (!cpf) {
        alert("CPF não encontrado. Você precisa fazer login.");
        return; // Impede que a requisição seja feita
      }

      const dados = await getExtrato(cpf);
      const groupedData = groupTransacoesByDate(dados); // Agrupando as transações por data
      setExtrato(groupedData);
    } catch (err) {
      alert("Erro ao buscar extrato: " + err.message);
    }
  };
  fetchData();
}, []);


  // Função para agrupar transações por data e calcular o saldo do dia
  const groupTransacoesByDate = (transacoes) => {
    const grouped = {};
    let totalSaldo = 0;

    transacoes.forEach((transacao) => {
      const dataTransacao = transacao.data_transacao;
      const tipo = transacao.tipo === "in" ? 1 : -1; // 1 para entrada, -1 para saída
      const valor = transacao.valor * tipo;

      if (!grouped[dataTransacao]) {
        grouped[dataTransacao] = { saldoDia: 0, transacoes: [] };
      }

      grouped[dataTransacao].transacoes.push(transacao);
      grouped[dataTransacao].saldoDia += valor; // Atualiza o saldo do dia
      totalSaldo += valor; // Atualiza o saldo total
    });

    setSaldoTotal(totalSaldo); // Atualiza o saldo total

    return Object.entries(grouped).map(([data, { saldoDia, transacoes }]) => ({
      data_transacao: data,
      saldoDia,
      transacoes,
    }));
  };

  return (
    <div className="menu-extrato-container">
      <div className="extrato-header">
        <header className="menu-header">
          <h2 className="menu-brand">FlowBank</h2>
          <h2 className="extrato-title">Meu Extrato</h2>
          <Link to="/menu" className="back-link">Voltar</Link>
        </header>

        <div className="search-container">
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <button
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Filtrar
            </button>
          </div>
        </div>
      </div>

      <div className="extrato-scroll">
        <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>
          Saldo Total: R$ {saldoTotal.toFixed(2)}
        </div>

        {extrato.map((day, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
              {day.data_transacao} - Saldo do dia: R$ {day.saldoDia.toFixed(2)}
            </div>
            {day.transacoes.map((t, j) => (
              <div key={j} style={{ marginLeft: "0.5rem", marginBottom: "0.2rem" }}>
                <div
                  className={`transaction ${t.tipo === "in" ? "transaction-in" : "transaction-out"}`}
                  style={{ fontSize: "0.95rem" }}
                >
                  {t.tipo === "in" ? `+ R$ ${t.valor.toFixed(2)}` : `- R$ ${t.valor.toFixed(2)}`}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#555", marginLeft: "0.2rem" }}>
                  {t.descricao}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
