import { pgTable, timestamp, unique, varchar } from "drizzle-orm/pg-core";
import { sets } from "./sets.sql";

export const set_printings = pgTable(
  "set_printings",
  {
    unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
    set_unique_id: varchar("set_unique_id", { length: 21 })
      .notNull()
      .references(() => sets.unique_id),
    language: varchar("language", { length: 10 }).notNull(),
    edition: varchar("edition", { length: 255 }).notNull(),
    start_card_id: varchar("start_card_id", { length: 15 }).notNull(),
    end_card_id: varchar("end_card_id", { length: 15 }).notNull(),
    initial_release_date: timestamp("initial_release_date", { mode: "string" }),
    out_of_print_date: timestamp("out_of_print_date", { mode: "string" }),
    product_page: varchar("product_page", { length: 1000 }),
    collectors_center: varchar("collectors_center", { length: 1000 }),
    card_gallery: varchar("card_gallery", { length: 1000 }),
  },
  (table) => {
    return {
      set_printings_set_unique_id_language_edition_key: unique(
        "set_printings_set_unique_id_language_edition_key"
      ).on(table.set_unique_id, table.language, table.edition),
    };
  }
);
