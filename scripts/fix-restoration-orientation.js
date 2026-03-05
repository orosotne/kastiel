/**
 * Skript na opravu orientácie fotiek obnovy.
 * - Aplikuje EXIF orientáciu (sharp().rotate() bez argumentov)
 * - Prepisuje súbory priamo v public/images/phoenix/restoration/
 *
 * Spustenie: npm run fix-restoration-orientation
 *
 * Poznámka: Na OneDrive môže zápis zlyhať – v tom prípade opravte orientáciu
 * ručne v editore obrázkov a uložte priamo do restoration/.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const RESTORATION_DIR = path.join(__dirname, "..", "public", "images", "phoenix", "restoration");

async function fixOrientation() {
  const files = fs.readdirSync(RESTORATION_DIR);
  const webpFiles = files.filter((f) => f.endsWith(".webp") && !f.startsWith("."));

  if (webpFiles.length === 0) {
    console.log("Žiadne WebP obrázky v priečinku obnovy.");
    return;
  }

  console.log(`Opravujem orientáciu ${webpFiles.length} obrázkov...`);

  for (const file of webpFiles) {
    const inputPath = path.join(RESTORATION_DIR, file);

    try {
      const buffer = await sharp(inputPath)
        .rotate()
        .webp({ quality: 85 })
        .toBuffer();
      fs.writeFileSync(inputPath, buffer);
      console.log(`  ✓ ${file}`);
    } catch (err) {
      console.error(`  ✗ ${file}:`, err.message);
    }
  }

  console.log("Hotovo.");
}

fixOrientation().catch(console.error);
