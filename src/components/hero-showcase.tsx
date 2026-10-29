"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { hampers } from "@/content/diwali";
import { work } from "@/content/work";
import { hamperView, type QuickViewItem, workView } from "@/lib/quick-view";
import { QuickViewTrigger } from "./quick-view";

const hamper = (slug: string) => hamperView(hampers.find((h) => h.slug === slug)!);
const piece = (slug: string) => workView(work.find((w) => w.slug === slug)!);

const slides: { src: string; alt: string; title: string; tag: string; view: QuickViewItem }[] = [
  {
    src: "/diwali/pichwai-gift-box.jpg",
    alt: "The Pichwai Gift Box with lotus Shubh Labh hangings",
    title: "The Pichwai Gift Box",
    view: hamper("pichwai-gift-box"),
    tag: "Diwali",
  },
  {
    src: "/diwali/organza-crate.jpg",
    alt: "A wooden crate wrapped in gold organza with a mirror-work flower",
    title: "The Organza Crate",
    view: hamper("organza-crate"),
    tag: "Festive",
  },
  {
    src: "/diwali/ivory-rani-pink.jpg",
    alt: "Ivory gift box with a rani pink Deepawali card",
    title: "Ivory & Rani Pink Box",
    view: hamper("ivory-rani-pink-box"),
    tag: "Festive",
  },
  {
    src: "/work/save-the-date-shraddha-shubham.webp",
    alt: "Layered arch save the date cards with lavender sprigs",
    title: "Shraddha & Shubham",
    view: piece("save-the-date-shraddha-shubham"),
    tag: "Save the date",
  },
  {
    src: "/diwali/blush-shubh-labh-bag.jpg",
    alt: "Blush Shubh Labh bag with gold diya stands and a beaded potli",
    title: "Blush Shubh Labh Bag",
    view: hamper("blush-shubh-labh-bag"),
    tag: "Diwali",
  },
];

const INTERVAL = 5000;

/** A single arch-framed showcase that slowly crossfades through hero pieces. */
export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  const current = slides[active]!;

  return (
    <div
      className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-[27rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <QuickViewTrigger
        item={current.view}
        className="rounded-t-full"
        badgeClass="top-[18%] right-[12%]"
      >
        <div
          data-reveal="image"
          className="bg-paper-deep relative aspect-[4/5] overflow-hidden rounded-t-full shadow-[0_40px_80px_-40px_rgb(22_26_17/0.45)]"
        >
          {slides.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={i === active ? s.alt : ""}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 27rem, (min-width: 640px) 24rem, 19rem"
              className={`object-cover transition-opacity duration-[1.4s] ease-out ${
                i === active ? "animate-kenburns opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </QuickViewTrigger>
      {/* Gold double frame around the arch */}
      <div
        aria-hidden="true"
        className="border-gold/50 pointer-events-none absolute -inset-3 rounded-t-full border"
      />
      <div
        aria-hidden="true"
        className="border-gold/25 pointer-events-none absolute -inset-6 rounded-t-full border"
      />

      <div
        data-parallax="0.1"
        className="bg-card/90 border-line absolute -bottom-6 -left-4 min-w-[13rem] rounded-2xl border px-4 py-3 shadow-[0_20px_50px_-25px_rgb(22_26_17/0.45)] backdrop-blur sm:-left-10"
      >
        <p key={current.tag + active} className="eyebrow animate-caption !text-[0.62rem]">
          {current.tag}
        </p>
        <p key={current.title} className="animate-caption mt-0.5 font-serif text-xl leading-tight">
          {current.title}
        </p>
      </div>

      <div
        className="absolute -right-2 bottom-4 flex flex-col gap-1.5 sm:-right-8"
        role="tablist"
        aria-label="Showcase"
      >
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.title}
            onClick={() => setActive(i)}
            className={`w-1.5 rounded-full transition-all duration-500 ${i === active ? "bg-gold h-6" : "bg-ink/20 h-1.5"}`}
          />
        ))}
      </div>
    </div>
  );
}
