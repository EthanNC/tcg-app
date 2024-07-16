DROP INDEX IF EXISTS "name_search_index";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_index" ON "cards" USING gin (to_tsvector('english', "name"));