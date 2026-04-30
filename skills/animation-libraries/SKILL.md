---
name: animation-libraries
description: Comprehensive guide to web animation libraries including CSS animations, Framer Motion, Anime.js, Motion One, React Spring, Lottie, Rive, and more. Covers use cases, setup, best practices, and when to choose each library.
---

# Animation Libraries

## When to Use This Skill

Apply this skill when:
- Choosing an animation library for a project
- Implementing animations with specific libraries
- Migrating between animation libraries
- Optimizing animation performance
- Understanding library capabilities and limitations

## Library Selection Guide

### Quick Decision Matrix

| Use Case | Recommended Library | Why |
|----------|-------------------|-----|
| Simple CSS transitions | CSS Transitions | Native, no dependencies |
| Complex React animations | Framer Motion | React-optimized, great API |
| Framework-agnostic | GSAP | Powerful, mature ecosystem |
| Physics-based | React Spring | Natural, spring animations |
| Lightweight | Motion One | Small bundle, modern API |
| After Effects exports | Lottie | Design workflow integration |
| Interactive animations | Rive | Runtime-editable, performant |
| Data visualization | D3.js | Specialized for data |

## CSS Animations

### When to Use
- Simple transitions and keyframe animations
- Performance-critical, minimal overhead
- No JavaScript dependencies needed
- Progressive enhancement

### Basic Usage
```css
/* Transitions */
.button {
  transition: all 0.3s ease-out;
}
.button:hover {
  transform: scale(1.05);
  background-color: #3b82f6;
}

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: fadeIn 0.5s ease-out;
}

/* Complex keyframes */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.bounce {
  animation: bounce 1s ease-in-out infinite;
}
```

### Advanced CSS
```css
/* Staggered animations with delays */
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 100ms; }
.item:nth-child(3) { animation-delay: 200ms; }

/* Responsive animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Hardware acceleration */
.accelerated {
  transform: translateZ(0);
  will-change: transform;
}
```

### Pros & Cons
**Pros**: Native, performant, no dependencies, easy to learn
**Cons**: Limited interactivity, no complex sequencing, browser inconsistencies

## Framer Motion

### When to Use
- React applications
- Complex component animations
- Gesture interactions
- Layout animations
- Spring physics

### Installation
```bash
npm install framer-motion
```

### Basic Usage
```javascript
import { motion, AnimatePresence } from 'framer-motion';

// Simple animation
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Gesture interactions
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Drag me
</motion.div>

// Layout animation
<AnimatePresence>
  {isOpen && (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### Advanced Patterns
```javascript
// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

<motion.ul
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>

// Spring animations
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 30
  }}
>
  Spring animation
</motion.div>

// Scroll-triggered animations
const { ref, inView } = useInView();
const controls = useAnimation();

useEffect(() => {
  if (inView) {
    controls.start("visible");
  }
}, [controls, inView]);

<motion.div
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={variants}
>
  Scroll to see me
</motion.div>
```

### Pros & Cons
**Pros**: React-optimized, great API, layout animations, gestures
**Cons**: Larger bundle size, React-only

## Anime.js

### When to Use
- Vanilla JavaScript projects
- Timeline-based animations
- Complex sequencing
- SVG animations

### Installation
```bash
npm install animejs
```

### Basic Usage
```javascript
import anime from 'animejs';

// Simple animation
anime({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});

// Timeline
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '.box1',
  translateX: 250,
  backgroundColor: '#FF1461'
})
.add({
  targets: '.box2',
  translateX: 250,
  backgroundColor: '#18FF92'
}, '-=500') // Relative offset

// Stagger
anime({
  targets: '.staggering-grid .grid-item',
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200) // delay increases by 100ms for each element
});
```

### Advanced Features
```javascript
// SVG animation
anime({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

// Callbacks
anime({
  targets: '.box',
  translateX: 250,
  easing: 'spring',
  duration: 800,
  delay: 0,
  endDelay: 100,
  round: 1,
  direction: 'alternate',
  loop: true,
  update: function(anim) {
    progressLogEl.value = 'progress :' + Math.round(anim.progress) + '%';
  },
  complete: function(anim) {
    completeLogEl.value = 'completed !';
  }
});
```

### Pros & Cons
**Pros**: Lightweight, powerful timeline API, great for SVG
**Cons**: Less active development, smaller ecosystem

## Motion One

### When to Use
- Performance-critical applications
- Small bundle size needed
- Modern React applications
- Need for WAAPI (Web Animations API)

### Installation
```bash
npm install motion
```

### Basic Usage
```javascript
import { motion, useSpring } from "motion/react";

// Simple animation
<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.5 }}
/>

// Spring animation
<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>

// Use hook for imperative control
function MyComponent() {
  const controls = useSpring(() => ({ x: 0 }));

  return (
    <>
      <motion.div style={controls} />
      <button onClick={() => controls.set({ x: 100 })}>
        Move
      </button>
    </>
  );
}
```

### Advanced Usage
```javascript
// Animate multiple properties
<motion.div
  animate={{
    x: 100,
    scale: 1.5,
    rotate: 90,
    backgroundColor: "#ff0000"
  }}
  transition={{
    duration: 0.5,
    ease: "easeInOut"
  }}
/>

// Keyframes
<motion.div
  animate={{
    x: [0, 100, 0],
    opacity: [1, 0.5, 1]
  }}
  transition={{
    duration: 2,
    times: [0, 0.5, 1]
  }}
/>

// SVG path animation
<motion.path
  d="M0 100 Q 50 0 100 100 T 200 100"
  stroke="white"
  fill="transparent"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2 }}
/>
```

### Pros & Cons
**Pros**: Extremely small, performant, WAAPI-based, modern API
**Cons**: Smaller ecosystem, fewer features than Framer Motion

## React Spring

### When to Use
- Physics-based animations
- Natural spring movements
- React applications
- Need for realistic physics

### Installation
```bash
npm install react-spring
```

### Basic Usage
```javascript
import { useSpring, animated } from 'react-spring';

function MyComponent() {
  const props = useSpring({
    x: 100,
    from: { x: 0 },
    config: { tension: 280, friction: 60 }
  });

  return (
    <animated.div
      style={{
        transform: props.x.to(x => `translateX(${x}px)`)
      }}
    >
      Animated content
    </animated.div>
  );
}

// Hover effect
function HoverCard() {
  const [spring, set] = useSpring(() => ({
    scale: 1,
    shadow: 1,
  }));

  return (
    <animated.div
      onMouseEnter={() => set({ scale: 1.1, shadow: 10 })}
      onMouseLeave={() => set({ scale: 1, shadow: 1 })}
      style={{
        transform: spring.scale.to(s => `scale(${s})`),
        boxShadow: spring.shadow.to(s => `0px ${s}px ${s * 2}px rgba(0,0,0,0.3)`)
      }}
    >
      Hover me
    </animated.div>
  );
}
```

### Advanced Patterns
```javascript
// Chain animations
import { useChain, useSpring, useTrail, animated } from 'react-spring';

function ChainExample() {
  const springApi = useSpring({ x: 100, from: { x: 0 } });
  const trailApi = useTrail(3, { opacity: 1, from: { opacity: 0 } });

  useChain([springApi, trailApi], [0, 0.1]);

  return (
    <>
      <animated.div style={springApi} />
      {trailApi.map((props, i) => (
        <animated.div key={i} style={props} />
      ))}
    </>
  );
}

// Physics-based drag
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';

function Draggable() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y }));

  return (
    <animated.div
      {...bind()}
      style={{ x, y, touchAction: 'none' }}
    >
      Drag me
    </animated.div>
  );
}
```

### Pros & Cons
**Pros**: Physics-based, natural feel, React-optimized
**Cons**: Steeper learning curve, larger than Motion One

## Lottie (Bodymovin)

### When to Use
- Complex animations designed in After Effects
- Need for design workflow integration
- High-quality vector animations
- Cross-platform consistency

### Installation
```bash
npm install lottie-react
```

### Basic Usage
```javascript
import Lottie from 'lottie-react';
import animationData from './animation.json';

function MyComponent() {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 300, height: 300 }}
    />
  );
}

// Interactive control
function ControlledLottie() {
  const lottieRef = useRef();

  const play = () => lottieRef.current.play();
  const pause = () => lottieRef.current.pause();
  const stop = () => lottieRef.current.stop();

  return (
    <>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
      />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

### Advanced Features
```javascript
// Event listeners
<Lottie
  animationData={animationData}
  onComplete={() => console.log('Animation completed')}
  onLoopComplete={() => console.log('Loop completed')}
  onEnterFrame={() => console.log('Frame entered')}
/>

// Speed control
<Lottie
  animationData={animationData}
  speed={0.5} // Half speed
/>

// Segments
<Lottie
  animationData={animationData}
  segments={[10, 20]} // Play frames 10-20
/>
```

### Pros & Cons
**Pros**: Design workflow, vector quality, cross-platform
**Cons**: Large file sizes, limited interactivity, designer dependency

## Rive

### When to Use
- Interactive, runtime-editable animations
- Need for state-based animations
- Performance-critical applications
- Complex character animations

### Installation
```bash
npm install @rive-app/react-canvas
```

### Basic Usage
```javascript
import { Rive } from '@rive-app/react-canvas';

function MyComponent() {
  return (
    <Rive
      src="https://cdn.rive.app/animations/vehicles.riv"
      stateMachines="bumpy"
      style={{ width: '500px', height: '500px' }}
    />
  );
}

// Interactive control
function InteractiveRive() {
  const riveRef = useRef();

  const onClick = () => {
    riveRef?.setInputState("bumpy", "bump", true);
  };

  return (
    <>
      <Rive
        ref={riveRef}
        src="https://cdn.rive.app/animations/vehicles.riv"
        stateMachines="bumpy"
      />
      <button onClick={onClick}>Trigger Bump</button>
    </>
  );
}
```

### Advanced Features
```javascript
// State machine control
function StateMachineRive() {
  const [riveState, setRiveState] = useState(null);

  return (
    <Rive
      src="animation.riv"
      stateMachines="State Machine"
      onStateChange={(event) => {
        console.log('State changed:', event.data);
        setRiveState(event.data);
      }}
    />
  );
}

// Custom layout
<Lottie
  animationData={animationData}
  layout="responsive"
  style={{ width: '100%', height: 'auto' }}
/>
```

### Pros & Cons
**Pros**: Runtime-editable, performant, interactive, small files
**Cons**: Requires Rive editor, steeper learning curve

## Performance Comparison

### Bundle Sizes (approximate)
- CSS: 0KB (native)
- Motion One: ~3KB
- Anime.js: ~18KB
- GSAP Core: ~30KB
- React Spring: ~40KB
- Framer Motion: ~70KB
- Lottie: ~50KB

### Performance Tips
1. **Use CSS** for simple transitions (0 overhead)
2. **Transform and opacity** for performant animations
3. **will-change** sparingly and remove when done
4. **Avoid layout thrashing** by batching reads/writes
5. **Use hardware acceleration** with transforms
6. **Test on target devices** and optimize accordingly

## Migration Guide

### From CSS to Framer Motion
```css
/* Before */
.element {
  transition: transform 0.3s ease-out;
}
.element:hover {
  transform: scale(1.1);
}

/* After */
<motion.div
  whileHover={{ scale: 1.1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  Content
</motion.div>
```

### From Anime.js to Framer Motion
```javascript
// Before
anime({
  targets: '.box',
  translateX: 250,
  duration: 800
});

// After
<motion.div
  animate={{ x: 250 }}
  transition={{ duration: 0.8 }}
/>
```

## Best Practices

### General
- Choose the right tool for the job
- Consider bundle size and performance
- Test on target devices and browsers
- Respect accessibility preferences
- Document animation decisions

### Performance
- Use transforms over layout properties
- Limit concurrent animations
- Use requestAnimationFrame for custom animations
- Profile performance regularly
- Optimize for 60fps

### Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Resources

- Framer Motion: https://www.framer.com/motion/
- Anime.js: https://animejs.com/
- Motion One: https://motion.dev/
- React Spring: https://react-spring.dev/
- Lottie: https://airbnb.io/lottie/
- Rive: https://rive.app/
- CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
