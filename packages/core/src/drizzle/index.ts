import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Resource } from "sst";

export const client = postgres({
  host: Resource.Database.host,
  database: Resource.Database.database,
  port: Resource.Database.port,
  user: Resource.Database.user,
  password: Resource.Database.password,
});

export const db = drizzle(client);
