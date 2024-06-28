import { Resource } from "sst";
import { Example } from "@tcg-app/core/example";

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { getUser } from "@tcg-app/core/user";

const app = new Hono()
  .get("/", async (c) => {
    return c.json(
      `${Example.hello()} Linked to ${Resource.Database.database}.`
    );
  })
  .get("/hello", async (c) => {
    const user = await getUser("boop");
    return c.json(user);
  });

export const handler = handle(app);
