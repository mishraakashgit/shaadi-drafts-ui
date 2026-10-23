export function SectionHead({
  eyebrow,
  title,
  accent,
  intro,
  tone = "ink",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  /** Rendered in italic serif after the title. */
  accent?: string;
  intro?: string;
  tone?: "ink" | "light";
  align?: "left" | "center";
}) {
  const light = tone === "light";
  return (
    <div data-reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${light ? "text-gold-soft" : ""}`}>{eyebrow}</p>
      <h2 className="mt-5 text-[2.6rem] leading-[1.02] sm:text-5xl md:text-[3.6rem]">
        {title} {accent && <em className={light ? "text-gold-soft" : "text-olive"}>{accent}</em>}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-xl text-[1.05rem] leading-relaxed ${light ? "text-paper/70" : "text-ink-soft"} ${align === "center" ? "mx-auto" : ""}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
