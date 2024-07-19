import * as z from "zod";

export const KeywordElementSchema = z.object({
  unique_id: z.string(),
  name: z.string(),
  description: z.string(),
  description_plain: z.string().optional(),
});

export type KeywordElement = z.infer<typeof KeywordElementSchema>;

export const keywordData: KeywordElement[] = [
  {
    unique_id: "Fh696f9wpcPgwgpgg8d9j",
    name: "abush",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "tTfc8P6NGMgLKWG9LFkDJ",
    name: "amp x",
    description:
      "The next time you would deal arcane damage this turn, instead deal that much plus X. This happens before prevention effects.",
    description_plain:
      "The next time you would deal arcane damage this turn, instead deal that much plus X. This happens before prevention effects.",
  },
  {
    unique_id: "77JKJwz6k8BRrGbmRDPTT",
    name: "arcane barrier x",
    description:
      "If you would be dealt arcane damage you may pay X{r} instead to prevent X arcane damage that source will deal.",
    description_plain:
      "If you would be dealt arcane damage you may pay X{r} instead to prevent X arcane damage that source will deal.",
  },
  {
    unique_id: "tHNMT9DMtgRNTBrnCjdWq",
    name: "attack",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "DJ9GNbwRNBFhcqhFgtFkR",
    name: "awaken",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "bKgtwKPTzJ69QdFDfm9bR",
    name: "battleworn",
    description:
      "Equipment that wear down after each time they are used to defend. If you defend with a card with **Battleworn**, put a -1{d} counter on it when the combat chain closes.",
    description_plain:
      "Equipment that wear down after each time they are used to defend. If you defend with a card with Battleworn, put a -1{d} counter on it when the combat chain closes.",
  },
  {
    unique_id: "JHPDpLdkdBNb76pLM9q8C",
    name: "beat chest",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "cG88qzrJhwLnJH6TJ9cpp",
    name: "blade break",
    description:
      "Equipment that are fragile and break after being used to defend. If you defend with a card with **Blade Break**, destroy it when the combat chain closes.",
    description_plain:
      "Equipment that are fragile and break after being used to defend. If you defend with a card with Blade Break, destroy it when the combat chain closes.",
  },
  {
    unique_id: "P78nKMjh7Q9rFtgndz8rJ",
    name: "blood debt",
    description:
      "**Blood Debt** is a keyword existing on Shadow cards. Shadow cards can inflict a loss of life to access a greater power. At the end of your turn, you lose 1{h} for each **blood debt** card in your banished zone.",
    description_plain:
      "Blood Debt is a keyword existing on Shadow cards. Shadow cards can inflict a loss of life to access a greater power. At the end of your turn, you lose 1{h} for each blood debt card in your banished zone.",
  },
  {
    unique_id: "wPWTbtBBwWkLhTz7hMrn7",
    name: "boost",
    description:
      "**Boost* is a Mechanologist mechanic that allows a Mechanologist attack action card to gain go again.",
    description_plain:
      "*Boost is a Mechanologist mechanic that allows a Mechanologist attack action card to gain go again.",
  },
  {
    unique_id: "GtFWQhMLPKPBttDFDMnGN",
    name: "channel",
    description:
      "**Channel** is a keyword that uses Element cards to maintain a powerful aura that requires a larger commitment each turn to maintain the channel.",
    description_plain:
      "Channel is a keyword that uses Element cards to maintain a powerful aura that requires a larger commitment each turn to maintain the channel.",
  },
  {
    unique_id: "WBBLK99pg7LTHM8JRNgzg",
    name: "charge",
    description:
      "**Charge** is a keyword that exist on Light Warrior attacks. This showcases Boltyn's eagerness to engage in battle and **charge** his soul in the process. As an additional cost to playing a card with **charge** you may put a card from your hand into your hero's soul. This would turn on powerful effects that care about if you have **charged** this turn. *You may elect to not pay the additional cost o **charge** - however this would mean you did not **charge**.)*",
    description_plain:
      "Charge is a keyword that exist on Light Warrior attacks. This showcases Boltyn's eagerness to engage in battle and charge his soul in the process. As an additional cost to playing a card with charge you may put a card from your hand into your hero's soul. This would turn on powerful effects that care about if you have charged this turn. You may elect to not pay the additional cost o charge - however this would mean you did not charge.)",
  },
  {
    unique_id: "PwFQq6hKkTq7dNjKJ6KcB",
    name: "clash",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "MrLqQCHjdB86fJCQJjJKw",
    name: "cloaked",
    description: "Equip this face-down.",
    description_plain: "Equip this face-down.",
  },
  {
    unique_id: "H6nNm6Nndrp8qTGFJL7GB",
    name: "combo",
    description:
      "A Ninja mechanic that showcases the power of playing multiple attacks in a perfect sequence. **Combo** cares about the last (most recent previous) attack that was played in the combat chain.",
    description_plain:
      "A Ninja mechanic that showcases the power of playing multiple attacks in a perfect sequence. Combo cares about the last (most recent previous) attack that was played in the combat chain.",
  },
  {
    unique_id: "FK8QRGT6GjqFGHLFJTbPT",
    name: "contract",
    description:
      "When a player is contracted, they are given a set of instructions to complete. If they perform those instructions, they are considered to have completed the contract.",
    description_plain:
      "When a player is contracted, they are given a set of instructions to complete. If they perform those instructions, they are considered to have completed the contract.",
  },
  {
    unique_id: "C66q6GppkfMfbdB8KkhJN",
    name: "crank",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "rG7F9GkDcmwNMczRbtwhL",
    name: "crush",
    description:
      "A Guardian mechanic that showcases the strength of the guardian. When an attack with **crush** deals 4 or more damage to a hero, an effect is applied.",
    description_plain:
      "A Guardian mechanic that showcases the strength of the guardian. When an attack with crush deals 4 or more damage to a hero, an effect is applied.",
  },
  {
    unique_id: "LdpzkhTrrcHJJtLFnctGW",
    name: "dominate",
    description:
      "An attack that is difficult to defend. Cards with **dominate** cannot be defended with more than 1 card from the defending hero's hand.",
    description_plain:
      "An attack that is difficult to defend. Cards with dominate cannot be defended with more than 1 card from the defending hero's hand.",
  },
  {
    unique_id: "rDb7KpRGqJcWP8jRpt78K",
    name: "ephemeral",
    description:
      "If an ephemeral card would be put into a graveyard from anywhere, instead it ceases to exist.",
    description_plain:
      "If an ephemeral card would be put into a graveyard from anywhere, instead it ceases to exist.",
  },
  {
    unique_id: "gj7mqb77bLbHGW6rpNcq9",
    name: "essence",
    description:
      "**Essence** is a keyword that exists on Elemental hero cards showing what Elements that hero specializes in and what Element cards can be included in the deck.",
    description_plain:
      "Essence is a keyword that exists on Elemental hero cards showing what Elements that hero specializes in and what Element cards can be included in the deck.",
  },
  {
    unique_id: "wcg8K8J7frtBp89w7P6gm",
    name: "evo upgrade",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "g6BD6HNFJBRDDdwD9kBWK",
    name: "freeze",
    description: "A **frozen** object can't be played or activated.",
    description_plain: "A frozen object can't be played or activated.",
  },
  {
    unique_id: "rwhcqgpkPpTtFrNM6n7Pw",
    name: "fusion",
    description:
      "**Fusion** is a keyword that **fuses** one or more elements with an elemental card to give an additional effect.",
    description_plain:
      "Fusion is a keyword that fuses one or more elements with an elemental card to give an additional effect.",
  },
  {
    unique_id: "jrGkNBJRdJDK9BPp7qGbf",
    name: "galvanize",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "mmf6BdTtrbCGrhdhg8K9g",
    name: "go again",
    description:
      "**Go again** allows multiple actions to be played in a turn, when usually playing an action would use up your action point, and therefore end your turn. A card with **go again** gives the controller of that card or activated ability 1 action point when it resolves.",
    description_plain:
      "Go again allows multiple actions to be played in a turn, when usually playing an action would use up your action point, and therefore end your turn. A card with go again gives the controller of that card or activated ability 1 action point when it resolves.",
  },
  {
    unique_id: "JpQHgf9ttGqRjHjW6rgR8",
    name: "guardwell",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "hbjfTFTQmCR9FjzP7DWGK",
    name: "heave X",
    description:
      "At the beginning of your end phase, if this is in your hand and you have an empty arsenal zone, you may pay X and put this face up into your arsenal. If you do, create X Seismic Surge tokens.",
    description_plain:
      "At the beginning of your end phase, if this is in your hand and you have an empty arsenal zone, you may pay X and put this face up into your arsenal. If you do, create X Seismic Surge tokens.",
  },
  {
    unique_id: "NdTgddPBhJLhG7HRjqPG6",
    name: "intimidate",
    description:
      "A Brute mechanic that showcases how frightening a brute is to its enemies. **Intimidate** removes a random card from a heroes hand making it more difficult to defend.",
    description_plain:
      "A Brute mechanic that showcases how frightening a brute is to its enemies. Intimidate removes a random card from a heroes hand making it more difficult to defend.",
  },
  {
    unique_id: "TrD8trBHtDqmdKtd9jMWr",
    name: "legendary",
    description: "You may only have 1 copy of this card in your deck.",
    description_plain: "You may only have 1 copy of this card in your deck.",
  },
  {
    unique_id: "h8pdGJQwFdJWbtJCHrmPP",
    name: "material",
    description:
      "An Illusionist mechanic that applies effects if it is under another permanent.",
    description_plain:
      "An Illusionist mechanic that applies effects if it is under another permanent.",
  },
  {
    unique_id: "jTtHPbKjwLkkDhRQHpWnK",
    name: "Mirage",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "N6njwjtbdnp8c7RCgPng8",
    name: "Modular",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "KjHmzrtCdmW698JjW8J6j",
    name: "negate",
    description:
      "**Negating** a card on a layer of the chain will prevent the card from resolving.",
    description_plain:
      "Negating a card on a layer of the chain will prevent the card from resolving.",
  },
  {
    unique_id: "bfRPRwTzzCPNRmNbfhdq7",
    name: "opt x",
    description:
      "**Opt** is a keyword that allows you to look at the top X cards and put any number of them on the top and/or bottom of your deck in any order.",
    description_plain:
      "Opt is a keyword that allows you to look at the top X cards and put any number of them on the top and/or bottom of your deck in any order.",
  },
  {
    unique_id: "pWczCNRqmhC9Cp9wNPCK9",
    name: "overpower",
    description:
      "The defending hero can't defend this with more than one action card.",
    description_plain:
      "The defending hero can't defend this with more than one action card.",
  },
  {
    unique_id: "mFCtFC79DRMhbJf9MTNBL",
    name: "pairs",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "GQfWb9GwKkw9RNrK6L6B9",
    name: "phantasm",
    description:
      "**Phantasm** is a keyword that exists on Illusionist attacks. Illusionist attacks with **phantasm** are powerful but fragile. When an attack with **phantasm** is defended by a 6{p}+ non-Illusionist attack action card, the attack is destroyed and the combat chain closes.",
    description_plain:
      "Phantasm is a keyword that exists on Illusionist attacks. Illusionist attacks with phantasm are powerful but fragile. When an attack with phantasm is defended by a 6{p}+ non-Illusionist attack action card, the attack is destroyed and the combat chain closes.",
  },
  {
    unique_id: "FqH7Rt8PDdWccP9RGMFbL",
    name: "piercing x",
    description: "If this is defended by an equipment, it has +X{p}.",
    description_plain: "If this is defended by an equipment, it has +X{p}.",
  },
  {
    unique_id: "LNcJ8JT8MtHcJkwtHtmm9",
    name: "protect",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "BrB9ww8W6WgHnWGFzFzqd",
    name: "quell x",
    description:
      "If your hero would be dealt damage, you may pay X{r} to prevent X of that damage. If you do, destroy this at the beginning of the end phase.",
    description_plain:
      "If your hero would be dealt damage, you may pay X{r} to prevent X of that damage. If you do, destroy this at the beginning of the end phase.",
  },
  {
    unique_id: "CMkCBFwkdRTkckLfBwhjL",
    name: "reload",
    description:
      "**Reload** is a Ranger mechanic that allows you to put a card from your hand face down into your arsenal when the card resolves.",
    description_plain:
      "Reload is a Ranger mechanic that allows you to put a card from your hand face down into your arsenal when the card resolves.",
  },
  {
    unique_id: "BN9pfqWtQjNgCHFrgmNHJ",
    name: "reprise",
    description:
      'A Warrior mechanic that showcases the prowess a warrior has when they are engaged in close combat. **Reprise** effects "turn on" if the defending hero has defended with a card from their hand.',
    description_plain:
      'A Warrior mechanic that showcases the prowess a warrior has when they are engaged in close combat. Reprise effects "turn on" if the defending hero has defended with a card from their hand.',
  },
  {
    unique_id: "qhmLJGzNtDRbd9HLFbLFp",
    name: "rune gate",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "FL9rFc6hKw7WbRnCBqBzR",
    name: "rupture",
    description:
      "A Draconic mechanic that applies certain effects if the card is played at chain link 4 or higher.",
    description_plain:
      "A Draconic mechanic that applies certain effects if the card is played at chain link 4 or higher.",
  },
  {
    unique_id: "bbpQG8LjWGCDk7GDzf686",
    name: "scrap",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "8mqHH6LQfddFgnbbm8pLp",
    name: "solflare",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "cjn8CBRWPmdG8fwJNTBJt",
    name: "specialization",
    description:
      "You may only have this card in your deck if your hero is the specified hero.",
    description_plain:
      "You may only have this card in your deck if your hero is the specified hero.",
  },
  {
    unique_id: "fDbLqGWBhWhTmJhGmdKQc",
    name: "spectra",
    description:
      "**spectra** is a keyword that exists on Illusionist Aura cards. When a player is deciding who to target for an attack they may elect to target an Aura with the keyword **spectra**. When an Aura with **spectra** is attacked, destroy it and close the combat chain. The attack will not resolve and the combat chain closes.",
    description_plain:
      "Spectra is a keyword that exists on Illusionist Aura cards. When a player is deciding who to target for an attack they may elect to target an Aura with the keyword spectra. When an Aura with spectra is attacked, destroy it and close the combat chain. The attack will not resolve and the combat chain closes.",
  },
  {
    unique_id: "f8Tw8JfDjQhjrtkLLcBKt",
    name: "spellvoid x",
    description:
      "**Spellvoid** is a keyword primarily on equipment or items. **Spellvoid** is a one time use effect that prevents arcane damage.",
    description_plain:
      "Spellvoid is a keyword primarily on equipment or items. Spellvoid is a one time use effect that prevents arcane damage.",
  },
  {
    unique_id: "gkcpTQwRjMPTtRkrHpDhT",
    name: "stealth",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "CKRGw9dCnNdKpNTdTBqgz",
    name: "surge",
    description:
      "**Surge** is an effect that applies if a card deals more arcane damage than it's printed amount.",
    description_plain:
      "Surge is an effect that applies if a card deals more arcane damage than it's printed amount.",
  },
  {
    unique_id: "RnrzPrG6KfnCPhDCF8bpB",
    name: "temper",
    description:
      "**Temper** is a keyword that exists on equipment. Usually high in defense, **Temper** equipment presents a choice when it is down to 1{d}, of whether to defend with it one last time and see it destroyed, or save it to use for its ability.",
    description_plain:
      "Temper is a keyword that exists on equipment. Usually high in defense, Temper equipment presents a choice when it is down to 1{d}, of whether to defend with it one last time and see it destroyed, or save it to use for its ability.",
  },
  {
    unique_id: "LwJpTqDGKM96gQzcKwW76",
    name: "tower",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "9PpnGJtT6F6PgKJTkjMmT",
    name: "transcend",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "hGzPP7bNMQJWNJ8QzQhDQ",
    name: "transform",
    description:
      "An Illusionist mechanic that puts specified objects under another card or creates a token and puts specified objects under it.",
    description_plain:
      "An Illusionist mechanic that puts specified objects under another card or creates a token and puts specified objects under it.",
  },
  {
    unique_id: "hDqkbTcqj9Fmr7m8TKKCz",
    name: "unfreeze",
    description: "Removes **Freeze** from an object.",
    description_plain: "Removes Freeze from an object.",
  },
  {
    unique_id: "H6QfMpMdgD8Fhcfqgq6rm",
    name: "unity",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "tkB9tfFWLbkpqfNJwpTWF",
    name: "universal",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "k9Tt9gnfKHKFHHmq9LTnG",
    name: "wager",
    description: "",
    description_plain: "",
  },
  {
    unique_id: "hWpPNJ8jcqTHpgnQcPNkm",
    name: "ward x",
    description:
      "If your hero would be dealt damage, prevent X of that damage and destroy this.",
    description_plain:
      "If your hero would be dealt damage, prevent X of that damage and destroy this.",
  },
  {
    unique_id: "7jJ7hBjrMQd6fcWcqTb6D",
    name: "once per turn action",
    description: "Action playable only once per turn",
  },
  {
    unique_id: "7mcpJ8zrDHJWkf9r68bhH",
    name: "once per turn effect",
    description: "Effect activatable only once per turn",
  },
  {
    unique_id: "9DbtWdGfndKG7CCDPmb9t",
    name: "once per turn attack reaction",
    description: "Attack Reaction usable once per turn",
  },
  {
    unique_id: "GJdGNktHCbbzmHNkkNfDz",
    name: "instant",
    description: "Playable anytime, including opponent's turn",
  },
  {
    unique_id: "HCCWPfFrNzCwPDntPw6gH",
    name: "action",
    description: "Card played on your turn for various effects",
  },
  {
    unique_id: "KzGJdT7tz9LfLhWfbnFwb",
    name: "once per turn defense reaction",
    description: "Defense Reaction usable once per turn",
  },
  {
    unique_id: "cTkzhh6mR7NHCWnBRnbWW",
    name: "twice per turn instant",
    description: "Instant playable twice per turn",
  },
  {
    unique_id: "kQNwpnQqhC8RGPcpDKdJD",
    name: "attack reaction",
    description: "Modifies attack during reaction step",
  },
  {
    unique_id: "t7KdJFMrpcTDBBnGWf6wK",
    name: "once per turn instant",
    description: "Instant playable once per turn",
  },
];
