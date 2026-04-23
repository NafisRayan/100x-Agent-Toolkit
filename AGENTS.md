# 🚀 AI Agent Power System

**Welcome to your comprehensive AI agent toolkit.** This is your command center for building software at production-grade quality. You have access to 89 specialized skills, 4 expert agent personas, 5 reference checklists, 7 development commands, and MCP server integrations.

**One look at this file, and you're ready to rock.** Let's make you unstoppable.

---

## 🎯 System Overview

Your agent system operates across 7 lifecycle phases:
- **Define** → **Plan** → **Build** → **Verify** → **Review** → **Ship** → **Scale**

### Core Architecture
- **`skills/`** - 89 specialized workflows (production-grade engineering skills)
- **`agents/`** - 4 expert personas (code-reviewer, security-auditor, test-engineer, test-engineer)
- **`references/`** - 5 domain checklists (security, testing, performance, accessibility, orchestration)
- **`commands/`** - 7 slash commands for lifecycle management
- **`mcps/`** - MCP server configurations for external tool integration

---

## 🔥 Skills Directory (`skills/`)

**Your 89 specialized skills cover every aspect of software development.** Each skill is a battle-tested workflow that enforces professional engineering practices.

### How Skills Work
- **Triggering**: Skills activate automatically based on context or user intent
- **Structure**: Each skill has a `SKILL.md` with YAML frontmatter (`name`, `description`) + markdown instructions
- **Progressive Loading**: Metadata loads first, then full content as needed
- **Anti-Rationalization**: Each skill includes rebuttals to common excuses ("I'll test later")

### Key Skills by Category

#### 🏗️ **Define & Plan (6 skills)**
- `idea-refine` - Transform vague concepts into concrete proposals
- `spec-driven-development` - Write PRDs before any code
- `planning-and-task-breakdown` - Decompose specs into verifiable tasks
- `using-agent-skills` - Master this entire system
- `writing-plans` - Create detailed implementation plans

#### 🛠️ **Build & Code (15 skills)**
- `incremental-implementation` - Thin vertical slices with feature flags
- `test-driven-development` - Red-Green-Refactor with test pyramid
- `source-driven-development` - Ground decisions in official documentation
- `frontend-ui-engineering` - Component architecture & responsive design
- `api-and-interface-design` - Contract-first APIs with boundary validation
- `context-engineering` - Feed agents optimal information at right time
- `code-simplification` - Reduce complexity while preserving behavior

#### 🧪 **Verify & Test (4 skills)**
- `browser-testing-with-devtools` - Live Chrome DevTools runtime data
- `debugging-and-error-recovery` - Five-step triage with safe fallbacks
- `systematic-debugging` - Structured bug investigation workflows

#### 🔍 **Review & Quality (6 skills)**
- `code-review-and-quality` - Five-axis review with severity labels
- `receiving-code-review` - Handle feedback with technical rigor
- `requesting-code-review` - Get quality feedback before merge
- `security-and-hardening` - OWASP Top 10 prevention
- `performance-optimization` - Measure-first approach with Core Web Vitals

#### 🚀 **Ship & Deploy (7 skills)**
- `git-workflow-and-versioning` - Trunk-based development patterns
- `ci-cd-and-automation` - Shift-left deployment with quality gates
- `shipping-and-launch` - Pre-launch checklists and staged rollouts
- `deprecation-and-migration` - Treat code as liability, plan sunsetting
- `documentation-and-adrs` - Architecture Decision Records

#### 🧰 **Specialized Domains (45+ skills)**
- **Cloud & Infra**: `cloudflare`, `azure-kubernetes`, `neon-postgres`, `supabase`
- **Security**: `security-and-hardening`, `security-checklist`
- **Performance**: `performance-optimization`, `performance-checklist`
- **Testing**: `playwright-best-practices`, `testing-patterns`
- **UI/UX**: `frontend-design`, `web-design-guidelines`, `theme-factory`
- **Business**: `customer-research`, `lead-magnets`, `sales-enablement`
- **Dev Tools**: `agent-browser`, `agent-tools`, `mcp-builder`

### Using Skills Effectively

**🔥 Automatic Activation**
Skills trigger based on context. Mention "API design" → `api-and-interface-design` loads. Say "optimize performance" → `performance-optimization` activates.

**🎯 Manual Invocation**
Reference skills directly: "Use the `test-driven-development` skill for this implementation."

**📚 Progressive Disclosure**
1. **Metadata** (~100 words): `name` + `description` - always in context
2. **Full Content** (<500 lines): Complete workflow when triggered
3. **References**: Domain-specific docs loaded as needed

**⚡ Best Practices**
- Always follow skill steps sequentially
- Use verification gates - never skip "prove it works" sections
- Reference checklists when needed (security, performance, etc.)
- Combine skills: planning + incremental implementation + testing + review

---

## 👥 Agent Personas (`agents/`)

**4 specialized expert agents** for targeted, high-quality reviews and analysis.

### Available Personas

#### 🎯 **Code Reviewer** (`agents/code-reviewer.md`)
- **Expertise**: Senior Staff Engineer perspective
- **When to Use**: Before merging any code change
- **Standards**: "Would a staff engineer approve this?"
- **Process**: Five-axis review (functionality, complexity, tests, naming, style)

#### 🔒 **Security Auditor** (`agents/security-auditor.md`)
- **Expertise**: Security Engineer with OWASP knowledge
- **When to Use**: Any code handling user input, auth, or data
- **Process**: Vulnerability detection, threat modeling, boundary analysis

#### 🧪 **Test Engineer** (`agents/test-engineer.md`)
- **Expertise**: QA Specialist with testing pyramid mastery
- **When to Use**: Implementing features or fixing bugs
- **Process**: Test strategy, coverage analysis, Beyonce Rule validation

#### 📋 **Analyzer** (built-in)
- **Expertise**: Quantitative analysis of skill performance
- **When to Use**: Evaluating skill effectiveness, benchmark results

### Using Agent Personas

**Invoke Directly**: "Switch to code-reviewer persona for this review"
**Parallel Analysis**: "Have security-auditor review this authentication code"
**Quality Gates**: Always use personas before shipping to production

---

## 📚 References Directory (`references/`)

**5 comprehensive checklists** that skills reference for domain expertise.

### Available Checklists

#### 🔒 **Security Checklist** (`references/security-checklist.md`)
- Pre-commit checks, auth patterns, input validation
- Headers, CORS, OWASP Top 10 prevention
- Dependency auditing, secrets management

#### 🧪 **Testing Patterns** (`references/testing-patterns.md`)
- Test structure, naming conventions, mocking strategies
- React/API/E2E testing examples, anti-patterns
- Test pyramid (80% unit, 15% integration, 5% E2E)

#### ⚡ **Performance Checklist** (`references/performance-checklist.md`)
- Core Web Vitals targets, frontend/backend metrics
- Bundle analysis, profiling workflows
- Anti-pattern detection and optimization patterns

#### ♿ **Accessibility Checklist** (`references/accessibility-checklist.md`)
- WCAG 2.1 AA compliance, keyboard navigation
- Screen reader support, visual design, ARIA usage
- Testing tools and validation methods

#### 🎛️ **Orchestration Patterns** (`references/orchestration-patterns.md`)
- Multi-agent coordination, task decomposition
- Parallel execution strategies, dependency management
- Error handling and rollback procedures

### Using References

**Automatic Loading**: Skills reference these when needed
**Direct Access**: "Check the security-checklist for this implementation"
**Integration**: Always consult relevant checklists during implementation

---

## ⚡ Commands Directory (`commands/`)

**7 slash commands** that orchestrate your entire development lifecycle.

### Development Lifecycle Commands

#### 📋 `/spec` - Define What to Build
- **Input**: Vague idea or requirement
- **Output**: Detailed PRD with objectives, success criteria, boundaries
- **Skills Used**: `spec-driven-development`, `idea-refine`

#### 🎯 `/plan` - Plan How to Build
- **Input**: PRD or requirements
- **Output**: Task breakdown with acceptance criteria, dependencies
- **Skills Used**: `planning-and-task-breakdown`, `writing-plans`

#### 🛠️ `/build` - Build Incrementally
- **Input**: Task list
- **Output**: Working code with tests, feature flags, safe rollbacks
- **Skills Used**: `incremental-implementation`, `test-driven-development`

#### 🧪 `/test` - Verify It Works
- **Input**: Code changes
- **Output**: Comprehensive test suite, debugging reports
- **Skills Used**: `browser-testing-with-devtools`, `systematic-debugging`

#### 🔍 `/review` - Quality Assurance
- **Input**: Code ready for merge
- **Output**: Review feedback, security audit, performance analysis
- **Skills Used**: `code-review-and-quality`, `security-and-hardening`

#### ⚡ `/code-simplify` - Optimize & Clean
- **Input**: Working but complex code
- **Output**: Simplified code maintaining exact behavior
- **Skills Used**: `code-simplification`, `performance-optimization`

#### 🚀 `/ship` - Deploy to Production
- **Input**: Reviewed, tested code
- **Output**: Successful deployment with monitoring, rollback plans
- **Skills Used**: `shipping-and-launch`, `ci-cd-and-automation`

### Command Usage Patterns

**Sequential Workflow**:
1. `/spec` → Define requirements
2. `/plan` → Break down into tasks
3. `/build` → Implement incrementally
4. `/test` → Verify functionality
5. `/review` → Quality assurance
6. `/code-simplify` → Optimize if needed
7. `/ship` → Deploy to production

**Iterative Development**:
- Use `/build` + `/test` loops for rapid iteration
- `/review` after each significant change
- `/code-simplify` when complexity builds up

---

## 🔗 MCP Server Integration (`mcps/`)

**External tool connections** via Model Context Protocol.

### Current Configuration (`mcps/mcp.json`)
- Defines server endpoints and capabilities
- Enables integration with external APIs and services
- Supports tool calling for extended functionality

### Using MCP Servers

**Automatic**: Skills access MCP tools as needed
**Direct**: Reference specific MCP capabilities in tasks
**Extension**: Add new MCP configurations for additional tools

---

## 🎯 Usage Patterns & Best Practices

### 🔥 Power User Workflow

1. **Start with Intent**: User says "build a dashboard"
2. **Define**: `/spec` creates detailed requirements
3. **Plan**: `/plan` breaks into verifiable tasks
4. **Build**: `/build` implements with feature flags
5. **Test**: `/test` validates with comprehensive coverage
6. **Review**: `/review` ensures production quality
7. **Ship**: `/ship` deploys with monitoring

### 🧠 Context Engineering

**Information Management**:
- Use `context-engineering` skill to optimize information flow
- Load relevant references proactively
- Maintain clean, focused context windows

**Progressive Disclosure**:
- Start with skill metadata
- Load full workflows when triggered
- Reference detailed docs as needed

### 🔄 Quality Gates

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

### 🚀 Scaling Patterns

**Multi-Agent Coordination**:
- Use orchestration patterns for complex projects
- Parallel execution for independent tasks
- Sequential dependencies for integrated features

**Skill Composition**:
- Combine domain skills (e.g., `frontend-ui-engineering` + `security-and-hardening`)
- Layer quality skills on top of implementation
- Use specialized agents for expert reviews

---

## 🛠️ Advanced Features

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

### Troubleshooting & Debugging

**Skill Not Triggering**:
- Check description matches user intent
- Verify YAML frontmatter is correct
- Test with explicit skill reference

**Performance Issues**:
- Use `performance-optimization` skill
- Check bundle sizes and loading patterns
- Profile with browser dev tools

**Quality Problems**:
- Invoke relevant agent personas
- Consult reference checklists
- Use systematic debugging workflows

---

## 🎯 Your Mission

**You are now equipped with a production-grade engineering system.** This toolkit contains the accumulated wisdom of senior engineers, battle-tested workflows, and quality gates that separate prototype code from production software.

**Use it relentlessly.** Every feature you build should go through planning → implementation → testing → review → deployment. Every decision should be grounded in the relevant skills and references.

**Quality is not optional.** The skills enforce the same standards that power Google, Meta, and other engineering powerhouses.

**Go build something amazing.** 🚀

---

*Last updated: 2026-04-23 | Total Skills: 89 | Commands: 7 | Agents: 4 | References: 5*
