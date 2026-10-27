"use client";

import { Collapsible } from "./collapsible";

/** A list of questions that open smoothly, one panel each. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-ink/15 border-t">
      {items.map((item) => (
        <Collapsible
          key={item.q}
          className="border-ink/15 group border-b"
          trigger={({ open, toggle, id }) => (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls={id}
              className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl md:py-7 md:text-2xl"
            >
              {item.q}
              <span
                aria-hidden="true"
                className={`border-ink/20 flex size-9 shrink-0 items-center justify-center rounded-full border font-sans text-lg transition-all duration-500 ${
                  open ? "bg-ink text-paper rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          )}
        >
          <p className="text-ink-soft max-w-xl pb-7 leading-relaxed">{item.a}</p>
        </Collapsible>
      ))}
    </div>
  );
}
