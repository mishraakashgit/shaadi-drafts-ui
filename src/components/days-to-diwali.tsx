"use client";

import { useSyncExternalStore } from "react";
import { DIWALI_DATE } from "@/content/diwali";
import { daysUntil } from "@/lib/dates";

const subscribe = () => () => {};

/**
 * Days left until Diwali, worked out in the visitor's browser so static pages stay current.
 * `initial` is the build-time value, used for the server render.
 */
export function useDaysToDiwali(initial: number) {
  return useSyncExternalStore(
    subscribe,
    () => daysUntil(DIWALI_DATE),
    () => initial,
  );
}

export function DaysToDiwali({ initial, unit = true }: { initial: number; unit?: boolean }) {
  const days = useDaysToDiwali(initial);
  return (
    <>
      {days}
      {unit && ` ${days === 1 ? "day" : "days"}`}
    </>
  );
}

export function DaysUnit({ initial }: { initial: number }) {
  return <>{useDaysToDiwali(initial) === 1 ? "day" : "days"}</>;
}
