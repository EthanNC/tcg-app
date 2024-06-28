import { Resource } from "sst";
import { Example } from "@tcg-app/core/example";

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono().get("/", async (c) => {
  return c.json(`${Example.hello()} Linked to ${Resource.Database.database}.`);
});

export const handler = handle(app);
