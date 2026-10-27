"use client";

import type { OccasionValue } from "@/lib/enquiry";
import { buttonClass } from "./button";
import { Collapsible } from "./collapsible";
import { EnquiryForm } from "./enquiry-form";

const OPEN_ON = ["#enquire"];

/** The enquiry form, folded away behind a "Start a gift" button until someone asks for it. */
export function EnquiryPanel({ defaultOccasion }: { defaultOccasion?: OccasionValue }) {
  return (
    <Collapsible
      openOn={OPEN_ON}
      className="flex h-full flex-col"
      trigger={({ open, toggle, id }) =>
        open ? (
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="font-serif text-3xl">Tell us about the gift</p>
            <button
              type="button"
              onClick={toggle}
              aria-expanded
              aria-controls={id}
              className="text-ink-soft hover:text-ink text-sm font-semibold underline underline-offset-4"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center py-4 lg:py-10">
            <p className="font-serif text-[2rem] leading-tight md:text-4xl">
              Six quick questions. <em className="text-olive">One minute.</em>
            </p>
            <p className="text-ink-soft mt-3 max-w-sm leading-relaxed">
              Tell us the occasion, how many gifts and your budget. We&apos;ll come back with ideas
              and a quote, usually the same day.
            </p>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={false}
              aria-controls={id}
              className={`${buttonClass("solid")} group mt-8 w-full sm:w-fit`}
            >
              Start a gift
              <span className="transition-transform duration-500 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        )
      }
    >
      <EnquiryForm defaultOccasion={defaultOccasion} />
    </Collapsible>
  );
}
