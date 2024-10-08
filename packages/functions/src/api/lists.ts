import { Hono } from "hono";
import { Context } from "src/lib/context";
import { Wishlists } from "@tcg-app/core/wishlist";
import { randomUUID } from "node:crypto";

const app = new Hono<Context>()
  .use("*", async (c, next) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    return next();
  })
  .get("/", async (c) => {
    const user = c.get("user");
    const lists = await Wishlists.byUserId(user?.id!);
    return c.json(lists);
  })
  .post("/", async (c) => {
    const user = c.get("user");
    const { name } = await c.req.json<{ name: string }>();

    if (!name) {
      return c.json({ error: "Name is required" }, 400);
    } else if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const newList = {
      id: randomUUID(),
      userId: user.id,
      name,
      createdAt: new Date(),
    };

    const list = await Wishlists.create(newList);

    return c.json(list);
  })
  .post("/add-item", async (c) => {
    const { cardId, listId } = await c.req.json<{
      cardId: string;
      listId: string | null;
    }>();

    if (listId) {
      const addItem = {
        id: randomUUID(),
        wishlistId: listId,
        cardPrintingId: cardId,
        updatedAt: new Date(),
      };

      const item = await Wishlists.addItem(addItem);
      return c.json(item);
    }

    const user = c.get("user");
    const defaultList = {
      id: randomUUID(),
      userId: user?.id!,
      name: "Default",
      createdAt: new Date(),
    };
    const wishlist = await Wishlists.createIfNoneExistOnUser(defaultList);

    const addItem = {
      id: randomUUID(),
      wishlistId: wishlist.id,
      cardPrintingId: cardId,
      updatedAt: new Date(),
    };

    const item = await Wishlists.addItem(addItem);

    return c.json(item);
  })
  .post("/delete-item", async (c) => {
    const { itemId } = await c.req.json<{ itemId: string }>();
    const item = await Wishlists.deleteItem(itemId);

    return c.json(item);
  });

export default app;
