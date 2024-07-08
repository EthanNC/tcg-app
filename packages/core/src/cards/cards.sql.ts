import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const cards = pgTable(
  "cards",
  {
    unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    pitch: varchar("pitch", { length: 10 }).notNull(),
    cost: varchar("cost", { length: 10 }).notNull(),
    power: varchar("power", { length: 10 }).notNull(),
    defense: varchar("defense", { length: 10 }).notNull(),
    health: varchar("health", { length: 10 }).notNull(),
    intelligence: varchar("intelligence", { length: 10 }).notNull(),
    types: varchar("types", { length: 255 }).array().notNull(),
    card_keywords: varchar("card_keywords", { length: 255 }).array().notNull(),
    abilities_and_effects: varchar("abilities_and_effects", { length: 255 })
      .array()
      .notNull(),
    ability_and_effect_keywords: varchar("ability_and_effect_keywords", {
      length: 255,
    })
      .array()
      .notNull(),
    granted_keywords: varchar("granted_keywords", { length: 255 })
      .array()
      .notNull(),
    removed_keywords: varchar("removed_keywords", { length: 255 })
      .array()
      .notNull(),
    interacts_with_keywords: varchar("interacts_with_keywords", { length: 255 })
      .array()
      .notNull(),
    functional_text: varchar("functional_text", { length: 10000 }).notNull(),
    functional_text_plain: varchar("functional_text_plain", {
      length: 10000,
    }).notNull(),
    type_text: varchar("type_text", { length: 1000 }).notNull(),
    played_horizontally: boolean("played_horizontally")
      .default(false)
      .notNull(),
    blitz_legal: boolean("blitz_legal").default(true).notNull(),
    cc_legal: boolean("cc_legal").default(true).notNull(),
    commoner_legal: boolean("commoner_legal").default(true).notNull(),
    blitz_living_legend: boolean("blitz_living_legend")
      .default(false)
      .notNull(),
    blitz_living_legend_start: timestamp("blitz_living_legend_start", {
      mode: "string",
    }),
    cc_living_legend: boolean("cc_living_legend").default(false).notNull(),
    cc_living_legend_start: timestamp("cc_living_legend_start", {
      mode: "string",
    }),
    blitz_banned: boolean("blitz_banned").default(false).notNull(),
    blitz_banned_start: timestamp("blitz_banned_start", { mode: "string" }),
    cc_banned: boolean("cc_banned").default(false).notNull(),
    cc_banned_start: timestamp("cc_banned_start", { mode: "string" }),
    upf_banned: boolean("upf_banned").default(false).notNull(),
    upf_banned_start: timestamp("upf_banned_start", { mode: "string" }),
    commoner_banned: boolean("commoner_banned").default(false).notNull(),
    commoner_banned_start: timestamp("commoner_banned_start", {
      mode: "string",
    }),
    blitz_suspended: boolean("blitz_suspended").default(false).notNull(),
    blitz_suspended_start: timestamp("blitz_suspended_start", {
      mode: "string",
    }),
    blitz_suspended_end: varchar("blitz_suspended_end", { length: 1000 }),
    cc_suspended: boolean("cc_suspended").default(false).notNull(),
    cc_suspended_start: timestamp("cc_suspended_start", { mode: "string" }),
    cc_suspended_end: varchar("cc_suspended_end", { length: 1000 }),
    commoner_suspended: boolean("commoner_suspended").default(false).notNull(),
    commoner_suspended_start: timestamp("commoner_suspended_start", {
      mode: "string",
    }),
    commoner_suspended_end: varchar("commoner_suspended_end", { length: 1000 }),
    ll_restricted: boolean("ll_restricted").default(false).notNull(),
    ll_restricted_start: timestamp("ll_restricted_start", { mode: "string" }),
  },
  (table) => {
    return {
      cards_name_pitch_key: unique("cards_name_pitch_key").on(
        table.name,
        table.pitch
      ),
      nameSearchIndex: index("name_search_index").using(
        "gin",
        sql`to_tsvector('english', ${table.name})`
      ),
    };
  }
);
