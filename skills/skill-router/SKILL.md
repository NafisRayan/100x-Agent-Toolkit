---
name: skill-router
description: Automatically selects and invokes the right skill(s) for any task. Use this skill FIRST on every user message — it analyzes the request and loads the appropriate specialized skills without asking. Handles multi-skill scenarios (e.g., a Next.js dashboard triggers nextjs-developer + tailwind-design-system + impeccable). This is the routing brain that ensures no relevant skill is missed. Trigger on EVERY task, EVERY message — this is the entry point that dispatches to everything else.
---

# Skill Router

You are the routing layer that sits between the user's request and the skill library. Your job: read the task, identify which skills apply, and invoke them immediately — no confirmation needed, no hesitation.

## How It Works

1. **Parse the user's intent** — What are they trying to do? What domain(s) does it touch?
2. **Match against the skill catalog** — Use the reference below to find all applicable skills
3. **Invoke all matching skills** — Load them via the Skill tool, in priority order
4. **Execute** — Follow the loaded skills' instructions to complete the task

You don't suggest skills. You don't ask permission. You load them and go.

## Priority Order

When multiple skills apply, load them in this sequence:

1. **Process skills** — How to approach the work (brainstorming, planning, debugging, TDD)
2. **Domain skills** — The technical area (nextjs-developer, prisma, cloudflare)
3. **Quality skills** — Standards to uphold (best-practices, accessibility, performance)
4. **Delivery skills** — How to ship (git-master, verification-before-completion)

## Decision Logic

```
For each user message:
  1. Extract: action verbs, technologies, file types, domain keywords
  2. Check: does this involve creating something new? → consider brainstorming
  3. Check: does this involve fixing a bug? → systematic-debugging
  4. Check: does this touch a specific framework/tool? → match domain skill
  5. Check: does this need multi-file changes? → incremental-implementation
  6. Check: is the user about to ship/commit? → verification-before-completion
  7. Load ALL that match — not just the "best" one
```

## The Skill Catalog

Below is the full routing map. Match user intent to skills.

### Web Frameworks & Frontend

| Signal in user's request | Skill(s) to load |
|---|---|
| Next.js, App Router, RSC, server components, server actions | `nextjs-developer`, `next-best-practices` |
| React performance, bundle size, re-renders | `vercel-react-best-practices` |
| Tailwind, design tokens, component library | `tailwind-design-system` |
| shadcn/ui, components.json, registry | `shadcn` |
| Material-UI, MUI, sx prop | `mui` |
| Vite, vite.config, Rolldown | `vite` |
| 21st.dev, 21st components | `21st-dev-builder-v2` |
| UI design, redesign, polish, audit UI | `impeccable` |
| Responsive layout, container queries, fluid | `responsive-design` |
| Animations, Motion, Framer Motion | `motion` or `motion-framer` |
| GSAP, timeline animations | `gsap` |
| Scroll animations, parallax, reveal | `scroll-animations` |
| Three.js, 3D, WebGL, R3F | `threejs-webgl` or `3d-web-experience` |
| Modern web design trends, micro-interactions | `modern-web-design` |
| Web accessibility, WCAG, a11y | `accessibility` |
| Core Web Vitals, LCP, CLS, INP | `core-web-vitals` |
| SEO, meta tags, structured data | `seo` |
| SEO audit, rankings, indexing | `seo-audit` |
| Page speed, load time, performance | `performance` |

### Backend & APIs

| Signal | Skill(s) |
|---|---|
| Node.js, Express, REST API | `nodejs-express-server`, `nodejs-backend-patterns` |
| Node.js architecture, async patterns | `nodejs-best-practices` |
| FastAPI, Pydantic, async Python | `fastapi-expert` |
| NestJS, decorators, modules, DI | `nestjs-best-practices` |
| Prisma, schema, migrations, ORM | `prisma` or `prisma-expert` |
| SQL queries, slow queries, EXPLAIN | `sql-pro`, `sql-optimization-patterns` |
| Database performance, indexes | `database-optimizer` |
| Postgres, Supabase | `supabase-postgres-best-practices` |
| Neon, serverless postgres | `neon-postgres` |
| Docker, containers, multi-stage | `docker-expert` |
| Cloudflare Workers, KV, D1, R2 | `cloudflare` |

### Mobile

| Signal | Skill(s) |
|---|---|
| React Native, Expo, mobile | `mobile-developer`, `vercel-react-native-skills` |
| Expo Router, native UI | `building-native-ui` |

### Development Process

| Signal | Skill(s) |
|---|---|
| Creating something new, feature design | `brainstorming` (load FIRST) |
| Planning, task breakdown, scope | `planning-and-task-breakdown`, `writing-plans` |
| TDD, write tests first, red-green-refactor | `test-driven-development` |
| Bug, error, unexpected behavior | `systematic-debugging` |
| Multi-file change, large feature | `incremental-implementation` |
| Independent parallel tasks | `dispatching-parallel-agents` |
| Execute a plan with subagents | `subagent-driven-development` |
| Code review, before merge | `requesting-code-review` |
| Received review feedback | `receiving-code-review` |
| About to claim work is done | `verification-before-completion` |
| Git operations, branching, rebase | `git-master` |
| Finishing a branch, ready to merge | `finishing-a-development-branch` |
| Git worktrees, isolated workspace | `using-git-worktrees` |

### Code Quality & Patterns

| Signal | Skill(s) |
|---|---|
| TypeScript generics, conditional types | `typescript-advanced-types` |
| JavaScript, ES2023+, async/await | `javascript-pro` |
| Best practices, security audit, modernize | `best-practices` |
| Performance optimization, profiling | `performance` |
| Python performance, profiling, cProfile | `python-performance-optimization` |
| Code simplification, reduce complexity | (use `/code-simplify` command) |
| Deep code review, multi-agent review | `ultrareview` |

### Documents & Files

| Signal | Skill(s) |
|---|---|
| PDF, .pdf, extract from PDF, merge PDF | `pdf` |
| Word doc, .docx, report, memo | `docx` |
| Spreadsheet, .xlsx, .csv, tabular data | `xlsx` |
| Slides, .pptx, presentation, deck | `pptx` |
| Mermaid diagram, flowchart, sequence diagram | `mermaid` |

### Documentation & Writing

| Signal | Skill(s) |
|---|---|
| Write docs, README, API docs | `docs-writing` or `documentation-writer` |
| Docstrings, JSDoc, OpenAPI spec | `code-documenter` |
| Co-author a doc, proposal, spec | `doc-coauthoring` |
| Internal comms, status report, newsletter | `internal-comms` |

### Design & Figma

| Signal | Skill(s) |
|---|---|
| Figma, write to Figma, create in Figma | `figma-use` + `figma-generate-design` |
| Implement from Figma, Figma to code | `figma-implement-design` |
| Design system, DESIGN.md | `design-md` |
| Canvas art, poster, visual design | `canvas-design` |
| Generative art, algorithmic art, p5.js | `algorithmic-art` |
| Theme, styling artifacts | `theme-factory` |

### Business & Marketing

| Signal | Skill(s) |
|---|---|
| Product brief, requirements, discovery | `business-analyst` |
| Sales deck, pitch deck, objection handling | `sales-enablement` |
| Psychology, persuasion, cognitive bias | `marketing-psychology` |
| Grill me, stress-test my plan | `grill-me` |

### Infrastructure & DevOps

| Signal | Skill(s) |
|---|---|
| MCP server, Model Context Protocol | `mcp-builder` |
| Shopify, Liquid, Storefront API | `shopify-expert` |
| Migrate Next.js to Vite | `migrate-to-vinext` |

### Meta / Skills Management

| Signal | Skill(s) |
|---|---|
| Create a skill, improve a skill | `skill-creator` |
| Find a skill, install a skill | `find-skills` |
| Look up library docs, current API | `context7` |
| Search the web, DuckDuckGo | `duckduckgo-search` |
| Browser automation, scrape, test web app | `agent-browser` |

### Project Management (GSD)

| Signal | Skill(s) |
|---|---|
| New project, project setup | `gsd:new-project` |
| Plan a phase, roadmap | `gsd:plan-phase`, `gsd:roadmap` |
| Execute phase, run tasks | `gsd:execute-phase` |
| Debug with GSD | `gsd:debug` |
| Project progress, status | `gsd:progress` |

## Multi-Skill Combinations

Common task patterns that always need multiple skills loaded together:

| Task pattern | Skills to load |
|---|---|
| "Build a new feature" | `brainstorming` → `planning-and-task-breakdown` → `incremental-implementation` → `test-driven-development` |
| "Build a Next.js page" | `nextjs-developer` + `tailwind-design-system` + `impeccable` |
| "Fix this bug" | `systematic-debugging` + (domain skill based on the code) |
| "Review this PR" | `requesting-code-review` + `best-practices` |
| "Deploy to Cloudflare" | `cloudflare` + `docker-expert` (if containers involved) |
| "Create a dashboard" | `nextjs-developer` + `tailwind-design-system` + `impeccable` + `responsive-design` |
| "Optimize my database" | `database-optimizer` + `sql-pro` + `supabase-postgres-best-practices` |
| "Write a Word report from this data" | `xlsx` (to read) + `docx` (to write) |

## Rules

1. **Always load, never suggest.** When you identify a matching skill, invoke it immediately.
2. **More is better than fewer.** If 3 skills are relevant, load all 3. The cost of loading an extra skill is near-zero; the cost of missing one is high.
3. **Process skills first.** Always load brainstorming/debugging/planning before domain skills.
4. **Don't double-load.** If a skill is already active in the conversation, don't invoke it again.
5. **When in doubt, load it.** A 20% match is enough to justify loading a skill.
6. **Read the room.** If the user says "just do X quickly" or "skip the process stuff," respect that — load only the domain skills, not the process overhead.
7. **Subagent exception.** If you were dispatched as a subagent with a specific task, don't route — just do the task.

## Edge Cases

- **"Help me with X" (vague):** Load the most likely domain skill + `brainstorming` to clarify
- **No skill matches:** That's fine — respond directly without loading anything
- **User explicitly names a skill:** Load exactly what they asked for, skip routing logic
- **Conflicting skills (e.g., `motion` vs `motion-framer`):** Load the one whose description better matches the user's specific library/version; when unclear, load the first match
- **GSD project context:** If the workspace has `.gsd/` directory, prefer GSD workflow skills for project management tasks
