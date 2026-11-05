import { describe, expect, it } from "vitest";
import { dulheRaja, formatRupees, offerActive } from "./dulhe-raja";

describe("launch offer", () => {
  it("runs through 30 November in India", () => {
    expect(offerActive(new Date("2026-11-06T10:00:00+05:30"))).toBe(true);
    expect(offerActive(new Date("2026-11-30T23:59:00+05:30"))).toBe(true);
  });

  it("ends at midnight IST on 1 December", () => {
    expect(offerActive(new Date("2026-12-01T00:00:00+05:30"))).toBe(false);
    expect(offerActive(new Date("2027-01-15T12:00:00Z"))).toBe(false);
  });

  it("is half the regular price", () => {
    expect(dulheRaja.offerPrice).toBe(Math.floor(dulheRaja.price / 2));
    expect(formatRupees(dulheRaja.offerPrice)).toBe("₹499");
  });
});
