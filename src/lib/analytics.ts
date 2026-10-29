const DEFAULT_GA_ID = "G-PF6XLJN7V0";

/**
 * Google Analytics 4 measurement ID. NEXT_PUBLIC_GA_ID overrides it, but an empty or malformed value
 * (e.g. the variable added in the Amplify console with no value) falls back to the default rather
 * than switching analytics off. Analytics stays off in development.
 */
const fromEnv = process.env.NEXT_PUBLIC_GA_ID?.trim();
export const GA_ID =
  process.env.NODE_ENV === "production"
    ? fromEnv && /^G-[A-Z0-9]+$/i.test(fromEnv)
      ? fromEnv
      : DEFAULT_GA_ID
    : undefined;

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event if the tag has loaded; a no-op otherwise. */
export function track(name: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
