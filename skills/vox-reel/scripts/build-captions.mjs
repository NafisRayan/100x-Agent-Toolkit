#!/usr/bin/env node
// Sinh compositions/captions.html (sub-composition phủ toàn bài) từ vo.srt:
// mỗi dòng VO chia thành cụm 2-3 từ, thời gian chia theo số ký tự. Style Vox: chữ hoa, pill xám đậm, đáy khung.
import { readFileSync, writeFileSync } from 'node:fs';

const [srtPath, outPath, totalArg] = process.argv.slice(2);
const TOTAL = Number(totalArg || 29);
const srt = readFileSync(srtPath, 'utf8').replace(/\r/g, '');
const blocks = srt.trim().split(/\n\n+/);
const toS = (t) => { const [h, m, s] = t.split(':'); return (+h) * 3600 + (+m) * 60 + parseFloat(s.replace(',', '.')); };

const chunks = [];
for (const b of blocks) {
  const lines = b.split('\n');
  const m = lines[1].match(/(\S+) --> (\S+)/); if (!m) continue;
  const start = toS(m[1]), end = toS(m[2]);
  const words = lines.slice(2).join(' ').replace(/"/g, '').split(/\s+/).filter(Boolean);
  // gom 2-3 từ, ưu tiên cắt ở dấu câu
  const groups = []; let cur = [];
  for (const w of words) {
    cur.push(w);
    const punct = /[.,;!?]$/.test(w);
    if (cur.length >= 3 || (cur.length >= 2 && punct)) { groups.push(cur); cur = []; }
  }
  if (cur.length) { if (cur.length === 1 && groups.length) groups[groups.length - 1].push(cur[0]); else groups.push(cur); }
  const total = groups.reduce((a, g) => a + g.join(' ').length + 2, 0);
  let t = start;
  for (const g of groups) {
    const d = (end - start) * (g.join(' ').length + 2) / total;
    chunks.push({ text: g.join(' ').toUpperCase(), start: t, end: t + d });
    t += d;
  }
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const spans = chunks.map((c, i) => `<div class="cap" id="cap-${i}">${esc(c.text)}</div>`).join('\n      ');
const sets = chunks.map((c, i) => `tl.set("#cap-${i}", {opacity:1}, ${c.start.toFixed(3)}); tl.set("#cap-${i}", {opacity:0}, ${c.end.toFixed(3)});`).join('\n  ');

const html = `<!doctype html>
<html><head><meta charset="UTF-8"><title>Captions</title></head>
<body>
<template>
<style>
  @font-face{font-family:"Oswald";src:url(assets/fonts/Oswald.ttf);font-weight:200 700}
  #root{position:absolute;inset:0;overflow:hidden;pointer-events:none}
  #cap-wrap{position:absolute;left:0;right:0;top:1520px;text-align:center}
  .cap{position:absolute;left:50%;top:0;transform:translateX(-50%);white-space:nowrap;opacity:0;
    font-family:"Oswald",sans-serif;font-weight:600;font-size:46px;letter-spacing:.02em;line-height:1;text-transform:uppercase;
    color:#fff;background:rgba(28,28,30,.86);padding:12px 20px 10px;border-radius:4px}
</style>
<div id="root" data-composition-id="captions" data-width="1080" data-height="1920">
  <div id="cap-wrap">
      ${spans}
  </div>
</div>
<script>
(function(){
  const tl = gsap.timeline({ paused: true });
  ${sets}
  tl.set("#cap-wrap", {opacity:1}, ${TOTAL});
  window.__timelines["captions"] = tl;
})();
</script>
</template>
</body></html>
`;
writeFileSync(outPath, html);
console.log(`${chunks.length} caption chunks -> ${outPath}`);
