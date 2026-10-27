"use client";

import { useEffect } from "react";

/**
 * Desktop-only micro-interactions:
 * - elements marked `data-magnetic` lean slightly towards the cursor
 * - a thin gold line across the top shows how far down the page you are
 */
export function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar?.style.setProperty("transform", `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let active: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (active && active !== el) active.style.transform = "";
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    };
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      className="bg-gold pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] origin-left scale-x-0 motion-reduce:hidden"
    />
  );
}
