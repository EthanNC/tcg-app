import { pgTable, unique, varchar } from "drizzle-orm/pg-core";

export const sets = pgTable(
  "sets",
  {
    unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
    id: varchar("id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      sets_unique_id_id_key: unique("sets_unique_id_id_key").on(
        table.unique_id,
        table.id
      ),
    };
  }
);
