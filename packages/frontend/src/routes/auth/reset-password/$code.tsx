import Container from "@/components/container";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  resetPassword,
  ResetPasswordResponseType,
  ResetPasswordResponseType400,
  verifyResetCode,
} from "@/lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  notFound,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/auth/reset-password/$code")({
  loader: async ({ params }) => {
    try {
      await verifyResetCode(params.code);
    } catch (error) {
      throw notFound();
    }
  },
  pendingComponent: Spinner,
  component: Component,
  notFoundComponent: () => (
    <Container>
      Not found
      <Link className="hover:underline" to="/auth/forgot-password">
        Forgot your password?
      </Link>
    </Container>
  ),
});

const Schema = z
  .object({
    newPassword: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(255, { message: "Password must be less than 256 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof Schema>;

export default function Component() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
  const code = useParams({
    from: "/auth/reset-password/$code",
    select: (params) => params.code,
  });

  const mutation = useMutation<
    ResetPasswordResponseType,
    ResetPasswordResponseType400,
    ResetPasswordFormValues
  >({
    mutationFn: async (values) => await resetPassword(values.newPassword, code),
    // await forgotPasswordEmail(values
    onSuccess: () => {
      // Redirect to the profile page
      router.history.push("/auth/login");
    },
    onError: (error) => {
      setIsSubmitting(false);
      setServerError(error.message);
    },
  });

  function onSubmit(values: ResetPasswordFormValues) {
    setIsSubmitting(true);
    mutation.mutate(values);
  }

  return (
    <Container>
      <Card className="w-[350px]">
        <CardTitle className="p-2">Reset Password</CardTitle>
        <CardContent>
          <Form {...form}>
            {serverError && <FormMessage>{serverError}</FormMessage>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-4" type="submit" disabled={isSubmitting}>
                {form.formState.isSubmitting
                  ? "Resetting password..."
                  : "Reset"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}
