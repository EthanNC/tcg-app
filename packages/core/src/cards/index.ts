import { createSelectSchema } from "drizzle-zod";
import { db } from "../drizzle";
import { cards } from "./cards.sql";
import { arrayContains, eq, sql } from "drizzle-orm";
import { zod } from "../utils/zod";
import { card_printings } from "./card-printings.sql";
import { prepareSearchQueryForTsQuery } from "../utils/search";

const Schema = createSelectSchema(cards, {
  unique_id: (z) => z.unique_id,
});

export const byId = zod(Schema.shape.unique_id, async (unique_id) => {
  const [card] = await db
    .select()
    .from(cards)
    .innerJoin(
      card_printings,
      eq(cards.unique_id, card_printings.card_unique_id)
    )
    .where(eq(cards.unique_id, unique_id))
    .execute();
  return card;
});

export const getRandomCardId = async () => {
  const response: { unique_id: string }[] = await db.execute(
    sql<string>`select unique_id from ${cards} offset floor(random() * (select count(*) from ${cards})) limit 1`
  );
  return response[0]?.unique_id;
};

export const getRandomHeroCardId = async () => {
  const response = await db
    .select({ unique_id: cards.unique_id })
    .from(cards)
    .where(arrayContains(cards.types, ["Hero"]))
    .offset(Math.floor(Math.random() * 100))
    .limit(1)
    .execute();

  return response[0]?.unique_id;
};

export const searchByName = zod(Schema.shape.name, async (name) => {
  const searchQuery = prepareSearchQueryForTsQuery(name);
  const searchResults = await db
    .select({
      // Select only the columns we need
      name: cards.name,
      unique_ids: sql<string[]>`array_agg(${cards.unique_id})`,
      pitches: sql<string[]>`array_agg(${cards.pitch})`,
    })
    .from(cards)
    .where(
      sql`${cards.name} @@ websearch_to_tsquery('english', ${searchQuery})`
    )
    .groupBy(cards.name);

  return searchResults;
});
