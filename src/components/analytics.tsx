"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, track } from "@/lib/analytics";

/** Loads the Google tag and records clicks on WhatsApp and email links as contact events. */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const method = link.href.startsWith("https://wa.me/")
        ? "whatsapp"
        : link.href.startsWith("mailto:")
          ? "email"
          : null;
      if (method) track("contact", { method, link_text: link.textContent?.trim().slice(0, 100) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
