import { LogoMark } from "./logo";

/** The logo badge ringed by slowly rotating text. */
export function SpinningBadge({
  className = "relative",
  text = "Gifts · drafted · with · meaning · Shaadi Drafts · ",
}) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path id="badge-ring" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
        </defs>
        <circle cx="100" cy="100" r="99" fill="var(--color-card)" />
        <text
          className="fill-ink-soft"
          style={{
            fontSize: 15.5,

            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {/* textLength fits the phrase exactly once around the ring (2π × 84) */}
          <textPath href="#badge-ring" textLength={527} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <LogoMark className="absolute inset-[22%] size-[56%]" />
    </div>
  );
}
