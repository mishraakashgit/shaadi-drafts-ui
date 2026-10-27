"use client";

import { Children, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./icons";

/**
 * A swipeable, snapping carousel on small screens that becomes a normal grid from `md` up.
 *
 * - `grid`: classes for the desktop layout, e.g. "md:grid-cols-3 md:gap-6"
 * - `slide`: width of each slide on mobile (default 82% so the next card peeks in)
 * - `spans`: optional per-slide desktop classes, e.g. ["md:col-span-2", ""]
 */
export function Carousel({
  children,
  label,
  grid,
  slide = "w-[82%] sm:w-[46%]",
  spans = [],
  tone = "ink",
}: {
  children: React.ReactNode;
  label: string;
  grid: string;
  slide?: string;
  spans?: string[];
  tone?: "ink" | "light";
}) {
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / step)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const go = (i: number) => {
    const el = track.current;
    const target = el?.children[Math.max(0, Math.min(items.length - 1, i))] as
      HTMLElement | undefined;
    if (el && target)
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft - el.clientLeft, behavior: "smooth" });
  };

  const light = tone === "light";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        className={`-mx-5 flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain px-5 pb-1 md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${grid}`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={`shrink-0 snap-start md:w-auto ${slide} ${spans[i] ?? ""}`}
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active
                    ? `w-6 ${light ? "bg-gold" : "bg-ink"}`
                    : `w-1.5 ${light ? "bg-paper/30" : "bg-ink/20"}`
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir < 0 ? "Previous" : "Next"}
                disabled={dir < 0 ? active === 0 : active === items.length - 1}
                onClick={() => go(active + dir)}
                className={`flex size-10 items-center justify-center rounded-full border transition disabled:opacity-30 ${
                  light ? "border-paper/25 text-paper" : "border-ink/15 text-ink"
                }`}
              >
                <ArrowIcon className={`size-4 ${dir < 0 ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
