import Link from "next/link";
import { nav } from "@/content/site";
import { HeaderBar } from "./header-bar";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const light = tone === "light";
  const inner = (
    <div className="wrap flex h-24 items-center justify-between gap-6">
      <Logo className="size-[4.5rem] md:size-20" />
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
      {/* Same width as the logo so the desktop nav stays centred */}
      <div className="flex items-center justify-end md:w-20">
        <MobileNav tone={tone} />
      </div>
    </div>
  );

  if (light) return <header className="absolute inset-x-0 top-0 z-30">{inner}</header>;
  return <HeaderBar>{inner}</HeaderBar>;
}
