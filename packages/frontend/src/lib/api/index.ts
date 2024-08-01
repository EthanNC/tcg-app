import { AppType } from "@tcg-app/functions/api";
import { hc } from "hono/client";

export const client = hc<AppType>(import.meta.env.VITE_API_URL);
