import { Resource } from "sst";
// import { $ } from "bun";

// $.env({ PGPASSWORD: Resource.Database.password });

// await $`psql postgres://${Resource.Database.user}:${Resource.Database.password}@${Resource.Database.host}:/${Resource.Database.database}`;
//
// const result =
//   await $`psql -h ${Resource.Database.host} -p 6543 -d postgres -U ${Resource.Database.user}`.arrayBuffer();

// console.log(result);

import { execSync } from "child_process";
execSync(
  `PGPASSWORD=${Resource.Database.password} psql -h ${Resource.Database.host} -p 6543 -d postgres -U ${Resource.Database.user}`,
  { stdio: "inherit" }
);
