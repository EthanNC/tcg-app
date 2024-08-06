import {
  createList,
  CreateListResponseType,
  CreateListResponseType200,
  deleteItem,
  DeleteItemResponseType,
  DeleteItemResponseType200,
  GetUserListsQueryOptions,
  getUserListsQueryOptions,
} from "@/lib/api/lists";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

import { PlusIcon, ImagePlusIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import Container from "./container";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export default function UserWishlists({
  userData: { userId, token },
}: {
  userData: GetUserListsQueryOptions;
}) {
  const [selectedList, setSelectedList] = useState<string | null>("Default");
  const { data: listsData, refetch: refetchList } = useQuery(
    getUserListsQueryOptions({ userId, token })
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogInput, setDialogInput] = useState("");

  const createListMutation = useMutation<
    CreateListResponseType,
    CreateListResponseType200,
    { name: string; token: string | null }
  >({
    mutationFn: (values) => createList(values.token, values.name),
    onSuccess: () => {
      refetchList();
      setIsDialogOpen(false);
    },
  });

  const deleteItemMutation = useMutation<
    DeleteItemResponseType,
    DeleteItemResponseType200,
    { itemId: string; token: string | null }
  >({
    mutationFn: (values) => deleteItem(values.token, values.itemId),
    onSuccess: () => {
      refetchList();
    },
  });

  if (!listsData)
    return (
      <Container>
        <h1>No Wishlist Found</h1>
      </Container>
    );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl">Your Wishlists</h3>
        <div className="flex gap-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New List</DialogTitle>
                <DialogDescription>
                  Enter the name of the wishlist you want to create
                </DialogDescription>
              </DialogHeader>
              <div>
                <Input
                  type="text"
                  name="name"
                  value={dialogInput}
                  onChange={(e) => setDialogInput(e.target.value)}
                  placeholder="Wishlist Name"
                  className="w-full p-2"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() =>
                    createListMutation.mutate({ name: dialogInput, token })
                  }
                  disabled={createListMutation.isPending}
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Select onValueChange={setSelectedList}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {listsData.map((list, idx) => (
                  <SelectItem
                    defaultChecked={idx === 0 ? true : false}
                    value={list.name}
                    key={list.id}
                    className="p-2"
                  >
                    {list.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {listsData
          .find((list) => list.name === selectedList)
          ?.items.map((card) => {
            if (card.id === null) return null;
            return (
              <div className="flex flex-col gap-2 items-center" key={card.id}>
                <Link to="/cards/$cardId" params={{ cardId: card.cardId }}>
                  <img src={card.cardImage} />
                </Link>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a target="_blank" href={card.tcgPlayer}>
                      <ImagePlusIcon className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    onClick={() =>
                      deleteItemMutation.mutate({ itemId: card.id, token })
                    }
                    variant="destructive"
                    size="sm"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
