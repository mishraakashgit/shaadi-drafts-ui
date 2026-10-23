import Link from "next/link";
import { nav } from "@/content/site";
import { buttonClass } from "./button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const light = tone === "light";
  return (
    <header
      className={
        light
          ? "absolute inset-x-0 top-0 z-30"
          : "bg-paper/80 border-line sticky top-0 z-30 border-b backdrop-blur-xl backdrop-saturate-150"
      }
    >
      <div className="wrap flex h-20 items-center justify-between gap-6">
        <Logo className="size-14" />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-[0.88rem] font-medium transition-colors ${
                    light ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/#enquire"
            className={`${buttonClass(light ? "light" : "solid")} hidden !px-5 !py-2.5 sm:inline-flex`}
          >
            Start a gift
          </Link>
          <MobileNav tone={tone} />
        </div>
      </div>
    </header>
  );
}
