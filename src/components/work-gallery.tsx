"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { work, workCategories, type WorkCategory } from "@/content/work";
import { whatsappUrl } from "@/lib/whatsapp";

type Filter = WorkCategory | "all";

const isFilter = (v: string | null): v is Filter => workCategories.some((c) => c.value === v);

/** Reads the active filter from ?c= so filtered views can be linked to and shared. */
export function WorkGallery() {
  const c = useSearchParams().get("c");
  return <GalleryView filter={isFilter(c) ? c : "all"} />;
}

export function GalleryView({ filter }: { filter: Filter }) {
  const pieces = filter === "all" ? work : work.filter((w) => w.category === filter);

  return (
    <>
      <nav aria-label="Filter by occasion" className="flex flex-wrap gap-2">
        {workCategories.map((c) => (
          <Link
            key={c.value}
            href={c.value === "all" ? "/work" : `/work?c=${c.value}`}
            replace
            scroll={false}
            aria-current={filter === c.value ? "true" : undefined}
            className="border-ink/25 text-ink hover:border-ink aria-[current=true]:bg-ink aria-[current=true]:text-paper aria-[current=true]:border-ink rounded-full border px-4 py-2 text-sm transition-colors"
          >
            {c.label}
          </Link>
        ))}
      </nav>

      <ul className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3" aria-live="polite">
        {pieces.map((w, i) => (
          <li key={w.slug} className="group mb-14 break-inside-avoid">
            <div
              className={`bg-paper-deep relative overflow-hidden rounded-t-full ${
                i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"
              }`}
            >
              <Image
                src={w.image}
                alt={w.alt}
                fill
                priority={i < 3}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="eyebrow mt-5">{w.occasion}</p>
            <h2 className="mt-2 text-2xl">{w.title}</h2>
            <p className="text-ink-soft mt-2 leading-relaxed">{w.story}</p>
            <p className="text-ink-soft mt-3 text-sm">
              <span className="text-gold" aria-hidden="true">
                ✦{" "}
              </span>
              {w.inside.join(" · ")}
            </p>
            <a
              href={whatsappUrl(
                `Hi Shaadi Drafts! I loved "${w.title}". Could you make something like it for me?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-ink decoration-gold hover:text-olive mt-4 inline-flex text-[0.72rem] font-medium tracking-[0.2em] uppercase underline decoration-1 underline-offset-[6px] transition-colors"
            >
              Make me one like this
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
