export const workCategories = [
  { value: "all", label: "All" },
  { value: "wedding", label: "Weddings" },
  { value: "festive", label: "Festive" },
  { value: "personal", label: "Birthdays & personal" },
  { value: "design", label: "Stationery & design" },
] as const;

export type WorkCategory = Exclude<(typeof workCategories)[number]["value"], "all">;

export type WorkPiece = {
  slug: string;
  title: string;
  occasion: string;
  category: WorkCategory;
  story: string;
  inside: string[];
  image: string;
  alt: string;
  /** Intrinsic size for flat artwork: shown uncropped instead of in an arch frame. */
  size?: { width: number; height: number };
};

// Past commissions. Titles and descriptions are drafts based on the photos; confirm before launch.
export const work: WorkPiece[] = [
  {
    slug: "bridesmaid-proposal-box",
    title: "Will You Be My Bridesmaid?",
    occasion: "Bridesmaid proposal",
    category: "wedding",
    story:
      "A sage keepsake chest that asks the big question, lined with a string of polaroids from years of friendship.",
    inside: [
      "Proposal card",
      "Polaroid photo string",
      "Jewellery case",
      "Mini tote with silk scarf",
      "Fairy-light jar",
      "Chocolate",
    ],
    image: "/work/bridesmaid-proposal-box.jpg",
    alt: "Sage green chest with a Will you be my bridesmaid card, a polaroid string, a jewellery case, a mini tote and a fairy-light jar",
  },
  {
    slug: "bhai-box",
    title: "The ‘Aye Bhai’ Box",
    occasion: "Groomsman gift",
    category: "wedding",
    story:
      "For the brother who has to get the suit stitched: inside jokes on cards, a sealed letter and a bow tie for the big day.",
    inside: [
      "Personalised photo card",
      "Wax-sealed letter",
      "Inside-joke quote cards",
      "Bow tie",
      "Coffee & dark chocolate",
    ],
    image: "/work/bhai-box.jpg",
    alt: "Charcoal gift box with a personalised Bhai photo card, a wax-sealed letter, quote cards, a bow tie, coffee and chocolate",
  },
  {
    slug: "arnav-nayan-invite",
    title: "Arnav & Nayan",
    occasion: "Wedding invitation",
    category: "design",
    story:
      "A royal invite with Pichwai borders, lotuses and a pair of elephants guarding the couple's monogram, drafted in four colourways.",
    inside: ["Invitation design", "Monogram", "Four colourways"],
    image: "/work/arnav-nayan-invite.jpg",
    alt: "Four colourways of a wedding invitation for Arnav and Nayan with Pichwai floral borders, lotuses and two golden elephants",
    size: { width: 1508, height: 1914 },
  },
  {
    slug: "monogram-elephant-arch",
    title: "The Shehnai Monogram",
    occasion: "Couple monogram",
    category: "design",
    story:
      "Devanagari and Latin letterforms woven together, with a shehnai, a peacock feather and a nazar charm, under a jharokha arch.",
    inside: ["Bilingual monogram", "Watercolour elephant & lotus artwork"],
    image: "/work/monogram-elephant-arch.jpg",
    alt: "Wedding monogram combining Devanagari and Latin letters in blue and pink inside a gold jharokha arch, with a decorated elephant and lotuses",
    size: { width: 1627, height: 2000 },
  },
  {
    slug: "save-the-date-shraddha-shubham",
    title: "Shraddha & Shubham",
    occasion: "Save the date",
    category: "design",
    story:
      "Layered arch and scalloped cards in powder blue and lavender, held with a rose-gold clip.",
    inside: ["Die-cut layered cards", "Monogram", "Botanical illustration"],
    image: "/work/save-the-date-shraddha-shubham.webp",
    alt: "Layered arch-shaped save the date cards for Shraddha and Shubham with scalloped edges, lavender sprigs and rose-gold clips",
    size: { width: 768, height: 1253 },
  },
  {
    slug: "she-said-yes",
    title: "She Said Yes",
    occasion: "Engagement announcement",
    category: "design",
    story:
      "A cheeky, collage-style announcement written in the voice of the couple's best friends.",
    inside: ["Digital announcement", "Custom copywriting"],
    image: "/work/she-said-yes.png",
    alt: "Collage-style engagement announcement with a ring hand illustration, a March calendar and the words Congratulations, she said yes",
    size: { width: 795, height: 559 },
  },
  {
    slug: "chitale-bandhu-rakhi",
    title: "Chitale Bandhu",
    occasion: "Raksha Bandhan campaign",
    category: "design",
    story:
      "A hand-illustrated Raksha Bandhan creative for a heritage mithai brand: a bond as sweet as this.",
    inside: ["Festive campaign artwork", "In-store standee"],
    image: "/work/chitale-bandhu-rakhi.jpg",
    alt: "Raksha Bandhan standee outside a sweet shop, illustrated with a sister tying a rakhi on her brother",
    size: { width: 1536, height: 1024 },
  },
  {
    slug: "rakhi-best-brother",
    title: "Best Brother Rakhi Box",
    occasion: "Raksha Bandhan",
    category: "festive",
    story:
      "A glowing Rakhi set for the best brother ever, with a fairy-light jar and his favourite chocolates.",
    inside: [
      "Raksha Bandhan card",
      "Rakhi & roli-chawal",
      "'Best Brother Ever' tag",
      "Fairy-light jar",
      "Chocolates",
      "Postcard",
    ],
    image: "/work/rakhi-best-brother.jpg",
    alt: "Clear gold box with a Happy Raksha Bandhan card, a rakhi, a Best Brother Ever tag, chocolates and a glowing fairy-light jar",
  },
  {
    slug: "papa-birthday-box",
    title: "The Papa Box",
    occasion: "Birthday",
    category: "personal",
    story:
      "Dad's name in wood on a black box, an old photo framed and a letter he'll keep in his wallet.",
    inside: [
      "Name-lettered box",
      "Framed photograph",
      "Leather wallet",
      "Fragrance & grooming kit",
      "Wax-sealed letter",
      "Chocolate",
    ],
    image: "/work/papa-birthday-box.jpg",
    alt: "Black box with PAPA in wooden letters beside a framed photo, a leather wallet, a fragrance, grooming products and a wax-sealed letter",
  },
  {
    slug: "polaroid-memory-bag",
    title: "Polaroid Memory Bag",
    occasion: "For a best friend",
    category: "personal",
    story: "Nicknames and memories on hanging polaroids, with a few pretty things tucked inside.",
    inside: ["Polaroid tags with nicknames", "Skincare", "Pendant necklace", "Handwritten note"],
    image: "/work/polaroid-memory-bag.jpg",
    alt: "Clear gold-framed bag hung with personalised polaroid photos and handwritten nicknames",
  },
  {
    slug: "pichwai-tray",
    title: "The Pichwai Tray",
    occasion: "Diwali",
    category: "festive",
    story: "Our signature Diwali hamper, finished with satin ribbon, pearls and gold florals.",
    inside: ["Shubh Labh hangings", "Gold diya stands", "Mandala candle", "Festive treats"],
    image: "/diwali/pichwai-tray.jpg",
    alt: "Wooden tray Diwali hamper with green ribbon, gold diya stands and festive treats",
  },
  {
    slug: "organza-crate",
    title: "The Organza Crate",
    occasion: "Diwali",
    category: "festive",
    story: "A wooden crate veiled in gold organza and pinned with a mirror-work flower.",
    inside: ["Deepawali arch card", "Mirror-work keepsake box", "Mandala candles", "Incense"],
    image: "/diwali/organza-crate.jpg",
    alt: "Wooden crate wrapped in gold organza with a mirror-work flower brooch",
  },
  {
    slug: "lakshmi-charan-potlis",
    title: "Lakshmi Charan Potlis",
    occasion: "Diwali favours",
    category: "festive",
    story:
      "A potli for every guest: satin, pearls and a lotus, made in bulk without losing the detail.",
    inside: ["Satin potli", "Lakshmi charan stickers", "Tea-lights"],
    image: "/diwali/lakshmi-charan-potlis.jpg",
    alt: "Rows of pink satin potlis with lotus and pearl tassels and tea-lights",
  },
];
