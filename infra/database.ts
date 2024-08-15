const project = new supabase.Project("Project", {
  name: $interpolate`${$app.name}-${$app.stage}`,
  region: "us-east-1",
  organizationId: process.env.SUPABASE_ORG_ID!,
  databasePassword: new random.RandomString("DatabasePassword", {
    length: 16,
  }).result,
});

export const database = new sst.Linkable("Database", {
  properties: {
    user: $interpolate`postgres.${project.id}`,
    password: project.databasePassword,
    host: $interpolate`aws-0-${project.region}.pooler.supabase.com`,
    port: 5432,
    database: "postgres",
  },
});

export const storage = new sst.aws.Bucket("Cardfaces", {
  public: true,
});

export const router = new sst.aws.Router("MyRouter", {
  routes: { "/*": $interpolate`https://${storage.domain}` },
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
        $interpolate`STORAGE_URL=${router.url}/images/`,
      ],
      volumes: [
        {
          containerPath: "/usr/src/app",
        },
      ],
      networkMode: "host",
    },
    { dependsOn: [project, router] }
  );
