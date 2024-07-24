ALTER TABLE "sessions"
ALTER COLUMN "user_id"
SET DATA TYPE uuid USING user_id::uuid;
--> statement-breakpoint
ALTER TABLE "users"
ALTER COLUMN "id"
SET DATA TYPE uuid;