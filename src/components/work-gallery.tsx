"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { work, workCategories, type WorkCategory } from "@/content/work";
import { whatsappUrl } from "@/lib/whatsapp";
import { textLink } from "./button";
import { ArrowIcon } from "./icons";

type Filter = WorkCategory | "all";

const isFilter = (v: string | null): v is Filter => workCategories.some((c) => c.value === v);

/** Reads the active filter from ?c= so filtered views can be linked to and shared. */
export function WorkGallery() {
  const c = useSearchParams().get("c");
  return <GalleryView filter={isFilter(c) ? c : "all"} />;
}

export function GalleryView({ filter }: { filter: Filter }) {
  const pieces = filter === "all" ? work : work.filter((w) => w.category === filter);
  const count = (v: Filter) =>
    v === "all" ? work.length : work.filter((w) => w.category === v).length;

  return (
    <>
      <nav aria-label="Filter by occasion" className="-mx-5 overflow-x-auto px-5 pb-2">
        <div className="bg-paper-deep inline-flex gap-1 rounded-full p-1.5">
          {workCategories.map((c) => (
            <Link
              key={c.value}
              href={c.value === "all" ? "/work" : `/work?c=${c.value}`}
              replace
              scroll={false}
              aria-current={filter === c.value ? "true" : undefined}
              className="text-ink/70 hover:text-ink aria-[current=true]:bg-card aria-[current=true]:text-ink rounded-full px-4 py-2 text-[0.85rem] font-medium whitespace-nowrap transition-all aria-[current=true]:shadow-sm"
            >
              {c.label} <span className="text-ink-soft/70 ml-1 text-xs">{count(c.value)}</span>
            </Link>
          ))}
        </div>
      </nav>

      <ul className="mt-14 columns-1 gap-7 sm:columns-2 lg:columns-3" aria-live="polite">
        {pieces.map((w, i) => (
          <li key={w.slug} className="group mb-16 break-inside-avoid">
            {w.size ? (
              <div className="bg-card border-line overflow-hidden rounded-3xl border p-3">
                <Image
                  src={w.image}
                  alt={w.alt}
                  width={w.size.width}
                  height={w.size.height}
                  priority={i < 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full rounded-2xl transition-transform duration-[1.1s] group-hover:scale-[1.02]"
                />
              </div>
            ) : (
              <div
                className={`bg-paper-deep relative overflow-hidden rounded-3xl ${
                  i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={w.image}
                  alt={w.alt}
                  fill
                  priority={i < 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.03]"
                />
              </div>
            )}
            <p className="eyebrow mt-6">{w.occasion}</p>
            <h2 className="mt-2 text-[2rem] leading-tight">{w.title}</h2>
            <p className="text-ink-soft mt-2 leading-relaxed">{w.story}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {w.inside.map((item) => (
                <li
                  key={item}
                  className="bg-paper-deep text-ink/80 rounded-full px-3 py-1 text-[0.75rem]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl(
                `Hi Shaadi Drafts! I saw "${w.title}" (${w.occasion}) on your site and would love something like it.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`${textLink} mt-5`}
            >
              Make me one like this
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
