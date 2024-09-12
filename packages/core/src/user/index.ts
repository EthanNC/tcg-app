import { eq, getTableColumns } from "drizzle-orm";
import { db } from "../drizzle";
import { users } from "./user.sql";
import { createSelectSchema } from "drizzle-zod";
import { zod } from "../utils/zod";
import { password_reset } from "./password-reset.sql";
import { z } from "zod";
import { randomUUID } from "crypto";
import { TimeSpan, createDate } from "oslo";
import { VisibleError } from "../error";
export module User {
  const { passwordHash, ...rest } = getTableColumns(users);

  const UserSchema = createSelectSchema(users, {
    id: (z) => z.id.uuid(),
    username: (z) => z.username.min(3).max(31),
    email: (z) => z.email.email(),
    passwordHash: (z) => z.passwordHash,
  });

  const ResetTokenSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    expiresAt: z.date(),
  });

  export const byId = zod(UserSchema.shape.id, async (id) => {
    const [user] = await db
      .select({ ...rest })
      .from(users)
      .where(eq(users.id, id))
      .execute();
    return user;
  });

  export const byUsername = zod(UserSchema.shape.username, async (username) => {
    const respone = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .execute();
    return respone[0];
  });

  export const byEmail = zod(UserSchema.shape.email, async (email) => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    return user;
  });

  export const create = zod(
    UserSchema.omit({ emailVerified: true }),
    async (newUser) => {
      const [user] = await db
        .insert(users)
        .values({
          ...newUser,
        })
        .returning();
      return user;
    }
  );

  export const updatePassword = zod(
    UserSchema.pick({ id: true, passwordHash: true }),
    async (data) => {
      const [user] = await db
        .update(users)
        .set({ passwordHash: data.passwordHash })
        .where(eq(users.id, data.id))
        .returning();
      return user;
    }
  );

  export const verifyEmail = zod(UserSchema.shape.id, async (id) => {
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
      })
      .where(eq(users.id, id))
      .execute();
  });

  export const findResetToken = zod(ResetTokenSchema.shape.id, async (id) => {
    const [token] = await db
      .select()
      .from(password_reset)
      .where(eq(password_reset.id, id))
      .execute();

    // if (!token) {
    //   throw new VisibleError("auth", "code.invalid", "Invalid token");
    // }
    return token;
  });

  export const createResetToken = zod(
    ResetTokenSchema.shape.id,
    async (userId) => {
      //TODO: this is where I need to use db transactions
      await db
        .delete(password_reset)
        .where(eq(password_reset.userId, userId))
        .execute();

      const [token] = await db
        .insert(password_reset)
        .values({
          id: randomUUID(),
          expiresAt: createDate(new TimeSpan(1, "d")),
          userId,
        })
        .returning();
      return token;
    }
  );
}
