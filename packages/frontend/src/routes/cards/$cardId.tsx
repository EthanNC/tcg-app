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

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3">
        <h1 className="text-3xl font-bold">{card?.cards.name}</h1>
      </div>
      <div className="col-span-1">
        <img src={card?.card_printings.image_url} alt={card?.cards.name} />
      </div>
      <div className="col-span-2">
        <p>{card?.cards.functional_text}</p>
      </div>
    </div>
  );
}
