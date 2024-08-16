import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { sql } from "drizzle-orm";
import { afterAll, afterEach, beforeEach, vi } from "vitest";
import { migrate } from "drizzle-orm/pglite/migrator";

const client = new PGlite();
export const db = drizzle(client);

vi.mock("postgres", () => ({ default: () => client }));
vi.mock("drizzle-orm/postgres-js", () => ({ drizzle }));
// Apply migrations before each test
beforeEach(async () => {
  await migrate(db, {
    migrationsFolder: "./packages/core/migrations",
  });
});

// Clean up the database after each test
afterEach(async () => {
  await db.execute(sql`drop schema if exists public cascade`);
  await db.execute(sql`create schema public`);
  await db.execute(sql`drop schema if exists drizzle cascade`);
});

// Free up resources after all tests are done
afterAll(async () => {
  client.close();
});
