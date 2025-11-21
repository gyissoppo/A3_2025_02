import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";


export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-brand">FlowBank</h1>
      </header>

      <main className="home-main">
        <h1>Boas-vindas ao FlowBank!</h1>
        <p className="impact-text">O banco digital feito para você!</p>

        <div className="account-question">
          <p>Já possui conta?</p>
          <div className="button-group">
            <Link to="/login" className="btn btn-yes">Sim</Link>
            <Link to="/cadastro" className="btn btn-no">Não</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
