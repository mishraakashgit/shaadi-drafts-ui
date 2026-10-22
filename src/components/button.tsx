import Link from "next/link";
import type { ComponentProps } from "react";

const styles = {
  solid: "bg-ink text-paper hover:bg-olive-deep",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  gold: "bg-gold text-night hover:bg-gold-soft",
  ghostLight: "border border-paper/30 text-paper hover:border-gold hover:text-gold",
} as const;

export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 disabled:opacity-60";

type Props = ComponentProps<typeof Link> & { variant?: keyof typeof styles };

export function ButtonLink({ variant = "solid", className = "", ...props }: Props) {
  const external = typeof props.href === "string" && props.href.startsWith("http");
  return (
    <Link
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${buttonBase} ${styles[variant]} ${className}`}
    />
  );
}

export function buttonClass(variant: keyof typeof styles = "solid") {
  return `${buttonBase} ${styles[variant]}`;
}
