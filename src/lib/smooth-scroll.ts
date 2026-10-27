import type Lenis from "lenis";

/** The page's Lenis instance, or null when smooth scrolling is off (e.g. reduced motion). */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Freezes page scrolling, e.g. while an overlay is open. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}
