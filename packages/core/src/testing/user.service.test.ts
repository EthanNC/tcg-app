import { test, expect } from "vitest";
import { create } from "../user";
import { randomUUID } from "node:crypto";

test("create user", async () => {
  const id = randomUUID();

  const user = await create({
    id: id,
    username: "test",
    email: "test@test.com",
    passwordHash: "123456",
  });

  expect(user?.id).toEqual(id);
});
