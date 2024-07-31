CREATE TABLE IF NOT EXISTS "wishlist_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"wishlist_id" uuid NOT NULL,
	"card_printing_id" varchar(21) NOT NULL,
	"updated_at" timestamp NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlists" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "wishlist_items"
ADD CONSTRAINT "wishlist_items_wishlist_id_wishlists_id_fk" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "wishlist_items"
ADD CONSTRAINT "wishlist_items_card_printing_id_card_printings_unique_id_fk" FOREIGN KEY ("card_printing_id") REFERENCES "public"."card_printings"("unique_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "wishlists"
ADD CONSTRAINT "wishlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wishlist_id_card_printing_id_idx" ON "wishlist_items" USING btree ("wishlist_id", "card_printing_id");