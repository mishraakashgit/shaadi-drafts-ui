import Link from "next/link";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const light = tone === "light";
  return (
    <header
      className={
        light ? "absolute inset-x-0 top-0 z-30" : "bg-paper/85 sticky top-0 z-30 backdrop-blur"
      }
    >
      <div className="wrap flex h-18 items-center justify-between">
        <Logo tone={tone} />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-display text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors ${
                    light ? "text-paper/80 hover:text-gold" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav tone={tone} />
      </div>
      {!light && <div className="hairline" />}
    </header>
  );
}
