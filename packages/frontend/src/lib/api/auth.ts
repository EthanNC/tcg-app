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
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}
