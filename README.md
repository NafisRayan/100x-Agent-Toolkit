# 100x Agent Toolkit

A production-grade engineering toolkit for AI-assisted software development. Contains **168 specialized skill workflows** (100 core + 68 GSD sub-skills), **142 expert agent personas**, **24 design system specifications**, and **9 MCP server integrations** — all designed to enforce professional engineering standards across the full development lifecycle: **Define → Plan → Build → Verify → Review → Ship → Scale**.

---

## Architecture

The system uses a **two-layer composition model**:

| Layer | What it is | Example | Role |
|-------|-----------|---------|------|
| **Skill** | A workflow with steps and exit criteria | `test-driven-development` | The *how* |
| **Persona** | A role with a perspective and output format | `code-reviewer` | The *who* |

Personas don't call other personas. The orchestrator skill handles composition.

> **Important:** Skills carry 99% of the system's value. The `agents/` directory (142 personas), `rules/` directory (104 language-specific rules across 18 languages), `references/` directory (5 domain checklists), `docs/` directory (3 guides), and `commands/` directory (86 slash commands) were all converted into two skills — `agent-personas` and `syntax-rules` — because skills provide auto-triggering, progressive loading, on-demand references, and universal compatibility across any AI tool. The rest was redundant with existing skills or no longer needed. If you're utilizing or maintaining this toolkit, prioritize skills first.
---

## Directory Structure

```
./
├── AGENTS.md              # System prompt — the master configuration
├── README.md              # This file
│
├── skills/                # 168 specialized skill workflows (100 core + 68 GSD sub-skills)
│   └── <skill-name>/
│       ├── SKILL.md       # Skill definition (YAML frontmatter + instructions)
│       ├── references/    # Domain-specific documentation (includes 142 agent personas)
│       ├── scripts/       # Automation scripts (Python, JS, Shell)
│       ├── assets/        # Starter projects, templates, images
│       └── evals/         # Evaluation test cases
│   └── ...
│
├── mcps/
│   └── mcp.json           # 9 MCP server configurations
│
└── designs/
    ├── DESIGN-figma.md    # Figma-inspired design system
    ├── DESIGN-airbnb.md   # Airbnb design system
    ├── DESIGN-apple.md    # Apple design system
    ├── DESIGN-stripe.md   # Stripe design system
    ├── DESIGN-notion.md   # Notion design system
    ├── DESIGN-vercel.md   # Vercel design system
    └── ... (24 total: airbnb, apple, binance, bmw, claude, cursor, expo, figma, framer, meta, minimax, mongodb, notion, nvidia, pinterest, revolut, stripe, supabase, superhuman, uber, vercel, warp, webflow, xai)
```

---

## Quick Start

This repository is a **skill bundle** — it configures your AI agent (Claude Code, Cursor, Copilot, etc.) with domain expertise, workflows, and quality gates.

1. Clone the repository and rename the folder to `.agents`, then place it in your home directory:
   - **Windows**: `C:\Users\<YourUsername>\.agents`
   - **macOS / Linux**: `~/.agents`
2. The `AGENTS.md` file is the entry point — your agent reads it on startup and gains access to all skills and personas.
3. Skills drive the lifecycle through auto-triggering:
   - `brainstorming` → define what to build
   - `planning-and-task-breakdown` → plan how to build it
   - `incremental-implementation` → implement incrementally
   - `test-driven-development` → verify it works
   - `requesting-code-review` → quality assurance
   - `finishing-a-development-branch` → deploy to production

---

## Skills Catalog

### Define & Plan
| Skill | Description |
|-------|-------------|
| `brainstorming` | Explore intent and requirements before implementation |
| `planning-and-task-breakdown` | Decompose specs into verifiable tasks |
| `writing-plans` | Create detailed implementation plans |
| `executing-plans` | Execute written plans with checkpoints |

### Build & Code
| Skill | Description |
|-------|-------------|
| `incremental-implementation` | Thin vertical slices with feature flags |
| `test-driven-development` | Red-Green-Refactor with test pyramid |
| `source-driven-development` | Ground decisions in official documentation |
| `subagent-driven-development` | Execute plans with independent sub-agents |
| `karpathy-guidelines` | Behavioral guidelines to reduce LLM coding mistakes |

### Web & Frontend
| Skill | Description |
|-------|-------------|
| `nextjs-developer` | Next.js 14+ App Router, RSC, Server Actions |
| `next-best-practices` | File conventions, RSC boundaries, data patterns |
| `vercel-react-best-practices` | React/Next.js performance optimization |
| `shadcn` | Component management for shadcn/ui |
| `motion` | React animations with Motion (bundle-optimized) |
| `motion-framer` | React animations (Framer Motion / Motion) |
| `gsap` | GSAP animation reference and patterns |
| `modern-web-design` | 2024-2025 design trends and implementation |
| `tailwind-design-system` | Tailwind CSS design tokens and component libraries |
| `responsive-design` | Container queries, fluid typography, grid |
| `web-design-guidelines` | UI code review against design best practices |
| `web-quality-audit` | Comprehensive web quality audit |
| `ui-ux-pro-max` | 50+ styles, 161 color palettes, 57 font pairings |
| `scroll-animations` | Scroll-triggered animations and parallax |
| `21st-dev-builder-v2` | Build with 1400+ shadcn/ui components |
| `impeccable` | Critique, polish, and improve frontend interfaces |
| `design-system` | Design-system driven by specification files |
| `accessibility` | WCAG 2.2 audit and compliance |
| `building-native-ui` | Expo Router native app development |
| `mobile-developer` | React Native and Expo mobile development |
| `vercel-react-native-skills` | React Native performance and best practices |
| `mui` | Material-UI v7 component patterns |

### Automation & Workflow
| Skill | Description |
|-------|-------------|
| `n8n-code-javascript` | JavaScript Code node patterns for n8n workflows |

### Backend & API
| Skill | Description |
|-------|-------------|
| `fastapi-expert` | Async Python APIs with FastAPI + Pydantic V2 |
| `nodejs-express-server` | Production-ready Express.js servers |
| `nodejs-backend-patterns` | Express/Fastify middleware, auth, API design |
| `nodejs-best-practices` | Node.js development principles and decision-making |
| `nestjs-best-practices` | NestJS architecture and DI patterns |
| `shopify-expert` | Shopify themes, apps, and Storefront API |

### Database
| Skill | Description |
|-------|-------------|
| `prisma` | ORM queries, mutations, relations, schema |
| `prisma-expert` | Schema design, migrations, query optimization |
| `sql-pro` | Complex joins, window functions, indexing |
| `supabase-postgres-best-practices` | Postgres performance from Supabase |
| `neon-postgres` | Serverless Postgres with Neon |

### Cloud & Infrastructure
| Skill | Description |
|-------|-------------|
| `cloudflare` | Workers, Pages, D1, R2, KV, AI, Agents SDK |
| `docker-expert` | Multi-stage builds, orchestration, security hardening |
| `vite` | Build tool config, plugin API, SSR, Rolldown |
| `migrate-to-vinext` | Migrate Next.js projects to vinext (Vite-based) |

### Quality & Testing
| Skill | Description |
|-------|-------------|
| `systematic-debugging` | Structured bug investigation |
| `verification-before-completion` | Run commands before claiming success |
| `receiving-code-review` | Handle feedback with technical rigor |
| `requesting-code-review` | Get quality feedback before merge |
| `best-practices` | Modern web development best practices |
| `performance` | Measure-first Core Web Vitals improvement |
| `core-web-vitals` | Optimize LCP, INP, CLS |
| `ultrareview` | Multi-agent parallel code review |
| `playwright-cli` | Playwright CLI automation, testing, and session management |

### 3D & Graphics
| Skill | Description |
|-------|-------------|
| `3d-web-experience` | Three.js, React Three Fiber, Spline, WebGL |
| `threejs-webgl` | Interactive 3D scenes, materials, lighting |
| `algorithmic-art` | Generative art and creative coding |

### Documentation
| Skill | Description |
|-------|-------------|
| `code-documenter` | Docstrings, OpenAPI specs, JSDoc, doc sites |
| `docs-writing` | Diataxis framework, Stripe-style clarity |
| `doc-coauthoring` | Structured workflow for co-authoring docs |
| `mermaid` | Flowcharts, sequence diagrams, C4 architecture |
| `design-md` | Synthesize design systems into DESIGN.md files |
| `humanizer` | Remove AI writing patterns, make text sound natural |
| Skill | Description |
|-------|-------------|
| `docx` | Word document generation and manipulation |
| `pptx` | PowerPoint deck creation and editing |
| `xlsx` | Spreadsheet creation, editing, data cleaning |
| `pdf` | PDF read, merge, split, OCR, form filling |

### Business
| Skill | Description |
|-------|-------------|
| `business-analyst` | Product discovery and requirements analysis |
| `sales-enablement` | Sales collateral, pitch decks, demo scripts |
| `marketing-psychology` | Behavioral science applied to marketing |
| `brag-document` | Work accomplishments reports and self-reviews |
| `internal-comms` | Internal communications writing |

### Design & Creativity
| Skill | Description |
|-------|-------------|
| `figma-developer` | Figma to React component conversion |
| `canvas-design` | Visual art in .png and .pdf documents |
| `algorithmic-art` | Generative art and creative coding with p5.js |
| `theme-factory` | Styling artifacts with pre-set themes |

### Languages
| Skill | Description |
|-------|-------------|
| `javascript-pro` | Modern ES2023+ JavaScript patterns |
| `typescript-advanced-types` | Generics, conditional types, mapped types |
| `python-performance-optimization` | Profile and optimize Python code |
| `syntax-rules` | Language-specific coding standards for 18 languages |

### SEO
| Skill | Description |
|-------|-------------|
| `seo` | Search engine visibility optimization |
| `seo-audit` | Diagnose SEO issues on websites |

### Meta & Dev Tools
| Skill | Description |
|-------|-------------|
| `enhance-prompt` | Transform vague UI ideas into polished prompts |
| `skill-creator` | Build new skills with evaluation |
| `find-skills` | Discover skills for specific tasks |
| `agent-browser` | Browser automation for AI agents |
| `mcp-builder` | Build MCP server integrations |
| `context7` | Retrieve up-to-date library docs |
| `duckduckgo-search` | Web search without API keys |
| `using-git-worktrees` | Isolated workspace for feature work |
| `using-superpowers` | Find and use skills effectively |
| `dispatching-parallel-agents` | Run independent tasks concurrently |
| `finishing-a-development-branch` | Guide completion of dev work |
| `clone-website` | Reverse-engineer and clone websites from URLs |
| `caveman` | Ultra-compressed communication mode |
| `grill-me` | Interview user about a plan or design |
| `gsd` | Get Shit Done project management (68 sub-skills) |
| `agent-personas` | 142 expert agent personas across 23 categories |

---

## MCP Server Integration

The system connects to 9 external tools via Model Context Protocol (`mcps/mcp.json`):

| Server | Purpose | Status |
|--------|---------|--------|
| `@vkhanhqui/figma-mcp-go` | Figma design integration | Configured |
| `@21st-dev/magic` | 21st.dev component marketplace | Configured |
| `playwright` | Browser automation | Configured |
| `chrome-devtools` | Chrome DevTools access | Configured |
| `context7` | Upstash Context7 for library docs | Configured |
| `storybook-mcp` | Storybook component explorer | Requires URL |
| `firecrawl` | Web crawling | Requires API key |
| `typescript-lsp` | TypeScript language server | Configured |
| `vercel` | Vercel deployment | Requires API token |

---

## Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: your-skill-name
   description: What triggers this skill
   ---
   ```
2. Add workflow steps, verification gates, and anti-rationalization sections.
3. Optionally add `references/`, `scripts/`, `assets/`, or `evals/` subdirectories.
4. Register the skill in AGENTS.md under the appropriate category.
5. Use the `skill-creator` skill for detailed guidance.

---

## Migration Log — Folders Converted to Skills

During the shift to a skill-first architecture, several top-level directories were absorbed into skills. Skills are the better home for this content because they get progressive loading (metadata first, full content on trigger), automatic context-based activation, bundled references that load only when needed, and a single `skills/` entry point instead of scattered root-level directories.

### `agents/` → `skills/agent-personas/` (converted)

142 agent persona `.md` files across 23 categories (core, development, data-ai, infrastructure, quality-testing, security, reviewers, build-resolvers, specialized, orchestrators, etc.) moved into `skills/agent-personas/references/`.

**Why skills work better**: Agent personas were standalone `.md` files in a directory tree with no triggering mechanism — they only activated when manually referenced or via commands. As a skill, the personas get a unified SKILL.md that explains when and how to use each agent, auto-triggers on agent-related queries ("which agent should I use", "set up a code review team"), and bundles the full persona catalog as reference files that load on demand instead of sitting in context permanently.

### `rules/` → `skills/syntax-rules/` (converted)

104 rule files across 18 languages (TypeScript, Python, Rust, Go, Java, Kotlin, Swift, C++, C#, PHP, Dart, Angular, ArkTS, F#, Perl, web, zh) plus 10 common universal rules moved into `skills/syntax-rules/references/`.

**Why skills work better**: Rules lived in a flat directory tree with no triggering — they had to be manually installed into `~/.claude/rules/` and were always in context even when writing a different language. As a skill, the rules auto-trigger only when writing or reviewing code in the relevant language, load language-specific rules on demand (no need to keep all 18 languages in context), and include a structured workflow (detect language → load rules → apply → report violations) that the raw directory never had.

### `references/` (deleted)

5 domain checklists (security-checklist.md, testing-patterns.md, performance-checklist.md, accessibility-checklist.md, orchestration-patterns.md) removed.

**Why deleted**: These were static markdown files that required manual lookup and had no triggering mechanism. Their content is now redundant — every topic they covered is handled more thoroughly by dedicated skills (`security` skill for security checks, `test-driven-development` for testing patterns, `performance` for performance optimization, `accessibility` for WCAG compliance, and `dispatching-parallel-agents` for orchestration patterns). Skills provide the same information plus actionable workflows, verification gates, and auto-triggering.

### `docs/` (deleted)

3 documentation files (best-practices.md, creating-agents.md, dependencies.md) removed.

**Why deleted**: These were one-time setup guides that don't benefit from being in context during normal operation. `best-practices.md` and `creating-agents.md` were about how to configure the agent system itself — useful for humans setting up the repo, not something the AI needs loaded at runtime. `dependencies.md` was a Context7 MCP setup instruction that's now covered by the `context7` skill. Keeping these as root-level docs meant they were always visible but rarely useful — the skill-based approach loads equivalent guidance only when relevant.

### `commands/` (deleted)

86 slash command definitions (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, etc.) removed.

**Why deleted**: Slash commands were a convention specific to Claude Code's `.claude/commands/` directory structure — they don't port to other AI systems (Cursor, Copilot, Windsurf, etc.) and required manual installation into `~/.claude/commands/`. The workflows these commands encoded — spec → plan → build → test → review → ship — are already captured as skills (`brainstorming`, `planning-and-task-breakdown`, `incremental-implementation`, `test-driven-development`, `best-practices`, `finishing-a-development-branch`). Skills are universal, self-documenting, and work across any AI tool that reads a markdown file. Commands were thin orchestration wrappers around skills; removing them eliminates a layer of indirection without losing any capability.

### Skills removed

| Skill | Reason |
|-------|--------|
| `documentation-writer` | Overlapped with `docs-writing` (both Diátaxis-based). Consolidated into the more comprehensive `docs-writing` skill which has 52 rules across 9 categories. |
| `sql-optimization-patterns` | Overlapped with `sql-pro` which already covers query optimization, EXPLAIN analysis, and indexing strategies more comprehensively. |
| `mirror-website` | Empty skill directory with no SKILL.md — never had content. |

---

## Design Philosophy

- **Progressive Disclosure** — Skill metadata loads first; full content loads on demand.
- **Verification Gates** — Every skill includes proof steps. Never skip "prove it works."
- **Anti-Rationalization** — Skills rebut common excuses to enforce discipline.
- **No Meta-Orchestration** — Personas don't call other personas. Commands handle composition.
- **Quality Is Not Optional** — Skills enforce standards used by top engineering organizations.

---

## License

Refer to individual skill directories for license information. Several skills include `LICENSE.txt` files specifying their terms.
