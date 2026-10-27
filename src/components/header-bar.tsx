"use client";

import { useEffect, useState } from "react";

/** Sticky header that tucks away while scrolling down and returns on the way up. */
export function HeaderBar({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 320);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-hidden={hidden || undefined}
      className={`sticky top-0 z-30 border-b backdrop-blur-xl backdrop-saturate-150 transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] data-[hidden]:-translate-y-full ${
        scrolled
          ? "bg-paper/85 border-line shadow-[0_10px_30px_-24px_rgb(22_26_17/0.5)]"
          : "bg-paper/60 border-transparent"
      }`}
    >
      {children}
    </header>
  );
}
