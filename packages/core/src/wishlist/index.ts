import { createSelectSchema } from "drizzle-zod";
import { wishlists } from "./wishlists.sql";
import { zod } from "../utils/zod";
import { db } from "../drizzle";
import { eq } from "drizzle-orm";
import { wishlist_items } from "./wishlist-items.sql";
import { card_printings } from "../cards/card-printings.sql";

const ListSchema = createSelectSchema(wishlists, {
  id: (z) => z.id.uuid(),
  userId: (z) => z.userId.uuid(),
});

const ItemSchema = createSelectSchema(wishlist_items, {
  id: (z) => z.id.uuid(),
  wishlistId: (z) => z.wishlistId.uuid(),
  quantity: (z) => z.quantity.int().positive().optional(),
});

export const listsbyUserId = zod(ListSchema.shape.userId, async (userId) => {
  const userLists = await db
    .select()
    .from(wishlists)
    .leftJoin(wishlist_items, eq(wishlists.id, wishlist_items.wishlistId))
    .innerJoin(
      card_printings,
      eq(wishlist_items.cardPrintingId, card_printings.unique_id)
    )
    .where(eq(wishlists.userId, userId))
    .execute();

  return userLists;
});

export const listById = zod(ListSchema.shape.id, async (id) => {
  const [list] = await db
    .select()
    .from(wishlists)
    .where(eq(wishlists.id, id))
    .execute();
  return list;
});

export const createList = zod(ListSchema, async (newWishlist) => {
  const [wishlist] = await db
    .insert(wishlists)
    .values({
      ...newWishlist,
    })
    .returning();

  return wishlist;
});

export const createItem = zod(ItemSchema, async (newItem) => {
  const [item] = await db
    .insert(wishlist_items)
    .values({
      ...newItem,
    })
    .returning();

  return item;
});

export const createUserListIfNotExists = zod(ListSchema, async (newList) => {
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
