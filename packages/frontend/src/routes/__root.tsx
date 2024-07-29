import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useMutation, type QueryClient } from "@tanstack/react-query";
import { IAuthContext } from "@/hooks/providers/auth";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/api/auth";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: IAuthContext | null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  const { auth } = Route.useRouteContext();
  const mutation = useMutation({
    mutationFn: (token: string) => logoutUser(token),
    onSuccess: () => {
      auth?.logout();
      window.location.reload();
    },
  });

  return (
    <div className="p-2 flex justify-between max-w-2xl m-auto items-baseline">
      <Link to="/">
        <h1 className="text-2xl font-bold">TCG-APP</h1>
      </Link>
      <div className="flex gap-2 items-center">
        {auth?.isAuthenticated ? (
          <Button
            onClick={() => mutation.mutate(auth.user!)}
            variant="link"
            size="lg"
          >
            Logout
          </Button>
        ) : (
          <Link to="/auth/login" className="[&.active]:font-bold">
            Login
          </Link>
        )}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
