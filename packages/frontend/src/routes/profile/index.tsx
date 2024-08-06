import Spinner from "@/components/Spinner";
import UserWishlists from "@/components/UserWishlists";
import { getMe } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
  loader: ({ context: { queryClient, auth } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["me"],
      queryFn: async () => await getMe(auth!.user as string),
    });
  },
  pendingComponent: Spinner,
  component: Component,
});

export default function Component() {
  const { auth } = Route.useRouteContext();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(auth?.user as string),
    enabled: !!auth?.user,
  });

  if (!data) return <Spinner />;
  return (
    <div>
      <h1 className="text-4xl">{data?.username}</h1>
      <br />

      <UserWishlists userData={{ token: auth!.user, userId: data?.id }} />
    </div>
  );
}
