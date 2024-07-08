import {
  pgTable,
  varchar,
  unique,
  timestamp,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { cards } from "../cards/cards.sql";
import { card_printings } from "../cards/card-printings.sql";

export const abilities = pgTable("abilities", {
  unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const artists = pgTable(
  "artists",
  {
    name: varchar("name", { length: 1000 }).notNull(),
  },
  (table) => {
    return {
      artists_name_key: unique("artists_name_key").on(table.name),
    };
  }
);

export const sets = pgTable(
  "sets",
  {
    unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
    id: varchar("id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      sets_unique_id_id_key: unique("sets_unique_id_id_key").on(
        table.unique_id,
        table.id
      ),
    };
  }
);

export const set_printings = pgTable(
  "set_printings",
  {
    unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
    set_unique_id: varchar("set_unique_id", { length: 21 })
      .notNull()
      .references(() => sets.unique_id),
    language: varchar("language", { length: 10 }).notNull(),
    edition: varchar("edition", { length: 255 }).notNull(),
    start_card_id: varchar("start_card_id", { length: 15 }).notNull(),
    end_card_id: varchar("end_card_id", { length: 15 }).notNull(),
    initial_release_date: timestamp("initial_release_date", { mode: "string" }),
    out_of_print_date: timestamp("out_of_print_date", { mode: "string" }),
    product_page: varchar("product_page", { length: 1000 }),
    collectors_center: varchar("collectors_center", { length: 1000 }),
    card_gallery: varchar("card_gallery", { length: 1000 }),
  },
  (table) => {
    return {
      set_printings_set_unique_id_language_edition_key: unique(
        "set_printings_set_unique_id_language_edition_key"
      ).on(table.set_unique_id, table.language, table.edition),
    };
  }
);

export const card_face_associations = pgTable(
  "card_face_associations",
  {
    front_unique_id: varchar("front_unique_id", { length: 21 })
      .notNull()
      .references(() => card_printings.unique_id),
    back_unique_id: varchar("back_unique_id", { length: 21 })
      .notNull()
      .references(() => card_printings.unique_id),
    is_dfc: boolean("is_dfc").notNull(),
  },
  (table) => {
    return {
      card_face_associations_front_unique_id_back_unique_id_key: unique(
        "card_face_associations_front_unique_id_back_unique_id_key"
      ).on(table.front_unique_id, table.back_unique_id),
    };
  }
);

export const card_references = pgTable(
  "card_references",
  {
    card_unique_id: varchar("card_unique_id", { length: 21 })
      .notNull()
      .references(() => cards.unique_id),
    referenced_card_unique_id: varchar("referenced_card_unique_id", {
      length: 21,
    })
      .notNull()
      .references(() => cards.unique_id),
  },
  (table) => {
    return {
      card_references_card_unique_id_referenced_card_unique_id_key: unique(
        "card_references_card_unique_id_referenced_card_unique_id_key"
      ).on(table.card_unique_id, table.referenced_card_unique_id),
    };
  }
);

export const editions = pgTable("editions", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const foilings = pgTable("foilings", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const icons = pgTable("icons", {
  icon: varchar("icon", { length: 255 }).primaryKey().notNull(),
  description: varchar("description", { length: 255 }).notNull(),
});

export const keywords = pgTable(
  "keywords",
  {
    unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    description: varchar("description", { length: 1000 }).notNull(),
  },
  (table) => {
    return {
      keywords_name_key: unique("keywords_name_key").on(table.name),
    };
  }
);

export const rarities = pgTable("rarities", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  description: varchar("description", { length: 255 }).notNull(),
});

export const types = pgTable("types", {
  unique_id: varchar("unique_id", { length: 21 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const ability_translations = pgTable(
  "ability_translations",
  {
    ability_unique_id: varchar("ability_unique_id", { length: 21 })
      .notNull()
      .references(() => abilities.unique_id),
    language: varchar("language", { length: 10 }).notNull(),
    name: varchar("name", { length: 255 }),
  },
  (table) => {
    return {
      ability_translations_pkey: primaryKey({
        columns: [table.ability_unique_id, table.language],
        name: "ability_translations_pkey",
      }),
    };
  }
);

export const type_translations = pgTable(
  "type_translations",
  {
    type_unique_id: varchar("type_unique_id", { length: 21 })
      .notNull()
      .references(() => types.unique_id),
    language: varchar("language", { length: 10 }).notNull(),
    name: varchar("name", { length: 255 }),
  },
  (table) => {
    return {
      type_translations_pkey: primaryKey({
        columns: [table.type_unique_id, table.language],
        name: "type_translations_pkey",
      }),
    };
  }
);

export const keyword_translations = pgTable(
  "keyword_translations",
  {
    keyword_unique_id: varchar("keyword_unique_id", { length: 21 })
      .notNull()
      .references(() => keywords.unique_id),
    language: varchar("language", { length: 10 }).notNull(),
    name: varchar("name", { length: 255 }),
    description: varchar("description", { length: 1000 }).notNull(),
  },
  (table) => {
    return {
      keyword_translations_pkey: primaryKey({
        columns: [table.keyword_unique_id, table.language],
        name: "keyword_translations_pkey",
      }),
    };
  }
);

export const card_translations = pgTable(
  "card_translations",
  {
    card_unique_id: varchar("card_unique_id", { length: 21 })
      .notNull()
      .references(() => cards.unique_id),
    language: varchar("language", { length: 10 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    pitch: varchar("pitch", { length: 10 }).notNull(),
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
  },
  (table) => {
    return {
      card_translations_pkey: primaryKey({
        columns: [table.card_unique_id, table.language],
        name: "card_translations_pkey",
      }),
    };
  }
);
