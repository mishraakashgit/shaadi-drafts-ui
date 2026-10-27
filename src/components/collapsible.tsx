"use client";

import { useEffect, useId, useState } from "react";

/**
 * A section that folds away behind a trigger and opens with a smooth height animation.
 * `openOn` lists in-page anchors (e.g. "#enquire") whose links should open it automatically.
 */
export function Collapsible({
  trigger,
  children,
  defaultOpen = false,
  openOn = [],
  className = "",
}: {
  trigger: (state: { open: boolean; toggle: () => void; id: string }) => React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  openOn?: string[];
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  useEffect(() => {
    if (openOn.length === 0) return;
    const matches = (href: string) => openOn.some((hash) => href.endsWith(hash));
    // Arriving on /#enquire, or tapping any link to it, should reveal the section.
    const timer = setTimeout(() => {
      if (matches(window.location.hash)) setOpen(true);
    }, 0);
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (link && matches(link.getAttribute("href") ?? "")) setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", onClick, true);
    };
  }, [openOn]);

  return (
    <div className={className} data-open={open || undefined}>
      {trigger({ open, toggle: () => setOpen((v) => !v), id })}
      <div
        id={id}
        role="region"
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
