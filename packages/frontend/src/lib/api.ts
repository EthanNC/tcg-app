import { queryOptions } from "@tanstack/react-query";
import { type ApiRoutes } from "@tcg-app/functions/api/index.ts";
import { hc } from "hono/client";

const client = hc<ApiRoutes>(import.meta.env.VITE_API_URL);

export async function getRandomCard() {
  const res = await client.random.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    // Handle responses not containing JSON
    throw new Error("Expected JSON, but received a different content type");
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
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    // Handle responses not containing JSON
    throw new Error("Expected JSON, but received a different content type");
  }
  const data = await res.json();
  return data;
}

export const searchCardQueryOptions = (name: string) =>
  queryOptions({
    queryKey: ["search-card", name],
    queryFn: () => searchCard(name),
    staleTime: 1000,
    enabled: name.length > 1,
  });
