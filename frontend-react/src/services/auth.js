const API_URL = "http://localhost:8081/auth"; // sua API Java

export const login = async (email, senha) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  if (!response.ok) {
    throw new Error("Login falhou");
  }

  // A resposta agora contém o token e os dados do usuário
  const data = await response.json(); // { token, cpf, nome }

  // Armazenar o token e as informações no localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("cpf", data.cpf);
  localStorage.setItem("nome", data.nome);

  return { token: data.token, cpf: data.cpf, nome: data.nome }; // Retorna as informações
};
