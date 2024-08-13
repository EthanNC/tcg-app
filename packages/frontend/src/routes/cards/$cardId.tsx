import CardDetails from "@/components/CardDetails";
import Spinner from "@/components/Spinner";
import { getCardQueryOptions } from "@/lib/api/cards";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/cards/$cardId")({
  loader: async ({ params: { cardId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      getCardQueryOptions(cardId)
    );
    if (!data) {
      throw notFound();
    }
    return data;
  },

  pendingComponent: Spinner,
  component: CardComponent,
});

export default function CardComponent() {
  const { cardId } = Route.useParams();
  const {
    isPending,
    error,
    data: card,
  } = useSuspenseQuery(getCardQueryOptions(cardId));

  console.log({ isPending, error, card });

  return <CardDetails cardData={card} />;
}
