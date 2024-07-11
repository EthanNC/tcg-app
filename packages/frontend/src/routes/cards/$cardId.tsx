import CardDetails from "@/components/CardDetails";
import { getCardQueryOptions } from "@/lib/api";
import { queryClient } from "@/main";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cards/$cardId")({
  loader: ({ params: { cardId } }) =>
    queryClient.ensureQueryData(getCardQueryOptions(cardId)),
  component: CardComponent,
});

export default function CardComponent() {
  const cardId = Route.useParams().cardId;
  const {
    isPending,
    error,
    data: card,
  } = useSuspenseQuery(getCardQueryOptions(cardId));

  console.log({ isPending, error, card });

  return <CardDetails cardData={card} />;
}
