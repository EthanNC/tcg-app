import { pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { set_printings } from "../drizzle/schema.sql";
import { cards } from "./cards.sql";

export const card_printings = pgTable(
  "card_printings",
  {
    unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
    card_unique_id: varchar("card_unique_id", { length: 21 })
      .notNull()
      .references(() => cards.unique_id),
    set_printing_unique_id: varchar("set_printing_unique_id", { length: 21 })
      .notNull()
      .references(() => set_printings.unique_id),
    card_id: varchar("card_id", { length: 15 }).notNull(),
    set_id: varchar("set_id", { length: 15 }).notNull(),
    edition: varchar("edition", { length: 15 }).notNull(),
    foiling: varchar("foiling", { length: 15 }).notNull(),
    rarity: varchar("rarity", { length: 15 }).notNull(),
    artist: varchar("artist", { length: 1000 }).notNull(),
    art_variation: varchar("art_variation", { length: 15 }).notNull(),
    flavor_text: varchar("flavor_text", { length: 10000 }).notNull(),
    flavor_text_plain: varchar("flavor_text_plain", {
      length: 10000,
    }).notNull(),
    image_url: varchar("image_url", { length: 1000 }).notNull(),
    tcgplayer_product_id: varchar("tcgplayer_product_id", {
      length: 100,
    }).notNull(),
    tcgplayer_url: varchar("tcgplayer_url", { length: 1000 }).notNull(),
  },
  (table) => {
    return {
      card_printings_unique_id_card_id_edition_art_variation_key: unique(
        "card_printings_unique_id_card_id_edition_art_variation_key"
      ).on(table.unique_id, table.card_id, table.edition, table.art_variation),
    };
  }
);
