import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/auth/forgot-password")({
  component: Component,
});

const Schema = z.object({
  email: z.string().email(),
});

export default function Component() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  return (
    <Container>
      <Card className="w-[450px] p-2">
        <CardTitle className="p-2">Forgot Password</CardTitle>
        <CardDescription>
          <p className="mt-2">
            Please enter your email address and we'll send you a link to reset
            your password.
          </p>
        </CardDescription>
        <CardContent className="mt-4">
          {error && <div className="text-red-500">{error}</div>}
          <Input
            value={value}
            placeholder="Email Address"
            onChange={(e) => setValue(e.target.value)}
            type="email"
          />

          <div className="mt-4 text-center">
            <Button
              onClick={async () => {
                try {
                  setError("");
                  const { email } = Schema.parse({ email: value });
                  console.log(email);
                  // Call the API to send the email
                } catch (error) {
                  if (error instanceof z.ZodError) {
                    setError(error.errors[0].message);
                    return;
                  }
                }
              }}
            >
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
