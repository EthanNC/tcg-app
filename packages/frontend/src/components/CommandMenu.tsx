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
import { Link, useNavigate } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";
import { useEffect } from "react";

export function CommandMenu() {
  const navigate = useNavigate({ from: "/posts/$postId" });

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

  return (
    <Command className="mt-10 rounded-lg border shadow-md">
      <CommandInput placeholder="Search for a card..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
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
