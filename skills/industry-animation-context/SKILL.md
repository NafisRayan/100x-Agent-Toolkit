---
name: industry-animation-context
description: Guide to applying animation principles across different industries including e-commerce, SaaS, fintech, healthcare, education, gaming, media publishing, travel, and social platforms. Covers industry-specific patterns, user expectations, and use cases.
---

# Industry-Specific Animation Context

## When to Use This Skill

Apply this skill when:
- Designing animations for specific industries
- Understanding industry conventions and expectations
- Tailoring motion design to user needs
- Benchmarking against industry standards
- Creating appropriate animation patterns for business context

## Cross-Industry Animation Principles

### Universal Best Practices
1. **Purpose-driven**: Every animation should have a clear purpose
2. **Performance-first**: Smooth 60fps animations on target devices
3. **Accessibility**: Support reduced motion preferences
4. **Brand alignment**: Match company personality and values
5. **User-centric**: Enhance, don't distract from user goals
6. **Testing**: Validate with real users in industry context

### Common Animation Categories Across Industries
- **Micro-interactions**: Button states, form feedback, hover effects
- **Transitions**: Page changes, modal appearances, content reveals
- **Loading states**: Skeleton screens, spinners, progress indicators
- **Feedback**: Success, error, warning states
- **Navigation**: Menu interactions, breadcrumbs, wayfinding
- **Data visualization**: Charts, graphs, metrics animations

## E-Commerce & Retail

### Industry Characteristics
- **User Goals**: Find products quickly, make purchases, track orders
- **Brand Personality**: Trustworthy, exciting, conversion-focused
- **Key Metrics**: Conversion rate, time to purchase, cart abandonment

### Animation Patterns

#### Product Interactions
```css
/* Product card hover - emphasize product */
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px); /* Lift to emphasize */
  box-shadow: 0 16px 32px rgba(0,0,0,0.15);
}

/* Add to cart - satisfying feedback */
.add-to-cart:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

.add-to-cart.added {
  animation: successPulse 0.5s ease;
}

@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); background-color: #10b981; }
  100% { transform: scale(1); }
}
```

#### Shopping Cart
```javascript
// Cart icon bounce when item added
gsap.to(".cart-icon", {
  scale: 1.3,
  duration: 0.2,
  yoyo: true,
  repeat: 1,
  ease: "power2.out"
});

// Smooth cart fly-in
gsap.from(".cart-item", {
  x: 100,
  opacity: 0,
  duration: 0.4,
  stagger: 0.1,
  ease: "power2.out"
});
```

#### Product Gallery
```css
/* Smooth image transitions */
.product-image {
  transition: opacity 0.3s ease;
}

.product-image.active {
  opacity: 1;
}

.product-image.inactive {
  opacity: 0;
  position: absolute;
}

/* Thumbnail selection */
.thumbnail {
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: #3b82f6;
  transform: scale(1.05);
}
```

### Industry-Specific Considerations
- **Speed matters**: Quick animations for product browsing
- **Trust signals**: Subtle, professional motion
- **Conversion focus**: Animations that guide to purchase
- **Mobile-first**: Optimize for touch interactions
- **Performance**: Fast loading for product images

## SaaS & Productivity

### Industry Characteristics
- **User Goals**: Complete tasks efficiently, manage data, collaborate
- **Brand Personality**: Professional, reliable, efficient
- **Key Metrics**: Task completion time, user engagement, retention

### Animation Patterns

#### Dashboard Widgets
```javascript
// Staggered widget reveal
gsap.from(".dashboard-widget", {
  y: 30,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out"
});

// Metric counter animation
gsap.from(".metric-value", {
  textContent: 0,
  duration: 1.5,
  ease: "power1.out",
  snap: { textContent: 1 },
  stagger: 0.2
});
```

#### Data Tables
```css
/* Row hover - clear selection */
.table-row {
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f3f4f6;
}

/* Sort indicator */
.sort-indicator {
  transition: transform 0.2s ease;
}

.sort-indicator.asc {
  transform: rotate(0deg);
}

.sort-indicator.desc {
  transform: rotate(180deg);
}
```

#### Form Interactions
```css
/* Input focus - clear indication */
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transition: all 0.2s ease;
}

/* Validation feedback */
.form-input.valid {
  border-color: #10b981;
  transition: border-color 0.3s ease;
}

.form-input.invalid {
  border-color: #ef4444;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

### Industry-Specific Considerations
- **Efficiency first**: Minimal, purposeful animations
- **Professional tone**: Subtle, refined motion
- **Data focus**: Clear information visualization
- **Productivity**: Don't interrupt workflows
- **Accessibility**: High priority for business users

## Fintech & Banking

### Industry Characteristics
- **User Goals**: Manage money, make transactions, view accounts
- **Brand Personality**: Secure, trustworthy, professional
- **Key Metrics**: Transaction completion rate, security compliance, user trust

### Animation Patterns

#### Transaction Success
```javascript
// Confetti or celebration for successful payments
gsap.to(".success-icon", {
  scale: 1.2,
  duration: 0.3,
  yoyo: true,
  repeat: 1,
  ease: "back.out(1.7)"
});

// Smooth balance update
gsap.from(".balance-amount", {
  textContent: oldBalance,
  duration: 1,
  ease: "power1.out",
  snap: { textContent: 0.01 }
});
```

#### Security Indicators
```css
/* Lock animation for secure states */
.security-lock {
  transition: all 0.3s ease;
}

.security-lock.secured {
  color: #10b981;
  animation: lockPulse 0.5s ease;
}

@keyframes lockPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Subtle loading for security checks */
.security-loading {
  animation: securitySpin 1s linear infinite;
}

@keyframes securitySpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Card Interactions
```css
/* Card flip for details */
.credit-card {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.credit-card.flipped {
  transform: rotateY(180deg);
}

/* Smooth number masking */
.card-number {
  transition: all 0.3s ease;
}

.card-number.masked {
  letter-spacing: 2px;
  filter: blur(4px);
}
```

### Industry-Specific Considerations
- **Security focus**: Subtle, trustworthy animations
- **Trust building**: Professional, consistent motion
- **Clarity paramount**: No ambiguity in financial data
- **Compliance**: Meet accessibility and security standards
- **Reliability**: Always-on, smooth performance

## Healthcare & Medical

### Industry Characteristics
- **User Goals**: Access health info, manage appointments, view records
- **Brand Personality**: Caring, professional, trustworthy
- **Key Metrics**: Patient satisfaction, appointment compliance, health outcomes

### Animation Patterns

#### Appointment Booking
```css
/* Step progress indicator */
.step-indicator {
  transition: all 0.3s ease;
}

.step-indicator.active {
  background-color: #3b82f6;
  transform: scale(1.1);
}

.step-indicator.completed {
  background-color: #10b981;
}

/* Calendar slot selection */
.time-slot {
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.time-slot:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.time-slot.selected {
  background-color: #3b82f6;
  color: white;
  transform: scale(1.05);
}
```

#### Health Data Visualization
```javascript
// Smooth chart updates
gsap.to(".chart-path", {
  attr: { d: newPath },
  duration: 0.8,
  ease: "power2.out"
});

// Metric trend indicators
gsap.to(".trend-indicator", {
  rotation: trendAngle,
  duration: 0.5,
  ease: "back.out(1.2)"
});
```

#### Medication Reminders
```css
/* Gentle reminder animation */
.reminder-card {
  animation: gentlePulse 2s ease-in-out infinite;
}

@keyframes gentlePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
}

/* Confirmed action */
.reminder-confirmed {
  animation: checkmark 0.5s ease;
}

@keyframes checkmark {
  0% { transform: scale(0) rotate(-45deg); }
  50% { transform: scale(1.2) rotate(-45deg); }
  100% { transform: scale(1) rotate(-45deg); }
}
```

### Industry-Specific Considerations
- **Caring tone**: Gentle, reassuring animations
- **Clarity critical**: Medical information must be clear
- **Accessibility high priority**: Diverse user base
- **Calm environment**: Avoid jarring or aggressive motion
- **Trust essential**: Professional, reliable interactions

## Education & E-Learning

### Industry Characteristics
- **User Goals**: Learn new skills, complete courses, track progress
- **Brand Personality**: Engaging, encouraging, knowledgeable
- **Key Metrics**: Course completion, engagement time, learning outcomes

### Animation Patterns

#### Lesson Progress
```css
/* Progress bar fill */
.progress-bar {
  transition: width 0.5s ease-out;
}

/* Achievement unlock */
.achievement {
  animation: achievementPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes achievementPop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* Quiz feedback */
.feedback-correct {
  animation: correctFlash 0.5s ease;
}

@keyframes correctFlash {
  0%, 100% { background-color: transparent; }
  50% { background-color: #d1fae5; }
}
```

#### Interactive Elements
```javascript
// Drag and drop feedback
gsap.to(".draggable-item", {
  scale: 1.1,
  duration: 0.2,
  ease: "back.out(1.5)"
});

// Correct answer celebration
gsap.to(".correct-answer", {
  scale: 1.2,
  backgroundColor: "#10b981",
  duration: 0.3,
  yoyo: true,
  repeat: 1
});
```

#### Content Reveal
```css
/* Staggered content appearance */
.lesson-content > * {
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.5s ease forwards;
}

.lesson-content > *:nth-child(1) { animation-delay: 0.1s; }
.lesson-content > *:nth-child(2) { animation-delay: 0.2s; }
.lesson-content > *:nth-child(3) { animation-delay: 0.3s; }

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Industry-Specific Considerations
- **Engaging but focused**: Encourage learning without distraction
- **Positive reinforcement**: Celebrate achievements
- **Clear feedback**: Immediate response to actions
- **Pacing appropriate**: Match to learning objectives
- **Accessibility critical**: Support diverse learning needs

## Gaming & Entertainment

### Industry Characteristics
- **User Goals**: Have fun, achieve goals, social interaction
- **Brand Personality**: Exciting, immersive, dynamic
- **Key Metrics**: Engagement time, retention, social sharing

### Animation Patterns

#### Character Actions
```javascript
// Character movement with anticipation
const tl = gsap.timeline();

tl.to(".character", {
  scaleX: 0.8, // Anticipation squash
  duration: 0.1
})
.to(".character", {
  x: 100,
  scaleX: 1.2, // Stretch in direction
  duration: 0.3,
  ease: "power2.out"
})
.to(".character", {
  scaleX: 1, // Return to normal
  duration: 0.2,
  ease: "elastic.out(1, 0.3)"
});
```

#### UI Feedback
```css
/* Button press satisfaction */
.game-button:active {
  transform: scale(0.9);
  transition: transform 0.1s ease;
}

.game-button:active::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
  animation: buttonRipple 0.3s ease-out;
}

@keyframes buttonRipple {
  from { transform: scale(0); opacity: 1; }
  to { transform: scale(2); opacity: 0; }
}

/* Achievement popup */
.achievement-popup {
  animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

#### Loading Screens
```css
/* Engaging loading animation */
.loading-character {
  animation: bounce 0.6s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Progress bar with personality */
.progress-bar {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  background-size: 200% 100%;
  animation: progressShimmer 1s linear infinite;
}

@keyframes progressShimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
```

### Industry-Specific Considerations
- **Fun and engaging**: Dynamic, playful animations
- **Immediate feedback**: Satisfying responses to actions
- **Immersive experience**: Consistent game feel
- **Performance critical**: Smooth 60fps gameplay
- **Social features**: Shareable moments

## Media & Publishing

### Industry Characteristics
- **User Goals**: Consume content, discover new media, engage with community
- **Brand Personality**: Dynamic, creative, engaging
- **Key Metrics**: Time spent, content consumption, social sharing

### Animation Patterns

#### Content Cards
```css
/* Card hover with depth */
.content-card {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-style: preserve-3d;
}

.content-card:hover {
  transform: translateY(-10px) rotateX(2deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

/* Image reveal */
.content-image {
  opacity: 0;
  transform: scale(1.1);
  transition: all 0.6s ease;
}

.content-image.loaded {
  opacity: 1;
  transform: scale(1);
}
```

#### Reading Experience
```css
/* Smooth scroll to content */
.article-content {
  scroll-behavior: smooth;
}

/* Reading progress indicator */
.progress-bar {
  transition: width 0.1s linear;
}

/* Text selection */
::selection {
  background-color: #3b82f6;
  color: white;
}
```

#### Video Player
```javascript
// Smooth volume change
gsap.to(video, {
  volume: newVolume,
  duration: 0.3,
  ease: "power2.out"
});

// Play/pause button animation
gsap.to(".play-button", {
  scale: 1.2,
  duration: 0.2,
  yoyo: true,
  repeat: 1,
  ease: "back.out(1.5)"
});
```

### Industry-Specific Considerations
- **Content-first**: Animations enhance, don't distract
- **Immersive reading**: Smooth, natural interactions
- **Visual storytelling**: Dynamic, engaging presentations
- **Performance matters**: Fast content loading
- **Social sharing**: Shareable animated moments

## Travel & Hospitality

### Industry Characteristics
- **User Goals**: Book trips, explore destinations, manage reservations
- **Brand Personality**: Inspiring, trustworthy, exciting
- **Key Metrics**: Booking conversion, exploration time, customer satisfaction

### Animation Patterns

#### Destination Cards
```css
/* Parallax destination image */
.destination-card {
  overflow: hidden;
}

.destination-image {
  transition: transform 0.5s ease;
}

.destination-card:hover .destination-image {
  transform: scale(1.1);
}

/* Smooth date selection */
.date-picker-day {
  transition: all 0.2s ease;
}

.date-picker-day:hover {
  background-color: #dbeafe;
  transform: scale(1.1);
}

.date-picker-day.selected {
  background-color: #3b82f6;
  color: white;
  animation: selectPop 0.3s ease;
}

@keyframes selectPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

#### Booking Flow
```javascript
// Step transitions with confidence
gsap.from(".booking-step", {
  x: 50,
  opacity: 0,
  duration: 0.5,
  ease: "power2.out"
});

// Confirmed booking celebration
gsap.to(".booking-confirmed", {
  scale: 1.1,
  duration: 0.3,
  yoyo: true,
  repeat: 1,
  ease: "back.out(1.7)"
});
```

#### Map Interactions
```css
/* Smooth map zoom */
.map-container {
  transition: transform 0.3s ease;
}

/* Location marker pulse */
.location-marker {
  animation: markerPulse 2s ease-in-out infinite;
}

@keyframes markerPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}
```

### Industry-Specific Considerations
- **Inspire wanderlust**: Beautiful, dreamy animations
- **Build trust**: Reliable, professional booking process
- **Visual exploration**: Engaging map and image interactions
- **Smooth journey**: Confident, reassuring flow
- **Mobile-first**: Optimize for travel planning on the go

## Social Platforms

### Industry Characteristics
- **User Goals**: Connect, share, discover content
- **Brand Personality**: Friendly, dynamic, engaging
- **Key Metrics**: Engagement time, social interactions, content creation

### Animation Patterns

#### Post Interactions
```css
/* Like button with satisfaction */
.like-button.liked {
  animation: likeHeart 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes likeHeart {
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

/* Comment reveal */
.comment {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

#### Feed Interactions
```javascript
// Smooth infinite scroll
gsap.to(".feed-item", {
  y: -itemHeight,
  duration: 0.5,
  ease: "power2.out"
});

// New content notification
gsap.from(".new-content-badge", {
  scale: 0,
  duration: 0.3,
  ease: "back.out(1.7)"
});
```

#### Story/Status Features
```css
/* Story progress bar */
.story-progress {
  transition: width 0.1s linear;
}

/* Story transition */
.story-slide {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.story-slide.active {
  opacity: 1;
  transform: scale(1);
}

.story-slide.inactive {
  opacity: 0;
  transform: scale(0.95);
}
```

### Industry-Specific Considerations
- **Engagement focus**: Addictive, satisfying interactions
- **Social proof**: Animated reactions and responses
- **Content discovery**: Smooth, infinite scrolling
- **Real-time updates**: Live activity indicators
- **Mobile-native**: Touch-optimized interactions

## Cross-Industry Best Practices

### Performance Optimization
```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
});

// Use requestAnimationFrame for smooth animations
function animate() {
  // Your animation logic
  requestAnimationFrame(animate);
}
```

### Accessibility
```css
/* Respect reduced motion preference */
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

### Mobile Optimization
```css
/* Touch-friendly targets */
.interactive-element {
  min-height: 44px;
  min-width: 44px;
}

/* Smooth touch feedback */
@media (hover: none) {
  .button:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
}
```

## Resources

- Industry-specific design pattern libraries
- User research and testing in industry contexts
- Competitor analysis and benchmarking
- Accessibility guidelines by industry
- Performance optimization for specific use cases
