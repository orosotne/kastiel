/**
 * Skript na konverziu obrázkov obnovy do formátu WebP.
 * Spustenie: node scripts/convert-restoration-to-webp.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const RESTORATION_DIR = path.join(__dirname, "..", "public", "images", "phoenix", "restoration");
const IMAGE_EXT = /\.(jpg|jpeg|png)$/i;

async function convertToWebP() {
  const files = fs.readdirSync(RESTORATION_DIR);
  const imageFiles = files.filter((f) => IMAGE_EXT.test(f));

  if (imageFiles.length === 0) {
    console.log("Žiadne obrázky na konverziu.");
    return;
  }

  console.log(`Konvertujem ${imageFiles.length} obrázkov na WebP...`);

  for (const file of imageFiles) {
    const inputPath = path.join(RESTORATION_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(RESTORATION_DIR, `${baseName}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      fs.unlinkSync(inputPath);
      console.log(`  ✓ ${file} → ${baseName}.webp`);
    } catch (err) {
      console.error(`  ✗ ${file}:`, err.message);
    }
  }

  console.log("Hotovo.");
}

convertToWebP().catch(console.error);
