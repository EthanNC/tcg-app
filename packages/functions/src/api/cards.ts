import {
  byId,
  getRandomCardId,
  getRandomHeroCardId,
  searchByName,
} from "@tcg-app/core/cards";
import { Hono } from "hono";

const app = new Hono()
  .get("/search", async (c) => {
    const name = c.req.query("name");
    if (!name) return c.json([]);
    const cards = await searchByName(name);
    return c.json(cards);
  })
  .get("/random/hero", async (c) => {
    const cardId = await getRandomHeroCardId();
    const card = await byId(cardId);
    return c.json(card);
  })
  .get("/random", async (c) => {
    const cardId = await getRandomCardId();
    const card = await byId(cardId);
    return c.json(card);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const card = await byId(id);
    return c.json(card);
  });

export default app;
