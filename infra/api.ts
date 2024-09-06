import { database } from "./database";
import { email } from "./email";

export const api = new sst.aws.Function("Api", {
  url: true,
  link: [email, database],
  nodejs: {
    loader: {
      ".node": "copy",
    },
    install: ["@node-rs/argon2", "@node-rs/argon2-linux-x64-gnu"],
  },
  environment: {
    NODE_ENV: $dev ? "development" : "production",
  },
  handler: "./packages/functions/src/api/index.handler",
  permissions: [
    {
      actions: ["ses:SendEmail"],
      resources: ["*"],
    },
  ],
});

export const outputs = {
  api: api.url,
};
