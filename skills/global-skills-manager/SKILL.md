---
name: global-skills-manager
description: Use when installing AI agent skills globally (not project-specific) via npx autoskills detection or manual skill discovery and installation with -g flag.
---

# Global Skills Manager

Manages global installation of AI agent skills across all projects using npx autoskills for stack detection, npx skills find for discovery, and npx skills add -g for global installation.

## When to Use This Skill

Use this skill when the user wants to:

- Install AI agent skills **globally** (available in all projects, not tied to a specific codebase)
- Set up their development environment with best-practice skills for their common tech stack
- Bulk-install recommended skills from autoskills detection across multiple projects
- Discover and install skills for capabilities they frequently use (testing, deployment, etc.)
- Run `npx autoskills` but want global installation instead of project-local
- "Install skills for all my projects" or "set up my AI assistant globally"

**Do NOT use when:**
- User wants project-specific skills (use vanilla `npx autoskills` or `npx skills add` without `-g`)
- Working within a project that already has a `.skills` directory
- User explicitly wants skills scoped to one repository

## Core Principle

**Global vs Project Skills:**
- **Project skills** (default): Stored in `.skills/` folder, version-controlled per-project, shared with team
- **Global skills** (`-g` flag): Stored in `~/.skills/`, machine-wide, personal preference, NOT version-controlled

 **Use `-g` for:** Developer productivity tools you want everywhere (testing helpers, deployment skills, formatting tools)
**Use project-local for:** Framework-specific skills that define a project's identity (React, Next.js, Svelte, etc.)

## Red Flags - STOP and Reconsider

- Installing framework skills (React, Vue) globally → These belong in project
- Using `npx skills add` without `-g` when you meant global → Double-check scope
- Skipping verification of skill source before `-g` install → Always check install count > 1K
- Forgetting `-y` in batch operations → Will halt for prompts
- Assuming global skills are shared with team → They're personal, not collaborative

## Quick Reference

| Task | Command |
|------|---------|
| Detect stack & install globally | `npx autoskills && npx skills add $(npx autoskills --json | jq -r '.skills[].name') -g -y` |
| Find skill by description | `npx skills find "query"` |
| Install specific skill globally | `npx skills add <owner/repo@skill> -g -y` |
| List global skills | `npx skills list -g` |
| Remove global skill | `npx skills remove <skill> -g` |
| Update all global skills | `npx skills update -g` |

## Workflow

### Option 1: Auto-Detect from Current Stack

```bash
# Step 1: Scan current project to detect tech stack
cd /path/to/your/project
npx autoskills

# Sample output:
# ✔ Detected: React, Next.js, TypeScript, Tailwind
# ✔ Recommended skills: nextjs, react, tailwind, typescript, testing

# Step 2: Install globally
npx autoskills | grep "✔ Recommended" | awk '{print $3}' | xargs -I {} npx skills add {} -g -y

# Alternative: Use autoskills --json flag if available
npx autoskills --json | jq -r '.skills[].name' | xargs -I {} npx skills add {} -g -y
```

### Option 2: Manual Discovery with find-skills

```bash
# Search for skills by natural language
npx skills find "deploy to AWS"
npx skills find "React performance optimization"
npx skills find "writing better tests"

# Review results, pick desired skills, then install globally
npx skills add vercel-labs/agent-skills@performance-optimization -g -y
npx skills add playwright-best-practices -g -y
```

### Option 3: Hybrid Approach (Interactive)

Ask me what type of skills you want:
- "I want testing skills globally" → Search and recommend top testing skills
- "Deployment skills for all my projects" → Find deployment/CI-CD skills
- "Full-stack web dev skills" → Combine multiple categories

## Implementation

### Bash Script Template

Save this as `global-skills-manager.sh`:

```bash
#!/bin/bash

# Global AI Agent Skills Manager
# Installs skills globally (-g) rather than project-local

set -e

echo "🌍 Global Skills Manager"
echo "========================"

# Check if in a project directory
if [ -f "package.json" ] || [ -f "requirements.txt" ] || [ -f "pom.xml" ]; then
    echo "📁 Detected project files in current directory."
    read -p "Run autoskills detection first? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔍 Detecting tech stack..."
        npx autoskills
        
        echo ""
        read -p "Install detected skills globally? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            # Extract skill names and install - adjust parsing based on autoskills output format
            npx autoskills 2>&1 | grep -oP '([a-z]+-[a-z-]+)' | sort -u | while read skill; do
                echo "📦 Installing $skill globally..."
                npx skills add "$skill" -g -y || echo "⚠️  Failed to install $skill"
            done
        fi
    fi
fi

echo ""
echo "🔎 Manual skill search (leave empty to skip)"
read -p "What type of skills are you looking for? " query

if [ -n "$query" ]; then
    echo ""
    echo "Searching for: $query"
    npx skills find "$query"
    
    echo ""
    read -p "Enter skill names to install globally (space-separated): " -a skills_to_install
    for skill in "${skills_to_install[@]}"; do
        if [ -n "$skill" ]; then
            echo "📦 Installing $skill globally..."
            npx skills add "$skill" -g -y || echo "⚠️  Failed to install $skill"
        fi
    done
fi

echo ""
echo "✅ Global skills installation complete!"
echo "📋 List all global skills: npx skills list -g"
```

Make executable: `chmod +x global-skills-manager.sh`

### PowerShell Version (Windows)

```powershell
# global-skills-manager.ps1
Write-Host "🌍 Global Skills Manager" -ForegroundColor Cyan
Write-Host "========================"

# Detect project
$hasProject = Test-Path "package.json" -PathType Leaf -or (Test-Path "requirements.txt") -or (Test-Path "pom.xml")

if ($hasProject) {
    Write-Host "📁 Detected project files in current directory." -ForegroundColor Yellow
    $response = Read-Host "Run autoskills detection first? (y/n)"
    
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host "🔍 Detecting tech stack..." -ForegroundColor Cyan
        npx autoskills
        
        $proceed = Read-Host "Install detected skills globally? (y/n)"
        if ($proceed -eq 'y' -or $proceed -eq 'Y') {
            # Parse autoskills output and install
            $skillsOutput = npx autoskills 2>&1
            # Simple pattern match for skill names (adjust based on actual output format)
            $skills = $skillsOutput | Select-String -Pattern '\b([a-z]+-[a-z-]+)\b' | ForEach-Object { $_.Matches[0].Groups[1].Value } | Sort-Object -Unique
            
            foreach ($skill in $skills) {
                Write-Host "📦 Installing $skill globally..." -ForegroundColor Green
                npx skills add $skill -g -y
            }
        }
    }
}

$query = Read-Host "`n🔎 Manual skill search (leave empty to skip). What type of skills are you looking for?"
if ([string]::IsNullOrWhiteSpace($query)) {
    Write-Host "Done!" -ForegroundColor Green
    exit 0
}

Write-Host "Searching for: $query" -ForegroundColor Cyan
npx skills find $query

$skillsToInstall = (Read-Host "`nEnter skill names to install globally (space-separated)").Split(' ')
foreach ($skill in $skillsToInstall) {
    if (-not [string]::IsNullOrWhiteSpace($skill)) {
        Write-Host "📦 Installing $skill globally..." -ForegroundColor Green
        npx skills add $skill -g -y
    }
}

Write-Host "`n✅ Global skills installation complete!" -ForegroundColor Green
Write-Host "📋 List all global skills: npx skills list -g"
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `-g` on project-specific skills | Only use `-g` for personal productivity tools, NOT framework skills that define a project |
| Installing ALL autoskills recommendations globally | Some skills are project-specific (React, Next.js). Filter to general-purpose ones (testing, deployment, formatting) |
| Forgetting `-y` flag | Without `-y`, installs will prompt, breaking batch operations |
| Mixing global and project skills in same workflow | Keep them separate; global for YOU, project for the CODEBASE |
| Not checking if skill already installed globally | Run `npx skills list -g` first to avoid redundant installs |
| Installing from unverified sources | Verify install count > 1K and source reputation before `-g` install |

## Real-World Impact

**Before this skill:**
- Manually running `npx autoskills` → copying skill names → `npx skills add` for each
- No global bulk install, time-consuming per-project setup
- Uncertainty about which skills should be global vs project-local

**After this skill:**
- One command to set up all global skills
- Clear separation of global (personal) vs project (codebase) skills
- Faster onboarding to new machines or projects

## When to Use Global Skills

| Skill Type | Global? | Example |
|------------|---------|---------|
| Testing frameworks | ✅ Yes | `jest`, `vitest`, `playwright` |
| Deployment/CI-CD | ✅ Yes | `cicd`, `aws`, `vercel` |
| Code formatting/linting | ✅ Yes | `prettier`, `eslint`, `biome` |
| Performance tools | ✅ Yes | `performance-optimization`, `bundle-analyzer` |
| Framework-specific | ❌ No | `react`, `nextjs`, `vue`, `svelte` |
| Project-specific config | ❌ No | Any skill tied to a specific codebase's tools |

## Security Note

Global skills install to `~/.skills/` and run with your user permissions. They:
- Are **NOT** automatically shared with team members (each developer installs their own)
- Can contain arbitrary code from skill authors — vet sources before installing globally
- Should be **updated regularly** (`npx skills update -g`) to get security patches
- **Do NOT** expose project-specific secrets (they run outside the project context)

## Registry Maintenance

**Important:** The `.skill-lock.json` file in the Kilo project root tracks **local Kilo skills only** (the skills in `.agents/skills/`). Global skills installed via `npx skills add -g` are stored in `~/.skills/` and managed by the npx skills CLI — they are **not** recorded in `.skill-lock.json`.

This skill does not modify `.skill-lock.json`. After installing new **local** Kilo skills (if any), run:

```bash
npx skills sync  # Updates .skill-lock.json with current local skill state
```

or manually edit `.skill-lock.json` following the existing schema.

## Validation & Testing

Test this skill with these scenarios:

**Scenario 1 - Auto-detection:**
```
User: "Install global skills from my current project"
You: Running npx autoskills... Detected: React, TypeScript, Tailwind. Install nextjs, react, tailwind, typescript globally? (y/n)
```

**Scenario 2 - Manual search:**
```
User: "I want testing skills globally"
You: Searching for testing skills... Found: jest (50K), vitest (30K), playwright (80K). Which to install?
```

**Scenario 3 - Error handling:**
```
User: "Install non-existent skill"
You: Skill 'foo-bar' not found in registry. Search for similar: foobar, foo-barista
```

**Scenario 4 - Already installed:**
```
User: "Install react globally"
You: 'react' already installed globally (v1.2.3). Skip or reinstall?
```

## Advanced: Bulk Update All Global Skills

```bash
# List outdated global skills
npx skills outdated -g

# Update all
npx skills update -g

# Update specific
npx skills update vercel-labs/agent-skills -g
```
