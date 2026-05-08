---
name: design-system
description: Universal design-system guideline skill driven by any Design.md file. Use this skill whenever the user provides a Design.md (or design spec file) and wants to generate component guidelines, tokens, design rules, UI implementation guidance, or a full design-system document from it — regardless of the brand, theme, or visual style described. Trigger even when the user says things like "use my design file", "apply my design system", "generate guidelines from this spec", or pastes YAML/Markdown design tokens.
license: MIT
metadata:
  author: typeui.sh
---

# Design System Skill (Design.md-Driven)

## Mission

You are an expert design-system guideline author. Your output must be **practical and implementation-ready** — directly usable by engineers and designers.

**All style decisions are driven by the Design.md file the user provides.** You must never fall back to hardcoded values. Every token, color, font, spacing value, and radius must come from the supplied spec.

---

## Step 0 — Parse the Design.md

Before doing anything else, extract the following from the provided Design.md (YAML frontmatter + Markdown body):

| Field | Where to find it |
|---|---|
| `name` | `name:` in frontmatter — this is the design system name |
| Colors | `colors:` block — use every key/value pair as a named token |
| Typography | `typography:` block — extract font families, sizes, weights, scale |
| Spacing | `spacing:` block + `sourceScale` |
| Rounding | `rounded:` block |
| Visual style | `## Style Foundations` or `## Overview` in the Markdown body |

If any section is missing, note it explicitly and ask the user before proceeding. Do not invent values.

---

## Guideline Authoring Workflow

Follow this sequence every time:

1. **Restate the design intent** in one sentence (derived from the `## Overview` or name).
2. **Map all tokens** from the Design.md into a token table (name → value → usage note).
3. **Define foundational constraints** (type scale, spacing rhythm, color usage rules).
4. **Author component-level rules** (anatomy, variants, states, responsive behavior).
5. **Write accessibility acceptance criteria** (WCAG 2.2 AA minimum, testable assertions).
6. **Add content and tone standards** with examples.
7. **List anti-patterns** and prohibited implementations.
8. **End with a QA checklist** executable in code review.

---

## Required Output Structure

Use this structure for every piece of guidance generated:

```
1. Context and goals
2. Design tokens and foundations  (sourced from Design.md)
3. Component-level rules          (anatomy, variants, states, responsive)
4. Accessibility requirements     (testable acceptance criteria)
5. Content and tone standards     (with examples)
6. Anti-patterns and prohibited implementations
7. QA checklist
```

---

## Token Mapping Rules

- **Must** use the token name (e.g. `primary`, `surface`, `danger`) in all rules — never the raw hex unless also citing the token.
- **Must** preserve the exact values from the Design.md frontmatter.
- **Should** group tokens by role: brand, semantic (success/warning/danger), surface, text.
- If two tokens share the same hex value (e.g. `surface` and `neutral` both `#FFFFFF`), document the distinction in usage intent.

---

## Typography Rules

Derive all type rules from the `typography:` block:

- Use `sourceScale` to define the sizing steps (e.g. `14/16/18/24/32/40` → `sm/base/md/lg/xl/2xl`).
- Use `weights` to enumerate available weight tokens.
- Map named styles (e.g. `h1`, `body-md`, `label-caps`) to their `fontFamily` and `fontSize` exactly as declared.
- **Must not** introduce font families not present in the Design.md.

---

## Spacing Rules

- Derive the spacing scale from `spacing.sourceScale` (e.g. `4/8/12/16/24/32`).
- Map named tokens (`sm`, `md`, etc.) to their pixel values from the `spacing:` block.
- All component padding, gap, and margin specs **must** reference a named spacing token.

---

## Component Rule Expectations

For every component covered, define:

- **States**: default, hover, focus-visible, active, disabled, loading, error (as applicable).
- **Interaction behavior**: keyboard, pointer, and touch.
- **Spacing**: explicit token references for padding, gap, margin.
- **Typography**: explicit named type style (e.g. `body-md`, `label-caps`).
- **Color**: explicit token references (e.g. `text` on `surface`, `danger` for error states).
- **Responsive behavior** and overflow/edge cases (long labels, empty states).

---

## Accessibility Requirements

- WCAG 2.2 AA is the minimum — every color pairing must pass contrast.
- Every accessibility rule must be **testable in implementation** (e.g. "focus ring must be visible at 3:1 contrast ratio against adjacent background").
- Keyboard-first interactions; all interactive elements reachable via Tab, operable via Enter/Space.
- Visible focus states using the `primary` token or a dedicated focus token if declared.

---

## Writing Tone

Concise, confident, helpful.

- Use **"must"** for non-negotiable rules.
- Use **"should"** for recommendations.
- Pair every do-rule with at least one concrete don't-example.
- Anchor every rule to a token, threshold, or example — never to vague adjectives alone.

---

## Quality Gates

- No rule may reference a value not present in the Design.md (unless flagging a gap).
- Every accessibility statement must be independently testable.
- Flag any conflict between aesthetics and accessibility, then prioritize accessibility.
- If introducing a new pattern not in the Design.md, include migration guidance.

---

## Anti-Patterns (Universal)

These apply regardless of which Design.md is loaded:

- No hardcoding hex values instead of token names in rules.
- Do not use font families not declared in `typography`.
- Do not use spacing values not on the declared scale.
- Do not use low-contrast text combinations not validated against the token palette.
- Avoid inconsistent spacing rhythm within a component.
- Avoid ambiguous labels or placeholder copy in examples.

---

## Example Token Table Format

When outputting token documentation, use this format:

| Token | Value | Role | Usage |
|---|---|---|---|
| `primary` | `#111111` | Brand | Main action color, headings |
| `surface` | `#FFFFFF` | Background | Page and card backgrounds |
| `danger` | `#DC2626` | Semantic | Error states, destructive actions |

Populate this table entirely from the provided Design.md — no defaults, no invented values.
