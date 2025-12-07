import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TEMP_DIR = 'C:/temp/kastiel-images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stats = fs.statSync(filePath);
  const sizeMB = stats.size / (1024 * 1024);

  console.log(`Optimizing: ${path.basename(filePath)} (${sizeMB.toFixed(2)} MB)`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

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

    if (outputBuffer.length < stats.size) {
      fs.writeFileSync(filePath, outputBuffer);
      const newSizeMB = outputBuffer.length / (1024 * 1024);
      const saved = ((stats.size - outputBuffer.length) / stats.size * 100).toFixed(1);
      console.log(`  ✓ Saved ${saved}% (${sizeMB.toFixed(2)} MB → ${newSizeMB.toFixed(2)} MB)`);
      return { optimized: true, saved: stats.size - outputBuffer.length };
    } else {
      console.log(`  - No improvement`);
      return { skipped: true };
    }
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return { error: true };
  }
}

async function main() {
  console.log('🖼️  Temp Image Optimization');
  console.log('============================\n');
  
  const files = fs.readdirSync(TEMP_DIR)
    .filter(f => ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase()))
    .map(f => path.join(TEMP_DIR, f));
  
  console.log(`Found ${files.length} images\n`);
  
  let totalSaved = 0;
  let optimizedCount = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result.optimized) {
      optimizedCount++;
      totalSaved += result.saved;
    }
  }

  console.log('\n============================');
  console.log(`📊 Optimized: ${optimizedCount} files`);
  console.log(`📊 Total saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

main().catch(console.error);

