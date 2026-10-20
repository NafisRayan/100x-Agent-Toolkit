# 6 kỹ thuật scene (prompt gốc MoSidd, đã chuyển sang HyperFrames)

Mỗi prompt ra lệnh theo số frame @30fps. Trong file scene dùng `F(frame)` để đổi ra giây, `k` để nén khi VO ngắn hơn prompt. Mọi "12fps posterize / gate weave / stepped boil" trong bản gốc đã bỏ, thay bằng `references/motion-vox.md`.

## 1. Weld and detach (zoom xuyên khung ảnh)

Assets: bg building, portrait cutout, gold-frame.png, wall.jpg, cloud1/2.png.

```
Compose a black-and-white framed photo (character in front of the building) inside the gold frame on a paper wall, small serif plaque "In 2000" beneath. Then fly THROUGH the frame:
- Slow push: wall scale 1.0 -> 1.16 over frames 0-46.
- Zoom-through: from frame 46 accelerate wall scale to ~6.8x by frame 76.
- Weld: until frame 62 lock photo + frame as one unit (content scale = 0.369 x wall scale).
- Detach: after 62 keep the frame flying out past the edges; photo settles 0.75 -> 1.0 by frame 72 and cross-fades from B&W to colour.
- Motion blur burst 0 -> 9px -> 0 across frames 54/61/72. Wall + plaque blur 0 -> 8px and fade over 52-72.
- Clouds behind the building drift left: cloud1 0 -> -525px over the scene, cloud2 at 0.6x speed.
- Portrait boil: scale +/-0.2%, sway +/-0.12deg, slow sine.
Serif-italic captions reveal over the settled building. Wrap in the film look.
```

Điểm chết: khung và ảnh phải dính làm một tới frame 62. Tách sớm là hỏng ảo giác.

## 2. Screen blend cho khói + slot machine

Assets: boss.png (cutout), hand-left/right.png, logo.png, smoke.mp4 (khói trên nền đen).

```
Backdrop: red sunburst, radial gradient #a01218 -> #7c0d12 -> #58080c with faint rays rotating slowly.
- Boss rises with a spring around frame 84, punches in to 1.09x over 96-116, holds with gentle sway.
- Smoke: <video> with mix-blend-mode screen so black drops out; crush contrast (contrast 1.7, brightness 1.15); feather the top with a mask gradient; anchor base to the cigar; move it with the boss.
- Props: logo hand slides in from one edge at frame 17, cash hand from the other at 47, each framed by a dashed wireframe diamond that draws on (stroke-dashoffset) and wobbles +/-0.5deg.
- "50 MILLION": slot reel spins billion / dollars / trillion over frames 72-82 and slams to MILLION.
- Marigold caption box pops "laughed" then "them out" over 130-163.
- Punctuation: at 165 flicker the frame to negative in 2-3 frame bursts (tl.set on the grade filter); at 174 push the boss to B&W and glow red light out of the eyes.
```

Điểm chết: screen blend chưa đủ, phải crush contrast về đen tuyệt đối rồi feather cạnh trên. `<video>` phải có `data-start`/`data-duration` và không nằm trong wrapper cũng có `data-start`.

## 3. Newspaper spring-in

Assets: wood-desk.jpg, newspaper-blank.jpg (headline dựng bằng HTML text đè lên).

```
Open on the desk with a focus-hunt (blur 12px clearing over ~14 frames) and a slow Ken-Burns push 1.08 -> 1.2. Drop three papers one at a time, each on a soft spring (back.out(1.3), 0.9s), scaling 1.1 -> 1.0 as it lands, then a subtle +/-0.15deg boil:
- Paper 1 from the LEFT at frame 20: starts far off-screen left and low, rotated -26deg, settles at -7deg.
- Paper 2 from the RIGHT at frame 60: lands on top at +6deg.
- Paper 3 from the BOTTOM at frame 100: lands on top at -3deg.
- Serif-italic caption at the top fades in early, out by frame 48.
```

Điểm chết: 3 tờ cùng lúc cùng hướng nhìn rẻ tiền. Stagger + đổi hướng.

## 4. Parallax + bóng đổ tự chế

Assets: storefront bg, character cutout đứng.

```
Anchor everything to one ground point at the character's feet (~x560 / y1690).
- Parallax punch: bg scale 1.0 -> 1.12 over frames 8-80 easing out. Character scale 1.0 -> 1.2-1.7 over 0-58 around his feet (transform-origin at the feet), drifting toward camera.
- Shadow IS the character: a div with the same PNG as background, filter brightness(0) blur(7px), opacity .55, then tl.set scaleY:-.55 skewX:-53 so it lies on the ground. No separate shadow asset.
- Left text stack "closed a / 1000 / stores" from frame 24, one line every 6 frames, then fade to 30%.
- The shift: around frame 60 slide the character ~235px left with a blur streak peaking mid-move.
- Right text "declared bankruptcy" over 70-78 with a hand-drawn yellow underline drawing on.
Grade: saturate .62 contrast 1.12 sepia .06 brightness .94.
```

## 5. Đèn vẽ bằng code

Assets: office bg, character ngồi, cash cutout, lamp cutout.

```
- Lamp light at the bulb (~x590 / y345): four radial gradients on screen blend (white-hot core, warm bloom halo, flat glow at the shade mouth, big faint spill) + one blurred funnel beam down behind the character, side-masked. Parent all to the lamp group and swing +/-3deg over ~2s.
- On defocus, bloom the core to 2.4x and grow the halo.
- Cash highlight: duplicate the cash, filter sepia(1) saturate(5) hue-rotate(18deg), flicker with hold keyframes (tl.set on/off): on 23-28, off 29-31, on 32-61, off 62-63, on 64-71.
- Headline serif-italic "Forty five / billion / dollars in revenue" staggered 9 -> 54, yellow pencil oval scribbles around "billion" over 31-40 (SVG stroke-dashoffset).
- Camera: open 0.88x defocused, whoosh to 1.0 by frame 21, dip out of focus 43-63, creep to 1.08 on the money shot.
Grade: saturate .82 contrast 1.06 sepia .14 brightness .93.
```

## 6. Tái dùng rig scene 4

```
Duplicate scene 4's rig. Swap the bg and the character. Same punch, same cast shadow, same framing. Add one new prop (a red foam finger that wags "no" on the word itself: tl.set scale 0, pop with back.out(2.2) at the word, then rotation yoyo x5 with immediateRender:false).
```

Dựng 1 lần, tái dùng vô hạn. Đây là lý do pipeline này scale.
