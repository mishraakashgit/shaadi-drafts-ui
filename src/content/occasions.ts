export type Occasion = {
  slug: string;
  title: string;
  summary: string;
  items: string[];
  image: string;
  alt: string;
  href: string;
  cta: string;
  /** Extra photos the card crossfades through, each with a label. */
  slides?: { image: string; alt: string; label: string }[];
};

export const occasions: Occasion[] = [
  {
    slug: "weddings",
    title: "Weddings",
    summary:
      "Every phase of the celebration, from save-the-dates to post-wedding thank-yous, designed as one matching story.",
    items: [
      "Save the dates & invitations",
      "Signage",
      "Bridesmaid & groomsman boxes",
      "Hampers & return favours",
      "Post-wedding stationery",
    ],
    image: "/diwali/lakshmi-charan-potlis.jpg",
    alt: "Rows of pink satin potlis with lotus and pearl tassels, made as return favours",
    slides: [
      {
        image: "/diwali/lakshmi-charan-potlis.jpg",
        alt: "Rows of pink satin potlis with lotus and pearl tassels, made as return favours",
        label: "Return favours",
      },
      {
        image: "/work/beaded-potlis-envelopes.jpg",
        alt: "Hand-beaded potlis and shagun envelopes in coral, sky blue, mint, ivory, lilac and pink",
        label: "Beaded potlis & envelopes",
      },
      {
        image: "/work/save-the-date-shraddha-shubham.webp",
        alt: "Layered arch save the date cards with lavender sprigs",
        label: "Save the dates",
      },
    ],
    href: "/work?c=wedding",
    cta: "Wedding work",
  },
  {
    slug: "festive",
    title: "Festive",
    summary: "Diwali, Rakhi and every festival in between.",
    items: ["Diwali hampers", "Rakhi boxes"],
    image: "/diwali/pichwai-tray.jpg",
    alt: "Pichwai Diwali hamper on a wooden tray",
    href: "/festive/diwali",
    cta: "Diwali collection",
  },
  {
    slug: "corporate",
    title: "Corporate",
    summary: "Client and team gifting, in bulk, without losing the detail.",
    items: ["Festive bulk orders", "Branded packaging"],
    image: "/diwali/navy-nuts.jpg",
    alt: "Navy gift box with a Happy Deepawali card, gold diya stands and jars of nuts, ready for client gifting",
    href: "/#enquire",
    cta: "Get a bulk quote",
  },
  {
    slug: "custom",
    title: "Custom",
    summary: "Birthdays, anniversaries, custom card games, or a gift that doesn't have a name yet.",
    items: ["Personalised boxes", "Custom card games", "Photo keepsakes"],
    image: "/work/card-game-couples.jpg",
    alt: "Personalised Couple's Edition card game with the couple's photos on the cards",
    href: "/work?c=personal",
    cta: "Custom gifts",
  },
];

export const services = [
  "Save the dates",
  "Invitations & monograms",
  "Wedding signage",
  "Bridesmaid boxes",
  "Hampers & favours",
  "Post-wedding stationery",
  "Diwali hampers",
  "Rakhi gifts",
  "Custom card games",
  "Corporate gifting",
];
