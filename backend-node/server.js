import Fastify from "fastify";
import fetch from "node-fetch";
import cors from "@fastify/cors";
import 'dotenv/config';

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: "*" });

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

fastify.listen({ port: process.env.PORT || 3000 });
