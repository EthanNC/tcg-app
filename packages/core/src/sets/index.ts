import { createSelectSchema } from "drizzle-zod";
import { zod } from "../utils/zod";
import { sets } from "./sets.sql";
import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { set_printings } from "./set-printings.sql";

const Schema = createSelectSchema(sets, {
  unique_id: (z) => z.unique_id,
  id: (z) => z.id.length(3).toUpperCase(),
});

export const all = zod(Schema.array(), async () => {
  const allSets = await db
    .select()
    .from(sets)
    .innerJoin(set_printings, eq(sets.unique_id, set_printings.set_unique_id))
    .execute();
  return allSets;
});

export const byUniqueId = zod(Schema.shape.unique_id, async (unique_id) => {
  const set = await db
    .select()
    .from(sets)
    .innerJoin(set_printings, eq(sets.unique_id, set_printings.set_unique_id))
    .where(eq(sets.unique_id, unique_id))
    .execute();
  return set[0];
});

export const findByName = zod(Schema.shape.id, async (id) => {
  const set = await db
    .select()
    .from(sets)
    .innerJoin(set_printings, eq(sets.unique_id, set_printings.set_unique_id))
    .where(eq(sets.id, id))
    .execute();
  return set[0];
});
