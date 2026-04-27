# Kilo Agent System

A comprehensive AI-powered toolkit for production-grade software development, featuring 89 specialized skills, expert agent personas, and systematic development workflows.

## 🚀 Overview

Kilo is an advanced agent system that transforms AI assistance into professional engineering practices. It provides battle-tested workflows, quality gates, and specialized skills across the entire software development lifecycle.

### Key Features

- **89 Specialized Skills**: Domain-specific workflows for every aspect of software development
- **4 Expert Personas**: Senior-level code reviewers, security auditors, and testing specialists
- **7 Lifecycle Commands**: Systematic development workflow from spec to ship
- **5 Quality Checklists**: Security, testing, performance, accessibility, and orchestration standards
- **MCP Server Integrations**: External tool connections for enhanced capabilities

## 📁 Project Structure

```
.kilo/
├── skills/           # 89 specialized skill workflows
├── agents/           # 4 expert agent personas
├── commands/         # 7 development lifecycle commands
├── references/       # 5 domain-specific checklists
└── mcps/            # MCP server configurations

AGENTS.md            # Main system documentation
.skill-lock.json     # Installed skills registry
```

### Core Components

#### 🎯 Skills Directory (`skills/`)
Specialized workflows covering:
- **Planning & Design**: `brainstorming`, `spec-driven-development`, `planning-and-task-breakdown`
- **Development**: `incremental-implementation`, `test-driven-development`, `source-driven-development`
- **Quality Assurance**: `code-review-and-quality`, `security-and-hardening`, `performance-optimization`
- **Deployment**: `git-workflow-and-versioning`, `ci-cd-and-automation`, `shipping-and-launch`
- **Domain Expertise**: Frontend, backend, cloud, testing, UI/UX, and more

#### 👥 Agent Personas (`agents/`)
Expert reviewers providing senior-level analysis:
- **Code Reviewer**: Five-axis code quality assessment
- **Security Auditor**: OWASP Top 10 prevention and vulnerability detection
- **Test Engineer**: Comprehensive testing strategy and coverage analysis
- **Analyzer**: Quantitative performance evaluation

#### ⚡ Commands (`commands/`)
Development lifecycle orchestration:
- `/spec` - Define requirements and success criteria
- `/plan` - Break down into implementable tasks
- `/build` - Incremental implementation with feature flags
- `/test` - Comprehensive verification and debugging
- `/review` - Multi-dimensional code quality assessment
- `/code-simplify` - Performance and maintainability optimization
- `/ship` - Production deployment with monitoring

#### 📚 References (`references/`)
Professional checklists and standards:
- Security hardening patterns
- Testing pyramid and coverage requirements
- Performance optimization guidelines
- Accessibility compliance standards
- Multi-agent orchestration patterns

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ or Python 3.8+
- Git
- Terminal/Command Line access

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/kilo-agent-system.git
   cd kilo-agent-system
   ```

2. **Install dependencies** (if applicable):
   ```bash
   npm install
   # or
   pip install -r requirements.txt
   ```

3. **Configure environment**:
   - Copy `.env.example` to `.env`
   - Set required API keys and configuration values

4. **Initialize the system**:
   ```bash
   npm run setup
   ```

## 📖 Usage

### Development Workflow

Kilo enforces a systematic approach to software development:

1. **Define** (`/spec`) → Create detailed requirements
2. **Plan** (`/plan`) → Break into verifiable tasks
3. **Build** (`/build`) → Implement incrementally
4. **Verify** (`/test`) → Test comprehensively
5. **Review** (`/review`) → Quality assurance
6. **Ship** (`/ship`) → Deploy to production

### Using Skills

Skills activate automatically based on context or can be invoked directly:

```bash
# Automatic activation (recommended)
# Mention "API design" → activates api-and-interface-design skill

# Direct invocation
/use-skill security-and-hardening
```

### Agent Personas

Invoke expert reviewers for specialized analysis:

```bash
# Code review
/review-code-with code-reviewer

# Security audit
/audit-security-with security-auditor

# Test coverage analysis
/analyze-tests-with test-engineer
```

## 🔧 Configuration

### Skill Management

Skills are managed through the `.skill-lock.json` registry. The system supports:
- **GitHub-based skills**: Install from public repositories
- **Local skills**: Custom skill development
- **MCP integrations**: External tool connections

### Environment Variables

Key configuration options:
- `KILO_API_KEY`: Authentication for premium features
- `MCP_SERVERS`: External service integrations
- `LOG_LEVEL`: Debug/Info/Warn/Error
- `WORKSPACE_ROOT`: Project directory path

### MCP Server Setup

Configure external integrations in `mcps/mcp.json`:

```json
{
  "servers": {
    "@21st-dev/magic": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest"],
      "env": { "API_KEY": "your-api-key" },
      "type": "stdio"
    }
  }
}
```

## 🤝 Contributing

### Development Guidelines

1. **Follow the workflow**: Always use Kilo's systematic approach
2. **Quality gates**: Run full review cycle before merging
3. **Skill creation**: Use `skill-creator` for new capabilities
4. **Documentation**: Update relevant docs for all changes

### Adding Skills

1. Create skill directory under `skills/`
2. Write `SKILL.md` with YAML frontmatter and workflow
3. Test with multiple prompts for robustness
4. Update `.skill-lock.json` registry

### Code Standards

- **Security first**: All code reviewed against OWASP Top 10
- **Testing required**: 80% unit, 15% integration, 5% E2E coverage
- **Performance baseline**: Core Web Vitals compliance
- **Accessibility**: WCAG 2.1 AA standards

## 📊 Architecture

### System Design

Kilo follows a modular architecture with clear separation of concerns:

- **Skills Layer**: Specialized capabilities and workflows
- **Agent Layer**: Expert personas with domain knowledge
- **Command Layer**: Orchestration and lifecycle management
- **Reference Layer**: Standards and checklists
- **Integration Layer**: MCP servers and external tools

### Quality Assurance

Every change goes through systematic validation:
- **Correctness**: Behavior matches specifications
- **Security**: Input validation and secure defaults
- **Performance**: Efficient algorithms and resource usage
- **Maintainability**: Clean code and clear abstractions
- **Testing**: Comprehensive coverage across all layers

## 🔒 Security

- **Zero-trust model**: All inputs validated at system boundaries
- **Secrets management**: No credentials in code or logs
- **Dependency scanning**: Regular vulnerability assessments
- **Access control**: Role-based permissions for all operations

## 📈 Performance

- **Optimized workflows**: Parallel execution where possible
- **Resource efficient**: Minimal memory footprint
- **Scalable architecture**: Handles large codebases and complex projects
- **Profiling support**: Built-in performance monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Skill not triggering**: Check description matches user intent
2. **Agent unavailable**: Verify persona configuration
3. **MCP connection failed**: Check API keys and network connectivity
4. **Performance degradation**: Clear skill cache and restart

### Debug Mode

Enable detailed logging:
```bash
export LOG_LEVEL=debug
kilo --verbose
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built on the collective wisdom of senior engineers and battle-tested development practices. Special thanks to all contributors and the open-source community for the foundational skills and tools.

---

**Quality is not optional.** Kilo enforces the same standards that power Google, Meta, and other engineering powerhouses.

*Transform AI assistance into professional engineering.* 🚀</content>
<parameter name="filePath">C:\Users\BS00861\.agents\README.md