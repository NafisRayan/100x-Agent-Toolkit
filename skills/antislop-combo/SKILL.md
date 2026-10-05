---
name: antislop-combo
description: "Anti-Slop Suite: Complete anti-AI-slop rules, craftsmanship standards, and filters for UI design, responsive mobile layouts, human accessibility (WCAG), copywriting, and code comment hygiene. Routes tasks to dedicated sub-skills."
version: 3.2.20
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(python *)
  - Bash(python3 *)
---

# Anti-Slop Suite (`antislop-combo`)

> **Anti Slop: Production Craftsmanship & Anti-AI-Slop Rules for Coding Agents**  
> Version: 3.2.20  
> Core filter, router, and comprehensive standards across UI design, mobile reflow, accessibility, copywriting, and code comments.

---

## What This Is (and What It Isn't)

`antislop` is a **filter, not a style guide**. It stops AI coding agents from generating recognizable, generic "AI slop" interfaces, copy, and code comments, while preventing the opposite failure: sterile, lifeless defaults.

- **Does NOT** impose an arbitrary aesthetic: no prescribed colors, fonts, or single "house style".
- **Does NOT** ban visual techniques (gradients, glassmorphism, badges, card grids). What it rejects is **technique without purpose**.
- Holds every decision to a **purpose test**: *What does this technique serve? Write the reason down.*
- Holds the output to a **liveliness bar**: The result must feel **crafted by a designer and engineer**, alive and specific.

```
antislop-combo/
├── SKILL.md                          # Master router and unified standard (this file)
├── antislop/SKILL.md                 # Core filter, 38 rules (R-01..R-38), 2 modes, delivery gate
├── antislop-ui/SKILL.md              # Deep dive: color, gradients, layout, cards, decoration, motion
├── antislop-layoutmobile/SKILL.md    # Deep dive: responsive reflow, mobile breakpoints, tap targets, overflow
├── antislop-human/SKILL.md           # Deep dive: contrast (4.5:1 / 3:1), keyboard, focus, states, zoom
│   ├── contrast-check.py             # CLI contrast calculator script
│   └── contrast-mcp.py               # MCP server for contrast validation
├── antislop-copywriting/SKILL.md     # Deep dive: headlines, CTAs, tone, anti-AI prose patterns
└── antislop-code/SKILL.md            # Deep dive: comment hygiene, remove AI banners, preserve intent
```

---

## Sub-Skills Task Router

When handling specific domains or tasks, read and apply the corresponding sub-skill file:

| Domain / Task | Read Sub-Skill | When to Load | Key Focus |
|---|---|---|---|
| **Core Filter & Audit** | [`./antislop/SKILL.md`](./antislop/SKILL.md) | Default for any UI/app build or anti-slop audit | 38 rules (R-01–R-38), Delivery Gate, 2 Usage Modes, Liveliness Toolkit |
| **UI & Visual Design** | [`./antislop-ui/SKILL.md`](./antislop-ui/SKILL.md) | Building or styling web interfaces, components, themes | Palette restraint, elevation, dose caps for blur/glow, intentional motion |
| **Mobile & Responsive** | [`./antislop-layoutmobile/SKILL.md`](./antislop-layoutmobile/SKILL.md) | Layouts reflowing across screen sizes (phone to desktop) | Reflow vs clipping, horizontal scroll prevention, 44px tap targets, wrapping |
| **Human & Accessibility** | [`./antislop-human/SKILL.md`](./antislop-human/SKILL.md) | Accessible UI, WCAG checks, keyboard navigation, focus | 4.5:1 contrast, visible focus rings, empty/loading/error states, 200% zoom |
| **Copy & Text** | [`./antislop-copywriting/SKILL.md`](./antislop-copywriting/SKILL.md) | Headlines, CTAs, landing-page text, value props | Eliminating buzzwords ("seamless", "revolutionize"), em-dash ban, active voice |
| **Code Comments** | [`./antislop-code/SKILL.md`](./antislop-code/SKILL.md) | Reviewing or generating code and comments | Strip separator banners (`// ===`), obvious restatements, never touch code |

---

## Two Usage Modes

On the first antislop activation in each session, resolve the mode in strict priority order:

1. **Explicit session instruction:** If the user specifies `during` or `after` in the current conversation, announce:  
   `antislop active: <mode> (session override).`
2. **Global preference (if no session override):** Check `%APPDATA%\antislop\settings.json` (Windows) or `~/.config/antislop/settings.json` (Linux/macOS) for `{"mode": "during" | "after" | "ask"}`. If set to `during` or `after`, announce:  
   `antislop active: <mode> (global preference).`
3. **Ask if unresolved:** If settings file is absent, missing `mode`, or set to `ask`, ask the user:
   > **When do you want to use antislop?**  
   > 1. **DURING** the project, while working (planning & execution). Applies rules as code/UI is written.  
   > 2. **AFTER** the project is finished. Produces a numbered findings audit report (`anti-slop/audit-001-YYYY-MM-DD.md`) with priorities, awaiting user approval before fixing.

- **Mode 1 (During):** Prevent slop from the start. Verify against the Delivery Gate before completion.
- **Mode 2 (After):** Audit existing codebase. Output numbered findings cited with violated rules (R-XX). Priority: Hard Gate = HIGH, Purpose-Gate = MEDIUM, Quality Locks = LOW. Wait for explicit user approval of numbers before making edits.

---

## Core Craftsmanship Standards (C-1 to C-5)

1. **C-1: Intentionality** — Every visual or structural choice must have a concrete reason. If the only justification is "it looks modern" or "default template", eliminate it.
2. **C-2: Functional Completeness** — Interactive controls must perform actual actions or be removed. No ghost links or stub handlers.
3. **C-3: Content-Driven Composition** — Layouts and hierarchy must adapt to actual content length, density, and meaning.
4. **C-4: Resilience** — The interface must hold up across all screen widths (320px to 4K), in light and dark mode, under keyboard navigation, and with 200% text zoom.
5. **C-5: Evidence Over Claims** — No fabricated metrics, fictional logos, fake customer testimonials, or unsupported compliance badges.

---

## The Three-Tier Rule System (R-01 to R-38 Summary)

### Tier 1: Hard Gate (Absolute, zero tolerance)
- **R-02 (Copywriting):** Em dash (`—`) forbidden in generated prose; use `,`, `.`, `:`, or `()`.
- **R-03 (Mobile Responsiveness):** Flawless reflow down to 320px; zero unwanted horizontal overflow.
- **R-17 (Data & Numbers):** No fabricated numbers, metrics, or statistics.
- **R-18 (Testimonials):** No fictional user reviews, fake avatars, or fabricated personas.
- **R-23 (Clarification & Assets):** Ask before creating unguided complex visual assets, or use honest placeholders.
- **R-24 (Navigation):** Every navbar link must navigate to an existing, reachable section or page.
- **R-25 (Color Contrast):** WCAG AA minimum: 4.5:1 for normal text, 3:1 for large text (18px+).
- **R-26 (Interactive Elements):** All interactive controls must function. No empty `href="#"` or dead buttons.
- **R-27 (UI States):** Real data views must provide empty, loading, error, and partial states.
- **R-28 (FAQ):** Questions must address authentic product problems, not filler placeholders.
- **R-32 (Keyboard Accessibility):** Full `Tab`/`Shift+Tab` accessibility with prominent visible focus indicators.
- **R-33 (No Scripted Patching):** Build features directly in code; never patch CSS/code with regex string scripts.
- **R-34 (Theme Completeness):** If a theme toggle is provided, both Light and Dark themes must be verified and readable.
- **R-35 (Verification Before Delivery):** Run and visually/functionally verify the build and inspect console logs before shipping.
- **R-36 (No Fabricated Claims):** No unsubstantiated security ("SOC2 compliant"), performance, or award claims.
- **R-37 (Design Direction Required):** Ground UI in `DESIGN.md` or user style brief. Without direction, mark as "draft without direction".
- **R-38 (Real Content or Honest Placeholder):** If content is missing, use honest labeled placeholders (`[Product Screenshot]`), never fake content masquerading as real.

### Tier 2: Purpose-Gate (Allowed only when justified by stated hierarchy/brand purpose)
- **R-01 (Color & Gradients):** No default blue-to-purple or purple-to-pink gradient meshes without brand justification.
- **R-04 (Icons):** No default sparkles, stars, magic wands, or robots as generic feature icons.
- **R-06 (Typography):** Select typography for brand identity, not model defaults (Inter/Geist/Space Grotesk). No shouting uppercase tracking without reason.
- **R-07 (Backgrounds):** No generic grid lines, graph paper, or blueprint backgrounds without specific purpose.
- **R-08 (Button Arrows):** Arrows (`→`) must indicate actual progression or external navigation, not default decoration.
- **R-09 (Badges):** Capsule badges ("AI Powered", "New") must reflect real status, not decorative clutter.
- **R-10 (Glassmorphism):** Dose cap: max 1–2 elements with blur/backdrop-filter. Never glass on everything.
- **R-12 (Shadow):** Shadows indicate functional elevation hierarchy, not decorative floating.
- **R-13 (Glow):** Max 1–2 elements with glow accents.
- **R-14 (Feature Cards):** Vary layout, size, and emphasis according to content importance; avoid cookie-cutter 3-card grids.
- **R-19 (Animations):** Purposeful UX transitions only; no simultaneous floating, bouncing, and fading loops.
- **R-22 (Illustrations):** No generic unDraw or pastel 3D blob characters.

### Tier 3: Quality Locks (Consistency & Polish)
- **R-05 (Layout Structure):** Avoid repetitive AI templates (Hero + 3 cards + 3-step "How It Works").
- **R-11 (Border Radius):** Consistent radii across the system; do not make every input, card, and button pill-shaped.
- **R-15 (Specific CTAs):** Contextual action labels instead of generic "Get Started" / "Learn More".
- **R-16 (No Buzzwords):** Eliminate "revolutionary", "seamless", "cutting-edge", "intelligent", "next-gen".
- **R-20 (Visual Identity):** Cohesive character, typography hierarchy, and deliberate compositional voice.
- **R-21 (Dark Mode Purpose):** Use dark themes where domain-appropriate (dev tools, media), not just because "dark looks tech".
- **R-29 (Palette Restraint):** Max 2–3 core colors + 1 accent color.
- **R-30 (No Unprompted Cloning):** Do not clone popular UI templates (Linear, Stripe) unless explicitly requested.
- **R-31 (Document Reasons):** Note one-line rationale for major architectural and visual decisions.

---

## Liveliness Toolkit

When designing or refining UI, calibrate against the three dials:

- **Energy (1–5):** Visual contrast, density, and saturation. (1 = minimalist/quiet; 5 = bold/vibrant).
- **Rhythm (1–5):** Variation in layout pacing, asymmetry, card sizing, and section breaks.
- **Motion (1–5):** Micro-interactions, hover responses, and transition dynamics.

*Default without explicit brief:* Start with moderate, deliberate settings (Energy: 2–3, Rhythm: 2–3, Motion: 2).

---

## Mandatory Delivery Gate

Before claiming any task complete, verify this checklist:

- [ ] **Hard Gate:** Zero em dashes (`—`) in prose (R-02).
- [ ] **Hard Gate:** Responsive down to 320px width without unwanted horizontal scroll (R-03, R-35).
- [ ] **Hard Gate:** Contrast ratio meets 4.5:1 normal / 3:1 large text for all themes (R-25, R-34).
- [ ] **Hard Gate:** All buttons and navigation links have real destinations and functional handlers (R-24, R-26).
- [ ] **Hard Gate:** Empty, loading, and error states designed and handled (R-27).
- [ ] **Hard Gate:** Full keyboard operability and visible focus outlines (R-32).
- [ ] **Hard Gate:** Zero fabricated metrics, fake testimonials, or fictional claims (R-17, R-18, R-36, R-38).
- [ ] **Purpose Gate:** Every gradient, badge, shadow, glow, and icon has an identifiable purpose (R-01, R-04, R-09, R-10, R-12, R-13).
- [ ] **Copy & Comments:** Free of AI buzzwords; code comments explain non-obvious intent without decorative separator banners (`// ===`) (R-16, `antislop-code`).
- [ ] **Build & Runtime:** Application built/run, console inspected, verified clean (R-35).

*If any check fails, resolve the finding before delivery.*
