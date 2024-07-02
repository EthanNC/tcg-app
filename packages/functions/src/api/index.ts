import { Resource } from "sst";
import { Example } from "@tcg-app/core/example";

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { byId, getRandomCardId } from "@tcg-app/core/cards";

const app = new Hono()
  .get("/", async (c) => {
    return c.json(
      `${Example.hello()} Linked to ${Resource.Database.database}.`
    );
  })
  .get("/cards/:id", async (c) => {
    const id = c.req.param("id");
    const card = await byId(id);
    return c.json(card);
  })
  .get("/random", async (c) => {
    const cardId = await getRandomCardId();
    const card = await byId(cardId);
    return c.json(card);
  });
export type ApiRoutes = typeof app;
export const handler = handle(app);
