import { it } from "vitest";
import { ActorContext } from "../actor";

import { randomUUID } from "node:crypto";
import { User } from "../user";
import {
  cardData,
  printingsData,
  setData,
  setPrintingsData,
} from "../utils/example-card";
import { db } from "../drizzle";
import { sets } from "../sets/sets.sql";
import { set_printings } from "../sets/set-printings.sql";
import { cards } from "../cards/cards.sql";
import { card_printings } from "../cards/card-printings.sql";

export function withTestUser(name: string, cb: (id: string) => Promise<any>) {
  const id = randomUUID();

  return it(name, async () => {
    const user = await User.create({
      id: id,
      username: "test",
      email: "test@test.com",
      passwordHash: "123456",
    });

    await ActorContext.with(
      { type: "user", properties: { userID: user?.id as string } },
      async () => {
        await cb(user?.id as string);
      }
    );
  });
}

interface TestCardProps {
  userId: string;
  cardPrintingId: string;
}

export function withTestCard(
  name: string,
  cb: ({ userId, cardPrintingId }: TestCardProps) => Promise<any>
) {
  return it(name, async () => {
    const user = await User.create({
      id: randomUUID(),
      username: "test",
      email: "test@test.com",
      passwordHash: "123456",
    });

    await example();

    return await cb({
      userId: user?.id as string,
      cardPrintingId: printingsData[0]?.unique_id as string,
    });
  });
}

async function example() {
  // add a set and set printing
  await db.insert(sets).values(setData).execute();
  for (const setPrinting of setPrintingsData) {
    await db
      .insert(set_printings)
      .values({
        ...setPrinting,
        set_unique_id: setData.unique_id,
      })
      .execute();
  }

  //add a card and card printing from the above set
  await db.insert(cards).values(cardData).execute();
  for (const cardPrinting of printingsData) {
    await db
      .insert(card_printings)
      .values({
        ...cardPrinting,
        card_unique_id: cardData.unique_id,
      })
      .execute();
  }
}
