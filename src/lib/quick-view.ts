import type { Hamper } from "@/content/diwali";
import { dulheRaja, offerActive } from "@/content/dulhe-raja";
import { formatRupees } from "./format";
import { referralOffer, type WorkPiece } from "@/content/work";
import { whatsappUrl } from "./whatsapp";

/** Everything the quick-view pop-up shows for one product or piece of work. */
export type QuickViewItem = {
  title: string;
  eyebrow: string;
  description: string;
  images: { src: string; alt: string; label?: string }[];
  items: string[];
  note?: string;
  /** Show photos whole (letterboxed) instead of cropped to fill, for flat artwork. */
  contain?: boolean;
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
    images: [
      { src: w.image, alt: w.alt },
      ...(w.gallery ?? []).map((g) => ({ src: g.image, alt: g.alt })),
    ],
    items: w.inside,
    contain: Boolean(w.size),
    ...(w.referral
      ? {
          note: `MRP ${formatRupees(referralOffer.mrp)} · ${formatRupees(referralOffer.price)} when a friend you refer buys anything over ${formatRupees(referralOffer.minOrder)}`,
          cta: { href: referralUrl(w.title), label: "Claim the referral price" },
        }
      : {
          cta: {
            href: whatsappUrl(
              `Hi Shaadi Drafts! I saw "${w.title}" (${w.occasion}) on your site and would love something like it.`,
            ),
            label: "Make me one like this",
          },
        }),
  };
}

export function dulheRajaView(): QuickViewItem {
  const active = offerActive();
  return {
    title: dulheRaja.name,
    eyebrow: dulheRaja.occasion,
    description: dulheRaja.blurb,
    images: dulheRaja.pages.map((p) => ({ src: p.image, alt: p.alt, label: p.caption })),
    items: [...dulheRaja.inside],
    note: active
      ? `${formatRupees(dulheRaja.offerPrice)} all November (regular price ${formatRupees(dulheRaja.price)})`
      : formatRupees(dulheRaja.price),
    contain: true,
    cta: {
      href: whatsappUrl(
        `Hi Shaadi Drafts! I'd like to order "${dulheRaja.name}"${
          active ? ` at the November price of ${formatRupees(dulheRaja.offerPrice)}` : ""
        }.`,
      ),
      label: "Order on WhatsApp",
    },
  };
}

/** WhatsApp link for claiming the refer-a-friend card game price. */
export function referralUrl(title?: string) {
  return whatsappUrl(
    `Hi Shaadi Drafts! I'd like ${title ? `"${title}"` : "a custom card game"} at the referral price of ${formatRupees(referralOffer.price)}. My friend's name is: `,
  );
}
