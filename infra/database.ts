const project = new supabase.Project("Database", {
  name: $interpolate`${$app.name}-${$app.stage}`,
  region: "us-east-1",
  organizationId: process.env.SUPABASE_ORG_ID!,
  databasePassword: new random.RandomString("DatabasePassword", {
    length: 16,
  }).result,
});

!$dev &&
  new docker.Container(
    "Data",
    {
      image: "ghcr.io/ethannc/flesh-and-blood-cards:latest",
      envs: [
        $interpolate`POSTGRES_HOST=aws-0-${project.region}.pooler.supabase.com`,
        "POSTGRES_PORT=5432",
        "POSTGRES_NAME=postgres",
        $interpolate`POSTGRES_USER=postgres.${project.id}`,
        $interpolate`POSTGRES_PASSWORD=${project.databasePassword}`,
      ],
      volumes: [
        {
          containerPath: "/usr/src/app",
        },
      ],
      networkMode: "host",
    },
    { dependsOn: project }
  );
