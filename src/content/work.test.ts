import { describe, expect, it } from "vitest";
import { referralOffer, work } from "./work";

describe("refer-a-friend offer", () => {
  it("applies to both custom card games", () => {
    expect(work.filter((w) => w.referral).map((w) => w.slug)).toEqual([
      "card-game-couples",
      "card-game-best-friends",
    ]);
  });

  it("is ₹649 each against an MRP of ₹899", () => {
    expect(referralOffer).toMatchObject({ price: 649, mrp: 899 });
  });
});
