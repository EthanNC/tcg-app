import { queryOptions } from "@tanstack/react-query";
import { client } from ".";
import { InferResponseType } from "hono";

const list = client.lists.$get;

export type UserListsResponseType = InferResponseType<typeof list>;

export async function getUserLists(token: string | null) {
  if (!token) {
    throw new Error("No token provided");
  }
  const res = await list({}, { headers: { Authorization: `Bearer ${token}` } });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

export type GetUserListsQueryOptions = {
  userId: string | null;
  token: string | null;
};

export const getUserListsQueryOptions = (userData: GetUserListsQueryOptions) =>
  queryOptions({
    queryKey: ["lists", userData.userId],
    queryFn: () => getUserLists(userData.token),
    enabled: !!userData.userId,
  });

const create = client.lists.$post;

export type CreateListResponseType = InferResponseType<typeof create>;
export type CreateListResponseType200 = InferResponseType<typeof create, 201>;

export async function createList(token: string | null, name: string) {
  if (!token) {
    throw new Error("No token provided");
  }
  const res = await create(
    { json: { name } },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

const removeItem = client.lists["delete-item"].$post;
export type DeleteItemResponseType = InferResponseType<typeof removeItem>;
export type DeleteItemResponseType200 = InferResponseType<
  typeof removeItem,
  200
>;
export async function deleteItem(token: string | null, itemId: string) {
  if (!token) {
    throw new Error("No token provided");
  }
  const res = await removeItem(
    { json: { itemId } },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}
