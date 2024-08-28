import { describe, expect } from "vitest";
import { withTestCard, withTestUser } from "./util";
import { randomUUID } from "node:crypto";
import { createItem, createList, deleteItem, listById } from "../wishlist";

describe("wishlist", () => {
  const listId = randomUUID();
  const itemId = randomUUID();
  withTestUser("create list", async (id) => {
    await createList({
      name: "My List",
      id: listId as string,
      userId: id,
      createdAt: new Date(),
    });
    const result = await listById(listId);
    expect(result?.wishlists).toHaveProperty("name", "My List");
    expect(result?.wishlists).toHaveProperty("userId", id);
    expect(result?.wishlist_items).toBeFalsy();
  });

  withTestCard("add item to list", async ({ userId, cardPrintingId }) => {
    await createList({
      name: "My List",
      id: listId as string,
      userId: userId,
      createdAt: new Date(),
    });

    await createItem({
      id: itemId,
      wishlistId: listId as string,
      cardPrintingId: cardPrintingId,
      updatedAt: new Date(),
    });

    const list = await listById(listId);

    expect(list?.wishlist_items).toHaveProperty(
      "cardPrintingId",
      "q9B6nmKrdz8HnQnJMpQdc"
    );
  });

  withTestCard("remove item from list", async ({ userId, cardPrintingId }) => {
    await createList({
      name: "My List",
      id: listId as string,
      userId: userId,
      createdAt: new Date(),
    });

    await createItem({
      id: itemId,
      wishlistId: listId as string,
      cardPrintingId: cardPrintingId,
      updatedAt: new Date(),
    });

    await deleteItem(itemId);

    const list = await listById(listId);
    expect(list?.wishlist_items).toBeFalsy();
  });
});
