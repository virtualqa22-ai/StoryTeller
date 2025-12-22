# Documentation: Critical First Step

🚨 **For brownfield projects: Always ensure adequate AI-usable documentation before planning**

## Default Recommendation: Run document-project

**Best practice:** Run `document-project` workflow unless you have **confirmed, trusted, AI-optimized documentation**.

## Why Document-Project is Almost Always the Right Choice

Existing documentation often has quality issues that break AI workflows:

**Common Problems:**

- **Too Much Information (TMI):** Massive markdown files with 10s or 100s of level 2 sections
- **Out of Date:** Documentation hasn't been updated with recent code changes
- **Wrong Format:** Written for humans, not AI agents (lacks structure, index, clear patterns)
- **Incomplete Coverage:** Missing critical architecture, patterns, or setup info
- **Inconsistent Quality:** Some areas documented well, others not at all

**Impact on AI Agents:**

- AI agents hit token limits reading massive files
- Outdated docs cause hallucinations (agent thinks old patterns still apply)
- Missing structure means agents can't find relevant information
- Incomplete coverage leads to incorrect assumptions

## Documentation Decision Tree

**Step 1: Assess Existing Documentation Quality**

Ask yourself:

- ✅ Is it **current** (updated in last 30 days)?
- ✅ Is it **AI-optimized** (structured with index.md, clear sections, <500 lines per file)?
- ✅ Is it **comprehensive** (architecture, patterns, setup all documented)?
- ✅ Do you **trust** it completely for AI agent consumption?

**If ANY answer is NO → Run `document-project`**

**Step 2: Check for Massive Documents**

If you have documentation but files are huge (>500 lines, 10+ level 2 sections):

1. **First:** Run `shard-doc` tool to split large files:

   ```bash
   # Load BMad Master or any agent
   _bmad/core/tools/shard-doc.xml --input docs/massive-doc.md
   ```

   - Splits on level 2 sections by default
   - Creates organized, manageable files
   - Preserves content integrity

2. **Then:** Run `index-docs` task to create navigation:

   ```bash
   _bmad/core/tasks/index-docs.xml --directory ./docs
   ```

3. **Finally:** Validate quality - if sharded docs still seem incomplete/outdated → Run `document-project`

## Four Real-World Scenarios

| Scenario | You Have                                   | Action                     | Why                                     |
| -------- | ------------------------------------------ | -------------------------- | --------------------------------------- |
| **A**    | No documentation                           | `document-project`         | Only option - generate from scratch     |
| **B**    | Docs exist but massive/outdated/incomplete | `document-project`         | Safer to regenerate than trust bad docs |
| **C**    | Good docs but no structure                 | `shard-doc` → `index-docs` | Structure existing content for AI       |
| **D**    | Confirmed AI-optimized docs with index.md  | Skip Documentation         | Rare - only if you're 100% confident    |

## Scenario A: No Documentation (Most Common)

**Action: Run document-project workflow**

1. Load Analyst or Technical Writer (Paige) agent
2. Run `*document-project`
3. Choose scan level:
   - **Quick** (2-5min): Pattern analysis, no source reading
   - **Deep** (10-30min): Reads critical paths - **Recommended**
   - **Exhaustive** (30-120min): Reads all files

**Outputs:**

- `docs/index.md` - Master AI entry point
- `docs/project-overview.md` - Executive summary
- `docs/architecture.md` - Architecture analysis
- `docs/source-tree-analysis.md` - Directory structure
- Additional files based on project type (API, web app, etc.)

## Scenario B: Docs Exist But Quality Unknown/Poor (Very Common)

**Action: Run document-project workflow (regenerate)**

Even if `docs/` folder exists, if you're unsure about quality → **regenerate**.

**Why regenerate instead of index?**

- Outdated docs → AI makes wrong assumptions
- Incomplete docs → AI invents missing information
- TMI docs → AI hits token limits, misses key info
- Human-focused docs → Missing AI-critical structure

**document-project** will:

- Scan actual codebase (source of truth)
- Generate fresh, accurate documentation
- Structure properly for AI consumption
- Include only relevant, current information

## Scenario C: Good Docs But Needs Structure

**Action: Shard massive files, then index**

If you have **good, current documentation** but it's in massive files:

**Step 1: Shard large documents**

```bash
# For each massive doc (>500 lines or 10+ level 2 sections)
_bmad/core/tools/shard-doc.xml \
  --input docs/api-documentation.md \
  --output docs/api/ \
  --level 2  # Split on ## headers (default)
```

**Step 2: Generate index**

```bash
_bmad/core/tasks/index-docs.xml --directory ./docs
```

**Step 3: Validate**

- Review generated `docs/index.md`
- Check that sharded files are <500 lines each
- Verify content is current and accurate
- **If anything seems off → Run document-project instead**

## Scenario D: Confirmed AI-Optimized Documentation (Rare)

**Action: Skip Documentation**

Only skip if ALL conditions met:

- ✅ `docs/index.md` exists and is comprehensive
- ✅ Documentation updated within last 30 days
- ✅ All doc files <500 lines with clear structure
- ✅ Covers architecture, patterns, setup, API surface
- ✅ You personally verified quality for AI consumption
- ✅ Previous AI agents used it successfully

**If unsure → Run document-project** (costs 10-30 minutes, saves hours of confusion)

## Why document-project is Critical

Without AI-optimized documentation, workflows fail:

- **tech-spec** (Quick Flow) can't auto-detect stack/patterns → Makes wrong assumptions
- **PRD** (BMad Method) can't reference existing code → Designs incompatible features
- **create-architecture** can't build on existing structure → Suggests conflicting patterns
- **create-story** can't provide existing pattern context → Stories lack integration guidance
- **dev-story** invents implementations → Breaks existing integrations

## Key Principle

**When in doubt, run document-project.**

It's better to spend 10-30 minutes generating fresh, accurate docs than to waste hours debugging AI agents working from bad documentation.

---
