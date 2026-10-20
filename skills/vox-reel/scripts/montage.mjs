#!/usr/bin/env node
// Ghép các ứng viên ảnh của 1 slug thành 1 ảnh có đánh số để chọn nhanh (pure JS).
// Usage: node scripts/montage.mjs <slug>

import { readdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { Jimp, loadFont } from 'jimp';
import { SANS_14_BLACK } from 'jimp/fonts';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/montage.mjs <slug>');
  process.exit(1);
}

const candDir = 'assets/raw/cand';
if (!existsSync(candDir)) {
  console.error(`Không tìm thấy thư mục ${candDir}`);
  process.exit(1);
}

const allFiles = readdirSync(candDir);
const prefix = `${slug}-`;
const files = allFiles
  .filter((f) => f.startsWith(prefix) && /\.(jpe?g|png)$/i.test(f))
  .sort((a, b) => {
    const numA = parseInt(a.slice(prefix.length).split('.')[0], 10);
    const numB = parseInt(b.slice(prefix.length).split('.')[0], 10);
    return numA - numB;
  })
  .map((f) => join(candDir, f));

if (!files.length) {
  console.log(`[montage] Không tìm thấy ảnh ứng viên cho slug: ${slug}`);
  process.exit(0);
}

const W = 320;
const H = 320;
const cols = 4;
const rows = Math.ceil(files.length / cols);

const sheet = new Jimp({ width: cols * W, height: rows * H, color: 0x282828ff });
const font = await loadFont(SANS_14_BLACK);

for (let k = 0; k < files.length; k++) {
  const f = files[k];
  try {
    const im = await Jimp.read(f);
    im.scaleToFit({ w: W - 8, h: H - 8 });
    const x = (k % cols) * W;
    const y = Math.floor(k / cols) * H;
    const offsetX = x + 4 + Math.floor((W - 8 - im.bitmap.width) / 2);
    const offsetY = y + 4 + Math.floor((H - 8 - im.bitmap.height) / 2);

    sheet.composite(im, offsetX, offsetY);

    // Vẽ nhãn vàng [x + 4, y + 4, x + 44, y + 26]
    for (let py = y + 4; py < y + 26; py++) {
      for (let px = x + 4; px < x + 44; px++) {
        sheet.setPixelColor(0xffc800ff, px, py);
      }
    }
    sheet.print({ font, x: x + 8, y: y + 7, text: `#${k}` });
  } catch (err) {
    console.warn(`  bỏ qua file lỗi ${f}: ${err.message}`);
  }
}

const outJpg = `${candDir}/_${slug}.jpg`;
await sheet.write(outJpg);

// Sinh thêm bản HTML xem trực tiếp trên browser
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ứng viên: ${slug}</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #1a1a1a; color: #eee; padding: 20px; }
    h1 { font-size: 20px; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .card { background: #282828; border-radius: 8px; overflow: hidden; position: relative; border: 1px solid #444; }
    .badge { position: absolute; top: 8px; left: 8px; background: #ffc800; color: #000; font-weight: bold; padding: 2px 8px; border-radius: 4px; font-size: 14px; }
    .thumb { width: 100%; height: 220px; object-fit: contain; background: #1e1e1e; display: block; }
    .info { padding: 8px 12px; font-size: 12px; color: #aaa; word-break: break-all; }
  </style>
</head>
<body>
  <h1>Ứng viên: ${slug} (${files.length} ảnh)</h1>
  <div class="grid">
    ${files.map((f, k) => `
      <div class="card">
        <span class="badge">#${k}</span>
        <img class="thumb" src="${f.split(/[\\/]/).pop()}">
        <div class="info">${f.split(/[\\/]/).pop()}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
writeFileSync(`${candDir}/_${slug}.html`, htmlContent, 'utf8');

console.log(`${outJpg} (và ${candDir}/_${slug}.html)`);
