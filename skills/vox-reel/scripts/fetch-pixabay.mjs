#!/usr/bin/env node
// Pixabay: tải ứng viên (preview 640px) để chọn, rồi tải bản lớn.
//   node fetch-pixabay.mjs cand <slug> "<query>" [photo|illustration|vector|video] [vertical|horizontal|all]
//   node fetch-pixabay.mjs pick <slug> <index> <dest-path>
// Ứng viên lưu ở assets/raw/cand/<slug>-<i>.jpg + <slug>.json (metadata).

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { getEnv } from './env.mjs';

const KEY = getEnv('PIXABAY_API_KEY');
if (!KEY) { console.error('thiếu PIXABAY_API_KEY'); process.exit(1); }
const CAND = 'assets/raw/cand';
mkdirSync(CAND, { recursive: true });

const [cmd, slug, a, b, c] = process.argv.slice(2);

async function dl(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
}

if (cmd === 'cand') {
  const q = a, type = b || 'photo', orient = c || 'all';
  const isVideo = type === 'video';
  const base = isVideo ? 'https://pixabay.com/api/videos/' : 'https://pixabay.com/api/';
  const url = `${base}?key=${KEY}&q=${encodeURIComponent(q)}&per_page=8&safesearch=true` +
    (isVideo ? '' : `&image_type=${type}&orientation=${orient}`);
  const j = await (await fetch(url)).json();
  const hits = j.hits || [];
  if (!hits.length) { console.log(`[${slug}] 0 hits for "${q}"`); process.exit(0); }
  const meta = [];
  for (let i = 0; i < hits.length; i++) {
    const h = hits[i];
    const prev = isVideo ? `https://i.vimeocdn.com/video/${h.picture_id}_640x360.jpg` : h.webformatURL;
    const file = `${CAND}/${slug}-${i}.jpg`;
    try { await dl(isVideo ? (h.videos?.tiny?.thumbnail || prev) : prev, file); } catch (e) { console.error(`  cand ${i} preview fail: ${e.message}`); }
    meta.push({
      i, id: h.id, pageURL: h.pageURL, user: h.user, tags: h.tags,
      w: isVideo ? h.videos?.large?.width : h.imageWidth, h: isVideo ? h.videos?.large?.height : h.imageHeight,
      large: isVideo ? (h.videos?.large?.url || h.videos?.medium?.url) : h.largeImageURL,
    });
    console.log(`[${slug}] #${i} ${meta[i].w}x${meta[i].h} by ${h.user} | ${h.tags} | ${h.pageURL}`);
  }
  writeFileSync(`${CAND}/${slug}.json`, JSON.stringify({ q, type, hits: meta }, null, 2));
} else if (cmd === 'pick') {
  const idx = Number(a), dest = b;
  const meta = JSON.parse(readFileSync(`${CAND}/${slug}.json`, 'utf8'));
  const h = meta.hits[idx];
  await dl(h.large, dest);
  const manifestPath = 'assets/_manifest.json';
  let manifest = [];
  try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')); } catch {}
  const name = dest.split('/').pop().replace(/\.[^.]+$/, '');
  manifest = manifest.filter((m) => m.slug !== name);
  manifest.push({ slug: name, file: dest, source: 'Pixabay', url: h.pageURL, author: h.user, license: 'Pixabay Content License', query: meta.q });
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[${slug}] -> ${dest} (${h.w}x${h.h}, ${h.pageURL})`);
} else {
  console.error('usage: cand <slug> "<q>" [type] [orient] | pick <slug> <i> <dest>');
  process.exit(1);
}
