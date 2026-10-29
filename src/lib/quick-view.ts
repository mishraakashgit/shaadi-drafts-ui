import type { Hamper } from "@/content/diwali";
import type { WorkPiece } from "@/content/work";
import { whatsappUrl } from "./whatsapp";

/** Everything the quick-view pop-up shows for one product or piece of work. */
export type QuickViewItem = {
  title: string;
  eyebrow: string;
  description: string;
  images: { src: string; alt: string; label?: string }[];
  items: string[];
  note?: string;
  cta: { href: string; label: string };
};

export function hamperView(h: Hamper, variantIndex = 0): QuickViewItem {
  const variants = h.variants ?? [];
  const variant = variants[variantIndex];
  const images = variants.length
    ? [variant!, ...variants.filter((v) => v !== variant)].map((v) => ({
        src: v.image,
        alt: v.alt,
        label: `${v.label} filling`,
      }))
    : [{ src: h.image, alt: h.alt }];
  if (h.hoverImage)
    images.push({ src: h.hoverImage, alt: `${h.name}, contents laid out`, label: "What's inside" });
  return {
    title: h.name,
    eyebrow: h.tags.join(" · "),
    description: h.blurb,
    images,
    items: variant?.contents ?? h.contents,
    note: "Price on request · fully customisable",
    cta: {
      href: whatsappUrl(
        `Hi Shaadi Drafts! I'm interested in "${h.name}"${variant ? ` (${variant.label} filling)` : ""}.`,
      ),
      label: "Enquire on WhatsApp",
    },
  };
}

export function workView(w: WorkPiece): QuickViewItem {
  return {
    title: w.title,
    eyebrow: w.occasion,
    description: w.story,
    images: [{ src: w.image, alt: w.alt }],
    items: w.inside,
    cta: {
      href: whatsappUrl(
        `Hi Shaadi Drafts! I saw "${w.title}" (${w.occasion}) on your site and would love something like it.`,
      ),
      label: "Make me one like this",
    },
  };
}
