import { project } from "./database";

export const api = new sst.aws.Function("Api", {
  url: true,
  link: [project],
  handler: "./packages/functions/src/api/index.handler",
});
