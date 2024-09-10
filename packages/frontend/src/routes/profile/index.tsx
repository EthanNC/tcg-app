import Spinner from "@/components/Spinner";
import UserWishlists from "@/components/UserWishlists";
import { getMe } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

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
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(auth?.user as string),
    enabled: !!auth?.user,
  });

  useLayoutEffect(() => {
    console.log(data);
    if (!data?.verified) {
      // Redirect to the verify email page
      router.history.push("/auth/verify-email");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) return <Spinner />;
  return (
    <div>
      <h1 className="text-4xl">{data?.username}</h1>
      <br />

      <UserWishlists
        userData={{ token: auth!.user, userId: auth?.id as string }}
      />
    </div>
  );
}
