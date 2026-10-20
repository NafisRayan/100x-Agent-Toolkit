#!/usr/bin/env node
// Sinh assets-review.html + STORYBOARD.md từ 1 nguồn dữ liệu (beat sheet + asset sheet + _manifest.json).
import { readFileSync, writeFileSync } from 'node:fs';

const manifest = Object.fromEntries(JSON.parse(readFileSync('assets/_manifest.json', 'utf8')).map((m) => [m.slug, m]));

const VO = [
  'In 2000, a small startup called Netflix pitched Blockbuster to buy them out.',
  'They asked for fifty million dollars. Blockbuster laughed them out of the room.',
  'So Netflix built the opposite. No late fees. No stores. Customer first.',
  'Ten years later, Blockbuster closed down a thousand stores and declared bankruptcy.',
  'Today, Netflix drives forty-five billion dollars a year in revenue, the biggest paid streaming service on Earth.',
  "This was the most expensive 'no' in history.",
];

const SCENES = [
  { n: 1, beat: 'Setup', screen: 'Ảnh Reed trước Netflix HQ nằm trong khung vàng treo tường giấy, đen trắng. Camera đẩy chậm rồi bay XUYÊN qua khung (weld rồi detach), ảnh chuyển sang màu. Mây trôi parallax phía sau, nhân vật boil nhẹ.', onscreen: '"a small startup" · "called Netflix" · plaque "In 2000"',
    assets: [
      ['scene1/hq-building.jpg', 'hq-building', 'Netflix HQ (Los Gatos)'],
      ['scene1/reed-portrait.png', 'reed-portrait', 'Reed cut-out'],
      ['scene1/gold-frame.png', 'gold-frame', 'gold frame'],
      ['scene1/wall.jpg', 'wall', 'paper wall'],
      ['scene1/cloud1.png', 'cloud1', 'cloud 1'],
      ['scene1/cloud2.png', 'cloud2', 'cloud 2'],
    ] },
  { n: 2, beat: 'Rejection', screen: 'Boss ngậm xì gà spring lên trên nền sunburst đỏ, khói screen-blend bám theo xì gà. Hai bàn tay (logo / tiền) trượt vào từ hai mép trong khung diamond vẽ tay. Slot machine quay rồi dừng ở "50 MILLION". Frame nháy âm bản, boss chuyển đen trắng, mắt phát sáng đỏ.', onscreen: '"50 MILLION" · "laughed them out"',
    assets: [
      ['scene2/boss.png', 'boss', 'cigar boss cut-out'],
      ['scene2/hand-left.png', 'hand-left', 'logo hand (logo đặt lên màn hình)'],
      ['scene2/hand-right.png', 'hand-right', 'cash hand'],
      ['scene2/netflix-logo.png', 'netflix-logo', 'Netflix logo'],
      ['scene2/smoke.mp4', 'smoke', 'smoke plume trên nền đen (video)'],
    ] },
  { n: 3, beat: 'The turn', screen: 'Mặt bàn gỗ, focus-hunt rồi Ken Burns. Ba tờ báo spring vào lần lượt từ TRÁI (f20), PHẢI (f60), DƯỚI (f100), mỗi tờ một góc xoay, rơi chồng lên nhau. Headline dựng bằng HTML/CSS đè lên trang báo trống.', onscreen: '"NO LATE FEES" · "NO STORES" · "CUSTOMER FIRST" · caption "built the opposite"',
    assets: [
      ['scene3/wood-desk.jpg', 'wood-desk', 'wood desk'],
      ['scene3/newspaper-blank.jpg', 'newspaper-blank', 'newspaper base (x3, headline bằng HTML)'],
    ] },
  { n: 4, beat: 'The fall', screen: 'Exec đứng trước tiệm Blockbuster đã đóng cửa. Parallax punch: nền zoom 1.0→1.12, nhân vật zoom 1.7× quanh chân. Bóng đổ = clone nhân vật lật xuống, bôi đen, skew −53°, blur. Text trái stack từng dòng, shift trái ở f60, text phải "declared bankruptcy" gạch chân vàng. Grade tối hơn.', onscreen: '"closed a / 1000 / stores" → "declared bankruptcy"',
    assets: [
      ['scene4/blockbuster-bg.jpg', 'blockbuster-bg', 'Blockbuster đã đóng cửa'],
      ['scene4/sad-man.png', 'sad-man', 'exec cut-out (full body)'],
    ] },
  { n: 5, beat: 'The payoff', screen: 'Thư phòng kệ sách, Reed ngồi, bàn tiền. Đèn treo VẼ BẰNG CODE (4 radial gradient screen blend + beam) đu đưa ±3°. Cash highlight flicker theo hold-keyframe. Headline stagger + oval bút chì vàng quanh "billion". Camera focus-hunt rồi creep 1.08×.', onscreen: '"Forty five / billion / dollars in revenue" · Netflix ident',
    assets: [
      ['scene5/office-bg.jpg', 'office-bg', 'study / bookshelf'],
      ['scene5/office-char.png', 'office-char', 'Reed ngồi (cut-out)'],
      ['scene5/office-cash.png', 'office-cash', 'cash stack cut-out'],
      ['scene5/lamp.png', 'lamp', 'hanging lamp'],
    ] },
  { n: 6, beat: 'The button', screen: 'Tái dùng rig scene 4: cùng punch, cùng bóng đổ, cùng framing. Đổi nền thành glass tower, nhân vật thành Reed cười. Foam finger đỏ vẫy "no" đúng chữ.', onscreen: '"The most expensive / no / in history"',
    assets: [
      ['scene6/glass-tower-bg.jpg', 'glass-tower-bg', 'glass tower'],
      ['scene6/happy-reed.png', 'happy-reed', 'Reed cười (cut-out)'],
      ['scene6/red-hand.png', 'red-hand', 'red foam finger'],
    ] },
];

const TEXTURES = [
  ['textures/grain.jpg', 'grain', 'film grain (multiply, invert, 55%)'],
  ['textures/grunge.jpg', 'grunge', 'grunge wash (colour-burn, 16%)'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const src = (slug) => {
  const m = manifest[slug];
  if (!m) return '<span class="warn">chưa có trong manifest</span>';
  const who = m.author ? ` · ${esc(m.author)}` : '';
  return m.url ? `<a href="${esc(m.url)}" target="_blank">${esc(m.source)}</a>${who} · ${esc(m.license)}` : `${esc(m.source)}`;
};
const thumb = (file) => file.endsWith('.mp4')
  ? `<video class="thumb" src="assets/${file}" muted loop autoplay playsinline></video>`
  : `<div class="thumb checker"><img src="assets/${file}" alt=""></div>`;

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><title>Netflix reel · Asset review</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  :root{--bg:#f4efe4;--ink:#1e1a16;--muted:#6b645a;--card:#fff9ee;--dark:#171412;--gold:#f2b632;--red:#d9422b;--line:#d9d1c2}
  *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 -apple-system,"Segoe UI",Inter,Roboto,sans-serif}
  .wrap{max-width:980px;margin:0 auto;padding:40px 24px 80px}
  h1{font-size:34px;margin:0 0 6px}h2{font-size:22px;margin:44px 0 12px;display:flex;align-items:center;gap:12px}
  h2 .num{background:var(--dark);color:var(--gold);font-size:13px;padding:3px 9px;border-radius:6px;letter-spacing:.08em}
  p.lead{color:var(--muted);margin:0 0 20px}
  .tag{display:inline-block;background:var(--gold);color:#000;font-weight:700;font-size:12px;padding:3px 9px;border-radius:999px;margin-right:8px}
  .vo{background:var(--dark);color:#eee;border-radius:12px;padding:18px 22px;font-size:14.5px}
  .vo ol{margin:8px 0 0;padding-left:22px}.vo li{margin:4px 0}
  table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:10px;overflow:hidden;font-size:13.5px}
  th{background:var(--dark);color:#eee;text-align:left;padding:10px 12px;font-size:11px;letter-spacing:.1em;text-transform:uppercase}
  td{padding:12px;border-top:1px solid var(--line);vertical-align:top}
  td.line{font-family:Georgia,serif;font-style:italic;color:#3a332c}
  .on{color:#a06a00;font-weight:600}
  .scene{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin:14px 0}
  .scene .head{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin-bottom:8px}
  .scene .desc{color:var(--muted);font-size:13.5px;margin:0 0 12px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
  .asset{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff}
  .thumb{height:150px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#ddd}
  .thumb img{max-width:100%;max-height:100%;object-fit:contain}
  video.thumb{width:100%;object-fit:cover;background:#000}
  .checker{background-color:#e9e9e9;background-image:linear-gradient(45deg,#cfcfcf 25%,transparent 25%),linear-gradient(-45deg,#cfcfcf 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#cfcfcf 75%),linear-gradient(-45deg,transparent 75%,#cfcfcf 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0}
  .meta{padding:8px 10px;font-size:11.5px;line-height:1.35}
  .meta b{display:block;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11.5px;color:#000}
  .meta .lbl{color:var(--ink)}.meta .src{color:var(--muted)}.meta a{color:#8a5a00;text-decoration:none}
  .note{border-left:4px solid var(--red);background:#fff4ec;padding:12px 16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:14px}
  .warn{color:var(--red)}
  .approve{margin-top:40px;padding:20px;border:2px dashed var(--gold);border-radius:12px;background:#fff9e6}
  .approve ul{margin:8px 0 0;padding-left:20px}
</style></head><body><div class="wrap">
<h1>Netflix vs Blockbuster · Asset review</h1>
<p class="lead">Làm lại reel trong video MoSidd. Đổi Remotion → <b>HyperFrames</b>, ElevenLabs → <b>Vivibe</b>. Trang này để duyệt asset trước khi dựng scene.</p>

<h2><span class="num">00</span> Voiceover script (6 dòng, ~5s mỗi dòng)</h2>
<div class="vo"><span class="tag">Vivibe · voice EN</span> Một file VO đọc liền 6 dòng. Mỗi scene cắt theo khoảng lặng giữa các dòng.
<ol>${VO.map((l) => `<li>${esc(l)}</li>`).join('')}</ol></div>

<h2><span class="num">01</span> Beat sheet</h2>
<p class="lead">Mỗi dòng VO → scene nó tạo ra, chữ trên màn hình lấy thẳng từ dòng đó, và asset cần có.</p>
<table><thead><tr><th style="width:90px">Beat</th><th style="width:230px">Voiceover line</th><th>What it becomes on screen</th><th style="width:160px">Assets</th></tr></thead><tbody>
${SCENES.map((s, i) => `<tr><td><span class="tag">${s.n} · ${esc(s.beat)}</span></td><td class="line">"${esc(VO[i])}"</td><td>${esc(s.screen)} <span class="on">On screen: ${esc(s.onscreen)}</span></td><td>${s.assets.map((a) => esc(a[2])).join(' · ')}</td></tr>`).join('\n')}
</tbody></table>
<div class="note"><b>Không cần story gốc.</b> Toàn bộ scene đều là ảnh tĩnh + choreography. Mọi scene chạy chung 12fps posterize (stop-motion) và film treatment (grain, scan lines, vignette, grade).</div>

<h2><span class="num">02</span> Asset sheet</h2>
<p class="lead">Cut-out hiển thị trên nền caro để thấy đã tách nền. Click nguồn để xem license. Không dùng ảnh AI generate.</p>
${SCENES.map((s, i) => `<div class="scene"><div class="head"><span class="tag">Scene ${s.n}</span><span class="line" style="font-family:Georgia,serif;font-style:italic;color:#3a332c">"${esc(VO[i])}"</span></div>
<p class="desc">${esc(s.screen)}</p>
<div class="grid">${s.assets.map(([file, slug, label]) => `<div class="asset">${thumb(file)}<div class="meta"><b>${esc(file.split('/').pop())}</b><span class="lbl">${esc(label)}</span><br><span class="src">${src(slug)}</span></div></div>`).join('')}</div></div>`).join('\n')}

<div class="scene"><div class="head"><span class="tag">Film treatment</span> dùng chung cho cả 6 scene</div>
<div class="grid">${TEXTURES.map(([file, slug, label]) => `<div class="asset">${thumb(file)}<div class="meta"><b>${esc(file.split('/').pop())}</b><span class="lbl">${esc(label)}</span><br><span class="src">${src(slug)}</span></div></div>`).join('')}
<div class="asset"><div class="thumb" style="background:#111;color:#bbb;font-size:12px;padding:10px;text-align:center">scan lines · vignette · grade · gate-weave<br><small>vẽ bằng CSS, không cần file</small></div><div class="meta"><b>film-look.css</b><span class="lbl">wrapper HyperFrames</span></div></div>
</div></div>

<h2><span class="num">03</span> Khác so với video gốc</h2>
<table><thead><tr><th>Hạng mục</th><th>Video gốc</th><th>Bản này</th></tr></thead><tbody>
<tr><td>Render engine</td><td>Remotion (React)</td><td>HyperFrames (HTML + GSAP), <code>npx hyperframes render</code></td></tr>
<tr><td>Voiceover</td><td>ElevenLabs</td><td>Vivibe, voice tiếng Anh</td></tr>
<tr><td>Ảnh nhân vật</td><td>AI generate</td><td>Ảnh thật: Reed Hastings (Wikimedia CC BY), stock Pixabay. Cigar boss / exec là người mẫu stock, không phải nhân vật lịch sử.</td></tr>
<tr><td>Trang báo</td><td>3 ảnh riêng</td><td>1 ảnh báo cũ + headline dựng bằng HTML text</td></tr>
<tr><td>SFX / nhạc</td><td>ElevenLabs SFX</td><td>Pixabay sound effects (tải ở giai đoạn dựng)</td></tr>
</tbody></table>

<div class="approve"><b>Cần bạn duyệt</b><ul>
<li>Asset nào không ưng: nói tên file, mình tìm lại.</li>
<li>OK toàn bộ → mình bắt đầu: VO Vivibe → engine → 6 scene → render.</li>
</ul></div>
</div></body></html>`;
writeFileSync('assets-review.html', html);

const md = `# Storyboard · Netflix vs Blockbuster

Nguồn: video MoSidd (xem HUONG-DAN.md). Engine: HyperFrames. VO: Vivibe (voice EN).

## Voiceover (6 dòng)
${VO.map((l, i) => `${i + 1}. ${l}`).join('\n')}

## Beat sheet
| # | Beat | Trên màn hình | On screen | Assets |
|---|---|---|---|---|
${SCENES.map((s) => `| ${s.n} | ${s.beat} | ${s.screen} | ${s.onscreen} | ${s.assets.map((a) => a[0].split('/').pop()).join(', ')} |`).join('\n')}

## Timing (điền sau khi có vo.srt)
| Scene | VO start (s) | VO end (s) | Frame start | Frame end |
|---|---|---|---|---|
${SCENES.map((s) => `| ${s.n} | | | | |`).join('\n')}

## Film treatment (dùng chung)
grain.jpg (multiply, invert, brightness 1.35, contrast 1.02, 55%) · grunge.jpg (colour-burn 16%) · scan lines 1.6px/16%/8px · vignette 92%×82% · grade saturate .86 contrast 1.08 sepia .16 brightness .95 · gate-weave 5px @12fps, scale 1.012
`;
writeFileSync('STORYBOARD.md', md);
console.log('assets-review.html + STORYBOARD.md written');
