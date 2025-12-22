# Workflow Access

## How to Run Workflows

**From IDE (Claude Code, Cursor, Windsurf):**

1. Load the agent using agent reference (e.g., type `@pm` in Claude Code)
2. Wait for agent menu to appear in chat
3. Type the workflow trigger with `*` prefix (e.g., `*create-prd`)
4. Follow the workflow prompts

**Agent Menu Structure:**
Each agent displays their available workflows when loaded. Look for:

- `*` prefix indicates workflow trigger
- Grouped by category or phase
- START HERE indicators for recommended entry points

## Universal Workflows

Some workflows are available to multiple agents:

| Workflow           | Agents                            | Purpose                                     |
| ------------------ | --------------------------------- | ------------------------------------------- |
| `workflow-status`  | ALL agents                        | Check current state and get recommendations |
| `workflow-init`    | PM, Analyst, Game Designer        | Initialize workflow tracking                |
| `correct-course`   | PM, Architect, SM, Game Architect | Change management during implementation     |
| `document-project` | Analyst, Technical Writer         | Brownfield documentation                    |

## Validation Actions

Many workflows have optional validation workflows that perform independent review:

| Validation                 | Agent       | Validates                                  |
| -------------------------- | ----------- | ------------------------------------------ |
| `implementation-readiness` | Architect   | PRD + Architecture + Epics + UX (optional) |
| `validate-design`          | UX Designer | UX specification and artifacts             |
| `validate-create-story`    | SM          | Story file                                 |

**When to use validation:**

- Before phase transitions
- For critical documents
- When learning BMM
- For high-stakes projects

---
