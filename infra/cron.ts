if ($app.stage === "production") {
  new sst.aws.Cron("DbBackup", {
    job: "./packages/functions/src/ping.handler",
    schedule: "rate(1 day)",
  });
}
