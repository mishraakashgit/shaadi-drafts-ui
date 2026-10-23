export type Occasion = {
  slug: string;
  title: string;
  summary: string;
  items: string[];
  image: string;
  alt: string;
  href: string;
  cta: string;
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
    image: "/work/save-the-date-shraddha-shubham.webp",
    alt: "Layered arch save the date cards with lavender sprigs",
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
    image: "/diwali/lakshmi-charan-potlis.jpg",
    alt: "Rows of pink satin potlis made in bulk",
    href: "/#enquire",
    cta: "Get a bulk quote",
  },
  {
    slug: "custom",
    title: "Custom",
    summary: "Birthdays, anniversaries, custom card games, or a gift that doesn't have a name yet.",
    items: ["Personalised boxes", "Custom card games", "Photo keepsakes"],
    image: "/work/papa-birthday-box.jpg",
    alt: "Personalised birthday box for a father with a framed photo and wallet",
    href: "/work?c=personal",
    cta: "Custom gifts",
  },
];

export const process = [
  {
    title: "Tell us",
    body: "The occasion, how many people, your budget and the feeling you're after.",
  },
  { title: "We draft", body: "A concept with packaging, contents and personalisation options." },
  {
    title: "You approve",
    body: "Revisions until it feels right. Nothing is made without your yes.",
  },
  { title: "We deliver", body: "Handcrafted, packed with care and shipped across India." },
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
