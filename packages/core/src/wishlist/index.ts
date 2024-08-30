import { createSelectSchema } from "drizzle-zod";
import { wishlists } from "./wishlists.sql";
import { zod } from "../utils/zod";
import { db } from "../drizzle";
import { eq, getTableColumns } from "drizzle-orm";
import { wishlist_items } from "./wishlist-items.sql";
import { card_printings } from "../cards/card-printings.sql";
import { jsonAgg } from "../utils/pg";

export module Wishlists {
  const ListSchema = createSelectSchema(wishlists, {
    id: (z) => z.id.uuid(),
    userId: (z) => z.userId.uuid(),
  });

  const ItemSchema = createSelectSchema(wishlist_items, {
    id: (z) => z.id.uuid(),
    wishlistId: (z) => z.wishlistId.uuid(),
    quantity: (z) => z.quantity.int().positive().optional(),
  });

  export const byUserId = zod(ListSchema.shape.userId, async (userId) => {
    const userLists = await db
      .select({
        ...getTableColumns(wishlists),
        items: jsonAgg({
          id: wishlist_items.id,
          cardPrintingId: wishlist_items.cardPrintingId,
          quantity: wishlist_items.quantity,
          cardId: card_printings.card_unique_id,
          cardImage: card_printings.image_url,
          tcgPlayer: card_printings.tcgplayer_url,
        }),
      })
      .from(wishlists)
      .leftJoin(wishlist_items, eq(wishlists.id, wishlist_items.wishlistId))
      .leftJoin(
        card_printings,
        eq(wishlist_items.cardPrintingId, card_printings.unique_id)
      )
      .where(eq(wishlists.userId, userId))
      .groupBy(wishlists.id)
      .execute();

    return userLists;
  });

  export const ById = zod(ListSchema.shape.id, async (id) => {
    const [list] = await db
      .select()
      .from(wishlists)
      .leftJoin(wishlist_items, eq(wishlists.id, wishlist_items.wishlistId))
      .where(eq(wishlists.id, id))
      .execute();
    return list;
  });

  export const create = zod(ListSchema, async (newWishlist) => {
    const [wishlist] = await db
      .insert(wishlists)
      .values({
        ...newWishlist,
      })
      .returning();

    return wishlist;
  });

  export const addItem = zod(ItemSchema, async (newItem) => {
    const [item] = await db
      .insert(wishlist_items)
      .values({
        ...newItem,
      })
      .returning();

    return item;
  });

  export const deleteItem = zod(ItemSchema.shape.id, async (id) => {
    const [item] = await db
      .delete(wishlist_items)
      .where(eq(wishlist_items.id, id))
      .returning();

    return item;
  });

  export const createIfNoneExistOnUser = zod(ListSchema, async (newList) => {
    const [list] = await db
      .select()
      .from(wishlists)
      .where(eq(wishlists.userId, newList.userId))
      .execute();

    if (list) {
      return list;
    }

    const [wishlist] = await db
      .insert(wishlists)
      .values({
        ...newList,
      })
      .returning();

    return wishlist;
  });
}
