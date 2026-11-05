import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion } from "@/components/accordion";
import { buttonClass } from "@/components/button";
import { Carousel } from "@/components/carousel";
import { EnquireSection } from "@/components/enquire-section";
import { Header } from "@/components/header";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { OfferPrice, OrderLink } from "@/components/launch-offer";
import { QuickViewTrigger } from "@/components/quick-view";
import { SectionHead } from "@/components/section-head";
import { dulheRaja, offerActive } from "@/content/dulhe-raja";
import { site } from "@/content/site";
import { dulheRajaView } from "@/lib/quick-view";

// Re-render hourly so the price and structured data drop the offer when November ends.
export const revalidate = 3600;

const title = "Dulhe Raja Quiz: A Surprise Gift for the Groom";
const description =
  "A personalised, clickable quiz from the bride to her groom: cheeky Hinglish questions, your photos and a love note at the end. ₹499 instead of ₹999 all November.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: dulheRaja.href },
  keywords: [
    "gift for groom from bride",
    "surprise for to be husband",
    "personalised quiz for fiance",
    "groom gift idea",
    "digital wedding surprise",
    "dulha gift",
  ],
  openGraph: {
    url: dulheRaja.href,
    title: `${title} · ${site.name}`,
    description,
    images: [{ url: dulheRaja.pages[0].image, alt: dulheRaja.pages[0].alt }],
  },
};

export default function DulheRajaPage() {
  const active = offerActive();
  const view = dulheRajaView();
  const [cover, , , wrong, , , , love] = dulheRaja.pages;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: dulheRaja.name,
    description: dulheRaja.blurb,
    image: dulheRaja.pages.map((p) => `${site.url}${p.image}`),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: active ? dulheRaja.offerPrice : dulheRaja.price,
      ...(active ? { priceValidUntil: "2026-11-30" } : {}),
      availability: "https://schema.org/InStock",
      url: `${site.url}${dulheRaja.href}`,
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dulheRaja.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Header tone="light" />
      <main id="main">
        {/* Hero */}
        <section className="bg-crimson relative isolate overflow-hidden pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <Hearts />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div data-reveal>
              <p className="eyebrow text-gold-soft">New · For the groom-to-be</p>
              <h1 className="display mt-6 text-[3.2rem] sm:text-7xl xl:text-[5.4rem]">
                <span className="line-mask">
                  <span>Dulhe Raja,</span>
                </span>
                <span className="line-mask">
                  <span style={{ ["--line-delay" as string]: "140ms" }}>
                    <em className="text-gold-soft">reporting for duty!</em>
                  </span>
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                {dulheRaja.blurb}
              </p>
              <div className="mt-8">
                <OfferPrice initial={active} size="lg" />
                {active && (
                  <p className="mt-3 text-sm text-white/65">
                    Launch offer, until 30 November 2026.
                  </p>
                )}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <OrderLink initial={active} className={`${buttonClass("light")} group`}>
                  <WhatsAppIcon className="size-4" /> Order on WhatsApp
                </OrderLink>
                <a href="#pages" className={buttonClass("ghostLight")}>
                  Flip through it
                </a>
              </div>
            </div>

            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "150ms" }}
              className="relative mx-auto w-full max-w-xl pb-16 sm:pb-20"
            >
              <QuickViewTrigger
                item={view}
                className="overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/90"
              >
                <Image
                  src={cover.image}
                  alt={cover.alt}
                  width={1920}
                  height={1079}
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-auto w-full"
                />
              </QuickViewTrigger>
              <div className="absolute right-[-4%] bottom-0 w-[46%] rotate-[4deg] overflow-hidden rounded-xl shadow-2xl ring-4 ring-white/90">
                <Image
                  src={love.image}
                  alt=""
                  width={1920}
                  height={1079}
                  sizes="(min-width: 1024px) 18vw, 42vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute bottom-6 left-[-3%] w-[40%] -rotate-[5deg] overflow-hidden rounded-xl shadow-2xl ring-4 ring-white/90">
                <Image
                  src={wrong.image}
                  alt=""
                  width={1920}
                  height={1079}
                  sizes="(min-width: 1024px) 16vw, 38vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Every page */}
        <section id="pages" className="py-20 md:py-32">
          <div className="wrap">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHead
                eyebrow="Inside the test"
                title="Eight pages,"
                accent="one very nervous dulha."
                intro="He clicks an answer and the page reacts: wrong answers send him back to try again, and the right ones lead to your note at the end. This sample shows how it plays; yours is written around your story."
              />
            </div>
            <div className="mt-12 md:mt-16">
              <Carousel
                label="Pages of the Dulhe Raja quiz"
                grid="md:grid-cols-2 md:gap-x-6 md:gap-y-10"
                slide="w-[88%] sm:w-[70%]"
              >
                {dulheRaja.pages.map((p, i) => (
                  <figure
                    key={p.image}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}
                    className="group"
                  >
                    <QuickViewTrigger
                      item={{
                        ...view,
                        images: [...view.images.slice(i), ...view.images.slice(0, i)],
                      }}
                      className="border-line overflow-hidden rounded-2xl border"
                    >
                      <Image
                        src={p.image}
                        alt={p.alt}
                        width={1920}
                        height={1079}
                        sizes="(min-width: 768px) 45vw, 85vw"
                        className="h-auto w-full transition-transform duration-[1.1s] group-hover:scale-[1.02]"
                      />
                    </QuickViewTrigger>
                    <figcaption className="mt-3 flex items-baseline gap-3">
                      <span className="text-ink-soft font-serif text-lg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.95rem] font-semibold">{p.caption}</span>
                    </figcaption>
                  </figure>
                ))}
              </Carousel>
            </div>
          </div>
        </section>

        {/* How it works + what you get */}
        <section className="bg-paper-deep py-20 md:py-32">
          <div className="wrap grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow="How it works" title="Three steps," accent="one big grin." />
              <ol className="mt-10 space-y-8">
                {dulheRaja.steps.map((s, i) => (
                  <li
                    key={s.title}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                    className="border-ink/15 grid grid-cols-[auto_1fr] gap-5 border-t pt-6"
                  >
                    <span className="text-crimson font-serif text-4xl leading-none">{i + 1}</span>
                    <div>
                      <h3 className="text-2xl">{s.title}</h3>
                      <p className="text-ink-soft mt-1.5 leading-relaxed">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div
              data-reveal
              className="bg-card border-line self-start rounded-3xl border p-7 sm:p-10"
            >
              <p className="eyebrow">What you get</p>
              <ul className="border-line mt-5 border-t">
                {dulheRaja.inside.map((x) => (
                  <li
                    key={x}
                    className="border-line before:bg-crimson flex items-center gap-3 border-b py-3 text-[0.95rem] before:size-1.5 before:shrink-0 before:rounded-full before:content-['']"
                  >
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <OfferPrice initial={active} tone="ink" />
              </div>
              <OrderLink
                initial={active}
                className={`${buttonClass("solid")} mt-7 w-full sm:w-fit`}
              >
                <WhatsAppIcon className="size-4" /> Order on WhatsApp
              </OrderLink>
              <p className="text-ink-soft mt-5 text-sm">
                Want something to hold too? Pair it with a{" "}
                <Link href="/work?c=wedding" className="text-ink underline underline-offset-4">
                  groom or proposal box
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 md:py-32">
          <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Good to know" title="Questions," accent="answered." />
            <div data-reveal>
              <Accordion items={[...dulheRaja.faqs]} />
              <Link
                href="/gifting"
                className="text-ink-soft hover:text-ink mt-8 inline-flex items-center gap-2 text-sm"
              >
                More wedding gift ideas <ArrowIcon className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <EnquireSection
          eyebrow="Order yours"
          title="Ready to test"
          accent="your dulha?"
          intro="Tell us your names, your wedding date and a joke or two only he'd get. We'll take it from there. Prefer to talk?"
        />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}

/** Soft heart pattern echoing the quiz pages. */
function Hearts() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.11]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath fill='%23ffd0dc' d='M16 22c-3-5-11-4-11 3 0 5 6 9 11 13 5-4 11-8 11-13 0-7-8-8-11-3zM48 54c-2-3-7-2.5-7 2 0 3 4 5.5 7 8 3-2.5 7-5 7-8 0-4.5-5-5-7-2z'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
