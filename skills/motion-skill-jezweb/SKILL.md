---
name: motion
description: |
  Build sophisticated React animations with Motion (formerly Framer Motion) - declarative animations, gestures (drag, hover, tap), scroll effects, spring physics, layout animations, and SVG manipulation. Optimize bundle size with LazyMotion (4.6 KB) or useAnimate mini (2.3 KB).

  Use when: adding drag-and-drop interactions, creating scroll-triggered animations, implementing modal dialogs with transitions, building carousels with momentum, animating page/route transitions, creating parallax hero sections, implementing accordions with smooth expand/collapse, or optimizing animation bundle sizes. For simple list animations, use auto-animate skill instead (3.28 KB vs 34 KB).

  Troubleshoot: AnimatePresence exit not working, large list performance issues, Tailwind transition conflicts, Next.js "use client" errors, scrollable container layout issues, or Cloudflare Workers build errors (resolved Dec 2024).
---

# Motion Animation Library

## Overview

Motion (package: `motion`, formerly `framer-motion`) is the industry-standard React animation library used in production by thousands of applications. With 30,200+ GitHub stars and 300+ official examples, it provides a declarative API for creating sophisticated animations with minimal code.

**Key Capabilities:**
- **Gestures**: drag, hover, tap, pan, focus with cross-device support
- **Scroll Animations**: viewport-triggered, scroll-linked, parallax effects
- **Layout Animations**: FLIP technique for smooth layout changes, shared element transitions
- **Spring Physics**: Natural, customizable motion with physics-based easing
- **SVG**: Path morphing, line drawing, attribute animation
- **Exit Animations**: AnimatePresence for unmounting transitions
- **Performance**: Hardware-accelerated, ScrollTimeline API, bundle optimization (2.3 KB - 34 KB)

**Production Tested**: React 19, Next.js 16, Vite 7, Tailwind v4

---

## When to Use This Skill

### Use Motion When:

**Complex Interactions**:
- Drag-and-drop interfaces (sortable lists, kanban boards, sliders)
- Hover states with scale/rotation/color changes
- Tap feedback with bounce/squeeze effects
- Pan gestures for mobile-friendly controls

**Scroll-Based Animations**:
- Hero sections with parallax layers
- Scroll-triggered reveals (fade in as elements enter viewport)
- Progress bars linked to scroll position
- Sticky headers with scroll-dependent transforms

**Layout Transitions**:
- Shared element transitions between routes (card to detail page)
- Expand/collapse with automatic height animation
- Grid/list view switching with smooth repositioning
- Tab navigation with animated underline

**Advanced Features**:
- SVG line drawing animations
- Path morphing between shapes
- Spring physics for natural bounce
- Orchestrated sequences (staggered reveals)
- Modal dialogs with backdrop blur

**Bundle Optimization**:
- Need 2.3 KB animation library (useAnimate mini)
- Want to reduce Motion from 34 KB to 4.6 KB (LazyMotion)

### Do NOT Use Motion When:

**Simple List Animations** - Use `auto-animate` skill instead:
- Todo list add/remove (auto-animate: 3.28 KB vs motion: 34 KB)
- Search results filtering
- Shopping cart items
- Notification toasts
- Basic accordions without gestures

**Static Content**:
- No user interaction or animations needed
- Server-rendered content without client interactivity

**3D Animations** - Use dedicated 3D library:
- Three.js for WebGL
- React Three Fiber for React + Three.js

---

## Installation

```bash
pnpm add motion
# or
npm install motion
# or
yarn add motion
```

**Current Version**: 12.23.24 (verified 2025-11-09)

**Note**: Both `motion` and `framer-motion` v12.23.24 work with Cloudflare Workers (issue #2918 fixed Dec 2024).

### Package Information

- **Bundle Size**:
  - Full `motion` component: ~34 KB minified+gzipped
  - `LazyMotion` + `m` component: ~4.6 KB
  - `useAnimate` mini: 2.3 KB (smallest React animation library)
  - `useAnimate` hybrid: 17 KB
- **Dependencies**: React 18+ or React 19+
- **TypeScript**: Native support included (no @types package needed)

---

## Core Concepts

### 1. AnimatePresence (Exit Animations)

```tsx
import { AnimatePresence } from "motion/react"

<AnimatePresence>
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

**Critical Rules:**
- AnimatePresence **must stay mounted** (don't wrap in conditional)
- All children **must have unique `key` props**
- AnimatePresence **wraps the conditional**, not the other way around

**Common Mistake** (exit animation won't play):
```tsx
// WRONG - AnimatePresence unmounts with condition
{isVisible && (
  <AnimatePresence>
    <motion.div>Content</motion.div>
  </AnimatePresence>
)}

// CORRECT - AnimatePresence stays mounted
<AnimatePresence>
  {isVisible && <motion.div key="unique">Content</motion.div>}
</AnimatePresence>
```

### 2. Layout Animations

**Special Props:**
- `layout`: Enable FLIP layout animations
- `layoutId`: Connect separate elements for shared transitions
- `layoutScroll`: Fix animations in scrollable containers
- `layoutRoot`: Fix animations in fixed-position elements

```tsx
<motion.div layout>
  {isExpanded ? <FullContent /> : <Summary />}
</motion.div>
```

### 3. Scroll Animations

#### Viewport-Triggered (whileInView)
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Fades in when 100px from entering viewport
</motion.div>
```

#### Scroll-Linked (useScroll)
```tsx
import { useScroll, useTransform } from "motion/react"

const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -300])

<motion.div style={{ y }}>
  Moves up 300px as user scrolls page
</motion.div>
```

---

## Integration Guides

### Vite + React + TypeScript

```bash
pnpm add motion
```

Import: `import { motion } from "motion/react"`

No Vite configuration needed - works out of the box.

### Next.js App Router

Motion only works in **Client Components**.

**Create Client Component Wrapper** (`src/components/motion-client.tsx`):
```tsx
"use client"
import * as motion from "motion/react-client"
export { motion }
```

**Use in Server Components** (`src/app/page.tsx`):
```tsx
import { motion } from "@/components/motion-client"

export default function Page() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      This works in Server Component (wrapper is client)
    </motion.div>
  )
}
```

### Tailwind CSS Integration

Let each library do what it does best:
- **Tailwind**: Static and responsive styling via `className`
- **Motion**: Animations via motion props

**Remove Tailwind Transitions** - causes stuttering/conflicts:
```tsx
// WRONG - Tailwind transition conflicts with Motion
<motion.div className="transition-all duration-300" animate={{ x: 100 }} />

// CORRECT - Remove Tailwind transition
<motion.div animate={{ x: 100 }} />
```

### Cloudflare Workers

Status: Fixed as of December 2024. Motion now works directly with Cloudflare Workers - no workaround needed.

---

## Performance Optimization

### 1. Reduce Bundle Size with LazyMotion (4.6 KB)

```tsx
import { LazyMotion, domAnimation, m } from "motion/react"

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Only 4.6 KB!
      </m.div>
    </LazyMotion>
  )
}
```

### 2. Smallest: useAnimate mini (2.3 KB)

```tsx
import { useAnimate } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()
  return <div ref={scope}>Smallest possible React animation</div>
}
```

### 3. Hardware Acceleration

```tsx
<motion.div
  style={{ willChange: "transform" }}
  animate={{ x: 100, rotate: 45 }}
/>
```

Also add `willChange` for: `opacity`, `backgroundColor`, `clipPath`, `filter`

### 4. Large Lists - Use Virtualization

```bash
pnpm add react-window
```

```tsx
import { FixedSizeList } from 'react-window'
import { motion } from 'motion/react'

<FixedSizeList height={600} itemCount={1000} itemSize={50}>
  {({ index, style }) => (
    <motion.div style={style} layout>Item {index}</motion.div>
  )}
</FixedSizeList>
```

---

## Accessibility

```tsx
import { MotionConfig } from "motion/react"

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

Options: `"user"` (respects OS setting, recommended), `"always"` (force instant), `"never"` (ignore preference)

---

## Common Patterns

1. **Modal Dialog** - AnimatePresence with backdrop + dialog exit animations
2. **Accordion** - Animate height with `height: "auto"`
3. **Drag Carousel** - `drag="x"` with `dragConstraints`
4. **Scroll Reveal** - `whileInView` with viewport margin
5. **Parallax Hero** - `useScroll` + `useTransform` for layered effects

---

## Known Issues and Solutions

### AnimatePresence Exit Not Working
Wrap AnimatePresence around the conditional, not inside it. Ensure unique `key` props.

### Tailwind Transitions Conflict
Remove `transition-*` classes from motion elements.

### Next.js "use client" Missing
Add `"use client"` directive to components using motion.

### Scrollable Container Layout Animations
Add `layoutScroll` prop to scrollable container:
```tsx
<motion.div layoutScroll className="overflow-auto">
  {items.map(item => (
    <motion.div key={item.id} layout>{item.content}</motion.div>
  ))}
</motion.div>
```

### Fixed Position Layout Animations
Add `layoutRoot` prop to fixed container:
```tsx
<motion.div layoutRoot className="fixed top-0 left-0">
  <motion.div layout>Content</motion.div>
</motion.div>
```

### layoutId + AnimatePresence Unmounting
Wrap in `LayoutGroup`:
```tsx
import { LayoutGroup } from "motion/react"

<LayoutGroup>
  <AnimatePresence>
    {items.map(item => (
      <motion.div key={item.id} layoutId={item.id}>{item.content}</motion.div>
    ))}
  </AnimatePresence>
</LayoutGroup>
```

### Reorder Component in Next.js
Use alternative drag-to-reorder implementations or avoid Reorder in Next.js.

---

## Comparison: Motion vs AutoAnimate

| Aspect | AutoAnimate | Motion |
|--------|-------------|--------|
| **Bundle Size** | 3.28 KB | 2.3 KB (mini) - 34 KB (full) |
| **Use Case** | Simple list animations | Complex gestures, scroll, layout |
| **API** | Zero-config, 1 line | Declarative props, verbose |
| **Gestures** | No | Drag, hover, tap, pan |
| **Scroll Animations** | No | Parallax, scroll-linked |
| **Layout Animations** | No | FLIP, shared elements |
| **SVG** | No | Path morphing, line drawing |
| **Cloudflare Workers** | Full support | Full support (fixed Dec 2024) |
| **Accessibility** | Auto prefers-reduced-motion | Manual MotionConfig |

**Rule of Thumb**: Use AutoAnimate for 90% of cases (list animations), Motion for 10% (complex interactions).

---

## Official Documentation

- **Official Site**: https://motion.dev
- **React Docs**: https://motion.dev/docs/react
- **GitHub**: https://github.com/motiondivision/motion
- **Examples**: https://motion.dev/examples
- **npm Package**: https://www.npmjs.com/package/motion

---

## Related Skills

- **auto-animate** - For simple list add/remove/sort animations (3.28 KB vs 34 KB)
- **tailwind-v4-shadcn** - Styling integration
- **nextjs** - Next.js App Router patterns
- **cloudflare-worker-base** - Deployment (Motion now fully compatible)

---

*Source: jezweb/claude-skills | Skills Directory Grade B | 90 stars | 412 copies*
