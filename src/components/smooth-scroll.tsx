"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/smooth-scroll";

// Anchors land below the sticky header via `scroll-padding-top` in globals.css, which Lenis honours.
const ANCHOR_OFFSET = 0;

/**
 * Lenis smooth scrolling plus light parallax on elements marked `data-parallax="<speed>"`.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: { offset: ANCHOR_OFFSET },
    });
    setLenis(lenis);

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
        lenis.scrollTo(hash, { offset: ANCHOR_OFFSET, immediate: true, force: true });
      });
    } else {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  return null;
}
