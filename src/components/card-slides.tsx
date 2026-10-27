"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type CardSlide = { image: string; alt: string; label: string };

/** Background photos for a card that slowly crossfade, with a small label for the current one. */
export function CardSlides({ slides, sizes }: { slides: CardSlide[]; sizes: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      {slides.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt={i === active ? s.alt : ""}
          fill
          sizes={sizes}
          className={`-z-10 object-cover transition-[opacity,transform] duration-[1.4s] ease-out group-hover:scale-[1.04] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <span
        key={active}
        className="animate-caption bg-paper/90 text-ink absolute top-5 left-5 rounded-full px-3.5 py-1.5 text-[0.75rem] font-semibold backdrop-blur md:top-7 md:left-7"
      >
        {slides[active]?.label}
      </span>
    </>
  );
}
