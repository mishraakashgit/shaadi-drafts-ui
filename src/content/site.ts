export const site = {
  name: "Shaadi Drafts",
  tagline: "Gifts, drafted with meaning.",
  description:
    "Wedding gifting, festive hampers and custom keepsakes, designed in-house and delivered across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shaadidrafts.com",
  whatsapp: "918329049746",
  phoneDisplay: "+91 83290 49746",
  email: "shaadidrafts@gmail.com",
  social: {
    instagram: "https://www.instagram.com/shaadi_drafts/",
    facebook: "https://www.facebook.com/shaadidrafts",
  },
} as const;

export const nav = [
  { label: "Occasions", href: "/#occasions" },
  { label: "Diwali", href: "/festive/diwali" },
  { label: "Our founder", href: "/#founder" },
  { label: "Enquire", href: "/#enquire" },
] as const;
