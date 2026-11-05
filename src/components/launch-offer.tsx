"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState, useSyncExternalStore } from "react";
import { dulheRaja, offerActive } from "@/content/dulhe-raja";
import { referralOffer } from "@/content/work";
import { formatRupees } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowIcon } from "./icons";

const subscribe = () => () => {};

/**
 * Whether the November launch price applies, checked in the visitor's browser so a static page
 * drops the offer on 1 December without a rebuild. `initial` is the build-time value.
 */
export function useOfferActive(initial: boolean) {
  return useSyncExternalStore(
    subscribe,
    () => offerActive(),
    () => initial,
  );
}

/** The WhatsApp link for ordering, mentioning the price that applies today. */
export function orderUrl(active: boolean) {
  return whatsappUrl(
    `Hi Shaadi Drafts! I'd like to order "${dulheRaja.name}"${
      active ? ` at the November price of ${formatRupees(dulheRaja.offerPrice)}` : ""
    }.`,
  );
}

export function OfferPrice({
  initial,
  tone = "light",
  size = "md",
}: {
  initial: boolean;
  tone?: "light" | "ink";
  size?: "md" | "lg";
}) {
  const active = useOfferActive(initial);
  const muted = tone === "light" ? "text-paper/60" : "text-ink-soft";
  const big = size === "lg" ? "text-6xl md:text-7xl" : "text-5xl";
  if (!active)
    return <p className={`font-serif leading-none ${big}`}>{formatRupees(dulheRaja.price)}</p>;
  return (
    <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
      <p className={`font-serif leading-none ${big}`}>
        <span className="sr-only">Now </span>
        {formatRupees(dulheRaja.offerPrice)}
      </p>
      <p className={`pb-1 text-lg line-through ${muted}`}>
        <span className="sr-only">was </span>
        {formatRupees(dulheRaja.price)}
      </p>
      <p className="bg-gold text-night mb-1 rounded-full px-3 py-1 text-[0.75rem] font-bold tracking-wide uppercase">
        {dulheRaja.offerLabel}
      </p>
    </div>
  );
}

export function OrderLink({
  initial,
  className,
  children,
}: {
  initial: boolean;
  className?: string;
  children: ReactNode;
}) {
  const active = useOfferActive(initial);
  return (
    <a
      href={orderUrl(active)}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className={className}
    >
      {children}
    </a>
  );
}

type BarMessage = { key: string; href: string; bg: string; badge: string; body: ReactNode };

const ROTATE_MS = 5000;

/**
 * Slim bar above the header that takes turns showing the current offers: the Dulhe Raja launch
 * price (November only) and the card games refer-a-friend price. It pauses on hover or focus and
 * stays on the first message for visitors who prefer reduced motion.
 */
export function OfferBar({ initial }: { initial: boolean }) {
  const launch = useOfferActive(initial);
  const messages: BarMessage[] = [
    ...(launch
      ? [
          {
            key: "dulhe-raja",
            href: dulheRaja.href,
            bg: "bg-crimson-deep",
            badge: "New · 50% off",
            body: (
              <>
                Dulhe Raja quiz<span className="hidden sm:inline"> for the groom-to-be</span>,{" "}
                {formatRupees(dulheRaja.offerPrice)}
                <span className="hidden sm:inline"> all November</span>
              </>
            ),
          },
        ]
      : []),
    {
      key: "card-games",
      href: "/#refer-a-friend",
      bg: "bg-violet-deep",
      badge: "Refer a friend",
      body: (
        <>
          Card games<span className="hidden sm:inline"> with your photos</span>,{" "}
          {formatRupees(referralOffer.price)} each
          <span className="hidden sm:inline"> when you order together</span>
        </>
      ),
    },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = messages.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  const shown = index % count;
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`grid text-[0.8rem] text-white/85 transition-colors duration-700 ${messages[shown]!.bg}`}
    >
      {messages.map((m, i) => {
        const active = i === shown;
        return (
          <Link
            key={m.key}
            href={m.href}
            aria-hidden={!active}
            tabIndex={active ? undefined : -1}
            className={`group col-start-1 row-start-1 block px-4 py-2.5 text-center transition-[opacity,visibility] duration-500 hover:text-white ${
              active ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <span className="text-gold-soft font-semibold">{m.badge}</span>
            <span className="mx-2.5 text-white/35">|</span>
            {m.body}
            <ArrowIcon className="ml-2 inline size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        );
      })}
    </div>
  );
}
