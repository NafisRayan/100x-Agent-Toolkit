# 100x Agent Toolkit

A production-grade engineering toolkit for AI-assisted software development. Contains **99 specialized skills**, **86 expert agent personas**, **5 reference checklists**, **7 slash commands**, and **9 MCP server integrations** — all designed to enforce professional engineering standards across the full development lifecycle: **Define → Plan → Build → Verify → Review → Ship → Scale**.

---

## Architecture

The system uses a **three-layer composition model**:

| Layer | What it is | Example | Role |
|-------|-----------|---------|------|
| **Skill** | A workflow with steps and exit criteria | `test-driven-development` | The *how* |
| **Persona** | A role with a perspective and output format | `code-reviewer` | The *who* |
| **Command** | A user-facing entry point | `/review`, `/ship` | The *when* |

Personas do not call other personas. Commands orchestrate the composition.

---

## Directory Structure

```
./
├── AGENTS.md              # System prompt — the master configuration
├── README.md              # This file
│
├── skills/                # 99 specialized skill workflows
│   └── <skill-name>/
│       ├── SKILL.md       # Skill definition (YAML frontmatter + instructions)
│       ├── references/    # Domain-specific documentation
│       ├── scripts/       # Automation scripts (Python, JS, Shell)
│       ├── assets/        # Starter projects, templates, images
│       └── evals/         # Evaluation test cases
│   └── ...
│
├── agents/                # 86 expert agent personas
│   ├── code-reviewer.md   # Senior Staff Engineer perspective
│   ├── security-auditor.md# Security Engineer perspective
│   ├── test-engineer.md   # QA Engineer perspective
│   ├── beast mode 3.1.md  # Autonomous agent instructions
│   ├── agent-organizer.md # Multi-agent orchestration planner
│   ├── business/          # Product management
│   ├── data-ai/           # Data, ML, AI agents
│   ├── development/       # Frontend, backend, language specialists
│   ├── infrastructure/    # Cloud, DevOps, incident response
│   ├── quality-testing/   # QA, testing, debugging
│   ├── security/          # Security auditing
│   └── specialization/    # API docs, technical writing
│
├── commands/               # 7 slash command definitions
│   ├── spec.md            # Define requirements
│   ├── plan.md            # Break down into tasks
│   ├── build.md           # Implement incrementally
│   ├── test.md            # Verify with tests
│   ├── review.md          # Quality assurance
│   ├── code-simplify.md   # Optimize and clean
│   └── ship.md            # Deploy to production
│
├── references/             # 5 domain checklists
│   ├── security-checklist.md
│   ├── testing-patterns.md
│   ├── performance-checklist.md
│   ├── accessibility-checklist.md
│   └── orchestration-patterns.md
│
├── docs/
│   ├── best-practices.md    # Crafting high-impact Claude Code sub-agents
│   ├── creating-agents.md   # Tutorial for creating Claude agents
│   └── dependencies.md      # Context7 MCP dependency setup
│
├── mcps/
│   └── mcp.json           # 9 MCP server configurations
│
└── designs/
    └── DESIGN-figma.md    # Design system specification
```

---

## Quick Start

This repository is a **skill bundle** — it configures your AI agent (Claude Code, Cursor, Copilot, etc.) with domain expertise, workflows, and quality gates.

1. Clone the repository and rename the folder to `.agents`, then place it in your home directory:
   - **Windows**: `C:\Users\<YourUsername>\.agents`
   - **macOS / Linux**: `~/.agents`
2. The `AGENTS.md` file is the entry point — your agent reads it on startup and gains access to all skills, personas, and commands.
3. Slash commands guide your lifecycle:
   - `/spec` → define what to build
   - `/plan` → plan how to build it
   - `/build` → implement incrementally
   - `/test` → verify it works
   - `/review` → quality assurance
   - `/code-simplify` → optimize if needed
   - `/ship` → deploy to production

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
| `sql-optimization-patterns` | EXPLAIN analysis, index strategy |
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
| `documentation-writer` | Diátaxis expert technical writing |
| `doc-coauthoring` | Structured workflow for co-authoring docs |
| `mermaid` | Flowcharts, sequence diagrams, C4 architecture |
| `design-md` | Synthesize design systems into DESIGN.md files |

### Office & Productivity
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
| `git-master` | Complete Git expertise for all operations |
| `caveman` | Ultra-compressed communication mode |
| `grill-me` | Interview user about a plan or design |
| `gsd` | Get Shit Done project management (30+ sub-skills) |

---

## Slash Commands

| Command | Purpose | Skills Used |
|---------|---------|-------------|
| `/spec` | Define what to build (PRD) | `brainstorming`, `planning-and-task-breakdown` |
| `/plan` | Plan how to build (task breakdown) | `planning-and-task-breakdown`, `writing-plans` |
| `/build` | Build incrementally with feature flags | `incremental-implementation`, `test-driven-development` |
| `/test` | Verify with comprehensive test suite | `systematic-debugging`, `verification-before-completion` |
| `/review` | Quality assurance before merge | `best-practices`, `performance` |
| `/code-simplify` | Reduce complexity while preserving behavior | `karpathy-guidelines`, `performance` |
| `/ship` | Deploy with monitoring and rollback | `git-master`, `finishing-a-development-branch` |

---

## Agent Personas

The system includes **86 expert agent personas** organized by domain:

| Category | Agents |
|----------|--------|
| **Core** | `code-reviewer`, `security-auditor`, `test-engineer`, `code-archaeologist`, `documentation-specialist`, `performance-optimizer` |
| **Beast Mode** | `beast mode 3.1` |
| **Orchestrators** | `agent-organizer`, `project-analyst`, `team-configurator`, `tech-lead-orchestrator` |
| **Spec Agents** | `spec-analyst`, `spec-architect`, `spec-developer`, `spec-orchestrator`, `spec-planner`, `spec-reviewer`, `spec-tester`, `spec-validator` |
| **Business** | `product-manager` |
| **Data & AI** | `ai-engineer`, `data-engineer`, `data-scientist`, `database-optimizer`, `graphql-architect`, `ml-engineer`, `postgres-pro`, `prompt-engineer` |
| **Development** | `backend-architect`, `dx-optimizer`, `electorn-pro`, `frontend-developer`, `full-stack-developer`, `golang-pro`, `legacy-modernizer`, `mobile-developer`, `nextjs-pro`, `python-pro`, `react-pro`, `typescript-pro`, `ui-designer`, `ux-designer` |
| **Frontend** | `senior-frontend-architect` |
| **Backend** | `senior-backend-architect` |
| **Infrastructure** | `cloud-architect`, `deployment-engineer`, `devops-incident-responder`, `incident-responder`, `performance-engineer` |
| **Quality & Testing** | `architect-review`, `code-reviewer`, `debugger`, `qa-expert`, `test-automator` |
| **Security** | `security-auditor` |
| **UI/UX** | `ui-ux-master` |
| **Universal** | `api-architect`, `backend-developer`, `frontend-developer`, `tailwind-css-expert` |
| **Utility** | `refactor-agent` |
| **Specialization** | `api-documenter`, `documentation-expert` |
| **Specialized (by tech)** | `django/` (3 agents), `laravel/` (2), `python/` (9), `rails/` (3), `react/` (2), `vue/` (3) |
| **Local** | `code-reviewer-local` |

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

## Reference Checklists

Five domain checklists in `references/` that skills reference for best practices:

- **Security** — OWASP Top 10, auth patterns, input validation, CORS, dependency auditing
- **Testing** — Test pyramid, naming conventions, mocking, React/API/E2E patterns
- **Performance** — Core Web Vitals targets, bundle analysis, profiling workflows
- **Accessibility** — WCAG 2.1 AA, keyboard nav, screen readers, ARIA
- **Orchestration** — Multi-agent coordination, task decomposition, parallel execution

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

## Design Philosophy

- **Progressive Disclosure** — Skill metadata loads first; full content loads on demand.
- **Verification Gates** — Every skill includes proof steps. Never skip "prove it works."
- **Anti-Rationalization** — Skills rebut common excuses to enforce discipline.
- **No Meta-Orchestration** — Personas don't call other personas. Commands handle composition.
- **Quality Is Not Optional** — Skills enforce standards used by top engineering organizations.

---

## License

Refer to individual skill directories for license information. Several skills include `LICENSE.txt` files specifying their terms.
