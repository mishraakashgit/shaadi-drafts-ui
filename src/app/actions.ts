"use server";

import { headers } from "next/headers";
import { enquirySchema, enquiryToText, occasionLabel } from "@/lib/enquiry";
import { rateLimit } from "@/lib/rate-limit";
import { whatsappUrl } from "@/lib/whatsapp";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
  whatsapp?: string;
  /** Echoed back on error so the form can keep what the visitor typed. */
  values?: Record<string, string>;
};

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([k]) => !k.startsWith("$")).map(([k, v]) => [k, String(v)]),
  );
  const parsed = enquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    // A filled honeypot is a bot: pretend it worked.
    if (fieldErrors.website)
      return { status: "success", message: "Thank you! We'll be in touch soon." };
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values: raw,
    };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return {
      status: "error",
      message: "You've sent a few enquiries already. Please message us on WhatsApp instead.",
      whatsapp: whatsappUrl(enquiryToText(parsed.data)),
      values: raw,
    };
  }

  const enquiry = parsed.data;
  const text = enquiryToText(enquiry);
  const delivered = await sendEmail(
    `New ${occasionLabel(enquiry.occasion)} enquiry from ${enquiry.name}`,
    [text, `\nPhone: ${enquiry.phone}`, enquiry.email ? `Email: ${enquiry.email}` : ""].join("\n"),
    enquiry.email || undefined,
  );

  return {
    status: "success",
    message: delivered
      ? "Thank you! We've received your enquiry and will reply within a working day."
      : "Thank you! For the fastest reply, send these details to us on WhatsApp.",
    whatsapp: whatsappUrl(text),
  };
}

async function sendEmail(subject: string, text: string, replyTo?: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !to || !from) {
    console.info("[enquiry] email not configured; enquiry received:\n%s", text);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
    });
    if (!res.ok) console.error("[enquiry] Resend responded %d: %s", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("[enquiry] failed to send email", err);
    return false;
  }
}
