"use client";

import { useEffect, useRef } from "react";

type Palette = {
  highlight: number;
  midtone: number;
  lowlight: number;
  base: number;
};

/** Brand palettes for the Vanta fog. */
export const fogPalettes = {
  /** Warm diya glow on the night background */
  diya: { highlight: 0xc6a15b, midtone: 0x6e5526, lowlight: 0x2a2614, base: 0x161a11 },
} satisfies Record<string, Palette>;

/**
 * An animated Vanta.js fog layer that fills its positioned parent.
 * three.js and Vanta load only once the section is on screen, and the effect is torn down when it
 * scrolls away. Visitors with reduced motion, data saver or no WebGL see `fallback` instead.
 */
export function VantaFog({
  palette = fogPalettes.diya,
  speed = 0.9,
  blur = 0.6,
  zoom = 0.8,
  className = "",
  fallback,
}: {
  palette?: Palette;
  speed?: number;
  blur?: number;
  zoom?: number;
  className?: string;
  fallback?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData) return;
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl") && !probe.getContext("experimental-webgl")) return;

    let effect: { destroy: () => void } | null = null;
    let cancelled = false;
    let visible = false;

    const start = async () => {
      if (effect) return;
      const [THREE, { default: FOG }] = await Promise.all([
        import("three"),
        import("vanta/dist/vanta.fog.min"),
      ]);
      if (cancelled || effect || !visible) return;
      effect = FOG({
        el,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: palette.highlight,
        midtoneColor: palette.midtone,
        lowlightColor: palette.lowlight,
        baseColor: palette.base,
        blurFactor: blur,
        speed,
        zoom,
      });
      el.dataset.vanta = "on";
    };

    const stop = () => {
      effect?.destroy();
      effect = null;
      delete el.dataset.vanta;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible) void start();
        else stop();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      stop();
    };
  }, [palette, speed, blur, zoom]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-opacity duration-1000 ${className}`}
      style={fallback ? { background: fallback } : undefined}
    />
  );
}
