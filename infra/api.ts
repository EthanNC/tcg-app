export const api = new sst.aws.Function("Api", {
  url: true,
  handler: "./packages/functions/src/api.handler",
});
