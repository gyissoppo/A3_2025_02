import Fastify from "fastify";
import fetch from "node-fetch";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config(); 

console.log("JAVA_API_URL carregada:", process.env.JAVA_API_URL);


const fastify = Fastify({ logger: true });

// habilita CORS
await fastify.register(cors, { origin: "*" });

// conexão com MySQL
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "a3_2025_02"
});

fastify.get("/api/rates", async (req, reply) => {
  try {
    const res = await fetch(process.env.JAVA_API_URL);
    const data = await res.json();
    return {
      usd: data.USDBRL.bid,
      eur: data.EURBRL.bid,
      ars: data.ARSBRL.bid,
      jpy: data.JPYBRL.bid,
      btc: data.BTCBRL.bid,
      eth: data.ETHBRL.bid
    };
  } catch (err) {
    reply.status(500).send({ error: "Não foi possível obter as cotações" });
  }
});

fastify.get("/transacoes/:cpf", async (req, reply) => {
  try {
    const cpf = req.params.cpf;

    const [rows] = await db.query(
      `SELECT id, cpf, valor, tipo, data_transacao, hora_transacao
       FROM transacoes
       WHERE cpf = ?
       ORDER BY data_transacao DESC, hora_transacao DESC`,
      [cpf]
    );

    return rows;

  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Erro ao buscar transações" });
  }
});

fastify.get("/extratos/:cpf", async (req, reply) => {
  try {
    const cpf = req.params.cpf;

    const [rows] = await db.query(
      `SELECT id, cpf, valor, tipo, data_transacao, hora_transacao
       FROM transacoes
       WHERE cpf = ?
       ORDER BY data_transacao DESC, hora_transacao DESC`,
      [cpf]
    );

    return rows;

  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Erro ao buscar extrato" });
  }
});

fastify.listen({ port: process.env.PORT || 3000 });
