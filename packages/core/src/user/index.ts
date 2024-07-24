import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { users } from "./user.sql";
import { createSelectSchema } from "drizzle-zod";
import { zod } from "../utils/zod";

const Schema = createSelectSchema(users, {
  id: (z) => z.id.uuid(),
  username: (z) => z.username.min(3).max(31),
  email: (z) => z.email.email(),
  passwordHash: (z) => z.passwordHash,
});

export const byId = zod(Schema.shape.id, async (id) => {
  const respone = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .execute();
  return respone[0];
});

export const byUsername = zod(Schema.shape.username, async (username) => {
  const respone = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .execute();
  return respone[0];
});

export const create = zod(
  Schema.omit({ emailVerified: true }),
  async (user) => {
    const response = await db
      .insert(users)
      .values({
        ...user,
      })
      .execute();

    return response[0];
  }
);
