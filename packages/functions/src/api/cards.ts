import { byId, getRandomCardId, searchByName } from "@tcg-app/core/cards";
import { Hono } from "hono";

const app = new Hono();

app.get("/cards/search", async (c) => {
  const name = c.req.query("name");
  if (!name) return c.json([]);
  const cards = await searchByName(name);
  return c.json(cards);
});

app.get("/random", async (c) => {
  const cardId = await getRandomCardId();
  const card = await byId(cardId);
  return c.json(card);
});

app.get("/cards/:id", async (c) => {
  const id = c.req.param("id");
  const card = await byId(id);
  return c.json(card);
});

export default app;
