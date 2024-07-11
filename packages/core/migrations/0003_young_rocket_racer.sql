DROP INDEX IF EXISTS "name_search_index";--> statement-breakpoint
ALTER TABLE "cards" ADD COLUMN "card_search" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "cards"."name") || to_tsvector('english', "cards"."pitch")) STORED;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_index" ON "cards" USING gin ("card_search");