import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

export default function Index() {
  return (
    <Button asChild>
      <Link to="/random">Random Card</Link>
    </Button>
  );
}
