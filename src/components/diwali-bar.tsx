import Link from "next/link";
import { ArrowIcon } from "./icons";

export function DiwaliBar({ days }: { days: number }) {
  return (
    <Link
      href="/festive/diwali"
      className="group bg-night text-gold-soft hover:text-gold block py-2.5 text-center text-[0.8rem] tracking-wide transition-colors"
    >
      <span className="text-gold mr-2" aria-hidden="true">
        ✦
      </span>
      The Diwali collection is here · {days} {days === 1 ? "day" : "days"} to go
      <ArrowIcon className="ml-2 inline size-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
