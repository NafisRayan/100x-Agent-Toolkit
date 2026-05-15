---
name: agent-personas
description: 142 expert agent personas organized across 23 categories for every software development role — from planning and architecture through coding, testing, security, deployment, and maintenance. Use when needing to invoke a specialized agent role, understand which agent to use for a task, compose multi-agent teams, or find the right persona for code review, debugging, build resolution, or project orchestration. Also use when setting up agent-based workflows, understanding agent capabilities, or deciding between multiple agents for a task. Covers core engineering, development, data/AI, infrastructure, security, quality/testing, spec pipeline, orchestration, build resolution, language-specific review, framework specialization, and more. Trigger on "which agent", "use agent", "agent persona", "agent for", "multi-agent team", "agent team", "orchestrate agents", "delegate to agent", or when configuring agent-based development workflows.
---

# Agent Personas — 142 Expert Personas for Software Development

A comprehensive library of agent personas covering every role in the software development lifecycle. Each persona is a self-contained `.md` file with YAML frontmatter (`name`, `description`, `tools`, `model`) defining the agent's identity, capabilities, and constraints.

## Architecture

```
references/
├── agent-organizer.md          # Master orchestrator — analyzes projects, forms agent teams
│
├── beast-mode/                 # Autonomous execution
│   └── beast mode 3.1.md       # Fully autonomous problem-solving, iterates until solved
│
├── core/                       # Core Engineering (13 agents)
│   ├── architect.md            # System design, scalability (opus)
│   ├── planner.md              # Complex feature planning (opus)
│   ├── code-reviewer.md        # Security-aware code review with severity reports
│   ├── code-archaeologist.md   # Deep legacy codebase analysis
│   ├── code-architect.md       # Feature architecture blueprints
│   ├── code-explorer.md        # Traces execution paths, maps dependencies
│   ├── code-simplifier.md      # Simplifies code preserving exact behavior
│   ├── a11y-architect.md       # WCAG 2.2 compliance (web + native)
│   ├── comment-analyzer.md     # Code comment accuracy analysis
│   ├── conversation-analyzer.md# Conversation hook behavior analysis
│   ├── documentation-specialist.md
│   ├── performance-optimizer.md
│   └── type-design-analyzer.md
│
├── development/                # Development Specialists (15 agents)
│   ├── backend-architect.md    # Backend system design
│   ├── frontend-developer.md   # React/frontend across frameworks
│   ├── full-stack-developer.md # End-to-end web apps
│   ├── nextjs-pro.md           # Next.js expert
│   ├── react-pro.md            # React specialist
│   ├── typescript-pro.md       # TypeScript expert
│   ├── python-pro.md           # Python development
│   ├── golang-pro.md           # Go development
│   ├── mobile-developer.md     # React Native + Flutter
│   ├── ui-designer.md          # UI design implementation
│   ├── ux-designer.md          # UX research and design
│   ├── dx-optimizer.md         # Developer experience
│   ├── legacy-modernizer.md    # Legacy code modernization
│   ├── electron-pro.md         # Electron desktop apps
│   └── harmonyos-app-resolver.md # HarmonyOS/ArkTS/ArkUI
│
├── data-ai/                    # Data & AI (11 agents)
│   ├── ai-engineer.md          # LLM apps, RAG, vector search
│   ├── data-engineer.md        # ETL/ELT, data warehouses, streaming
│   ├── data-scientist.md       # SQL, BigQuery, statistics
│   ├── database-optimizer.md   # SQL optimization, indexing, schema
│   ├── graphql-architect.md    # GraphQL schema design
│   ├── ml-engineer.md          # Production ML deployment
│   ├── postgres-pro.md         # PostgreSQL + PgLite
│   ├── prompt-engineer.md      # LLM prompt optimization
│   ├── gan-evaluator.md        # GAN Harness app evaluator (opus)
│   ├── gan-generator.md        # GAN Harness feature generator (opus)
│   └── gan-planner.md          # GAN Harness spec planner (opus)
│
├── infrastructure/             # Infrastructure & DevOps (9 agents)
│   ├── cloud-architect.md      # Multi-cloud (AWS/Azure/GCP)
│   ├── deployment-engineer.md  # CI/CD, Docker/K8s
│   ├── devops-incident-responder.md
│   ├── incident-responder.md   # SRE incident management
│   ├── performance-engineer.md # Infrastructure performance
│   ├── harness-optimizer.md    # Agent harness config optimization
│   ├── homelab-architect.md    # Home/small-lab networks
│   ├── network-architect.md    # Enterprise network design
│   └── network-troubleshooter.md
│
├── orchestrators/              # Project Orchestrators (5 agents)
│   ├── tech-lead-orchestrator.md # Task delegation (opus, max 2 parallel)
│   ├── project-analyst.md      # Tech-stack detection
│   ├── team-configurator.md    # Agent team setup
│   ├── chief-of-staff.md       # Communication triage (opus)
│   └── loop-operator.md        # Autonomous loop monitoring
│
├── quality-testing/            # Quality & Testing (9 agents)
│   ├── code-reviewer.md        # Comprehensive code quality review
│   ├── architect-review.md     # Architecture consistency review
│   ├── debugger.md             # Systematic debugging
│   ├── qa-expert.md            # QA strategy
│   ├── test-automator.md       # Test automation
│   ├── e2e-runner.md           # E2E testing (Playwright/Agent Browser)
│   ├── pr-test-analyzer.md     # PR test coverage review
│   ├── silent-failure-hunter.md # Swallowed error detection
│   └── tdd-guide.md            # TDD enforcement (80%+ coverage)
│
├── spec-agents/                # Spec Pipeline (8 agents)
│   ├── spec-orchestrator.md    # Pipeline coordination
│   ├── spec-analyst.md         # Requirements elicitation
│   ├── spec-architect.md       # Architecture from specs
│   ├── spec-developer.md       # Implementation from specs
│   ├── spec-planner.md         # Task decomposition
│   ├── spec-reviewer.md        # Code quality review
│   ├── spec-tester.md          # Comprehensive test suites
│   └── spec-validator.md       # Final quality validation
│
├── security/                   # Security (2 agents)
│   ├── security-auditor.md     # OWASP, threat modeling, pentest
│   └── security-reviewer.md    # Vulnerability detection & remediation
│
├── reviewers/                  # Language-Specific Reviewers (16 agents)
│   ├── typescript-reviewer.md  ├── python-reviewer.md
│   ├── rust-reviewer.md        ├── go-reviewer.md
│   ├── java-reviewer.md        ├── kotlin-reviewer.md
│   ├── swift-reviewer.md       ├── cpp-reviewer.md
│   ├── csharp-reviewer.md      ├── flutter-reviewer.md
│   ├── fastapi-reviewer.md     ├── database-reviewer.md
│   ├── fsharp-reviewer.md      ├── healthcare-reviewer.md
│   ├── mle-reviewer.md         └── network-config-reviewer.md
│
├── build-resolvers/            # Build Error Resolvers (9 agents)
│   ├── build-error-resolver.md # General build/TS errors
│   ├── cpp-build-resolver.md   ├── dart-build-resolver.md
│   ├── go-build-resolver.md    ├── java-build-resolver.md
│   ├── kotlin-build-resolver.md├── pytorch-build-resolver.md
│   ├── rust-build-resolver.md  └── swift-build-resolver.md
│
├── specialized/                # Framework-Specific Experts (22 agents)
│   ├── django/ (3): django-api-developer, django-backend-expert, django-orm-expert
│   ├── laravel/ (2): laravel-backend-expert, laravel-eloquent-expert
│   ├── python/ (9): python-expert, django-expert, fastapi-expert, ml-data-expert,
│   │              performance-expert, security-expert, testing-expert,
│   │              web-scraping-expert, devops-cicd-expert
│   ├── rails/ (3): rails-backend-expert, rails-api-developer, rails-activerecord-expert
│   ├── react/ (2): react-component-architect, react-nextjs-expert
│   └── vue/ (3): vue-component-architect, vue-nuxt-expert, vue-state-manager
│
├── specialization/             # Domain Specialists (5 agents)
│   ├── api-documenter.md       # OpenAPI specs, Postman
│   ├── documentation-expert.md # Style guides, info architecture
│   ├── doc-updater.md          # Codemaps, doc updates
│   ├── docs-lookup.md          # Context7-based doc lookup
│   └── seo-specialist.md       # Technical SEO audits
│
├── universal/                  # Universal Developers (4 agents)
│   ├── api-architect.md        # API design across stacks
│   ├── backend-developer.md    # Backend across stacks
│   ├── frontend-developer.md   # Frontend across stacks
│   └── tailwind-css-expert.md  # Tailwind CSS v4+
│
├── utility/                    # Utility Agents (2 agents)
│   ├── refactor-agent.md       # Code refactoring specialist
│   └── refactor-cleaner.md     # Dead code cleanup
│
├── opensource/                 # Open Source Pipeline (3 agents)
│   ├── opensource-forker.md    # Fork + strip secrets
│   ├── opensource-sanitizer.md # Verify sanitization
│   └── opensource-packager.md  # OSS packaging
│
├── backend/                    # Backend Architecture (1)
│   └── senior-backend-architect.md
├── frontend/                   # Frontend Architecture (1)
│   └── senior-frontend-architect.md
├── business/                   # Business & Product (1)
│   └── product-manager.md
└── ui-ux/                      # UI/UX Design (1)
    └── ui-ux-master.md
```

Legacy agents (superseded by newer versions): `code-reviewer-local/`, `security-auditor/`, `test-engineer/`

## When to Use

| Trigger | Action |
|---------|--------|
| Need a specialized agent for a task | Look up the right persona below and load its `.md` file |
| Multi-agent team composition | Read `agent-organizer.md` or `tech-lead-orchestrator.md` |
| Code review needed | Load `core/code-reviewer.md` or language-specific reviewer |
| Build error | Load matching `build-resolvers/` agent |
| Starting a new project | Use `orchestrators/project-analyst.md` then `team-configurator.md` |
| Debugging | Load `quality-testing/debugger.md` |
| Security audit | Load `security/security-auditor.md` |
| Architecture decision | Load `core/architect.md` |

## How to Use

### Step 1: Identify the Right Agent

Match the task to the agent category:

1. **Planning & Design** → `core/architect.md`, `core/planner.md`, `core/code-architect.md`
2. **Implementation** → `development/` (language/framework specialists)
3. **Code Review** → `core/code-reviewer.md` or `reviewers/` (language-specific)
4. **Testing** → `quality-testing/tdd-guide.md`, `quality-testing/e2e-runner.md`
5. **Debugging** → `quality-testing/debugger.md`
6. **Security** → `security/security-auditor.md`
7. **Build Errors** → `build-resolvers/` (language-specific)
8. **Infrastructure** → `infrastructure/` (cloud, deploy, incidents)
9. **Data & AI** → `data-ai/` (ML, databases, prompts)
10. **Orchestration** → `orchestrators/tech-lead-orchestrator.md`
11. **Open Source** → `opensource/` (fork, sanitize, package)

### Step 2: Load the Agent File

Read the relevant `.md` file from `references/`. The YAML frontmatter tells you:
- **name** — Agent identifier for invocation
- **description** — What the agent does and when to use it
- **tools** — Which tools the agent needs access to
- **model** — Recommended model tier (haiku/sonnet/opus)

### Step 3: Compose Multi-Agent Teams

For complex tasks, compose teams using the orchestrators:

**Small teams (2-3 agents)** — focused tasks:
```
architect + frontend-developer → Design and implement a UI component
```

**Medium teams (4-6 agents)** — feature development:
```
planner + backend-architect + frontend-developer + code-reviewer + tdd-guide
```

**Large teams (7+ agents)** — full project:
```
tech-lead-orchestrator coordinating:
  ├── architect (system design)
  ├── frontend-developer + ui-designer (frontend)
  ├── backend-architect + database-optimizer (backend)
  ├── security-auditor (security review)
  └── e2e-runner (testing)
```

### Step 4: Orchestration Rules

- **Max 2 agents in parallel** (per tech-lead-orchestrator rule)
- **Personas don't call other personas** — the orchestrator or command dispatches
- **Model selection**: opus for architects/planners, sonnet for developers, haiku for reviewers/documenters
- **Independent tasks** → parallel execution
- **Dependent tasks** → sequential execution

## Agent Catalog by Lifecycle Phase

| Phase | Primary Agents | Support Agents |
|-------|---------------|----------------|
| **Define** | product-manager, business-analyst | agent-organizer |
| **Plan** | architect, planner, tech-lead-orchestrator | project-analyst |
| **Build** | frontend-developer, backend-architect, full-stack-developer | specialized/* |
| **Verify** | tdd-guide, e2e-runner, test-automator | silent-failure-hunter |
| **Review** | code-reviewer, security-auditor, reviewers/* | pr-test-analyzer |
| **Ship** | deployment-engineer, cloud-architect | incident-responder |
| **Scale** | performance-engineer, performance-optimizer | refactor-cleaner |

## Rebuttals

| Excuse | Rebuttal |
|--------|----------|
| "I'll just do it myself" | Specialized agents catch things generalists miss — security vulnerabilities, performance bottlenecks, type design flaws. |
| "Too many agents, confusing" | Start with one. The `agent-organizer.md` recommends the right team for you. |
| "I don't need a reviewer" | Every production bug started as code someone thought was fine. Code review is mandatory. |
| "Build resolvers are overkill" | They make minimal surgical fixes instead of you thrashing around. Faster and safer. |
| "Legacy agents are useless" | They're superseded. Use the current versions in `core/`, `quality-testing/`, `security/`. |
