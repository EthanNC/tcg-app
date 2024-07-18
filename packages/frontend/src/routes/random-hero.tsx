import CardDetails from "@/components/CardDetails";
import Spinner from "@/components/Spinner";
import { getRandomHeroCardQueryOptions } from "@/lib/api/cards";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/random-hero")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getRandomHeroCardQueryOptions),
  pendingComponent: Spinner,
  component: RandomHero,
});

export default function RandomHero() {
  const { data } = useSuspenseQuery(getRandomHeroCardQueryOptions);
  return <CardDetails cardData={data} />;
}
