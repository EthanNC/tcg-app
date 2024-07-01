import { db } from "../drizzle";
import { cards } from "./cards.sql";
import { eq, sql } from "drizzle-orm";

export const getCardById = async (id: string) => {
  return await db.select().from(cards).where(eq(cards.unique_id, id)).execute();
};

export const getRandomCard = async () => {
  return await db.execute(
    sql<string>`select unique_id from ${cards} offset floor(random() * (select count(*) from ${cards})) limit 1`
  );
};
