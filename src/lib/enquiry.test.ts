import { describe, expect, it } from "vitest";
import { enquirySchema, enquiryToText } from "./enquiry";

const valid = {
  name: "Shraddha",
  phone: "+91 98765 43210",
  occasion: "diwali",
  email: "",
  website: "",
};

describe("enquirySchema", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });

  it.each(["12345", "+91 abc 43210", "9".repeat(16)])("rejects phone %s", (phone) => {
    expect(enquirySchema.safeParse({ ...valid, phone }).success).toBe(false);
  });

  it("rejects an unknown occasion", () => {
    expect(enquirySchema.safeParse({ ...valid, occasion: "birthday-party" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const result = enquirySchema.safeParse({ ...valid, website: "http://spam" });
    expect(result.success).toBe(false);
  });
});

describe("enquiryToText", () => {
  it("includes only the fields provided", () => {
    const text = enquiryToText(enquirySchema.parse({ ...valid, quantity: "40 hampers" }));
    expect(text).toContain("Occasion: Diwali");
    expect(text).toContain("Quantity / guests: 40 hampers");
    expect(text).not.toContain("undefined");
  });
});
