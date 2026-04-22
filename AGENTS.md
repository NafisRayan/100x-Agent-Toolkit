# Agent Guidelines: Skills Repository

This repository is a collection of "skills" (structured instructions) for AI agents.

## Architecture
- **Skills Directory**: All skills are located in the `skills/` folder.
- **Skill Definition**: Each skill is a directory containing a `SKILL.md` file.
- **Supporting Files**: Reference materials, examples, or assets for a skill are stored in subdirectories (e.g., `references/`, `examples/`, `assets/`).
- **Lockfile**: `.skill-lock.json` tracks installed skills, their versions, sources (GitHub or local), and content hashes.

## Conventions
- **SKILL.md Format**:
  - Must start with YAML frontmatter containing `name` and `description`.
  - The body is written in Markdown.
- **Skill Naming**: Directories and skill names should be lowercase-kebab-case.
- **Referencing**: When updating or adding skills, ensure they follow the patterns of existing skills.

## Maintenance
- **Adding a Skill**:
  1. Create a new directory in `skills/`.
  2. Add a `SKILL.md` with the required frontmatter and instructions.
  3. Add any necessary supporting files.
- **External Skills**: Skills imported from GitHub are tracked in `.skill-lock.json`. Manual edits to these files may be overwritten by the installation tool.
