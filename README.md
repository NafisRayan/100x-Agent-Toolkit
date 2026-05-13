# 100x Agent Toolkit

A production-grade engineering toolkit for AI-assisted software development. Contains **168 specialized skill workflows** (100 core + 68 GSD sub-skills), **142 expert agent personas**, **24 design system specifications**, **5 reference checklists**, **86 slash commands**, and **9 MCP server integrations** — all designed to enforce professional engineering standards across the full development lifecycle: **Define → Plan → Build → Verify → Review → Ship → Scale**.

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
├── skills/                # 168 specialized skill workflows (100 core + 68 GSD sub-skills)
│   └── <skill-name>/
│       ├── SKILL.md       # Skill definition (YAML frontmatter + instructions)
│       ├── references/    # Domain-specific documentation
│       ├── scripts/       # Automation scripts (Python, JS, Shell)
│       ├── assets/        # Starter projects, templates, images
│       └── evals/         # Evaluation test cases
│   └── ...
│
├── agents/                # 142 expert agent personas
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
├── commands/               # 86 slash command definitions
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
├── rules/                  # Language-specific coding rules
│   ├── angular/            # Angular rules
│   ├── arkts/              # ArkTS/HarmonyOS rules
│   ├── common/             # Shared rules across languages
│   ├── cpp/                # C++ rules
│   ├── csharp/             # C# rules
│   ├── dart/               # Dart rules
│   ├── fsharp/             # F# rules
│   ├── golang/             # Go rules
│   ├── java/               # Java rules
│   ├── kotlin/             # Kotlin rules
│   ├── perl/               # Perl rules
│   ├── php/                # PHP rules
│   ├── python/             # Python rules
│   ├── rust/               # Rust rules
│   ├── swift/              # Swift rules
│   ├── typescript/         # TypeScript rules
│   ├── web/                # Web rules
│   └── zh/                 # Chinese language rules
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
| `clone-website` | Reverse-engineer and clone websites from URLs |
| `caveman` | Ultra-compressed communication mode |
| `grill-me` | Interview user about a plan or design |
| `gsd` | Get Shit Done project management (68 sub-skills) |

---

## Slash Commands

### Lifecycle Commands
| Command | Purpose | Skills Used |
|---------|---------|-------------|
| `/spec` | Define what to build (PRD) | `brainstorming`, `planning-and-task-breakdown` |
| `/plan` | Plan how to build (task breakdown) | `planning-and-task-breakdown`, `writing-plans` |
| `/build` | Build incrementally with feature flags | `incremental-implementation`, `test-driven-development` |
| `/test` | Verify with comprehensive test suite | `systematic-debugging`, `verification-before-completion` |
| `/review` | Quality assurance before merge | `best-practices`, `performance` |
| `/code_simplify` | Reduce complexity while preserving behavior | `karpathy-guidelines`, `performance` |
| `/ship` | Deploy with monitoring and rollback | `finishing-a-development-branch` |

### Build & Fix
| Command | Purpose |
|---------|---------|
| `/build-fix` | Resolve build errors and TypeScript issues |
| `/cpp-build` | Fix C++/CMake build errors |
| `/dart-build` | Fix Dart/Flutter build errors (alias: `/flutter-build`) |
| `/go-build` | Fix Go build errors |
| `/gradle-build` | Fix Gradle build errors |
| `/java-build` | Fix Java/Maven/Gradle build errors |
| `/kotlin-build` | Fix Kotlin/Gradle build errors |
| `/rust-build` | Fix Rust/Cargo build errors |
| `/swift-build` | Fix Swift/Xcode build errors |

### Code Review
| Command | Purpose |
|---------|---------|
| `/code-review` | Run comprehensive code review |
| `/cpp-review` | C++ code review |
| `/fastapi-review` | FastAPI code review |
| `/flutter-review` | Flutter/Dart code review |
| `/go-review` | Go code review |
| `/kotlin-review` | Kotlin code review |
| `/python-review` | Python code review |
| `/rust-review` | Rust code review |
| `/review-pr` | Review a pull request |
| `/pr` | Create a pull request |

### Testing
| Command | Purpose |
|---------|---------|
| `/cpp-test` | Run C++ tests |
| `/e2e` | Run end-to-end tests |
| `/flutter-test` | Run Flutter tests |
| `/go-test` | Run Go tests |
| `/kotlin-test` | Run Kotlin tests |
| `/rust-test` | Run Rust tests |
| `/tdd` | Test-Driven Development workflow |
| `/test-coverage` | Check test coverage |

### Security & Quality
| Command | Purpose |
|---------|---------|
| `/security` | Security audit |
| `/security-scan` | Run security scanning |
| `/quality-gate` | Enforce quality gates |
| `/verify` | Verify completed work |

### Project Management
| Command | Purpose |
|---------|---------|
| `/project-init` | Initialize a new project |
| `/projects` | List projects |
| `/setup-pm` | Setup project management |
| `/checkpoint` | Create/save checkpoints |
| `/save-session` | Save current session |
| `/resume-session` | Resume a saved session |
| `/sessions` | List sessions |
| `/jira` | Jira integration |

### Feature Development
| Command | Purpose |
|---------|---------|
| `/feature-dev` | Develop a feature end-to-end |
| `/plan-prd` | Plan from a PRD |
| `/prp-prd` | PRP pipeline: PRD creation |
| `/prp-plan` | PRP pipeline: planning |
| `/prp-implement` | PRP pipeline: implementation |
| `/prp-pr` | PRP pipeline: pull request |
| `/prp-commit` | PRP pipeline: commit |
| `/gan-build` | GAN Harness: build |
| `/gan-design` | GAN Harness: design |

### Multi-Agent Orchestration
| Command | Purpose |
|---------|---------|
| `/orchestrate` | Orchestrate multi-agent workflow |
| `/multi-plan` | Multi-agent planning |
| `/multi-execute` | Multi-agent execution |
| `/multi-frontend` | Multi-agent frontend work |
| `/multi-backend` | Multi-agent backend work |
| `/multi-workflow` | Multi-agent workflow |

### Agent Loop & Learning
| Command | Purpose |
|---------|---------|
| `/loop-start` | Start an agent loop |
| `/loop-status` | Check loop status |
| `/santa-loop` | Santa loop workflow |
| `/learn` | Learn from interactions |
| `/learn-eval` | Evaluate learning |

### Tools & Utilities
| Command | Purpose |
|---------|---------|
| `/aside` | Side task handling |
| `/auto-update` | Auto-update system |
| `/evolve` | Evolve the codebase |
| `/eval` | Run evaluations |
| `/promote` | Promote changes |
| `/prune` | Prune unused code |
| `/refactor-clean` | Refactor and clean code |
| `/model-route` | Model routing configuration |
| `/pm2` | PM2 process management |
| `/hookify` | Generate hooks from conversations |
| `/hookify-configure` | Configure hooks |
| `/hookify-help` | Hook help |
| `/hookify-list` | List hooks |
| `/instinct-export` | Export instincts |
| `/instinct-import` | Import instincts |
| `/instinct-status` | Check instinct status |
| `/skill-create` | Create a new skill |
| `/skill-health` | Check skill health |
| `/update-codemaps` | Update code maps |
| `/update-docs` | Update documentation |
| `/harness-audit` | Audit agent harness |
| `/ecc-guide` | ECC guide |

---

## Agent Personas

The system includes **142 expert agent personas** organized by domain:

| Category | Agents |
|----------|--------|
| **Core** | `code-reviewer`, `security-auditor`, `test-engineer`, `code-archaeologist`, `documentation-specialist`, `performance-optimizer`, `a11y-architect`, `architect`, `code-architect`, `code-explorer`, `code-simplifier`, `comment-analyzer`, `conversation-analyzer`, `planner`, `type-design-analyzer` |
| **Beast Mode** | `beast mode 3.1` |
| **Orchestrators** | `agent-organizer`, `project-analyst`, `team-configurator`, `tech-lead-orchestrator`, `chief-of-staff`, `loop-operator` |
| **Spec Agents** | `spec-analyst`, `spec-architect`, `spec-developer`, `spec-orchestrator`, `spec-planner`, `spec-reviewer`, `spec-tester`, `spec-validator` |
| **Business** | `product-manager` |
| **Data & AI** | `ai-engineer`, `data-engineer`, `data-scientist`, `database-optimizer`, `graphql-architect`, `ml-engineer`, `postgres-pro`, `prompt-engineer`, `gan-evaluator`, `gan-generator`, `gan-planner` |
| **Development** | `backend-architect`, `dx-optimizer`, `electron-pro`, `frontend-developer`, `full-stack-developer`, `golang-pro`, `harmonyos-app-resolver`, `legacy-modernizer`, `mobile-developer`, `nextjs-pro`, `python-pro`, `react-pro`, `typescript-pro`, `ui-designer`, `ux-designer` |
| **Frontend** | `senior-frontend-architect` |
| **Backend** | `senior-backend-architect` |
| **Infrastructure** | `cloud-architect`, `deployment-engineer`, `devops-incident-responder`, `incident-responder`, `performance-engineer`, `harness-optimizer`, `homelab-architect`, `network-architect`, `network-troubleshooter` |
| **Quality & Testing** | `architect-review`, `code-reviewer`, `debugger`, `qa-expert`, `test-automator`, `e2e-runner`, `pr-test-analyzer`, `silent-failure-hunter`, `tdd-guide` |
| **Security** | `security-auditor`, `security-reviewer` |
| **UI/UX** | `ui-ux-master` |
| **Universal** | `api-architect`, `backend-developer`, `frontend-developer`, `tailwind-css-expert` |
| **Utility** | `refactor-agent`, `refactor-cleaner` |
| **Specialization** | `api-documenter`, `documentation-expert`, `doc-updater`, `docs-lookup`, `seo-specialist` |
| **Specialized (by tech)** | `django/` (3 agents), `laravel/` (2), `python/` (9), `rails/` (3), `react/` (2), `vue/` (3) |
| **Build Resolvers** | `build-error-resolver`, `cpp-build-resolver`, `dart-build-resolver`, `go-build-resolver`, `java-build-resolver`, `kotlin-build-resolver`, `pytorch-build-resolver`, `rust-build-resolver`, `swift-build-resolver` |
| **Open Source** | `opensource-forker`, `opensource-sanitizer`, `opensource-packager` |
| **Reviewers** | `cpp-reviewer`, `csharp-reviewer`, `database-reviewer`, `fastapi-reviewer`, `flutter-reviewer`, `fsharp-reviewer`, `go-reviewer`, `healthcare-reviewer`, `java-reviewer`, `kotlin-reviewer`, `mle-reviewer`, `network-config-reviewer`, `python-reviewer`, `rust-reviewer`, `swift-reviewer`, `typescript-reviewer` |
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
