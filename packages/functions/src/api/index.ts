import { Resource } from "sst";
import { Example } from "@tcg-app/core/example";

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import sets from "./sets";
import cards from "./cards";
import auth from "./auth";

import { lucia, verifyRequestOrigin } from "@tcg-app/core/auth";
import type { Context } from "../lib/context";

const app = new Hono<Context>()
  .use("*", async (c, next) => {
    if (c.req.method === "GET" || process.env.NODE_ENV === "development") {
      return next();
    }
    const originHeader = c.req.header("Origin") ?? null;
    const hostHeader = c.req.header("Host") ?? null;
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return c.body(null, 403);
    }
    return next();
  })
  .use("*", async (c, next) => {
    const authorizationHeader = c.req.header("Authorization");
    const sessionId = lucia.readBearerToken(authorizationHeader ?? "");

    if (!sessionId) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);

    c.set("session", session);
    c.set("user", user);
    return next();
  })
  .get("/", async (c) => {
    return c.json(
      `${Example.hello()} Linked to ${Resource.Database.database}.`
    );
  })
  .route("/auth", auth)
  .route("/cards", cards)
  .route("/sets", sets);

export type AppType = typeof app;

export const handler = handle(app);
