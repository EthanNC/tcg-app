import { InferResponseType } from "hono";
import { client } from ".";

const signup = client.auth.signup.$post;

export async function signupUser(
  username: string,
  email: string,
  password: string
): Promise<SignupResponseType> {
  const res = await signup({
    json: { username, email, password },
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

export type SignupResponseType = InferResponseType<typeof signup>;
export type SignupResponseType200 = InferResponseType<typeof signup, 201>;
export type SignupResponseType400 = InferResponseType<typeof signup, 409>;

const login = client.auth.login.$post;

export type LoginResponseType = InferResponseType<typeof login>;
export type LoginResponseType200 = InferResponseType<typeof login, 201>;
export type LoginResponseType400 = InferResponseType<typeof login, 400>;

export async function loginUser(username: string, password: string) {
  const res = await login({
    json: { username, password },
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();

  return data;
}

export function hasSessionToken(
  response: LoginResponseType
): response is LoginResponseType200 {
  return "token" in response;
}

export async function logoutUser(token: string) {
  const res = await client.auth.logout.$post(
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

export async function getMe(token: string) {
  const res = await client.auth.me.$get(
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

const verify = client.auth["verify-email"].$post;
export type VerifyEmailResponseType = InferResponseType<typeof verify>;
export type VerifyEmailResponseType200 = InferResponseType<typeof verify, 200>;
export type VerifyEmailResponseType400 = InferResponseType<typeof verify, 400>;

export async function verifyEmail(code: string, token: string) {
  const res = await verify(
    { json: { code } },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

const resendVerification = client.auth["resend-verification"].$post;

export async function resendVerificationEmail(token: string) {
  const res = await resendVerification(
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

export async function verifyResetCode(code: string) {
  const res = await client.auth["reset-password"][":code"].$get({
    param: { code },
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

const forgotPassword = client.auth["forgot-password"].$post;

export async function forgotPasswordEmail(email: string) {
  const res = await forgotPassword({
    json: { email },
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const data = await res.json();
  return data;
}

const reset = client.auth["reset-password"].$post;
export type ResetPasswordResponseType = InferResponseType<typeof reset>;
export type ResetPasswordResponseType200 = InferResponseType<typeof reset, 200>;
export type ResetPasswordResponseType400 = InferResponseType<typeof reset, 400>;
export async function resetPassword(password: string, code: string) {
  const res = await reset({
    json: { password, code },
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  const data = await res.json();
  return data;
}
