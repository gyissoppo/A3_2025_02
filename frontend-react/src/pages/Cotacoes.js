import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Cotacoes.css";

export default function Cotacoes() {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/rates")
      .then((res) => res.json())
      .then((data) => setRates(data))
      .catch(console.error);
  }, []);

  const currencyNames = {
    usd: "Dólar",
    eur: "Euro",
    ars: "Peso Argentino",
    jpy: "Iene Japonês",
    btc: "Bitcoin",
    eth: "Ethereum",
  };

  return (
    <div className="cotacoes-container">
      <header className="cotacoes-header">
        <h2 className="menu-brand">FlowBank</h2>
        <h1 className="cotacoes-title">Cotações do Mercado</h1>
        <Link to="/menu" className="back-link">
          Voltar
        </Link>
      </header>

      <div className="cotacoes-scroll">
        {rates ? (
          Object.entries(rates).map(([currency, value]) => (
            <div key={currency} className="currency-card">
              <div className="currency-info">
                <span className="currency-name">
                  {currencyNames[currency] || currency}
                </span>
                <button className="buy-btn">Comprar</button>
              </div>
              <span className="currency-value">
                R$ {Number(value).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
