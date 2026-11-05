// "Dulhe Raja, Reporting for Duty!": the clickable quiz a bride sends her groom. Launch product,
// 50% off for November 2026. Page photos come from the sample in assets/photos/work/dulhe-raja-*.

/** The launch offer runs until the start of this day in India (so through 30 November 2026). */
export const OFFER_ENDS = "2026-12-01";

export const dulheRaja = {
  slug: "dulhe-raja",
  href: "/dulhe-raja",
  name: "Dulhe Raja, Reporting for Duty!",
  tagline: "A highly unofficial test for the future dulha.",
  occasion: "Digital surprise for the groom",
  price: 999,
  offerPrice: 499,
  offerLabel: "50% off all November",
  blurb:
    "A clickable surprise from the bride to her groom. He taps through a cheeky test of shaadi-planning dilemmas, gets a “Soo not allowed, please try again” for every wrong answer, and finds a love note from you on the last page.",
  inside: [
    "Personalised with your photos and names",
    "Cheeky Hinglish questions, written around your story",
    "Clickable answers, with a “try again” for the wrong ones",
    "A closing love note in your words",
    "Delivered as a clickable digital file, ready to forward",
    "Revisions included",
  ],
  pages: [
    {
      image: "/work/dulhe-raja-1.jpg",
      alt: "Cover page: Dulhe Raja, reporting for duty! A highly unofficial test for the future dulha, with the couple's photo in a polaroid",
      caption: "The cover",
    },
    {
      image: "/work/dulhe-raja-2.jpg",
      alt: "Before you become the husband, let's see if you qualify. A button reads Chalo, test shuru karein",
      caption: "Let's see if you qualify",
    },
    {
      image: "/work/dulhe-raja-3.jpg",
      alt: "Baby, we have a shaadi problem! The wedding is in 3 months. Three answers to choose from",
      caption: "Question one",
    },
    {
      image: "/work/dulhe-raja-4.jpg",
      alt: "Wrong answer page: your future wife already sent you 47 Pinterest boards. Soo not allowed, please try again",
      caption: "Wrong answer!",
    },
    {
      image: "/work/dulhe-raja-5.jpg",
      alt: "Wrong answer page: Liar, liar, pants on fire! Teen mahine bahut hote hain? Achha ji!",
      caption: "Another wrong answer",
    },
    {
      image: "/work/dulhe-raja-6.jpg",
      alt: "Ungli mat uthana, janaab! Choose your survival strategy, future husband, with three answers",
      caption: "Question two",
    },
    {
      image: "/work/dulhe-raja-7.jpg",
      alt: "Congratulations, Dulhe Raja! Shaadi hum dono ki hai, toh team bhi hum dono ki hogi",
      caption: "He passes",
    },
    {
      image: "/work/dulhe-raja-8.jpg",
      alt: "To my favourite partner in crime: three polaroids of the couple spelling I love you, with a love note",
      caption: "The love note",
    },
  ],
  steps: [
    {
      title: "Tell us about you two",
      body: "Share your names, a few photos and the inside jokes only the two of you would get.",
    },
    {
      title: "We draft his test",
      body: "We write the questions in your voice and design every page. You review it, and we revise until it's right.",
    },
    {
      title: "Send it to him",
      body: "We hand over the clickable file. Forward it on WhatsApp, then wait for his reaction.",
    },
  ],
  faqs: [
    {
      q: "Is this a physical gift?",
      a: "No, it's digital: a clickable file you send him on WhatsApp or email. Pair it with a groom box or proposal box if you'd like something he can hold too.",
    },
    {
      q: "Can I change the questions?",
      a: "Yes. Every test is written for your story. Tell us your inside jokes and wedding-planning moments, and we'll build the questions and answers around them.",
    },
    {
      q: "How does the November offer work?",
      a: "Order any time until 30 November 2026 and pay ₹499 instead of ₹999.",
    },
    {
      q: "How do I order?",
      a: "Message us on WhatsApp at +91 83290 49746 or on Instagram at @shaadi_drafts. We'll ask for your photos and story and get started.",
    },
  ],
} as const;

/** Whether the launch price applies at `now`. */
export function offerActive(now: Date = new Date()): boolean {
  return now.getTime() < Date.parse(`${OFFER_ENDS}T00:00:00+05:30`);
}
