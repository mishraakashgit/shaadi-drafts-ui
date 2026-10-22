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
- **Diwali hampers:** edit `src/content/diwali.ts`. Put product photos in `public/diwali/` and set each
  hamper's `image` (e.g. `/diwali/diya-box.jpg`); cards switch from illustrations to photos automatically.
- **Contact details:** `src/content/site.ts`.

These files will move to a CMS (Sanity) in Phase 2.

## Enquiries

The form validates on the server, rate-limits per IP and, when `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and
`ENQUIRY_FROM_EMAIL` are set, emails the enquiry. Every successful submission also offers the visitor a
pre-filled WhatsApp message, so nothing is lost if email isn't configured yet.

## Deployment

Connect the repository to Vercel (or AWS Amplify Hosting, which supports Next.js) and set the variables
from `.env.example`. Pull requests get preview deployments; `main` deploys to production.
