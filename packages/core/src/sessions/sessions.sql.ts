import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";

export const sessions = pgTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  fresh: boolean("fresh").notNull().default(false),
});
