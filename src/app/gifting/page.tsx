import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion } from "@/components/accordion";
import { textLink } from "@/components/button";
import { EnquireSection } from "@/components/enquire-section";
import { Header } from "@/components/header";
import { ArrowIcon } from "@/components/icons";
import { QuickViewTrigger } from "@/components/quick-view";
import { gifts, hampers } from "@/content/diwali";
import { guideFaqs, guideSections, type GuideSection } from "@/content/gifting-guide";
import { site } from "@/content/site";
import { work } from "@/content/work";
import { hamperView, type QuickViewItem, workView } from "@/lib/quick-view";

const title = "Wedding Gifts, Return Favours & Diwali Hampers";
const description =
  "Handmade wedding return gifts, bridesmaid proposal boxes, wedding invitations, Diwali hampers, corporate gifting and personalised gifts, designed in-house and delivered across India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gifting" },
  keywords: [
    "wedding return gifts",
    "wedding favours",
    "shagun envelopes",
    "bridesmaid proposal box",
    "groomsman gift box",
    "wedding invitations",
    "save the date",
    "Diwali hampers",
    "corporate Diwali gifts",
    "Rakhi gift box",
    "personalised gifts India",
  ],
  openGraph: {
    url: "/gifting",
    title: `${title} · ${site.name}`,
    description,
    images: [
      { url: "/work/beaded-potlis-envelopes.jpg", alt: "Hand-beaded potlis and shagun envelopes" },
    ],
  },
};

type Example = { image: string; alt: string; title: string; caption: string; view: QuickViewItem };

function resolve(e: GuideSection["examples"][number]): Example | null {
  if (e.kind === "work") {
    const w = work.find((x) => x.slug === e.slug);
    return w
      ? { image: w.image, alt: w.alt, title: w.title, caption: w.occasion, view: workView(w) }
      : null;
  }
  const h = (e.kind === "hamper" ? hampers : gifts).find((x) => x.slug === e.slug);
  return h
    ? {
        image: h.image,
        alt: h.alt,
        title: h.name,
        caption: h.tags.join(" · "),
        view: hamperView(h),
      }
    : null;
}

export default function GiftingPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guideFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Gifting", item: `${site.url}/gifting` },
    ],
  };
  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `What ${site.name} makes`,
    itemListElement: guideSections.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.body[0],
        areaServed: { "@type": "Country", name: "India" },
        provider: { "@type": "Organization", name: site.name, url: site.url },
        url: `${site.url}/gifting#${s.id}`,
      },
    })),
  };

  return (
    <>
      <Header />
      <main id="main">
        <section className="wrap pt-16 pb-12 md:pt-24 md:pb-16">
          <nav aria-label="Breadcrumb" className="text-ink-soft text-sm">
            <Link href="/" className="hover:text-ink underline-offset-4 hover:underline">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Gifting</span>
          </nav>
          <div data-reveal className="mt-8 max-w-3xl">
            <p className="eyebrow">Gifting guide</p>
            <h1 className="display mt-6 text-[2.6rem] sm:text-6xl">
              Wedding gifts, return favours <em className="text-olive">&amp; festive hampers.</em>
            </h1>
            <p className="text-ink-soft mt-6 max-w-2xl text-lg leading-relaxed">
              Shaadi Drafts is a gifting and design studio making wedding return gifts, bridesmaid
              proposal boxes, invitations, Diwali hampers, corporate gifts and personalised
              keepsakes. Everything is designed in-house, made by hand and delivered across India.
            </p>
          </div>

          {/* Jump links, also a tidy summary for search engines */}
          <ul className="mt-10 flex flex-wrap gap-2">
            {guideSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="border-ink/15 hover:border-ink/50 bg-card/60 inline-block rounded-full border px-4 py-2 text-[0.85rem] transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {guideSections.map((s, i) => {
          const examples = s.examples.map(resolve).filter((e): e is Example => e !== null);
          return (
            <section
              key={s.id}
              id={s.id}
              className={`py-16 md:py-24 ${i % 2 ? "bg-paper-deep" : "border-line border-t"}`}
            >
              <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div data-reveal>
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{s.title}</h2>
                  <div className="text-ink-soft mt-5 space-y-4 text-[1.02rem] leading-relaxed">
                    {s.body.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  <Link href={s.link.href} className={`${textLink} mt-6`}>
                    {s.link.label}{" "}
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <ul
                  className={`grid gap-4 ${examples.length > 2 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}
                >
                  {examples.map((e, k) => (
                    <li
                      key={e.title}
                      data-reveal
                      style={{ ["--reveal-delay" as string]: `${k * 80}ms` }}
                      className="group"
                    >
                      <QuickViewTrigger
                        item={e.view}
                        className="bg-paper-deep aspect-[4/5] overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={e.image}
                          alt={e.alt}
                          fill
                          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                          className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.04]"
                        />
                      </QuickViewTrigger>
                      <p className="eyebrow mt-3 !text-[0.6rem]">{e.caption}</p>
                      <h3 className="mt-1 text-xl leading-tight">{e.title}</h3>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        <section className="border-line border-t py-16 md:py-24">
          <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="eyebrow">Good to know</p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
                Gifting questions, <em className="text-olive">answered.</em>
              </h2>
            </div>
            <div data-reveal>
              <Accordion items={guideFaqs} />
            </div>
          </div>
        </section>

        <EnquireSection
          eyebrow="Start a gift"
          title="Tell us what"
          accent="you're celebrating."
          intro="Weddings, Diwali, Rakhi, a team or one special person: share a few details and we'll come back with ideas and a quote."
        />
      </main>
      {[faqLd, breadcrumbLd, servicesLd].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
    </>
  );
}
