import { Hono } from "hono";
import { Context } from "src/lib/context";
import {
  createItem,
  createUserListIfNotExists,
  listsbyUserId,
} from "@tcg-app/core/wishlist";
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
    const lists = await listsbyUserId(user?.id!);
    return c.json(lists);
  })
  .post("/add-item", async (c) => {
    const { cardId } = await c.req.json<{ cardId: string }>();
    const user = c.get("user");

    const defaultList = {
      id: randomUUID(),
      userId: user?.id!,
      name: "Default",
      createdAt: new Date(),
    };
    const wishlist = await createUserListIfNotExists(defaultList);

    const addItem = {
      id: randomUUID(),
      wishlistId: wishlist.id,
      cardPrintingId: cardId,
      updatedAt: new Date(),
    };

    const item = await createItem(addItem);

    return c.json(item);
  });

export default app;
