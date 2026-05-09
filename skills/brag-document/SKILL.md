---
name: brag-document
description: >
  Generate a polished, professional brag document (also called a work accomplishments report or self-review) from raw achievement data. Use this skill whenever a user asks to create, write, draft, or generate a brag document, brag report, work accomplishments summary, self-review, performance review input, monthly/quarterly/annual achievement report, or any structured record of their professional contributions. Trigger this skill even when the user says things like "write up what I did this month", "help me summarise my work contributions", "I need to document my achievements", or "turn my notes into a brag doc". This skill works for any role, industry, seniority level, or time period.
---

# Brag Document Generator

## Overview

This skill converts a user's raw achievement notes — bullet points, sentences, dates, feedback snippets, metrics, or free-form text — into a polished, structured brag document that matches the format of professional work accomplishment reports.

The output must be precise, fact-based, active-voice, and metric-rich. It should read as a confident, professional record of contributions — not a resume, not a diary, not a cover letter.

---

## Step 1: Gather the User's Raw Data

Before generating anything, make sure you have the following from the user. If any field is missing, ask for it — except where noted as optional.

```
BRAG DOCUMENT INPUT TEMPLATE
==============================

1. PERIOD COVERED (required)
   e.g. "January 2026", "Q3 2024", "October–December 2025"

2. YOUR ROLE / TITLE (required)
   e.g. "Software Engineer", "Product Manager", "Marketing Lead", "Nurse Practitioner"

3. PRIMARY PROJECTS OR WORK AREAS (required)
   List the main projects, products, clients, or service areas you worked on.
   For each, provide:
   - Name of the project/area
   - What it is (1 sentence of context)
   - Your specific contributions (bullet points or sentences — raw is fine)
   - Any measurable results (numbers, %, time saved, revenue, users, errors reduced, etc.)

4. SIDE PROJECTS / LEARNING / R&D (optional)
   Any personal projects, experiments, certifications, or self-learning initiatives.

5. COLLABORATION & FEEDBACK (optional)
   - Names/titles of people you worked with (if comfortable sharing)
   - Any direct quotes or paraphrased praise from managers, clients, or peers
   - Any formal feedback received

6. SKILLS USED (optional but recommended)
   List all tools, technologies, frameworks, methodologies, or soft skills applied.
   Organised by category if possible (e.g. Frontend, Backend, Tools, Soft Skills).

7. LEARNING OUTCOMES (optional)
   What did you learn, improve at, or grow into this period?
   This can be technical skills, process improvements, or professional development.

8. GOALS / NEXT STEPS (optional)
   What are you aiming for in the next period?
==============================
```

If the user provides raw notes in any format (not this template), extract what you can and proceed. Do not ask for clarification on every missing field — make reasonable inferences where possible, flag anything critical that's missing, and note where placeholders are used.

---

## Step 2: Generate the Brag Document

Use **exactly** the section order and formatting rules below. Do not add, remove, or reorder sections without reason.

---

### FORMATTING RULES

- **Header label**: `WORK ACCOMPLISHMENTS` in small caps or uppercase, flush left, above the title — always present.
- **Document title**: `[Month/Quarter Year] Brag Document` OR a thematic subtitle if the period had a single dominant focus. Use title case.
- **Executive summary**: 2–4 sentences directly below the title (no sub-heading). Summarise the period's overall impact and focus. This is a "leadership-level" paragraph — high signal, no fluff.
- **Main sections**: Use `##`-level headings (bold, large). Named after the project, service, product, or work area.
- **Sub-categories within sections**: Use **Bold Label:** format (bold text followed by colon). These group related bullets under a theme (e.g. **Feature Development:**, **Client Collaboration:**, **Infrastructure:**, **Process Improvements:**).
- **Bullets**: Start every bullet with a strong action verb (see verb bank below). No first-person "I" in bullets. Concise — one idea per bullet.
- **Sub-bullets**: Indent with ○ or – for supporting detail, additional context, or listed items within a bullet.
- **Impact callout** (per project, optional): After the bullets for a project, add a short **[Project Name] Impact Summary** using 3–5 bullet points that distil the measurable or strategic outcomes of that work area.
- **Metrics**: Include numbers, percentages, counts, time estimates, or scale wherever possible. If the user provides none, flag with `[add metric]` rather than omitting the bullet.
- **Highlights & Impact section**: A dedicated section near the end. Each bullet starts with a **bolded key phrase** followed by a plain explanatory sentence. Focus on outcomes, not activities.
- **Skills & Technologies Applied**: Categorised list. Format: `**Category:** Item1, Item2, Item3`. Common categories: Frontend, Backend, DevOps & Tools, AI/ML, Soft Skills, Domain-Specific.
- **Learning section**: Always use the label `LEARNING` (uppercase, as a section label — not a heading), followed by a heading `## Learning & Growth` or `## Learning Outcomes`. Content can be bullet points or short prose paragraphs. Focus on what was gained, practised, or deepened — not just what was done.
- **Utilized Skills**: End with `UTILIZED SKILLS` label, followed by a flat tag-style list of all skills. Comma-separated or formatted as chips/tags.

---

### SECTION ORDER (always follow this sequence)

```
WORK ACCOMPLISHMENTS                          ← label, always present

[Month/Period Year] Brag Document             ← title

[Executive summary paragraph — 2–4 sentences]

## [Project / Work Area A]
[Optional: 1-sentence context for what this area is]

**[Sub-category 1]:**
• [Strong verb] + [what] + [outcome/metric if available]
  ○ [Supporting detail or sub-item]
• [Strong verb] + [what] + [outcome/metric]

**[Sub-category 2]:**
• ...

[Project A] Impact Summary
• [Bolded outcome phrase] [plain explanation]
• ...

---

## [Project / Work Area B]
[repeat structure above]

---

## [Learning & R&D / Side Projects]   ← if applicable
[Named sub-project]
[Brief context sentence]
**Key Contributions**
• ...

---

## Highlights & Impact
• **[Bolded key phrase]** [plain sentence describing the outcome]
• **[Bolded key phrase]** [plain sentence]
• ...

## Skills & Technologies Applied
• **[Category]:** [Item1, Item2, Item3]
• **[Category]:** [Item1, Item2]

---

LEARNING

## Learning & Growth
[Prose paragraph(s) OR bullet list of learning outcomes]
• [What was learned / practised / deepened]
• [How it applies to current or future work]

UTILIZED SKILLS
[Tag1, Tag2, Tag3, Tag4, ...]
```

---

## Step 3: Writing Style Rules

Apply all of the following throughout the document:

**Voice & Tone**
- Active voice throughout. No passive constructions ("was built" → "Built").
- No first-person pronouns in bullets ("I built" → "Built").
- Prose sections (executive summary, learning) may use first person sparingly.
- Confident, not boastful. Precise, not vague. Professional, not corporate-bland.

**Action Verb Bank** (rotate — do not repeat the same verb more than 2–3 times)
Built, Implemented, Developed, Delivered, Designed, Engineered, Launched, Shipped, Led, Managed, Coordinated, Facilitated, Streamlined, Optimised, Reduced, Improved, Increased, Automated, Integrated, Refactored, Migrated, Validated, Tested, Documented, Researched, Evaluated, Prototyped, Contributed, Collaborated, Presented, Completed, Established, Standardised, Resolved, Enhanced, Deployed, Created, Drafted, Reviewed, Analysed, Identified, Trained, Mentored, Supported, Simplified

**Metrics & Evidence**
- Always prefer specific numbers over vague qualifiers ("reduced processing time by 40%" not "faster").
- If a metric is unknown, insert `[add metric]` as a placeholder.
- When quoting feedback or praise, use direct quotes in quotation marks and attribute to role (not necessarily name): e.g., *"This was exactly what we needed."* — Senior Manager
- If no feedback is available, omit the feedback section entirely. Do not fabricate quotes.

**Grouping Logic**
- Group related contributions under a sub-category rather than listing 10 loose bullets.
- Aim for 3–6 bullets per sub-category.
- If a project has more than ~8 bullets total, split into sub-categories.

**Handling Missing Data**
- Missing metrics → insert `[add metric]` inline
- Missing project context → infer from contribution descriptions and note any assumptions in italics at the end
- Missing feedback → omit that sub-section silently
- Missing skills list → infer from contribution descriptions and list them
- Missing learning section → generate a brief one based on what the contributions imply the person learned
- Missing side projects → omit that section entirely

---

## Step 4: Final Quality Check

Before presenting the output, verify:

- [ ] `WORK ACCOMPLISHMENTS` label is at the top
- [ ] Every bullet starts with a strong action verb (no "I", no passive)
- [ ] Every project has at least one sub-category label
- [ ] Numbers/metrics are included or flagged with `[add metric]`
- [ ] Highlights & Impact section is present and outcome-focused
- [ ] Skills & Technologies Applied section is categorised
- [ ] LEARNING section and UTILIZED SKILLS tag list are at the bottom
- [ ] No section is missing from the standard order
- [ ] Tone is consistent: confident, factual, professional

---

## Universal Applicability Notes

This skill works for **any role or industry**. Adapt the language and sub-categories accordingly:

| Role type | Typical sub-categories |
|---|---|
| Software / Engineering | Feature Development, Backend/Frontend, Infrastructure, Testing, Documentation |
| Product / Design | Discovery & Research, Feature Design, Stakeholder Alignment, Metrics & Outcomes |
| Marketing / Content | Campaigns, Content Creation, Analytics, Brand, Partnerships |
| Operations / Project Management | Process Improvements, Delivery, Risk Management, Reporting, Team Coordination |
| Healthcare / Clinical | Patient Outcomes, Protocol Adherence, Training, Cross-functional Collaboration |
| Sales / Customer Success | Pipeline, Closed Deals, Retention, Client Relationships, Enablement |
| Research / Academia | Studies/Experiments, Publications, Presentations, Grants, Mentorship |
| Finance / Accounting | Reporting, Compliance, Process Efficiency, Audits, Cost Savings |

Regardless of domain: always use the same document structure. Only the sub-category names and vocabulary change.
