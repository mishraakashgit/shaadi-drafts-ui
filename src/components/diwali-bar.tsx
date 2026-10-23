import Link from "next/link";
import { ArrowIcon } from "./icons";

export function DiwaliBar({ days }: { days: number }) {
  return (
    <Link
      href="/festive/diwali"
      className="group bg-night text-paper/80 hover:text-paper block px-4 py-2.5 text-center text-[0.8rem] transition-colors"
    >
      <span className="text-gold">Diwali 2026</span>
      <span className="text-paper/30 mx-2.5">|</span>
      Hampers for family &amp; teams, {days} {days === 1 ? "day" : "days"} to go
      <ArrowIcon className="ml-2 inline size-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
