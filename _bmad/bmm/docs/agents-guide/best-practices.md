# Best Practices

## Agent Selection

**1. Start with workflow-status**

- When unsure where you are, load any agent and run `*workflow-status`
- Agent will analyze current project state and recommend next steps
- Works across all phases and all agents

**2. Match phase to agent**

- **Phase 1 (Analysis):** Analyst, Game Designer
- **Phase 2 (Planning):** PM, UX Designer, Game Designer
- **Phase 3 (Solutioning):** Architect, Game Architect
- **Phase 4 (Implementation):** SM, DEV, Game Developer
- **Testing:** TEA (all phases)
- **Documentation:** Technical Writer (all phases)

**3. Use specialists**

- **Testing:** TEA for comprehensive quality strategy
- **Documentation:** Technical Writer for technical writing
- **Games:** Game Designer/Developer/Architect for game-specific needs
- **UX:** UX Designer for user-centered design

**4. Try party mode for:**

- Strategic decisions with trade-offs
- Creative brainstorming sessions
- Cross-functional alignment
- Complex problem solving

## Working with Agents

**1. Trust their expertise**

- Agents embody decades of simulated experience
- Their questions uncover critical issues
- Their recommendations are data-informed
- Their warnings prevent costly mistakes

**2. Answer their questions**

- Agents ask for important reasons
- Incomplete answers lead to assumptions
- Detailed responses yield better outcomes
- "I don't know" is a valid answer

**3. Follow workflows**

- Structured processes prevent missed steps
- Workflows encode best practices
- Sequential workflows build on each other
- Validation workflows catch errors early

**4. Customize when needed**

- Adjust agent personalities for your project
- Add domain-specific expertise
- Modify communication style for team preferences
- Keep customizations project-specific

## Common Workflows Patterns

**Starting a New Project (Greenfield):**

```
1. PM or Analyst: *workflow-init
2. Analyst: *brainstorm-project or *product-brief (optional)
3. PM: *create-prd (Level 2-4) or *tech-spec (Level 0-1)
4. Architect: *create-architecture (Level 3-4 only)
5. PM: *create-epics-and-stories (after architecture)
6. SM: *sprint-planning
```

**Starting with Existing Code (Brownfield):**

```
1. Analyst or Technical Writer: *document-project
2. PM or Analyst: *workflow-init
3. PM: *create-prd or *tech-spec
4. Architect: *create-architecture (if needed)
5. PM: *create-epics-and-stories (after architecture)
6. SM: *sprint-planning
```

**Story Development Cycle:**

```
1. SM: *create-story
2. DEV: *dev-story
3. DEV: *code-review
4. Repeat steps 1-3 for next story
```

**Testing Strategy:**

```
1. TEA: *framework (once per project, early)
2. TEA: *atdd (before implementing features)
3. DEV: *dev-story (includes tests)
4. TEA: *automate (comprehensive test suite)
5. TEA: *trace (quality gate)
6. TEA: *ci (pipeline setup)
```

**Game Development:**

```
1. Game Designer: *brainstorm-game
2. Game Designer: *create-gdd
3. Game Architect: *create-architecture
4. SM: *sprint-planning
5. Game Developer: *create-story
6. Game Developer: *dev-story
7. Game Developer: *code-review
```

## Navigation Tips

**Lost? Run workflow-status**

```
Load any agent → *workflow-status
Agent analyzes project state → recommends next workflow
```

**Phase transitions:**

```
Each phase has validation gates:
- Phase 3 to 4: implementation-readiness (validates PRD + Architecture + Epics + UX (optional))
Run validation before advancing to implementation
```

**Course correction:**

```
If priorities change mid-project:
Load PM, Architect, or SM → *correct-course
```

**Testing integration:**

```
TEA can be invoked at any phase:
- Phase 1: Test strategy planning
- Phase 2: Test scenarios in PRD
- Phase 3: Architecture testability review
- Phase 4: Test automation and CI
```

---
