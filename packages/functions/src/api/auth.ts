import { hash, verify } from "@node-rs/argon2";
import { lucia } from "@tcg-app/core/auth";
import { User } from "@tcg-app/core/user";
import { Hono } from "hono";
import { Context } from "src/lib/context";
import { randomUUID } from "node:crypto";
import { StatusCode } from "hono/utils/http-status";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

const LoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(31, { message: "Username must be at most 31 characters long" })
    .regex(/^[a-z0-9_-]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, underscores, and hyphens",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" }),
});

//Todo: add email to signup
const SingupSchema = LoginSchema;

const app = new Hono<Context>()
  .get("/me", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "No user found" }, 404);
    }
    return c.json({
      //type inference is failing on client
      id: user.id as string,
      username: user.username as string,
    });
  })
  .post("/signup", async (c) => {
    const body = await c.req.json<{
      username: string;
      password: string;
    }>();
    SingupSchema.parse(body);
    const username: string | null = body.username ?? null;
    const password: string | null = body.password ?? null;

    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = randomUUID();

    try {
      await User.create({
        id: userId,
        email: `ethan-${userId}@example.com`, // TODO: Add email to signup
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
      return c.json(
        {
          message: "User already exists",
        },
        409
      );
    }
  })
  .post("/login", async (c) => {
    const body = await c.req.json<{
      username: string;
      password: string;
    }>();

    LoginSchema.parse(body);

    const username: string | null = body.username ?? null;
    const password: string | null = body.password ?? null;

    try {
      const existingUser = await User.byUsername(username);

      if (!existingUser) {
        return c.json(
          {
            message: "Invalid username or password",
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
            message: "Invalid username or password",
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
          message: "Error login",
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
