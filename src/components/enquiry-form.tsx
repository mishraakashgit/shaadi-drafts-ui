"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { occasionOptions, type OccasionValue } from "@/lib/enquiry";
import { buttonClass } from "./button";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "./icons";

const initial: EnquiryState = { status: "idle" };

const field =
  "mt-2 w-full rounded-xl border border-ink/12 bg-paper/60 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-ink-soft/55 outline-none transition focus:border-olive/60 focus:bg-card focus:ring-4 focus:ring-olive/10 aria-[invalid=true]:border-rose/70";

export function EnquiryForm({ defaultOccasion = "wedding" }: { defaultOccasion?: OccasionValue }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center">
        <span className="bg-olive text-paper flex size-12 items-center justify-center rounded-full">
          <CheckIcon className="size-6" />
        </span>
        <h3 className="mt-6 text-4xl">Thank you.</h3>
        <p className="text-ink-soft mt-3 max-w-md text-lg leading-relaxed">{state.message}</p>
        {state.whatsapp && (
          <a
            href={state.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass("solid")} mt-8`}
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
    <form action={action} noValidate className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <Field label="Your name" error={err.name} id="name">
        <input
          id="name"
          name="name"
          defaultValue={v.name}
          autoComplete="name"
          required
          placeholder="Shraddha Sharma"
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
          placeholder="+91 98765 43210"
          className={field}
          aria-invalid={!!err.phone}
          aria-describedby={err.phone ? "phone-error" : undefined}
        />
      </Field>
      <Field label="Email" hint="optional" error={err.email} id="email">
        <input
          id="email"
          name="email"
          defaultValue={v.email}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={field}
          aria-invalid={!!err.email}
          aria-describedby={err.email ? "email-error" : undefined}
        />
      </Field>
      <Field label="Occasion" error={err.occasion} id="occasion">
        <div className="relative">
          <select
            id="occasion"
            name="occasion"
            defaultValue={v.occasion ?? defaultOccasion}
            className={`${field} appearance-none pr-10`}
          >
            {occasionOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="text-ink-soft pointer-events-none absolute top-1/2 right-4 mt-1 -translate-y-1/2 text-xs"
          >
            ▾
          </span>
        </div>
      </Field>
      <Field label="How many gifts or guests?" id="quantity" className="sm:col-span-2">
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
          rows={4}
          placeholder="Dates, city, budget, and who it's for…"
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

      <div className="flex flex-col items-start gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className={`${buttonClass("solid")} group`}>
          {pending ? "Sending…" : "Send enquiry"}
          {!pending && (
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
        {state.status === "error" ? (
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
        ) : (
          <p className="text-ink-soft text-sm">
            We&apos;ll reply with ideas and a quote, usually the same day.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  id,
  error,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  id: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-ink text-[0.85rem] font-semibold">
        {label} {hint && <span className="text-ink-soft font-normal">({hint})</span>}
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
