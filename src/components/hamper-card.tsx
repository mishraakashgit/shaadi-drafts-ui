"use client";

import Image from "next/image";
import { useState } from "react";
import type { Hamper } from "@/content/diwali";
import { whatsappUrl } from "@/lib/whatsapp";
import { textLink } from "./button";
import { ArrowIcon } from "./icons";

const sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export function HamperCard({
  hamper: h,
  priority = false,
}: {
  hamper: Hamper;
  priority?: boolean;
}) {
  const variants = h.variants ?? [];
  const [active, setActive] = useState(0);
  const variant = variants[active];
  const contents = variant?.contents ?? h.contents;
  const images = variants.length > 0 ? variants : [{ label: "", image: h.image, alt: h.alt }];

  return (
    <article data-reveal className="group flex h-full flex-col">
      <div className="bg-paper-deep relative aspect-[4/5] overflow-hidden rounded-3xl">
        {images.map((img, i) => (
          <Image
            key={img.image}
            src={img.image}
            alt={i === active ? img.alt : ""}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className={`object-cover transition-[opacity,transform] duration-[1.1s] group-hover:scale-[1.03] ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {h.hoverImage && (
          <Image
            src={h.hoverImage}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <ul className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {h.tags.map((t) => (
            <li
              key={t}
              className="bg-card/90 text-ink rounded-full px-3 py-1 text-[0.72rem] font-semibold backdrop-blur"
            >
              {t}
            </li>
          ))}
        </ul>
        {h.hoverImage && (
          <span className="bg-night/70 text-paper absolute right-4 bottom-4 rounded-full px-3 py-1 text-[0.72rem] opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            What&apos;s inside
          </span>
        )}
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <h3 className="text-[2rem] leading-tight">{h.name}</h3>
        <span className="text-ink-soft mt-2 shrink-0 text-[0.8rem]">On request</span>
      </div>
      <p className="text-ink-soft mt-2 leading-relaxed">{h.blurb}</p>

      {variants.length > 0 && (
        <div className="mt-5" role="group" aria-label={`${h.name} fillings`}>
          <p className="text-ink mb-2.5 text-[0.8rem] font-semibold">Choose a filling</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={v.label}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className="border-ink/15 text-ink hover:border-ink/50 aria-pressed:bg-ink aria-pressed:text-paper aria-pressed:border-ink rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors"
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <ul
        className="text-ink-soft border-line mt-5 space-y-1.5 border-t pt-5 text-[0.88rem]"
        aria-live="polite"
      >
        {contents.map((c) => (
          <li
            key={c}
            className="before:bg-gold flex items-center gap-3 before:size-1 before:shrink-0 before:rounded-full before:content-['']"
          >
            {c}
          </li>
        ))}
      </ul>
      <a
        href={whatsappUrl(
          `Hi Shaadi Drafts! I'm interested in "${h.name}"${variant ? ` (${variant.label} filling)` : ""} for Diwali.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className={`${textLink} mt-6`}
      >
        Enquire about this{" "}
        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </a>
    </article>
  );
}
