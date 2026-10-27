import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/button";
import { Header } from "@/components/header";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { GalleryView, WorkGallery } from "@/components/work-gallery";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Wedding invitations, monograms, bridesmaid proposals, Rakhi sets, birthday gifts and Diwali hampers we've designed and made by hand.",
  alternates: { canonical: "/work" },
  openGraph: {
    url: "/work",
    images: [
      { url: "/work/bridesmaid-proposal-box.jpg", alt: "Will you be my bridesmaid proposal box" },
    ],
  },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="wrap pt-16 pb-24 md:pt-24 md:pb-32">
          <div data-reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">Our work</p>
              <h1 className="display mt-6 text-[3.4rem] sm:text-7xl">
                <span className="line-mask">
                  <span>Every box tells</span>
                </span>
                <span className="line-mask">
                  <span style={{ ["--line-delay" as string]: "140ms" }}>
                    <em className="text-olive">someone&apos;s story.</em>
                  </span>
                </span>
              </h1>
            </div>
            <p className="text-ink-soft max-w-md text-lg leading-relaxed lg:justify-self-end">
              Gifts and designs we&apos;ve made for brides, brothers, best friends, fathers and
              brands. Each one built around a person.
            </p>
          </div>
          <div className="mt-14">
            <Suspense fallback={<GalleryView filter="all" />}>
              <WorkGallery />
            </Suspense>
          </div>
        </section>

        <section className="wrap pb-24 md:pb-32">
          <div
            data-reveal
            className="bg-olive-deep text-paper flex flex-col items-start justify-between gap-8 rounded-[2rem] p-10 md:flex-row md:items-center md:p-14"
          >
            <h2 className="max-w-xl text-4xl leading-[1.05] md:text-5xl">
              Tell us who it&apos;s for.{" "}
              <em className="text-gold-soft">We&apos;ll draft the rest.</em>
            </h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/#enquire" variant="light" className="group">
                Start a gift{" "}
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl("Hi Shaadi Drafts! I'd like a custom gift made.")}
                variant="ghostLight"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
