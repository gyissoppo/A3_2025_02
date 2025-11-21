// services/extrato.js

const API_URL = "http://localhost:8081/transacoes";  // Defina o URL correto da sua API

export const getExtrato = async (cpf) => {
  const token = localStorage.getItem("token");

  // Verifique se o token está presente
  console.log("Token no localStorage: ", token);

  if (!token) {
    throw new Error("Token não encontrado");
  }

  console.log("Buscando extrato para o CPF:", cpf);

  const response = await fetch(`${API_URL}/${cpf}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  // Verifique a resposta da requisição
  if (!response.ok) {
    console.log("Erro na requisição:", response.statusText); // Log de erro
    throw new Error("Não autorizado ou erro na requisição");
  }

  return await response.json();
};
