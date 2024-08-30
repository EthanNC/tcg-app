import { Sets } from "@tcg-app/core/sets";
import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    const sets = await Sets.all([]);
    return c.json(sets);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");

    if (!id || typeof id !== "string") {
      return c.json({ error: "Invalid ID format" }, 400);
    }
    try {
      let set;
      // Assuming 'id' with length 3 should use 'findByName'
      if (id.length === 3) {
        set = await Sets.findByName(id);
      } else {
        set = await Sets.byUniqueId(id);
      }

      // Check if the set was found
      if (!set) {
        return c.json({ error: "Set not found" }, 404);
      }

      return c.json(set);
    } catch (error) {
      console.error(error);
      // Handle unexpected errors
      return c.json({ error: "Internal server error" }, 500);
    }
  });

export default app;
