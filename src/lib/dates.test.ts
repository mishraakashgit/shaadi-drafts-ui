import { describe, expect, it } from "vitest";
import { daysUntil } from "./dates";

describe("daysUntil", () => {
  it("counts whole days to midnight IST", () => {
    expect(daysUntil("2026-11-08", new Date("2026-10-22T12:00:00+05:30"))).toBe(17);
  });

  it("is zero on and after the date", () => {
    expect(daysUntil("2026-11-08", new Date("2026-11-08T09:00:00+05:30"))).toBe(0);
    expect(daysUntil("2026-11-08", new Date("2026-12-01T00:00:00Z"))).toBe(0);
  });
});
