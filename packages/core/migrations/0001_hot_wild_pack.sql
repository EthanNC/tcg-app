CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "set_printings" DROP CONSTRAINT "set_printings_set_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "card_printings" DROP CONSTRAINT "card_printings_card_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "card_printings" DROP CONSTRAINT "card_printings_set_printing_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "card_face_associations" DROP CONSTRAINT "card_face_associations_back_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "card_face_associations" DROP CONSTRAINT "card_face_associations_front_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "card_references" DROP CONSTRAINT "card_references_card_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "card_references" DROP CONSTRAINT "card_references_referenced_card_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "ability_translations" DROP CONSTRAINT "ability_translations_ability_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "type_translations" DROP CONSTRAINT "type_translations_type_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "keyword_translations" DROP CONSTRAINT "keyword_translations_keyword_unique_id_fkey";
--> statement-breakpoint
ALTER TABLE "card_translations" DROP CONSTRAINT "card_translations_card_unique_id_fkey";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "set_printings" ADD CONSTRAINT "set_printings_set_unique_id_sets_unique_id_fk" FOREIGN KEY ("set_unique_id") REFERENCES "public"."sets"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_printings" ADD CONSTRAINT "card_printings_card_unique_id_cards_unique_id_fk" FOREIGN KEY ("card_unique_id") REFERENCES "public"."cards"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_printings" ADD CONSTRAINT "card_printings_set_printing_unique_id_set_printings_unique_id_fk" FOREIGN KEY ("set_printing_unique_id") REFERENCES "public"."set_printings"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_face_associations" ADD CONSTRAINT "card_face_associations_front_unique_id_card_printings_unique_id_fk" FOREIGN KEY ("front_unique_id") REFERENCES "public"."card_printings"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_face_associations" ADD CONSTRAINT "card_face_associations_back_unique_id_card_printings_unique_id_fk" FOREIGN KEY ("back_unique_id") REFERENCES "public"."card_printings"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_references" ADD CONSTRAINT "card_references_card_unique_id_cards_unique_id_fk" FOREIGN KEY ("card_unique_id") REFERENCES "public"."cards"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_references" ADD CONSTRAINT "card_references_referenced_card_unique_id_cards_unique_id_fk" FOREIGN KEY ("referenced_card_unique_id") REFERENCES "public"."cards"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ability_translations" ADD CONSTRAINT "ability_translations_ability_unique_id_abilities_unique_id_fk" FOREIGN KEY ("ability_unique_id") REFERENCES "public"."abilities"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_translations" ADD CONSTRAINT "type_translations_type_unique_id_types_unique_id_fk" FOREIGN KEY ("type_unique_id") REFERENCES "public"."types"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "keyword_translations" ADD CONSTRAINT "keyword_translations_keyword_unique_id_keywords_unique_id_fk" FOREIGN KEY ("keyword_unique_id") REFERENCES "public"."keywords"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_translations" ADD CONSTRAINT "card_translations_card_unique_id_cards_unique_id_fk" FOREIGN KEY ("card_unique_id") REFERENCES "public"."cards"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
