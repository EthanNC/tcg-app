import { createContext } from "./context";
import { VisibleError } from "./error";

export interface UserActor {
  type: "user";
  properties: {
    userID: string;
  };
}

export interface PublicActor {
  type: "public";
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  properties: {};
}

type Actor = UserActor | PublicActor;
export const ActorContext = createContext<Actor>();

export function useUserID() {
  const actor = ActorContext.use();
  if (actor.type === "user") return actor.properties.userID;
  throw new Error(`Actor is "${actor.type}" not UserActor`);
}

export function useActor() {
  try {
    return ActorContext.use();
  } catch {
    return { type: "public", properties: {} } as PublicActor;
  }
}

export function assertActor<T extends Actor["type"]>(type: T) {
  const actor = useActor();
  if (actor.type !== type)
    throw new VisibleError("auth", "actor.invalid", `Actor is not "${type}"`);
  return actor as Extract<Actor, { type: T }>;
}
