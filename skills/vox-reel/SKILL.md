---
name: vox-reel
description: Dựng reel dọc 30s phong cách Vox (ảnh thật tách nền, film look, dolly chậm, voice AI, subtitle 2-3 từ) bằng HyperFrames + Vivibe, không dùng AI tạo ảnh. Dùng khi user nói "làm reel kiểu Vox", "video explainer từ ảnh", "làm video như MoSidd/Netflix Blockbuster", hoặc đưa một câu chuyện ngắn muốn kể bằng video ảnh động.
---

# vox-reel: reel 30s kiểu Vox bằng HyperFrames + Vivibe

Một reel = 6 dòng voiceover, mỗi dòng là 1 scene 4-6s. Ảnh thật tải từ Wikimedia/Pixabay, tách nền bằng rembg, dựng bằng HTML + GSAP (HyperFrames), voice bằng Vivibe, subtitle sinh từ file srt. Không generate ảnh bằng AI.

Cần có sẵn: Node 22+, Python 3 + `rembg` + `Pillow`, `ffmpeg`, Chrome. Key trong `.env` (xem `.env.example`): `PIXABAY_API_KEY`, `VIVIBE_API_KEY`, `VIVIBE_VOICE`. Đọc `references/pitfalls.md` trước khi viết HTML lần đầu.

## 2 điểm dừng bắt buộc

Dừng và chờ user duyệt ở 2 chỗ. Không được đi tiếp khi chưa có OK.

1. **Sau assets**: mở `assets-review.html` cho user xem beat sheet + từng cutout trên nền caro.
2. **Sau mockup**: mỗi scene 1 file HTML tĩnh + 1 ảnh PNG (frame đại diện) trong `mockups/`. User duyệt bố cục rồi mới viết animation.

## Quy trình

### 1. Script + beat sheet

- Viết 6 dòng VO tiếng Anh, mỗi dòng 10-20 từ, một ý. Dòng cuối là punchline.
- Điền `STORYBOARD.md` theo `templates/STORYBOARD.md`: Beat / VO / Trên màn hình / Assets. Mỗi scene chọn 1 kỹ thuật chính từ `references/scene-prompts.md` (weld-detach, screen blend, spring-in, parallax + bóng, đèn vẽ bằng code, tái dùng rig).

### 2. Assets thật, tách nền

```
node scripts/fetch-wikimedia.mjs cand <slug> "<query>"      # người thật, công trình, logo (có license)
node scripts/fetch-pixabay.mjs cand <slug> "<query>" [photo|video] [vertical|horizontal]
py -3 scripts/montage.py <slug>                              # ghép ứng viên có đánh số để chọn
node scripts/fetch-pixabay.mjs pick <slug> <i> assets/raw/<slug>.jpg
py -3 scripts/remove-bg.py assets/raw/x.jpg assets/sceneN/x.png [u2net|u2net_human_seg|isnet-general-use] [maxpx] [nomat]
py -3 scripts/checker-sheet.py assets/_check.jpg assets/scene*/*.png
```

Quy tắc: người thật dùng `u2net_human_seg` + `nomat` (alpha matting làm mờ viền). Đồ vật nền trắng: flood-fill từ mép bằng PIL thay vì rembg. Mọi file ghi vào `assets/_manifest.json` (slug, url, tác giả, license). Ảnh CC BY phải có tác giả trong credit. Texture `grain.jpg`, `grunge.jpg` bắt buộc (Pixabay "film grain", "grunge texture").

Sinh trang duyệt: sửa mảng VO/beat ở đầu `scripts/build-review.mjs` rồi `node scripts/build-review.mjs`. **Dừng 1.**

### 3. Voice Vivibe

```
node scripts/tts-vivibe.mjs vo.txt assets/audio/vo.mp3     # ra vo.mp3 + vo.srt
```

Mốc cắt scene = khoảng nghỉ giữa các dòng trong `vo.srt`. Ghi vào bảng Timing của `STORYBOARD.md`: start, duration từng scene, tổng = duration root (làm tròn lên 0.5s).

### 4. Mockup tĩnh rồi mới dựng scene

- `mockups/sceneN.html`: bố cục cuối của scene (frame đẹp nhất), dùng chung `film-look.css`. Chụp PNG. **Dừng 2.**
- Project: `npx hyperframes@0.8.38 init <ten>`, copy `assets/` vào. Root `index.html` theo `templates/index.html`. Mỗi scene 1 file `compositions/sceneN.html` theo `templates/scene.html`: `<template>` bọc `#root`, style + script bên trong template, 1 GSAP timeline paused, đăng ký `window.__timelines["sceneN"]`.
- Trong script mỗi scene có `F = (f) => f / 30 * k` để ra lệnh theo số frame như prompt gốc, `k` nén prompt cho khớp thời lượng VO.
- Film look 4 lớp + grade: `references/film-look.md`. Chuyển động: `references/motion-vox.md`, tuyệt đối không gate-weave, không stepped ease.

### 5. Subtitle + audio

```
node scripts/build-captions.mjs assets/audio/vo.srt compositions/captions.html <tổng giây>
```

Host `#host-captions` z-index cao nhất, phủ 0 đến hết. Audio: `vo` volume 1, `bgm` 0.2-0.25, sfx (whoosh, impact, pop từ Pixabay) tại mốc beat. Mỗi `<audio>` có `id` riêng và `data-track-index` riêng.

### 6. Check, preview, render

```
npx hyperframes@0.8.38 check                 # phải "Check passed"
npx hyperframes@0.8.38 preview --background  # Studio cho user xem
npx hyperframes@0.8.38 render --fps 30 --quality high --low-memory-mode -o out/reel.mp4
ffmpeg -i out/reel.mp4 -c:v libx264 -crf 20 -preset slow -movflags +faststart out/reel-web.mp4
```

Sau render: trích 7 frame làm contact sheet, xem có subtitle đè text scene không. Ghi credit (nhạc, ảnh CC BY) vào file cạnh video.

## Quy tắc không thương lượng

- Không AI generate ảnh. Không dùng ảnh không rõ license.
- Không `Math.random`, `Date.now`, `repeat:-1`. Random dùng `rng(seed)` trong template.
- Không đặt CSS `transform` lên node GSAP sẽ tween.
- Chuyển động: 1 dolly chậm mỗi scene, 0px jitter. Xem `references/motion-vox.md`.
- Ổ đĩa temp còn dưới 5GB thì render với `--low-memory-mode`.
