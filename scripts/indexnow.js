#!/usr/bin/env node
/**
 * IndexNow – odoslanie URL na Bing, Yandex a ďalšie vyhľadávače.
 * Rýchlejšia indexácia nového alebo zmeneného obsahu.
 *
 * Použitie:
 * 1. Vygeneruj API kľúč na https://www.indexnow.org/
 * 2. Vytvor súbor {VAS_KEY}.txt v public/ s obsahom len kľúča (bez úvodzoviek).
 * 3. Spusti: INDEXNOW_KEY=VAS_KEY node scripts/indexnow.js
 *
 * Kľúčový súbor musí byť dostupný na https://rkb.sk/{VAS_KEY}.txt
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkb.sk";
const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.error("Chýba INDEXNOW_KEY. Spusti: INDEXNOW_KEY=VAS_KEY node scripts/indexnow.js");
  process.exit(1);
}

const locales = ["sk", "en", "de"];
const paths = ["", "/pribeh", "/svadby", "/galeria", "/kontakt", "/oznamenie", "/privacy-policy"];

const urlList = [];
for (const locale of locales) {
  for (const path of paths) {
    urlList.push(`${siteUrl}/${locale}${path}`);
  }
}

const payload = {
  host: new URL(siteUrl).hostname,
  key,
  urlList,
};

async function submit() {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    console.log(`IndexNow: Odoslaných ${urlList.length} URL. Status: ${res.status}`);
  } else {
    console.error(`IndexNow chyba: ${res.status} ${res.statusText}`);
    const text = await res.text();
    if (text) console.error(text);
    process.exit(1);
  }
}

submit().catch((err) => {
  console.error(err);
  process.exit(1);
});
