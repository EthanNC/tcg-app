import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { searchCardQueryOptions } from "@/lib/api";
import { Link, useNavigate } from "@tanstack/react-router";
import { Forward, PersonStanding } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
export function CommandMenu() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useDebounce([searchTerm], 1000);
  const { data } = useQuery(searchCardQueryOptions(searchParams));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        navigate({ to: "/random" });
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [navigate]);
  console.log({ data });
  return (
    <Command shouldFilter={false} className="mt-10 rounded-lg border shadow-md">
      <CommandInput
        value={searchTerm}
        onValueChange={setSearchTerm}
        placeholder="Search for a card..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {data?.map((card) => (
            <CommandItem key={card.unique_id}>
              <Forward className="mr-2 h-4 w-4" />
              <Link to="/cards/$cardId" params={{ cardId: card.unique_id }}>
                <span>{card.name}</span>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Saved Searches">
          <CommandItem>
            <PersonStanding className="mr-2 h-4 w-4" />
            <Link to="/random">
              <span>Random Card</span>
            </Link>
            <CommandShortcut>ctrl/⌘ - K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
