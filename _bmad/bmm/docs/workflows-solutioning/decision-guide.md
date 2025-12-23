# Decision Guide

## Quick Flow

- **Planning:** tech-spec (PM)
- **Solutioning:** Skip entirely
- **Implementation:** sprint-planning → dev-story

## BMad Method

- **Planning:** prd (PM) - creates FRs/NFRs only, NOT epics
- **Solutioning:** Optional UX → architecture (Architect) → create-epics-and-stories (PM) → implementation-readiness (Architect)
- **Implementation:** sprint-planning → create-story → dev-story

## Enterprise

- **Planning:** prd (PM) - creates FRs/NFRs only (same as BMad Method)
- **Solutioning:** Optional UX → architecture (Architect) → Optional extended workflows (security-architecture, devops-strategy) → create-epics-and-stories (PM) → implementation-readiness (Architect)
- **Implementation:** sprint-planning → create-story → dev-story

**Key Difference:** Enterprise adds optional extended workflows AFTER architecture but BEFORE create-epics-and-stories. Everything else is identical to BMad Method.

**Note:** TEA (Test Architect) operates across all phases and validates architecture testability but is not a Phase 3-specific workflow. See [Test Architecture Guide](./test-architecture/index.md) for TEA's full lifecycle integration.

---
