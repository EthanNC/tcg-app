import CardDetails from "@/components/CardDetails";
import { getRandomCardQueryOptions } from "@/lib/api/cards";
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
  return <CardDetails cardData={card} />;
}
