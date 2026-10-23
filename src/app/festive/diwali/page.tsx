import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, textLink } from "@/components/button";
import { EnquireSection } from "@/components/enquire-section";
import { HamperCard } from "@/components/hamper-card";
import { Header } from "@/components/header";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { SectionHead } from "@/components/section-head";
import { DIWALI_DATE, diwaliFaqs, gifts, hampers, personalisation } from "@/content/diwali";
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
    itemListElement: [...hampers, ...gifts].map((h, i) => ({
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
        <Gifts />
        <Personalise />
        <Corporate />
        <Faqs />
        <EnquireSection
          eyebrow="Order & enquire"
          title="Let's plan"
          accent="your Diwali gifting."
          intro="Tell us how many gifts, for whom and your budget. We'll suggest hampers, personalisation and delivery options."
          defaultOccasion="diwali"
        />
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
    <section className="bg-night text-paper relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 h-[40rem] w-[40rem] translate-x-1/4 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c6a15b, transparent)" }}
      />
      <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div data-reveal>
          {days > 0 && (
            <p className="border-paper/15 bg-paper/5 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[0.8rem] backdrop-blur">
              <span className="bg-gold size-1.5 animate-pulse rounded-full" />
              {days} {days === 1 ? "day" : "days"} to Diwali · Sunday, 8 November
            </p>
          )}
          <h1 className="display mt-8 text-[3.6rem] sm:text-7xl xl:text-[6rem]">
            Light up
            <br />
            <em className="text-gold">their Diwali.</em>
          </h1>
          <p className="text-paper/65 mt-7 max-w-md text-lg leading-relaxed">
            Hampers for family, friends and teams: made by hand, personalised to the last tag and
            delivered across India.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#collection" variant="gold" className="group">
              Shop the collection
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl("Hi Shaadi Drafts! I'd like to enquire about Diwali hampers.")}
              variant="ghostLight"
            >
              <WhatsAppIcon className="size-4" /> Order on WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "150ms" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-[78%] overflow-hidden rounded-t-full">
            <Image
              src="/diwali/pichwai-gift-box.jpg"
              alt="The Pichwai Gift Box with lotus Shubh Labh hangings"
              fill
              priority
              sizes="(min-width: 1024px) 34vw, 75vw"
              className="object-cover"
            />
          </div>
          <div className="border-gold/40 pointer-events-none absolute inset-y-[-12px] left-[calc(11%-12px)] w-[calc(78%+24px)] rounded-t-full border" />
          <div className="ring-night absolute bottom-10 left-0 w-[34%] overflow-hidden rounded-2xl shadow-2xl ring-4">
            <div className="relative aspect-square">
              <Image
                src="/diwali/emerald-candles.jpg"
                alt=""
                fill
                sizes="15vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="ring-night absolute top-16 right-0 w-[30%] overflow-hidden rounded-2xl shadow-2xl ring-4">
            <div className="relative aspect-[3/4]">
              <Image
                src="/diwali/blush-shubh-labh-bag.jpg"
                alt=""
                fill
                sizes="15vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Collection() {
  return (
    <section id="collection" className="py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead eyebrow="The collection" title="Hampers," accent="made to be remembered." />
          <p data-reveal className="text-ink-soft max-w-xs leading-relaxed">
            Every hamper can be customised, from contents to budget. Prices shared on request.
          </p>
        </div>
        <ul className="mt-16 grid gap-x-7 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {hampers.map((h, i) => (
            <HamperCard key={h.slug} hamper={h} priority={i < 3} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Gifts() {
  return (
    <section id="gifts" className="bg-paper-deep py-24 md:py-32">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Little gifts & favours"
            title="Small, but never"
            accent="an afterthought."
          />
          <p data-reveal className="text-ink-soft max-w-xs leading-relaxed">
            Order them on their own, in bulk for guests and teams, or add them to any hamper.
          </p>
        </div>
        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {gifts.map((g, i) => (
            <li
              key={g.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              className="group bg-card border-line grid grid-cols-[2fr_3fr] items-stretch overflow-hidden rounded-3xl border"
            >
              <div className="relative min-h-64 overflow-hidden">
                <Image
                  src={g.image}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 768px) 20vw, 40vw"
                  className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <ul className="flex flex-wrap gap-1.5">
                  {g.tags.map((t) => (
                    <li
                      key={t}
                      className="bg-paper-deep rounded-full px-3 py-1 text-[0.72rem] font-semibold"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-4 text-3xl">{g.name}</h3>
                <p className="text-ink-soft mt-2 leading-relaxed">{g.blurb}</p>
                <a
                  href={whatsappUrl(`Hi Shaadi Drafts! I'm interested in "${g.name}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textLink} mt-auto pt-6`}
                >
                  Enquire{" "}
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Personalise() {
  return (
    <section className="py-24 md:py-36">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2">
        <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/diwali/organza-crate-detail.jpg"
            alt="Detail of a gold organza wrap with a mirror-work flower and a pink Deepawali card"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHead
            eyebrow="Make it theirs"
            title="Personalised,"
            accent="to the last tag."
            intro="Names, monograms, logos and handwritten notes: the details that make a hamper feel chosen, not bought."
          />
          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {personalisation.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="border-ink/15 border-t pt-5"
              >
                <dt className="font-serif text-2xl">{p.title}</dt>
                <dd className="text-ink-soft mt-1.5 leading-relaxed">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Corporate() {
  return (
    <section className="wrap">
      <div
        data-reveal
        className="text-paper relative isolate overflow-hidden rounded-[2rem] px-8 py-16 sm:px-14 md:py-24"
      >
        <Image
          src="/diwali/lakshmi-charan-potlis.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="from-night/90 via-night/75 to-night/30 absolute inset-0 -z-10 bg-gradient-to-r" />
        <p className="eyebrow text-gold-soft">Corporate &amp; bulk</p>
        <h2 className="mt-5 max-w-2xl text-5xl leading-[1.02] md:text-6xl">
          Thanking a team or a client list?{" "}
          <em className="text-gold-soft">We&apos;ll brand it, pack it, ship it.</em>
        </h2>
        <p className="text-paper/75 mt-5 max-w-lg leading-relaxed">
          Your logo on the box, a message in every card, and delivery to one office or a hundred
          addresses.
        </p>
        <ButtonLink
          href={whatsappUrl("Hi Shaadi Drafts! I'd like a quote for corporate Diwali gifting.")}
          variant="light"
          className="mt-9"
        >
          Get a bulk quote
        </ButtonLink>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section className="py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="Good to know" title="Questions," accent="answered." />
        <div data-reveal className="border-ink/15 border-t">
          {diwaliFaqs.map((f) => (
            <details key={f.q} className="group border-ink/15 border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-serif text-2xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="border-ink/20 flex size-9 shrink-0 items-center justify-center rounded-full border font-sans text-lg transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-ink-soft -mt-2 max-w-xl pb-7 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
