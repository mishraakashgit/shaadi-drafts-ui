"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { QuickViewItem } from "@/lib/quick-view";
import { lockScroll } from "@/lib/smooth-scroll";
import { buttonClass } from "./button";
import { WhatsAppIcon } from "./icons";

const QuickViewContext = createContext<(item: QuickViewItem) => void>(() => {});

/** Hosts the single quick-view dialog for the page. */
export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<QuickViewItem | null>(null);
  const [shown, setShown] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  const open = useCallback((next: QuickViewItem) => {
    setItem(next);
    setShown(0);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d || !item) return;
    if (!d.open) d.showModal();
    lockScroll(true);
    return () => lockScroll(false);
  }, [item]);

  const close = () => {
    dialog.current?.close();
  };

  const image = item?.images[shown];

  return (
    <QuickViewContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        onClose={() => setItem(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-labelledby="quick-view-title"
        className="quick-view bg-paper text-ink m-auto max-h-[100dvh] w-full max-w-none overflow-hidden p-0 backdrop:bg-[rgb(22_26_17/0.6)] backdrop:backdrop-blur-sm max-md:mb-0 max-md:rounded-t-[1.75rem] md:max-h-[88vh] md:max-w-4xl md:rounded-[1.75rem]"
      >
        {item && image && (
          <div
            data-lenis-prevent
            className="grid max-h-[inherit] overflow-y-auto md:grid-cols-[1.05fr_1fr]"
          >
            <div className="bg-paper-deep relative">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[32rem]">
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="animate-caption object-cover"
                />
                {image.label && (
                  <span className="bg-card/90 absolute top-4 left-4 rounded-full px-3 py-1 text-[0.72rem] font-semibold backdrop-blur">
                    {image.label}
                  </span>
                )}
              </div>
              {item.images.length > 1 && (
                <div className="absolute inset-x-0 bottom-0 flex gap-2 overflow-x-auto bg-gradient-to-t from-black/40 to-transparent p-3">
                  {item.images.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      aria-label={`Show ${img.label ?? `photo ${i + 1}`}`}
                      aria-pressed={i === shown}
                      onClick={() => setShown(i)}
                      className="relative size-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-transparent transition aria-pressed:ring-white"
                    >
                      <Image src={img.src} alt="" fill sizes="56px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow">{item.eyebrow}</p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="border-ink/15 hover:bg-ink hover:text-paper -mt-2 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <h2 id="quick-view-title" className="mt-2 text-4xl leading-tight">
                {item.title}
              </h2>
              <p className="text-ink-soft mt-3 leading-relaxed">{item.description}</p>

              <p className="text-ink mt-6 text-[0.8rem] font-semibold">
                What&apos;s inside{" "}
                <span className="text-ink-soft font-normal">({item.items.length} items)</span>
              </p>
              <ul className="border-line mt-2 border-t">
                {item.items.map((x) => (
                  <li
                    key={x}
                    className="border-line before:bg-gold flex items-center gap-3 border-b py-2.5 text-[0.92rem] before:size-1 before:shrink-0 before:rounded-full before:content-['']"
                  >
                    {x}
                  </li>
                ))}
              </ul>

              {item.note && <p className="text-ink-soft mt-4 text-sm">{item.note}</p>}
              <a
                href={item.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass("solid")} mt-6 w-full md:mt-auto md:w-fit`}
              >
                <WhatsAppIcon className="size-4" /> {item.cta.label}
              </a>
            </div>
          </div>
        )}
      </dialog>
    </QuickViewContext.Provider>
  );
}

/**
 * Wraps a photo so tapping it opens the quick view. Renders a real <button> for keyboard and
 * screen-reader users; the children (usually the <Image>) are its content.
 */
export function QuickViewTrigger({
  item,
  className = "",
  badgeClass = "right-3 bottom-3",
  children,
}: {
  item: QuickViewItem;
  className?: string;
  /** Where the "View details" hint sits, so it can avoid other overlays. */
  badgeClass?: string;
  children: React.ReactNode;
}) {
  const open = useContext(QuickViewContext);
  return (
    <button
      type="button"
      onClick={() => open(item)}
      aria-label={`View ${item.title}`}
      className={`group/qv relative block w-full cursor-zoom-in text-left ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`bg-card/90 text-ink pointer-events-none absolute ${badgeClass} flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-semibold opacity-90 shadow-sm backdrop-blur transition md:opacity-0 md:group-hover/qv:opacity-100`}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4 4M11 8.5v5M8.5 11h5" />
        </svg>
        View details
      </span>
    </button>
  );
}
