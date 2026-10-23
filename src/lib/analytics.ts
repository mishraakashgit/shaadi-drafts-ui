/** Google Analytics 4 measurement ID. Override with NEXT_PUBLIC_GA_ID; analytics stays off in development. */
export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ??
  (process.env.NODE_ENV === "production" ? "G-PF6XLJN7V0" : undefined);

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event if the tag has loaded; a no-op otherwise. */
export function track(name: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
