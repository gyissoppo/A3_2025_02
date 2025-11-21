import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Senha from "./pages/Senha";
import Menu from "./pages/Menu";
import Cotacoes from "./pages/Cotacoes";
import Extrato from "./pages/Extrato";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/senha" element={<Senha />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cotacoes" element={<Cotacoes />} />
        <Route path="/extrato" element={<Extrato />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
