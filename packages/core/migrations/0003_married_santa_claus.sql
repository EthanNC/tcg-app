CREATE TABLE IF NOT EXISTS "password_reset_token" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "password_reset_token" ADD CONSTRAINT "password_reset_token_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "password_reset_user_id_idx" ON "password_reset_token" USING btree ("user_id");