---
name: pro-task-breakdown
description: Generate professional task breakdown CSVs from feature/epic descriptions. Use when asked to "create task breakdown", "plan tasks", "break down work", "estimate tasks", "make a roadmap", "task breakdown CSV", or "plan sprint". Produces structured CSVs with Module, Feature, Task Breakdown, Task Details, and Estimation columns — technical enough for developers, readable for stakeholders.
---

# Task Breakdown Generator

Generate professional, structured task breakdown CSVs from feature or epic descriptions. Output matches the DoItNow roadmap planning format — `Module → Feature → Task → Details → Estimation` — and is designed to be **technically precise** while remaining **readable by non-technical stakeholders**.

## When to use

- Converting a feature spec or PRD into an actionable task list
- Breaking down an epic into sprint-ready tasks with time estimates
- Producing a planning sheet for stakeholder review
- Generating roadmap phase task breakdowns

## How it works

The skill has two parts:

1. **You (the agent) decompose the feature/epic into the JSON schema** below — this is where the real work happens: reading the codebase, understanding architecture, and producing accurate task definitions.
2. **The driver (`driver.mjs`) converts that JSON into a formatted CSV** with summary tables.

## Quick start

### Step 1 — Produce the JSON structure

Given a feature description or spec, decompose it into this schema:

```json
{
  "project": "ProjectName",
  "phase": "Phase Label",
  "modules": [
    {
      "name": "Module Name",
      "features": [
        {
          "name": "Feature Name",
          "tasks": [
            {
              "title": "Imperative task title (e.g. 'Create WidgetPreview.tsx page')",
              "details": [
                "Bullet point with specific technical detail",
                "Another bullet — concrete, not vague",
                "Include file names, function signatures, config keys",
                "Mention what changes and where"
              ],
              "estimation_days": 0.25
            }
          ]
        }
      ]
    }
  ]
}
```

### Step 2 — Run the driver

```bash
node .claude/skills/pro-task-breakdown/driver.mjs \
  --input tasks.json \
  --output phase1_tasks.csv \
  --detail
```

This produces:
- A CSV file at `phase1_tasks.csv`
- A **summary table** with per-module task counts and day totals
- A **detailed task table** listing every task with feature grouping

### Piped input (agent workflow)

```bash
echo "$JSON" | node .claude/skills/pro-task-breakdown/driver.mjs --stdin --output tasks.csv
```

### Summary only (no CSV file)

```bash
node .claude/skills/pro-task-breakdown/driver.mjs --input tasks.json --summary-only --detail
```

## Decomposition rules — writing great task breakdowns

These are the rules that make the output professional and useful. Follow them when producing the JSON.

### Structure

| Level | Purpose | Example |
|---|---|---|
| **Module** | Major feature area or system layer | "Widget Preview", "FREE Plan – DB + Backend", "FREE Plan – Frontend" |
| **Feature** | A cohesive unit of work within a module | "Hosted Preview Page", "Rate Limiting Middleware" |
| **Task** | A single developer-day-or-less unit of work | "Create WidgetPreview.tsx page" |
| **Detail** | Concrete implementation bullets | "Dynamically loads doitnow-widget.js via script tag" |

### Task title guidelines

- **Imperative mood** — "Create…", "Add…", "Implement…", "Update…", "Block…", "Deprecate…"
- **Specific** — include the file, component, or function name when possible
- **Short** — under 60 characters; details go in the bullets
- **Self-contained** — a developer should understand the scope from the title alone

### Detail bullet guidelines

Each bullet should be:
- **Technically precise** — mention specific files, functions, API endpoints, DB columns, config keys
- **One fact per bullet** — don't bundle unrelated changes
- **Implementation-oriented** — describe *what to do*, not *why* (the "why" is in the spec)
- **Concrete** — prefer `INSERT new row: PlanName='Free'` over `Add free plan to database`
- **Readable** — a project manager or stakeholder should understand the *scope* even if they don't understand the *mechanics*

Good example:
```
• After user creation: look up FREE PricingPlan by name "Free"
• Read PlanDurationDays feature value (default 30) via FeatureAccessService
• Create Subscription entity: Status=Active, PlanId=freePlan.Id, BillingCycle="Monthly"
• Skip Stripe customer creation for FREE users (make conditional)
```

Bad example:
```
• Handle free plan signup
• Set up subscription stuff
• Don't use Stripe for free users
```

### Estimation guidelines

| Size | Days | Typical scope |
|---|---|---|
| Trivial | 0.05 | One-line config change, add a constant |
| Small | 0.1 – 0.15 | Add a route, add a seed row, add a type field |
| Medium | 0.25 – 0.3 | New component, new API method, feature flag check |
| Large | 0.4 – 0.5 | Full feature with multiple files, middleware, complex logic |
| Extra large | 0.5+ | Multi-system integration, cross-cutting concern |

**Rule of thumb:** If a task exceeds 1 day, split it. Each task should be completable in a single sitting.

### Module grouping guidelines

- **By system layer** — "DB + Backend", "Frontend", "Shared/Infra"
- **By feature domain** — "Widget Preview", "Subscription & Billing", "Onboarding"
- **By concern** — "Search – Query Limit & Enforcement", "Rate Limiting"

Avoid grouping by person or by sprint — the breakdown is about *what*, not *who* or *when*.

## Strict 1:1 completeness rules

Every task breakdown must be a **faithful, complete representation** of the source spec (markdown plan, PRD, or design doc). The reviewer should be able to trace every spec requirement to at least one task bullet, and find no task bullet that has no spec basis.

### Traceability checklist — run this before finalizing

Before writing the JSON, walk through every section of the source spec and verify each of these:

| # | Check | How to verify |
|---|---|---|
| 1 | **Every entity/DB change mentioned in spec → present in task details** | Search spec for table/column/entity names. Each must appear in at least one task bullet with the exact field name. |
| 2 | **Every API endpoint in spec → has its own task or explicit bullet** | Search spec for `POST`, `GET`, `PUT`, `DELETE`, endpoint paths. Each unique endpoint path must appear in a task. |
| 3 | **Every file path in spec → mentioned in the relevant task** | Search spec for file paths (e.g. `Services/IdentityService/.../AuthController.cs`). Each must appear in the task that modifies it. |
| 4 | **Every DTO field in spec → explicitly listed in task details** | Search spec for request/response shapes. Every field in every DTO must appear in a task bullet. |
| 5 | **Every enum/constant value in spec → reproduced exactly** | Search spec for enum values, config keys, magic numbers. Each must appear verbatim in a task bullet. |
| 6 | **Every auth/security rule in spec → explicitly stated** | Search spec for `[AllowAnonymous]`, `[Authorize]`, auth middleware. If the spec is silent, flag it — don't invent rules that break the feature. |
| 7 | **Every test case in spec's testing checklist → covered by a test task** | Match each row in the spec's test table to a bullet in a test task. |
| 8 | **Every conditional/branch in spec logic → has a task bullet** | If the spec says "if X, do Y; else do Z" — both branches must appear in task details. |
| 9 | **Every reference to an external system/dependency → noted** | Hangfire, Stripe, Firecrawl, Redis, etc. — each must be named in the relevant task. |

### Concrete rules

1. **Exact values, not paraphrases.** If the spec says `AllowedModelIds = "[1]"`, the task bullet says `AllowedModelIds=[1]` — not "restrict models." If the spec says `ExpiredDate = UtcNow.AddDays(7)`, the bullet says `ExpiredDate=UtcNow+7d`.

2. **File paths are mandatory.** Every task that modifies code must include the exact file path from the spec's file impact summary. If the spec lists `Services/IdentityService/.../AuthController.cs`, that path appears in the task details. No exceptions.

3. **No invented constraints.** If the spec doesn't specify an auth rule for an endpoint, don't add one that could break the feature. Instead, flag it: "Auth: not specified in spec — confirm with stakeholder." The one exception: if the spec's flow *requires* a specific auth model to work (e.g. an unauthenticated visitor needs to poll a status endpoint), then state the implied auth and note it's derived from the flow, not the spec.

4. **DTO shapes must be complete.** Every field in every request/response DTO from the spec must appear in a task bullet. Partial DTOs = incomplete breakdown. If the spec says `{ licenseKey, websiteUrl, expiredDate }`, all three fields must be listed — not just `licenseKey`.

5. **Spec gaps must be surfaced, not silently filled.** If the spec is ambiguous or missing information (e.g. "rate limit this endpoint" but no rate specified), include the spec's wording verbatim AND flag the gap: "Rate limit value not specified — using spec's suggestion of 5 req/min per IP."

6. **Exact paths, not approximations.** If the spec references a script path like `/standalone-widget/doitnow-widget.js`, use that exact path. If the spec has a path with a space or typo, note it: "Spec path `/standalone widget/doitnow-widget.js` — corrected to `/standalone-widget/doitnow-widget.js`."

7. **Step-by-step logic must be numbered.** When the spec describes a multi-step process (e.g. handler logic, data flow), reproduce the steps as numbered bullets that mirror the spec's order. Don't condense or reorder.

8. **Cross-reference the spec's file impact summary.** If the spec has a "files changed" table, verify every file in that table appears in at least one task. If a file is missing from your breakdown, it's a gap.

### Self-audit before running the driver

After writing the JSON, run this mental checklist:

- [ ] Every section heading in the source spec maps to at least one Module or Feature
- [ ] Every code block in the spec has its contents reflected in task details
- [ ] Every table row in the spec's test checklist has a matching test task bullet
- [ ] Every file in the spec's file impact summary appears in at least one task
- [ ] No task bullet introduces behavior not found in the spec (without flagging it)
- [ ] No spec requirement is missing from the breakdown

If any checkbox fails, fix the JSON before running the driver.

## Driver reference

```
node .claude/skills/pro-task-breakdown/driver.mjs [options]

Options:
  -i, --input <file>      Path to input JSON file
      --stdin             Read JSON from stdin
  -o, --output <file>     Path to output CSV file
      --summary-only      Only print summary table, skip CSV output
      --detail            Also print detailed per-task table
  -h, --help              Show help
```

## Output format

The CSV has 5 columns matching the roadmap planning sheet:

| Column | Description |
|---|---|
| `Module` | High-level feature area (repeated only on first row of group) |
| `Feature` | Sub-feature within the module (repeated only on first row) |
| `Task Breakdown` | Short imperative task title |
| `Task Details` | Bullet-pointed implementation details (`•` prefixed) |
| `Estimation (Days)` | Decimal day estimate |

## Files

| File | Purpose |
|---|---|
| `driver.mjs` | JSON → CSV converter with summary/detail tables |
| `sample_input.json` | Example input showing the full schema |
| `SKILL.md` | This file — usage instructions and decomposition rules |
