# Best Practices

## 1. Epic Ownership

- **Do:** Assign entire epic to one developer (context → implementation → retro)
- **Don't:** Split epics across multiple developers (coordination overhead, context loss)

## 2. Dependency Management

- **Do:** Identify epic dependencies in planning, document API contracts, complete prerequisites first
- **Don't:** Start dependent epic before prerequisite ready, change API contracts without coordination

## 3. Communication Cadence

**Traditional:** Daily standups essential
**Agentic:** Lighter coordination

**Recommended:**

- Daily async updates ("Epic 1, 60% complete, no blockers")
- Twice-weekly 15min sync
- Epic completion demos
- Sprint retro after all epics complete

## 4. Branch Strategy

```bash
feature/epic-1-payment-processing    (Alice)
feature/epic-2-user-dashboard        (Bob)
feature/epic-3-admin-panel           (Carol)

# PR and merge when epic complete
```

## 5. Testing Strategy

- **Story-level:** Unit tests (DoD requirement, written by agent during dev-story)
- **Epic-level:** Integration tests across stories
- **Project-level:** E2E tests after multiple epics complete

## 6. Documentation Updates

- **Real-time:** `sprint-status.yaml` updated by workflows
- **Epic completion:** Update architecture docs, API docs, README if changed
- **Sprint completion:** Incorporate retrospective insights

## 7. Metrics (Different from Traditional)

**Traditional:** Story points per sprint, burndown charts
**Agentic:** Epics per week, stories per day, time to epic completion

**Example velocity:**

- Junior dev + AI: 1-2 epics/week (8-15 stories)
- Mid-level dev + AI: 2-3 epics/week (15-25 stories)
- Senior dev + AI: 3-5 epics/week (25-40 stories)

---
