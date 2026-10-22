import type { SVGProps } from "react";

export type ArtworkName =
  "diya" | "rings" | "box" | "gift" | "lantern" | "rangoli" | "pen" | "spark";

type Props = SVGProps<SVGSVGElement> & { name: ArtworkName; animated?: boolean };

/**
 * Hand-drawn style line illustrations used as placeholders until product photography is in.
 * Strokes use currentColor; flames and accents use the brand gold.
 */
export function Artwork({ name, animated = false, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name](animated)}
    </svg>
  );
}

function Flame({
  x,
  y,
  animated,
  scale = 1,
}: {
  x: number;
  y: number;
  animated: boolean;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g
        className={animated ? "animate-flicker" : undefined}
        style={{
          transformBox: "fill-box",
          transformOrigin: "50% 100%",
          animationDelay: "var(--flicker-delay, 0s)",
        }}
      >
        <path
          d="M0 0 C-7 -6 -6 -14 0 -24 C6 -14 7 -6 0 0 Z"
          fill="var(--color-gold)"
          stroke="var(--color-gold)"
          strokeWidth={1}
        />
        <path
          d="M0 -3 C-2.5 -6 -2 -10 0 -14 C2 -10 2.5 -6 0 -3 Z"
          fill="var(--color-card)"
          stroke="none"
          opacity={0.8}
        />
      </g>
    </g>
  );
}

const paths: Record<ArtworkName, (animated: boolean) => React.ReactNode> = {
  diya: (animated) => (
    <>
      <Flame x={60} y={60} animated={animated} />
      <path d="M24 66 C30 90 90 90 96 66 Z" />
      <path d="M24 66 H96" />
      <path d="M96 66 C102 64 106 60 108 56" />
      <path d="M38 76 C50 82 70 82 82 76" opacity={0.5} />
      <circle cx={60} cy={73} r={1.6} fill="currentColor" stroke="none" />
    </>
  ),
  rings: () => (
    <>
      <circle cx={48} cy={68} r={22} />
      <circle cx={72} cy={68} r={22} />
      <path d="M66 34 L72 26 L78 34 L72 44 Z" stroke="var(--color-gold)" />
      <path d="M66 34 H78" stroke="var(--color-gold)" />
      <path d="M34 30 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 Z" strokeWidth={1} opacity={0.6} />
    </>
  ),
  box: () => (
    <>
      <rect x={30} y={54} width={60} height={40} rx={2} />
      <rect x={25} y={42} width={70} height={12} rx={2} />
      <path d="M60 42 V94" stroke="var(--color-gold)" />
      <path d="M60 42 C50 28 36 34 44 42 M60 42 C70 28 84 34 76 42" stroke="var(--color-gold)" />
      <path d="M38 66 H50 M38 72 H46" opacity={0.45} />
    </>
  ),
  gift: () => (
    <>
      <rect x={24} y={50} width={58} height={44} rx={2} />
      <path d="M24 64 H82" />
      <path d="M53 50 V94" stroke="var(--color-gold)" />
      <path d="M53 50 C46 38 34 42 40 50 M53 50 C60 38 72 42 66 50" stroke="var(--color-gold)" />
      <path d="M82 58 C90 58 92 50 96 46" />
      <path d="M92 44 L102 40 L106 50 L96 54 Z" />
      <circle cx={97.5} cy={45.5} r={1.4} fill="currentColor" stroke="none" />
    </>
  ),
  lantern: (animated) => (
    <>
      <path d="M60 10 V30" />
      <path d="M60 30 L84 56 L60 84 L36 56 Z" />
      <path d="M36 56 H84 M60 30 V84" opacity={0.45} />
      <path d="M48 43 L72 69 M72 43 L48 69" opacity={0.25} />
      <Flame x={60} y={66} animated={animated} scale={0.55} />
      <path d="M52 84 V104 M60 84 V110 M68 84 V104" stroke="var(--color-gold)" />
    </>
  ),
  rangoli: () => (
    <>
      <circle cx={60} cy={60} r={7} stroke="var(--color-gold)" />
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d="M60 52 C52 40 54 28 60 20 C66 28 68 40 60 52 Z"
          transform={`rotate(${i * 45} 60 60)`}
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={i}
          cx={60}
          cy={14}
          r={1.6}
          transform={`rotate(${i * 45 + 22.5} 60 60)`}
          fill="currentColor"
          stroke="none"
        />
      ))}
      <circle cx={60} cy={60} r={44} opacity={0.3} strokeDasharray="2 5" />
    </>
  ),
  pen: () => (
    <>
      <path d="M78 18 L94 34 L54 74 L38 78 L42 62 Z" />
      <path d="M42 62 L54 74" />
      <path d="M72 24 L88 40" opacity={0.45} />
      <path
        d="M24 98 C34 84 44 104 54 92 C62 82 70 100 80 94 C86 90 90 86 96 88"
        stroke="var(--color-gold)"
      />
    </>
  ),
  spark: () => (
    <>
      <path
        d="M60 22 C62 44 66 52 88 56 C66 60 62 68 60 90 C58 68 54 60 32 56 C54 52 58 44 60 22 Z"
        stroke="var(--color-gold)"
      />
      <path d="M90 22 c1 7 3 9 10 10 c-7 1 -9 3 -10 10 c-1 -7 -3 -9 -10 -10 c7 -1 9 -3 10 -10 Z" />
      <path d="M28 82 c1 6 2 7 8 8 c-6 1 -7 2 -8 8 c-1 -6 -2 -7 -8 -8 c6 -1 7 -2 8 -8 Z" />
      <circle cx={92} cy={88} r={1.8} fill="currentColor" stroke="none" />
      <circle cx={26} cy={30} r={1.4} fill="currentColor" stroke="none" />
    </>
  ),
};
