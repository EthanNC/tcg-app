import { database } from "./database";
import { email } from "./email";

export const api = new sst.aws.Function("Api", {
  url: true,
  link: [email, database],
  nodejs: {
    install: ["@node-rs/argon2"],
  },
  environment: {
    NODE_ENV: $dev ? "development" : "production",
  },
  handler: "./packages/functions/src/api/index.handler",
});

export const outputs = {
  api: api.url,
};
