import Link from "next/link";
import type { ComponentProps } from "react";

const styles = {
  solid: "bg-ink text-paper hover:bg-olive-deep",
  outline: "border border-ink/20 text-ink hover:border-ink/60 bg-card/40",
  gold: "bg-gold text-night hover:bg-gold-soft",
  light: "bg-paper text-ink hover:bg-white",
  ghostLight: "border border-paper/25 text-paper hover:border-paper/70",
} as const;

export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.9rem] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,transform] duration-300 ease-out disabled:opacity-60";

type Variant = keyof typeof styles;
type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "solid", className = "", ...props }: Props) {
  const external = typeof props.href === "string" && props.href.startsWith("http");
  return (
    <Link
      data-magnetic
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${buttonBase} ${styles[variant]} ${className}`}
    />
  );
}

export function buttonClass(variant: Variant = "solid") {
  return `${buttonBase} ${styles[variant]}`;
}

/** Understated text link with an animated underline. */
export const textLink =
  "group inline-flex w-fit items-center gap-2 text-[0.9rem] font-semibold text-ink underline decoration-ink/25 decoration-1 underline-offset-[6px] transition-colors hover:decoration-ink";
