import { createSelectSchema } from "drizzle-zod";
import { db } from "../drizzle";
import { cards } from "./cards.sql";
import { eq, sql } from "drizzle-orm";
import { zod } from "../utils/zod";

const Schema = createSelectSchema(cards, {
  unique_id: (z) => z.unique_id,
});

export const byId = zod(Schema.shape.unique_id, async (unique_id) => {
  const card = await db
    .select()
    .from(cards)
    .where(eq(cards.unique_id, unique_id))
    .execute();
  return card[0];
});

export const getRandomCardId = async () => {
  const response: { unique_id: string }[] = await db.execute(
    sql<string>`select unique_id from ${cards} offset floor(random() * (select count(*) from ${cards})) limit 1`
  );
  return response[0]?.unique_id;
};

export const searchByName = zod(Schema.shape.name, async (name) => {
  const searchResults = await db
    .select()
    .from(cards)
    .where(
      sql`to_tsvector('english', ${cards.name}) @@ to_tsquery('english', ${name})`
    );

  return searchResults;
});
