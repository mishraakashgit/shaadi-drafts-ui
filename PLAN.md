# Shaadi Drafts — Rebuild Plan

Replace the single-file `index.html` (hand-uploaded to S3, served via Amplify) with a production-grade
Next.js application for a **full-service gifting company whose lead category stays weddings**.

---

## 1. Where we are today

- One 117 KB `index.html` with all HTML, CSS and JS inline; images and the brochure PDF live only in S3
  (not in this repo).
- Wedding-stationery positioning: hero, "when to hire us", monogram generator, offerings (pre-wedding,
  wedding day, gifting & packaging, digital, custom), featured engagement work, matching suites,
  testimonials, brochure, enquiry form that hands off to WhatsApp / email.
- Contact points to carry over: WhatsApp +91 83290 49746, shaadidrafts@gmail.com,
  instagram.com/shaadi_drafts, facebook.com/shaadidrafts.
- Problems: no source control for assets, no build pipeline, manual deploys, placeholder analytics ID
  (`G-SHAADIDRAFTS`), enquiries aren't stored anywhere, adding work or products means editing raw HTML.

## 2. Target positioning

**"Gifting for every occasion — weddings first."**

| Pillar                   | What it covers                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Weddings (hero category) | Invitations & suites, hampers, bridesmaid boxes, return favours, welcome kits, signage, monograms |
| Festive                  | Rakhi, Diwali (live now — seasonal landing page), Holi, Eid, Christmas, New Year                  |
| Corporate                | Employee & client gifting, onboarding kits, festive bulk orders, branded packaging                |
| Personal & custom        | Birthdays, anniversaries, baby, housewarming, one-off custom pieces                               |

Open question: keep the **Shaadi Drafts** name as-is, or use it as the wedding line under a broader
parent name? The plan works either way; it affects domain, logo and copy.

## 3. Tech stack (recommended)

| Concern       | Choice                                                                                   | Why                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Framework     | Next.js 15 (App Router) + TypeScript                                                     | SSG/ISR for speed + SEO, server actions for forms                                                 |
| Styling       | Tailwind CSS + a small design-token layer                                                | Consistent brand system, fast iteration                                                           |
| UI primitives | Radix UI / shadcn/ui                                                                     | Accessible dialogs, menus, carousels                                                              |
| Content (CMS) | Sanity (hosted, free tier)                                                               | Team adds products, portfolio, festive collections, testimonials and founder bio without a deploy |
| Images        | `next/image` + Sanity image CDN                                                          | Automatic resizing, WebP/AVIF, lazy loading                                                       |
| Forms         | Server actions + Zod validation, Resend email, stored in CMS/DB; WhatsApp deep-link kept | Enquiries are never lost                                                                          |
| Anti-spam     | Cloudflare Turnstile + honeypot                                                          |                                                                                                   |
| Analytics     | GA4 (real ID) + Meta Pixel, consented                                                    | Track enquiry/WhatsApp conversions                                                                |
| Hosting       | Vercel (or Amplify Hosting connected to Git, which supports Next.js SSR)                 | Preview deploy per PR, no manual S3 uploads                                                       |
| Quality       | ESLint, Prettier, Vitest, Playwright smoke tests, Lighthouse CI                          | GitHub Actions on every PR                                                                        |
| Monitoring    | Sentry + Vercel Analytics / Speed Insights                                               |                                                                                                   |

Commerce: **Phase 1 is catalogue + enquiry** (WhatsApp / form → quote), which fits custom and bulk
gifting. **Phase 3 adds checkout** (Razorpay, or Shopify headless) for fixed-price festive hampers.

## 4. Information architecture

```
/                       Home
/weddings               Wedding gifting & stationery (hero category)
/festive                Festive hub
  /festive/diwali       Seasonal landing page (Diwali 2026 — priority)
  /festive/rakhi
/corporate              Corporate & bulk gifting
/custom                 Personalised / custom gifts
/collections/[slug]     Curated collections (e.g. "Diwali hampers under ₹2,000")
/products/[slug]        Product / hamper detail (images, contents, MOQ, lead time, enquire CTA)
/portfolio              Past work gallery, filterable by occasion
/portfolio/[slug]       Case study (client story, photos)
/about                  Our story + Founder & CEO section
/brochure               Brochure viewer + PDF download (email-gated optional)
/contact                Enquiry form, WhatsApp, email, socials
/faq, /shipping, /privacy, /terms
```

### Home page sections

1. Hero — wedding-led imagery, headline, two CTAs (Explore gifts / Enquire on WhatsApp)
2. Shop by occasion — Weddings · Diwali · Rakhi · Corporate · Custom
3. Seasonal banner — Diwali collection (CMS-driven, swaps automatically per season)
4. Wedding spotlight — suites, hampers, favours
5. Featured work — portfolio carousel (rakhi, Diwali, custom, weddings)
6. How it works — Brief → Design → Approve → Craft → Deliver pan-India
7. Monogram builder — kept from the current site, reused for personalised packaging
8. **Meet the founder** — photo, short bio, quote, link to /about
9. Testimonials + client logos (corporate)
10. Brochure download
11. Enquiry CTA + footer (socials, contact, policies)

### Founder & CEO section

CMS document `founder`: name, title, portrait, short bio (home), long story (about page), quote,
socials. Built with a placeholder until her details arrive.

## 5. Engineering foundations (production grade)

- SEO: per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt`, JSON-LD
  (`Organization`, `LocalBusiness`, `Product`), canonical URLs, redirects for old anchors.
- Performance budget: LCP < 2.5 s on 4G, CLS < 0.1, Lighthouse ≥ 90 on all four scores.
- Accessibility: WCAG 2.1 AA, keyboard navigation, alt text required in CMS.
- Security: CSP and security headers, rate-limited form endpoint, secrets in env vars only.
- Environments: `preview` (every PR) and `production` (`main`); branch protection + CI checks.
- Consent banner for analytics/pixel; privacy policy.
- WhatsApp floating button and click-to-chat with prefilled, page-aware message.

## 6. Brochure

- New brochure covering the gifting pivot: cover, founder note, occasions, wedding range,
  festive range, corporate offering, process, past work, contact.
- Built as a print-ready PDF (A4/A5, bleed) from the new brand system; hosted at `/brochure`.
- Input needed: the existing brochure (for structure and tone) and the new photos.

## 7. Phased roadmap

| Phase            | Scope                                                                                                                                                                     | Est.         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 0. Setup         | Next.js scaffold, Tailwind tokens, CI, lint/test, Vercel preview, domain plan                                                                                             | 1–2 days     |
| 1. Launch (MVP)  | Home, Weddings, Festive + **Diwali page**, Rakhi, Custom, Portfolio, About + Founder, Contact with stored enquiries, SEO basics, analytics, migrate current images & copy | ~1.5–2 weeks |
| 2. CMS & content | Sanity schemas (product, collection, portfolio, testimonial, founder, season banner), editor training, new photos, new brochure                                           | ~1 week      |
| 3. Growth        | Corporate page + bulk quote flow, checkout for fixed-price hampers, newsletter, reviews, blog/gift guides                                                                 | ongoing      |
| Cutover          | Point domain to new host, 301 redirects, decommission S3 bucket + Amplify app                                                                                             | ½ day        |

Diwali timing: if Diwali 2026 orders matter, ship a standalone `/festive/diwali` page first
(within Phase 1, week 1) so it can start collecting enquiries immediately.

## 8. What we need from you

1. **Brand decision** — keep "Shaadi Drafts" or introduce a parent brand; logo files (SVG preferred).
2. **Original image assets** currently in S3 (or bucket access) — the repo has none.
3. **New photos** — rakhi, Diwali, custom and wedding work, ideally high-res with a one-line caption each.
4. **Existing brochure** PDF.
5. **Founder & CEO** — name, portrait, bio, a quote, LinkedIn/Instagram.
6. **Catalogue** — product/hamper names, contents, price ranges (or "on request"), MOQ, lead times.
7. **Domain & accounts** — domain registrar access, preferred host (Vercel vs Amplify), GA4 ID.
8. **Testimonials** and any corporate client logos you have permission to show.
9. Do you want online payments now, or enquiry/quote only for launch?
