---
name: full-code-review
description: Run a deep multi-agent code review across one or more codebases. Covers security, code quality, and business logic. Outputs structured markdown with file paths, line numbers, severity ratings, and fix instructions. Triggers on "full code review", "comprehensive review", "code audit", "review entire codebase", "review all code".
---

# Full Code Review — Multi-Agent Deep Review

Runs a comprehensive code review using parallel specialized agents. Each codebase gets 3 review dimensions (Security & Auth, Code Quality & Patterns, Business Logic). Results are synthesized into numbered markdown files in a `claude-code-review/` output folder.

## Quick Start

```
/full-code-review
```

Then specify which codebases to review (paths relative to workspace root). The agent will discover them automatically if the workspace has obvious top-level directories.

## Output Structure

All output goes to `<workspace-root>/claude-code-review/`:

```
claude-code-review/
  00-executive-summary.md      ← Severity counts, top priorities, phased fix plan
  01-<codebase>-security.md    ← Auth, injection, data exposure, secrets
  02-<codebase>-code-quality.md ← Patterns, TypeScript, duplication, testing
  03-<codebase>-business-logic.md ← Order flows, payments, scheduling, edge cases
  ... (repeats per codebase)
```

## Review Dimensions Per Codebase

### Dimension 1: Security & Auth
- Authentication vulnerabilities (JWT handling, token storage, session management)
- Authorization flaws (missing guards, privilege escalation, role checks)
- Injection attacks (SQL injection, command injection, XSS)
- Data exposure (sensitive data in responses, PII leaks, console logging)
- Input validation (missing validation, DTO gaps, unchecked inputs)
- Rate limiting (missing limits on sensitive endpoints)
- Payment security (webhook signature verification, PCI compliance)
- Secrets management (hardcoded secrets, exposed API keys)
- CORS and headers (misconfigured CORS, missing security headers)
- Third-party integration security

### Dimension 2: Code Quality & Patterns
- Framework-specific patterns (NestJS DI, React hooks, proper module organization)
- ORM/Database usage (N+1 queries, missing indexes, transaction handling)
- Error handling (unhandled rejections, generic error swallowing, inconsistent responses)
- Code duplication (repeated logic, copy-pasted patterns needing abstraction)
- Type safety (`any` types, type assertions, missing null checks)
- Memory leaks (unclosed connections, uncleaned listeners, object URLs)
- Async patterns (missing await, fire-and-forget, race conditions)
- Testing (missing tests for critical paths, untested edge cases)
- Component design (god components, poor composition, prop drilling)

### Dimension 3: Business Logic
- Core flow correctness (order processing, payment handling, scheduling)
- Race conditions (concurrent modifications, double submissions)
- State machine issues (invalid transitions, missing states)
- Price calculation (server-side validation, client-controlled values)
- Data integrity (cascading deletes, orphaned records, atomic operations)
- Edge cases (empty inputs, zero values, boundary conditions)
- Webhook processing (idempotency, error handling, retry logic)
- UI state management (data loss on refresh, stale closures, split-brain state)

## Agent Orchestration

The review dispatches **3 agents per codebase** (9 total for a 3-codebase project), all running in parallel:

```
Codebase A ─┬─ Security Agent    ─→ 01-codebase-a-security.md
            ├─ Quality Agent     ─→ 02-codebase-a-code-quality.md
            └─ Business Logic    ─→ 03-codebase-a-business-logic.md

Codebase B ─┬─ Security Agent    ─→ 04-codebase-b-security.md
            ├─ Quality Agent     ─→ 05-codebase-b-code-quality.md
            └─ Business Logic    ─→ 06-codebase-b-business-logic.md
```

Each agent is a `general-purpose` subagent that reads actual source files and reports only verified findings.

## Instructions for the Orchestrating Agent

### Step 1: Discover Codebases

Scan the workspace root for codebases. Look for:
- Directories with `package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`
- Directories with `src/` or `lib/` structure
- Common patterns: `*-backend`, `*-frontend`, `*-web`, `*-api`

Ask the user to confirm which directories to review if there are more than 5 candidates.

### Step 2: Quick Explore (Optional but Recommended)

Launch one Explore agent per codebase for a fast overview (tech stack, structure, key files). This gives context to the review agents so they can find the right files faster.

### Step 3: Dispatch Review Agents

For each codebase, launch 3 `general-purpose` agents in parallel with the prompts below. Use `run_in_background: true` for all agents so they run concurrently.

**Security Agent Prompt Template:**
```
You are a senior security-focused code reviewer. Thoroughly review the [CODEBASE_NAME] codebase at [CODEBASE_PATH] for security issues.

Focus on:
1. Authentication vulnerabilities — JWT handling, token storage, refresh token logic, session management
2. Authorization flaws — Permission checks, role-based access control, missing guards, privilege escalation
3. Injection attacks — SQL injection, command injection, XSS in responses
4. Data exposure — Sensitive data in responses, missing field filtering, PII leaks
5. Input validation — Missing validation pipes, DTO validation gaps, unchecked user inputs
6. Rate limiting — Missing rate limits on sensitive endpoints
7. Payment/webhook security — Webhook signature verification, payment manipulation risks
8. Secrets management — Hardcoded secrets, exposed API keys, insecure defaults
9. Error handling — Information leakage in error responses
10. CORS and headers — Misconfigured CORS, missing security headers

Read the actual implementation files. Report concrete issues with file paths, line numbers, and severity (Critical/High/Medium/Low). Only report real issues you can verify in the code — do not speculate.
```

**Code Quality Agent Prompt Template:**
```
You are a senior code reviewer focused on code quality, patterns, and maintainability. Thoroughly review the [CODEBASE_NAME] codebase at [CODEBASE_PATH].

Focus on:
1. Framework patterns — Proper module organization, dependency injection, circular dependencies
2. ORM/Database usage — Entity definitions, N+1 query problems, missing indexes, transaction handling
3. Error handling — Unhandled promise rejections, missing try-catch, generic error swallowing
4. Code duplication — Repeated logic across services, copy-pasted patterns that should be abstracted
5. Type safety — Any types, type assertions, missing null checks, unsafe type casts
6. Memory leaks — Unclosed connections, event listeners, streams not destroyed
7. Async patterns — Missing await, fire-and-forget promises, concurrent operation issues
8. React patterns (if frontend) — Missing memoization, useEffect dependencies, stale closures
9. State management (if frontend) — Context re-renders, React Query misuse, prop drilling
10. Testing gaps — Missing tests for critical paths, untested edge cases

Read the actual source files. Report concrete issues with file paths, line numbers, and explanation. Only report real issues you can verify.
```

**Business Logic Agent Prompt Template:**
```
You are a senior developer reviewing business logic correctness. Thoroughly review the [CODEBASE_NAME] codebase at [CODEBASE_PATH].

Focus on:
1. Core flows — Order processing, payment handling, scheduling — race conditions, state machine issues
2. Payment logic — Double charging risks, payment state inconsistencies, refund handling
3. Job/scheduling logic — Scheduling conflicts, timezone issues, bulk operation edge cases
4. Pricing — Price calculation correctness, server-side validation, edge cases in discounts
5. Data integrity — Cascading deletes, orphaned records, missing transactions
6. Edge cases — Empty inputs, zero values, concurrent modifications, boundary conditions
7. Webhook handling — Idempotency, race conditions between webhook and API calls
8. Frontend state (if frontend) — Data loss on refresh, stale closures, split-brain state, missing error boundaries
9. Form handling — Validation gaps, unsaved changes, form reset issues
10. Navigation/routing — Broken links, incorrect redirects, browser back button handling

Read the actual service/component implementation files. Report concrete issues with file paths, line numbers, and explanation. Only report real issues you can verify.
```

### Step 4: Write Output Files

As each agent completes, collect its findings. Then write the output folder:

1. **`claude-code-review/`** — Create at workspace root
2. **Numbered files** — One per agent result, prefixed with sequential number
3. **Executive summary** — `00-executive-summary.md` with:
   - Severity distribution table (Critical/High/Medium/Low per codebase)
   - Top 5 priorities with one-line descriptions
   - Document index listing all output files
   - Recommended fix order (phased: Security → Payment → UI Bugs → Code Quality)

### File Format

Each findings file should use this structure:

```markdown
# [Codebase Name] — [Review Dimension] Review

**Codebase**: [path]
**Review Focus**: [specific areas]

---

## CRITICAL

### [ID]: [Title]

**File**: `[relative path]:[line number]`

```[language]
[code snippet showing the issue]
```

[Explanation of the issue]

**Fix**: [Specific fix instructions with code example]

---

## HIGH
[Same format]

## MEDIUM
[Same format]

## LOW
[Same format]
```

### Step 5: Present Summary

After all files are written, present a condensed summary to the user showing:
- Total findings count by severity
- The top 5 most critical items
- The output folder location

## Severity Guidelines

| Severity | Criteria |
|----------|----------|
| **CRITICAL** | Actively exploitable in production (data breach, auth bypass, payment fraud, data loss). Fix immediately. |
| **HIGH** | Significant risk or broken functionality (race conditions leading to incorrect data, missing auth on sensitive endpoints, crashes in core flows). Fix within days. |
| **MEDIUM** | Quality/reliability issues (code duplication, missing tests, performance problems, inconsistent error handling). Fix within weeks. |
| **LOW** | Code hygiene (console.log in production, commented-out code, unused imports, minor naming issues). Fix opportunistically. |

## Scope Controls

The agent should:
- Review only files on the **current branch** (not git history)
- Focus on **source code** (`src/`, `lib/`, `app/`) — not generated files, node_modules, or build output
- **Verify every finding** in the actual code — no speculation
- Include **file paths relative to workspace root** for easy navigation
- Include **line numbers** for precise location
- Include **code snippets** showing the problematic code
- Provide **fix instructions** that another AI agent can implement directly

## Gotchas

- **Agent context limits**: If a codebase is very large (>500 source files), a single agent may hit its context window. If an agent fails with "context window limit," relaunch with a more focused prompt targeting specific subdirectories.
- **Parallel agent count**: Don't launch more than 12 agents simultaneously. If reviewing 5+ codebases, batch them (3 codebases at a time = 9 agents).
- **Cross-codebase issues**: Some issues span codebases (e.g., raw card data sent from frontend to backend). Note these in the executive summary with references to findings in both files.
- **False positives**: Some findings may be intentional (e.g., console.log in a debug module). The reviewing agent should note when something *might* be intentional but still flag it for verification.
