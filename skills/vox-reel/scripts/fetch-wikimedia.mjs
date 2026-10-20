#!/usr/bin/env node
// Wikimedia Commons: tìm ứng viên (thumb 640px) rồi tải bản lớn kèm license.
//   node fetch-wikimedia.mjs cand <slug> "<query>"
//   node fetch-wikimedia.mjs pick <slug> <index> <dest-path>

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';

const CAND = 'assets/raw/cand';
mkdirSync(CAND, { recursive: true });
const UA = 'vox-reel-skill/1.0 (set WIKIMEDIA_CONTACT in .env)';
const [cmd, slug, a, b] = process.argv.slice(2);

async function dl(url, dest) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
}

if (cmd === 'cand') {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' +
    `&gsrsearch=${encodeURIComponent(a)}&gsrnamespace=6&gsrlimit=10` +
    '&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=640';
  const j = await (await fetch(url, { headers: { 'User-Agent': UA } })).json();
  const pages = Object.values(j.query?.pages || {}).sort((x, y) => x.index - y.index);
  const meta = [];
  let i = 0;
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; if (!ii) continue;
    const em = ii.extmetadata || {};
    const lic = em.LicenseShortName?.value || '?';
    const author = (em.Artist?.value || '?').replace(/<[^>]+>/g, '');
    if (!/\.(jpe?g|png|svg)$/i.test(p.title)) continue;
    const file = `${CAND}/${slug}-${i}.jpg`;
    try { await dl(ii.thumburl, file); } catch (e) { console.error(`  cand ${i} fail: ${e.message}`); }
    meta.push({ i, title: p.title, pageURL: ii.descriptionurl, url: ii.url, w: ii.width, h: ii.height, license: lic, author });
    console.log(`[${slug}] #${i} ${ii.width}x${ii.height} ${lic} by ${author.slice(0, 40)} | ${p.title}`);
    i++;
  }
  writeFileSync(`${CAND}/${slug}.json`, JSON.stringify({ q: a, hits: meta }, null, 2));
} else if (cmd === 'pick') {
  const idx = Number(a), dest = b;
  const meta = JSON.parse(readFileSync(`${CAND}/${slug}.json`, 'utf8'));
  const h = meta.hits[idx];
  // ảnh gốc quá lớn thì lấy bản 2000px
  const src = h.w > 2400 ? h.url.replace('/commons/', '/commons/thumb/') + `/2000px-${h.title.replace('File:', '').replace(/ /g, '_')}` : h.url;
  try { await dl(src, dest); } catch { await dl(h.url, dest); }
  const manifestPath = 'assets/_manifest.json';
  let manifest = [];
  try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')); } catch {}
  const name = dest.split('/').pop().replace(/\.[^.]+$/, '');
  manifest = manifest.filter((m) => m.slug !== name);
  manifest.push({ slug: name, file: dest, source: 'Wikimedia Commons', url: h.pageURL, author: h.author, license: h.license, title: h.title });
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[${slug}] -> ${dest} (${h.license}, ${h.author})`);
} else {
  console.error('usage: cand <slug> "<q>" | pick <slug> <i> <dest>');
  process.exit(1);
}
