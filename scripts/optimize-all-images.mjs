import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = 'public/images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

// Statistiky
let totalOriginal = 0;
let totalOptimized = 0;
let processedCount = 0;
let skippedCount = 0;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  try {
    // Načítaj do bufferu (kvôli OneDrive lockingu)
    const inputBuffer = fs.readFileSync(filePath);
    const originalSize = inputBuffer.length;
    
    // Získaj metadata
    const metadata = await sharp(inputBuffer).metadata();
    
    // Ak je obrázok už malý, preskoč
    if (originalSize < 50000) { // < 50KB
      skippedCount++;
      return;
    }

    // Optimalizuj
    let pipeline = sharp(inputBuffer);
    
    // Zmenši ak je príliš veľký
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // Komprimuj podľa formátu
    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await pipeline
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toBuffer();
    } else {
      outputBuffer = await pipeline
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
    }

    const newSize = outputBuffer.length;
    
    // Ulož len ak je menší
    if (newSize < originalSize) {
      fs.writeFileSync(filePath, outputBuffer);
      totalOriginal += originalSize;
      totalOptimized += newSize;
      processedCount++;
      
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`✓ ${path.basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${savings}%)`);
    } else {
      skippedCount++;
    }
  } catch (error) {
    console.error(`✗ ${filePath}: ${error.message}`);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

console.log('🖼️  Optimalizácia obrázkov...\n');
console.log(`Adresár: ${IMAGES_DIR}`);
console.log(`Max šírka: ${MAX_WIDTH}px`);
console.log(`Kvalita: ${QUALITY}%\n`);

await processDirectory(IMAGES_DIR);

console.log('\n' + '='.repeat(50));
console.log('📊 VÝSLEDKY:');
console.log(`   Optimalizované: ${processedCount} obrázkov`);
console.log(`   Preskočené: ${skippedCount} obrázkov`);

if (totalOriginal > 0) {
  const savedMB = ((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2);
  const savedPercent = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  console.log(`   Pôvodná veľkosť: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Nová veľkosť: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Ušetrené: ${savedMB} MB (${savedPercent}%)`);
}
console.log('='.repeat(50));

