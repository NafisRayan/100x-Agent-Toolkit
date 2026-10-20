# Film look (dùng chung cho mọi scene)

Bốn lớp overlay phủ trên cùng + 1 grade filter ở wrapper ngoài. Copy nguyên block CSS vào `<style>` trong template của từng scene, đổi `sN` thành số scene.

```css
#root{position:absolute;inset:0;overflow:hidden;background:#000}
#sN-grade{position:absolute;inset:0;filter:saturate(.86) contrast(1.08) sepia(.16) brightness(.95)}
#sN-weave{position:absolute;inset:0}          /* GSAP dolly tween lên đây */
.fx{position:absolute;inset:0;pointer-events:none}
.scan{background:repeating-linear-gradient(to right,rgba(0,0,0,.16) 0 1.6px,transparent 1.6px 8px);filter:blur(.7px)}
.grain{background:url(assets/textures/grain.jpg) center/1024px;mix-blend-mode:multiply;filter:invert(1) brightness(1.35) contrast(1.02);opacity:.55}
.grunge{background:url(assets/textures/grunge.jpg) center/cover;mix-blend-mode:color-burn;opacity:.16}
.vig{background:radial-gradient(ellipse 92% 82% at 50% 48%,transparent 55%,rgba(0,0,0,.5) 100%)}
```

```html
<div id="root" data-composition-id="sceneN" data-width="1080" data-height="1920">
  <div id="sN-grade"><div id="sN-weave">
    <!-- nội dung scene -->
  </div></div>
  <div class="fx scan"></div><div class="fx grain"></div><div class="fx grunge"></div><div class="fx vig"></div>
</div>
```

## Grade theo cảm xúc

| Scene | filter |
|---|---|
| Mặc định | `saturate(.86) contrast(1.08) sepia(.16) brightness(.95)` |
| Buồn, sụp đổ | `saturate(.62) contrast(1.12) sepia(.06) brightness(.94)` |
| Ấm, thành công | `saturate(.82) contrast(1.06) sepia(.14) brightness(.93)` |

## Ghi chú

- Overlay `.fx` nằm ngoài `#sN-weave` nên grain không trôi theo dolly, giống grain thật của phim.
- Nháy âm bản (punctuation): `tl.set("#sN-grade",{filter:"invert(1) hue-rotate(180deg) " + norm}, F(a)); tl.set(...,{filter:norm}, F(b))` từng cặp 2-3 frame.
- Focus-hunt: tween `filter:"blur(12px)"` → `blur(0px)` trên wrapper camera trong 14 frame, không tween trên `#sN-grade` vì đang giữ grade filter.
- Texture: `grain.jpg` 1024px lặp, `grunge.jpg` phủ cover. Cả 2 lấy từ Pixabay hoặc tự sinh bằng PIL noise.
