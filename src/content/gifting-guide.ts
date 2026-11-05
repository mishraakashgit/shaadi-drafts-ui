// Copy for /gifting, the search-focused overview page. Each section targets the phrases people
// search for, and links to the pieces on the site that prove it.

export type GuideSection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  /** Slugs from content/work.ts or content/diwali.ts to show as examples. */
  examples: { kind: "work" | "hamper" | "gift"; slug: string }[];
  link: { href: string; label: string };
};

export const guideSections: GuideSection[] = [
  {
    id: "wedding-return-gifts",
    eyebrow: "Weddings",
    title: "Wedding return gifts & favours",
    body: [
      "Return gifts are the last thing your guests take home, so we design them to match the wedding: hand-beaded potlis, satin favours and gota shagun envelopes in your colours, made function-wise for the mehendi, sangeet and wedding day.",
      "Every favour is made by hand and can be ordered in bulk for a full guest list without losing the detail.",
    ],
    examples: [
      { kind: "work", slug: "beaded-potlis-envelopes" },
      { kind: "work", slug: "gota-shagun-envelopes" },
      { kind: "work", slug: "lakshmi-charan-potlis" },
    ],
    link: { href: "/work?c=wedding", label: "See our wedding work" },
  },
  {
    id: "bridesmaid-proposal-box",
    eyebrow: "Weddings",
    title: "Bridesmaid & groomsman proposal boxes",
    body: [
      "Ask your favourite people to stand beside you with a box that could only be for them. Our bridesmaid proposal boxes pair a personalised proposal card and polaroids with jewellery, a silk-scarf tote and treats; our groomsman boxes add photo cards, a wax-sealed note and a bow tie for the big day.",
    ],
    examples: [
      { kind: "work", slug: "bridesmaid-proposal-box" },
      { kind: "work", slug: "bhai-box" },
    ],
    link: { href: "/work?c=wedding", label: "See proposal boxes" },
  },
  {
    id: "gift-for-groom",
    eyebrow: "Weddings",
    title: "A surprise gift for the groom-to-be",
    body: [
      "Dulhe Raja, Reporting for Duty! is a personalised, clickable quiz from the bride to her groom: cheeky Hinglish questions about wedding planning, a “try again” for every wrong answer and a love note with your photos at the end. Written around your story and sent digitally, ready to forward on WhatsApp.",
    ],
    examples: [
      { kind: "work", slug: "dulhe-raja" },
      { kind: "work", slug: "bhai-box" },
    ],
    link: { href: "/dulhe-raja", label: "See the Dulhe Raja quiz" },
  },
  {
    id: "wedding-invitations",
    eyebrow: "Stationery",
    title: "Wedding invitations, save the dates & monograms",
    body: [
      "Bespoke wedding stationery, designed in-house by an architect: save the dates, invitation suites, couple monograms, announcements, signage and post-wedding thank-you cards, in print or as digital and WhatsApp invites.",
    ],
    examples: [
      { kind: "work", slug: "arnav-nayan-invite" },
      { kind: "work", slug: "save-the-date-shraddha-shubham" },
      { kind: "work", slug: "monogram-elephant-arch" },
    ],
    link: { href: "/work?c=design", label: "See stationery & design" },
  },
  {
    id: "diwali-hampers",
    eyebrow: "Festive",
    title: "Diwali gift hampers",
    body: [
      "Pichwai-inspired Diwali hampers for family, friends and teams: Shubh Labh hangings, gold diya stands, mandala candles, potlis and festive treats in gift-ready trays, boxes and bags. Every hamper can be personalised with names, notes or a family monogram.",
    ],
    examples: [
      { kind: "hamper", slug: "pichwai-tray" },
      { kind: "hamper", slug: "deepawali-keepsake-box" },
      { kind: "hamper", slug: "organza-crate" },
    ],
    link: { href: "/festive/diwali", label: "Shop the Diwali collection" },
  },
  {
    id: "corporate-gifting",
    eyebrow: "Corporate",
    title: "Corporate Diwali & festive gifting",
    body: [
      "Thank clients and teams with hampers that carry your brand: your logo on the box, sleeve and card, a personal message inside, and delivery to one office or many addresses across India. We handle festive, onboarding and event gifting in bulk.",
    ],
    examples: [
      { kind: "hamper", slug: "deepawali-keepsake-box" },
      { kind: "gift", slug: "lakshmi-charan-potli" },
    ],
    link: { href: "/festive/diwali", label: "See corporate hampers" },
  },
  {
    id: "rakhi-gifts",
    eyebrow: "Festive",
    title: "Rakhi gift boxes",
    body: [
      "Raksha Bandhan boxes put together for one brother or sister: a rakhi with roli-chawal, a personalised card, chocolates and keepsakes, packed to send across India.",
    ],
    examples: [{ kind: "work", slug: "rakhi-best-brother" }],
    link: { href: "/work?c=festive", label: "See festive work" },
  },
  {
    id: "personalised-gifts",
    eyebrow: "Custom",
    title: "Personalised & custom gifts",
    body: [
      "Birthdays, anniversaries and best friends: custom card games with your photos on all 112 cards, name boxes for parents, polaroid memory bags, or a gift that doesn't have a name yet. Bring us a person and a memory, and we'll turn it into something they keep.",
      "Refer a friend: when you both order one of our custom card games, you each pay ₹649 instead of the ₹899 MRP.",
    ],
    examples: [
      { kind: "work", slug: "card-game-couples" },
      { kind: "work", slug: "papa-birthday-box" },
      { kind: "work", slug: "polaroid-memory-bag" },
    ],
    link: { href: "/work?c=personal", label: "See custom gifts" },
  },
];

export const guideFaqs = [
  {
    q: "Do you deliver gifts across India?",
    a: "Yes. Everything is packed to travel and shipped across India. Share your delivery locations when you enquire and we'll confirm timelines.",
  },
  {
    q: "How early should I order wedding gifts and stationery?",
    a: "Book 3–6 weeks before your wedding functions. For festive and bulk orders, enquire as early as you can.",
  },
  {
    q: "Can I customise a hamper or gift?",
    a: "Yes. Every piece is fully customised, with revisions included. Change the contents, colours and packaging, or add names, monograms and your own message.",
  },
  {
    q: "Do you make return gifts and corporate gifts in bulk?",
    a: "Yes. We make wedding return favours for full guest lists and corporate hampers for teams and clients, with branded packaging and delivery to multiple addresses.",
  },
  {
    q: "How do I order?",
    a: "Message us on WhatsApp at +91 83290 49746 or on Instagram at @shaadi_drafts, or send the enquiry form on this page. We'll come back with ideas, options and a quote.",
  },
];
