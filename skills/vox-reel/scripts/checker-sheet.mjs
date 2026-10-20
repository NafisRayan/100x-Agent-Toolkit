#!/usr/bin/env node
// Ghép các PNG đã tách nền lên nền caro để kiểm tra alpha (pure JS).
// Usage: node scripts/checker-sheet.mjs <out.jpg> <png-files...>

import { writeFileSync, existsSync } from 'node:fs';
import { globSync } from 'node:fs';
import { dirname } from 'node:path';
import { Jimp, loadFont } from 'jimp';
import { SANS_12_BLACK } from 'jimp/fonts';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/checker-sheet.mjs <out.jpg> <png-files...>');
  process.exit(1);
}

const outPath = args[0];
const rawFiles = args.slice(1);

// Xử lý glob pattern trên Windows (ví dụ: assets/scene*/*.png)
const files = [];
for (const pattern of rawFiles) {
  if (pattern.includes('*')) {
    try {
      const matches = globSync(pattern.replace(/\\/g, '/'));
      files.push(...matches);
    } catch {
      files.push(pattern);
    }
  } else if (existsSync(pattern)) {
    files.push(pattern);
  }
}

if (!files.length) {
  console.log('[checker-sheet] Không tìm thấy file PNG nào');
  process.exit(0);
}

const W = 360;
const H = 360;
const cols = 4;
const rows = Math.ceil(files.length / cols);

const sheet = new Jimp({ width: cols * W, height: rows * H, color: 0xc8c8c8ff });
const font = await loadFont(SANS_12_BLACK);

for (let k = 0; k < files.length; k++) {
  const f = files[k];
  const x = (k % cols) * W;
  const y = Math.floor(k / cols) * H;

  // Vẽ nền caro 20x20
  for (let cy = 0; cy < H; cy += 20) {
    for (let cx = 0; cx < W; cx += 20) {
      if ((Math.floor(cx / 20) + Math.floor(cy / 20)) % 2 !== 0) {
        const maxY = Math.min(y + cy + 20, y + H);
        const maxX = Math.min(x + cx + 20, x + W);
        for (let py = y + cy; py < maxY; py++) {
          for (let px = x + cx; px < maxX; px++) {
            sheet.setPixelColor(0x969696ff, px, py);
          }
        }
      }
    }
  }

  try {
    const im = await Jimp.read(f);
    im.scaleToFit({ w: W - 12, h: H - 12 });
    const offsetX = x + 6 + Math.floor((W - 12 - im.bitmap.width) / 2);
    const offsetY = y + 6 + Math.floor((H - 12 - im.bitmap.height) / 2);

    sheet.composite(im, offsetX, offsetY);

    // Vẽ nhãn tên file
    const label = f.split(/[\\/]/).pop().slice(0, 28);
    const labelW = Math.min(220, W);
    for (let py = y; py < y + 18; py++) {
      for (let px = x; px < x + labelW; px++) {
        sheet.setPixelColor(0xffc800ff, px, py);
      }
    }
    sheet.print({ font, x: x + 4, y: y + 3, text: label });
  } catch (err) {
    console.warn(`  bỏ qua file lỗi ${f}: ${err.message}`);
  }
}

await sheet.write(outPath);
console.log(`${outPath} (${files.length} cutouts)`);
