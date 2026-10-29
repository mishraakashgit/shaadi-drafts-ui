// Builds the page markup for the Diwali price list from hampers.mjs.
import { MOQ, hampers, packing, tiers } from "./hampers.mjs";

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const rupees = (n) => `₹${n.toLocaleString("en-IN")}`;
const pad = (n) => String(n).padStart(2, "0");

const MARIGOLD = ["#f2a52b", "#e8821e", "#f6c445"];
const ROSE = ["#d6336c", "#e77c94"];

const petal = (x, y, r, k, c) =>
  `<svg viewBox="-12 -12 24 24" style="left:${x};top:${y};transform:rotate(${r}deg) scale(${k})"><path d="M0,-10 C7,-6 7,6 0,10 C-7,6 -7,-6 0,-10 Z" fill="${c}"/><path d="M0,-7 L0,7" stroke="rgba(0,0,0,0.12)" stroke-width="0.8"/></svg>`;

/** A scatter of petals, positioned deterministically so every build looks the same. */
const petals = (spots) =>
  `<div class="petals" aria-hidden="true">${spots.map((s) => petal(...s)).join("")}</div>`;

/** A marigold-and-rose toran hanging across the top of the page. */
const toran = (count = 22) => {
  const items = Array.from({ length: count }, (_, i) => {
    const c = i % 3 === 1 ? ROSE[i % 2] : MARIGOLD[i % 3];
    const drop = i % 2 ? 7 : 9.5;
    return `<svg viewBox="0 0 14 22"><line x1="7" y1="0" x2="7" y2="${drop - 4}" stroke="#c6a15b" stroke-width="0.6"/><circle cx="7" cy="${drop - 4}" r="1" fill="#c6a15b"/><path d="M7,${drop - 3} C11.5,${drop} 11.5,${drop + 6} 7,${drop + 9} C2.5,${drop + 6} 2.5,${drop} 7,${drop - 3} Z" fill="${c}"/></svg>`;
  });
  return `<div class="toran" aria-hidden="true">${items.join("")}</div>`;
};

const footer = (n, accent = "var(--olive)") => `
  <div style="margin-top: auto; padding-top: 4mm; border-top: 1px solid ${accent}; display: flex; justify-content: space-between; align-items: end; font-size: 8pt">
    <p class="serif" style="font-size: 12pt; font-style: italic; color: ${accent}">Handcrafted ways to wish Happy Deepawali</p>
    <p style="text-align: right; line-height: 1.6"><b>WhatsApp</b> +91 83290 49746 · <b>Instagram</b> @shaadi_drafts<br /><span style="color: ${accent}; font-weight: 700">MOQ ${MOQ} per hamper · DM to order</span><span class="soft" style="margin-left: 4mm">${pad(n)}</span></p>
  </div>`;

function cover() {
  return `
<section class="page cover" style="padding-top: calc(var(--m) + 8mm)">
  ${toran()}
  ${petals([
    ["10%", "16%", -20, 1.1, MARIGOLD[0]],
    ["24%", "22%", 35, 0.8, ROSE[0]],
    ["82%", "15%", 15, 1.0, ROSE[1]],
    ["88%", "28%", -40, 0.9, MARIGOLD[1]],
    ["7%", "40%", 60, 0.9, MARIGOLD[2]],
    ["91%", "46%", -10, 1.2, ROSE[0]],
    ["14%", "58%", -55, 0.8, MARIGOLD[0]],
    ["85%", "62%", 25, 0.85, MARIGOLD[0]],
    ["6%", "70%", 20, 1.0, ROSE[0]],
  ])}
  <div class="top" style="position: relative"><span class="eyebrow">Shaadi Drafts</span><span class="eyebrow">Diwali 2026 · Hamper collection</span></div>
  <div class="hero" style="margin-top: 8mm; height: 150mm">
    <div class="ph arch"><img src="{{PHOTOS}}/pvc-green-bag.jpg" alt="" style="object-position: 50% 55%" /></div>
    <div class="ring"></div>
    <svg class="badge logo" viewBox="0 0 200 200">{{LOGO}}</svg>
  </div>
  <h1 style="margin-top: auto">Light up<br /><em style="color: var(--olive)">their Diwali.</em></h1>
  <div class="sub">
    <p class="soft" style="font-size: 10pt; max-width: 110mm">Eleven handcrafted hampers, from ${rupees(999)} to ${rupees(2899)}. Made to order, minimum ${MOQ} per hamper.</p>
    <span class="eyebrow">Price list · 2026</span>
  </div>
</section>`;
}

function glance() {
  const rows = tiers
    .map((t) => {
      const list = hampers
        .map((h, i) => ({ ...h, n: i + 1 }))
        .filter((h) => h.tier === t.id)
        .map(
          (h) => `<tr>
        <td class="name">${esc(h.name)}${h.nuts ? ' <span class="soft" style="font-family: var(--sans); font-size: 6.4pt">· nuts</span>' : ""}</td>
        <td><span class="chip" style="background: transparent; padding: 0"><i style="background: ${packing[h.pack].color}"></i>${packing[h.pack].label}</span></td>
        <td class="soft">${esc(h.highlights)}</td>
        <td class="amt">${rupees(h.price)}</td>
      </tr>`,
        )
        .join("");
      return `<tr class="tier"><td colspan="3">${t.label}</td><td>${t.range}</td></tr>${list}`;
    })
    .join("");
  return `
<section class="page" style="padding-top: calc(var(--m) + 8mm)">
  ${toran()}
  <span class="eyebrow">At a glance</span>
  <h2 class="h2">Choose <em class="accent">your hamper.</em></h2>
  <p class="lead soft" style="max-width: 150mm; margin-top: 2mm">Eleven handcrafted hampers from budget to luxury, ${rupees(999)} – ${rupees(2899)} per hamper. Several contain nuts.</p>
  <table class="glance" style="margin-top: 5mm">
    <thead><tr><th>Hamper</th><th>Packing</th><th>Highlights</th><th>Price</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="soft" style="font-size: 7.4pt; margin-top: 3mm">Magnetic gift box hampers include a premium box with ribbon, Phool incense cones, designer floral decor and a personalised message card.</p>
  <div class="row" style="margin-top: 5mm; gap: 5mm">
    ${[
      ["Pick", "Choose your hamper(s) from the pages that follow."],
      ["Message us", "DM on Instagram or WhatsApp with your quantity."],
      ["Personalise", "Share the wording for your message card."],
    ]
      .map(
        (
          [t, d],
          i,
        ) => `<div style="flex: 1; background: var(--card); border: 1px solid var(--line); border-radius: 3mm; padding: 3mm 4mm">
      <p class="serif" style="font-size: 20pt; font-style: italic; color: var(--gold); line-height: 1">${pad(i + 1)}</p>
      <p class="serif" style="font-size: 13pt; margin-top: 1.5mm">${t}</p>
      <p class="soft" style="font-size: 7.8pt; margin-top: 0.5mm">${d}</p></div>`,
      )
      .join("")}
  </div>
  <div class="dark" style="margin-top: auto; margin-bottom: 2mm; border-radius: 99mm; padding: 4mm 8mm; display: flex; justify-content: space-between; align-items: center">
    <p class="serif" style="font-size: 17pt">Minimum order: ${MOQ} per hamper</p>
    <p style="font-size: 8pt; text-align: right">WhatsApp +91 83290 49746<br />Instagram @shaadi_drafts</p>
  </div>
</section>`;
}

function hamperPage(h, i) {
  const t = tiers.find((x) => x.id === h.tier);
  const n = i + 1;
  const pack = packing[h.pack];
  const meta = `<div style="display: flex; gap: 2mm; flex-wrap: wrap; margin-top: 4mm">
      <span class="chip"><i style="background: ${pack.color}"></i>${pack.label}</span>
      ${h.nuts ? '<span class="chip">Contains nuts</span>' : ""}
    </div>`;
  const list = `<ol class="inside" style="margin-top: 3mm">${h.inside.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`;

  const header = `
  <div style="display: flex; justify-content: space-between; align-items: end; gap: 6mm">
    <div>
      <span class="eyebrow" style="color: ${h.accent}">${t.label} · Hamper ${n} of ${hampers.length}</span>
      <h2 style="font-size: 36pt; margin-top: 2.5mm">${esc(h.name)}</h2>
    </div>
    <div class="price" style="border-color: ${h.accent}"><b style="color: ${h.accent}">${rupees(h.price)}</b><span>per hamper</span></div>
  </div>`;

  const body =
    h.photos.length > 1
      ? `
  <div class="row" style="margin-top: 7mm; gap: 5mm; height: 118mm">
    ${h.photos
      .map(
        ([img, cap], k) => `<figure class="col" style="flex: 1">
      <div class="ph ${k === 0 ? "arch" : ""}" style="flex: 1"><img src="{{PHOTOS}}/${img}.jpg" alt="" /></div>
      <figcaption class="cap">${esc(cap)}</figcaption></figure>`,
      )
      .join("")}
  </div>
  <p class="serif" style="font-size: 14.5pt; line-height: 1.35; margin-top: 6mm">${esc(h.blurb)}</p>
  ${meta}
  <p class="eyebrow" style="margin-top: 6mm; color: ${h.accent}">What&rsquo;s inside</p>
  ${list}`
      : `
  <div class="row" style="margin-top: 7mm; gap: 7mm; flex: 1; min-height: 0; max-height: 190mm">
    <figure class="col" style="flex: 1.15">
      <div class="ph arch" style="flex: 1"><img src="{{PHOTOS}}/${h.photos[0][0]}.jpg" alt="" /></div>
      <figcaption class="cap">${esc(h.photos[0][1])}</figcaption>
    </figure>
    <div class="col" style="flex: 1">
      <p class="serif" style="font-size: 14.5pt; line-height: 1.35">${esc(h.blurb)}</p>
      ${meta}
      <p class="eyebrow" style="margin-top: 7mm; color: ${h.accent}">What&rsquo;s inside</p>
      ${list.replace('class="inside"', 'class="inside" data-single style="columns: 1"')}
    </div>
  </div>`;

  return `
<section class="page" style="padding-top: calc(var(--m) + 8mm)">
  ${toran()}
  ${header}
  ${body}
  ${footer(n + 2, h.accent)}
</section>`;
}

function back({ qrWhatsapp, qrInstagram }) {
  return `
<section class="page dark" style="align-items: center; text-align: center">
  ${petals([
    ["10%", "8%", -25, 1.0, MARIGOLD[0]],
    ["86%", "6%", 30, 1.1, ROSE[0]],
    ["6%", "30%", 45, 0.8, ROSE[1]],
    ["92%", "28%", -15, 0.9, MARIGOLD[1]],
    ["16%", "46%", 10, 0.7, MARIGOLD[2]],
    ["84%", "48%", -50, 0.8, MARIGOLD[0]],
  ])}
  <svg class="logo" viewBox="0 0 200 200" style="width: 36mm; height: 36mm; margin-top: 18mm">{{LOGO}}</svg>
  <p class="eyebrow" style="margin-top: 9mm">Diwali 2026</p>
  <h2 style="font-size: 50pt; margin-top: 4mm">Happy <em class="accent">Deepawali.</em></h2>
  <p class="soft" style="font-size: 10.5pt; max-width: 120mm; margin-top: 5mm">Thank you for choosing Shaadi Drafts. Send us your hamper, quantity and message-card wording, and we&rsquo;ll take it from there.</p>
  <div class="row" style="margin-top: 13mm; gap: 14mm; justify-content: center">
    <div class="col" style="align-items: center">
      <div style="width: 34mm; height: 34mm; background: var(--paper); border-radius: 3mm; padding: 2.5mm">${qrWhatsapp}</div>
      <p class="eyebrow" style="margin-top: 3.5mm">Scan to order on WhatsApp</p>
    </div>
    <div class="col" style="align-items: center">
      <div style="width: 34mm; height: 34mm; background: var(--paper); border-radius: 3mm; padding: 2.5mm">${qrInstagram}</div>
      <p class="eyebrow" style="margin-top: 3.5mm">See more on Instagram</p>
    </div>
  </div>
  <p style="margin-top: 11mm"><span class="chip" style="background: var(--gold); color: var(--night); font-size: 8.4pt; padding: 2mm 5mm">Minimum order ${MOQ} per hamper · DM to order</span></p>
  <div style="margin-top: auto; margin-bottom: 14mm; width: 100%; padding-top: 7mm; border-top: 1px solid rgba(246,241,231,0.16); display: flex; justify-content: space-around; font-size: 10pt">
    <div><p class="eyebrow">WhatsApp</p><p style="margin-top: 1.5mm; font-weight: 600">+91 83290 49746</p></div>
    <div><p class="eyebrow">Email</p><p style="margin-top: 1.5mm; font-weight: 600">shaadidrafts@gmail.com</p></div>
    <div><p class="eyebrow">Instagram</p><p style="margin-top: 1.5mm; font-weight: 600">@shaadi_drafts</p></div>
  </div>
</section>`;
}

export function renderDiwali(qr) {
  return [cover(), glance(), ...hampers.map(hamperPage), back(qr)].join("\n");
}
