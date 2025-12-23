# Tools and Technical

## Q: Why are my Mermaid diagrams not rendering?

**A:** Common issues:

1. Missing language tag: Use ` ```mermaid` not just ` ``` `
2. Syntax errors in diagram (validate at mermaid.live)
3. Tool doesn't support Mermaid (check your Markdown renderer)

All BMM docs use valid Mermaid syntax that should render in GitHub, VS Code, and most IDEs.

## Q: Can I use BMM with GitHub Copilot / Cursor / other AI tools?

**A:** Yes! BMM is complementary. BMM handles:

- Project planning and structure
- Workflow orchestration
- Agent Personas and expertise
- Documentation generation
- Quality gates

Your AI coding assistant handles:

- Line-by-line code completion
- Quick refactoring
- Test generation

Use them together for best results.

## Q: What IDEs/tools support BMM?

**A:** BMM requires tools with **agent mode** and access to **high-quality LLM models** that can load and follow complex workflows, then properly implement code changes.

**Recommended Tools:**

- **Claude Code** ⭐ **Best choice**
  - Sonnet 4.5 (excellent workflow following, coding, reasoning)
  - Opus (maximum context, complex planning)
  - Native agent mode designed for BMM workflows

- **Cursor**
  - Supports Anthropic (Claude) and OpenAI models
  - Agent mode with composer
  - Good for developers who prefer Cursor's UX

- **Windsurf**
  - Multi-model support
  - Agent capabilities
  - Suitable for BMM workflows

**What Matters:**

1. **Agent mode** - Can load long workflow instructions and maintain context
2. **High-quality LLM** - Models ranked high on SWE-bench (coding benchmarks)
3. **Model selection** - Access to Claude Sonnet 4.5, Opus, or GPT-4o class models
4. **Context capacity** - Can handle large planning documents and codebases

**Why model quality matters:** BMM workflows require LLMs that can follow multi-step processes, maintain context across phases, and implement code that adheres to specifications. Tools with weaker models will struggle with workflow adherence and code quality.

See [IDE Setup Guides](https://github.com/bmad-code-org/BMAD-METHOD/tree/main/docs/ide-info) for configuration specifics.

## Q: Can I customize agents?

**A:** Yes! Agents are installed as markdown files with XML-style content (optimized for LLMs, readable by any model). Create customization files in `_bmad/_config/agents/[agent-name].customize.yaml` to override default behaviors while keeping core functionality intact. See agent documentation for customization options.

**Note:** While source agents in this repo are YAML, they install as `.md` files with XML-style tags - a format any LLM can read and follow.

## Q: What happens to my planning docs after implementation?

**A:** Keep them! They serve as:

- Historical record of decisions
- Onboarding material for new team members
- Reference for future enhancements
- Audit trail for compliance

For enterprise projects (Level 4), consider archiving completed planning artifacts to keep workspace clean.

## Q: Can I use BMM for non-software projects?

**A:** BMM is optimized for software development, but the methodology principles (scale-adaptive planning, just-in-time design, context injection) can apply to other complex project types. You'd need to adapt workflows and agents for your domain.

---
