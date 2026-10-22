const DAY_MS = 86_400_000;

/** Whole days from `now` until the start of `isoDate` in India (IST, UTC+5:30). Never negative. */
export function daysUntil(isoDate: string, now: Date = new Date()): number {
  const target = Date.parse(`${isoDate}T00:00:00+05:30`);
  return Math.max(0, Math.ceil((target - now.getTime()) / DAY_MS));
}
