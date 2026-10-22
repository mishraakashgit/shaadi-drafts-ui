"use client";

import Image from "next/image";
import { useState } from "react";
import type { Hamper } from "@/content/diwali";
import { whatsappUrl } from "@/lib/whatsapp";

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
    <li className="group flex flex-col">
      {/* Arch-topped frame, echoing the Shaadi Drafts monogram arch */}
      <div className="bg-paper-deep relative aspect-[3/4] overflow-hidden rounded-t-full">
        {images.map((img, i) => (
          <Image
            key={img.image}
            src={img.image}
            alt={i === active ? img.alt : ""}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className={`object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${
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
        <ul className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {h.tags.map((t) => (
            <li
              key={t}
              className="bg-card/90 text-ink rounded-full px-3 py-1 text-[0.7rem] tracking-wide backdrop-blur"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <h3 className="mt-6 text-2xl">{h.name}</h3>
      <p className="text-ink-soft mt-2 leading-relaxed">{h.blurb}</p>

      {variants.length > 0 && (
        <div className="mt-5" role="group" aria-label={`${h.name} fillings`}>
          <p className="eyebrow mb-2.5">Filling</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={v.label}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className="border-ink/25 text-ink hover:border-ink aria-pressed:bg-ink aria-pressed:text-paper aria-pressed:border-ink rounded-full border px-3.5 py-1.5 text-xs transition-colors"
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <ul className="text-ink-soft mt-4 space-y-1 text-sm" aria-live="polite">
        {contents.map((c) => (
          <li key={c} className="before:text-gold flex gap-2 before:content-['✦']">
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
        className="font-display text-ink decoration-gold hover:text-olive mt-6 inline-flex w-fit items-center gap-2 text-[0.72rem] font-medium tracking-[0.2em] uppercase underline decoration-1 underline-offset-[6px] transition-colors"
      >
        Enquire about this
      </a>
    </li>
  );
}
