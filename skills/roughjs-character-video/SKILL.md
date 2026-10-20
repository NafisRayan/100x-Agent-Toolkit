---
name: roughjs-character-video
description: >-
  Generate hand-drawn, story-driven character animations (MP4 video) and
  single-frame illustrations (PNG) entirely in code using rough.js, a node
  canvas and ffmpeg. Use when asked for an animated video/cartoon of people
  doing things (shopping, walking, giving gifts, hugging), or a hand-drawn
  still image of characters, where everything must be produced
  programmatically. Single images reuse the same rig and render one frame via
  the PNG debug mode. Reference implementation: make_video_v2.js ("A Dad's
  Surprise").
---

# Skill: rough.js character video (programmatic, hand-drawn look)

Deliverables every time: (1) the generator script (one `.js` file), (2) the rendered `.mp4` (or `.png` for a still image request). Nothing is drawn by hand or edited manually. Re-running the script must reproduce the output exactly.

## 1. Stack and setup
- Node 18+, `npm i roughjs @napi-rs/canvas` (pure npm, no native build). ffmpeg must exist on PATH.
- Draw with `rough.canvas(canvas)` on an `@napi-rs/canvas` canvas. 960x540, 24 fps.
- Pipe raw RGBA frames to ffmpeg (no PNG files):
  `ffmpeg -y -f rawvideo -pix_fmt rgba -s 960x540 -r 24 -i - -c:v libx264 -pix_fmt yuv420p -crf 18 out.mp4`
  Write `canvas.data()` to `ff.stdin`, honour back-pressure (`await once('drain')`), call `stdin.end()` and await ffmpeg `close`.
- Font: register one TTF with `GlobalFonts.registerFromPath(...)` (e.g. Poppins-Bold). Always give a fallback stack.
- Debug mode: `PNG=<seconds> node script.js` renders ONE frame to `debug.png`. It must pre-render the previous ~24 frames first so memoised joints are warm. Always look at frames from every scene before the full render.
- For a still image request: pick the key moment, use the same `PNG=<seconds>` path, and deliver `debug.png` (renamed appropriately) as the final image instead of rendering an mp4.
- Run the full render in the FOREGROUND (`timeout 280 node script.js out.mp4`). Background jobs are killed when the tool call ends. ~850 frames takes ~1-2 min.

## 2. The hand-drawn look (do not skip)
- Wrap every rough call in helpers (`line, rect, circ, ell, poly, arc, lpath`) that merge a base option set and a **seed**:
  `base = {roughness:1.15, bowing:0.8, strokeWidth:2.2, stroke:'#2b2b2b'}`.
- **Line boil**: per frame reset a draw counter `idc = 0` and set `wob = floor(T*8)`. Seed = `((++idc*7919 + wob*104729) % 2147483000) + 1`. Shapes keep stable seeds for 3 frames then re-jitter, which looks like hand-drawn animation. Draw order must be deterministic so ids stay stable.
- Characters/props use `fillStyle:'solid'`. Large backgrounds use `'hachure'` for texture. **Hachure fills are see-through**: draw a solid rect of the same area first if something behind must be hidden (e.g. counter hiding a shopkeeper's legs).
- Joint seams: draw a filled circle with `stroke:'none'` at each limb end so seams vanish.
- Use `ctx.save(); translate; rotate; ...; restore()` around rough calls for rotated props (bag swing, head tilt, hearts); rough respects the transform.
- Use `ctx.globalAlpha` for fades/bubbles. Fade each scene in/out through black for 0.4 s.
- For still images: use a fixed seed (no boil) so the single frame has one coherent jitter, and pick a frame where poses read clearly (mid-gesture, not transition).

## 3. Character rig (the part that makes people look detailed)
Never draw people as stick figures or single lines. Use a skeleton:

**Proportions (units at s=1)**: thigh 36, shin 33, ankle height 7, torso 56, neck+head radius 21, upper arm 27, forearm 25. Adults s≈1.25. Kids: same rig with `headK 1.3, torsoK .86, legK .82, armK .84` and s 0.85-1.0 (big heads read as children).

**Two-bone IK** for every arm and leg:
```js
function ik(a,t,l1,l2,bend){ const dx=t.x-a.x,dy=t.y-a.y,dist=Math.hypot(dx,dy)||1e-3;
  const dd=clamp(dist,Math.abs(l1-l2)+.01,l1+l2-.01), ux=dx/dist, uy=dy/dist;
  const aa=(l1*l1-l2*l2+dd*dd)/(2*dd), h=Math.sqrt(Math.max(0,l1*l1-aa*aa));
  return {mid:{x:a.x+ux*aa-uy*h*bend, y:a.y+uy*aa+ux*h*bend}, end:{x:a.x+ux*dd,y:a.y+uy*dd}}; }
```
Knees: `bend = -facing`. Elbows: `bend = +facing` (elbow points backward).

**Walk cycle (foot-planted, no sliding)**:
- Near foot phase = `ph`, far foot = `ph+PI`. Foot x = `x + d*stride*sin(p)`; lift = `max(0,cos p)*liftH`; foot angle (toe-down +) = `-0.5*sin p` while swinging, `0.4*max(0,-sin p)` at toe-off.
- Phase from distance travelled: `ph = distance/(4*stride)*2PI` with `stride = 26*s*legK`. For a scrolling world use `distance = speed*t`.
- Blend idle stance to gait with `move = clamp(speed/60)`. Get `speed` from numeric derivative of an **eased** position (`kfE`: per-segment smoothstep keyframes, so speed is 0 at every stop and the character accelerates/decelerates naturally).
- **Hip height is solved, not hard-coded**: `hip = ankleH + min over feet( footLift + sqrt(reach^2 - dx^2) )` with `reach = 0.97*(L1+L2)`. This gives natural body bob, and crouching is just `drop` subtracted from hip height (knees bend automatically via IK).
- Run: `run=1` gives stride x1.25, higher lift, forward lean, bent arms (arm r ~0.6).
- Jump: `jump(t)` returns `{air, drop}` (crouch, airborne with tucked feet via `air*0.55` foot lift, landing squash).

**Torso**: 10-point rough polygon rotated by `lean` about the hip using basis `f=[d cos l, sin l]`, `u=[d sin l, -cos l]` (`TP(lx,ly)=hip+f*lx+u*ly`). Add outfit details by style: collar, buttons, belt+buckle, pocket (dad); round collar, waist ribbon, A-line dotted skirt that sways with the walk (girl); star emblem + crew neck (boy); apron + pocket (shopkeeper).

**Arms** are specs `{a, r, x, y, w}`: polar rest pose (`a` angle from straight down, `r` fraction of arm length) blended by weight `w` toward an absolute world target `(x,y)`. This one mechanism handles carrying, swinging, reaching for shelf items, paying, handing over a bag, waving, hugging. `walkArms(ph,move,run)` returns opposite-swinging defaults. Sleeves cover a fraction of the upper arm (`sleeve`), skin shows below; optional watch; hand = palm circle + thumb circle.

**Draw order**: shadow ellipse, far arm (shade 0.82), far leg (0.8), near leg, torso+outfit, neck, head, near arm. Far limbs are `shade(color, .8)`.

**Head** (in head-local coords, translated and rotated by `tilt`): back hair/pigtails, head ellipse, ear, blush (kids), two eyes (white + pupil that follows `look`), eyebrows driven by `brow`, nose polyline, mouth (smile arc, open ellipse with teeth line for `open`, frown), front hair polygon (styles `dad, boy, girl, bun`), glasses, hair-tie details. Facing is a signed `d` multiplying every x offset; `d=-1` mirrors the whole character.
- Blink: `((t+seed*1.37)%3.4) < 0.14`.
- Breathing/idle: tiny `0.015*sin(2.2t)` lean, head tilt wobble.

Each figure returns joints `{hN,hF,headC,S,neck,hip}` and stores them in a memo `M[id]` so later code (hands, hugs, handoffs, flights) can target where limbs were last frame. Use memo only for targets; attach held items to the CURRENT frame's returned hand so nothing lags.

## 4. Props and interactions
- Items hang from a pivot at the handle apex, which is where the hand grips (bag, basket). Swing them with `0.1*sin(phase)*move`.
- Transfers use `flight(type, from, to, u, scale, arcHeight)` = smoothstep lerp with a sine arc. Landing point is the receiver's hand/pivot, then the item attaches to the hand.
- Every handoff has three coordinated parts: giver's arm weight window, receiver's arm weight window, item flight. Windows are smooth (`win(t,a,b,r)` or `bump(t,tp,before,after)`), never step changes.
- Item lifecycle example: shelf -> basket -> paper bag -> carried -> kids' hands -> dropped on grass. Compute visibility from timestamps, so each item is drawn exactly once per frame.
- Put exact event times in constant arrays at the top of each scene (e.g. `TPs`, `BAGT`, `GIVES`) and derive everything from them.

## 5. Story structure that works
Total 30-40 s, 3 scenes, each with its own function `sceneX(t)` using LOCAL time:
1. Setup/action with a clear verb sequence (enter, pick x4, walk to counter, put basket down, pay, bagging, hand-off, thank/wave, exit).
2. Travel: scrolling parallax (hills, houses, trees, lamp posts, birds, road dashes), sky shifting toward sunset, walk cycle locked to scroll speed, a thought bubble previewing the payoff.
3. Payoff: arrival, door opens, kids run out (run cycle), kneel, give items one by one, kids jump, hug, hearts, speech bubbles, "THE END".
Captions at the bottom (26 px) change per phase; a title card fades at the start. Compositor picks the scene from global time and applies fade overlays.
For a still image: skip the scene timeline; compose one moment with the same visual language (background, characters, props, caption/speech bubble as needed).

## 6. Workflow checklist
1. Install deps, confirm ffmpeg.
2. Write the single script (helpers, props, rig, styles, scenery, scenes, compositor, encoder).
3. Render debug PNGs at the key moments of every scene (action peaks, handoffs, the hug) and LOOK at them. Fix overlaps, reach distances, clipping, see-through fills.
4. Full render in foreground, verify with `ffprobe` (duration, frames) and pull 1-2 frames with `ffmpeg -ss`.
5. Deliver script + mp4 (copy to the outputs folder and present both). Say what the video shows in a few lines. For an image request, deliver script + png instead.

## 7. Known pitfalls
- Arms folding weirdly: targets closer than `|l1-l2|` fold the arm. Place hand-off points 40-65 px from the shoulder and make characters stand where both can reach.
- Foot sliding: always derive phase from real distance; never use time unless the world scrolls at a known speed.
- Teleporting items: make flight end at the receiver's catch point, keep the arm target equal to that point, and attach after landing.
- Mid-stride freeze: never freeze phase when stopping; blend to idle with `move`.
- Characters standing "behind" a counter: draw the person first, then the solid counter, then props on it, then the foreground character.
- Don't narrate tool steps to the user; just deliver code and video.

## 8. Adapting to a new story
Keep helpers, rig, `figure()`, styles and compositor unchanged. Change: style objects (colors, hair, outfit), scene functions, event arrays, captions, speech bubbles. New outfits go in the `S.outfit` branch of `figure()`; new props go beside `bag/basket/toy`. Keep the same visual language: warm palette, thick dark rough outlines, hachure backgrounds, solid-filled characters, soft ground shadows.
