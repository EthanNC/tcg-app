import { Resource } from "sst";
import { Example } from "@tcg-app/core/example";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import sets from "./sets";
import cards from "./cards";
import auth from "./auth";
import lists from "./lists";

import { lucia, verifyRequestOrigin } from "@tcg-app/core/auth";
import type { Context } from "../lib/context";
import { ZodError } from "zod";
import { VisibleError } from "@tcg-app/core/error";

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
  .route("/sets", sets)
  .route("/lists", lists)
  .onError((error, c) => {
    if (error instanceof VisibleError) {
      return c.json(
        {
          code: error.code,
          message: error.message,
        },
        error.kind === "input" ? 400 : 401
      );
    }
    console.error(c.error);
    if (error instanceof ZodError) {
      const e = error.errors[0];
      if (e) {
        return c.json(
          {
            code: e?.code,
            message: e?.message,
          },
          400
        );
      }
    }
    return c.json(
      {
        code: "internal",
        message: "Internal server error",
      },
      500
    );
  });

export type AppType = typeof app;

export const handler = handle(app);
