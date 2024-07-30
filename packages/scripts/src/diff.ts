// https://www.solberg.is/sql-diff-migrations
import { $ } from "bun";
import { Resource } from "sst";

await $`pnpm --filter "@tcg-app/core" db:generate`.quiet();

await $`cat ../core/migrations/*.sql > schema.sql`.quiet();

//https://atlasgo.io/declarative/diff#compare-a-migration-directory-to-a-database
await $`atlas schema diff --dev-url "docker://postgres/15/dev?search_path=public" --from postgres://${Resource.Database.user}:${Resource.Database.password}@${Resource.Database.host}:/${Resource.Database.database}?search_path=public --to file://schema.sql --format '{{ sql . "  " }}'`;

await $`rm schema.sql`.quiet();
