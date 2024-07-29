import { hash, verify } from "@node-rs/argon2";
import { lucia } from "@tcg-app/core/auth";
import { byUsername, create } from "@tcg-app/core/user";
import { DatabaseError } from "@tcg-app/core/utils/http";
import { Hono } from "hono";
import { Context } from "src/lib/context";
import { randomUUID } from "node:crypto";
import { StatusCode } from "hono/utils/http-status";

const app = new Hono<Context>()
  .post("/signup", async (c) => {
    const body = await c.req.json<{
      username: string;
      password: string;
    }>();

    const username: string | null = body.username ?? null;
    if (
      !username ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      return c.json(
        {
          error: "Invalid username",
        },
        400
      );
    }

    const password: string | null = body.password ?? null;
    if (!password || password.length < 6 || password.length > 255) {
      return c.json(
        {
          error: "Invalid password",
        },
        400
      );
    }

    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = randomUUID();

    try {
      await create({
        id: userId,
        email: `ethan-${userId}@example.com`,
        username,
        passwordHash,
      });

      const session = await lucia.createSession(userId, {});
      const token = session.id;
      return c.json(
        {
          token,
          user: {
            id: userId,
            username,
          },
        },
        201
      );
    } catch (error) {
      if ((error as DatabaseError).type === "PostgresError") {
        const dbError = error as DatabaseError;
        let statusCode: StatusCode;
        let errorMessage: string;

        switch (dbError.code) {
          case "23505":
            statusCode = 409;
            errorMessage = "User or Email Already Exists";
            break;
          case "23503":
            statusCode = 409;
            errorMessage = "Foreign key constraint violation";
            break;
          default:
            statusCode = 500;
            errorMessage = "Database error";
        }

        return c.json({ error: errorMessage }, statusCode);
      } else {
        console.error(error);
        return c.json(
          {
            error: "Error signup",
          },
          500
        );
      }
    }
  })
  .post("/login", async (c) => {
    const body = await c.req.json<{
      username: string;
      password: string;
    }>();

    const username: string | null = body.username ?? null;

    if (
      !username ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      return c.json(
        {
          error: "Invalid username",
        },
        400
      );
    }

    const password: string | null = body.password ?? null;
    if (!password || password.length < 6 || password.length > 255) {
      return c.json(
        {
          error: "Invalid password",
        },
        400
      );
    }

    try {
      const existingUser = await byUsername(username);

      if (!existingUser) {
        return c.json(
          {
            error: "Invalid username or password",
          },
          400
        );
      }
      const validPassword = await verify(existingUser.passwordHash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      if (!validPassword) {
        return c.json(
          {
            error: "Invalid username or password",
          },
          400
        );
      }

      const session = await lucia.createSession(existingUser.id, {});
      const token = session.id;
      return c.json(
        {
          token,
          user: {
            id: existingUser.id,
            username: existingUser.username,
          },
        },
        201
      );
    } catch (error) {
      console.error(error);
      return c.json(
        {
          error: "Error login",
        },
        500
      );
    }
  })
  .post("/logout", async (c) => {
    const authorizationHeader = c.req.header("Authorization");
    const sessionId = lucia.readBearerToken(authorizationHeader ?? "");

    if (!sessionId) {
      return c.json({ error: "No valid session" }, 401);
    }

    try {
      // Invalidate the session
      await lucia.invalidateSession(sessionId);

      // Clear the context
      c.set("session", null);
      c.set("user", null);

      return c.json({ message: "Logged out successfully" }, 200);
    } catch (error) {
      console.error("Logout error:", error);
      return c.json({ error: "An error occurred during logout" }, 500);
    }
  });

export default app;
