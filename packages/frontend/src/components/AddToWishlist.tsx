import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/providers/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCardToList,
  AddItemResponseType,
  AddItemResponseType200,
  getUserListsQueryOptions,
  UserListsResponseType,
} from "@/lib/api/lists";
import { Link } from "@tanstack/react-router";

type AddToWishlistProps = {
  cardPrintingId: string;
};
export default function AddToWishlist({ cardPrintingId }: AddToWishlistProps) {
  const auth = useAuth();

  const {
    data: listsData,
    refetch: refetchList,
    isLoading,
  } = useQuery(
    getUserListsQueryOptions({ userId: auth!.id, token: auth!.user })
  );

  const addItemsMutation = useMutation<
    AddItemResponseType,
    AddItemResponseType200,
    { token: string; cardId: string; listId: string }
  >({
    mutationFn: (values) =>
      addCardToList(values.token, values.cardId, values.listId),
    onSuccess: () => {
      refetchList();
    },
  });
  const isCardInList = (list: UserListsResponseType[0]) => {
    return list.items.some((item) => item.cardPrintingId === cardPrintingId);
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={
            !auth?.isAuthenticated || isLoading || addItemsMutation.isPending
          }
        >
          <Tooltip>
            <TooltipTrigger>
              <Button
                disabled={!auth?.isAuthenticated}
                variant="outline"
                size="icon"
              >
                <Heart className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>add to wishlist</TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Select List</DropdownMenuLabel>
          {listsData?.map((list) => (
            <DropdownMenuItem
              onClick={() =>
                addItemsMutation.mutate({
                  token: auth!.user!,
                  cardId: cardPrintingId,
                  listId: list.id,
                })
              }
              key={list.id}
              disabled={isCardInList(list)}
            >
              {list.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button variant="link" asChild>
              <Link to="/profile">Go to Wishlist</Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
