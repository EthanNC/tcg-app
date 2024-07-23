import { project } from "./database";

export const api = new sst.aws.Function("Api", {
  url: true,
  link: [project],
  nodejs: {
    install: ["@node-rs/argon2"],
  },
  handler: "./packages/functions/src/api/index.handler",
});
