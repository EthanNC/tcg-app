import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthProviderContext, useAuth } from "./hooks/providers/auth";
import Container from "./components/container";
import { Button } from "./components/ui/button";

// Create a client
export const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { auth: undefined!, queryClient },
  defaultNotFoundComponent: () => (
    <Container>
      404 Not Found
      <Button variant="link">
        <Link to="/">Go Home</Link>
      </Button>
    </Container>
  ),
  defaultErrorComponent: ({ error }) => (
    <Container>
      Error: {error.message}
      <Button variant="link">
        <Link to="/">Go Home</Link>
      </Button>
    </Container>
  ),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Router = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProviderContext>
      <QueryClientProvider client={queryClient}>
        <Router />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </AuthProviderContext>
  </React.StrictMode>
);
