import { relations } from "drizzle-orm/relations";
import {
  sets,
  set_printings,
  cards,
  card_printings,
  card_face_associations,
  card_references,
  abilities,
  ability_translations,
  types,
  type_translations,
  keywords,
  keyword_translations,
  card_translations,
} from "./schema.sql";

export const set_printingsRelations = relations(
  set_printings,
  ({ one, many }) => ({
    set: one(sets, {
      fields: [set_printings.set_unique_id],
      references: [sets.unique_id],
    }),
    card_printings: many(card_printings),
  })
);

export const setsRelations = relations(sets, ({ many }) => ({
  set_printings: many(set_printings),
}));

export const card_printingsRelations = relations(
  card_printings,
  ({ one, many }) => ({
    card: one(cards, {
      fields: [card_printings.card_unique_id],
      references: [cards.unique_id],
    }),
    set_printing: one(set_printings, {
      fields: [card_printings.set_printing_unique_id],
      references: [set_printings.unique_id],
    }),
    card_face_associations_back_unique_id: many(card_face_associations, {
      relationName:
        "card_face_associations_back_unique_id_card_printings_unique_id",
    }),
    card_face_associations_front_unique_id: many(card_face_associations, {
      relationName:
        "card_face_associations_front_unique_id_card_printings_unique_id",
    }),
  })
);

export const cardsRelations = relations(cards, ({ many }) => ({
  card_printings: many(card_printings),
  card_references_card_unique_id: many(card_references, {
    relationName: "card_references_card_unique_id_cards_unique_id",
  }),
  card_references_referenced_card_unique_id: many(card_references, {
    relationName: "card_references_referenced_card_unique_id_cards_unique_id",
  }),
  card_translations: many(card_translations),
}));

export const card_face_associationsRelations = relations(
  card_face_associations,
  ({ one }) => ({
    card_printing_back_unique_id: one(card_printings, {
      fields: [card_face_associations.back_unique_id],
      references: [card_printings.unique_id],
      relationName:
        "card_face_associations_back_unique_id_card_printings_unique_id",
    }),
    card_printing_front_unique_id: one(card_printings, {
      fields: [card_face_associations.front_unique_id],
      references: [card_printings.unique_id],
      relationName:
        "card_face_associations_front_unique_id_card_printings_unique_id",
    }),
  })
);

export const card_referencesRelations = relations(
  card_references,
  ({ one }) => ({
    card_card_unique_id: one(cards, {
      fields: [card_references.card_unique_id],
      references: [cards.unique_id],
      relationName: "card_references_card_unique_id_cards_unique_id",
    }),
    card_referenced_card_unique_id: one(cards, {
      fields: [card_references.referenced_card_unique_id],
      references: [cards.unique_id],
      relationName: "card_references_referenced_card_unique_id_cards_unique_id",
    }),
  })
);

export const ability_translationsRelations = relations(
  ability_translations,
  ({ one }) => ({
    ability: one(abilities, {
      fields: [ability_translations.ability_unique_id],
      references: [abilities.unique_id],
    }),
  })
);

export const abilitiesRelations = relations(abilities, ({ many }) => ({
  ability_translations: many(ability_translations),
}));

export const type_translationsRelations = relations(
  type_translations,
  ({ one }) => ({
    type: one(types, {
      fields: [type_translations.type_unique_id],
      references: [types.unique_id],
    }),
  })
);

export const typesRelations = relations(types, ({ many }) => ({
  type_translations: many(type_translations),
}));

export const keyword_translationsRelations = relations(
  keyword_translations,
  ({ one }) => ({
    keyword: one(keywords, {
      fields: [keyword_translations.keyword_unique_id],
      references: [keywords.unique_id],
    }),
  })
);

export const keywordsRelations = relations(keywords, ({ many }) => ({
  keyword_translations: many(keyword_translations),
}));

export const card_translationsRelations = relations(
  card_translations,
  ({ one }) => ({
    card: one(cards, {
      fields: [card_translations.card_unique_id],
      references: [cards.unique_id],
    }),
  })
);
