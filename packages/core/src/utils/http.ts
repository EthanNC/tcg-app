import { DrizzleError } from "drizzle-orm";

//probs need to refactor this
export interface DatabaseError {
  message: string;
  code?: string;
  type: "DrizzleError" | "PostgresError" | "UnknownError";
}

export async function executeDb<T>(dbFn: () => Promise<T>): Promise<T> {
  try {
    return await dbFn();
  } catch (error) {
    let dbError: DatabaseError;

    if (error instanceof DrizzleError) {
      dbError = {
        message: error.message,
        type: "DrizzleError",
      };
    } else if (error instanceof Error && "code" in error) {
      dbError = {
        message: error.message,
        code: error.code as string,
        type: "PostgresError",
      };
    } else {
      dbError = {
        message: "An unknown error occurred",
        type: "UnknownError",
      };
    }

    throw dbError;
  }
}
