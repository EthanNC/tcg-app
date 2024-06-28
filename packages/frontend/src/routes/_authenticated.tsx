import { createFileRoute, Outlet } from "@tanstack/react-router";

// const Login = () => {
//   return (
//     <div className="flex flex-col gap-y-2 items-center">
//       <p>You have to login or register</p>
//       <Button asChild>
//         <a href="/api/login">Login!</a>
//       </Button>
//       <Button asChild>
//         <a href="/api/register">Register!</a>
//       </Button>
//     </div>
//   );
// };

const Component = () => {
  // const { user } = Route.useRouteContext();
  // if (!user) {
  //   return <Login />;
  // }

  return <Outlet />;
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  component: Component,
});
