import { Resource } from "sst";
import { $ } from "bun";

// await $`psql 'postgres://${Resource.Database.user}:${Resource.Database.password}@${Resource.Database.host}:/${Resource.Database.database}'`;
await Bun.write(
  Bun.stdout,
  `postgres://${Resource.Database.user}:${Resource.Database.password}@${Resource.Database.host}:/${Resource.Database.database}`
);
