import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { wishlists } from "./wishlists.sql";
import { card_printings } from "../cards/card-printings.sql";

export const wishlist_items = pgTable(
  "wishlist_items",
  {
    id: uuid("id").primaryKey(),
    wishlistId: uuid("wishlist_id")
      .notNull()
      .references(() => wishlists.id, { onDelete: "cascade" }),
    cardPrintingId: varchar("card_printing_id", { length: 21 })
      .notNull()
      .references(() => card_printings.unique_id, { onDelete: "cascade" }),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
    quantity: integer("quantity").notNull().default(1),
  },
  (table) => ({
    uniqueConstraint: uniqueIndex("wishlist_id_card_printing_id_idx").on(
      table.wishlistId,
      table.cardPrintingId
    ),
  })
);
