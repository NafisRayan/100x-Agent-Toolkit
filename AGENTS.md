# AI Agent Power System

**Welcome to your comprehensive AI agent toolkit.** This is your command center for building software at production-grade quality. You have access to 168 specialized skill workflows (100 core + 68 GSD sub-skills), 142 expert agent personas embedded in the `agent-personas` skill, 86 slash commands, 9 MCP server integrations, and 24 design system specifications.

**One look at this file, and you're ready to rock.** Let's make you unstoppable.

---

## System Overview

Your agent system operates across 7 lifecycle phases:
- **Define** -> **Plan** -> **Build** -> **Verify** -> **Review** -> **Ship** -> **Scale**

### Core Architecture
- **`skills/`** - 168 specialized workflows (100 core + 68 GSD sub-skills)
- **`commands/`** - 86 slash commands for lifecycle management
- **`mcps/`** - 9 MCP server configurations for external tool integration
- **`designs/`** - 24 design system specifications (Figma, Airbnb, Apple, Stripe, Vercel, etc.)
- **Agent Personas** - 142 expert personas embedded in `skills/agent-personas/` (core, dev, data-ai, infra, QA, security, reviewers, build-resolvers, specialized, orchestrators, etc.)

---

## Skills Directory (`skills/`)

**Your 168 specialized skill workflows cover every aspect of software development.** Each skill is a battle-tested workflow that enforces professional engineering practices.

### How Skills Work
- **Triggering**: Skills activate automatically based on context or user intent
- **Structure**: Each skill has a `SKILL.md` with YAML frontmatter (`name`, `description`) + markdown instructions
- **Progressive Loading**: Metadata loads first, then full content as needed
- **Anti-Rationalization**: Each skill includes rebuttals to common excuses ("I'll test later")

### Key Skills by Category

#### Define & Plan (4 skills)
- `brainstorming` - Explore intent, requirements, and design before implementation
- `planning-and-task-breakdown` - Decompose specs into verifiable tasks
- `writing-plans` - Create detailed implementation plans
- `executing-plans` - Execute written plans with review checkpoints

#### Build & Code (6 skills)
- `incremental-implementation` - Thin vertical slices with feature flags
- `test-driven-development` - Red-Green-Refactor with test pyramid
- `source-driven-development` - Ground decisions in official documentation
- `subagent-driven-development` - Execute plans with independent sub-agents
- `dispatching-parallel-agents` - Run independent tasks concurrently
- `karpathy-guidelines` - Behavioral guidelines to reduce LLM coding mistakes

#### Verify & Test (4 skills)
- `systematic-debugging` - Structured bug investigation workflows
- `verification-before-completion` - Run commands before claiming success
- `receiving-code-review` - Handle feedback with technical rigor
- `requesting-code-review` - Get quality feedback before merge

#### Review & Quality (3 skills)
- `best-practices` - Modern web development best practices for security and quality
- `performance` - Measure-first approach with Core Web Vitals improvement
- `core-web-vitals` - Optimize LCP, INP, CLS for better page experience

#### Ship & Deploy (2 skills)
- `finishing-a-development-branch` - Guide completion of development work
- `using-git-worktrees` - Isolated workspace for feature work

#### Specialized Domains (70+ skills)
- **Cloud & Infra**: `cloudflare`, `neon-postgres`, `supabase-postgres-best-practices`, `database-optimizer`, `docker-expert`
- **Performance**: `performance`, `core-web-vitals`, `python-performance-optimization`
- **Accessibility**: `accessibility`, `web-design-guidelines`, `web-quality-audit`
- **UI/UX**: `impeccable`, `theme-factory`, `ui-ux-pro-max`, `responsive-design`, `design-system`, `tailwind-design-system`, `shadcn`, `modern-web-design`, `scroll-animations`
- **Frontend Frameworks**: `nextjs-developer`, `next-best-practices`, `vercel-react-best-practices`, `motion`, `motion-framer`, `gsap`, `threejs-skills`, `threejs-webgl`, `3d-web-experience`, `vite`, `migrate-to-vinext`, `building-native-ui`, `mobile-developer`, `vercel-react-native-skills`, `mui`
- **Backend Frameworks**: `fastapi-expert`, `nestjs-best-practices`, `nodejs-backend-patterns`, `nodejs-express-server`, `nodejs-best-practices`, `shopify-expert`
- **Automation & Workflow**: `n8n-code-javascript`
- **Databases & ORM**: `prisma`, `prisma-expert`, `sql-pro`, `supabase-postgres-best-practices`
- **Languages**: `javascript-pro`, `typescript-advanced-types`
- **Coding Standards**: `syntax-rules` - Language-specific coding rules for 18 languages (TypeScript, Python, Rust, Go, Java, Kotlin, Swift, C++, C#, PHP, Dart, Angular, ArkTS, F#, Perl, web, zh) with common universal principles
- **Agent Personas**: `agent-personas` - 142 expert personas across 23 categories (core, development, data-ai, infrastructure, quality-testing, security, reviewers, build-resolvers, specialized, orchestrators, spec-agents, opensource, utility, universal, and more)
- **Business**: `business-analyst`, `sales-enablement`, `marketing-psychology`, `brag-document`, `internal-comms`
- **Design & Docs**: `figma-developer`, `docx`, `pdf`, `pptx`, `xlsx`, `doc-coauthoring`, `docs-writing`, `documentation-writer`, `code-documenter`, `canvas-design`, `algorithmic-art`, `mermaid`, `design-md`
- **SEO**: `seo`, `seo-audit`
- **Dev Tools**: `agent-browser`, `mcp-builder`, `context7`, `duckduckgo-search`, `find-skills`, `skill-creator`, `clone-website`, `playwright-cli`
- **Agent Orchestration**: `dispatching-parallel-agents`, `subagent-driven-development`, `executing-plans`, `using-git-worktrees`, `finishing-a-development-branch`, `ultrareview`
- **Project Management**: `gsd` (68 sub-skills for Get Shit Done system: 11 agents + 34 commands + 7 references + 16 workflows + 1 parent skill)
- **Other**: `enhance-prompt`, `caveman`, `karpathy-guidelines`, `verification-before-completion`, `grill-me`, `brainstorming`, `using-superpowers`

### Using Skills Effectively

**Automatic Activation**
Skills trigger based on context. Mention "API design" -> `fastapi-expert` loads. Say "optimize performance" -> `performance` activates.

**Manual Invocation**
Reference skills directly: "Use the `test-driven-development` skill for this implementation."

**Progressive Disclosure**
1. **Metadata** (~100 words): `name` + `description` - always in context
2. **Full Content** (<500 lines): Complete workflow when triggered
3. **References**: Domain-specific docs loaded as needed

**Best Practices**
- Always follow skill steps sequentially
- Use verification gates - never skip "prove it works" sections
- Reference checklists when needed (security, performance, etc.)
- Combine skills: planning + incremental implementation + testing + review

---

## Commands Directory (`commands/`)

**84 slash commands** that orchestrate your entire development lifecycle.

### Development Lifecycle Commands

#### `/spec` - Define What to Build
- **Input**: Vague idea or requirement
- **Output**: Detailed PRD with objectives, success criteria, boundaries
- **Skills Used**: `brainstorming`, `planning-and-task-breakdown`

#### `/plan` - Plan How to Build
- **Input**: PRD or requirements
- **Output**: Task breakdown with acceptance criteria, dependencies
- **Skills Used**: `planning-and-task-breakdown`, `writing-plans`

#### `/build` - Build Incrementally
- **Input**: Task list
- **Output**: Working code with tests, feature flags, safe rollbacks
- **Skills Used**: `incremental-implementation`, `test-driven-development`

#### `/test` - Verify It Works
- **Input**: Code changes
- **Output**: Comprehensive test suite, debugging reports
- **Skills Used**: `systematic-debugging`, `verification-before-completion`

#### `/review` - Quality Assurance
- **Input**: Code ready for merge
- **Output**: Review feedback, security audit, performance analysis
- **Skills Used**: `best-practices`, `performance`

#### `/code-simplify` - Optimize & Clean
- **Input**: Working but complex code
- **Output**: Simplified code maintaining exact behavior
- **Skills Used**: `karpathy-guidelines`, `performance`

#### `/ship` - Deploy to Production
- **Input**: Reviewed, tested code
- **Output**: Successful deployment with monitoring, rollback plans
- **Skills Used**: `finishing-a-development-branch`

### Extended Commands (77 additional)

#### Build & Fix
- `/build-fix` - Resolve build errors and TypeScript issues
- `/cpp-build` - Fix C++/CMake build errors
- `/dart-build` - Fix Dart/Flutter build errors (alias: `/flutter-build`)
- `/go-build` - Fix Go build errors
- `/gradle-build` - Fix Gradle build errors
- `/java-build` - Fix Java/Maven/Gradle build errors
- `/kotlin-build` - Fix Kotlin/Gradle build errors
- `/rust-build` - Fix Rust/Cargo build errors
- `/swift-build` - Fix Swift/Xcode build errors

#### Code Review
- `/code-review` - Run comprehensive code review
- `/cpp-review` - C++ code review
- `/fastapi-review` - FastAPI code review
- `/flutter-review` - Flutter/Dart code review
- `/go-review` - Go code review
- `/kotlin-review` - Kotlin code review
- `/python-review` - Python code review
- `/rust-review` - Rust code review
- `/review-pr` - Review a pull request
- `/pr` - Create a pull request

#### Testing
- `/cpp-test` - Run C++ tests
- `/e2e` - Run end-to-end tests
- `/flutter-test` - Run Flutter tests
- `/go-test` - Run Go tests
- `/kotlin-test` - Run Kotlin tests
- `/rust-test` - Run Rust tests
- `/tdd` - Test-Driven Development workflow
- `/test-coverage` - Check test coverage

#### Security & Quality
- `/security` - Security audit
- `/security-scan` - Run security scanning
- `/quality-gate` - Enforce quality gates
- `/verify` - Verify completed work

#### Project Management
- `/project-init` - Initialize a new project
- `/projects` - List projects
- `/setup-pm` - Setup project management
- `/checkpoint` - Create/save checkpoints
- `/save-session` - Save current session
- `/resume-session` - Resume a saved session
- `/sessions` - List sessions
- `/jira` - Jira integration

#### Feature Development
- `/feature-dev` - Develop a feature end-to-end
- `/plan-prd` - Plan from a PRD
- `/prp-prd` - PRP pipeline: PRD creation
- `/prp-plan` - PRP pipeline: planning
- `/prp-implement` - PRP pipeline: implementation
- `/prp-pr` - PRP pipeline: pull request
- `/prp-commit` - PRP pipeline: commit
- `/gan-build` - GAN Harness: build
- `/gan-design` - GAN Harness: design

#### Multi-Agent Orchestration
- `/orchestrate` - Orchestrate multi-agent workflow
- `/multi-plan` - Multi-agent planning
- `/multi-execute` - Multi-agent execution
- `/multi-frontend` - Multi-agent frontend work
- `/multi-backend` - Multi-agent backend work
- `/multi-workflow` - Multi-agent workflow

#### Agent Loop & Learning
- `/loop-start` - Start an agent loop
- `/loop-status` - Check loop status
- `/santa-loop` - Santa loop workflow
- `/learn` - Learn from interactions
- `/learn-eval` - Evaluate learning

#### Tools & Utilities
- `/aside` - Side task handling
- `/auto-update` - Auto-update system
- `/evolve` - Evolve the codebase
- `/eval` - Run evaluations
- `/promote` - Promote changes
- `/prune` - Prune unused code
- `/refactor-clean` - Refactor and clean code
- `/model-route` - Model routing configuration
- `/pm2` - PM2 process management
- `/hookify` - Generate hooks from conversations
- `/hookify-configure` - Configure hooks
- `/hookify-help` - Hook help
- `/hookify-list` - List hooks
- `/instinct-export` - Export instincts
- `/instinct-import` - Import instincts
- `/instinct-status` - Check instinct status
- `/skill-create` - Create a new skill
- `/skill-health` - Check skill health
- `/update-codemaps` - Update code maps
- `/update-docs` - Update documentation
- `/harness-audit` - Audit agent harness
- `/ecc-guide` - ECC guide
- `/ecc-guide` - ECC guide

### Command Usage Patterns

**Sequential Workflow**:
1. `/spec` -> Define requirements
2. `/plan` -> Break down into tasks
3. `/build` -> Implement incrementally
4. `/test` -> Verify functionality
5. `/review` -> Quality assurance
6. `/code-simplify` -> Optimize if needed
7. `/ship` -> Deploy to production

**Iterative Development**:
- Use `/build` + `/test` loops for rapid iteration
- `/review` after each significant change
- `/code-simplify` when complexity builds up

---

## MCP Server Integration (`mcps/`)

**9 MCP servers** configured for external tool integration via Model Context Protocol.

### Configured Servers (`mcps/mcp.json`)

#### Design & UI
- **Figma MCP** (`@vkhanhqui/figma-mcp-go`) - Figma design extraction and integration
- **21st.dev Magic** (`@21st-dev/magic`) - shadcn/ui component registry access (requires `21ST_DEV_API_KEY`)

#### Browser & Testing
- **Playwright** (`@playwright/mcp`) - Browser automation and testing
- **Chrome DevTools** (`@anthropic-ai/chrome-devtools-mcp`) - Live Chrome DevTools integration

#### Documentation & Knowledge
- **Context7** (`@upstash/context7-mcp`) - Up-to-date library/framework documentation retrieval
- **Storybook MCP** (`@anthropic-ai/mcp-remote`) - Storybook component explorer integration
- **Firecrawl** (`@anthropic-ai/mcp-remote`) - Web scraping and content extraction (requires `FIRECRAWL_API_KEY`)

#### Development Tools
- **TypeScript LSP** (`@anthropic-ai/mcp-lsp`) - TypeScript language server for type checking
- **Vercel** (`@vercel/mcp`) - Vercel deployment and management (requires `VERCEL_API_TOKEN`)

### Using MCP Servers

**Automatic**: Skills access MCP tools as needed
**Direct**: Reference specific MCP capabilities in tasks
**Extension**: Add new MCP configurations for additional tools
**Setup**: Replace placeholder API keys (`REPLACE_WITH_*`) with actual credentials

---

## Design System Specs (`designs/`)

**Design specifications** for consistent visual implementation.

### Available Designs

**24 design system specifications** covering major brand design languages.

#### `designs/DESIGN-figma.md` - Figma-Inspired Design System
- Custom variable font (figmaSans) with granular weight control
- Strictly black-and-white interface chrome with vibrant product content
- Pill and circular button geometry (50px/50% radius)
- Dashed focus outlines echoing editor selection handles
- Negative letter-spacing throughout
- OpenType kern feature enabled globally

#### Additional Design Specifications

| Design | Brand | Design | Brand |
|--------|-------|--------|-------|
| `DESIGN-airbnb` | Airbnb | `DESIGN-apple` | Apple |
| `DESIGN-binance` | Binance | `DESIGN-bmw` | BMW |
| `DESIGN-claude` | Claude (Anthropic) | `DESIGN-cursor` | Cursor |
| `DESIGN-expo` | Expo | `DESIGN-framer` | Framer |
| `DESIGN-meta` | Meta | `DESIGN-minimax` | MiniMax |
| `DESIGN-mongodb` | MongoDB | `DESIGN-notion` | Notion |
| `DESIGN-nvidia` | NVIDIA | `DESIGN-pinterest` | Pinterest |
| `DESIGN-revolut` | Revolut | `DESIGN-stripe` | Stripe |
| `DESIGN-supabase` | Supabase | `DESIGN-superhuman` | Superhuman |
| `DESIGN-uber` | Uber | `DESIGN-vercel` | Vercel |
| `DESIGN-warp` | Warp | `DESIGN-webflow` | Webflow |
| `DESIGN-xai` | xAI | | |

### Using Design Specs

**Automatic**: Design skills reference these when creating UI
**Direct**: "Use the Figma design system for this component"
**Integration**: Apply design tokens from specs during implementation

---

## Usage Patterns & Best Practices

### Power User Workflow

1. **Start with Intent**: User says "build a dashboard"
2. **Define**: `/spec` creates detailed requirements
3. **Plan**: `/plan` breaks into verifiable tasks
4. **Build**: `/build` implements with feature flags
5. **Test**: `/test` validates with comprehensive coverage
6. **Review**: `/review` ensures production quality
7. **Ship**: `/ship` deploys with monitoring

### Context Engineering

**Information Management**:
- Load relevant references proactively
- Maintain clean, focused context windows

**Progressive Disclosure**:
- Start with skill metadata
- Load full workflows when triggered
- Reference detailed docs as needed

### Quality Gates

**Never Skip**:
- Test coverage requirements
- Security reviews for user-facing features
- Performance benchmarks
- Accessibility compliance

**Always Include**:
- Feature flags for safe rollbacks
- Comprehensive error handling
- Monitoring and alerting setup
- Documentation updates

### Scaling Patterns

**Multi-Agent Coordination**:
- Use `agent-organizer` for team formation on complex projects
- Use `tech-lead-orchestrator` for task delegation
- Use orchestration patterns for complex projects
- Parallel execution for independent tasks
- Sequential dependencies for integrated features

**Skill Composition**:
- Combine domain skills (e.g., `impeccable` + `best-practices`)
- Layer quality skills on top of implementation
- Use specialized agents for expert reviews

**Beast Mode**:
- Activate for fully autonomous problem-solving
- Best for well-defined bugs or isolated feature work
- Will research extensively before implementing

---

## Advanced Features

### Skill Creation & Management

**Adding New Skills**:
1. Create `skills/your-skill/` directory
2. Add `SKILL.md` with YAML frontmatter + instructions
3. Reference existing skills for patterns
4. Update `.skill-lock.json` for tracking

**Skill Optimization**:
- Use `skill-creator` for iterative improvement
- Test with multiple prompts for robustness
- Optimize descriptions for better triggering

### Agent Creation & Management

**Adding New Agents**:
1. Choose appropriate category under `agents/`
2. Create `.md` file with YAML frontmatter (`name`, `description`, `tools`, `model`)
3. Follow patterns in `docs/creating-agents.md`
4. Add framework-specific agents under `specialized/`

**Agent Categories**:
- `core/` - Fundamental engineering agents
- `development/` - Language/framework developers
- `orchestrators/` - Multi-agent coordination
- `specialized/` - Framework-specific (Django, Laravel, React, Vue, Rails, Python)
- `spec-agents/` - Specification pipeline

### Troubleshooting & Debugging

**Skill Not Triggering**:
- Check description matches user intent
- Verify YAML frontmatter is correct
- Test with explicit skill reference

**Performance Issues**:
- Use `performance` skill
- Check bundle sizes and loading patterns
- Profile with browser dev tools

**Quality Problems**:
- Invoke relevant agent personas
- Consult reference checklists
- Use systematic debugging workflows

---

## Your Mission

**You are now equipped with a production-grade engineering system.** This toolkit contains 168 skill workflows (100 core + 68 GSD sub-skills), 142 expert agents, 24 design specs, 9 MCP integrations, and quality gates that separate prototype code from production software.

**Use it relentlessly.** Every feature you build should go through planning -> implementation -> testing -> review -> deployment. Every decision should be grounded in the relevant skills and references.

**Quality is not optional.** The skills enforce the same standards that power Google, Meta, and other engineering powerhouses.

**Go build something amazing.**

---

*Last updated: 2026-05-15 | Total Skills: 168 (100 core + 68 GSD) | Commands: 86 | Agents: 142 | MCPs: 9 | Designs: 24*
