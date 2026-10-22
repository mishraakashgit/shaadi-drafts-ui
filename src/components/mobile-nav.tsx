"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

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
        className="bg-paper fixed inset-0 z-40 flex flex-col justify-center px-8"
      >
        <ul className="space-y-6">
          {nav.map((item, i) => (
            <li key={item.href} className="animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-ink text-3xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="script text-sage mt-12 text-3xl">gifts, drafted with meaning</p>
      </div>
    </div>
  );
}
