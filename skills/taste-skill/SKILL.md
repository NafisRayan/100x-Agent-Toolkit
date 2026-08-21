---
name: taste-skill
description: Premium visual design and frontend taste skill suite covering brand identity, anti-slop frontend design, high-end visual design, image generation direction, image-to-code, UI style systems (minimalist, industrial-brutalist, stitch), redesign of existing projects, GPT-taste GSAP motion, and full output enforcement. Each sub-skill has a dedicated reference under references/ — load the matching file before executing.
---

# Taste Skill — Design & Frontend Quality Suite

One umbrella skill with **13 specialized sub-skills** organized by visual design and frontend quality discipline. Each sub-skill is a standalone reference for a specific design/build task — brand identity, landing page design, redesign, image generation, GSAP motion, and more.

## How to Use

1. Find your task in the table below (or just describe what you need).
2. Read the matching sub-skill: `references/<name>/SKILL.md`.
3. Follow its instructions.

> No exact match? Use the closest sub-skill — e.g. `references/high-end-visual-design` for general design quality — then adapt.

## Sub-Skills

| Sub-Skill | Use when |
|-----------|----------|
| `references/brandkit` | Creating premium brand-kit images, logo systems, identity decks, and visual-world presentations. For brand guidelines boards, logo concepting, and brand system design. |
| `references/design-taste-frontend` | Building landing pages, portfolios, and redesigns. Anti-slop frontend skill that infers design direction from brief and ships non-templated interfaces. **Default for most frontend design tasks.** |
| `references/design-taste-frontend-v1` | Projects that depend on the exact v1 behavior of design-taste-frontend. Use only for backward compatibility; v2 (`design-taste-frontend`) is the current default. |
| `references/full-output-enforcement` | Tasks requiring exhaustive, unabridged output. Overrides default LLM truncation, bans placeholder patterns, and handles token-limit splits cleanly. |
| `references/gpt-taste` | Elite UX/UI with advanced GSAP motion. Enforces Python-driven layout randomization, AIDA page structure, wide editorial typography, gapless bento grids, strict GSAP ScrollTriggers, and massive section spacing. |
| `references/high-end-visual-design` | Making a website feel expensive. Defines exact fonts, spacing, shadows, card structures, and animations that signal premium quality. Blocks common AI defaults that look cheap. |
| `references/image-to-code` | Converting design images to production code. Generates section-specific design images, deeply analyzes them, then implements matching websites. Avoids under-generation and cards-in-cards UI. |
| `references/imagegen-frontend-mobile` | Generating premium mobile app screen concepts and flows (iOS, Android, cross-platform). Clean hierarchy, readable text, consistent multi-screen palettes, phone mockup framing. **Images only — does not write code.** |
| `references/imagegen-frontend-web` | Generating premium website design reference images. One image per section. Enforces composition variety, narrative concept spine, and consistent palette. Optimized for landing pages and marketing sites. |
| `references/industrial-brutalist-ui` | Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation. For dashboards, portfolios, editorial sites. |
| `references/minimalist-ui` | Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows. |
| `references/redesign-existing-projects` | Upgrading existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, applies high-end standards without breaking functionality. |
| `references/stitch-design-taste` | Generating agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards — strict typography, calibrated color, asymmetric layouts, perpetual micro-motion, hardware-accelerated performance. |
