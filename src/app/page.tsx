import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { ButtonLink } from "@/components/button";
import { DiwaliBar } from "@/components/diwali-bar";
import { EnquiryForm } from "@/components/enquiry-form";
import { Header } from "@/components/header";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { SectionHead } from "@/components/section-head";
import { DIWALI_DATE } from "@/content/diwali";
import { founder } from "@/content/founder";
import { occasions, process } from "@/content/occasions";
import { site } from "@/content/site";
import { daysUntil } from "@/lib/dates";
import { whatsappUrl } from "@/lib/whatsapp";

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
        <Occasions />
        {days > 0 && <DiwaliFeature days={days} />}
        <Process />
        <Founder />
        <Enquire />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="wrap grid items-center gap-14 pt-14 pb-20 md:grid-cols-[1.15fr_1fr] md:pt-24 md:pb-28">
      <div className="animate-rise">
        <p className="eyebrow">A gifting studio · weddings first</p>
        <h1 className="mt-6 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl">
          Gifts, drafted
          <span className="script text-olive block text-[1.15em] leading-[1.1]">with meaning.</span>
        </h1>
        <p className="text-ink-soft mt-7 max-w-md text-lg leading-relaxed">
          Wedding gifting, festive hampers and custom keepsakes, designed in-house, made by hand and
          delivered across India.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#occasions">Explore gifting</ButtonLink>
          <ButtonLink
            href={whatsappUrl("Hi Shaadi Drafts! I'd like to enquire about a gift.")}
            variant="outline"
          >
            <WhatsAppIcon className="size-4" /> Chat with us
          </ButtonLink>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm md:max-w-md" aria-hidden="true">
        <div className="bg-sage-light/60 aspect-[4/5] rounded-t-full" />
        <div className="border-ink/20 absolute inset-4 rounded-t-full border" />
        <Artwork name="gift" className="text-ink absolute inset-x-0 top-[30%] mx-auto w-1/2" />
        <Artwork
          name="rings"
          className="text-olive absolute -top-2 -left-6 w-24 rotate-[-10deg] md:-left-10"
        />
        <Artwork
          name="diya"
          animated
          className="text-olive absolute -right-4 bottom-10 w-24 md:-right-10"
        />
        <p className="script text-olive absolute inset-x-0 bottom-8 text-center text-3xl">
          for the ones you love
        </p>
      </div>
    </section>
  );
}

function Occasions() {
  const [lead, ...rest] = occasions;
  return (
    <section id="occasions" className="border-line border-t py-24 md:py-32">
      <div className="wrap">
        <SectionHead eyebrow="What we make" title="One studio," script="every occasion." />
        <div className="mt-14 grid gap-5 md:grid-cols-3 md:grid-rows-3">
          {lead && (
            <article className="bg-sage-light/45 relative flex flex-col justify-between overflow-hidden rounded-sm p-8 md:col-span-2 md:row-span-3 md:p-12">
              <div className="max-w-md">
                <p className="script text-olive text-3xl">{lead.script}</p>
                <h3 className="mt-1 text-4xl md:text-5xl">{lead.title}</h3>
                <p className="text-ink-soft mt-5 text-lg leading-relaxed">{lead.summary}</p>
              </div>
              <ul className="mt-10 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {lead.items.map((item) => (
                  <li key={item} className="border-ink/15 border-b pb-2.5">
                    {item}
                  </li>
                ))}
              </ul>
              <Artwork
                name={lead.art}
                className="text-ink/70 pointer-events-none absolute -top-4 -right-6 hidden w-56 md:block"
              />
            </article>
          )}
          {rest.map((o) => {
            const body = (
              <>
                <Artwork name={o.art} className="text-ink size-14" />
                <p className="script text-olive mt-5 text-2xl">{o.script}</p>
                <h3 className="text-2xl">{o.title}</h3>
                <p className="text-ink-soft mt-2 leading-relaxed">{o.summary}</p>
                {o.href && (
                  <span className="text-ink mt-4 inline-flex items-center gap-2 text-sm font-medium">
                    See the collection
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </>
            );
            return o.href ? (
              <Link
                key={o.slug}
                href={o.href}
                className="group bg-card border-line hover:border-ink/40 rounded-sm border p-8 transition-colors"
              >
                {body}
              </Link>
            ) : (
              <article key={o.slug} className="bg-card border-line rounded-sm border p-8">
                {body}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DiwaliFeature({ days }: { days: number }) {
  return (
    <section className="bg-night text-paper relative overflow-hidden py-24 md:py-32">
      <div className="wrap relative grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow text-gold">Festive · Diwali 2026</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            Diwali is{" "}
            <span className="text-gold">
              {days} {days === 1 ? "day" : "days"}
            </span>{" "}
            away.
          </h2>
          <p className="text-paper/70 mt-5 max-w-md text-lg leading-relaxed">
            Pichwai-inspired hampers, Shubh Labh hangings and potlis for family, friends and teams,
            personalised with names, monograms or your brand.
          </p>
          <ButtonLink href="/festive/diwali" variant="gold" className="mt-9">
            Explore the collection <ArrowIcon className="size-4" />
          </ButtonLink>
        </div>
        <Link href="/festive/diwali" className="group relative mx-auto w-full max-w-xs md:max-w-sm">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
            <Image
              src="/diwali/pichwai-gift-box.jpg"
              alt="The Pichwai Gift Box: a clear gold-framed box with lotus Shubh Labh hangings"
              fill
              sizes="(min-width: 768px) 24rem, 20rem"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="border-gold/40 pointer-events-none absolute -inset-3 rounded-t-full border" />
        </Link>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead eyebrow="How it works" title="From a conversation" script="to a keepsake." />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title} className="border-ink/20 border-t pt-6">
              <span className="font-display text-gold text-sm tracking-[0.2em]">0{i + 1}</span>
              <h3 className="mt-3 text-2xl">{step.title}</h3>
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
    <section id="founder" className="bg-paper-deep py-24 md:py-32">
      <div className="wrap grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
          <div className="bg-sage-light/70 flex aspect-[4/5] items-center justify-center rounded-t-full">
            {/* Swap for <Image> once the portrait arrives. */}
            <span className="script text-olive text-8xl" aria-hidden="true">
              {founder.initials}
            </span>
          </div>
          <div
            className="border-ink/20 pointer-events-none absolute -inset-3 rounded-t-full border"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="eyebrow">Meet our founder</p>
          <h2 className="mt-4 text-4xl md:text-5xl">{founder.name}</h2>
          <p className="text-ink-soft font-display mt-2 text-sm tracking-[0.2em] uppercase">
            {founder.title}
          </p>
          <blockquote className="mt-8 text-2xl leading-snug md:text-3xl">
            <span className="script text-gold mr-1 text-5xl leading-none">“</span>
            {founder.quote}
          </blockquote>
          <div className="text-ink-soft mt-6 space-y-4 leading-relaxed">
            {founder.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Enquire() {
  return (
    <section id="enquire" className="py-24 md:py-32">
      <div className="wrap grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead eyebrow="Enquire" title="Tell us who" script="you're gifting." />
          <p className="text-ink-soft mt-6 max-w-sm leading-relaxed">
            Share a few details and we&apos;ll come back with ideas, options and a quote. Prefer to
            chat?
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <a
                href={whatsappUrl("Hi Shaadi Drafts!")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive inline-flex items-center gap-3 transition-colors"
              >
                <WhatsAppIcon className="size-5" /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-olive transition-colors">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
