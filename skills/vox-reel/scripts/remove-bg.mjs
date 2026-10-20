#!/usr/bin/env node
// Tách nền foreground bằng pure JS (Node.js).
// Hỗ trợ cả AI (@imgly/background-removal-node) và BFS Flood-fill từ mép ảnh (cho logo/đồ vật nền trắng/đơn sắc).
// Usage: node scripts/remove-bg.mjs <src> <dst> [model] [maxpx] [nomat]

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { Jimp } from 'jimp';

const [src, dst, modelArg, maxpxArg] = process.argv.slice(2);
if (!src || !dst) {
  console.error('Usage: node scripts/remove-bg.mjs <src> <dst> [model: ai|u2net|floodfill|white] [maxpx: 2200]');
  process.exit(1);
}

const model = (modelArg || 'ai').toLowerCase();
const maxpx = parseInt(maxpxArg || '2200', 10);

const dstDir = dirname(dst);
if (dstDir && dstDir !== '.' && !existsSync(dstDir)) {
  mkdirSync(dstDir, { recursive: true });
}

// Thuật toán BFS flood-fill từ 4 mép ngoài (xóa màu nền nối với viền, không xóa chi tiết trắng bên trong)
function floodFillBackground(image, tolerance = 35) {
  const { width, height, data } = image.bitmap;

  // Lấy màu mẫu từ 4 góc ảnh
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];

  let avgR = 0, avgG = 0, avgB = 0;
  for (const [cx, cy] of corners) {
    const idx = (cy * width + cx) * 4;
    avgR += data[idx];
    avgG += data[idx + 1];
    avgB += data[idx + 2];
  }
  avgR = Math.round(avgR / 4);
  avgG = Math.round(avgG / 4);
  avgB = Math.round(avgB / 4);

  const visited = new Uint8Array(width * height);
  const queue = [];

  function isMatch(idx) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const dist = Math.sqrt((r - avgR) ** 2 + (g - avgG) ** 2 + (b - avgB) ** 2);
    return dist <= tolerance;
  }

  function pushBorder(x, y) {
    const p = y * width + x;
    if (!visited[p] && isMatch(p * 4)) {
      visited[p] = 1;
      queue.push(p);
    }
  }

  // Khởi tạo hàng đợi với 4 mép viền ngoài
  for (let x = 0; x < width; x++) {
    pushBorder(x, 0);
    pushBorder(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushBorder(0, y);
    pushBorder(width - 1, y);
  }

  // BFS
  let head = 0;
  while (head < queue.length) {
    const p = queue[head++];
    const x = p % width;
    const y = Math.floor(p / width);

    // Đặt alpha = 0
    data[p * 4 + 3] = 0;

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const np = ny * width + nx;
        if (!visited[np] && isMatch(np * 4)) {
          visited[np] = 1;
          queue.push(np);
        }
      }
    }
  }
}

async function removeWithAI(inputBuffer) {
  const { removeBackground } = await import('@imgly/background-removal-node');
  const blob = await removeBackground(inputBuffer);
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  console.log(`[remove-bg] Xử lý: ${src} -> ${dst} (mode: ${model})`);

  let rawImg = await Jimp.read(src);
  if (rawImg.bitmap.width > maxpx || rawImg.bitmap.height > maxpx) {
    rawImg.scaleToFit({ w: maxpx, h: maxpx });
  }

  const isFloodfill = model === 'floodfill' || model === 'white' || model === 'fill';

  if (!isFloodfill) {
    try {
      const srcBuf = await rawImg.getBuffer('image/png');
      const pngBuf = await removeWithAI(srcBuf);
      let outImg = await Jimp.read(pngBuf);
      outImg.autocrop();
      await outImg.write(dst);
      console.log(`${dst} ${outImg.bitmap.width}x${outImg.bitmap.height} (AI)`);
      return;
    } catch (err) {
      console.warn(`  AI removeBackground thất bại (${err.message}), chuyển sang flood-fill...`);
    }
  }

  // Fallback: BFS edge flood-fill
  floodFillBackground(rawImg, 40);
  rawImg.autocrop();
  await rawImg.write(dst);
  console.log(`${dst} ${rawImg.bitmap.width}x${rawImg.bitmap.height} (Flood-fill)`);
}

main().catch((err) => {
  console.error(`[remove-bg] Lỗi:`, err.message || err);
  process.exit(1);
});
