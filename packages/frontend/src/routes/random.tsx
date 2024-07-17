import CardDetails from "@/components/CardDetails";
import Spinner from "@/components/Spinner";
import { getRandomCardQueryOptions } from "@/lib/api/cards";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/random")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getRandomCardQueryOptions),
  pendingComponent: Spinner,
  component: RandomCard,
});

export default function RandomCard() {
  const { data: card } = useSuspenseQuery(getRandomCardQueryOptions);

  return <CardDetails cardData={card} />;
}
