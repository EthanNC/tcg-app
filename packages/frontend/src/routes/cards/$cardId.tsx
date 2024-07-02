import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cards/$cardId")({
  component: CardComponent,
});

export default function CardComponent() {
  const cardId = Route.useParams().cardId;
  return <div>{`Hello /cards/${cardId}!`}</div>;
}
