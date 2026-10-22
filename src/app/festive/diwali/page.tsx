import type { Metadata } from "next";
import { Artwork } from "@/components/artwork";
import { ButtonLink } from "@/components/button";
import { EnquiryForm } from "@/components/enquiry-form";
import { HamperCard } from "@/components/hamper-card";
import { Header } from "@/components/header";
import { WhatsAppIcon } from "@/components/icons";
import { SectionHead } from "@/components/section-head";
import { DIWALI_DATE, diwaliFaqs, hampers, personalisation } from "@/content/diwali";
import { site } from "@/content/site";
import { daysUntil } from "@/lib/dates";
import { whatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Diwali Gift Hampers 2026",
  description:
    "Pichwai-inspired Diwali hampers, Shubh Labh hangings and potlis for family, friends and teams, personalised and delivered across India.",
  alternates: { canonical: "/festive/diwali" },
  openGraph: {
    url: "/festive/diwali",
    images: [{ url: "/diwali/pichwai-gift-box.jpg", alt: "The Pichwai Gift Box" }],
  },
};

export default function DiwaliPage() {
  const days = daysUntil(DIWALI_DATE);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diwali gift hampers",
    itemListElement: hampers.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: h.name,
        description: h.blurb,
        image: `${site.url}${h.image}`,
        brand: { "@type": "Brand", name: site.name },
      },
    })),
  };

  return (
    <>
      <Header tone="light" />
      <main id="main">
        <Hero days={days} />
        <Collection />
        <Personalise />
        <Corporate />
        <Faqs />
        <section id="enquire" className="py-24 md:py-32">
          <div className="wrap grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHead
                eyebrow="Order & enquire"
                title="Let's plan"
                script="your Diwali gifting."
              />
              <p className="text-ink-soft mt-6 max-w-sm leading-relaxed">
                Tell us how many gifts, for whom and your budget. We&apos;ll suggest hampers,
                personalisation and delivery options.
              </p>
            </div>
            <EnquiryForm defaultOccasion="diwali" />
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}

function Hero({ days }: { days: number }) {
  return (
    <section className="bg-night text-paper relative overflow-hidden pt-36 pb-16 md:pt-44">
      {/* A quiet field of stars */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 22%, #ead7a4, transparent), radial-gradient(1px 1px at 78% 14%, #ead7a4, transparent), radial-gradient(1.5px 1.5px at 62% 38%, #d9b96b, transparent), radial-gradient(1px 1px at 32% 8%, #ead7a4, transparent), radial-gradient(1px 1px at 90% 44%, #ead7a4, transparent), radial-gradient(1.5px 1.5px at 22% 48%, #d9b96b, transparent), radial-gradient(1px 1px at 48% 18%, #ead7a4, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 100%, rgb(217 185 107 / 0.18), transparent 70%)",
        }}
      />

      <div className="wrap relative text-center">
        {days > 0 && (
          <p className="border-gold/40 text-gold-soft inline-block rounded-full border px-4 py-1.5 text-xs tracking-[0.2em] uppercase">
            {days} {days === 1 ? "day" : "days"} to Diwali · 8 November
          </p>
        )}
        <h1 className="animate-rise mx-auto mt-8 max-w-3xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
          Light up
          <span className="script text-gold block text-[1.2em] leading-[1.1]">their Diwali.</span>
        </h1>
        <p className="text-paper/70 mx-auto mt-6 max-w-lg text-lg leading-relaxed">
          Hampers for family, friends and teams, made by hand, personalised to the last tag and
          delivered across India.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="#collection" variant="gold">
            View hampers
          </ButtonLink>
          <ButtonLink
            href={whatsappUrl("Hi Shaadi Drafts! I'd like to enquire about Diwali hampers.")}
            variant="ghostLight"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp us
          </ButtonLink>
        </div>

        <div
          className="mx-auto mt-20 flex max-w-3xl items-end justify-center gap-1 sm:gap-3"
          aria-hidden="true"
        >
          {[0.55, 0.7, 0.85, 1, 0.85, 0.7, 0.55].map((s, i) => (
            <Artwork
              key={i}
              name="diya"
              animated
              className={`text-gold-soft w-16 sm:w-24 ${i === 0 || i === 6 ? "hidden sm:block" : ""}`}
              style={{
                transform: `scale(${s})`,
                transformOrigin: "bottom",
                ["--flicker-delay" as string]: `${i * 0.29}s`,
              }}
            />
          ))}
        </div>
        <div className="via-gold/50 mx-auto h-px max-w-3xl bg-linear-to-r from-transparent to-transparent" />
      </div>
    </section>
  );
}

function Collection() {
  return (
    <section id="collection" className="py-24 md:py-32">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="The collection" title="Hampers," script="made to be remembered." />
          <p className="text-ink-soft max-w-xs leading-relaxed">
            Every hamper can be customised, from contents to budget. Prices on request.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {hampers.map((h, i) => (
            <HamperCard key={h.slug} hamper={h} priority={i < 3} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Personalise() {
  return (
    <section className="bg-paper-deep py-24 md:py-32">
      <div className="wrap grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative">
          <SectionHead eyebrow="Make it theirs" title="Personalised," script="to the last tag." />
          <Artwork name="rangoli" className="text-sage mt-10 hidden w-48 md:block" />
        </div>
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {personalisation.map((p, i) => (
            <div key={p.title} className="border-ink/20 border-t pt-5">
              <span className="font-display text-gold text-sm tracking-[0.2em]">0{i + 1}</span>
              <dt className="font-display mt-2 text-xl">{p.title}</dt>
              <dd className="text-ink-soft mt-1.5 leading-relaxed">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Corporate() {
  return (
    <section className="bg-olive-deep text-paper">
      <div className="wrap flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <div className="flex items-center gap-6">
          <Artwork name="gift" className="text-gold-soft hidden w-24 shrink-0 sm:block" />
          <div>
            <p className="script text-gold text-3xl">corporate gifting</p>
            <h2 className="mt-1 max-w-xl text-3xl leading-tight md:text-4xl">
              Thanking a team or a client list? We&apos;ll brand it, pack it and ship it.
            </h2>
          </div>
        </div>
        <ButtonLink
          href={whatsappUrl("Hi Shaadi Drafts! I'd like a quote for corporate Diwali gifting.")}
          variant="gold"
          className="shrink-0"
        >
          Get a bulk quote
        </ButtonLink>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section className="border-line border-b py-24 md:py-32">
      <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="Good to know" title="Questions," script="answered." />
        <div className="border-ink/20 border-t">
          {diwaliFaqs.map((f) => (
            <details key={f.q} className="group border-ink/20 border-b">
              <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-gold text-2xl leading-none transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-ink-soft -mt-2 pb-6 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
