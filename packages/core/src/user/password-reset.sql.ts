import { index, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.sql";

export const password_reset = pgTable(
  "password_reset_token",
  {
    id: uuid("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => ({
    userIdIdx: index("password_reset_user_id_idx").on(table.userId),
  })
);
