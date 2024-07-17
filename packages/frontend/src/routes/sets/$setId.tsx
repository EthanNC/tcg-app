import Spinner from "@/components/Spinner";
import { getSetQueryOptions } from "@/lib/api/sets";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sets/$setId")({
  loader: ({ params: { setId }, context }) =>
    context.queryClient.ensureQueryData(getSetQueryOptions(setId)),
  pendingComponent: Spinner,
  component: Component,
});

export default function Component() {
  const { setId } = Route.useParams();

  const { data: set } = useSuspenseQuery(getSetQueryOptions(setId));

  return (
    <div>
      <h1>{set.sets.name}</h1>
      <p>{set.sets.id}</p>
    </div>
  );
}
