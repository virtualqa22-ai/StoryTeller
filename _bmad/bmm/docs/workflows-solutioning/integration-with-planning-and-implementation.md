# Integration with Planning and Implementation

## Planning → Solutioning Flow

**Quick Flow:**

```
Planning (tech-spec by PM)
  → Skip Solutioning
  → Phase 4 (Implementation)
```

**BMad Method:**

```
Planning (prd by PM - FRs/NFRs only)
  → Optional: create-ux-design (UX Designer)
  → architecture (Architect)
  → create-epics-and-stories (PM)
  → implementation-readiness (Architect)
  → Phase 4 (Implementation)
```

**Enterprise:**

```
Planning (prd by PM - FRs/NFRs only)
  → Optional: create-ux-design (UX Designer)
  → architecture (Architect)
  → Optional: security-architecture (Architect, future)
  → Optional: devops-strategy (Architect, future)
  → create-epics-and-stories (PM)
  → implementation-readiness (Architect)
  → Phase 4 (Implementation)
```

**Note on TEA (Test Architect):** TEA is fully operational with 8 workflows across all phases. TEA validates architecture testability during Phase 3 reviews but does not have a dedicated solutioning workflow. TEA's primary setup occurs in Phase 2 (`*framework`, `*ci`, `*test-design`) and testing execution in Phase 4 (`*atdd`, `*automate`, `*test-review`, `*trace`, `*nfr-assess`).

**Note:** Enterprise uses the same planning and architecture as BMad Method. The only difference is optional extended workflows added AFTER architecture but BEFORE create-epics-and-stories.

## Solutioning → Implementation Handoff

**Documents Produced:**

1. **architecture.md** → Guides all dev agents during implementation
2. **ADRs** (in architecture) → Referenced by agents for technical decisions
3. **Epic files** (from create-epics-and-stories) → Work breakdown into implementable units
4. **implementation-readiness.md** → Confirms readiness for Phase 4

**How Implementation Uses Solutioning:**

- **sprint-planning** - Loads architecture and epic files for sprint organization
- **dev-story** - References architecture decisions and ADRs
- **code-review** - Validates code follows architectural standards

---
