# Lỗi gặp thật và cách sửa

## HyperFrames lint / check

| Lỗi | Nguyên nhân | Sửa |
|---|---|---|
| `gsap_css_transform_conflict` | CSS `transform` trên node GSAP tween x/y/scale | Bỏ CSS transform, đặt trạng thái đầu bằng `fromTo` |
| `media_missing_id` | `<audio>` không có `id` | Mỗi audio 1 id riêng, không thì render câm |
| duplicate audio track | 2 audio cùng `data-track-index` | Mỗi audio 1 track index riêng (10, 11, 13, 14...) |
| `video_nested_in_timed_element` | `<video data-start>` nằm trong div cũng có `data-start` | Timing đặt 1 chỗ, video hoặc wrapper |
| `standalone_composition_wrapped_in_template` | root `index.html` bọc `<template>` | Chỉ sub-composition mới bọc template |
| `font_family_without_font_face` | dùng font tên riêng không có `@font-face` | Khai `@font-face` trỏ file trong `assets/fonts/` |
| `content_overlap`, `overflow`, `occlusion` (layout) | text/prop đè nhau có chủ ý | Thêm `data-layout-allow-overlap` / `-overflow` / `-occlusion` lên element đó |
| repeated `fromTo` baseline | 2 `fromTo` cùng element cùng thuộc tính | `tl.set` trạng thái đầu rồi `tl.to`, hoặc `immediateRender:false` |
| `studio_missing_editable_id` | host sub-comp không có `id` | Đặt `id="host-sceneN"` |

Một lỗi lint làm tắt luôn layout/contrast audit: `check` báo `0 sample(s)` nhìn như sạch nhưng chưa chạy gì. Xoá hết lint error trước.

## Sub-composition

- `<style>` và `<script>` phải nằm **trong** `<template>`, ngoài thì bị bỏ khi assemble.
- `window.__timelines["sceneN"]` = `data-composition-id` của `#root` trong template = `data-composition-id` của host.
- `#root` của sub-comp dùng `inset:0`, không hardcode 1080px/1920px.
- Timeline dài hơn `data-duration` bị cắt, ngắn hơn thì giữ frame cuối.
- `fromTo` render ngay giá trị `from` ở frame 0 (immediateRender). Vật cần ẩn trước khi vào: `tl.set(el,{scale:0},0)` rồi `tl.to` sau.

## Assets

- rembg alpha matting làm mờ nền quanh tóc/tay: người thật dùng `u2net_human_seg` + tham số `nomat`.
- Đồ vật nền trắng (khung, bàn tay foam): flood-fill từ 4 mép bằng PIL, không rembg.
- Wikimedia SVG: lấy `thumburl` qua API với `iiurlwidth=1600`, đừng tải link thumb trực tiếp (400).

## Render

- Ổ C còn dưới 5GB: render lỗi vì hết temp. Xoá `%TEMP%\hf-render-*`, chạy với `--low-memory-mode`.
- File master 100MB: nén web `ffmpeg -crf 20 -preset slow -movflags +faststart`.
- Playwright không mở được `file://`: chạy `python -m http.server 8899` rồi chụp qua localhost.

## Subtitle

- Caption pill ở y≈1520 đè lên text scene ở đáy: dời text scene lên trên hoặc đặt caption thấp hơn.
- Timing chia theo số ký tự trong từng dòng srt. Muốn chính xác từng từ: `npx hyperframes transcribe vo.mp3` rồi build lại từ transcript.
