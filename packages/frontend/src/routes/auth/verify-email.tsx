import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/providers/auth";
import { getMe, resendVerificationEmail, verifyEmail } from "@/lib/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useLayoutEffect, useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/auth/verify-email")({
  loader: ({ context: { queryClient, auth } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["me"],
      queryFn: async () => await getMe(auth!.user as string),
    });
  },
  component: Component,
});

const Schema = z.object({
  code: z.string().length(6),
  token: z.string(),
});

type MutationValues = z.infer<typeof Schema>;

export default function Component() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [resendStatus, setResendStatus] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(auth?.user as string),
    enabled: !!auth?.user,
  });

  useLayoutEffect(() => {
    if (data?.verified) {
      // Redirect to the verify email page
      router.history.push("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const mutation = useMutation({
    mutationFn: (values: MutationValues) =>
      verifyEmail(values.code, values.token),

    onSuccess: () => {
      // Redirect to the profile page
      router.history.push("/profile");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const resendMutation = useMutation({
    mutationFn: (token: string) => resendVerificationEmail(token),
    onSuccess: () => {
      setResendStatus("Code resent successfully.");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <Container>
      <h1 className="text-3xl">Verify Email</h1>
      <p className="text-lg">
        Please enter the verification code sent to your email address.
      </p>
      <FormMessage>{error}</FormMessage>
      <br />
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {/* resend code */}
      <p>
        Didn't receive the code?
        <Button
          onClick={() => resendMutation.mutate(auth?.user as string)}
          className="my-2"
          variant="link"
          disabled={resendMutation.isPending}
        >
          Resend code
        </Button>
        <p>{resendStatus}</p>
      </p>
      <br />
      <Button
        disabled={value.length !== 6}
        onClick={() =>
          mutation.mutate({
            code: value,
            token: auth?.user as string,
          })
        }
        type="submit"
      >
        Submit
      </Button>
    </Container>
  );
}
