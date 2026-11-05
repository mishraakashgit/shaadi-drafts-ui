import { dulheRaja } from "./dulhe-raja";

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
  /** Extra photos shown in the quick view after the main one. */
  gallery?: { image: string; alt: string }[];
  /** Intrinsic size for flat artwork: shown uncropped instead of in an arch frame. */
  size?: { width: number; height: number };
  /** Sold at a fixed price with the refer-a-friend discount (see `referralOffer`). */
  referral?: boolean;
};

/**
 * Refer-a-friend offer on the custom card games: when you and a friend you refer each order one
 * of our card games (either edition), you both get it at the special price instead of the MRP.
 */
export const referralOffer = {
  mrp: 899,
  price: 649,
  title: "Refer a friend, play for less",
  steps: [
    { title: "Order your card game", body: "The Couple's or the Best Friends edition." },
    {
      title: "Refer a friend who orders one too",
      body: "They can pick either edition, made with their own photos.",
    },
    {
      title: "You both pay ₹649",
      body: "Each custom 112-card game is ₹649 instead of the ₹899 MRP.",
    },
  ],
} as const;

// Past commissions. Titles and descriptions are drafts based on the photos; confirm before launch.
export const work: WorkPiece[] = [
  {
    slug: dulheRaja.slug,
    title: dulheRaja.name,
    occasion: dulheRaja.occasion,
    category: "wedding",
    story: dulheRaja.blurb,
    inside: [...dulheRaja.inside],
    image: dulheRaja.pages[0].image,
    alt: dulheRaja.pages[0].alt,
    gallery: dulheRaja.pages.slice(1).map((p) => ({ image: p.image, alt: p.alt })),
    size: { width: 1920, height: 1079 },
  },
  {
    slug: "bridesmaid-proposal-box",
    title: "Will You Be My Bridesmaid?",
    occasion: "Bridesmaid proposal",
    category: "wedding",
    story:
      "A rattan hamper box that asks the big question, with a polaroid string of years of friendship, jewellery, a silk-scarf tote and a few sweet treats.",
    inside: [
      "Rattan hamper box",
      "Proposal card",
      "Polaroid photo string",
      "Jewellery box",
      "Mini tote bag with silk scarf",
      "Jute potli with sweet goodies",
      "Automatic stirring coffee mug with Sleepy Owl coffee sachets",
      "Cadbury Rum & Raisin chocolate",
      "Pair of earrings",
      "Custom fridge magnet",
      "Custom postcard",
      "Premium packaging",
    ],
    image: "/work/bridesmaid-proposal-box.jpg",
    alt: "Rattan hamper box with a Will you be my bridesmaid card, a polaroid string, a jewellery box, a mini tote with a silk scarf, a jute potli and Cadbury Rum & Raisin",
  },
  {
    slug: "beaded-potlis-envelopes",
    title: "Beaded Potlis & Shagun Envelopes",
    occasion: "Return favours",
    category: "wedding",
    story:
      "Hand-beaded potlis and envelopes in coral, sky, mint, ivory, lilac and pink: one for every guest, matched to the wedding palette.",
    inside: ["Pearl-beaded potlis", "Beaded shagun envelopes", "Gota & stone detailing"],
    image: "/work/beaded-potlis-envelopes-2.jpg",
    alt: "Hand-beaded potlis in ivory, red and peach with pink and lilac beaded shagun envelopes",
    gallery: [
      {
        image: "/work/beaded-potlis-envelopes.jpg",
        alt: "Hand-beaded potlis in coral, sky blue, mint and ivory with lilac and pink beaded shagun envelopes beside pink roses",
      },
    ],
  },
  {
    slug: "gota-shagun-envelopes",
    title: "Gota Shagun Envelopes",
    occasion: "Return favours",
    category: "wedding",
    story:
      "Hand-stitched fabric envelopes with gota leaf detailing, for shagun that looks as good as it feels. Colours mixed to match the wedding.",
    inside: [
      "Fabric envelope with gota-patti trim",
      "Rani pink, red, yellow, beige & sage green",
      "Made in bulk",
    ],
    image: "/diwali/gota-shagun-envelopes.jpg",
    alt: "Fabric shagun envelopes in pink, red, yellow, beige and green with gold gota leaf stitching",
  },
  {
    slug: "bhai-box",
    title: "The ‘Aye Bhai’ Box",
    occasion: "Groomsman gift",
    category: "wedding",
    story:
      "For the brother who has to get the suit stitched: his photo card, the save the date, a wax-sealed note, a framed photo and a bow tie for the big day.",
    inside: [
      "Black hamper box",
      "Personalised photo card",
      "Save the date invite",
      "Automatic stirring coffee mug with charging cable",
      "Wax-sealed personalised note",
      "Photo frame",
      "Bow tie",
      "Coffee & dark chocolate",
    ],
    image: "/work/bhai-box.jpg",
    alt: "Black hamper box with a personalised Bhai photo card, a save the date, a wax-sealed note, a photo frame, a bow tie, coffee and dark chocolate",
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
    slug: "card-game-couples",
    title: "The Couple’s Card Game",
    occasion: "Custom card deck",
    category: "personal",
    story:
      "A full 112-card deck starring the two of them: their photos on the cards, and in-jokes on every action card. ‘Skip → straight to hugs.’",
    inside: ["112 cards", "Photo cards", "Personalised action cards", "Printed box"],
    image: "/work/card-game-couples.jpg",
    alt: "Personalised Couple's Edition card game with the couple's photos on the cards and custom messages like Skip, straight to hugs",
    referral: true,
  },
  {
    slug: "card-game-best-friends",
    title: "The Best Friends Card Game",
    occasion: "Custom card deck",
    category: "personal",
    story:
      "The same idea for a best friend: a 112-card deck with childhood photos, then and now, made for game night.",
    inside: ["112 cards", "Photo cards", "Custom rules & messages", "Printed box"],
    image: "/work/card-game-best-friends.jpg",
    alt: "Red Best Friends Edition card game box printed with photos of two friends as children and today",
    referral: true,
  },
  {
    slug: "polaroid-memory-bag",
    title: "Polaroid Memory Bag",
    occasion: "For a best friend",
    category: "personal",
    story:
      "Nicknames and memories on hanging polaroids, with skincare, a pendant, perfume and a custom note tucked inside.",
    inside: [
      "Premium PVC hamper box (8″ × 8″ × 4″)",
      "Skincare",
      "Pendant necklace",
      "Bellavita perfume (60 ml)",
      "Face mask",
      "Custom note",
      "Polaroid pictures",
      "Premium packaging",
    ],
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
    title: "Pink Potli Favours",
    occasion: "Return favours",
    category: "wedding",
    story:
      "A potli for every guest: satin, pearls and a lotus, made in bulk without losing the detail.",
    inside: ["Satin potli", "Lakshmi charan stickers", "Tea-lights"],
    image: "/diwali/lakshmi-charan-potlis.jpg",
    alt: "Rows of pink satin potlis with lotus and pearl tassels and tea-lights",
  },
];
