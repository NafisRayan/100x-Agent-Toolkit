# Chuyển động kiểu Vox

Đo từ short "How Vox makes images look like videos" (phase correlation giữa frame liên tiếp): dịch chuyển toàn khung = 0px. Vox không rung. Cảm giác "sống" đến từ dolly rất chậm và parallax, không phải jitter.

## Số đo áp dụng

| Thứ | Giá trị |
|---|---|
| Dolly toàn scene | trôi 10-22px theo x, 8-14px theo y, suốt scene, `ease:"sine.inOut"` |
| Zoom toàn scene | scale 1.012 → 1.035 (1.012 để mép không lộ khi trôi) |
| Parallax | nền zoom 1.0 → 1.08-1.12; nhân vật zoom 1.2-1.7 quanh điểm chân |
| Boil nhân vật | scale ±0.2%, xoay ±0.12°, chu kỳ 2.6s, sine, yoyo, repeat hữu hạn |
| Mây, tia sáng, giấy | trôi đều `ease:"none"` hoặc sine, biên độ nhỏ |
| Spring vào | `back.out(1.3)` 0.9s cho vật rơi; `back.out(2)` 0.3s cho chữ pop |

## Snippet dùng chung (đặt trong script mỗi scene)

```js
const DUR = 5.05, FPS = 30, k = 1;           // k < 1 khi prompt gốc dài hơn VO
const F = (f) => (f / FPS) * k;
const tl = gsap.timeline({ paused: true });
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function weave(el, seed){const r=rng(seed);tl.fromTo(el,{x:0,y:0,scale:1.012},{x:(r()*2-1)*22,y:(r()*2-1)*14,scale:1.035,duration:DUR,ease:"sine.inOut"},0)}
function boil(el, period, ds, dr, t0=0){const n=Math.max(0,Math.floor((DUR-t0)/period)-1);tl.fromTo(el,{scale:1-ds,rotation:-dr},{scale:1+ds,rotation:dr,duration:period,ease:"sine.inOut",yoyo:true,repeat:n},t0)}
weave("#sN-weave", 33);
boil("#sN-char", 2.6, .002, .12);
```

## Cấm

- Gate weave 5px @12fps, `SteppedEase`, posterize 12fps: nhìn như rung máy. Prompt gốc của MoSidd có mấy dòng này, bỏ hết.
- Random không seed. Mỗi seed khác nhau cho mỗi scene để dolly không giống nhau.
- Dolly quá 30px hoặc zoom quá 1.05 trong 1 scene: người xem thấy "đang zoom".
