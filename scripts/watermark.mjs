// Stamps the Shaadi Drafts watermark across every photo so it survives copying and downloads.
//   npm run watermark
// Originals live in assets/photos/{diwali,work}; watermarked copies are written to public/ with the
// same names, which is what the site serves. Re-run after adding or replacing a photo.
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tile = path.join(root, "assets/watermark-tile.png");
const folders = ["diwali", "work"];

let count = 0;
for (const folder of folders) {
  const src = path.join(root, "assets/photos", folder);
  const out = path.join(root, "public", folder);
  await mkdir(out, { recursive: true });
  for (const file of await readdir(src)) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const image = sharp(path.join(src, file)).rotate();
    const { width = 1000 } = await image.metadata();
    // One repeat of the pattern spans ~60% of the photo's width, so it survives any crop
    const pattern = await sharp(tile)
      .resize({ width: Math.round(width * 0.6) })
      .png()
      .toBuffer();
    const stamped = image.composite([{ input: pattern, tile: true, blend: "over" }]);
    const dest = path.join(out, file);
    if (/\.png$/i.test(file)) await stamped.png({ compressionLevel: 9 }).toFile(dest);
    else if (/\.webp$/i.test(file)) await stamped.webp({ quality: 86 }).toFile(dest);
    else await stamped.jpeg({ quality: 86, mozjpeg: true }).toFile(dest);
    count++;
  }
}
console.log(`Watermarked ${count} photos into public/`);
