import { database } from "./database";

export const api = new sst.aws.Function("Api", {
  url: true,
  link: [database],
  nodejs: {
    install: ["@node-rs/argon2"],
  },
  environment: {
    NODE_ENV: $dev ? "development" : "production",
  },
  handler: "./packages/functions/src/api/index.handler",
});
