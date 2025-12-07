import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TEMP_DIR = 'C:/temp/kastiel-images';
const MAX_WIDTH = 1920;
const QUALITY = 75;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  try {
    // Načítať súbor do bufferu namiesto priameho prístupu
    const inputBuffer = fs.readFileSync(filePath);
    const sizeMB = inputBuffer.length / (1024 * 1024);
    
    console.log(`Processing: ${fileName} (${sizeMB.toFixed(2)} MB)`);

    const image = sharp(inputBuffer);
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

    if (outputBuffer.length < inputBuffer.length) {
      fs.writeFileSync(filePath, outputBuffer);
      const newSizeMB = outputBuffer.length / (1024 * 1024);
      const saved = ((inputBuffer.length - outputBuffer.length) / inputBuffer.length * 100).toFixed(1);
      console.log(`  ✓ ${sizeMB.toFixed(2)} MB → ${newSizeMB.toFixed(2)} MB (saved ${saved}%)`);
      return { optimized: true, saved: inputBuffer.length - outputBuffer.length };
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
  console.log('🖼️  Buffer-based Image Optimization');
  console.log('====================================\n');
  
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

  console.log('\n====================================');
  console.log(`📊 Optimized: ${optimizedCount} files`);
  console.log(`📊 Total saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

main().catch(console.error);

