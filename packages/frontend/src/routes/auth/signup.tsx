import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useMutation } from "@tanstack/react-query";
import {
  SignupResponseType,
  SignupResponseType400,
  signupUser,
} from "@/lib/api/auth";
import { useAuth } from "@/hooks/providers/auth";

export const Route = createFileRoute("/auth/signup")({
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Component,
});

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Username must be more than 2 characters.",
      })
      .max(31, { message: "Username must be less than 32 characters." }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(255, { message: "Password must be less than 256 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof formSchema>;
type SignupFormValuesWithoutConfirmPassword = Omit<
  SignupFormValues,
  "confirmPassword"
>;

export default function Component() {
  const router = useRouter();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const auth = useAuth();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const mutation = useMutation<
    SignupResponseType,
    SignupResponseType400,
    SignupFormValuesWithoutConfirmPassword
  >({
    mutationFn: (values: SignupFormValuesWithoutConfirmPassword) =>
      signupUser(values.username, values.email, values.password),
    onSuccess: (data) => {
      setSubmitSuccess(true);
      if ("token" in data) {
        auth?.login(data.token, data.user.id);
      }
    },
    onError: (error) => {
      setServerError(error.message);
    },
  });

  React.useLayoutEffect(() => {
    if (auth?.user && submitSuccess) {
      router.history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, submitSuccess]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    mutation.mutate(values);
    setIsSubmitting(false);
  }

  return (
    <div className="flex justify-center items-center ">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account today</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {serverError && <FormMessage>{serverError}</FormMessage>}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/auth/login">Already have an account? Log in</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
