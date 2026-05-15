---
name: syntax-rules
description: Apply language-specific coding standards, conventions, and syntax rules across 18 languages plus universal common rules. Use when writing, reviewing, or refactoring code in any language — enforces coding style, testing patterns, security practices, error handling, naming conventions, immutability principles, and project structure. Triggers on "coding standards", "code style", "syntax rules", "coding conventions", "apply rules", "follow conventions", "enforce style", "lint rules", or when writing code in any supported language. Covers TypeScript, JavaScript, Python, Rust, Go, Java, Kotlin, Swift, C++, C#, PHP, Dart, Angular, ArkTS, F#, Perl, web/frontend, and Chinese-language rules.
---

# Syntax Rules — Language-Specific Coding Standards

A two-layer rules engine: **common** universal principles + **18 language-specific** extensions that override common defaults where idioms differ.

## Architecture

```
references/
├── common/          # 10 universal rule files (ALWAYS loaded)
│   ├── agents.md              # Agent orchestration patterns
│   ├── code-review.md         # Review checklist, severity levels, workflow
│   ├── coding-style.md        # KISS/DRY/YAGNI, immutability, naming, file org
│   ├── development-workflow.md # Research -> Plan -> TDD -> Review -> Commit
│   ├── git-workflow.md        # Conventional commits, PR process
│   ├── hooks.md               # PreToolUse/PostToolUse/Stop hooks
│   ├── patterns.md            # Repository pattern, API response envelope
│   ├── performance.md         # Model selection, context window, extended thinking
│   ├── security.md            # Pre-commit checks, secret management, response protocol
│   └── testing.md             # 80% coverage, TDD (RED/GREEN/IMPROVE), AAA pattern
│
├── typescript/      # TS/JS: type safety, Zod validation, React props, Playwright E2E
├── angular/         # Angular: component patterns, RxJS, dependency injection
├── arkts/           # HarmonyOS/ArkTS: V2 state management, Navigation routing
├── cpp/             # C++: RAII, modern C++17/20/23, clang-format
├── csharp/          # C#: .NET conventions, async, nullable reference types
├── dart/            # Dart/Flutter: widget patterns, state management
├── fsharp/          # F#: functional idioms, computation expressions
├── golang/          # Go: interfaces, error wrapping, gofmt
├── java/            # Java: records, sealed types, Optional, streams
├── kotlin/          # Kotlin: null safety, sealed classes, coroutines, scope functions
├── perl/            # Perl: modern Perl patterns
├── php/             # PHP: PSR-12, strict types, readonly properties
├── python/          # Python: PEP 8, type annotations, pytest + FastAPI extension
├── rust/            # Rust: ownership, Result/?, thiserror/anyhow, iterators
├── swift/           # Swift: value semantics, Sendable, typed throws, actors
├── web/             # Web/Frontend: design quality, performance, accessibility
└── zh/              # Chinese translations of all common rules
```

## When to Use

| Trigger | Action |
|---------|--------|
| Writing new code in any language | Load `common/` + target language rules |
| Reviewing code | Load `common/code-review.md` + language rules |
| Fixing code style issues | Load language `coding-style.md` + `common/coding-style.md` |
| Setting up a new project | Load `common/development-workflow.md` + language rules |
| Security audit | Load `common/security.md` + language `security.md` |
| Writing tests | Load `common/testing.md` + language `testing.md` |
| Configuring hooks | Load `common/hooks.md` + language `hooks.md` |

## Workflow

### Step 1: Detect Language

Identify the target language(s) from:
- File extensions (`.ts`, `.py`, `.rs`, `.go`, `.java`, `.kt`, `.swift`, `.cpp`, `.cs`, `.php`, `.dart`, `.fs`, `.pl`, `.ets`)
- Project config files (`tsconfig.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml`, `build.gradle`, `Package.swift`, `CMakeLists.txt`, `composer.json`, `pubspec.yaml`, `.fsproj`, `angular.json`)
- User-specified language

### Step 2: Load Rules

**Always load** `references/common/` (10 files) — these are universal non-negotiable principles.

**Then load** the matching language directory:
- Each language has 5 core files: `coding-style.md`, `testing.md`, `patterns.md`, `security.md`, `hooks.md`
- Python has an extra: `fastapi.md`
- Web has two extras: `design-quality.md`, `performance.md`

**Priority**: Language-specific rules **override** common rules when they conflict (specific > general).

### Step 3: Apply Rules

Apply rules according to context:

**When writing code:**
1. Follow language `coding-style.md` for naming, formatting, immutability, error handling
2. Follow language `patterns.md` for idiomatic design patterns
3. Follow `common/development-workflow.md` for the implementation process
4. Validate input per `common/coding-style.md` and language `security.md`

**When reviewing code:**
1. Use `common/code-review.md` checklist (severity levels: CRITICAL/HIGH/MEDIUM/LOW)
2. Check security triggers from `common/security.md`
3. Apply language-specific style checks from language `coding-style.md`
4. Verify test coverage >= 80% per `common/testing.md`

**When writing tests:**
1. Follow TDD cycle from `common/testing.md`: RED -> GREEN -> IMPROVE
2. Use AAA pattern (Arrange-Act-Assert)
3. Apply language-specific test framework guidance from language `testing.md`
4. Target 80%+ coverage minimum

### Step 4: Report Violations

When violations are found, report them using the severity framework from `common/code-review.md`:

| Level | Meaning | Action |
|-------|---------|--------|
| CRITICAL | Security vulnerability or data loss risk | BLOCK — Must fix immediately |
| HIGH | Bug or significant quality issue | WARN — Should fix before merge |
| MEDIUM | Maintainability concern | INFO — Consider fixing |
| LOW | Style or minor suggestion | NOTE — Optional |

## Key Principles Summary

### Immutability (CRITICAL — all languages)
- Create new objects, never mutate existing ones
- Language implementations: spread operator (TS), frozen dataclasses (Python), `let` by default (Rust/Swift), `val` (Kotlin), `record` (Java), `Readonly<>` (C#)

### Security (CRITICAL — all languages)
- Never hardcode secrets
- Always validate input at system boundaries
- Use parameterized queries
- No `console.log`/`print` in production

### Testing (MANDATORY — all languages)
- 80% minimum coverage
- TDD workflow: write test first, watch it fail, implement, refactor
- AAA pattern for test structure
- All three test types required: unit + integration + E2E

### Error Handling (MANDATORY — all languages)
- Handle errors explicitly at every level
- Never silently swallow errors
- Use language-appropriate error types (Result, Either, exceptions, etc.)

### File Organization (ALL languages)
- Many small files > few large files
- 200-400 lines typical, 800 max
- Organize by feature/domain, not by type

## Multi-Language Projects

For projects using multiple languages (e.g., TypeScript frontend + Python backend):
1. Load `common/` rules once
2. Load each language's rules independently
3. Apply each language's rules only to its respective files
4. Cross-cutting concerns (security, testing, git workflow) use common rules

## Rebuttals

| Excuse | Rebuttal |
|--------|----------|
| "I'll add tests later" | No. TDD is mandatory. Write the test first. |
| "This style is fine for now" | Consistency matters. Follow the language conventions. |
| "Immutable code is slower" | Immutability prevents bugs. Profile before optimizing. Correctness > performance. |
| "I don't need 80% coverage" | Yes you do. Coverage catches regressions and documents intent. |
| "I'll skip the security check just this once" | Security violations are CRITICAL. They block merges. Always. |
| "These rules are too strict" | Strict rules prevent production incidents. Every rule exists because a real bug happened. |
