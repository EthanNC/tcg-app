import { queryOptions } from "@tanstack/react-query";
import { type ApiRoutes } from "@tcg-app/functions/api/index.ts";
import { InferResponseType, hc } from "hono/client";

const client = hc<ApiRoutes>(import.meta.env.VITE_API_URL);

export async function getCard(id: string) {
  const res = await client.cards[":id"].$get({ param: { id } });
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const getCardQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["card", id],
    queryFn: () => getCard(id),
    staleTime: 1000 * 60 * 5,
  });

const $get = client.cards[":id"].$get;
export type GetCardResponse = InferResponseType<typeof $get>;

export async function getRandomCard() {
  const res = await client.random.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const getRandomCardQueryOptions = queryOptions({
  queryKey: ["random-card"],
  queryFn: getRandomCard,
  staleTime: 1000 * 60 * 5,
});

export async function searchCard(name: string) {
  const res = await client.cards.search.$get({
    query: { name },
  });
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const searchCardQueryOptions = (name: string) =>
  queryOptions({
    queryKey: ["search-card", name],
    queryFn: () => searchCard(name),
    refetchOnWindowFocus: false,
    // 30 minutes
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    enabled: name.length > 1,
  });
