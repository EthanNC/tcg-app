import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
// import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  LoginResponseType,
  LoginResponseType400,
  hasSessionToken,
  loginUser,
} from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/providers/auth";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Component,
});

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be more than 2 characters.",
    })
    .max(31, { message: "Username must be less than 32 characters." }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(255, { message: "Password must be less than 256 characters." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function Component() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const auth = useAuth();

  const mutation = useMutation<
    LoginResponseType,
    LoginResponseType400,
    LoginFormValues
  >({
    mutationFn: (values) => loginUser(values.username, values.password),
    onSuccess: (data) => {
      setSubmitSuccess(true);
      if (hasSessionToken(data)) {
        auth?.login(data.token, data.user.id);
      }
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error(error);
      setLoginError(error.message);
      setIsSubmitting(false);
    },
  });

  React.useLayoutEffect(() => {
    if (auth?.user && submitSuccess) {
      router.history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, submitSuccess]);

  function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    mutation.mutate(values);
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
          Don't have an account?
          <Link className="hover:underline" to="/auth/signup">
            Click here Sign up
          </Link>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {loginError && <FormMessage>{loginError}</FormMessage>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {loginError && (
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )} */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to={"/auth/forgot-password"}>Forgot password?</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
