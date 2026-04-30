---
name: disney-animation-principles
description: Complete guide to Disney's 12 principles of animation including squash and stretch, anticipation, staging, straight ahead and pose to pose, follow through and overlapping action, slow in and slow out, arcs, secondary action, timing, exaggeration, solid drawing, and appeal. Covers application in UI, character animation, and motion design.
---

# Disney's 12 Principles of Animation

## When to Use This Skill

Apply this skill for:
- Character animation design
- UI motion design
- Creating natural, appealing movement
- Diagnosing animation issues
- Understanding why animations feel "wrong"
- Teaching animation fundamentals

## Overview

Disney's 12 principles of animation were developed by Disney animators Ollie Johnston and Frank Thomas in their 1981 book "The Illusion of Life: Disney Animation." These principles create the illusion of characters and objects adhering to the basic laws of physics while also dealing with more abstract issues like emotional timing and character appeal.

## The 12 Principles

### 1. Squash and Stretch

**Concept**: Objects deform under movement. When an object moves, its shape changes based on speed, mass, and force.

**In UI Design**:
- Buttons compress on click
- Loading balls squish and stretch
- Cards expand/contract smoothly

**Examples**:
```css
/* Button squash on press */
.button:active {
  transform: scale(0.95, 1.05); /* Squash horizontally, stretch vertically */
  transition: transform 50ms ease-out;
}

/* Loading animation with squash and stretch */
@keyframes bounce {
  0%, 100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1.3, 0.7); /* Stretch vertically, squash horizontally */
  }
  50% {
    transform: scale(0.7, 1.3); /* Squash vertically, stretch horizontally */
  }
}
```

**Best Practices**:
- Maintain volume (don't make objects grow/shrink overall)
- Use for flexible objects, not rigid ones
- Exaggerate for cartoon effects, subtle for realistic
- Follow the direction of force

### 2. Anticipation

**Concept**: Prepare the audience for an action. Every major movement needs a small, opposite movement first.

**In UI Design**:
- Draw-back before fast movement
- Small scale-up before modal appears
- Button hover state prepares for click

**Examples**:
```css
/* Card hover anticipation */
.card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card:hover {
  transform: translateY(-5px) scale(1.02); /* Small lift, slight scale */
}

/* Modal entrance anticipation */
.modal {
  transform: scale(0.95);
  transition: transform 0.3s ease-out;
}
.modal.open {
  transform: scale(1); /* Overshoot slightly */
}
```

**React (Framer Motion)**:
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }} // Anticipation for click
  transition={{ type: "spring", stiffness: 400 }}
>
  Click me
</motion.button>
```

**Best Practices**:
- Small movements (10-20% of main action)
- Opposite direction to main action
- More anticipation for heavier/faster actions
- Can be subtle for UI, exaggerated for character animation

### 3. Staging

**Concept**: Clear presentation of ideas. Every frame should have one clear idea, action, or mood.

**In UI Design**:
- One clear call-to-action per screen
- Progressive disclosure of information
- Clear visual hierarchy
- Focused user attention

**Examples**:
```css
/* Focus attention with scale and color */
.hero {
  animation: focusIn 0.8s ease-out;
}

@keyframes focusIn {
  0% {
    transform: scale(0.9);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Dim background to focus on modal */
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  z-index: 10;
  transform: scale(1.1); /* Slightly larger to draw attention */
}
```

**Best Practices**:
- One main action per animation sequence
- Use color, scale, and motion to guide attention
- Remove or dim competing elements
- Clear visual hierarchy in every frame
- Test by asking: "What should the user look at here?"

### 4. Straight Ahead and Pose to Pose

**Concept**: Two animation approaches:
- **Straight Ahead**: Draw frame by frame from start to finish (spontaneous, fluid)
- **Pose to Pose**: Plan key poses first, then fill in between (controlled, consistent)

**In UI Design**:
- **Straight Ahead**: Continuous loading spinners, particle effects
- **Pose to Pose**: Multi-step onboarding, page transitions, wizard flows

**Examples**:
```javascript
// Pose to pose (planned keyframes)
const keyframes = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Straight ahead (continuous)
function ContinuousAnimation() {
  const frame = useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time; // Continuous, unplanned motion
  });
}
```

**Best Practices**:
- Use pose-to-pose for structured UI flows
- Use straight-ahead for organic, continuous effects
- Mix both for complex animations
- Plan keyframes first for predictable results
- Use straight-ahead for generative/interactive animations

### 5. Follow Through and Overlapping Action

**Concept**: Different parts of an object move at different rates. Nothing moves all at once; parts drag behind or lead ahead.

**In UI Design**:
- Header follows scroll with delay
- Particles trail behind cursor
- Nested elements animate with staggered timing
- Text reveals letter by letter

**Examples**:
```css
/* Staggered card reveals (overlapping action) */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 100ms; }
.card:nth-child(3) { animation-delay: 200ms; }
.card:nth-child(4) { animation-delay: 300ms; }

/* Parallax scroll (follow through) */
.header {
  transform: translateY(var(--scroll-y));
  transition: transform 0.1s linear; /* Slight delay creates follow-through */
}

.content {
  transform: translateY(calc(var(--scroll-y) * 0.5)); /* Moves at different rate */
}
```

**GSAP Stagger**:
```javascript
// Overlapping action with stagger
gsap.to(".item", {
  x: 100,
  duration: 0.5,
  stagger: 0.1, // Each element starts 100ms after previous
  ease: "power2.out"
});
```

**Best Practices**:
- Use different timing for related elements
- Create trailing/leading effects with delays
- More overlap for faster, more dynamic feel
- Less overlap for slower, more deliberate feel
- Test with different stagger values

### 6. Slow In and Slow Out

**Concept**: Movement starts slowly, accelerates, then slows down. No object starts or stops instantly (except mechanical ones).

**In UI Design**:
- Natural-feeling transitions
- Smooth ease-in-out curves
- Accelerating/decelerating scroll
- Physics-based motion

**Examples**:
```css
/* Ease-in-out (slow in and slow out) */
.transition {
  transition: all 0.5s cubic-bezier(0.42, 0, 0.58, 1);
}

/* GSAP equivalents */
gsap.to(".element", {
  x: 100,
  ease: "power2.inOut", // Slow in and slow out
  duration: 0.5
});

// More pronounced
gsap.to(".element", {
  x: 100,
  ease: "power3.inOut", // Even more pronounced
  duration: 0.5
});
```

**Framer Motion**:
```javascript
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "spring", // Natural slow-in/slow-out
    stiffness: 300,
    damping: 30
  }}
/>
```

**Best Practices**:
- Use ease-in-out for most movements
- More extreme curves for heavier objects
- Linear only for mechanical/instant actions
- Spring physics for natural feel
- Test with different easing functions

### 7. Arcs

**Concept**: Natural movement follows curved paths, not straight lines.

**In UI Design**:
- Circular loading animations
- Curved page transitions
- Arcing element movements
- Natural cursor paths

**Examples**:
```css
/* Circular motion */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Curved path animation */
@keyframes arc {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(50px, -50px); /* Curve up and right */
  }
  100% {
    transform: translate(100px, 0); /* End at original y */
  }
}

/* SVG path animation */
path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 2s ease-in-out forwards;
}

@keyframes drawPath {
  to { stroke-dashoffset: 0; }
}
```

**GSAP MotionPath**:
```javascript
gsap.to(".box", {
  motionPath: {
    path: "#path",
    align: "#path",
    autoRotate: true
  },
  duration: 2,
  ease: "power1.inOut"
});
```

**Best Practices**:
- Most natural movements are curved
- Straight lines only for mechanical/rigid movement
- Use arcs for flowing, organic motion
- Bezier curves for custom paths
- Follow real-world physics (gravity, momentum)

### 8. Secondary Action

**Concept**: Add small, secondary movements that support the main action. Makes animation feel alive and detailed.

**In UI Design**:
- Button ripple effect on click
- Shadow grows with element movement
- Background elements react to foreground
- Subtle particle effects

**Examples**:
```css
/* Button with ripple (secondary action) */
.button {
  position: relative;
  overflow: hidden;
}

.button::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;
}

.button:active::after {
  transform: scale(2);
  opacity: 1;
}

/* Card hover with shadow (secondary action) */
.card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px); /* Primary action */
  box-shadow: 0 10px 30px rgba(0,0,0,0.2); /* Secondary action */
}
```

**React**:
```javascript
<motion.div
  whileHover={{ y: -5 }} // Primary action
  animate={{
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)" // Secondary action
  }}
  transition={{ duration: 0.3 }}
>
  Card content
</motion.div>
```

**Best Practices**:
- Secondary actions should be subtle (10-30% of main action)
- Support and enhance the primary action
- Don't distract from main message
- Add after main action is working
- Remove if they don't add value

### 9. Timing

**Concept**: The speed of actions defines the character and weight of objects. More frames = slower/heavier, fewer frames = faster/lighter.

**In UI Design**:
- Quick responses for light elements
- Slower movements for heavy elements
- Appropriate duration for importance
- Rhythmic, predictable timing

**Examples**:
```javascript
// Light, fast element (notification)
gsap.to(".notification", {
  y: -50,
  duration: 0.2,
  ease: "power2.out"
});

// Heavy, slow element (modal)
gsap.to(".modal", {
  scale: 1,
  duration: 0.6,
  ease: "back.out(1.7)"
});

// Rhythmic sequence
gsap.timeline()
  .to(".step1", { opacity: 1, duration: 0.3 })
  .to(".step2", { opacity: 1, duration: 0.3 }, "+=0.1") // Rhythmic delay
  .to(".step3", { opacity: 1, duration: 0.3 }, "+=0.1");
```

**Timing Guidelines**:
- **Instant (0-100ms)**: Button states, focus
- **Quick (100-200ms)**: Tooltips, hover effects
- **Standard (200-300ms)**: Modals, cards
- **Deliberate (300-500ms)**: Page transitions, content reveals
- **Cinematic (500-1000ms)**: Hero animations, brand moments
- **Storytelling (1000ms+)**: Intros, loading sequences

**Best Practices**:
- Match timing to element weight and importance
- Heavier objects move slower
- More important actions get more time
- Consider user's attention span
- Test with different durations

### 10. Exaggeration

**Concept**: Amplify actions to make them more readable and engaging. Don't be afraid to push movements beyond realism.

**In UI Design**:
- Overshoot effects on hover
- Bouncy loading animations
- Exaggerated feedback states
- Dramatic entrance animations

**Examples**:
```css
/* Overshoot effect */
.button {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.button:hover {
  transform: scale(1.1); /* Overshoots and settles */
}

/* Bouncy loading */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); } /* Exaggerated height */
}

/* Exaggerated modal entrance */
.modal {
  transform: scale(0.5);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal.open {
  transform: scale(1); /* Dramatic scale up */
}
```

**GSAP Back Easing**:
```javascript
// Exaggerated overshoot
gsap.to(".element", {
  x: 100,
  duration: 0.8,
  ease: "back.out(1.7)" // Overshoots 170%
});

// Even more exaggerated
gsap.to(".element", {
  x: 100,
  duration: 0.8,
  ease: "back.out(2.5)" // Overshoots 250%
});
```

**Best Practices**:
- Exaggerate for readability and impact
- More exaggeration for cartoon/playful designs
- Less for professional/serious designs
- Test what feels "too much"
- Balance with other principles

### 11. Solid Drawing

**Concept**: Objects should feel three-dimensional and have weight and volume. Even in 2D, understand 3D form.

**In UI Design**:
- Use shadows for depth
- Perspective transforms
- Layered depth (parallax)
- Consistent spatial relationships

**Examples**:
```css
/* 3D card effect */
.card {
  transform-style: preserve-3d;
  transition: transform 0.3s;
}

.card:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
}

/* Depth with shadows */
.elevated {
  box-shadow:
    0 1px 1px rgba(0,0,0,0.1),
    0 2px 2px rgba(0,0,0,0.1),
    0 4px 4px rgba(0,0,0,0.1),
    0 8px 8px rgba(0,0,0,0.1);
}

/* Parallax depth */
.parallax-container {
  perspective: 1px;
  overflow-y: auto;
  height: 100vh;
}

.parallax-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.parallax-back {
  transform: translateZ(-2px) scale(3);
}

.parallax-front {
  transform: translateZ(0);
}
```

**React Three Fiber**:
```javascript
<mesh>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial
    color="blue"
    roughness={0.3}
    metalness={0.7}
  />
</mesh>
```

**Best Practices**:
- Understand 3D space even for 2D designs
- Use shadows and lighting for depth
- Maintain consistent perspective
- Consider how objects exist in space
- Test depth perception

### 12. Appeal

**Concept**: Make characters and designs interesting, appealing, and memorable. Personality and charm.

**In UI Design**:
- Delightful micro-interactions
- Personality in motion
- Memorable brand animations
- Engaging loading states
- Satisfying feedback

**Examples**:
```css
/* Delightful button hover */
.button {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button:hover::before {
  width: 300px;
  height: 300px;
}

/* Satisfying checkbox */
.checkbox:checked + .checkmark {
  animation: checkmark 0.4s ease-in-out;
}

@keyframes checkmark {
  0% { transform: scale(0) rotate(-45deg); }
  50% { transform: scale(1.3) rotate(-45deg); }
  100% { transform: scale(1) rotate(-45deg); }
}
```

**Personality in Animation**:
```javascript
// Playful, bouncy animation
gsap.to(".playful-element", {
  scale: 1.1,
  duration: 0.3,
  ease: "elastic.out(1, 0.5)"
});

// Professional, smooth animation
gsap.to(".professional-element", {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power2.out"
});
```

**Best Practices**:
- Match animation personality to brand
- Add delightful details when appropriate
- Make interactions feel good, not just functional
- Consider emotional response
- Test appeal with real users

## Applying Principles Together

### Example: Card Hover Animation
```css
.card {
  /* Solid Drawing: 3D effect */
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* Exaggeration + Timing */
}

.card:hover {
  /* Squash and Stretch */
  transform: perspective(1000px) rotateX(5deg) scale(1.05);

  /* Appeal: Delightful shadow */
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.card::after {
  /* Secondary Action: Subtle shine */
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover::after {
  opacity: 1; /* Slow In and Slow Out */
}
```

### Example: Loading Animation
```javascript
// Anticipation: Start small
const tl = gsap.timeline({ repeat: -1, yoyo: true });

tl.to(".loader", {
  // Squash and Stretch
  scaleY: 1.5,
  scaleX: 0.7,
  // Timing
  duration: 0.3,
  // Slow In and Slow Out
  ease: "power2.inOut"
})
.to(".loader", {
  scaleY: 0.7,
  scaleX: 1.5,
  duration: 0.3,
  ease: "power2.inOut"
});
```

## Debugging with Principles

### When Animation Feels "Wrong"

**Problem**: Animation feels stiff or robotic
- **Solution**: Add more slow-in/slow-out, use arcs instead of straight lines

**Problem**: Animation feels heavy or sluggish
- **Solution**: Reduce timing, add more anticipation

**Problem**: Animation lacks impact
- **Solution**: Increase exaggeration, add secondary actions

**Problem**: Animation feels chaotic
- **Solution**: Improve staging, focus on one clear action

**Problem**: Animation feels flat
- **Solution**: Add depth (solid drawing), use shadows and perspective

## Best Practices Summary

1. **Start with purpose**: What are you communicating?
2. **Apply relevant principles**: Not all principles apply to every animation
3. **Test and iterate**: Get feedback on feel and timing
4. **Consider context**: Device, platform, user preferences
5. **Respect accessibility**: Support reduced motion preferences
6. **Document decisions**: Why did you choose these principles?
7. **Learn from others**: Study great animations in apps and films

## Resources

- "The Illusion of Life: Disney Animation" by Ollie Johnston and Frank Thomas
- Disney Animation Studios' internal training materials
- Animation principles in modern UI design case studies
- Motion design courses and tutorials
- Animation libraries and tools documentation
