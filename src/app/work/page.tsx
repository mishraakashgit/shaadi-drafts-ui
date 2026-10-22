import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/button";
import { Header } from "@/components/header";
import { WhatsAppIcon } from "@/components/icons";
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
          <div className="max-w-2xl">
            <p className="eyebrow">Our work</p>
            <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl">
              Every box tells
              <span className="script text-olive block text-[1.15em] leading-[1.15]">
                someone&apos;s story.
              </span>
            </h1>
            <p className="text-ink-soft mt-6 max-w-lg text-lg leading-relaxed">
              A few of the gifts and designs we&apos;ve made for brides, brothers, best friends,
              fathers and brands. Each one was built around a person, and yours will be too.
            </p>
          </div>
          <div className="mt-12">
            <Suspense fallback={<GalleryView filter="all" />}>
              <WorkGallery />
            </Suspense>
          </div>
        </section>

        <section className="bg-paper-deep">
          <div className="wrap flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
            <div>
              <p className="script text-olive text-3xl">your turn</p>
              <h2 className="mt-1 max-w-xl text-3xl leading-tight md:text-4xl">
                Tell us who it&apos;s for. We&apos;ll draft the rest.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/#enquire">Send an enquiry</ButtonLink>
              <ButtonLink
                href={whatsappUrl("Hi Shaadi Drafts! I'd like a custom gift made.")}
                variant="outline"
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
