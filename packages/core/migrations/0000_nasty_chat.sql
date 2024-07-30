CREATE TABLE IF NOT EXISTS "card_printings" (
	"unique_id" varchar(21) PRIMARY KEY NOT NULL,
	"card_unique_id" varchar(21) NOT NULL,
	"set_printing_unique_id" varchar(21) NOT NULL,
	"card_id" varchar(15) NOT NULL,
	"set_id" varchar(15) NOT NULL,
	"edition" varchar(15) NOT NULL,
	"foiling" varchar(15) NOT NULL,
	"rarity" varchar(15) NOT NULL,
	"artist" varchar(1000) NOT NULL,
	"art_variation" varchar(15) NOT NULL,
	"flavor_text" varchar(10000) NOT NULL,
	"flavor_text_plain" varchar(10000) NOT NULL,
	"image_url" varchar(1000) NOT NULL,
	"tcgplayer_product_id" varchar(100) NOT NULL,
	"tcgplayer_url" varchar(1000) NOT NULL,
	CONSTRAINT "card_printings_unique_id_card_id_edition_art_variation_key" UNIQUE("unique_id","card_id","edition","art_variation")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"unique_id" varchar(21) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"pitch" varchar(10) NOT NULL,
	"cost" varchar(10) NOT NULL,
	"power" varchar(10) NOT NULL,
	"defense" varchar(10) NOT NULL,
	"health" varchar(10) NOT NULL,
	"intelligence" varchar(10) NOT NULL,
	"types" varchar(255)[] NOT NULL,
	"card_keywords" varchar(255)[] NOT NULL,
	"abilities_and_effects" varchar(255)[] NOT NULL,
	"ability_and_effect_keywords" varchar(255)[] NOT NULL,
	"granted_keywords" varchar(255)[] NOT NULL,
	"removed_keywords" varchar(255)[] NOT NULL,
	"interacts_with_keywords" varchar(255)[] NOT NULL,
	"functional_text" varchar(10000) NOT NULL,
	"functional_text_plain" varchar(10000) NOT NULL,
	"type_text" varchar(1000) NOT NULL,
	"played_horizontally" boolean DEFAULT false NOT NULL,
	"blitz_legal" boolean DEFAULT true NOT NULL,
	"cc_legal" boolean DEFAULT true NOT NULL,
	"commoner_legal" boolean DEFAULT true NOT NULL,
	"blitz_living_legend" boolean DEFAULT false NOT NULL,
	"blitz_living_legend_start" timestamp,
	"cc_living_legend" boolean DEFAULT false NOT NULL,
	"cc_living_legend_start" timestamp,
	"blitz_banned" boolean DEFAULT false NOT NULL,
	"blitz_banned_start" timestamp,
	"cc_banned" boolean DEFAULT false NOT NULL,
	"cc_banned_start" timestamp,
	"upf_banned" boolean DEFAULT false NOT NULL,
	"upf_banned_start" timestamp,
	"commoner_banned" boolean DEFAULT false NOT NULL,
	"commoner_banned_start" timestamp,
	"blitz_suspended" boolean DEFAULT false NOT NULL,
	"blitz_suspended_start" timestamp,
	"blitz_suspended_end" varchar(1000),
	"cc_suspended" boolean DEFAULT false NOT NULL,
	"cc_suspended_start" timestamp,
	"cc_suspended_end" varchar(1000),
	"commoner_suspended" boolean DEFAULT false NOT NULL,
	"commoner_suspended_start" timestamp,
	"commoner_suspended_end" varchar(1000),
	"ll_restricted" boolean DEFAULT false NOT NULL,
	"ll_restricted_start" timestamp,
	CONSTRAINT "cards_name_pitch_key" UNIQUE("name","pitch")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "abilities" (
	"unique_id" varchar(21) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ability_translations" (
	"ability_unique_id" varchar(21) NOT NULL,
	"language" varchar(10) NOT NULL,
	"name" varchar(255),
	CONSTRAINT "ability_translations_pkey" PRIMARY KEY("ability_unique_id","language")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artists" (
	"name" varchar(1000) NOT NULL,
	CONSTRAINT "artists_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "card_face_associations" (
	"front_unique_id" varchar(21) NOT NULL,
	"back_unique_id" varchar(21) NOT NULL,
	"is_dfc" boolean NOT NULL,
	CONSTRAINT "card_face_associations_front_unique_id_back_unique_id_key" UNIQUE("front_unique_id","back_unique_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "card_references" (
	"card_unique_id" varchar(21) NOT NULL,
	"referenced_card_unique_id" varchar(21) NOT NULL,
	CONSTRAINT "card_references_card_unique_id_referenced_card_unique_id_key" UNIQUE("card_unique_id","referenced_card_unique_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "card_translations" (
	"card_unique_id" varchar(21) NOT NULL,
	"language" varchar(10) NOT NULL,
	"name" varchar(255) NOT NULL,
	"pitch" varchar(10) NOT NULL,
	"types" varchar(255)[] NOT NULL,
	"card_keywords" varchar(255)[] NOT NULL,
	"abilities_and_effects" varchar(255)[] NOT NULL,
	"ability_and_effect_keywords" varchar(255)[] NOT NULL,
	"granted_keywords" varchar(255)[] NOT NULL,
	"removed_keywords" varchar(255)[] NOT NULL,
	"interacts_with_keywords" varchar(255)[] NOT NULL,
	"functional_text" varchar(10000) NOT NULL,
	"functional_text_plain" varchar(10000) NOT NULL,
	"type_text" varchar(1000) NOT NULL,
	CONSTRAINT "card_translations_pkey" PRIMARY KEY("card_unique_id","language")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "foilings" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "icons" (
	"icon" varchar(255) PRIMARY KEY NOT NULL,
	"description" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyword_translations" (
	"keyword_unique_id" varchar(21) NOT NULL,
	"language" varchar(10) NOT NULL,
	"name" varchar(255),
	"description" varchar(1000) NOT NULL,
	CONSTRAINT "keyword_translations_pkey" PRIMARY KEY("keyword_unique_id","language")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keywords" (
	"unique_id" varchar(21) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" varchar(1000) NOT NULL,
	CONSTRAINT "keywords_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rarities" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"description" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "type_translations" (
	"type_unique_id" varchar(21) NOT NULL,
	"language" varchar(10) NOT NULL,
	"name" varchar(255),
	CONSTRAINT "type_translations_pkey" PRIMARY KEY("type_unique_id","language")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"unique_id" varchar(21) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"fresh" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "set_printings" (
	"unique_id" varchar(21) PRIMARY KEY NOT NULL,
	"set_unique_id" varchar(21) NOT NULL,
	"language" varchar(10) NOT NULL,
	"edition" varchar(255) NOT NULL,
	"start_card_id" varchar(15) NOT NULL,
	"end_card_id" varchar(15) NOT NULL,
	"initial_release_date" timestamp,
	"out_of_print_date" timestamp,
	"product_page" varchar(1000),
	"collectors_center" varchar(1000),
	"card_gallery" varchar(1000),
	CONSTRAINT "set_printings_set_unique_id_language_edition_key" UNIQUE("set_unique_id","language","edition")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sets" (
	"unique_id" varchar(21) PRIMARY KEY NOT NULL,
	"id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "sets_unique_id_id_key" UNIQUE("unique_id","id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password_hash" text NOT NULL,
	"emailVerified" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
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
 ALTER TABLE "ability_translations" ADD CONSTRAINT "ability_translations_ability_unique_id_abilities_unique_id_fk" FOREIGN KEY ("ability_unique_id") REFERENCES "public"."abilities"("unique_id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "card_translations" ADD CONSTRAINT "card_translations_card_unique_id_cards_unique_id_fk" FOREIGN KEY ("card_unique_id") REFERENCES "public"."cards"("unique_id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "type_translations" ADD CONSTRAINT "type_translations_type_unique_id_types_unique_id_fk" FOREIGN KEY ("type_unique_id") REFERENCES "public"."types"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "set_printings" ADD CONSTRAINT "set_printings_set_unique_id_sets_unique_id_fk" FOREIGN KEY ("set_unique_id") REFERENCES "public"."sets"("unique_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_index" ON "cards" USING gin (to_tsvector('english', "name"));