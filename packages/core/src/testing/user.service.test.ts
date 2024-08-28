import { test, expect } from "vitest";
import { User } from "../user";
import { randomUUID } from "node:crypto";

test("create user", async () => {
  const id = randomUUID();

  const user = await User.create({
    id: id,
    username: "test",
    email: "test@test.com",
    passwordHash: "123456",
  });

  expect(user?.id).toEqual(id);
});
