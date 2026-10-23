"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { buttonClass } from "./button";

export function MobileNav({ tone }: { tone: "ink" | "light" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const bar = tone === "light" && !open ? "bg-paper" : "bg-ink";

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 -mr-2 flex size-11 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-6 transition-transform duration-300 ${bar} ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-6 transition-transform duration-300 ${bar} ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>
      <div
        id="mobile-menu"
        hidden={!open}
        className="bg-paper fixed inset-0 z-40 flex flex-col px-6 pt-28 pb-10"
      >
        <ul className="space-y-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-line block border-b py-4 font-serif text-4xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-3">
          <Link
            href="/#enquire"
            onClick={() => setOpen(false)}
            className={`${buttonClass("solid")} w-full`}
          >
            Start a gift
          </Link>
          <a href={`https://wa.me/${site.whatsapp}`} className={`${buttonClass("outline")} w-full`}>
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
