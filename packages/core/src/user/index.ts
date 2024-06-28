import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { user } from "./user.sql";

export const getUser = async (id: string) => {
  return await db.select().from(user).where(eq(user.id, id)).execute();
};
