import Link from "next/link";

/**
 * The Shaadi Drafts badge, redrawn as a vector from the original logo so it stays crisp at any size.
 * Text is set in the site's display font (Jost).
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Shaadi Drafts" className={className}>
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="var(--color-card)"
        stroke="var(--color-sage)"
        strokeWidth="2.5"
      />
      <g style={{ fontFamily: "var(--font-display)" }} textAnchor="middle">
        {/* x is nudged by half the letter-spacing so the spaced text stays optically centred */}
        <text
          x="102.5"
          y="102"
          fontSize="31"
          fontWeight="600"
          letterSpacing="5"
          fill="var(--color-olive)"
        >
          SHAADI
        </text>
        <text
          x="104"
          y="131"
          fontSize="15"
          fontWeight="600"
          letterSpacing="8"
          fill="var(--color-sage)"
        >
          DRAFTS
        </text>
      </g>
      <g stroke="var(--color-sage)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M76 148 H93 M107 148 H124" />
      </g>
      <circle cx="100" cy="148" r="2.4" fill="var(--color-olive)" />
    </svg>
  );
}

export function Logo({ className = "size-16 sm:size-[4.5rem]" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Shaadi Drafts home" className="group inline-flex shrink-0">
      <LogoMark
        className={`${className} transition-transform duration-500 group-hover:-rotate-6`}
      />
    </Link>
  );
}
