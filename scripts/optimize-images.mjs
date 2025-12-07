import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './public/images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

// Súbory ktoré sa majú preskočiť (SVG, ICO)
const SKIP_EXTENSIONS = ['.svg', '.ico', '.webp', '.avif'];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (SKIP_EXTENSIONS.includes(ext)) {
    return { skipped: true, file: filePath };
  }

  const stats = fs.statSync(filePath);
  const sizeMB = stats.size / (1024 * 1024);
  
  // Preskočiť ak je už malý (pod 500KB)
  if (stats.size < 500 * 1024) {
    return { skipped: true, file: filePath, reason: 'already small' };
  }

  console.log(`Optimizing: ${filePath} (${sizeMB.toFixed(2)} MB)`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Zmenšiť ak je širší ako MAX_WIDTH
    let pipeline = image;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Konvertovať podľa typu
    let outputPath = filePath;
    let outputBuffer;

    if (ext === '.png') {
      outputBuffer = await pipeline
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toBuffer();
    } else {
      // JPEG a ostatné
      outputBuffer = await pipeline
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
    }

    // Uložiť len ak je menší
    if (outputBuffer.length < stats.size) {
      fs.writeFileSync(outputPath, outputBuffer);
      const newSizeMB = outputBuffer.length / (1024 * 1024);
      const saved = ((stats.size - outputBuffer.length) / stats.size * 100).toFixed(1);
      console.log(`  ✓ Saved ${saved}% (${sizeMB.toFixed(2)} MB → ${newSizeMB.toFixed(2)} MB)`);
      return { optimized: true, file: filePath, saved: stats.size - outputBuffer.length };
    } else {
      console.log(`  - No improvement, keeping original`);
      return { skipped: true, file: filePath, reason: 'no improvement' };
    }
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return { error: true, file: filePath, message: error.message };
  }
}

async function walkDirectory(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...await walkDirectory(fullPath));
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');
  
  const files = await walkDirectory(IMAGES_DIR);
  console.log(`Found ${files.length} images to process\n`);
  
  let totalSaved = 0;
  let optimizedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    
    if (result.optimized) {
      optimizedCount++;
      totalSaved += result.saved;
    } else if (result.error) {
      errorCount++;
    } else {
      skippedCount++;
    }
  }

  console.log('\n============================');
  console.log('📊 Summary:');
  console.log(`   Optimized: ${optimizedCount} files`);
  console.log(`   Skipped: ${skippedCount} files`);
  console.log(`   Errors: ${errorCount} files`);
  console.log(`   Total saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

main().catch(console.error);

