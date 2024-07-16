import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("list sets"));
app.get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
