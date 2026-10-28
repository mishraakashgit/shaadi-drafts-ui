// Diwali 2026 hamper catalogue, from the Shaadi Drafts Diwali price list.
// Photos live in brochure/diwali/photos. `nuts` adds a "Contains nuts" note.

export const MOQ = 25;

export const tiers = [
  { id: "budget", label: "Budget", range: "₹999" },
  { id: "classic", label: "Classic", range: "₹1,200 – ₹1,250" },
  { id: "premium", label: "Premium", range: "₹1,499" },
  { id: "luxury", label: "Luxury", range: "₹2,899" },
];

export const packing = {
  pvc: { label: "Clear gold PVC bag", color: "#b08a2e" },
  emerald: { label: "Emerald magnetic box", color: "#1f5a4c" },
  navy: { label: "Navy magnetic box", color: "#1d2a4a" },
  ivory: { label: "Ivory magnetic box", color: "#a8325e" },
  tray: { label: "Wooden tray", color: "#7a5432" },
};

export const hampers = [
  {
    name: "PVC Hamper",
    tier: "budget",
    price: 999,
    pack: "pvc",
    accent: "#a8325e",
    highlights: "Anar Dana, beaded potli, tealight diyas, Shubh Labh plaques",
    blurb:
      "Ready to gift and easy to carry. A clear gold PVC bag with rope handles holds Joyspoon Anar Dana, a beaded potli, tealight diyas and pink Shubh Labh plaques with pearl tassels.",
    inside: [
      "Clear gold PVC gift bag with rope handles",
      "Joyspoon Anar Dana",
      "Beaded potli",
      "Tealight diyas with jaali lid (2)",
      "Shubh Labh plaques with pearl tassels",
      "Floral decor",
    ],
    photos: [
      ["pvc-blush-bag", "Ready-to-gift PVC bag"],
      ["pvc-blush-items", "Items included"],
    ],
  },
  {
    name: "Shubh Labh",
    tier: "classic",
    price: 1200,
    pack: "emerald",
    accent: "#1f5a4c",
    highlights: "Pink jute potli, charan motif set, Phool Nagchampa incense",
    blurb:
      "A hamper full of auspicious touches. A pink jute potli and decorative charan motifs join tealight diyas and Phool Nagchampa cones in an emerald lotus-print box.",
    inside: [
      "Premium magnetic collapsible gift box",
      "Phool luxury essence cones",
      "Tealight diyas with jaali lid (2)",
      "Pink jute potli",
      "Decorative charan motif set",
      "Designer accents & floral decor",
      "Personalized message card",
    ],
    photos: [
      ["shubh-labh-inside", "Inside the hamper"],
      ["box-emerald", "The box, from outside"],
    ],
  },
  {
    name: "Kolkata Evening",
    tier: "classic",
    price: 1225,
    pack: "emerald",
    accent: "#1f5a4c",
    highlights: "Calcutta Paan, painted diya tins, Phool Nagchampa incense",
    blurb:
      "A little taste of Kolkata for your Diwali. Joyspoon Calcutta Paan comes with hand-painted diya tins, glowing tealight diyas and calming Phool Nagchampa cones, in an emerald lotus-print box.",
    inside: [
      "Premium magnetic collapsible gift box",
      "Phool luxury essence cones",
      "Tealight diyas with jaali lid (2)",
      "Hand-painted diya tins (2)",
      "Joyspoon Calcutta Paan",
      "Designer accents & floral decor",
      "Personalized message card",
    ],
    photos: [
      ["kolkata-evening-inside", "Inside the hamper"],
      ["box-emerald", "The box, from outside"],
    ],
  },
  {
    name: "Nutty Glow",
    tier: "classic",
    price: 1225,
    pack: "emerald",
    accent: "#1f5a4c",
    nuts: true,
    highlights: "Nutties, chocolate-coated almonds, Phool Nagchampa incense",
    blurb:
      "Snacking, sorted. A jar of Nutties and a jar of chocolate-coated almonds come with glowing tealight diyas and Phool Nagchampa cones, all in an emerald lotus-print box.",
    inside: [
      "Premium magnetic collapsible gift box",
      "Phool luxury essence cones",
      "Tealight diyas with jaali lid (2)",
      "Nutties jar",
      "Chocolate-coated almonds jar",
      "Designer accents & floral decor",
      "Personalized message card",
    ],
    photos: [
      ["nutty-glow-inside", "Inside the hamper"],
      ["box-emerald", "The box, from outside"],
    ],
  },
  {
    name: "Midnight Glow",
    tier: "classic",
    price: 1225,
    pack: "navy",
    accent: "#1d2a4a",
    nuts: true,
    highlights: "Nutties, chocolate-coated almonds, Phool Lavender incense",
    blurb:
      "Deep navy with soft gold lotus. Chocolate-coated almonds and Nutties pair with tealight diyas and relaxing Phool Lavender cones for a calm, glowing Diwali.",
    inside: [
      "Premium magnetic collapsible gift box (navy)",
      "Phool lavender essence cones",
      "Tealight diyas with jaali lid (2)",
      "Nutties jar",
      "Chocolate-coated almonds jar",
      "Designer accents & floral decor",
      "Personalized message card",
    ],
    photos: [
      ["midnight-glow-inside", "Inside the hamper"],
      ["box-navy", "The box, from outside"],
    ],
  },
  {
    name: "Gulabo",
    tier: "classic",
    price: 1250,
    pack: "ivory",
    accent: "#a8325e",
    nuts: true,
    highlights:
      "Almonds, almond brittle cookies, chocolairs, scented candles, Phool Tuberose incense",
    blurb:
      "Pretty in pink and made to be shared. Almonds, almond brittle cookies and chocolairs sit beside scented candles and Phool Tuberose essence cones, all tucked into an ivory lotus-print magnetic box.",
    inside: [
      'Premium magnetic collapsible gift box (8"×8"×4")',
      "Phool luxury essence cones",
      "Scented candles (2)",
      "Chocolairs with premium chocolate packaging",
      "Designer accents & floral decor",
      "Almond brittle cookies (2)",
      "Almonds (90g)",
      "Personalized message card",
    ],
    photos: [
      ["gulabo-inside", "Inside the hamper"],
      ["box-ivory", "The box, from outside"],
    ],
  },
  {
    name: "Brittle & Bloom",
    tier: "classic",
    price: 1250,
    pack: "emerald",
    accent: "#1f5a4c",
    nuts: true,
    highlights: "Almond brittle (4 packs), painted diya tins, Phool Nagchampa incense",
    blurb:
      "Sweet, crunchy and beautifully painted. Four packs of Loyka almond brittle sit with two hand-painted diya tins, tealight diyas and Phool Nagchampa cones in an emerald lotus-print box.",
    inside: [
      "Premium magnetic collapsible gift box",
      "Phool luxury essence cones",
      "Tealight diyas with jaali lid (2)",
      "Hand-painted diya tins (2)",
      "Loyka almond brittle (4 packs)",
      "Designer accents & floral decor",
      "Personalized message card",
    ],
    photos: [
      ["brittle-bloom-inside", "Inside the hamper"],
      ["box-emerald", "The box, from outside"],
    ],
  },
  {
    name: "PVC Hamper · Green",
    tier: "premium",
    price: 1499,
    pack: "pvc",
    accent: "#1f5a4c",
    highlights: "Calcutta Paan, Aam Papad, mint potli, candle tin, diyas",
    blurb:
      "A fresh, green-toned gift bag. Joyspoon Calcutta Paan and Aam Papad come with a mint beaded potli, a mandala-print candle tin, tealight diyas and yellow lotus Shubh Labh hangings.",
    inside: [
      "Clear gold PVC gift bag with rope handles",
      "Joyspoon Calcutta Paan",
      "Joyspoon Aam Papad",
      "Mint beaded potli",
      "Mandala-print candle tin",
      "Tealight diyas with jaali lid (2)",
      "Shubh Labh lotus hangings with pearl tassels",
    ],
    photos: [
      ["pvc-green-bag", "Ready-to-gift PVC bag"],
      ["pvc-green-items", "Items included"],
    ],
  },
  {
    name: "Wooden Tray · Blush",
    tier: "luxury",
    price: 2899,
    pack: "tray",
    accent: "#a8325e",
    highlights: "Anar Dana, two potlis, paisley candle tin, tealight diyas",
    blurb:
      "A blush-toned wooden tray trimmed with pearls. Pink and red potlis, Joyspoon Anar Dana, a paisley-print candle tin and tealight diyas, finished with roses and gold floral decor.",
    inside: [
      "Wooden gift tray with pearl trim",
      "Pink jute potli",
      "Beaded potli",
      "Joyspoon Anar Dana",
      "Paisley-print candle tin",
      "Tealight diyas with jaali lid (2)",
      "Floral decor",
    ],
    photos: [["tray-blush", "Wooden tray hamper"]],
  },
  {
    name: "Wooden Tray · Green",
    tier: "luxury",
    price: 2899,
    pack: "tray",
    accent: "#1f5a4c",
    highlights: "Aam Papad, Calcutta Paan, mint potli, candle tin, diyas",
    blurb:
      "Our green wooden tray, tied with a satin ribbon and flower. Joyspoon Aam Papad and Calcutta Paan sit beside a mint beaded potli, a mandala-print candle tin and tealight diyas.",
    inside: [
      "Wooden gift tray with pearl trim and green satin ribbon",
      "Joyspoon Aam Papad",
      "Joyspoon Calcutta Paan",
      "Mint beaded potli",
      "Mandala-print candle tin",
      "Tealight diyas with jaali lid (2)",
      "Shubh Labh lotus motifs",
      "Floral decor",
    ],
    photos: [["tray-green", "Wooden tray hamper"]],
  },
  {
    name: "Wooden Tray · Gold",
    tier: "luxury",
    price: 2899,
    pack: "tray",
    accent: "#8a6a1e",
    highlights: "Ruaan fragrance, painted candle tins, jute potli, greeting card",
    blurb:
      "A wooden tray wrapped in gold organza with a mirror-and-pearl flower. Inside: a Ruaan fragrance product, painted candle tins, a jute potli and a Happy Deepawali card.",
    inside: [
      "Wooden gift tray wrapped in gold organza",
      "Ruaan fragrance product",
      "Painted candle tins (2)",
      "Jute potli",
      "Mirror-work hexagon box",
      "Happy Deepawali greeting card",
      "Floral decor",
    ],
    photos: [
      ["tray-gold-closeup", "Wrapped tray, close-up"],
      ["tray-gold", "Wrapped tray"],
    ],
  },
];
