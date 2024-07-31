import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";

export const wishlists = pgTable("wishlists", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
});
