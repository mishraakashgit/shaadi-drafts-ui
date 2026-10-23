import Image from "next/image";
import Link from "next/link";
import { ButtonLink, textLink } from "@/components/button";
import { DiwaliBar } from "@/components/diwali-bar";
import { EnquireSection } from "@/components/enquire-section";
import { Header } from "@/components/header";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { SectionHead } from "@/components/section-head";
import { DIWALI_DATE, hampers } from "@/content/diwali";
import { founder } from "@/content/founder";
import { occasions, process, services } from "@/content/occasions";
import { promises } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { work } from "@/content/work";
import { daysUntil } from "@/lib/dates";

// Re-render hourly so the Diwali countdown stays current.
export const revalidate = 3600;

export default function Home() {
  const days = daysUntil(DIWALI_DATE);

  return (
    <>
      {days > 0 && <DiwaliBar days={days} />}
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Occasions />
        <Studio />
        {days > 0 && <DiwaliFeature days={days} />}
        <RecentWork />
        <Process />
        <Founder />
        {testimonials.length > 0 && <Testimonials />}
        <EnquireSection />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="wrap grid items-center gap-14 pt-12 pb-20 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-20 lg:pb-28">
      <div data-reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="bg-gold inline-block h-px w-8" /> A gifting &amp; design studio
        </p>
        <h1 className="display mt-7 text-[3.4rem] sm:text-7xl xl:text-[5.6rem]">
          Gifts, drafted
          <br />
          with <em className="text-olive">meaning.</em>
        </h1>
        <p className="text-ink-soft mt-7 max-w-[30rem] text-lg leading-relaxed">
          Wedding gifting, invitations, festive hampers and custom keepsakes. Designed in-house,
          made by hand and delivered across India.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/#enquire" className="group">
            Start a gift{" "}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink href="/work" variant="outline">
            See our work
          </ButtonLink>
        </div>
        <ul className="text-ink-soft mt-12 grid gap-2.5 text-[0.88rem] sm:grid-cols-1">
          {promises.map((p) => (
            <li key={p} className="flex items-center gap-2.5">
              <CheckIcon className="text-olive size-4 shrink-0" /> {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Editorial mosaic of real work */}
      <div
        data-reveal
        style={{ ["--reveal-delay" as string]: "150ms" }}
        className="relative grid grid-cols-[1.35fr_1fr] gap-4"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
          <Image
            src="/work/bridesmaid-proposal-box.jpg"
            alt="Will you be my bridesmaid proposal box in a sage keepsake chest"
            fill
            priority
            sizes="(min-width: 1024px) 30vw, 55vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 pt-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/diwali/pichwai-gift-box.jpg"
              alt="Pichwai Diwali gift box with lotus Shubh Labh hangings"
              fill
              priority
              sizes="(min-width: 1024px) 22vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/diwali/ivory-rani-pink.jpg"
              alt="Ivory gift box with a rani pink Deepawali card"
              fill
              sizes="(min-width: 1024px) 22vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="bg-card/90 border-line absolute bottom-6 -left-3 max-w-[15rem] rounded-2xl border p-4 shadow-[0_20px_50px_-25px_rgb(22_26_17/0.45)] backdrop-blur sm:-left-8">
          <p className="eyebrow !text-[0.62rem]">Bridesmaid proposal</p>
          <p className="mt-1 font-serif text-xl leading-tight">
            &ldquo;Will you be my bridesmaid?&rdquo;
          </p>
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
    <section id="occasions" className="py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            eyebrow="What we make"
            title="One studio,"
            accent="every occasion."
            intro="Weddings are where we started and what we love most. Every piece is drafted for the people receiving it."
          />
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-4 md:grid-rows-2">
          {lead && <OccasionCard o={lead} large />}
          {rest.map((o, i) => (
            <OccasionCard key={o.slug} o={o} wide={i === rest.length - 1} delay={(i + 1) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OccasionCard({
  o,
  large = false,
  wide = false,
  delay = 0,
}: {
  o: (typeof occasions)[number];
  large?: boolean;
  wide?: boolean;
  delay?: number;
}) {
  return (
    <Link
      href={o.href}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={`group text-paper relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl p-7 md:p-9 ${
        large
          ? "min-h-[32rem] md:col-span-2 md:row-span-2 md:min-h-[44rem]"
          : wide
            ? "md:col-span-2"
            : ""
      }`}
    >
      <Image
        src={o.image}
        alt={o.alt}
        fill
        sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
        className="-z-10 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
      />
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-t ${large ? "from-night/95 via-night/65 to-night/35" : "from-night/90 via-night/40 via-45% to-transparent"}`}
      />
      <h3 className={large ? "text-5xl md:text-6xl" : "text-4xl"}>{o.title}</h3>
      <p className={`text-paper/80 mt-3 max-w-md leading-relaxed ${large ? "text-lg" : ""}`}>
        {o.summary}
      </p>
      {large && (
        <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
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

function Studio() {
  return (
    <section className="bg-paper-deep py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div data-reveal className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/diwali/organza-crate-detail.jpg"
              alt="Close-up of a gold organza wrapped crate pinned with a mirror-work flower"
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
          <LogoMark className="absolute -right-5 -bottom-8 size-28 drop-shadow-xl md:-right-10" />
        </div>
        <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <p className="eyebrow">The studio</p>
          <p className="mt-6 font-serif text-[2rem] leading-[1.2] md:text-[2.7rem]">
            We treat every gift like a wedding invitation: <em className="text-olive">drafted</em>,
            refined and finished by hand, until it could only have come from you.
          </p>
          <dl className="border-ink/15 mt-12 grid gap-8 border-t pt-8 sm:grid-cols-3">
            {[
              [
                "Designed by an architect",
                "Every card, tag, monogram and box is drawn in-house, with an eye for detail.",
              ],
              ["One or a thousand", "A single proposal box or bulk favours, with the same care."],
              ["Pan-India delivery", "Packed to travel, shipped wherever your people are."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="font-serif text-2xl">{t}</dt>
                <dd className="text-ink-soft mt-2 text-[0.92rem] leading-relaxed">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function DiwaliFeature({ days }: { days: number }) {
  const picks = ["deepawali-keepsake-box", "organza-crate", "blush-shubh-labh-bag"]
    .map((slug) => hampers.find((h) => h.slug === slug))
    .filter((h) => h !== undefined);
  return (
    <section className="bg-night text-paper relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c6a15b, transparent)" }}
      />
      <div className="wrap relative">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div data-reveal>
            <p className="eyebrow text-gold-soft">Diwali 2026 · 8 November</p>
            <h2 className="mt-5 text-5xl leading-[1] md:text-7xl">
              <span className="text-gold">{days}</span> {days === 1 ? "day" : "days"} to{" "}
              <em>Diwali.</em>
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
        <ul className="mt-14 grid gap-5 sm:grid-cols-3">
          {picks.map((h, i) => (
            <li key={h.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
              <Link href="/festive/diwali#collection" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={h.image}
                    alt={h.alt}
                    fill
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 font-serif text-2xl">{h.name}</p>
                <p className="text-paper/55 mt-1 text-sm">{h.tags.join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RecentWork() {
  const picks = ["bhai-box", "arnav-nayan-invite", "card-game-couples", "rakhi-best-brother"]
    .map((slug) => work.find((w) => w.slug === slug))
    .filter((w) => w !== undefined);
  return (
    <section className="py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead eyebrow="Recent work" title="Made for someone," accent="every time." />
          <Link href="/work" className={textLink}>
            View all work{" "}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {picks.map((w, i) => (
            <li key={w.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
              <Link href={`/work?c=${w.category}`} className="group block">
                <div className="bg-paper-deep relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={w.image}
                    alt={w.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow mt-5">{w.occasion}</p>
                <p className="mt-1.5 font-serif text-2xl leading-tight">{w.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="border-line border-t py-24 md:py-32">
      <div className="wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead
          eyebrow="How it works"
          title="From a conversation"
          accent="to a keepsake."
          intro="Book 3–6 weeks ahead for weddings. Festive and bulk orders, as early as you can."
        />
        <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {process.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="text-gold font-serif text-6xl leading-none italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="border-ink/15 mt-4 border-t pt-4 text-3xl">{step.title}</h3>
              <p className="text-ink-soft mt-2 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className="bg-paper-deep py-24 md:py-36">
      <div className="wrap grid items-start gap-16 md:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div data-reveal className="relative mx-auto w-full max-w-sm md:sticky md:top-32">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
            <Image
              src={founder.portrait}
              alt={`${founder.name}, ${founder.title} of Shaadi Drafts`}
              fill
              sizes="(min-width: 768px) 30vw, 80vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <div
            className="border-gold/50 pointer-events-none absolute -inset-3 rounded-t-full border"
            aria-hidden="true"
          />
          <div className="bg-card border-line absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-2xl border px-5 py-3 text-center shadow-[0_20px_40px_-24px_rgb(22_26_17/0.4)]">
            <p className="font-serif text-xl leading-tight">{founder.name}</p>
            <p className="text-ink-soft text-[0.78rem]">{founder.title} · Architect</p>
          </div>
        </div>

        <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="pt-4 md:pt-0">
          <p className="eyebrow">Meet the founder</p>
          <div className="mt-7 space-y-4 font-serif text-[1.9rem] leading-[1.18] md:text-[2.5rem]">
            {founder.intro.map((line) => (
              <p key={line.accent}>
                {line.before} <em className="text-olive">{line.accent}</em>
              </p>
            ))}
          </div>
          <div className="text-ink-soft border-ink/15 mt-10 max-w-xl space-y-5 border-t pt-8 text-[1.02rem] leading-relaxed">
            {founder.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="bg-gold h-px w-10" />
            <p className="font-serif text-2xl italic">{founder.name.split(" ")[0]}</p>
          </div>
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
