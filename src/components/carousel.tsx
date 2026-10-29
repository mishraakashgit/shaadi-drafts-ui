"use client";

import { Children, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { ArrowIcon } from "./icons";

/**
 * A Swiper carousel on phones that becomes a normal grid from `md` up (Swiper is destroyed there, so
 * the same markup serves both and nothing renders twice).
 *
 * - `grid`: classes for the desktop layout, e.g. "md:grid-cols-3 md:gap-6"
 * - `slide`: width of each slide on phones (default 82% so the next card peeks in)
 * - `spans`: optional per-slide desktop classes, e.g. ["md:col-span-2", ""]
 * - `effect`: "slide" (focus on the active card) or "cards" (a stacked deck), on phones
 * - `desktop`: "grid" (default) or "carousel" to keep a sliding row from `md` up as well
 */
export function Carousel({
  children,
  label,
  grid,
  slide = "w-[82%] sm:w-[46%]",
  spans = [],
  tone = "ink",
  effect = "slide",
  desktop = "grid",
}: {
  children: React.ReactNode;
  label: string;
  grid: string;
  slide?: string;
  spans?: string[];
  tone?: "ink" | "light";
  effect?: "slide" | "cards";
  desktop?: "grid" | "carousel";
}) {
  const root = useRef<HTMLDivElement>(null);
  const pagination = useRef<HTMLDivElement>(null);
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const items = Children.toArray(children);
  const cards = effect === "cards";
  const deskCarousel = desktop === "carousel";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el || items.length < 2) return;
    const mobile = window.matchMedia("(max-width: 767.98px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let swiper: SwiperInstance | null = null;
    let current: string | null = null;
    let alive = true;

    const sync = async () => {
      // Which layout this width wants: the phone effect, a desktop row, or none (CSS grid)
      const mode = mobile.matches ? effect : deskCarousel ? "row" : null;
      if (mode === current) return;
      swiper?.destroy(true, true);
      swiper = null;
      current = mode;
      setIndex(0);
      if (!mode) return;
      const [{ default: Swiper }, { A11y, EffectCards, Keyboard, Navigation, Pagination }] =
        await Promise.all([import("swiper"), import("swiper/modules")]);
      if (!alive || current !== mode) return;
      {
        const stacked = mode === "cards";
        swiper = new Swiper(el, {
          modules: [A11y, Keyboard, Navigation, Pagination, ...(stacked ? [EffectCards] : [])],
          speed: reduced ? 0 : 650,
          grabCursor: true,
          keyboard: { enabled: true, onlyInViewport: true },
          a11y: {
            containerRoleDescriptionMessage: "carousel",
            itemRoleDescriptionMessage: "slide",
          },
          navigation: { prevEl: prev.current, nextEl: next.current },
          pagination: {
            el: pagination.current,
            clickable: true,
            bulletClass: "sd-bullet",
            bulletActiveClass: "sd-bullet-active",
          },
          ...(stacked
            ? {
                effect: "cards",
                cardsEffect: { perSlideOffset: 9, perSlideRotate: 3, slideShadows: false },
              }
            : mode === "row"
              ? { slidesPerView: 3.25, spaceBetween: 20 }
              : {
                  slidesPerView: "auto",
                  // Fit the carousel to the card on show, so short cards leave no gap
                  autoHeight: true,
                  spaceBetween: 14,
                  slidesOffsetBefore: 20,
                  slidesOffsetAfter: 20,
                }),
        });
        swiper.on("slideChange", (sw) => setIndex(sw.realIndex));
      }
    };

    void sync();
    mobile.addEventListener("change", sync);
    return () => {
      alive = false;
      mobile.removeEventListener("change", sync);
      swiper?.destroy(true, true);
    };
  }, [items.length, effect, deskCarousel]);

  const light = tone === "light";
  const navClass = `flex size-11 items-center justify-center rounded-full border transition active:scale-95 ${
    light ? "border-paper/30 text-paper" : "border-ink/20 text-ink"
  }`;
  const nextClass = `flex size-11 items-center justify-center rounded-full transition active:scale-95 ${
    light ? "bg-gold text-night" : "bg-ink text-paper"
  }`;

  return (
    <div
      role="region"
      aria-label={label}
      data-tone={tone}
      className={`sd-carousel ${cards ? "sd-cards overflow-x-clip px-4 py-3 md:overflow-visible md:p-0" : ""}`}
    >
      <div
        ref={root}
        className={`swiper ${deskCarousel ? "md:!overflow-hidden" : "md:!overflow-visible"} ${cards ? "mx-auto w-[78%] !overflow-visible md:w-auto" : "-mx-5 md:mx-0"}`}
      >
        <div
          className={`swiper-wrapper ${deskCarousel ? "" : `md:!grid md:!transform-none ${grid}`}`}
        >
          {items.map((child, i) => (
            <div
              key={i}
              className={`swiper-slide !h-auto ${deskCarousel ? "" : "md:!w-auto"} ${cards ? "" : slide} ${spans[i] ?? ""}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div
          className={`mt-6 flex items-center justify-between ${deskCarousel ? "md:mt-10" : "md:hidden"}`}
        >
          <div className="flex flex-col gap-2">
            <p
              className={`text-[0.78rem] font-semibold tabular-nums ${light ? "text-paper/80" : "text-ink/70"}`}
            >
              {String(index + 1).padStart(2, "0")}
              <span className={light ? "text-paper/40" : "text-ink/35"}>
                {" "}
                / {String(items.length).padStart(2, "0")}
              </span>
              <span
                className={`ml-2 font-normal md:hidden ${light ? "text-paper/50" : "text-ink-soft"}`}
              >
                · Swipe
              </span>
            </p>
            <div ref={pagination} className="flex items-center gap-1.5" />
          </div>
          <div className="flex gap-2">
            <button ref={prev} type="button" aria-label="Previous slide" className={navClass}>
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button ref={next} type="button" aria-label="Next slide" className={nextClass}>
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
