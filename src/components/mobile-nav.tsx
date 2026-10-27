"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { nav, site } from "@/content/site";
import { lockScroll } from "@/lib/smooth-scroll";
import { whatsappUrl } from "@/lib/whatsapp";
import { buttonClass } from "./button";
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { LogoMark } from "./logo";

export function MobileNav({ tone }: { tone: "ink" | "light" }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openRef.current;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={openRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="-mr-2 flex size-11 flex-col items-center justify-center gap-1.5"
      >
        <span className={`h-px w-6 ${tone === "light" ? "bg-paper" : "bg-ink"}`} />
        <span className={`h-px w-6 ${tone === "light" ? "bg-paper" : "bg-ink"}`} />
      </button>

      {/* Rendered on <body>: the header's backdrop blur would otherwise clip a fixed overlay to its own height */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="bg-paper animate-menu-in fixed inset-0 z-[70] flex flex-col overflow-y-auto"
          >
            <div className="wrap border-line flex h-20 shrink-0 items-center justify-between border-b">
              <Link href="/" onClick={close} aria-label="Shaadi Drafts home">
                <LogoMark className="size-14" />
              </Link>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="border-ink/15 -mr-1 flex size-11 items-center justify-center rounded-full border"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="wrap flex-1 pt-6">
              <ul>
                {nav.map((item, i) => (
                  <li
                    key={item.href}
                    className="animate-menu-item"
                    style={{ animationDelay: `${80 + i * 60}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="group border-line flex items-center justify-between border-b py-5 font-serif text-[2.6rem] leading-none"
                    >
                      {item.label}
                      <ArrowIcon className="text-ink-soft size-5 transition-transform group-active:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="wrap animate-menu-item shrink-0 space-y-3 pt-8 pb-10"
              style={{ animationDelay: "360ms" }}
            >
              <Link href="/#enquire" onClick={close} className={`${buttonClass("solid")} w-full`}>
                Start a gift
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={whatsappUrl("Hi Shaadi Drafts!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonClass("outline")} w-full`}
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonClass("outline")} w-full`}
                >
                  <InstagramIcon className="size-4" /> Instagram
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
