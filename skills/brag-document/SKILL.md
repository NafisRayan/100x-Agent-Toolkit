---
name: brag-document
description: Generate a concise, professional brag document (work accomplishments report, self-review, or performance-review input) from raw notes, repository activity, or achievement data. Use whenever the user asks to create, draft, rewrite, or summarize a monthly, quarterly, or annual record of work—even if they simply say “write up what I did,” “summarise my contributions,” or “turn these notes/commits into a brag doc.” Preserve the user's facts and level of certainty, emphasize meaningful work over development trivia, and avoid invented metrics or inflated impact claims.
---

# Brag Document Generator

## Goal

Turn raw achievement material into a clear, factual record of the user's work. The preferred result is easy to scan, specific enough to be credible, and restrained enough to sound human.

Use the user's approved style as the default:

- concise rather than exhaustive
- factual rather than promotional
- accomplishment-focused rather than commit-focused
- one simple overview block per project rather than many nested categories
- meaningful scope metrics only when supported
- short bullet-based learning notes rather than reflective essays

A brag document should communicate what the person built, improved, supported, or learned. It should not read like a repository audit, a résumé, or marketing copy.

---

## 1. Understand the Source Material

Extract what is available from the user's notes, files, commits, or conversation:

1. Period covered
2. Main projects or work areas
3. Brief context for each project
4. Concrete contributions
5. Meaningful outcomes or scope
6. Learning or development projects
7. Skills and technologies used
8. Learning outcomes

Proceed with partial data when the period and accomplishments are reasonably clear. Do not force the user to complete a long intake form or ask for optional fields individually.

Ask a clarifying question only when a missing fact would materially change the document, such as the reporting period, project ownership, or whether unfinished work may be described as delivered.

### Evidence hierarchy

When several sources are available, prefer them in this order:

1. The user's direct statements and corrections
2. User-provided project summaries or notes
3. Concrete behavior visible in source files or project documentation
4. Commit history and repository statistics

Treat lower-ranked sources as supporting evidence, not permission to overstate impact.

---

## 2. Preserve Facts and Certainty

Faithfulness matters more than sounding impressive.

- Preserve qualifiers such as “participated,” “contributed,” “supported,” “explored,” and “work in progress.”
- Do not upgrade participation into ownership or exploration into delivery.
- Do not call work production-ready, complete, launched, scalable, optimized, or comprehensive unless the source supports that description.
- Do not infer business impact, performance improvement, adoption, quality, or test coverage from implementation activity alone.
- Do not introduce product names, architectures, tools, workflows, or capabilities that are absent from the evidence.
- Do not fabricate quotes, metrics, outcomes, or causality.
- If a detail is uncertain, use restrained wording or omit it. Do not insert placeholders such as `[add metric]` into the finished document unless the user explicitly asks for a fill-in template.

### Metrics policy

Use numbers only when they convey meaningful scope or outcomes and are supported by the source.

Good examples:

- 15 primitive components and 28 UI wrappers
- a 6-screen authentication flow
- reduced processing time by 20%
- supported 300 users

Usually omit development-process vanity metrics:

- commit counts
- repository counts
- lines added or removed
- largest commit size
- file or test line counts
- number of polish commits
- exact implementation dimensions or CSS values
- dates of individual commits

These details may be included only when the user asks for engineering activity statistics or when the number itself is genuinely important to the achievement.

---

## 3. Default Document Structure

Follow this structure unless the user supplies a different template:

```markdown
# [Period] Brag Document

[One concise sentence summarizing the period's main work. Use two sentences only if needed.]

## [Project / Work Area]

[One sentence explaining the project or work area.]

**Overview:**

- [Concise accomplishment.]
- [Concise accomplishment.]
- [Concise accomplishment.]

---

## [Next Project / Work Area]

[Repeat the same simple structure.]

---

## Highlights & Impact

- [Major outcome or contribution.]
- [Major outcome or contribution.]

---

## Skills & Technologies Applied

- [A readable group of related skills.]
- [Another readable group.]

---

## Learning

- [Concise learning outcome.]
- [Concise learning outcome.]

## UTILIZED SKILLS

[Flat comma-separated list of skills.]
```

### Structure rules

- Start directly with the `# [Period] Brag Document` title. Do not add a `WORK ACCOMPLISHMENTS` label.
- Give each project its own `##` heading and one-sentence context line.
- Prefer a single `**Overview:**` or `**Project Overview:**` block per project.
- Use additional subcategories only when a long or complex project would otherwise become hard to scan. Do not split a project merely to make the document look more elaborate.
- Do not add a separate impact summary to every project when the same points already appear in its bullets.
- Separate major sections with `---`.
- Keep `Highlights & Impact` as a concise recap; plain bullets are preferred over bold promotional lead-ins.
- Present `Skills & Technologies Applied` as simple, readable bullet groups. Category labels are optional, not required.
- Use `## Learning` followed by bullets. Do not add a separate `LEARNING` label, a second “Learning & Growth” heading, or a multi-paragraph reflection unless requested.
- End with `## UTILIZED SKILLS` and a flat comma-separated list.

### Length guidance

Let the amount of real work determine the length, but remove repetition aggressively.

- Executive summary: usually 1 sentence
- Project context: 1 sentence
- Typical project: 5–10 bullets
- Small project: 2–4 bullets
- Highlights: 5–10 bullets
- Learning: 5–10 bullets
- Each bullet: usually 8–18 words and one idea

These are guidelines, not quotas. Never pad a section to reach a target.

---

## 4. Writing Style

### Voice and tone

- Use active voice.
- Begin accomplishment bullets with a clear verb where natural.
- Avoid first-person pronouns in bullets.
- Sound confident, direct, and professional without exaggeration.
- Prefer familiar wording such as “Built,” “Developed,” “Implemented,” “Participated,” “Explored,” and “Improved.”
- Preserve the user's natural terminology and project names.
- Use sentence case and end bullets with periods.

### Concision

- Keep one main idea per bullet.
- Prefer a clear summary over a catalogue of implementation details.
- Combine closely related details when doing so improves readability.
- Remove repeated claims across project bullets, impact summaries, highlights, and learning.
- Mention a detail again in `Highlights & Impact` only when it is one of the period's most important takeaways.
- Avoid long parenthetical lists, dense component-name inventories, and implementation minutiae unless essential.

### Avoid inflated language

Use stronger wording only when evidence supports it. Be cautious with:

- engineered
- shipped
- launched
- transformed
- comprehensive
- complete
- production-ready
- scalable
- optimized
- significant
- end-to-end

Do not turn ordinary implementation evidence into claims such as “improved query performance,” “ensured test accuracy,” “enabled team-wide access,” or “connected the demo experience to production” unless the source explicitly establishes those outcomes.

---

## 5. Organize Specific Content Types

### Main work projects

Describe the feature or system in plain language, then summarize the user's major contributions. Focus on capabilities, architecture, quality work, and delivery status—not the chronology of commits.

### Collaboration or project initiation

Accurately reflect the user's level of involvement. Appropriate verbs include:

- Participated
- Contributed
- Collaborated
- Supported
- Conducted
- Explored
- Researched
- Shared

Do not recast collaborative participation as leadership unless the user led the work.

### Learning and development projects

Label these clearly, especially when they are personal, experimental, or unfinished. Include `(work in progress)` in the context sentence when supported. Describe what was built and learned without presenting it as a completed business deliverable.

### Skills

Infer skills conservatively from concrete work. Use standard technology names rather than turning filenames, documentation titles, helper class names, or isolated implementation details into standalone skills.

---

## 6. Final Quality Check

Before presenting or saving the document, verify:

- [ ] The document starts with the period title, without an extra header label.
- [ ] The summary is concise and contains no unsupported statistics.
- [ ] Every project has a brief context sentence and a simple overview block.
- [ ] Claims match the user's actual ownership and certainty.
- [ ] Metrics are meaningful and supported—not commit, line, or file-count vanity metrics.
- [ ] No `[add metric]` placeholders appear unless requested.
- [ ] Project-level impact summaries are omitted when they would duplicate the overview.
- [ ] Highlights recap only the most important work and avoid promotional bold lead-ins.
- [ ] Skills are readable and conservatively inferred.
- [ ] Learning is concise and bullet-based.
- [ ] Bullets use active, direct language and end consistently with periods.
- [ ] Repetition and low-value implementation trivia have been removed.
- [ ] The tone is factual, human, and professional.

If forced to choose between a longer impressive-sounding document and a shorter faithful one, choose the shorter faithful version.

---

## Domain Adaptation

Adapt terminology to the user's role and industry while retaining the same restraint. Engineering work may emphasize features, architecture, testing, and documentation; product work may emphasize discovery and alignment; operations may emphasize delivery and process; healthcare may emphasize care and protocol adherence. The evidence, not a rigid template, determines what belongs.