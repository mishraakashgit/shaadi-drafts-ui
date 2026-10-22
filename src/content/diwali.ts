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
};

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
