import { Cards } from "@tcg-app/core/cards";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  try {
    await Cards.getRandomCardId();
  } catch (err) {
    console.error(err);
  }
  return {
    statusCode: 200,
    body: JSON.stringify("Pong"),
  };
};
