import { Cards } from "@tcg-app/core/cards";
import { Hono } from "hono";

const app = new Hono()
  .get("/search", async (c) => {
    const name = c.req.query("name");
    if (!name) return c.json([]);
    const cards = await Cards.searchByName(name);
    return c.json(cards);
  })
  .get("/random/hero", async (c) => {
    const cardId = await Cards.getRandomHeroCardId();
    const card = await Cards.byId(cardId);
    return c.json(card);
  })
  .get("/random", async (c) => {
    const cardId = await Cards.getRandomCardId();
    const card = await Cards.byId(cardId);
    return c.json(card);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const card = await Cards.byId(id);
    if (!card) return c.json(null, 200);
    return c.json(card);
  });

export default app;
