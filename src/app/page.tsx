import Image from "next/image";
import Link from "next/link";
import { ButtonLink, textLink } from "@/components/button";
import { DaysToDiwali, DaysUnit } from "@/components/days-to-diwali";
import { DiwaliBar } from "@/components/diwali-bar";
import { EnquireSection } from "@/components/enquire-section";
import { Header } from "@/components/header";
import { ArrowIcon, InstagramIcon } from "@/components/icons";
import { CardSlides } from "@/components/card-slides";
import { Carousel } from "@/components/carousel";
import { HeroShowcase } from "@/components/hero-showcase";
import { QuickViewTrigger } from "@/components/quick-view";
import { SectionHead } from "@/components/section-head";
import { FestiveBackground } from "@/components/festive-background";
import { DiwaliNight } from "@/components/diwali-night";
import { DIWALI_DATE, gifts, hampers } from "@/content/diwali";
import { founder } from "@/content/founder";
import { occasions, services } from "@/content/occasions";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { work } from "@/content/work";
import { daysUntil } from "@/lib/dates";
import { hamperView, workView } from "@/lib/quick-view";

export default function Home() {
  const days = daysUntil(DIWALI_DATE);

  return (
    <>
      {days > 0 && <DiwaliBar days={days} />}
      <Header />
      <main id="main">
        {/* The festive scene stays pinned behind everything from the hero down to the founder */}
        <div className="relative isolate">
          {/* overflow-clip (not hidden) keeps the canvas inside this block without breaking sticky */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-clip"
          >
            <div className="sticky top-0 h-[100svh]">
              <FestiveBackground />
            </div>
          </div>
          <Hero />
          <Marquee />
          <Occasions />
          {days > 0 && <DiwaliFeature days={days} />}
          <RecentWork />
        </div>
        <Founder />
        {testimonials.length > 0 && <Testimonials />}
        <EnquireSection />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Keeps the headline side calm over the moving silk */}
      <div
        aria-hidden="true"
        className="from-paper/60 via-paper/15 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
      />
      <div className="wrap grid items-center gap-14 pt-12 pb-20 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-20 lg:pb-28">
        <div data-reveal data-calm>
          <p className="eyebrow flex items-center gap-3">
            <span className="bg-gold inline-block h-px w-8" /> A gifting &amp; design studio
          </p>
          <h1 className="display mt-7 text-[3.4rem] sm:text-7xl xl:text-[5.6rem]">
            <span className="line-mask">
              <span>Gifts, drafted</span>
            </span>
            <span className="line-mask">
              <span style={{ ["--line-delay" as string]: "140ms" }}>
                with <em className="shimmer-text">meaning.</em>
              </span>
            </span>
          </h1>
          <p className="text-ink-soft mt-7 max-w-[30rem] text-lg leading-relaxed">
            Wedding gifting, invitations, festive hampers and custom keepsakes. Designed in-house,
            made by hand and delivered across India.
          </p>
        </div>

        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "150ms" }}
          className="pt-4 pb-6 lg:pt-0"
        >
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...services, ...services];
  return (
    <div className="bg-olive-deep text-paper/85 overflow-hidden py-5" aria-label="What we make">
      <ul className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((s, i) => (
          <li
            key={i}
            className="flex items-center gap-10 font-serif text-2xl italic"
            aria-hidden={i >= services.length}
          >
            {s}
            <span className="text-gold text-sm not-italic">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Occasions() {
  const [lead, ...rest] = occasions;
  return (
    <section id="occasions" className="py-20 md:py-36">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            eyebrow="What we make"
            title="One studio,"
            accent="every occasion."
            intro="Weddings are where we started and what we love most. Every piece is drafted for the people receiving it."
          />
        </div>

        <div className="mt-12 md:mt-16">
          <Carousel
            label="What we make"
            grid="md:grid-cols-4 md:grid-rows-2 md:gap-5"
            spans={["md:col-span-2 md:row-span-2", "", "", "md:col-span-2"]}
          >
            {lead && <OccasionCard o={lead} large />}
            {rest.map((o, i) => (
              <OccasionCard key={o.slug} o={o} delay={(i + 1) * 90} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function OccasionCard({
  o,
  large = false,
  delay = 0,
}: {
  o: (typeof occasions)[number];
  large?: boolean;
  delay?: number;
}) {
  return (
    <Link
      href={o.href}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={`group text-paper relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl p-7 md:min-h-[21rem] md:p-9 ${
        large ? "md:min-h-[44rem]" : ""
      }`}
    >
      {o.slides ? (
        <CardSlides
          slides={o.slides}
          sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
        />
      ) : (
        <Image
          src={o.image}
          alt={o.alt}
          fill
          sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
          className="-z-10 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
      )}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-t ${large ? "from-night/95 via-night/65 to-night/35" : "from-night/90 via-night/40 via-45% to-transparent"}`}
      />
      <h3 className={large ? "text-4xl md:text-6xl" : "text-4xl"}>{o.title}</h3>
      <p className={`text-paper/80 mt-3 max-w-md leading-relaxed ${large ? "md:text-lg" : ""}`}>
        {o.summary}
      </p>
      {large && (
        <ul className="mt-6 hidden flex-wrap gap-2 md:flex">
          {o.items.map((item) => (
            <li
              key={item}
              className="border-paper/25 rounded-full border px-3.5 py-1.5 text-[0.8rem] backdrop-blur-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-6 inline-flex items-center gap-2 text-[0.88rem] font-semibold">
        {o.cta}
        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function DiwaliFeature({ days }: { days: number }) {
  // Every hamper, then the little gifts
  const picks = [
    ...hampers.map((h) => ({ ...h, href: "/festive/diwali#collection" })),
    ...gifts.map((g) => ({ ...g, href: "/festive/diwali#gifts" })),
  ];
  return (
    <section className="bg-night text-paper relative isolate overflow-hidden py-20 md:py-32">
      <DiwaliNight />
      <div className="wrap relative">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div data-reveal>
            <p className="eyebrow text-gold-soft">Diwali 2026 · 8 November</p>
            <h2 className="mt-5 text-5xl leading-[1] md:text-7xl">
              <span className="text-gold">
                <DaysToDiwali initial={days} unit={false} />
              </span>{" "}
              <DaysUnit initial={days} /> to <em>Diwali.</em>
            </h2>
            <p className="text-paper/65 mt-5 max-w-md text-lg leading-relaxed">
              Pichwai-inspired hampers, Shubh Labh hangings and potlis for family, friends and
              teams.
            </p>
          </div>
          <ButtonLink href="/festive/diwali" variant="gold" className="group shrink-0">
            Shop the collection{" "}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>
        <div className="mt-12 md:mt-14">
          <Carousel label="Diwali hampers" grid="" tone="light" effect="cards" desktop="carousel">
            {picks.map((h, i) => (
              <div
                key={h.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${Math.min(i, 3) * 100}ms` }}
              >
                <div className="group">
                  <QuickViewTrigger
                    item={hamperView(h)}
                    className="aspect-[4/5] overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={h.image}
                      alt={h.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 80vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                    />
                  </QuickViewTrigger>
                  <Link href={h.href} className="mt-4 block font-serif text-2xl hover:underline">
                    {h.name}
                  </Link>
                  <p className="text-paper/55 mt-1 text-sm">{h.tags.join(" · ")}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function RecentWork() {
  const picks = ["bhai-box", "arnav-nayan-invite", "card-game-couples", "rakhi-best-brother"]
    .map((slug) => work.find((w) => w.slug === slug))
    .filter((w) => w !== undefined);
  return (
    <section className="py-20 md:py-36">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead eyebrow="Recent work" title="Made for someone," accent="every time." />
          <div data-reveal className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/work" className={textLink}>
              View all work{" "}
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <ButtonLink href={site.social.instagram} variant="outline" className="!py-2.5">
              <InstagramIcon className="size-4" /> Follow on Instagram
            </ButtonLink>
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <Carousel label="Recent work" grid="md:grid-cols-4 md:gap-5" effect="cards">
            {picks.map((w, i) => (
              <div key={w.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <div className="group">
                  <QuickViewTrigger
                    item={workView(w)}
                    className="bg-paper-deep aspect-[4/5] overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={w.image}
                      alt={w.alt}
                      fill
                      sizes="(min-width: 768px) 24vw, 72vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                    />
                  </QuickViewTrigger>
                  <p className="eyebrow mt-5">{w.occasion}</p>
                  <Link
                    href={`/work?c=${w.category}`}
                    className="mt-1.5 block font-serif text-2xl leading-tight hover:underline"
                  >
                    {w.title}
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section
      id="founder"
      className="bg-olive-deep text-paper relative overflow-hidden py-20 md:py-28"
    >
      <div className="wrap grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        <div data-reveal className="relative mx-auto w-44 md:w-64">
          <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden rounded-t-full">
            <Image
              src={founder.portrait}
              alt={`${founder.name}, ${founder.title} of Shaadi Drafts`}
              fill
              sizes="(min-width: 768px) 16rem, 11rem"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <div
            className="border-gold/50 pointer-events-none absolute -inset-2.5 rounded-t-full border"
            aria-hidden="true"
          />
        </div>

        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="text-center md:text-left"
        >
          <p className="eyebrow text-gold-soft">Meet the founder</p>
          <blockquote className="mt-5 font-serif text-[2rem] leading-[1.12] md:text-5xl">
            &ldquo;{founder.quote}&rdquo;
          </blockquote>
          <p className="text-paper/70 mx-auto mt-5 max-w-xl leading-relaxed md:mx-0">
            {founder.bio}
          </p>
          <p className="mt-6">
            <span className="font-serif text-2xl italic">{founder.name}</span>
            <span className="text-paper/60 block text-[0.85rem] md:ml-3 md:inline">
              {founder.title} · Architect
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="Kind words"
          title="From the people"
          accent="we've gifted."
          align="center"
        />
        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} data-reveal className="bg-card border-line rounded-3xl border p-8">
              <p className="font-serif text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-6 text-sm font-semibold">{t.name}</p>
              <p className="text-ink-soft text-sm">{t.context}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
