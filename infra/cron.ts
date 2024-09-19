import { database } from "./database";

if ($app.stage === "production") {
  const schedule = new sst.aws.Function("DbBackup", {
    handler: "./packages/functions/src/ping.handler",
    link: [database],
    timeout: "5 minutes",
    url: false,
  });

  new sst.aws.Cron(
    "Scheduler",
    {
      job: schedule.arn,
      schedule: "rate(1 day)",
    },
    { dependsOn: schedule }
  );
}
