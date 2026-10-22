import type { ArtworkName } from "@/components/artwork";

// Diwali 2026 (Lakshmi Puja) falls on Sunday, 8 November.
export const DIWALI_DATE = "2026-11-08";

export type Hamper = {
  slug: string;
  name: string;
  blurb: string;
  contents: string[];
  tags: string[];
  art: ArtworkName;
  tone: "gold" | "rose" | "sage" | "olive";
  /** Path under /public once real product photography is available. */
  image?: string;
};

// Placeholder range: replace names, contents and photos with the real Diwali 2026 catalogue.
export const hampers: Hamper[] = [
  {
    slug: "diya-dry-fruit-box",
    name: "The Diya Box",
    blurb: "Hand-painted diyas and premium dry fruits in a keepsake box.",
    contents: [
      "Pair of hand-painted diyas",
      "Assorted dry fruits",
      "Scented tea-lights",
      "Personal note card",
    ],
    tags: ["Bestseller", "Personalisable"],
    art: "diya",
    tone: "gold",
  },
  {
    slug: "mithai-edit",
    name: "The Mithai Edit",
    blurb: "Artisanal sweets, beautifully boxed for the people you visit.",
    contents: ["Curated artisanal mithai", "Brass serving bowl", "Monogrammed sleeve"],
    tags: ["Family favourite"],
    art: "box",
    tone: "rose",
  },
  {
    slug: "lantern-set",
    name: "Akash Kandil Set",
    blurb: "A paper lantern and festive décor set to light up the doorway.",
    contents: ["Handmade paper lantern", "Toran", "Rangoli stencils & colours"],
    tags: ["Home décor"],
    art: "lantern",
    tone: "olive",
  },
  {
    slug: "rangoli-keepsake",
    name: "Rangoli Keepsake",
    blurb: "A slow, mindful box for the ones who love the rituals.",
    contents: [
      "Rangoli colour set",
      "Puja thali essentials",
      "Incense & attar",
      "Illustrated card",
    ],
    tags: ["Personalisable"],
    art: "rangoli",
    tone: "sage",
  },
  {
    slug: "corporate-gratitude",
    name: "The Gratitude Hamper",
    blurb: "For clients and teams: your logo, our craft, their smile.",
    contents: ["Branded box & sleeve", "Gourmet treats", "Diya pair", "Custom message card"],
    tags: ["Corporate", "Bulk"],
    art: "gift",
    tone: "gold",
  },
  {
    slug: "little-lights",
    name: "Little Lights",
    blurb: "A playful box for children: colour, craft and (safe) sparkle.",
    contents: ["Diya painting kit", "Festive storybook", "Treats", "Name sticker sheet"],
    tags: ["For kids", "Personalisable"],
    art: "spark",
    tone: "rose",
  },
];

export const personalisation = [
  { title: "Names & notes", body: "Hand-lettered names on tags, sleeves and cards." },
  { title: "Monogram wax seals", body: "Your family monogram, pressed into every box." },
  { title: "Brand it", body: "Logo, colours and messaging for corporate orders." },
  { title: "Build your own", body: "Mix items across hampers to fit your list and budget." },
];

export const diwaliFaqs = [
  {
    q: "Do you deliver outside my city?",
    a: "Yes, we ship across India. Share your delivery locations when you enquire and we'll confirm timelines.",
  },
  {
    q: "Can I order in bulk for my team or clients?",
    a: "Absolutely. We handle corporate and family bulk orders, including branded packaging and delivery to multiple addresses.",
  },
  {
    q: "How early should I order?",
    a: "As early as you can, especially for personalised or bulk orders. Enquire now and we'll tell you exactly what's possible before Diwali.",
  },
  {
    q: "Can I change what's inside a hamper?",
    a: "Yes. Every hamper can be customised. Swap items, adjust the budget or build one from scratch.",
  },
];
