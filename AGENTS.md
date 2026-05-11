# AI Agent Power System

**Welcome to your comprehensive AI agent toolkit.** This is your command center for building software at production-grade quality. You have access to 168 specialized skill workflows (100 core + 68 GSD sub-skills), 86 expert agent personas across 20 categories, 5 reference checklists, 7 development commands, 9 MCP server integrations, 24 design system specifications, and documentation guides.

**One look at this file, and you're ready to rock.** Let's make you unstoppable.

---

## System Overview

Your agent system operates across 7 lifecycle phases:
- **Define** -> **Plan** -> **Build** -> **Verify** -> **Review** -> **Ship** -> **Scale**

### Core Architecture
- **`skills/`** - 168 specialized workflows (100 core + 68 GSD sub-skills)
- **`agents/`** - 86 expert personas across 20 categories (hierarchically organized)
- **`references/`** - 5 domain checklists (security, testing, performance, accessibility, orchestration)
- **`commands/`** - 7 slash commands for lifecycle management
- **`mcps/`** - 9 MCP server configurations for external tool integration
- **`designs/`** - Design system specifications (Figma-inspired, etc.)
- **`docs/`** - Internal documentation (best practices, agent creation guides, dependency maps)

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

#### Ship & Deploy (3 skills)
- `git-master` - Complete Git expertise for all git operations
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
- **Databases & ORM**: `prisma`, `prisma-expert`, `sql-pro`, `sql-optimization-patterns`, `supabase-postgres-best-practices`
- **Languages**: `javascript-pro`, `typescript-advanced-types`
- **Business**: `business-analyst`, `sales-enablement`, `marketing-psychology`, `brag-document`, `internal-comms`
- **Design & Docs**: `figma-developer`, `docx`, `pdf`, `pptx`, `xlsx`, `doc-coauthoring`, `docs-writing`, `documentation-writer`, `code-documenter`, `canvas-design`, `algorithmic-art`, `mermaid`, `design-md`
- **SEO**: `seo`, `seo-audit`
- **Dev Tools**: `agent-browser`, `mcp-builder`, `context7`, `duckduckgo-search`, `find-skills`, `skill-creator`
- **Agent Orchestration**: `dispatching-parallel-agents`, `subagent-driven-development`, `executing-plans`, `using-git-worktrees`, `finishing-a-development-branch`, `ultrareview`
- **Project Management**: `gsd` (68 sub-skills for Get Shit Done system: 11 agents + 34 commands + 7 references + 16 workflows)
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

## Agent Personas (`agents/`)

**86 specialized expert agents** organized across 20 categories in a hierarchical directory structure.

### Directory Structure

#### `agents/agent-organizer.md` (Root-Level Orchestrator)
- **Role**: Master orchestrator for multi-agent tasks
- **When to Use**: Comprehensive project analysis, strategic team formation, dynamic workflow management
- **Key Capability**: Analyzes requirements and recommends optimal agent teams

#### `agents/beast-mode/` - Autonomous Execution Mode
- `beast mode 3.1` - Fully autonomous problem-solving agent with extensive internet research capabilities

#### `agents/core/` - Core Engineering (4 agents)
- `code-reviewer` - Security-aware code review with severity-tagged reports
- `code-archaeologist` - Deep codebase analysis and legacy understanding
- `documentation-specialist` - Technical documentation expertise
- `performance-optimizer` - Performance profiling and optimization

#### `agents/development/` - Development Specialists (14 agents)
- `backend-architect` - Backend system design and architecture
- `frontend-developer` - Frontend development across frameworks
- `full-stack-developer` - Full-stack implementation
- `nextjs-pro` - Next.js expert
- `react-pro` - React specialist
- `typescript-pro` - TypeScript expert
- `python-pro` - Python development
- `golang-pro` - Go development
- `mobile-developer` - Mobile app development
- `ui-designer` - UI design implementation
- `ux-designer` - UX design and research
- `dx-optimizer` - Developer experience optimization
- `legacy-modernizer` - Legacy code modernization
- `electron-pro` - Electron desktop app development

#### `agents/frontend/` - Frontend Architecture (1 agent)
- `senior-frontend-architect` - Senior-level frontend architecture decisions

#### `agents/backend/` - Backend Architecture (1 agent)
- `senior-backend-architect` - Senior-level backend architecture decisions

#### `agents/data-ai/` - Data & AI (8 agents)
- `ai-engineer` - AI/ML system design
- `data-engineer` - Data pipeline and infrastructure
- `data-scientist` - Statistical analysis and modeling
- `database-optimizer` - Database performance tuning
- `graphql-architect` - GraphQL API design
- `ml-engineer` - Machine learning engineering
- `postgres-pro` - PostgreSQL specialist
- `prompt-engineer` - LLM prompt optimization

#### `agents/infrastructure/` - Infrastructure & DevOps (5 agents)
- `cloud-architect` - Cloud infrastructure design
- `deployment-engineer` - CI/CD and deployment automation
- `devops-incident-responder` - DevOps incident management
- `incident-responder` - Production incident response
- `performance-engineer` - Infrastructure performance

#### `agents/security/` - Security (1 agent)
- `security-auditor` - Security vulnerability detection and OWASP compliance

#### `agents/quality-testing/` - Quality & Testing (5 agents)
- `code-reviewer` - Quality-focused code review
- `architect-review` - Architecture-level review
- `debugger` - Systematic debugging specialist
- `qa-expert` - Quality assurance strategy
- `test-automator` - Test automation engineering

#### `agents/orchestrators/` - Project Orchestrators (3 agents)
- `tech-lead-orchestrator` - Senior tech lead for task delegation and coordination
- `project-analyst` - Project requirement analysis
- `team-configurator` - Agent team configuration and setup

#### `agents/spec-agents/` - Specification Pipeline (8 agents)
- `spec-orchestrator` - Orchestrates the full spec pipeline
- `spec-analyst` - Requirement analysis
- `spec-architect` - Architecture from specs
- `spec-developer` - Implementation from specs
- `spec-planner` - Planning from specs
- `spec-reviewer` - Spec quality review
- `spec-tester` - Spec validation testing
- `spec-validator` - Spec completeness validation

#### `agents/ui-ux/` - UI/UX Design (1 agent)
- `ui-ux-master` - Master-level UI/UX design and implementation

#### `agents/business/` - Business & Product (1 agent)
- `product-manager` - Product strategy and roadmap management

#### `agents/specialization/` - Specialized Expertise (2 agents)
- `api-documenter` - API documentation specialist
- `documentation-expert` - Technical writing expert

#### `agents/specialized/` - Framework-Specific Experts (22 agents)
- **Django** (3): `django-api-developer`, `django-backend-expert`, `django-orm-expert`
- **Laravel** (2): `laravel-backend-expert`, `laravel-eloquent-expert`
- **Python** (9): `python-expert`, `django-expert`, `fastapi-expert`, `ml-data-expert`, `performance-expert`, `security-expert`, `testing-expert`, `web-scraping-expert`, `devops-cicd-expert`
- **Rails** (3): `rails-backend-expert`, `rails-api-developer`, `rails-activerecord-expert`
- **React** (2): `react-component-architect`, `react-nextjs-expert`
- **Vue** (3): `vue-component-architect`, `vue-nuxt-expert`, `vue-state-manager`

#### `agents/universal/` - Universal Developers (4 agents)
- `api-architect` - API design across all stacks
- `backend-developer` - Backend development across all stacks
- `frontend-developer` - Frontend development across all stacks
- `tailwind-css-expert` - Tailwind CSS specialist

#### `agents/utility/` - Utility Agents (1 agent)
- `refactor-agent` - Code refactoring specialist

#### `agents/code-reviewer-local/` (Legacy)
- Local code review agent

#### `agents/security-auditor/` (Legacy)
- Local security auditor agent

#### `agents/test-engineer/` (Legacy)
- Local test engineer agent

### Using Agent Personas

**Invoke Directly**: "Switch to code-reviewer persona for this review"
**Orchestrated**: "Use tech-lead-orchestrator to break down this project into agent tasks"
**Beast Mode**: "Activate beast mode for autonomous problem-solving"
**Parallel Analysis**: "Have security-auditor review this authentication code"
**Quality Gates**: Always use personas before shipping to production

---

## References Directory (`references/`)

**5 comprehensive checklists** that skills reference for domain expertise.

### Available Checklists

#### Security Checklist (`references/security-checklist.md`)
- Pre-commit checks, auth patterns, input validation
- Headers, CORS, OWASP Top 10 prevention
- Dependency auditing, secrets management

#### Testing Patterns (`references/testing-patterns.md`)
- Test structure, naming conventions, mocking strategies
- React/API/E2E testing examples, anti-patterns
- Test pyramid (80% unit, 15% integration, 5% E2E)

#### Performance Checklist (`references/performance-checklist.md`)
- Core Web Vitals targets, frontend/backend metrics
- Bundle analysis, profiling workflows
- Anti-pattern detection and optimization patterns

#### Accessibility Checklist (`references/accessibility-checklist.md`)
- WCAG 2.1 AA compliance, keyboard navigation
- Screen reader support, visual design, ARIA usage
- Testing tools and validation methods

#### Orchestration Patterns (`references/orchestration-patterns.md`)
- Multi-agent coordination, task decomposition
- Parallel execution strategies, dependency management
- Error handling and rollback procedures

### Using References

**Automatic Loading**: Skills reference these when needed
**Direct Access**: "Check the security-checklist for this implementation"
**Integration**: Always consult relevant checklists during implementation

---

## Commands Directory (`commands/`)

**7 slash commands** that orchestrate your entire development lifecycle.

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
- **Skills Used**: `git-master`, `finishing-a-development-branch`

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

## Documentation (`docs/`)

**Internal documentation** for system usage and maintenance.

### Available Docs

#### `docs/best-practices.md`
- Best practices guide for using the agent system effectively

#### `docs/creating-agents.md`
- Guide for creating new agent personas and extending the system

#### `docs/dependencies.md`
- Dependency map between skills, agents, and references

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

**You are now equipped with a production-grade engineering system.** This toolkit contains 168 skill workflows (100 core + 68 GSD sub-skills), 86 expert agents, 24 design specs, 9 MCP integrations, and quality gates that separate prototype code from production software.

**Use it relentlessly.** Every feature you build should go through planning -> implementation -> testing -> review -> deployment. Every decision should be grounded in the relevant skills and references.

**Quality is not optional.** The skills enforce the same standards that power Google, Meta, and other engineering powerhouses.

**Go build something amazing.**

---

*Last updated: 2026-05-11 | Total Skills: 168 (100 core + 68 GSD) | Commands: 7 | Agents: 86 | References: 5 | MCPs: 9 | Designs: 24 | Docs: 3*
