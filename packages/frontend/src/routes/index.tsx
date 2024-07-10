import { CommandMenu } from "@/components/CommandMenu";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CardSearchSchema = z.object({
  name: z.string().optional(),
});
export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search) => CardSearchSchema.parse(search),
});

export default function Index() {
  return (
    <>
      <CommandMenu />
    </>
  );
}
