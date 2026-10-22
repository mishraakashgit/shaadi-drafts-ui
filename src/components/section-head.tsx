export function SectionHead({
  eyebrow,
  title,
  script,
  tone = "ink",
}: {
  eyebrow: string;
  title: string;
  script?: string;
  tone?: "ink" | "light";
}) {
  const light = tone === "light";
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-gold" : ""}`}>{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
        {title}{" "}
        {script && (
          <span className={`script text-[1.2em] ${light ? "text-gold" : "text-olive"}`}>
            {script}
          </span>
        )}
      </h2>
    </div>
  );
}
