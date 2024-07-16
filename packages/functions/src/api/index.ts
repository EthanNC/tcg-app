import { Resource } from "sst";
import { Example } from "@tcg-app/core/example";

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import sets from "./sets";
import cards from "./cards";

const app = new Hono()
  .get("/", async (c) => {
    return c.json(
      `${Example.hello()} Linked to ${Resource.Database.database}.`
    );
  })
  .route("/cards", cards)
  .route("/sets", sets);

export type AppType = typeof app;

export const handler = handle(app);
