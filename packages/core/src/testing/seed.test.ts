import { describe, expect, it } from "vitest";
import { Cards } from "../cards";
import { cardData } from "../utils/example-card";
import { withTestCard } from "./util";

describe("seed", () => {
  withTestCard("should seed the test database", async () => {
    const card = await Cards.byId(cardData.unique_id);
    expect(card?.cards.unique_id).toEqual(cardData.unique_id);
  });
});
