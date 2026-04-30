---
name: animation-timing
description: Complete animation timing guide covering instant, micro, small, medium, large, slow, and dramatic animations. Includes duration recommendations, easing functions, and use cases for all timing ranges from 0-100ms to 2000ms+.
---

# Animation Timing

## When to Use This Skill

Apply this skill when determining animation duration and pacing for:
- Micro-interactions (hover states, button clicks)
- UI transitions (modals, dropdowns, page changes)
- Content reveals (hero animations, loading states)
- Storytelling moments (cinematic sequences, brand reveals)
- Performance optimization (appropriate durations for context)
- Accessibility considerations (reduced motion preferences)

## Timing Principles

### Core Timing Rules
1. **Match duration to purpose** — Quick for feedback, slow for emphasis
2. **Respect user attention** — Don't waste time on trivial animations
3. **Consider performance** — Longer animations cost more resources
4. **Follow platform conventions** — Match user expectations
5. **Test with real users** — Adjust based on feedback

### The 100ms Rule
- **Under 100ms**: Feels instant
- **100-300ms**: Feels responsive but perceptible
- **300-500ms**: Feels deliberate and intentional
- **500-1000ms**: Feels substantial and meaningful
- **1000ms+**: Feels cinematic or loading-related

## Duration Categories

### Instant (0-100ms)
**Purpose**: Immediate feedback that should feel instant

**Use Cases**:
- Button press states
- Toggle switches
- Checkbox/radio button states
- Input field focus states
- Cursor changes
- Hover states on interactive elements

**Examples**:
```css
/* Button press */
.button:active {
  transform: scale(0.95);
  transition: transform 50ms;
}

/* Toggle switch */
.toggle.checked {
  transform: translateX(100%);
  transition: transform 80ms;
}

/* Input focus */
input:focus {
  border-color: blue;
  transition: border-color 100ms;
}
```

**React (Framer Motion)**:
```javascript
<motion.button
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.05 }}
>
  Click me
</motion.button>
```

**Accessibility**: Use `prefers-reduced-motion` to disable or speed up

### Micro (100-200ms)
**Purpose**: Quick feedback that's perceptible but fast

**Use Cases**:
- Tooltips appearing
- Dropdown menus opening
- Small hover effects (cards, links)
- Icon animations (loading, success)
- Form validation feedback
- Notification badges

**Examples**:
```css
/* Tooltip */
.tooltip {
  opacity: 0;
  transform: translateY(5px);
  transition: opacity 150ms, transform 150ms;
}
.tooltip.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Dropdown */
.dropdown {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 180ms, transform 180ms;
}
.dropdown.open {
  opacity: 1;
  transform: scale(1);
}
```

**GSAP**:
```javascript
gsap.to(".tooltip", {
  opacity: 1,
  y: 0,
  duration: 0.15,
  ease: "power2.out"
});
```

### Small (200-300ms)
**Purpose**: Noticeable transitions for conscious user actions

**Use Cases**:
- Modal/appearance animations
- Card expansions
- Navigation transitions
- Tab switching
- Accordion open/close
- Sidebar slide-in/out

**Examples**:
```css
/* Modal */
.modal {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
  transition: opacity 250ms, transform 250ms;
}
.modal.open {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Navigation */
.nav-item {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 250ms, transform 250ms;
}
.nav-item.visible {
  opacity: 1;
  transform: translateX(0);
}
```

**React (Framer Motion)**:
```javascript
<motion.div
  initial={{ opacity: 0, scale: 0.9, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.25 }}
>
  Modal content
</motion.div>
```

### Medium (300-500ms)
**Purpose**: Standard animations for significant UI changes

**Use Cases**:
- Page transitions
- Content loading states
- Image gallery transitions
- Filter/sort animations
- Form step transitions
- Dashboard widget updates

**Examples**:
```css
/* Page transition */
.page-enter {
  opacity: 0;
  transform: translateX(30px);
}
.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 400ms, transform 400ms;
}

/* Loading state */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 400ms infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**GSAP**:
```javascript
gsap.fromTo(".page-content",
  { opacity: 0, x: 30 },
  { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
);
```

### Large (500-800ms)
**Purpose**: Hero transitions and complex reveals

**Use Cases**:
- Hero section animations
- Product showcases
- Feature reveals
- Data visualization transitions
- Complex layout changes
- Multi-element coordinated animations

**Examples**:
```css
/* Hero animation */
.hero-title {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 600ms 200ms, transform 600ms 200ms;
}
.hero-subtitle {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 600ms 400ms, transform 600ms 400ms;
}
.hero-cta {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms 600ms, transform 600ms 600ms;
}
.hero-animate .hero-title,
.hero-animate .hero-subtitle,
.hero-animate .hero-cta {
  opacity: 1;
  transform: translateY(0);
}
```

**GSAP Timeline**:
```javascript
const tl = gsap.timeline();
tl.from(".hero-title", { y: 50, opacity: 0, duration: 0.6, delay: 0.2 })
  .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
  .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
```

### Slow (800-1200ms)
**Purpose**: Dramatic reveals and loading sequences

**Use Cases**:
- App intro sequences
- Brand logo reveals
- Loading screen animations
- Storytelling moments
- Premium feature showcases
- Educational content reveals

**Examples**:
```css
/* Logo reveal */
.logo {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 1000ms, transform 1000ms;
}
.logo.animate {
  opacity: 1;
  transform: scale(1);
}

/* Loading screen */
.loading-screen {
  opacity: 1;
  transition: opacity 1000ms 500ms;
}
.loading-screen.hide {
  opacity: 0;
}
```

**React (Framer Motion)**:
```javascript
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.5 }}
>
  <Logo />
</motion.div>
```

### Dramatic (2000ms+)
**Purpose**: Cinematic intros and premium experiences

**Use Cases**:
- Cinematic intro sequences
- Premium brand experiences
- Interactive storytelling
- Virtual/augmented reality transitions
- High-end product launches
- Artistic installations

**Examples**:
```css
/* Cinematic intro */
.intro-text {
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 2500ms 500ms, transform 2500ms 500ms;
}
.intro-video {
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 2000ms 3000ms, transform 2000ms 3000ms;
}
```

**GSAP Complex Timeline**:
```javascript
const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
tl.to(".intro-overlay", { opacity: 0, duration: 1, delay: 1 })
  .to(".hero-text", { y: 0, opacity: 1, duration: 1.5 }, "-=0.5")
  .to(".hero-image", { scale: 1, opacity: 1, duration: 2 }, "-=1")
  .to(".cta-button", { scale: 1, opacity: 1, duration: 1 }, "-=1.5");
```

## Easing Functions

### Common Easing Patterns
```css
/* Linear (no easing) */
transition: all 300ms linear;

/* Ease-in (starts slow, accelerates) */
transition: all 300ms ease-in;
transition: all 300ms cubic-bezier(0.42, 0, 1, 1);

/* Ease-out (starts fast, decelerates) */
transition: all 300ms ease-out;
transition: all 300ms cubic-bezier(0, 0, 0.58, 1);

/* Ease-in-out (starts and ends slow) */
transition: all 300ms ease-in-out;
transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
```

### Framework Easing Libraries

**Framer Motion**:
```javascript
// Presets
transition: { ease: "easeInOut" }
transition: { ease: [0.42, 0, 0.58, 1] } // Custom cubic-bezier

// Springs
transition: { type: "spring", stiffness: 300, damping: 30 }
```

**GSAP**:
```javascript
// Built-in eases
gsap.to(".box", { x: 100, ease: "power2.out" }); // Common
gsap.to(".box", { x: 100, ease: "back.out(1.7)" }); // Overshoot
gsap.to(".box", { x: 100, ease: "elastic.out(1, 0.3)" }); // Bouncy
gsap.to(".box", { x: 100, ease: "steps(5)" }); // Discrete
```

**CSS Custom Easing**:
```css
@keyframes slideIn {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

.element {
  animation: slideIn 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## Context-Dependent Timing

### Device Considerations
```javascript
// Shorter durations on mobile
const isMobile = window.innerWidth < 768;
const duration = isMobile ? 200 : 400;

// Longer durations for larger screens
const baseDuration = window.innerWidth > 1200 ? 600 : 300;
```

### User Preferences
```javascript
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationConfig = {
  duration: prefersReducedMotion ? 0 : 400,
  ease: prefersReducedMotion ? 'linear' : 'ease-out'
};
```

### Performance-Based Timing
```javascript
// Adjust based on frame rate
let lastFrameTime = performance.now();
let frameCount = 0;

function adjustAnimationDuration(baseDuration) {
  frameCount++;
  const now = performance.now();
  const elapsed = now - lastFrameTime;

  if (elapsed > 1000) {
    const fps = frameCount / (elapsed / 1000);
    frameCount = 0;
    lastFrameTime = now;

    // Reduce duration if performance is poor
    if (fps < 30) {
      return baseDuration * 0.5;
    }
  }

  return baseDuration;
}
```

## Stagger and Delays

### Staggered Animations
```javascript
// GSAP stagger
gsap.to(".item", {
  x: 100,
  duration: 0.3,
  stagger: 0.1 // 100ms between each item
});

// Framer Motion stagger
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.3,
    staggerChildren: 0.1
  }}
>
  {items.map((item, i) => (
    <motion.div key={i}>{item}</motion.div>
  ))}
</motion.div>
```

### Sequential Delays
```css
.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 100ms; }
.item:nth-child(3) { transition-delay: 200ms; }
.item:nth-child(4) { transition-delay: 300ms; }
```

## Best Practices

### DO
- Match duration to importance of the change
- Use shorter durations for frequent interactions
- Test on target devices and browsers
- Respect accessibility preferences
- Consider user's attention span
- Use consistent timing within a component

### DON'T
- Use long durations for trivial changes
- Make users wait unnecessarily
- Ignore performance implications
- Use the same duration for everything
- Forget mobile users (shorter on mobile)
- Over-animate loading states

### Timing Formula
```
Base Duration × Context Multiplier = Final Duration

Context Multipliers:
- Instant feedback: 0.1-0.2x
- Frequent interaction: 0.5-1x
- Noticeable change: 1-2x
- Important reveal: 2-3x
- Cinematic moment: 3-5x
```

## Debugging Timing

### Chrome DevTools
```javascript
// Measure animation performance
performance.mark('animation-start');
gsap.to(".element", { x: 100, duration: 0.5, onComplete: () => {
  performance.mark('animation-end');
  performance.measure('animation', 'animation-start', 'animation-end');
  const measure = performance.getEntriesByName('animation')[0];
  console.log(`Animation took ${measure.duration}ms`);
}});
```

### Visual Debugging
```javascript
// Add visual timing markers
gsap.to(".element", {
  x: 100,
  duration: 0.5,
  onUpdate: function() {
    console.log(`Progress: ${this.progress() * 100}%`);
  }
});
```

## Resources

- Easing functions: https://easings.net/
- Framer Motion easing: https://www.framer.com/motion/transition/
- GSAP easing: https://greensock.com/docs/v3/Eases
- CSS transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
- Web Animations API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
