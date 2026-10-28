# Shaadi Drafts

Website for Shaadi Drafts, a gifting studio for weddings, festivals, corporate and custom gifts.
Built with Next.js (App Router), TypeScript and Tailwind CSS. See [PLAN.md](./PLAN.md) for the roadmap.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm run dev                  # http://localhost:3000
```

| Script                                                 | What it does                        |
| ------------------------------------------------------ | ----------------------------------- |
| `npm run dev`                                          | Local dev server                    |
| `npm run build` / `npm start`                          | Production build and server         |
| `npm run lint` · `typecheck` · `test` · `format:check` | The same checks CI runs on every PR |

## Where things live

```
src/
  app/                  Routes: / and /festive/diwali, plus sitemap, robots, OG image
    actions.ts          Enquiry form server action (validation, rate limit, email)
  components/           UI: header, footer, enquiry form, line-art illustrations
  content/              Editable copy and data: site details, occasions, Diwali hampers, founder
  lib/                  Enquiry schema, WhatsApp links, date helpers (with tests)
legacy/index.html       The previous single-file site, kept for reference until cutover
```

### Updating content

- **Founder:** edit `src/content/founder.ts`. Add a portrait to `public/` and render it in the founder
  section of `src/app/page.tsx`.
- **Diwali hampers:** edit `src/content/diwali.ts`. Photos live in `public/diwali/` (portrait, 3:4);
  set each hamper's `image`, and optionally a `hoverImage` that fades in on hover.
- **Contact details:** `src/content/site.ts`.
- **Logo:** the badge is drawn in code (`src/components/logo.tsx`). Ready-made files for print and
  social are in `public/brand/` (`shaadi-drafts-logo.svg`, and a 1200px transparent PNG).

These files will move to a CMS (Sanity) in Phase 2.

## Enquiries

The form validates on the server, rate-limits per IP and, when `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and
`ENQUIRY_FROM_EMAIL` are set, emails the enquiry. Every successful submission also offers the visitor a
pre-filled WhatsApp message, so nothing is lost if email isn't configured yet.

## Brochure

The 12-page brochure is designed in `brochure/brochure.html` and printed to PDF with Chromium:

```bash
npm run brochure            # public/brochure/shaadi-drafts-brochure.pdf (screen, ~6 MB, linked from the site)
npm run brochure -- --print # brochure/out/shaadi-drafts-brochure-print.pdf (216 × 303 mm: A4 + 3 mm bleed)
```

It uses the photos in `public/` and the same fonts and colours as the site. Earlier editions are kept in
`brochure/archive/` (Edition 01: `shaadi-drafts-brochure-v1.pdf`). Set `CHROMIUM_PATH` if
Playwright's Chromium isn't installed.

### Diwali price list

A separate 14-page Diwali 2026 hamper price list (cover, price table, one page per hamper, back cover) is generated
from `brochure/diwali/hampers.mjs`, so prices and contents live in one place:

```bash
npm run brochure -- --diwali          # brochure/diwali/shaadi-drafts-diwali-2026.pdf (screen)
npm run brochure -- --diwali --print  # brochure/out/shaadi-drafts-diwali-2026-print.pdf (3 mm bleed)
```

## Analytics

Google Analytics 4 (`G-PF6XLJN7V0`) loads on production builds only; set `NEXT_PUBLIC_GA_ID` to use another
property. Besides page views, the site sends:

| Event                                     | When                                      |
| ----------------------------------------- | ----------------------------------------- |
| `generate_lead`                           | An enquiry form is submitted successfully |
| `contact` (`method: whatsapp` or `email`) | A WhatsApp or email link is clicked       |

In GA4, mark `generate_lead` (and optionally `contact`) as key events under Admin → Events.

## Deployment

Connect the repository to Vercel (or AWS Amplify Hosting, which supports Next.js) and set the variables
from `.env.example`. Pull requests get preview deployments; `main` deploys to production.
