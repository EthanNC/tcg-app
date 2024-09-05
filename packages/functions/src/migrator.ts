import { db, migrate } from "@tcg-app/core/drizzle";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  try {
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Migrator is running!");
  } catch (err) {
    console.error(err);
  }
  return {
    statusCode: 200,
    body: JSON.stringify("Migrator Finished!"),
  };
};
