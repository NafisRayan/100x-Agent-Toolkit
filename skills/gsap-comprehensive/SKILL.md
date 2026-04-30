---
name: gsap-comprehensive
description: Complete GSAP (GreenSock Animation Platform) skill covering all major features: core tweens, timelines, scroll animations, React integration, plugins, performance optimization, and utility functions. Use for any GSAP animation work across frameworks, scroll effects, complex sequences, and performance optimization.
---

# GSAP Comprehensive

## When to Use This Skill

Apply this skill for any GSAP-related work including:
- Core animations (tweens, timelines, sequencing)
- Scroll-driven animations with ScrollTrigger
- React/Vue/Svelte framework integration
- Plugin usage (Flip, Draggable, ScrollTo, etc.)
- Performance optimization
- Utility functions (clamp, mapRange, etc.)
- Responsive animations with matchMedia

## GSAP Overview

GSAP is a professional-grade JavaScript animation library that works in any framework (React, Vue, Svelte, vanilla JS). It's the default choice for complex animations that need:
- Timeline-based sequencing
- Scroll-driven effects
- Runtime control (pause, reverse, seek)
- Complex easing
- Cross-framework compatibility
- High performance

## Core Tween Methods

### Basic Animation Methods
- **gsap.to(targets, vars)** — Animate from current state to `vars` (most common)
- **gsap.from(targets, vars)** — Animate from `vars` to current state (good for entrances)
- **gsap.fromTo(targets, fromVars, toVars)** — Explicit start and end states
- **gsap.set(targets, vars)** — Apply immediately (duration 0)

### Common Properties
- **duration** — Seconds (default 0.5)
- **delay** — Seconds before start
- **ease** — String or function: `"power1.out"`, `"power3.inOut"`, `"back.out(1.7)"`, `"elastic.out(1, 0.3)"`, `"none"`
- **stagger** — Number (0.1) or object: `{ amount: 0.3, from: "center" }`, `{ each: 0.1, from: "random" }`
- **overwrite** — `false`, `true`, or `"auto"`
- **repeat** — Number or `-1` for infinite
- **yoyo** — Boolean; alternates direction with repeat
- **onComplete**, **onStart**, **onUpdate** — Callbacks
- **immediateRender** — Apply start state immediately (default for `from()`/`fromTo()`)

## Timelines and Sequencing

### Creating Timelines
```javascript
const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2.out" },
  paused: true,
  onComplete: () => console.log("Timeline complete")
});

// Add animations with position parameter
tl.to(".box1", { x: 100 })
  .to(".box2", { y: 100 }, "-=0.2")  // Start 0.2s before previous ends
  .to(".box3", { rotation: 360 }, "<");  // Start at same time as previous
```

### Timeline Methods
- **tl.to()**, **tl.from()**, **tl.fromTo()**, **tl.set()** — Add animations
- **tl.play()**, **tl.pause()**, **tl.reverse()**, **tl.restart()**
- **tl.seek(time)**, **tl.progress(value)** — Jump to position
- **tl.timeScale(value)** — Control playback speed
- **tl.duration()** — Get/set total duration
- **tl.add(callback, position)** — Add callback at position

### Position Parameter
- **`"<"`** — Start at same time as previous animation
- **`">"`** — Start after previous animation ends
- **`"+=1"`** — Start 1 second after previous
- **`"-=0.5"`** — Start 0.5 seconds before previous ends
- **`0.5`** — Absolute position in timeline

## ScrollTrigger (Scroll-Driven Animation)

### Basic Setup
```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",     // When top of box hits 80% of viewport
    end: "bottom 20%",    // When bottom of box hits 20% of viewport
    scrub: true,          // Smooth scrubbing
    markers: true         // Debug markers (remove in production)
  }
});
```

### ScrollTrigger Options
- **trigger** — Element that triggers the animation
- **start** — Start position (format: "element viewport")
- **end** — End position
- **scrub** — `true` (smooth), `1` (scrub for 1 second), or `false` (instant)
- **pin** — `true` (pin trigger), or duration in seconds
- **toggleActions** — Play sequence: "onEnter onLeave onEnterBack onLeaveBack"
  - Values: `"play"`, `"pause"`, `"resume"`, `"reset"`, `"restart"`, `"complete"`, `"reverse"`, `"none"`
- **anticipatePin** — Pre-calculate pinning (performance)

### Advanced ScrollTrigger Patterns
```javascript
// Parallax effect
gsap.to(".background", {
  yPercent: 50,
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// Horizontal scroll
const sections = gsap.utils.toArray(".panel");
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});
```

## React Integration

### useGSAP Hook (Recommended)
```javascript
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MyComponent() {
  useGSAP(() => {
    gsap.to(".box", { x: 100, duration: 1 });
  }, []);

  return <div className="box">Animate me</div>;
}
```

### useRef and useEffect Pattern
```javascript
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

function MyComponent() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, { x: 100, duration: 1 });
  }, []);

  return <div ref={boxRef} className="box">Animate me</div>;
}
```

### Cleanup Patterns
```javascript
useGSAP(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, containerRef);

  return () => ctx.revert(); // Cleanup
}, []);
```

## Vue and Svelte Integration

### Vue 3
```javascript
import { gsap } from "gsap";

export default {
  mounted() {
    gsap.to(this.$refs.box, { x: 100, duration: 1 });
  }
}
```

### Svelte
```javascript
import { onMount } from "svelte";
import { gsap } from "gsap";

let box;

onMount(() => {
  gsap.to(box, { x: 100, duration: 1 });
});
```

## GSAP Plugins

### Registering Plugins
```javascript
import { gsap } from "gsap";
import { ScrollTrigger, Flip, Draggable, ScrollToPlugin } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip, Draggable, ScrollToPlugin);
```

### Flip Plugin (Layout Transitions)
```javascript
// Capture state before layout change
const state = Flip.getState(".elements");

// Change layout (DOM manipulation)
document.querySelector(".container").classList.add("expanded");

// Animate from old to new state
Flip.from(state, {
  duration: 0.5,
  ease: "power2.out",
  stagger: 0.1
});
```

### Draggable Plugin
```javascript
Draggable.create(".box", {
  type: "x,y",
  bounds: ".container",
  inertia: true,
  onDragStart: function() {
    gsap.to(this.target, { scale: 1.1, duration: 0.2 });
  }
});
```

### ScrollToPlugin
```javascript
gsap.to(window, {
  duration: 1,
  scrollTo: { y: ".target-section", offsetY: 50 }
});
```

## Performance Optimization

### Key Performance Principles
1. **Use transforms over layout properties** — `x`, `y`, `scale`, `rotation` instead of `left`, `top`, `width`
2. **Animate fewer elements** — Use container animations when possible
3. **Use will-change sparingly** — Add only for heavy animations
4. **Batch DOM reads/writes** — GSAP handles this automatically
5. **Use scrub: true for scroll** — Better performance than scroll event listeners
6. **Disable ScrollTrigger when off-screen** — Use `refreshPriority` and ` anticipatePin`

### Performance Optimization Techniques
```javascript
// Use will-change for heavy animations
gsap.set(".heavy-element", { willChange: "transform, opacity" });

// Batch updates
gsap.batch(".elements", {
  onEnter: elements => {
    gsap.to(elements, { opacity: 1, y: 0, stagger: 0.1 });
  }
});

// Refresh priority for complex ScrollTriggers
ScrollTrigger.create({
  trigger: ".complex-section",
  refreshPriority: 1,
  pin: true,
  animation: tl
});
```

### matchMedia for Responsive Animations
```javascript
gsap.matchMedia().add("(min-width: 768px)", () => {
  gsap.to(".hero-text", { x: 100, duration: 1 });
}).add("(max-width: 767px)", () => {
  gsap.to(".hero-text", { y: 100, duration: 1 });
});
```

## Utility Functions

### Common Utils
```javascript
import { gsap } from "gsap";

// Clamp value between min and max
const clamped = gsap.utils.clamp(0, 100, 150); // 100

// Map range
const mapped = gsap.utils.mapRange(0, 100, 0, 1, 50); // 0.5

// Random
const random = gsap.utils.random(0, 100, 10, true); // Random between 0-100, step 10, return float

// Snap to nearest increment
const snapped = gsap.utils.snap(10, 27); // 30

// Wrap value within range
const wrapped = gsap.utils.wrap(0, 100, 150); // 50

// Convert to array
const elements = gsap.utils.toArray(".box"); // NodeList to Array

// Distribute values
const distributed = gsap.utils.distribute([0, 100], 5); // [0, 25, 50, 75, 100]

// Normalize
const normalized = gsap.utils.normalize(0, 100, 50); // 0.5

// Interpolate
const interpolated = gsap.utils.interpolate(0, 100, 0.5); // 50
```

## Best Practices

### DO
- Use camelCase for properties (`backgroundColor`, not `background-color`)
- Use transform aliases (`x`, `y`, `scale` instead of `translateX`, `scaleX`)
- Clean up animations with `tl.revert()` or `ctx.revert()`
- Use `stagger` for sequential element animations
- Use `overwrite: "auto"` for complex animations
- Test with `prefers-reduced-motion` media query

### DON'T
- Animate layout-triggering properties (`width`, `height`, `top`, `left`)
- Create unlimited animations without cleanup
- Use `overwrite: true` unnecessarily (kills all tweens)
- Forget to register plugins before use
- Use complex CSS selectors repeatedly (cache selectors)
- Ignore mobile performance

### Accessibility
```javascript
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

gsap.to(".element", {
  x: 100,
  duration: prefersReducedMotion ? 0 : 1,
  ease: prefersReducedMotion ? "none" : "power2.out"
});
```

## Debugging

### Enable Markers (Development Only)
```javascript
ScrollTrigger.create({
  trigger: ".box",
  markers: true,  // Shows start/end points
  id: "box-scroll" // Helps identify in console
});
```

### Common Issues
- **Animations not working**: Check if plugins are registered
- **ScrollTrigger not firing**: Verify trigger element exists and is visible
- **Performance issues**: Use Chrome DevTools Performance tab, reduce element count
- **Mobile issues**: Test on actual devices, reduce complexity

## Migration from Other Libraries

### From CSS Animations
```javascript
// CSS
.element { animation: slideIn 0.5s ease-out; }

// GSAP
gsap.to(".element", { x: 100, duration: 0.5, ease: "power2.out" });
```

### From Framer Motion (React)
```javascript
// Framer Motion
<motion.div animate={{ x: 100 }} />

// GSAP
useGSAP(() => {
  gsap.to(ref.current, { x: 100 });
}, []);
```

## Resources

- Official docs: https://greensock.com/docs/
- ScrollTrigger docs: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- React docs: https://greensock.com/docs/v3/Plugins/ReactGSAP
- Community forum: https://greensock.com/forums/
