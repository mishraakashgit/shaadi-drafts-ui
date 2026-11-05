"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/smooth-scroll";

/** The page's scroll-padding-top in px (the space reserved for the sticky header, set in globals.css). */
const scrollPadding = () =>
  parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

/**
 * Lenis smooth scrolling plus light parallax on elements marked `data-parallax="<speed>"`.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    setLenis(lenis);

    // In-page links: measure the target at tap time and glide there. (Lenis's own anchor handling
    // could stop short on long pages at small widths.)
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      // Keyboard activation (detail 0) keeps the browser's own jump, which also moves focus.
      if (e.detail === 0) return;
      const link = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, location.href);
      if (url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      history.replaceState(null, "", url.hash);
      lenis.resize();
      const top = target.getBoundingClientRect().top + window.scrollY - scrollPadding();
      lenis.scrollTo(Math.max(0, top), { force: true });
    };
    document.addEventListener("click", onClick);

    const parallax = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0.06;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    lenis.on("scroll", parallax);
    parallax();

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Start each new page at the top (or at its #anchor) instead of mid-glide from the last one.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    const { hash } = window.location;
    // Lenis still holds the previous page's height until it re-measures, which would cap the scroll.
    lenis.resize();
    if (hash && document.querySelector(hash)) {
      requestAnimationFrame(() => {
        lenis.resize();
        const target = document.querySelector<HTMLElement>(hash);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - scrollPadding();
        lenis.scrollTo(Math.max(0, top), { immediate: true, force: true });
      });
    } else {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  return null;
}
