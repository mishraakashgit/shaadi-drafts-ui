import { z } from "zod";

export const occasionOptions = [
  { value: "wedding", label: "Wedding" },
  { value: "diwali", label: "Diwali" },
  { value: "rakhi", label: "Rakhi" },
  { value: "corporate", label: "Corporate gifting" },
  { value: "custom", label: "Custom gift" },
  { value: "other", label: "Something else" },
] as const;

export type OccasionValue = (typeof occasionOptions)[number]["value"];

const occasionValues = occasionOptions.map((o) => o.value) as [OccasionValue, ...OccasionValue[]];

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(80),
  phone: z
    .string()
    .trim()
    .refine(
      (v) =>
        /^\+?[\d\s()-]+$/.test(v) &&
        v.replace(/\D/g, "").length >= 10 &&
        v.replace(/\D/g, "").length <= 15,
      {
        message: "Please enter a valid phone number.",
      },
    ),
  email: z.union([z.literal(""), z.email("Please enter a valid email.")]).optional(),
  occasion: z.enum(occasionValues, { message: "Please pick an occasion." }),
  quantity: z.string().trim().max(40).optional(),
  message: z.string().trim().max(1500, "Please keep it under 1500 characters.").optional(),
  // Honeypot: real visitors never see or fill this.
  website: z.string().max(0).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export function occasionLabel(value: OccasionValue): string {
  return occasionOptions.find((o) => o.value === value)?.label ?? value;
}

export function enquiryToText(e: Enquiry): string {
  return [
    `Hi Shaadi Drafts! I'm ${e.name}.`,
    `Occasion: ${occasionLabel(e.occasion)}`,
    e.quantity ? `Quantity / guests: ${e.quantity}` : null,
    e.message ? `\n${e.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
