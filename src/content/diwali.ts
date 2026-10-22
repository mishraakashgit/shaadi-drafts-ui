// Diwali 2026 (Lakshmi Puja) falls on Sunday, 8 November.
export const DIWALI_DATE = "2026-11-08";

export type Hamper = {
  slug: string;
  name: string;
  blurb: string;
  contents: string[];
  tags: string[];
  /** Product photo under /public, portrait 3:4. */
  image: string;
  alt: string;
  /** Optional second photo revealed on hover, e.g. the contents laid out. */
  hoverImage?: string;
  /** Alternative fillings of the same box; the card lets visitors switch between them. */
  variants?: HamperVariant[];
};

export type HamperVariant = {
  label: string;
  image: string;
  alt: string;
  contents: string[];
};

const keepsakeBase = [
  "Pair of gold tealight diya stands",
  "Natural incense cones",
  "Happy Deepawali arch card & tags",
];

// Names are working titles; contents are read from the product photos. Confirm before launch.
export const hampers: Hamper[] = [
  {
    slug: "pichwai-tray",
    name: "The Pichwai Tray",
    blurb:
      "Our signature hamper on a wooden tray, finished with satin ribbon, pearls and gold florals.",
    contents: [
      "Pichwai lotus Shubh Labh hangings",
      "Pair of gold tealight diya stands",
      "Mandala tin candle",
      "Pearl-beaded potli",
      "Aam papad & Calcutta paan mukhwas",
    ],
    tags: ["Signature"],
    image: "/diwali/pichwai-tray.jpg",
    alt: "Wooden tray hamper with green satin ribbon, gold diya stands, a mandala candle, a pearl potli, aam papad and paan mukhwas",
    hoverImage: "/diwali/pichwai-contents.jpg",
  },
  {
    slug: "pichwai-gift-box",
    name: "The Pichwai Gift Box",
    blurb:
      "The same hamper in a clear, gold-framed carry box, with the Shubh Labh hangings on display.",
    contents: [
      "Pichwai lotus Shubh Labh hangings",
      "Pair of gold tealight diya stands",
      "Mandala tin candle",
      "Pearl-beaded potli",
      "Aam papad & Calcutta paan mukhwas",
    ],
    tags: ["Gift-ready"],
    image: "/diwali/pichwai-gift-box.jpg",
    alt: "Clear gold-framed gift box with yellow pichwai lotus Shubh Labh hangings and festive treats inside",
    hoverImage: "/diwali/pichwai-contents.jpg",
  },
  {
    slug: "deepawali-keepsake-box",
    name: "Deepawali Keepsake Box",
    blurb:
      "A cloth-bound box in emerald or navy, with an arch-shaped Deepawali card. Pick the filling that suits them.",
    contents: [...keepsakeBase, "Two mandala tin candles", "Calcutta paan mukhwas"],
    tags: ["Emerald or navy"],
    image: "/diwali/emerald-candles.jpg",
    alt: "Emerald gift box with an orange Happy Deepawali arch card, gold diya stands, mandala tin candles, incense cones and paan mukhwas",
    variants: [
      {
        label: "Candles & mukhwas",
        image: "/diwali/emerald-candles.jpg",
        alt: "Emerald gift box with gold diya stands, mandala tin candles, incense cones and paan mukhwas",
        contents: [...keepsakeBase, "Two mandala tin candles", "Calcutta paan mukhwas"],
      },
      {
        label: "Nuts",
        image: "/diwali/emerald-nuts.jpg",
        alt: "Emerald gift box with gold diya stands, incense cones and jars of mixed nuts and chocolate-coated almonds",
        contents: [...keepsakeBase, "Mixed nuts jar", "Chocolate-coated almonds jar"],
      },
      {
        label: "Brittle",
        image: "/diwali/emerald-brittle.jpg",
        alt: "Emerald gift box with gold diya stands, incense cones, mandala tin candles and almond brittle packs",
        contents: [...keepsakeBase, "Two mandala tin candles", "Almond brittle bites"],
      },
      {
        label: "Potli",
        image: "/diwali/emerald-potli.jpg",
        alt: "Emerald gift box with gold diya stands, incense cones, a pink jute potli and Lakshmi charan stickers",
        contents: [...keepsakeBase, "Pink & jute potli", "Lakshmi charan stickers"],
      },
      {
        label: "Navy · Nuts",
        image: "/diwali/navy-nuts.jpg",
        alt: "Navy gift box with an orange Happy Deepawali arch card, gold diya stands, lavender incense cones and jars of nuts and chocolate-coated almonds",
        contents: [
          "Pair of gold tealight diya stands",
          "Lavender incense cones",
          "Happy Deepawali arch card & tags",
          "Mixed nuts jar",
          "Chocolate-coated almonds jar",
        ],
      },
    ],
  },
  {
    slug: "ivory-rani-pink-box",
    name: "Ivory & Rani Pink Box",
    blurb: "Ivory box, rani pink arch card, and a sweet mix of almonds, brittle and soft tuberose.",
    contents: [
      "Rani pink Happy Deepawali arch card & tags",
      "Almonds jar",
      "Almond brittle bites",
      "Floral favour box",
      "Two mandala tin candles",
      "Tuberose incense cones",
    ],
    tags: ["New"],
    image: "/diwali/ivory-rani-pink.jpg",
    alt: "Ivory gift box with a rani pink Happy Deepawali arch card, almonds jar, almond brittle, a floral favour box and tuberose incense cones",
  },
  {
    slug: "organza-crate",
    name: "The Organza Crate",
    blurb:
      "A wooden crate veiled in gold organza and pinned with a mirror-work flower. Unwrapping is half the gift.",
    contents: [
      "Rani pink Happy Deepawali arch card",
      "Mirror-work hexagonal keepsake box",
      "Two mandala tin candles",
      "Incense in a jute potli",
      "Rose & gold floral accents",
    ],
    tags: ["Hand-wrapped"],
    image: "/diwali/organza-crate.jpg",
    alt: "Wooden crate wrapped in gold organza with a mirror-work flower brooch, a pink Happy Deepawali card and mandala candles",
    hoverImage: "/diwali/organza-crate-detail.jpg",
  },
  {
    slug: "blush-shubh-labh-bag",
    name: "Blush Shubh Labh Bag",
    blurb:
      "Soft pink and gold: a clear carry bag with jewelled hangings, diya stands and a beaded potli.",
    contents: [
      "Blush Shubh Labh hangings with pearl tassels",
      "Pair of gold tealight diya stands",
      "Hand-beaded potli",
      "Anar dana mukhwas",
    ],
    tags: ["New"],
    image: "/diwali/blush-shubh-labh-bag.jpg",
    alt: "Clear gold-framed bag with pink Shubh Labh hangings beside gold diya stands, a red beaded potli and a jar of anar dana",
  },
];

// Smaller pieces: favours, shagun and add-ons, ordered singly or in bulk.
export const gifts: Hamper[] = [
  {
    slug: "lakshmi-charan-potli",
    name: "Lakshmi Charan Potli",
    blurb: "A little potli for every guest, made for teams, Diwali parties and family gatherings.",
    contents: [
      "Satin potli with lotus & pearl tassel",
      "Lakshmi charan & swastik stickers",
      "Pair of tea-lights",
    ],
    tags: ["Bulk", "Favours"],
    image: "/diwali/lakshmi-charan-potlis.jpg",
    alt: "Rows of pink satin potlis with lotus and pearl tassels, gold Lakshmi charan sticker cards and tea-lights",
  },
  {
    slug: "gota-shagun-envelopes",
    name: "Gota Shagun Envelopes",
    blurb:
      "Hand-stitched fabric envelopes with gota leaf detailing, for shagun that looks as good as it feels.",
    contents: [
      "Fabric envelope with gota-patti trim",
      "Rani pink, red, yellow, beige & sage green",
      "Mix colours across a set",
    ],
    tags: ["Shagun", "Bulk"],
    image: "/diwali/gota-shagun-envelopes.jpg",
    alt: "Fabric shagun envelopes in pink, red, yellow, beige and green with gold gota leaf stitching",
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
