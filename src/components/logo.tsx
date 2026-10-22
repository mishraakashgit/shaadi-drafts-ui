import Link from "next/link";

export function Logo({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const color = tone === "light" ? "text-paper" : "text-ink";
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-1.5 ${color}`}
      aria-label="Shaadi Drafts home"
    >
      <span className="font-display text-[0.95rem] font-medium tracking-[0.32em] uppercase">
        Shaadi
      </span>
      <span className="script text-gold text-[1.75rem] leading-none transition-transform duration-500 group-hover:-rotate-3">
        Drafts
      </span>
    </Link>
  );
}
