// Renders a brochure template to PDF.
//   npm run brochure                     -> public/brochure/shaadi-drafts-brochure.pdf (brand brochure, screen)
//   npm run brochure -- --print          -> brochure/out/shaadi-drafts-brochure-print.pdf (3 mm bleed, full-size images)
//   npm run brochure -- --diwali         -> brochure/diwali/shaadi-drafts-diwali-2026.pdf (Diwali price list, screen)
//   npm run brochure -- --diwali --print -> brochure/out/shaadi-drafts-diwali-2026-print.pdf
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import QRCode from "qrcode";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const print = process.argv.includes("--print");
const diwali = process.argv.includes("--diwali");
const photosDir = path.join(root, "brochure/diwali/photos");
const work = path.join(root, "brochure", ".build");

const site = { whatsapp: "918329049746", instagram: "https://www.instagram.com/shaadi_drafts/" };

const hampers = [
  [
    "pichwai-tray",
    "The Pichwai Tray",
    "Signature",
    "Wooden tray, satin ribbon and pearls, with Shubh Labh hangings, diya stands and festive treats.",
  ],
  [
    "pichwai-gift-box",
    "The Pichwai Gift Box",
    "Gift-ready",
    "The signature hamper in a clear, gold-framed carry box, hangings on display.",
  ],
  [
    "emerald-candles",
    "Deepawali Keepsake Box",
    "Emerald or navy",
    "Cloth-bound box with an arch Deepawali card. Five fillings: candles, nuts, brittle, potli.",
  ],
  [
    "ivory-rani-pink",
    "Ivory & Rani Pink Box",
    "New",
    "Almonds, brittle, a floral favour box, mandala candles and tuberose incense.",
  ],
  [
    "organza-crate",
    "The Organza Crate",
    "Hand-wrapped",
    "A wooden crate veiled in gold organza and pinned with a mirror-work flower.",
  ],
  [
    "blush-shubh-labh-bag",
    "Blush Shubh Labh Bag",
    "New",
    "Jewelled pink hangings, gold diya stands, a beaded potli and anar dana.",
  ],
];

const hamperCard = ([img, name, tag, text]) => `
  <div class="col" style="min-height: 0">
    <div class="ph" style="flex: 1; min-height: 0"><img src="{{ASSETS}}/diwali/${img}.jpg" alt="" />
      <span class="tag" style="position: absolute; top: 2.5mm; left: 2.5mm; background: rgba(251,248,241,0.92)">${tag}</span></div>
    <h3 style="font-size: 14pt; margin-top: 3mm">${name.replace("&", "&amp;")}</h3>
    <p class="soft" style="font-size: 7.6pt; line-height: 1.5; margin-top: 1mm">${text}</p>
  </div>`;

/** Screen version: downscale photos so the PDF is small enough to share on WhatsApp. */
async function prepareAssets() {
  if (print) return { assets: path.join(root, "public"), photos: photosDir };
  const out = path.join(work, "assets");
  const dirs = [
    [path.join(root, "public/diwali"), "diwali"],
    [path.join(root, "public/work"), "work"],
    [path.join(root, "public/founder"), "founder"],
    [photosDir, "photos"],
  ];
  for (const [dir, d] of dirs) {
    await mkdir(path.join(out, d), { recursive: true });
    const { readdir } = await import("node:fs/promises");
    for (const f of await readdir(dir)) {
      const src = path.join(dir, f);
      const pipeline = sharp(src).resize({
        width: 1400,
        height: 1400,
        fit: "inside",
        withoutEnlargement: true,
      });
      if (f.endsWith(".png"))
        await pipeline.png({ compressionLevel: 9, palette: true }).toFile(path.join(out, d, f));
      else if (f.endsWith(".webp"))
        await pipeline.webp({ quality: 82 }).toFile(path.join(out, d, f));
      else await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(out, d, f));
    }
  }
  return { assets: out, photos: path.join(out, "photos") };
}

const qr = (text) =>
  QRCode.toString(text, { type: "svg", margin: 0, color: { dark: "#262c1d", light: "#00000000" } });

await rm(work, { recursive: true, force: true });
await mkdir(work, { recursive: true });
const { assets, photos } = await prepareAssets();

const logo = (await readFile(path.join(root, "public/brand/shaadi-drafts-logo.svg"), "utf8"))
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");

const qrWhatsapp = await qr(
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    diwali
      ? "Hi Shaadi Drafts! I saw your Diwali hamper list and would like to place an order."
      : "Hi Shaadi Drafts! I saw your brochure and would love to plan a gift.",
  )}`,
);
const qrInstagram = await qr(site.instagram);

let html = await readFile(
  path.join(root, diwali ? "brochure/diwali.html" : "brochure/brochure.html"),
  "utf8",
);
if (diwali) {
  const { renderDiwali } = await import(
    pathToFileURL(path.join(root, "brochure/diwali/pages.mjs")).href
  );
  html = html.replace("{{BODY}}", () => renderDiwali({ qrWhatsapp, qrInstagram }));
}
html = html
  .replaceAll("{{HAMPERS}}", hampers.map(hamperCard).join(""))
  .replaceAll("{{ASSETS}}", pathToFileURL(assets).href)
  .replaceAll("{{PHOTOS}}", pathToFileURL(photos).href)
  .replaceAll("{{FONTS}}", pathToFileURL(path.join(root, "node_modules/@fontsource")).href)
  .replaceAll("{{BLEED}}", print ? "3mm" : "0mm")
  .replaceAll("{{LOGO}}", logo)
  .replaceAll("{{QR_WHATSAPP}}", qrWhatsapp)
  .replaceAll("{{QR_INSTAGRAM}}", qrInstagram);

const page = path.join(work, "brochure.html");
await writeFile(page, html);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const tab = await browser.newPage();
await tab.goto(pathToFileURL(page).href, { waitUntil: "networkidle" });
await tab.evaluate(() => document.fonts.ready);

const name = diwali ? "shaadi-drafts-diwali-2026" : "shaadi-drafts-brochure";
const outFile = print
  ? path.join(root, `brochure/out/${name}-print.pdf`)
  : diwali
    ? path.join(root, `brochure/diwali/${name}.pdf`)
    : path.join(root, `public/brochure/${name}.pdf`);
await mkdir(path.dirname(outFile), { recursive: true });
await tab.pdf({ path: outFile, preferCSSPageSize: true, printBackground: true });
if (process.argv.includes("--preview")) {
  const sections = await tab.locator("section.page").all();
  for (const [i, s] of sections.entries())
    await s.screenshot({ path: path.join(work, `page-${String(i + 1).padStart(2, "0")}.png`) });
}
await browser.close();
console.log(`Wrote ${path.relative(root, outFile)}`);
