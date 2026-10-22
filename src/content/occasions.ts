import type { ArtworkName } from "@/components/artwork";

export type Occasion = {
  slug: string;
  title: string;
  script: string;
  summary: string;
  items: string[];
  art: ArtworkName;
  href?: string;
  cta?: string;
};

export const occasions: Occasion[] = [
  {
    slug: "weddings",
    title: "Weddings",
    script: "our first love",
    summary:
      "From the roka to the vidaai, everything that's given, sent or kept, designed as one matching story.",
    items: [
      "Invitation suites & save the dates",
      "Welcome & room hampers",
      "Bridesmaid boxes",
      "Return favours, function-wise",
      "Monograms, wax seals & packaging",
    ],
    art: "rings",
    href: "/work?c=wedding",
    cta: "See our wedding work",
  },
  {
    slug: "festive",
    title: "Festive",
    script: "season of giving",
    summary: "Diwali, Rakhi and every festival in between, hampers that feel personal, not bought.",
    items: ["Diwali hampers", "Rakhi gift boxes", "Holi, Eid & Christmas edits"],
    art: "diya",
    href: "/festive/diwali",
    cta: "See the Diwali collection",
  },
  {
    slug: "corporate",
    title: "Corporate",
    script: "thank you, at scale",
    summary: "Client and employee gifting with your brand on the box and care in every detail.",
    items: ["Festive bulk orders", "Onboarding kits", "Event & conference gifting"],
    art: "box",
  },
  {
    slug: "custom",
    title: "Custom",
    script: "made only once",
    summary: "Birthdays, anniversaries, baby arrivals, or a gift that doesn't have a name yet.",
    items: ["Personalised keepsakes", "Illustrated portraits & maps", "One-off packaging"],
    art: "pen",
    href: "/work?c=personal",
    cta: "See custom gifts we've made",
  },
];

export const process = [
  {
    title: "Tell us",
    body: "Share the occasion, how many people, your budget and the feeling you're after.",
  },
  {
    title: "We draft",
    body: "A moodboard and gift concept, with packaging and personalisation options.",
  },
  {
    title: "You approve",
    body: "Revisions until it feels right. Nothing goes to print without your yes.",
  },
  { title: "We deliver", body: "Handcrafted, packed with care and shipped across India." },
];
