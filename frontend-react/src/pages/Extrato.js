import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Extrato.css";
import { getExtrato } from "../services/extrato";

export default function Extrato() {
  const [extrato, setExtrato] = useState([]);
  const [search, setSearch] = useState("");
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cpf = localStorage.getItem("cpf");
        if (!cpf) return;

        const dados = await getExtrato(cpf);

        // Converte valores para número e datas para Date
        const dadosConvertidos = dados.map((t) => ({
          ...t,
          valor: Number(t.valor),
          data_transacao: new Date(t.data_transacao),
        }));

        const groupedData = groupTransacoesByDate(dadosConvertidos);
        setExtrato(groupedData);
      } catch (err) {
        alert("Erro ao buscar extrato: " + err.message);
      }
    };

    fetchData();
  }, []);

  const groupTransacoesByDate = (transacoes) => {
    const grouped = {};
    transacoes.forEach((t) => {
      const dataKey = t.data_transacao.toISOString().split("T")[0]; // YYYY-MM-DD
      if (!grouped[dataKey]) grouped[dataKey] = [];
      grouped[dataKey].push(t);
    });

    // Ordena do mais antigo para o mais recente
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

    let saldoAcumulado = 0;
    const resultado = sortedDates.map((data) => {
      const transacoesDia = grouped[data].map((t) => {
        const valor = t.tipo === "entrada" ? t.valor : -t.valor;
        return { ...t, valor };
      });

      const somaDia = transacoesDia.reduce((acc, t) => acc + t.valor, 0);
      saldoAcumulado += somaDia;

      return {
        data_transacao: data,
        saldoDia: saldoAcumulado,
        transacoes: transacoesDia,
      };
    });

    setSaldoTotal(saldoAcumulado);

    return resultado.reverse(); // mais recentes primeiro
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
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
              style={{ flex: 1, padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <button
              style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "none", backgroundColor: "#000", color: "#fff", cursor: "pointer" }}
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
              {formatDate(day.data_transacao)} - Saldo do dia: R$ {day.saldoDia.toFixed(2)}
            </div>
            {day.transacoes.map((t, j) => (
              <div key={j} style={{ marginLeft: "0.5rem", marginBottom: "0.2rem" }}>
                <div
                  className={`transaction ${t.tipo === "entrada" ? "transaction-in" : "transaction-out"}`}
                  style={{ fontSize: "0.95rem" }}
                >
                  {t.tipo === "entrada" ? `+ R$ ${t.valor.toFixed(2)}` : `- R$ ${Math.abs(t.valor).toFixed(2)}`}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
