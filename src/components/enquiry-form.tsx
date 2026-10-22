"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { occasionOptions, type OccasionValue } from "@/lib/enquiry";
import { buttonClass } from "./button";
import { WhatsAppIcon } from "./icons";

const initial: EnquiryState = { status: "idle" };

const field =
  "w-full border-b border-ink/25 bg-transparent py-3 text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-ink aria-[invalid=true]:border-rose";

export function EnquiryForm({ defaultOccasion = "wedding" }: { defaultOccasion?: OccasionValue }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="border-line bg-card rounded-sm border p-8 md:p-10">
        <p className="script text-olive text-4xl">thank you</p>
        <p className="mt-3 text-lg">{state.message}</p>
        {state.whatsapp && (
          <a
            href={state.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass("solid")} mt-6`}
          >
            <WhatsAppIcon className="size-4" /> Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  return (
    <form action={action} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <Field label="Your name" error={err.name} id="name">
        <input
          id="name"
          name="name"
          defaultValue={v.name}
          autoComplete="name"
          required
          className={field}
          aria-invalid={!!err.name}
          aria-describedby={err.name ? "name-error" : undefined}
        />
      </Field>
      <Field label="Phone / WhatsApp" error={err.phone} id="phone">
        <input
          id="phone"
          name="phone"
          defaultValue={v.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="+91"
          className={field}
          aria-invalid={!!err.phone}
          aria-describedby={err.phone ? "phone-error" : undefined}
        />
      </Field>
      <Field label="Email (optional)" error={err.email} id="email">
        <input
          id="email"
          name="email"
          defaultValue={v.email}
          type="email"
          autoComplete="email"
          className={field}
          aria-invalid={!!err.email}
          aria-describedby={err.email ? "email-error" : undefined}
        />
      </Field>
      <Field label="Occasion" error={err.occasion} id="occasion">
        <select
          id="occasion"
          name="occasion"
          defaultValue={v.occasion ?? defaultOccasion}
          className={`${field} appearance-none`}
        >
          {occasionOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="How many gifts / guests?" id="quantity" className="sm:col-span-2">
        <input
          id="quantity"
          name="quantity"
          defaultValue={v.quantity}
          placeholder="e.g. 40 hampers, or 250 guests"
          className={field}
        />
      </Field>
      <Field label="Tell us about it" error={err.message} id="message" className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          defaultValue={v.message}
          rows={3}
          placeholder="Dates, city, budget, the feeling you're after…"
          className={`${field} resize-y`}
          aria-invalid={!!err.message}
        />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className={buttonClass("solid")}>
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        {state.status === "error" && (
          <p role="alert" className="text-rose text-sm">
            {state.message}{" "}
            {state.whatsapp && (
              <a
                href={state.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Open WhatsApp
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  className = "",
  children,
}: {
  label: string;
  id: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-rose mt-1.5 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
