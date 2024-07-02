import { getRandomCardQueryOptions } from "@/lib/api";
import { queryClient } from "@/main";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/random")({
  loader: () => queryClient.ensureQueryData(getRandomCardQueryOptions),
  component: RandomCard,
});

export default function RandomCard() {
  const {
    isPending,
    error,
    data: card,
  } = useSuspenseQuery(getRandomCardQueryOptions);

  console.log({ isPending, error, card });
  return <div>{JSON.stringify(card, null, 2)}</div>;
}
