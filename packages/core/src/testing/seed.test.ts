import { describe, expect, it } from "vitest";
import { Example } from "../example";
import { byId } from "../cards";
import { cardData } from "../utils/example-card";
import { withTestCard } from "./util";

describe("seed", () => {
  withTestCard("should seed the database", async () => {
    const card = await byId(cardData.unique_id);
    expect(card?.cards.unique_id).toEqual(cardData.unique_id);
  });
});
