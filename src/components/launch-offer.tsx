"use client";

import Link from "next/link";
import { type ReactNode, useSyncExternalStore } from "react";
import { dulheRaja, formatRupees, offerActive } from "@/content/dulhe-raja";
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

/** Slim bar above the header announcing the launch offer; hidden once it ends. */
export function LaunchBar({ initial }: { initial: boolean }) {
  const active = useOfferActive(initial);
  if (!active) return null;
  return (
    <Link
      href={dulheRaja.href}
      className="group bg-crimson-deep block px-4 py-2.5 text-center text-[0.8rem] text-white/85 transition-colors hover:text-white"
    >
      <span className="text-gold-soft font-semibold">New · 50% off</span>
      <span className="mx-2.5 text-white/35">|</span>
      Dulhe Raja quiz<span className="hidden sm:inline"> for the groom-to-be</span>,{" "}
      {formatRupees(dulheRaja.offerPrice)}
      <span className="hidden sm:inline"> all November</span>
      <ArrowIcon className="ml-2 inline size-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
