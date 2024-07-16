import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { searchCardQueryOptions } from "@/lib/api/cards";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Forward, PersonStanding } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import SearchResultSkeleton from "./SearchSkeleton";
import { Command as CommandPrimitive } from "cmdk";
export function CommandMenu() {
  const navigate = useNavigate();
  //get ?name query param from header
  const looseSearch = useSearch({ strict: false }) as {
    name?: string | undefined;
  };
  const [searchTerm, setSearchTerm] = useState(looseSearch.name || "");

  const [searchParams] = useDebounce([searchTerm], 1000);

  const { data, isLoading, isError } = useQuery(
    searchCardQueryOptions(searchParams)
  );

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

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  useEffect(() => {
    if (searchParams) {
      navigate({ to: "/", search: { name: searchParams } });
    }
  }, [searchParams, navigate]);

  return (
    <Command shouldFilter={false} className="mt-10 rounded-lg border shadow-md">
      <CommandInput
        value={searchTerm}
        onValueChange={handleSearch}
        placeholder="Search for a card..."
      />

      <CommandList>
        {(data?.length === 0 || isError) && (
          <CommandPrimitive.Loading className="text-center py-2">
            no cards found
          </CommandPrimitive.Loading>
        )}
        {
          <CommandGroup>
            {isLoading && <SearchResultSkeleton />}
            {data?.map((card) => (
              <CommandItem key={card.unique_id} value={card.name + card.pitch}>
                <Forward className="mr-2 h-4 w-4" />
                <Link
                  to="/cards/$cardId"
                  params={{ cardId: card.unique_id }}
                  from={`/search?name=${card.name}`}
                >
                  <span>{card.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        }
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
